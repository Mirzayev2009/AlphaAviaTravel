import { useEffect, useState } from "react"; // Added useEffect for the fetch
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SwiperHero from "@/components/SwiperHero";
import TourCard from "@/components/TourCard";
import TourModal from "@/components/TourModal";
import RegistrationForm from "@/components/RegistrationForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Heart, Map, Globe } from "lucide-react";
import { tours } from "@/data/seed";

const BASE_URL = "https://alpha-backend-iieo.onrender.com/api"

// 🎯 New: Skeleton Loader Component
const TourCardSkeleton = () => (
  <div className="animate-pulse bg-white border border-gray-100 rounded-2xl shadow-sm h-full max-h-[400px]">
    <div className="h-48 md:h-56 bg-gray-200 rounded-t-2xl"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-300 w-3/4 mb-3 rounded"></div>
      <div className="h-4 bg-gray-200 w-1/2 mb-4 rounded"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-8 bg-gray-200 w-1/4 rounded-lg"></div>
        <div className="h-10 bg-orange-300 w-1/3 rounded-xl"></div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedTour, setSelectedTour] = useState(null);
  const [registrationTour, setRegistrationTour] = useState(null);

  // Category filter state (added)
  const [selectedCategory, setSelectedCategory] = useState("uzbekistan");

  const [toursData, setToursData] = useState(tours);
  const [isLoading, setIsLoading] = useState(true);

  // 🎯 FIX: Derive currentTours and featuredTours from the state (toursData)
  const currentTours = toursData[selectedCategory] || [];
  const featuredTours = currentTours.slice(0, 3);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/tours`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setToursData(data.tours || data);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setToursData(tours);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  // NOTE: Removed console.log(toursData) for cleaner production code.
  // console.log(toursData);

  // NOTE: Removed duplicated and now incorrect featured tours calculation:
  // const allTours = selectedCategory === "uzbekistan" ? tours.uzbekistan : tours.world;
  // const featuredTours = allTours.slice(0, 3);

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

          {/* Category selector (UZ / World) */}
          <div className="flex justify-center gap-6 mb-6">
            <motion.button
              onClick={() => setSelectedCategory("uzbekistan")}
              className={`relative px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 ${
                selectedCategory === "uzbekistan"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xl scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center gap-3">
                <Map className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-sm opacity-80">Explore</div>
                  <div className="text-base font-semibold">Uzbekistan</div>
                </div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => setSelectedCategory("world")}
              className={`relative px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 ${
                selectedCategory === "world"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-2xl scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center w-25 gap-3">
                <Globe className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-sm opacity-80">Discover</div>
                  <div className="text-base font-semibold">World</div>
                </div>
              </div>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* 🎯 FIX: Conditional rendering for loading state */}
            {isLoading ? (
              <>
                <TourCardSkeleton />
                <TourCardSkeleton />
                <TourCardSkeleton />
              </>
            ) : currentTours.length > 0 ? (
              featuredTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  onViewDetails={setSelectedTour}
                  onRegister={setRegistrationTour}
                />
              ))
            ) : (
              // Fallback if the selected category is empty after loading
              <div className="col-span-full text-center py-12 text-gray-500 text-lg">
                {t("home.noToursAvailable", "No tours found in this category.")}
              </div>
            )}
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

      {/* Why Choose Us Section (no changes needed) */}
      {/* ... */}
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
                title: t("home.aboutcard1Title"),
                text: t("home.aboutcard1Text"),
                delay: 0.1,
              },
              {
                Icon: Award,
                title: t("home.aboutcard2Title"),
                text: t("home.aboutcard2Text"),
                delay: 0.2,
              },
              {
                Icon: Heart,
                title: t("home.aboutcard3Title"),
                text: t("home.aboutcard3Text"),
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

      {/* Modals (no changes needed) */}
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
