import { useRef, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TravelImage } from "./TravelUI";
import "swiper/css/effect-fade";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const slides = [
  { image: "/iStock-1249451586.jpg", alt: "Registan Square, Samarkand" },
  { image: "/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", alt: "Bukhara Old Town" },
  { image: "/JEdlGQQRmulKXI53aOAAVzFgOUshxkSjFbyHg92K.webp", alt: "Shah-i-Zinda, Samarkand" },
];
const reducedMotionQuery = () => window.matchMedia("(prefers-reduced-motion: reduce)");
const subscribeMotion = (callback) => { const query = reducedMotionQuery(); query.addEventListener("change", callback); return () => query.removeEventListener("change", callback); };

export default function SwiperHero() {
  const { t } = useTranslation();
  const root = useRef(null);
  const slider = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useSyncExternalStore(subscribeMotion, () => reducedMotionQuery().matches, () => true);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { duration: .75, ease: "expo.out", clearProps: "transform,opacity" } });
      intro.fromTo(".hero-copy h1", { y: 16, opacity: .7 }, { y: 0, opacity: 1 })
        .fromTo(".hero-copy p, .hero-actions", { y: 12, opacity: .75 }, { y: 0, opacity: 1, stagger: .06 }, "<.1");
      gsap.fromTo(".hero-panorama", { scale: 1 }, { scale: 1.045, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: .7 } });
    });
    return () => media.revert();
  }, { scope: root });
  return <section ref={root} className="hero" aria-roledescription={t("design.carousel")} aria-label={t("design.destinationsCarousel")}>
    <div className="hero-copy"><h1>{t("hero.slides." + (active + 1) + ".title")}</h1><p>{t("hero.slides." + (active + 1) + ".subtitle")}</p>
      <div className="hero-actions"><Link className="button" to="/tours">{t("hero.cta")}</Link><Link className="text-link" to="/destinations">{t("hero.ctaSecondary")}<ArrowRight size={16}/></Link></div>
    </div>
    <div className="hero-frame">
      <Swiper modules={[A11y, Autoplay, EffectFade, Keyboard]} effect="fade" fadeEffect={{ crossFade: true }} speed={reduceMotion ? 0 : 650} loop keyboard={{ enabled: true, onlyInViewport: true }}
        autoplay={reduceMotion ? false : { delay: 7500, disableOnInteraction: false, pauseOnMouseEnter: true }} onSwiper={(instance) => { slider.current = instance; }} onSlideChange={(instance) => setActive(instance.realIndex)}
        onFocusCapture={() => { slider.current?.autoplay?.stop(); setPaused(true); }}>
        {slides.map((slide, index) => <SwiperSlide key={slide.image}><TravelImage className="hero-panorama" src={slide.image} alt={slide.alt} eager={index === 0}/></SwiperSlide>)}
      </Swiper>
      <div className="hero-controls">
        <div className="slide-tabs" role="group" aria-label={t("design.chooseSlide")}>{slides.map((slide, index) => <button key={slide.image} aria-label={t("design.slide") + " " + (index + 1)} aria-pressed={index === active} onClick={() => slider.current?.slideToLoop(index)}/>)}</div>
        <div className="hero-controls-right"><button className="icon-button" aria-label={t("design.previous")} onClick={() => slider.current?.slidePrev()}><ChevronLeft size={19}/></button><button className="icon-button" aria-label={t("design.next")} onClick={() => slider.current?.slideNext()}><ChevronRight size={19}/></button>
          {!reduceMotion && <button className="icon-button" aria-label={t(paused ? "design.play" : "design.pause")} onClick={() => { if (paused) slider.current?.autoplay.start(); else slider.current?.autoplay.stop(); setPaused(!paused); }}>{paused ? <Play size={16}/> : <Pause size={16}/>}</button>}
        </div>
      </div>
    </div>
  </section>;
}
