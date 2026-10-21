import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Loaded separately from the page. Content never waits for this enhancement.
export default function SiteMotion({ root, page }) {
  useGSAP(() => {
    const scope = root.current;
    const seen = new WeakSet();
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", (context) => {
      let alive = true;
      const registered = new WeakSet();
      const pendingDisclosures = new Map();
      const cleanups = [];
      const enter = context.add("enter", (elements) => {
        const cards = elements.filter((node) => node.dataset.motion === "card");
        const others = elements.filter((node) => node.dataset.motion !== "card");
        if (cards.length) gsap.fromTo(cards, { translate: window.innerWidth < 768 ? "0px 18px" : "0px 28px", opacity: .18 }, { translate: "0px 0px", opacity: 1, duration: .6, stagger: { amount: .18 }, ease: "power3.out", clearProps: "translate,opacity", overwrite: "auto" });
        for (const node of others) {
          const moving = node.dataset.motion === "composition";
          const story = node.matches(".why-layout, .about-story") && window.innerWidth >= 768;
          gsap.fromTo(node, { translate: moving ? (story ? "-24px 0px" : "0px 20px") : "0px 0px", opacity: moving ? .24 : .65 }, { translate: "0px 0px", opacity: 1, duration: moving ? .65 : .2, ease: "power3.out", clearProps: "translate,opacity", overwrite: "auto" });
        }
      });
      const viewport = new IntersectionObserver((entries) => {
        if (!alive) return;
        const entering = [];
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < .12 || seen.has(entry.target)) continue;
          seen.add(entry.target);
          entry.target.dataset.motionPhase = "entered";
          viewport.unobserve(entry.target);
          entering.push(entry.target);
        }
        if (entering.length) enter(entering);
      }, { threshold: .12 });

      const intro = context.add("intro", (node) => {
        const art = [...node.querySelectorAll(".intro-backdrop-art")];
        const restingOpacity = art.map((element) => Number(getComputedStyle(element).opacity));
        if (art.length) gsap.fromTo(art, { x: (index) => index ? 80 : -65, y: 14, opacity: .2 }, { x: 0, y: 0, opacity: (index) => restingOpacity[index], duration: .95, stagger: .07, ease: "power3.out", clearProps: "transform,opacity" });
        const lines = node.querySelectorAll(".intro-backdrop-detail path");
        if (lines.length) gsap.fromTo(lines, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.15, stagger: .08, ease: "power2.out", clearProps: "strokeDasharray,strokeDashoffset" });
        node.dataset.motionPhase = "entered";
      });

      const filterResults = context.add("filterResults", (group) => {
        const section = group.closest("section");
        const grid = section?.querySelector(".tour-grid");
        if (!grid) return;
        // The result change is one action; later rows still arrive on scroll.
        for (const cell of [...grid.children].slice(0, 6)) {
          const bounds = cell.getBoundingClientRect();
          if (bounds.top < window.innerHeight && bounds.bottom > 0) {
            seen.add(cell); viewport.unobserve(cell); cell.dataset.motionPhase = "entered";
          }
        }
        gsap.fromTo(grid, { opacity: .82 }, { opacity: 1, duration: .2, ease: "power2.out", clearProps: "opacity", overwrite: "auto" });
      });

      function selection(group) {
        const indicator = group.querySelector(".category-indicator");
        if (!indicator) return;
        let positioned = false;
        const position = context.add("positionSelection", (animate = false) => {
          const selected = group.querySelector('[aria-pressed="true"]');
          if (!selected || !group.isConnected) return;
          const box = group.getBoundingClientRect();
          const next = selected.getBoundingClientRect();
          const current = indicator.getBoundingClientRect();
          gsap.killTweensOf(indicator);
          gsap.set(indicator, { width: next.width, height: next.height });
          const end = { x: next.left - box.left, y: next.top - box.top, scaleX: 1, scaleY: 1 };
          if (animate && positioned) gsap.fromTo(indicator, { x: current.left - box.left, y: current.top - box.top, scaleX: current.width / next.width, scaleY: current.height / next.height }, { ...end, duration: .22, ease: "power2.out", overwrite: "auto" });
          else gsap.set(indicator, end);
          group.dataset.motionEnhanced = "true";
          positioned = true;
        });
        position();
        const resize = new ResizeObserver(() => position());
        resize.observe(group);
        group.querySelectorAll("button").forEach((button) => resize.observe(button));
        const changes = new MutationObserver(() => { if (alive) { position(true); filterResults(group); } });
        changes.observe(group, { subtree: true, attributes: true, attributeFilter: ["aria-pressed"] });
        cleanups.push(() => { resize.disconnect(); changes.disconnect(); delete group.dataset.motionEnhanced; });
      }

      function register(node) {
        if (registered.has(node)) return;
        registered.add(node);
        const kind = node.dataset.motion;
        if (kind === "intro") { intro(node); return; }
        if (kind === "selection") { selection(node); return; }
        if (["step", "review", "form", "hero"].includes(kind)) return;
        if (["card", "composition", "rail", "feedback"].includes(kind) && !seen.has(node)) viewport.observe(node);
      }
      function scan(node) {
        if (!(node instanceof Element)) return;
        if (node.matches("[data-motion]")) register(node);
        node.querySelectorAll("[data-motion]").forEach(register);
      }

      const stateChanged = context.add("stateChanged", (node, before) => {
        if (node.dataset.motion === "hero") {
          node.dataset.heroAdvanced = "true";
          gsap.fromTo(node, { translate: "0px 18px", opacity: .35 }, { translate: "0px 0px", opacity: 1, duration: .5, ease: "power3.out", clearProps: "translate,opacity", overwrite: "auto" });
        } else if (node.dataset.motion === "step") {
          const direction = Number(node.dataset.motionState) > Number(before) ? 1 : -1;
          gsap.fromTo(node, { translate: `${direction * 8}px 0px`, opacity: .84 }, { translate: "0px 0px", opacity: 1, duration: .24, ease: "power2.out", clearProps: "translate,opacity", overwrite: "auto" });
        } else if (node.dataset.motion === "review") {
          gsap.fromTo(node, { opacity: .75 }, { opacity: 1, duration: .2, ease: "power2.out", clearProps: "opacity", overwrite: "auto" });
        } else if (node.dataset.motion === "form") {
          const button = node.querySelector('[type="submit"]');
          if (button) gsap.fromTo(button, { opacity: .75 }, { opacity: 1, duration: .16, clearProps: "opacity", overwrite: "auto" });
        }
      });
      const updates = new MutationObserver((records) => {
        if (!alive) return;
        for (const record of records) {
          if (record.type === "attributes") stateChanged(record.target, record.oldValue);
          else {
            record.addedNodes.forEach(scan);
            record.removedNodes.forEach((node) => {
              if (!(node instanceof Element)) return;
              viewport.unobserve(node);
              node.querySelectorAll("[data-motion]").forEach((child) => viewport.unobserve(child));
            });
          }
        }
      });
      scan(scope);
      updates.observe(scope, { subtree: true, childList: true, attributes: true, attributeOldValue: true, attributeFilter: ["data-motion-state"] });

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
        gsap.fromTo(details, { height: from, overflow: "hidden" }, { height: to, duration: opening ? .24 : .18, ease: "power2.out", onComplete: () => {
          details.open = opening;
          details.style.height = ""; details.style.overflow = "";
          pendingDisclosures.delete(details);
        } });
      });
      scope.addEventListener("click", disclosure);
      return () => {
        alive = false;
        viewport.disconnect(); updates.disconnect();
        scope.removeEventListener("click", disclosure);
        cleanups.forEach((cleanup) => cleanup());
        pendingDisclosures.forEach((opening, details) => { details.open = opening; details.style.height = ""; details.style.overflow = ""; });
      };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [page], revertOnUpdate: true });
  return null;
}
