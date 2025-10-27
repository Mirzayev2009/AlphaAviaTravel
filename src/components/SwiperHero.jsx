import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const heroSlides = [
  {
    image:
      "https://media.gettyimages.com/id/638640833/photo/uzbekistan-samarkand-shah-i-zinda.jpg?s=612x612&w=0&k=20&c=4dssHu44u48kyZmzw5IzpWff1zAev9vRcZ1HKIzHJ8I=",
    alt: "Registan Square, Samarkand",
    titleKey: "hero.slides.0.title",
    subtitleKey: "hero.slides.0.subtitle",
  },
  {
    image:
      "https://media.gettyimages.com/id/638640851/photo/uzbekistan-bukhara-kalyan-mosque.jpg?s=612x612&w=0&k=20&c=GJV7czcCrZ0jaa9K7J9juZDu84Ke7f-U2cswo6Z7SKQ=",
    alt: "Bukhara Old Town",
    titleKey: "hero.slides.1.title",
    subtitleKey: "hero.slides.1.subtitle",
  },
  {
    image:
      "https://media.gettyimages.com/id/1402157472/photo/khiva-kalta-minor-minaret-itchan-kala-uzbekistan.jpg?s=612x612&w=0&k=20&c=FvS0cjMNaR0Z-_h-oDT1QZXjHzfhQS9uxP3QRY8zcOc=",
    alt: "Khiva Fortress",
    titleKey: "hero.slides.2.title",
    subtitleKey: "hero.slides.2.subtitle",
  },
];

const SwiperHero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/70",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
        }}
        loop={true}
        className="h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              {/* Image with overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
              <img
                src={slide.image}
                alt={slide.alt}
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
                      {t(slide.titleKey)}
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                      {t(slide.subtitleKey)}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        onClick={() => navigate("/tours")}
                        className="bg-orange-400 hover:bg-orange-500 text-primary-foreground shadow-lg"
                      >
                        {t("hero.cta")}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate("/destinations")}
                        className="bg-white/10 hover:bg-white/20 text-white border-white/50 backdrop-blur-sm shadow-lg"
                      >
                        {t("hero.ctaSecondary")}
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperHero;
