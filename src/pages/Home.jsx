import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SwiperHero from "@/components/SwiperHero";
import TourCard from "@/components/TourCard";
import TourModal from "@/components/TourModal";
import RegistrationForm from "@/components/RegistrationForm";
import { Button } from "@/components/ui/button";
import { tours } from "@/data/seed";
import { useState } from "react";
import { ArrowRight, CheckCircle, Users, Award, Heart } from "lucide-react";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedTour, setSelectedTour] = useState(null);
  const [registrationTour, setRegistrationTour] = useState(null);

  // Featured tours (first 3)
  const featuredTours = tours.slice(0, 3);

  return (
    <div>
      {/* Hero Swiper */}
      <SwiperHero />

      {/* Featured Tours Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
              {t("home.featuredTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("home.featuredSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onViewDetails={setSelectedTour}
                onRegister={setRegistrationTour}
              />
            ))}
          </div>

          <div className="text-center flex justify-center">
            <motion.button
              onClick={() => navigate("/tours")}
              className="relative flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold text-orange-500 bg-white border border-orange-300 shadow-md overflow-hidden transition-all duration-300"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              whileHover={{
                scale: 1.07,
                color: "#fff",
                backgroundColor: "#fb923c",
                boxShadow: "0 0 40px rgba(255,140,0,0.6)",
                transition: { type: "spring", stiffness: 200, damping: 12 },
              }}
              whileTap={{
                scale: 0.94,
                boxShadow: "0 0 20px rgba(255,100,0,0.7)",
              }}
            >
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="font-semibold"
              >
                {t("hero.cta")}
              </motion.span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>

              {/* Animated shimmer overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 opacity-0 rounded-xl"
                whileHover={{
                  opacity: 0.25,
                  x: [0, 50, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white text-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.05),transparent_70%)] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-500 drop-shadow-[0_0_6px_rgba(255,165,0,0.2)]">
              {t("home.aboutTitle")}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("home.aboutText")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                Icon: Users,
                title: "Expert Guides",
                text: "Our passionate guides bring history and culture alive with deep local knowledge.",
                delay: 0.1,
              },
              {
                Icon: Award,
                title: "15+ Years Experience",
                text: "Over a decade of creating unforgettable Uzbekistan adventures for travelers worldwide.",
                delay: 0.2,
              },
              {
                Icon: Heart,
                title: "Personalized Service",
                text: "We tailor every tour to your interests, ensuring a truly personal experience.",
                delay: 0.3,
              },
            ].map(({ Icon, title, text, delay }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay }}
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                className="text-center bg-white border border-gray-100 shadow-sm hover:shadow-[0_0_25px_rgba(255,165,0,0.3)] rounded-2xl p-8 transition-all duration-300"
              >
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, 10, -10, 0],
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-400 flex items-center justify-center mb-6 shadow-md relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.5),transparent_70%)] opacity-50"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <Icon className="h-10 w-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                </motion.div>

                <h3 className="text-xl font-semibold mb-3 text-orange-500 tracking-wide">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => navigate("/about")}
              className="relative px-8 py-3 rounded-lg border border-orange-400 text-orange-500 hover:text-white hover:bg-orange-500 transition-all duration-300 font-semibold overflow-hidden shadow-sm"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(255,165,0,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t("home.aboutCta")}
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600 opacity-0"
                whileHover={{
                  opacity: 0.2,
                  x: [0, 60, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      {selectedTour && (
        <TourModal
          tour={selectedTour}
          open={!!selectedTour}
          onClose={() => setSelectedTour(null)}
          onRegister={() => {
            setRegistrationTour(selectedTour);
            setSelectedTour(null);
          }}
        />
      )}

      {registrationTour && (
        <RegistrationForm
          tour={registrationTour}
          open={!!registrationTour}
          onClose={() => setRegistrationTour(null)}
        />
      )}
    </div>
  );
};

export default Home;
