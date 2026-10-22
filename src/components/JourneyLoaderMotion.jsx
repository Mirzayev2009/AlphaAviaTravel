import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const $ = (root, sel) => root.querySelector(sel);
const $$ = (root, sel) => [...root.querySelectorAll(sel)];

export default function JourneyLoaderMotion({
  scope,
  finiteIntro = false,
  introStarted = true,
  ready = false,
  onIntroComplete,
  onExitComplete,
}) {
  // ─── Intro / loop animation ─────────────────────────────────────────────────
  useGSAP(() => {
    const root = scope.current;
    if (!root || !introStarted) return;
    let alive = true;

    const completeIntro = () => { if (alive) onIntroComplete?.(); };

    const media = gsap.matchMedia();

    // ── Full-motion path ────────────────────────────────────────────────────
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const logo       = $( root, ".journey-loader__logo");
      const glow       = $( root, ".journey-loader__glow");
      const arc        = $( root, ".journey-loader__arc");
      const orbit      = $( root, ".journey-loader__orbit");
      const originDot  = $( root, ".journey-loader__origin-dot");
      const particles  = $$( root, ".journey-loader__particle");
      const progressFill = $( root, ".journey-loader__progress-fill");
      const label      = $( root, ".journey-loader__label");

      // ── Phase 1: Logo materialise ─────────────────────────────────────────
      const intro = gsap.timeline({
        paused: true,
        defaults: { ease: "sine.out" },
        onComplete: finiteIntro ? completeIntro : undefined,
        repeat: finiteIntro ? 0 : -1,
        repeatDelay: 0.6,
      });

      // Logo — scale up from slightly small, fade in
      intro.fromTo(logo,
        { scale: 0.72, opacity: 0, filter: "blur(6px)" },
        { scale: 1,    opacity: 1, filter: "blur(0px)", duration: 0.82, ease: "back.out(1.6)" },
        0
      );

      // Orbit track fades in softly
      intro.fromTo(orbit,
        { opacity: 0 },
        { opacity: 0.18, duration: 0.7 },
        0.1
      );

      // Ambient glow pulses in
      intro.fromTo(glow,
        { scale: 0.6, opacity: 0 },
        { scale: 1,   opacity: 1, duration: 1.0, ease: "sine.out" },
        0.12
      );

      // Origin dot blinks in
      if (originDot) {
        intro.fromTo(originDot,
          { scale: 0, opacity: 0, transformOrigin: "center" },
          { scale: 1, opacity: 0.55, duration: 0.3 },
          0.55
        );
      }

      // Traveling arc draws itself (strokeDashoffset trick via scaleX on SVG path)
      // We animate it via stroke-dashoffset through CSS custom property
      intro.fromTo(arc,
        { strokeDasharray: "0 400", opacity: 1 },
        { strokeDasharray: "200 400", opacity: 1, duration: 1.4, ease: "power2.inOut" },
        0.45
      );

      // Particles scatter outward with stagger
      if (particles.length) {
        intro.fromTo(particles,
          { scale: 0, opacity: 0, transformOrigin: "center" },
          {
            scale: 1, opacity: 0.75,
            duration: 0.45,
            stagger: { amount: 0.3 },
            ease: "back.out(2)",
          },
          0.6
        );

        // Particles pulse gently
        intro.to(particles,
          { opacity: 0.3, duration: 0.9, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { amount: 0.4 } },
          1.2
        );
      }

      // Progress bar sweeps across (finite intro only — shows real "loading" feel)
      if (progressFill) {
        if (finiteIntro) {
          intro.fromTo(progressFill,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.7, ease: "power1.inOut" },
            0.2
          );
        } else {
          // Loop: sweep left-to-right, then repeat
          intro.fromTo(progressFill,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.1, ease: "power1.inOut" },
            0.2
          );
        }
      }

      // Label fades in last
      if (label) {
        intro.fromTo(label,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.75
        );
      }

      // ── Visibility / page-focus playback sync ─────────────────────────────
      let visible = !window.IntersectionObserver;
      const syncPlayback = () => intro.paused(document.hidden || !visible);

      const observer = window.IntersectionObserver
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            syncPlayback();
          }, { threshold: 0 })
        : null;

      observer?.observe(root);
      document.addEventListener("visibilitychange", syncPlayback);
      syncPlayback();

      // ── Gentle continuous glow breathe (runs in parallel, not on timeline) ─
      gsap.to(glow, {
        scale: 1.08,
        opacity: 0.85,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        paused: false,
      });

      return () => {
        observer?.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
        intro.kill();
        gsap.killTweensOf(glow);
      };
    });

    // ── Reduced-motion path — just fade logo in statically ─────────────────
    media.add("(prefers-reduced-motion: reduce)", () => {
      const logo = $(root, ".journey-loader__logo");
      gsap.set(logo, { opacity: 1 });
      if (finiteIntro) gsap.delayedCall(0.05, completeIntro);
    });

    return () => { alive = false; media.revert(); };
  }, { scope, dependencies: [scope, finiteIntro, introStarted], revertOnUpdate: true });

  // ─── Exit animation ─────────────────────────────────────────────────────────
  useGSAP(() => {
    const root = scope.current;
    if (!root || !ready) return;
    let alive = true;
    const completeExit = () => { if (alive) onExitComplete?.(); };

    const media = gsap.matchMedia();
    media.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        motion:  "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (context.conditions.reduced) {
          gsap.set(root, { opacity: 0 });
          completeExit();
          return;
        }

        // Elegant: logo scales up very slightly while the whole loader fades
        const logo = $(root, ".journey-loader__logo");
        const tl = gsap.timeline({ onComplete: completeExit });
        tl.to(logo, { scale: 1.06, duration: 0.22, ease: "sine.out" }, 0)
          .to(root,  { opacity: 0,  duration: 0.30, ease: "sine.inOut" }, 0.04);
      }
    );

    return () => { alive = false; media.revert(); };
  }, { scope, dependencies: [scope, ready], revertOnUpdate: true });

  return null;
}
