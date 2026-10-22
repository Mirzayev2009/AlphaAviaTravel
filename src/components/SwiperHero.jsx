import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { bindCarouselPlayback } from "@/lib/carousel-playback";
import { TravelImage } from "./TravelUI";
import "swiper/css/effect-fade";

// On mobile, start from the most visually striking slide (Shah-i-Zinda = index 2).
// Desktop keeps the original first slide (Registan Square = index 0).
const getMobileInitialSlide = () =>
  typeof window !== "undefined" && window.innerWidth < 768 ? 2 : 0;

const slides = [
  { image: "/iStock-1249451586.jpg", alt: "Registan Square, Samarkand" },
  { image: "/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", alt: "Bukhara Old Town" },
  { image: "/JEdlGQQRmulKXI53aOAAVzFgOUshxkSjFbyHg92K.webp", alt: "Shah-i-Zinda, Samarkand" },
];
const reducedMotionQuery = () => window.matchMedia("(prefers-reduced-motion: reduce)");
const subscribeMotion = (callback) => {
  const query = reducedMotionQuery();
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};

export default function SwiperHero() {
  const { t } = useTranslation();
  const root = useRef(null);
  const slider = useRef(null);
  // Compute the initial slide once (before first render) so SSR & hydration match.
  const initialSlide = useRef(getMobileInitialSlide());
  const [active, setActive] = useState(initialSlide.current);
  const [paused, setPaused] = useState(false);
  const title = t("hero.slides." + (active + 1) + ".title");
  const reduceMotion = useSyncExternalStore(subscribeMotion, () => reducedMotionQuery().matches, () => true);

  useEffect(() => {
    if (!slider.current?.autoplay) return;
    return bindCarouselPlayback(root.current, slider.current, {
      paused,
      reduceMotion,
      hoverCapable: window.matchMedia("(hover: hover)").matches,
    });
  }, [paused, reduceMotion]);

  return (
    <section
      ref={root}
      className="hero"
      aria-roledescription={t("design.carousel")}
      aria-label={t("design.destinationsCarousel")}
      onFocusCapture={() => setPaused(true)}
    >
      <div className="hero-copy" data-motion="hero" data-motion-state={active}>
        <h1>{title}</h1>
        <span className="hero-accent" aria-hidden="true" />
        <p>{t("hero.slides." + (active + 1) + ".subtitle")}</p>
        <div className="hero-actions">
          <Link className="button" to="/tours">{t("hero.cta")}</Link>
          <Link className="text-link" to="/destinations">{t("hero.ctaSecondary")}<ArrowRight size={16} /></Link>
        </div>
      </div>

      <div className="hero-frame">
        <Swiper
          modules={[A11y, Autoplay, EffectFade, Keyboard]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={reduceMotion ? 0 : 400}
          loop
          initialSlide={initialSlide.current}
          keyboard={{ enabled: true, onlyInViewport: true }}
          autoplay={reduceMotion ? false : { delay: 7500, disableOnInteraction: false }}
          onSwiper={(instance) => { slider.current = instance; }}
          onSlideChange={(instance) => setActive(instance.realIndex)}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.image}>
              <TravelImage
                className="hero-panorama"
                src={slide.image}
                alt={slide.alt}
                eager={index === initialSlide.current}
                sizes="100vw"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hero-controls">
          <div className="slide-tabs" role="group" aria-label={t("design.chooseSlide")}>
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                aria-label={t("design.slide") + " " + (index + 1)}
                aria-pressed={index === active}
                onClick={() => slider.current?.slideToLoop(index)}
              />
            ))}
          </div>
          <div className="hero-controls-right">
            <button className="icon-button" aria-label={t("design.previous")} onClick={() => slider.current?.slidePrev()}>
              <ChevronLeft size={19} />
            </button>
            <button className="icon-button" aria-label={t("design.next")} onClick={() => slider.current?.slideNext()}>
              <ChevronRight size={19} />
            </button>
            {!reduceMotion && (
              <button className="icon-button" aria-label={t(paused ? "design.play" : "design.pause")} onClick={() => setPaused(!paused)}>
                {paused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
