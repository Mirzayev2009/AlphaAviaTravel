// Playback is event driven, so an inactive hero does no animation work.
export function bindCarouselPlayback(element, swiper, { paused, reduceMotion, hoverCapable = true, document: page = document, Observer = IntersectionObserver } = {}) {
  let inView = true;
  let hovered = hoverCapable && !!element.matches?.(":hover");
  const sync = () => {
    if (swiper.destroyed || !swiper.autoplay) return;
    const autoplay = swiper.autoplay;
    const allowed = !paused && !reduceMotion && !page.hidden && inView && !hovered;
    if (allowed && !autoplay.running) autoplay.start();
    if (!allowed && autoplay.running) autoplay.stop();
  };
  const enter = () => { hovered = hoverCapable; sync(); };
  const leave = () => { hovered = false; sync(); };
  const observer = new Observer(([entry]) => { inView = entry.isIntersecting && entry.intersectionRatio > .05; sync(); }, { threshold: [0, .05] });
  observer.observe(element);
  element.addEventListener("mouseenter", enter);
  element.addEventListener("mouseleave", leave);
  page.addEventListener("visibilitychange", sync);
  sync();
  return () => {
    observer.disconnect();
    element.removeEventListener("mouseenter", enter);
    element.removeEventListener("mouseleave", leave);
    page.removeEventListener("visibilitychange", sync);
    // Swiper's layout cleanup can run before React's passive cleanup.
    if (!swiper.destroyed) swiper.autoplay?.stop();
  };
}
