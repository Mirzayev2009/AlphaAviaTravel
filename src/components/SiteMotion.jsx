import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Loaded separately from the page. Content never waits for this enhancement.
export default function SiteMotion({ root, page }) {
  const played = useRef(new WeakSet());
  const initialized = useRef(false);
  useGSAP(() => {
    const scope = root.current;
    const seen = played.current;
    const freshPage = initialized.current;
    initialized.current = true;
    const media = gsap.matchMedia();
    let freshScan = freshPage && window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    media.add("(prefers-reduced-motion: no-preference)", (context) => {
      let alive = true;
      const registered = new WeakSet();
      const pendingDisclosures = new Map();
      const cleanups = [];
      const prepared = new Set();
      const inView = (node) => {
        const box = node.getBoundingClientRect();
        return box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < window.innerHeight;
      };
      const begin = (node) => {
        seen.add(node);
        node.dataset.motionPhase = "entering";
        node.dataset.motionRuns = String(Number(node.dataset.motionRuns || 0) + 1);
      };
      const finish = (node) => { prepared.delete(node); node.dataset.motionPhase = "entered"; };
      const settle = (node) => { seen.add(node); node.dataset.motionPhase = "settled"; };
      const prepare = (node) => {
        const kind = node.dataset.motion;
        const distance = window.innerWidth < 768 ? 8 : 12;
        const story = kind === "composition" && node.matches(".why-layout, .about-story") && window.innerWidth >= 768;
        gsap.set(node, { translate: kind === "feedback" ? "0px 0px" : story ? "-12px 0px" : "0px " + distance + "px", opacity: kind === "feedback" ? .75 : .55 });
        prepared.add(node);
        node.dataset.motionPhase = "prepared";
        viewport.observe(node);
      };
      const enter = context.add("enter", (elements) => {
        const cards = elements.filter((node) => node.dataset.motion === "card");
        const others = elements.filter((node) => node.dataset.motion !== "card");
        elements.forEach(begin);
        // Play toward the endpoint already prepared offscreen; never reset visible content.
        if (cards.length) gsap.to(cards, { translate: "0px 0px", opacity: 1, duration: .95, stagger: { amount: Math.min(.14, (cards.length - 1) * .07) }, ease: "sine.out", clearProps: "translate,opacity", overwrite: "auto", onComplete: () => cards.forEach(finish) });
        for (const node of others) gsap.to(node, { translate: "0px 0px", opacity: 1, duration: node.dataset.motion === "feedback" ? .3 : .9, ease: "sine.out", clearProps: "translate,opacity", overwrite: "auto", onComplete: () => finish(node) });
      });
      const viewport = new IntersectionObserver((entries) => {
        if (!alive) return;
        const entering = [];
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.has(entry.target) || !prepared.has(entry.target)) continue;
          seen.add(entry.target);
          viewport.unobserve(entry.target);
          entering.push(entry.target);
        }
        if (entering.length) enter(entering);
      }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });

      const intro = context.add("intro", (node) => {
        begin(node);
        const art = [...node.querySelectorAll(".intro-backdrop-art")];
        const restingOpacity = art.map((element) => Number(getComputedStyle(element).opacity));
        const copy = node.querySelector(".intro-copy");
        const scene = gsap.timeline({ defaults: { ease: "sine.out" }, onComplete: () => finish(node) }).timeScale(1.2);
        if (copy) scene.fromTo(copy, { translate: "0px 12px", opacity: .65 }, { translate: "0px 0px", opacity: 1, duration: .8, clearProps: "translate,opacity" }, 0);
        if (art.length) scene.fromTo(art, { x: (index) => index ? 28 : -24, opacity: (index) => restingOpacity[index] * .65 }, { x: 0, opacity: (index) => restingOpacity[index], duration: 1, stagger: .06, clearProps: "transform,opacity" }, 0);
        const lines = node.querySelectorAll(".intro-backdrop-detail path");
        if (lines.length) scene.fromTo(lines, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.12, stagger: .06, clearProps: "strokeDasharray,strokeDashoffset" }, .08);
      });
      const hero = context.add("hero", (node) => {
        begin(node);
        const scene = gsap.timeline({ defaults: { ease: "sine.out" }, onComplete: () => finish(node) }).timeScale(1.2);
        scene.fromTo(node, { translate: "0px 16px", opacity: .65 }, { translate: "0px 0px", opacity: 1, duration: .85, clearProps: "translate,opacity" }, 0);
        const accent = node.querySelector(".hero-accent");
        if (accent) scene.fromTo(accent, { scaleX: .4 }, { scaleX: 1, duration: .92, clearProps: "transform" }, .08);
        // The copy/actions travel as one unit, without a second nested rise.
      });
      const menu = context.add("menu", (node) => {
        begin(node);
        gsap.fromTo(node, { translate: "0px -6px", opacity: .7 }, { translate: "0px 0px", opacity: 1, duration: .4, ease: "sine.out", clearProps: "translate,opacity", onComplete: () => finish(node) });
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
          if (animate && positioned) gsap.fromTo(indicator, { x: current.left - box.left, y: current.top - box.top, scaleX: current.width / next.width, scaleY: current.height / next.height }, { ...end, duration: .34, ease: "sine.out", overwrite: "auto" });
          else gsap.set(indicator, end);
          group.dataset.motionEnhanced = "true";
          positioned = true;
        });
        position();
        const resize = new ResizeObserver(() => position());
        resize.observe(group);
        group.querySelectorAll("button").forEach((button) => resize.observe(button));
        const changes = new MutationObserver(() => { if (alive) { position(true); } });
        changes.observe(group, { subtree: true, attributes: true, attributeFilter: ["aria-pressed"] });
        cleanups.push(() => { resize.disconnect(); changes.disconnect(); delete group.dataset.motionEnhanced; });
      }

      function register(node, fresh, visible) {
        if (registered.has(node)) return;
        registered.add(node);
        const kind = node.dataset.motion;
        if (kind === "selection") { selection(node); return; }
        if (["step", "review", "form"].includes(kind)) return;
        if (seen.has(node)) return;
        // The lazy controller may attach after paint. Never rewind readable content.
        if (!fresh && visible) { settle(node); return; }
        if (kind === "intro") { intro(node); return; }
        if (kind === "hero") { hero(node); return; }
        if (kind === "menu") { menu(node); return; }
        if (["card", "composition", "rail", "feedback"].includes(kind)) prepare(node);
      }
      function scan(node, fresh = false) {
        if (!(node instanceof Element)) return;
        const nodes = [...(node.matches("[data-motion]") ? [node] : []), ...node.querySelectorAll("[data-motion]")];
        // Read eligibility together, then prepare with GSAP before the next paint.
        const visibility = fresh ? [] : nodes.map(inView);
        nodes.forEach((element, index) => register(element, fresh, visibility[index]));
      }

      const stateChanged = context.add("stateChanged", (node, before) => {
        if (node.dataset.motion === "hero") {
          gsap.to(node, { translate: "0px 0px", opacity: 1, duration: .6, ease: "sine.out", clearProps: "translate,opacity", overwrite: "auto" });
        } else if (node.dataset.motion === "step") {
          const direction = Number(node.dataset.motionState) > Number(before) ? 1 : -1;
          gsap.fromTo(node, { translate: `${direction * 6}px 0px`, opacity: .84 }, { translate: "0px 0px", opacity: 1, duration: .42, ease: "sine.out", clearProps: "translate,opacity", overwrite: "auto" });
        } else if (node.dataset.motion === "review") {
          gsap.fromTo(node, { opacity: .75 }, { opacity: 1, duration: .32, ease: "sine.out", clearProps: "opacity", overwrite: "auto" });
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
            record.addedNodes.forEach((node) => scan(node, true));
            record.removedNodes.forEach((node) => {
              if (!(node instanceof Element) || scope.contains(node)) return;
              const removed = [node, ...node.querySelectorAll("[data-motion]")];
              removed.forEach((element) => { viewport.unobserve(element); prepared.delete(element); gsap.killTweensOf(element); });
            });
          }
        }
      });
      scan(scope, freshScan);
      freshScan = false;
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
        gsap.fromTo(details, { height: from, overflow: "hidden" }, { height: to, duration: opening ? .36 : .28, ease: "sine.out", onComplete: () => {
          details.open = opening;
          details.style.height = ""; details.style.overflow = "";
          pendingDisclosures.delete(details);
        } });
      });
      scope.addEventListener("click", disclosure);
      return () => {
        alive = false;
        viewport.disconnect(); updates.disconnect();
        prepared.forEach((node) => { node.dataset.motionPhase = seen.has(node) ? "entered" : "idle"; });
        prepared.clear();
        scope.removeEventListener("click", disclosure);
        cleanups.forEach((cleanup) => cleanup());
        pendingDisclosures.forEach((opening, details) => { details.open = opening; details.style.height = ""; details.style.overflow = ""; });
      };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [page], revertOnUpdate: true });
  return null;
}
