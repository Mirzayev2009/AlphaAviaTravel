import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import DestinationCard from "@/components/DestinationCard";
import DestinationDetailsDrawer from "@/components/DestinationDetailsDrawer";
// NOTE: Assuming '@/data/seed' is a fallback or structure template
import { destinations as seedDestinations } from "@/data/seed";

// Static data now served from Vercel CDN (public/data/ folder)
const BASE_URL = "";



const Destinations = () => {
  const { t, i18n } = useTranslation();

  // State to hold ALL fetched multi-language data
  const [allDestinationsData, setAllDestinationsData] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the current language from i18n, defaulting to 'en'
  const currentLang = i18n.language || 'en';

  // 1. Data Fetching (runs once on mount)
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log("🔍 Fetching destinations from: /data/destination.json");
        const response = await fetch("/data/destination.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        const data = rawData.destinations || rawData;
        console.log("✅ Destinations data received:", data);

        // Store the entire multi-language object (e.g., {en: [...], ru: [...]})
        setAllDestinationsData(data);
      } catch (error) {
        console.error("❌ Error fetching destinations:", error);
        setError(error.message);
        // Fallback to seed data if fetch fails
        setAllDestinationsData(seedDestinations);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // 2. Filtering by Language (runs whenever language or fetched data changes)
  const filteredDestinations = useMemo(() => {
    if (!allDestinationsData) {
      return [];
    }

    // Attempt to get destinations for the current language (e.g., allDestinationsData['ru'])
    let destinations = allDestinationsData[currentLang];

    // Fallback: If the current language data is missing, use English
    if (!destinations || !Array.isArray(destinations) || destinations.length === 0) {
      console.warn(`⚠️ No destinations found for ${currentLang}, falling back to 'en'.`);
      destinations = allDestinationsData['en'] || [];
    }

    console.log(`✅ Showing ${destinations.length} destinations for language: ${currentLang}`);
    return destinations;
  }, [allDestinationsData, currentLang]);


  return (
    <div className="min-h-screen">
      {/* Page Header (Unchanged) */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              {t("destinations.title")}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t("destinations.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Loading and Error States */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500 text-lg">
              Error loading destinations: {error}. Showing fallback data.
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-lg">
              {t("destinations.noDestinations")}
            </div>
          ) : (
            <motion.div
              key={currentLang} // Key ensures re-animation on language switch
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onLearnMore={setSelectedDestination}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Details Drawer (Unchanged) */}
      {selectedDestination && (
        <DestinationDetailsDrawer
          destination={selectedDestination}
          open={!!selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </div>
  );
};

export default Destinations;