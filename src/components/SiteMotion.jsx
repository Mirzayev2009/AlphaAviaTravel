import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// ─── Shared easing vocabulary ─────────────────────────────────────────────────
const E = {
  enter:   "power2.out",
  smooth:  "sine.out",
  spring:  "back.out(1.3)",
  inOut:   "sine.inOut",
};

// ─── Utility ──────────────────────────────────────────────────────────────────
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const isMobile = () => window.innerWidth < 768;

// Preloaded during the document intro; internal navigation reuses this controller.
export default function SiteMotion({ root, page, enabled = true }) {
  const completed = useRef(new WeakSet());

  useGSAP(() => {
    if (!enabled) return;
    const scope = root.current;
    const seen = completed.current;
    const media = gsap.matchMedia();
    let freshScan = true;

    media.add("(prefers-reduced-motion: no-preference)", (context) => {
      let alive = true;
      const registered = new WeakSet();
      const pendingDisclosures = new Map();
      const cleanups = [];
      const prepared = new Set();
      const active = new Set();

      const inView = (node) => {
        const box = node.getBoundingClientRect();
        return box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < window.innerHeight;
      };
      const begin  = (node) => {
        active.add(node);
        node.dataset.motionPhase = "entering";
        node.dataset.motionRuns = String(Number(node.dataset.motionRuns || 0) + 1);
      };
      const finish = (node) => {
        active.delete(node);
        prepared.delete(node);
        seen.add(node);
        node.dataset.motionPhase = "entered";
      };
      const settle = (node) => { seen.add(node); node.dataset.motionPhase = "settled"; };

      // ── Prepare: set invisible start state before intersection ──────────────
      const prepare = context.add("prepare", (node) => {
        const kind = node.dataset.motion;
        const mobile = isMobile();
        const dist = mobile ? 10 : 16;

        if (kind === "service" || kind === "invitation") {
          gsap.set(node.querySelector('[data-motion-part="copy"]'),
            { y: dist, opacity: 0.55 });
          if (kind === "service") {
            gsap.set(node.querySelector('[data-motion-part="rule"]'), { scaleX: 0.1, opacity: 0 });
          } else {
            gsap.set(node.querySelector('[data-motion-part="route"]'),
              { strokeDasharray: 1, strokeDashoffset: 1 });
            gsap.set(node.querySelector('[data-motion-part="destination"]'),
              { scale: 0.35, opacity: 0, transformOrigin: "center" });
          }
        } else if (kind === "card") {
          gsap.set(node, { y: dist + 4, opacity: 0, scale: 0.97 });
        } else if (kind === "composition" && node.matches(".why-layout, .about-story") && !mobile) {
          gsap.set(node, { x: -16, opacity: 0.5 });
        } else if (kind === "location" && !mobile) {
          gsap.set(node, { x: -16, opacity: 0.5 });
        } else {
          const yOff = ["feedback", "quote"].includes(kind) ? 0 : dist;
          gsap.set(node, { y: yOff, opacity: kind === "feedback" ? 0.7 : 0.5 });
        }

        prepared.add(node);
        node.dataset.motionPhase = "prepared";
        viewport.observe(node);
      });

      // ── Enter: play arrival animation ─────────────────────────────────────
      const enter = context.add("enter", (elements) => {
        const cards       = elements.filter(n => n.dataset.motion === "card");
        const services    = elements.filter(n => n.dataset.motion === "service");
        const invitations = elements.filter(n => n.dataset.motion === "invitation");
        const others      = elements.filter(n => !["card","service","invitation"].includes(n.dataset.motion));

        elements.forEach(begin);

        // ── Cards: staggered rise with subtle scale pop ──────────────────────
        if (cards.length) {
          gsap.to(cards, {
            y: 0, opacity: 1, scale: 1,
            duration: 1.0,
            stagger: { amount: clamp((cards.length - 1) * 0.08, 0, 0.18) },
            ease: E.enter,
            clearProps: "y,opacity,scale",
            overwrite: "auto",
            onComplete: () => cards.forEach(finish),
          });
        }

        // ── Service rails: rule expands then copy rises ──────────────────────
        services.forEach((node, index) => {
          const scene = gsap.timeline({
            delay: clamp(index * 0.06, 0, 0.2),
            defaults: { ease: E.smooth },
            onComplete: () => finish(node),
          });
          scene
            .to(node.querySelector('[data-motion-part="rule"]'),
              { scaleX: 1, opacity: 1, duration: 0.65, ease: E.spring, clearProps: "transform,opacity" }, 0)
            .to(node.querySelector('[data-motion-part="copy"]'),
              { y: 0, opacity: 1, duration: 0.85, clearProps: "transform,opacity" }, 0.07);
        });

        // ── Invitation: route draws, copy rises, destination pops ─────────────
        invitations.forEach((node) => {
          const scene = gsap.timeline({ defaults: { ease: E.smooth }, onComplete: () => finish(node) });
          scene
            .to(node.querySelector('[data-motion-part="route"]'),
              { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", clearProps: "strokeDasharray,strokeDashoffset" }, 0)
            .to(node.querySelector('[data-motion-part="copy"]'),
              { y: 0, opacity: 1, duration: 0.9, clearProps: "transform,opacity" }, 0.1)
            .to(node.querySelector('[data-motion-part="destination"]'),
              { scale: 1, opacity: 1, duration: 0.38, ease: E.spring, clearProps: "transform,opacity" }, 0.78);
        });

        // ── Compositional / location / heading groups ──────────────────────
        for (const node of others) {
          const kind = node.dataset.motion;
          const isFeedback = kind === "feedback";
          gsap.to(node, {
            x: 0, y: 0, opacity: 1,
            duration: isFeedback ? 0.32 : 0.95,
            ease: isFeedback ? E.smooth : E.enter,
            clearProps: "x,y,opacity",
            overwrite: "auto",
            onComplete: () => finish(node),
          });
        }
      });

      // ── Intersection observer ─────────────────────────────────────────────
      const viewport = new IntersectionObserver((entries) => {
        if (!alive) return;
        const entering = new Set();
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.has(entry.target) || active.has(entry.target) || !prepared.has(entry.target)) continue;
          viewport.unobserve(entry.target);
          entering.add(entry.target);
        }
        if (entering.size) enter([...entering]);
      }, { threshold: 0.04, rootMargin: "0px 0px -24px 0px" });

      // ── Inner-page header intro ───────────────────────────────────────────
      const intro = context.add("intro", (node) => {
        begin(node);
        const art = [...node.querySelectorAll(".intro-backdrop-art")];
        const restingOpacity = art.map(el => Number(getComputedStyle(el).opacity));
        const copy = node.querySelector(".intro-copy");
        const scene = gsap.timeline({
          defaults: { ease: E.smooth },
          onComplete: () => finish(node),
        }).timeScale(1.2);

        if (copy) {
          scene.fromTo(copy,
            { y: 14, opacity: 0.6 },
            { y: 0,  opacity: 1,  duration: 0.85, clearProps: "transform,opacity" }, 0);
        }
        if (art.length) {
          scene.fromTo(art,
            { x: (i) => i ? 30 : -26, opacity: (i) => restingOpacity[i] * 0.6 },
            { x: 0, opacity: (i) => restingOpacity[i], duration: 1.05, stagger: 0.07, ease: E.enter, clearProps: "transform,opacity" }, 0);
        }
        const lines = node.querySelectorAll(".intro-backdrop-detail path");
        if (lines.length) {
          scene.fromTo(lines,
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.15, stagger: 0.06, clearProps: "strokeDasharray,strokeDashoffset" }, 0.1);
        }
      });

      // ── Hero entrance: coordinated composition ────────────────────────────
      const hero = context.add("hero", (node) => {
        begin(node);
        const scene = gsap.timeline({ defaults: { ease: E.smooth }, onComplete: () => finish(node) }).timeScale(1.2);

        // Main copy block rises
        scene.fromTo(node,
          { y: 22, opacity: 0.6 },
          { y: 0,  opacity: 1,  duration: 0.9, ease: E.enter, clearProps: "transform,opacity" }, 0);

        // Amber accent rule stretches in
        const accent = node.querySelector(".hero-accent");
        if (accent) {
          scene.fromTo(accent,
            { scaleX: 0.25, opacity: 0 },
            { scaleX: 1,    opacity: 1,  duration: 1.0, ease: E.spring, clearProps: "transform,opacity" }, 0.06);
        }

        // Actions fade in slightly later
        const actions = node.querySelector(".hero-actions");
        if (actions) {
          scene.fromTo(actions,
            { y: 10, opacity: 0 },
            { y: 0,  opacity: 1, duration: 0.7, clearProps: "transform,opacity" }, 0.28);
        }
      });

      // ── Navigation entrance ───────────────────────────────────────────────
      const menu = context.add("menu", (node) => {
        begin(node);
        gsap.fromTo(node,
          { y: -8, opacity: 0.65 },
          { y: 0,  opacity: 1, duration: 0.42, ease: E.smooth, clearProps: "transform,opacity", onComplete: () => finish(node) });
      });

      // ── Animated category selection pill ─────────────────────────────────
      function selection(group) {
        const indicator = group.querySelector(".category-indicator");
        if (!indicator) return;
        let positioned = false;

        const position = context.add("positionSelection", (animate = false) => {
          const selected = group.querySelector('[aria-pressed="true"]');
          if (!selected || !group.isConnected) return;
          const box     = group.getBoundingClientRect();
          const next    = selected.getBoundingClientRect();
          const current = indicator.getBoundingClientRect();

          gsap.killTweensOf(indicator);
          gsap.set(indicator, { width: next.width, height: next.height });
          const end = { x: next.left - box.left, y: next.top - box.top, scaleX: 1, scaleY: 1 };

          if (animate && positioned) {
            gsap.fromTo(indicator,
              { x: current.left - box.left, y: current.top - box.top,
                scaleX: current.width / next.width, scaleY: current.height / next.height },
              { ...end, duration: 0.36, ease: E.spring, overwrite: "auto" });
          } else {
            gsap.set(indicator, end);
          }

          group.dataset.motionEnhanced = "true";
          positioned = true;
        });

        position();
        const resize = new ResizeObserver(() => position());
        resize.observe(group);
        group.querySelectorAll("button").forEach(btn => resize.observe(btn));
        const changes = new MutationObserver(() => { if (alive) position(true); });
        changes.observe(group, { subtree: true, attributes: true, attributeFilter: ["aria-pressed"] });
        cleanups.push(() => { resize.disconnect(); changes.disconnect(); delete group.dataset.motionEnhanced; });
      }

      // ── Node registration ─────────────────────────────────────────────────
      function register(node, fresh, visible) {
        if (registered.has(node)) return;
        registered.add(node);
        const kind = node.dataset.motion;
        if (kind === "selection") { selection(node); return; }
        if (["step","review","form"].includes(kind)) return;
        if (seen.has(node) || active.has(node)) return;
        if (!fresh && visible) { settle(node); return; }
        if (kind === "intro")  { intro(node); return; }
        if (kind === "hero")   { hero(node);  return; }
        if (kind === "menu")   { menu(node);  return; }
        if (["card","composition","rail","feedback","quote","location","service","invitation"].includes(kind)) {
          prepare(node);
        }
      }

      function scan(node, fresh = false) {
        if (!(node instanceof Element)) return;
        const nodes = [...(node.matches("[data-motion]") ? [node] : []), ...node.querySelectorAll("[data-motion]")];
        const visibility = fresh ? [] : nodes.map(inView);
        nodes.forEach((el, i) => register(el, fresh, visibility[i]));
      }

      // ── Reactive state transitions ────────────────────────────────────────
      const stateChanged = context.add("stateChanged", (node, before) => {
        if (node.dataset.motion === "hero") {
          // Carousel slide change: smooth fade-settle
          gsap.to(node, {
            y: 0, opacity: 1, duration: 0.62,
            ease: E.smooth, clearProps: "transform,opacity", overwrite: "auto",
          });
        } else if (node.dataset.motion === "step") {
          const dir = Number(node.dataset.motionState) > Number(before) ? 1 : -1;
          gsap.fromTo(node,
            { x: `${dir * 7}px`, opacity: 0.8 },
            { x: "0px", opacity: 1, duration: 0.44, ease: E.smooth, clearProps: "transform,opacity", overwrite: "auto" });
        } else if (node.dataset.motion === "review") {
          gsap.fromTo(node,
            { opacity: 0.6 },
            { opacity: 1, duration: 0.34, ease: E.smooth, clearProps: "opacity", overwrite: "auto" });
        } else if (node.dataset.motion === "form") {
          const button = node.querySelector('[type="submit"]');
          if (button) {
            gsap.fromTo(button,
              { opacity: 0.72 },
              { opacity: 1, duration: 0.18, clearProps: "opacity", overwrite: "auto" });
          }
        }
      });

      // ── Mutation observer — watches DOM additions & attribute changes ───────
      const updates = new MutationObserver((records) => {
        if (!alive) return;
        for (const record of records) {
          if (record.type === "attributes") {
            stateChanged(record.target, record.oldValue);
          } else {
            record.addedNodes.forEach(node => scan(node, true));
            record.removedNodes.forEach(node => {
              if (!(node instanceof Element) || scope.contains(node)) return;
              const removed = [node, ...node.querySelectorAll("[data-motion]")];
              removed.forEach(el => {
                viewport.unobserve(el);
                prepared.delete(el);
                active.delete(el);
                gsap.killTweensOf(el);
                gsap.killTweensOf(el.querySelectorAll("[data-motion-part]"));
              });
            });
          }
        }
      });

      scan(scope, freshScan);
      freshScan = false;
      updates.observe(scope, {
        subtree: true, childList: true, attributes: true,
        attributeOldValue: true, attributeFilter: ["data-motion-state"],
      });

      // ── Disclosure (details/summary animated expand) ──────────────────────
      const disclosure = context.add("disclosure", (event) => {
        const summary = event.target.closest("summary");
        const details = summary?.parentElement;
        if (!details?.matches('details[data-motion-disclosure]') || event.defaultPrevented || event.target.closest("a,button,input")) return;
        event.preventDefault();
        const opening = !(pendingDisclosures.get(details) ?? details.open);
        const from = details.getBoundingClientRect().height;
        gsap.killTweensOf(details);
        pendingDisclosures.set(details, opening);
        details.style.height = "";
        details.open = true;
        const to = opening ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height;
        summary.focus({ preventScroll: true });
        gsap.fromTo(details,
          { height: from, overflow: "hidden" },
          {
            height: to,
            duration: opening ? 0.38 : 0.28,
            ease: E.smooth,
            onComplete: () => {
              details.open = opening;
              details.style.height = "";
              details.style.overflow = "";
              pendingDisclosures.delete(details);
            },
          });
      });

      scope.addEventListener("click", disclosure);

      return () => {
        alive = false;
        viewport.disconnect();
        updates.disconnect();
        prepared.forEach(node => { node.dataset.motionPhase = seen.has(node) ? "entered" : "idle"; });
        prepared.clear();
        active.forEach(node => { node.dataset.motionPhase = "idle"; });
        active.clear();
        scope.removeEventListener("click", disclosure);
        cleanups.forEach(fn => fn());
        pendingDisclosures.forEach((opening, details) => {
          details.open = opening;
          details.style.height = "";
          details.style.overflow = "";
        });
      };
    });

    return () => media.revert();
  }, { scope: root, dependencies: [page, enabled], revertOnUpdate: true });

  return null;
}
