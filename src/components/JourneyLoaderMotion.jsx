import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function JourneyLoaderMotion({
  scope,
  finiteIntro = false,
  introStartedAt = 0,
  exitStartedAt = null,
}) {
  useGSAP(() => {
    const root = scope.current;
    if (!root || introStartedAt === null) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const arc = root.querySelector(".journey-loader__arc");
      const glow = root.querySelector(".journey-loader__glow");
      const particles = root.querySelectorAll(".journey-loader__particle");
      const progress = root.querySelector(".journey-loader__progress-fill");
      // The logo and label are visible from first paint. A delayed GSAP import
      // must never hide them and replay their entrance.
      const intro = gsap.timeline({
        paused: true,
        repeat: finiteIntro ? 0 : -1,
        repeatDelay: 0.6,
        defaults: { ease: "sine.inOut" },
      });

      intro.fromTo(arc,
        { strokeDasharray: "0 400", opacity: 1 },
        { strokeDasharray: "200 400", duration: 2 }, 0);
      intro.to(glow, { scale: 1.04, opacity: 0.85, duration: 2 }, 0);
      if (particles.length) {
        intro.fromTo(particles,
          { scale: 0.75, opacity: 0 },
          { scale: 1, opacity: 0.75, duration: 0.45, stagger: { amount: 0.25 }, ease: "sine.out" },
          0.25);
        intro.to(particles,
          { opacity: 0.3, duration: 0.4, repeat: 1, yoyo: true, stagger: { amount: 0.2 } },
          0.95);
      }
      if (progress) {
        intro.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 2 }, 0);
      }

      let visible = !window.IntersectionObserver;
      const syncPlayback = () => {
        if (finiteIntro) {
          // Catch up to the existing clock instead of starting another intro.
          const elapsed = Math.min(2, Math.max(0, (performance.now() - introStartedAt) / 1000));
          intro.time(elapsed, true);
          intro.paused(document.hidden || !visible || elapsed >= 2);
        } else {
          intro.paused(document.hidden || !visible);
        }
      };
      const observer = window.IntersectionObserver
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            syncPlayback();
          }, { threshold: 0 })
        : null;

      observer?.observe(root);
      document.addEventListener("visibilitychange", syncPlayback);
      syncPlayback();
      return () => {
        observer?.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
        intro.kill();
      };
    });

    return () => media.revert();
  }, { scope, dependencies: [scope, finiteIntro, introStartedAt], revertOnUpdate: true });

  useGSAP(() => {
    const root = scope.current;
    if (!root || exitStartedAt === null) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const exit = gsap.to(root, {
        paused: true,
        opacity: 0,
        duration: 0.25,
        ease: "sine.inOut",
      });
      const elapsed = Math.min(0.25, Math.max(0, (performance.now() - exitStartedAt) / 1000));
      exit.time(elapsed, true);
      if (elapsed < 0.25) exit.play();
    });

    return () => media.revert();
  }, { scope, dependencies: [scope, exitStartedAt], revertOnUpdate: true });

  return null;
}
