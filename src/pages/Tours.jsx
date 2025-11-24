import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Map } from "lucide-react";
import TourCard from "@/components/TourCard";
import TourModal from "@/components/TourModal";
import { tours } from "@/data/seed";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";


// Main Tours Component
const ToursPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("uzbekistan");
  const [selectedTour, setSelectedTour] = useState(null);
  const [registrationTour, setRegistrationTour] = useState(null);
  // Initialize with the seed data structure to prevent undefined errors
  const [toursData, setToursData] = useState(tours);
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();

  const currentTours = toursData[selectedCategory] || [];

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/tours`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // The API returns { tours: { uzbekistan: [...], world: [...] } }
        // so we need to access data.tours
        setToursData(data.tours || data);
      } catch (error) {
        console.error("Error fetching tours:", error);
        // Fallback to seed data if fetch fails
        setToursData(tours);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  console.log(toursData);
  

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
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.button
              onClick={() => setSelectedCategory("uzbekistan")}
              className={`relative px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                selectedCategory === "uzbekistan"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xl scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-3">
                <Map className="h-7 w-7" />
                <div className="text-left">
                  <div className="text-sm opacity-80">{t("tours.explore")}</div>
                  <div className="text-xl font-bold">{t("tours.uzTours")}</div>
                </div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => setSelectedCategory("world")}
              className={`relative px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                selectedCategory === "world"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-2xl scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-3">
                <Globe className="h-7 w-7" />
                <div className="text-left">
                  <div className="text-sm opacity-80">
                    {t("tours.discover")}
                  </div>
                  <div className="text-xl font-bold">
                    {t("tours.worldTours")}
                  </div>
                </div>
              </div>
            </motion.button>
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
          ) : (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  {selectedCategory === "uzbekistan"
                    ? t("tours.uzSubtitle")
                    : t("tours.worldSubtitle")}
                </h2>
                <p className="text-gray-600">
                  {selectedCategory === "uzbekistan"
                    ? t("tours.uzDescription")
                    : t("tours.worldDescription")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTours.length > 0 ? (
                  currentTours.map((tour) => (
                    <TourCard
                      key={tour.id}
                      tour={tour}
                      onViewDetails={setSelectedTour}
                      onRegister={setRegistrationTour}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No tours available in this category yet.
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
              Register for {registrationTour.title}
            </h3>
            <p className="text-gray-600 mb-4">
              Registration form would go here. Contact us to book this tour!
            </p>
            <button
              onClick={() => setRegistrationTour(null)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToursPage;