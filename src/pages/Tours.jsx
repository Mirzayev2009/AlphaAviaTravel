import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Globe, Map } from "lucide-react";
import TourCard from "@/components/TourCard";
import TourModal from "@/components/TourModal";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

// Static data now served from Vercel CDN (public/data/ folder)
const BASE_URL = "";

const ToursPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("uzbekistan");
  const [selectedTour, setSelectedTour] = useState(null);
  const [registrationTour, setRegistrationTour] = useState(null);
  const [allToursData, setAllToursData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  const currentLang = i18n.language || 'en';
  const recommendParam = searchParams.get("recommend") || "";
  const recommendedKeywords = useMemo(() => {
    if (!recommendParam) return [];
    return recommendParam.split(",").map((k) => k.trim().toLowerCase());
  }, [recommendParam]);

  // Fetch ALL tours data once on mount
  useEffect(() => {
    const fetchAllTours = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log("🔍 Fetching tours from: /data/tours.json");
        const response = await fetch("/data/tours.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        const data = rawData.tours || rawData;
        console.log("✅ Tours data received:", data);

        setAllToursData(data);
      } catch (error) {
        console.error("❌ Error fetching tours:", error);
        setError(error.message);
        setAllToursData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllTours();
  }, []);

  // Filter tours based on current language and category
  const filteredTours = useMemo(() => {
    console.log("🎯 Filtering tours with:", {
      allToursData,
      selectedCategory,
      currentLang
    });

    if (!allToursData) {
      console.log("⚠️ No tours data available");
      return [];
    }

    // Get tours for selected category
    const categoryData = allToursData[selectedCategory];
    console.log(`📁 Category data for '${selectedCategory}':`, categoryData);

    if (!categoryData) {
      console.log("⚠️ No data for category:", selectedCategory);
      return [];
    }

    // Get tours for current language
    const languageTours = categoryData[currentLang];
    console.log(`🌐 Tours for language '${currentLang}':`, languageTours);

    if (!languageTours || !Array.isArray(languageTours)) {
      console.log(`⚠️ No tours for language '${currentLang}', falling back to English`);
      const fallbackTours = categoryData['en'] || [];
      console.log("📦 Fallback tours:", fallbackTours);
      return fallbackTours;
    }

    console.log(`✅ Returning ${languageTours.length} tours`);
    return languageTours;
  }, [allToursData, selectedCategory, currentLang]);

  // Debug: Log filtered tours whenever they change
  useEffect(() => {
    console.log("🎨 Filtered tours to render:", filteredTours);
  }, [filteredTours]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              {t("tours.title")}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t("tours.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Selector */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { key: "uzbekistan", icon: Map, label: t("tours.uzTours"), sub: t("tours.explore") },
              { key: "central_asia", icon: Globe, label: t("tours.centralAsiaTours"), sub: t("tours.findOut") },
              { key: "world", icon: Globe, label: t("tours.worldTours"), sub: t("tours.discover") },
            ].map(({ key, icon: Icon, label, sub }) => (
              <motion.button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                  selectedCategory === key
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon className={`h-4 w-4 ${selectedCategory === key ? "text-white" : "text-orange-400"}`} />
                <span className="hidden sm:inline text-xs opacity-70">{sub}</span>
                <span className="font-bold">{label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-500 text-lg mb-4">
                {t("tours.errorLoading")}: {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                {t("tours.retry")}
              </button>
            </div>
          ) : (
            <motion.div
              key={`${selectedCategory}-${currentLang}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >


              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTours.length > 0 ? (
                  filteredTours.map((tour, index) => {
                    console.log(`🎴 Rendering tour ${index}:`, tour);
                    return (
                      <TourCard
                        key={tour.id || index}
                        tour={tour}
                        highlighted={recommendedKeywords.some(
                          (kw) =>
                            (tour.id && tour.id.toLowerCase().includes(kw)) ||
                            (tour.title && tour.title.toLowerCase().includes(kw)) ||
                            (tour.destination && tour.destination.toLowerCase().includes(kw))
                        )}
                        onViewDetails={setSelectedTour}
                        onRegister={setRegistrationTour}
                      />
                    );
                  })
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">
                      {t("tours.noToursAvailable")}
                    </p>

                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modals */}
      <TourModal
        tour={selectedTour}
        open={!!selectedTour}
        onClose={() => setSelectedTour(null)}
        onRegister={setRegistrationTour}
      />

      {registrationTour && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">
              {t("tours.registerFor")} {registrationTour.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {t("tours.registrationMessage")}
            </p>
            <button
              onClick={() => setRegistrationTour(null)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
            >
              {t("tours.close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToursPage;