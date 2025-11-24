import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import DestinationCard from "@/components/DestinationCard";
import DestinationDetailsDrawer from "@/components/DestinationDetailsDrawer";
import { destinations } from "@/data/seed";

const BASE_URL = "https://alpha-backend-iieo.onrender.com/api"



const Destinations = () => {
  const { t } = useTranslation();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinationsData, setDestinationsData] = useState(destinations);
  const [isLoading, setIsLoading] = useState(true);
  console.log(destinationsData);
  
  
    useEffect(() => {
      const fetchDestinations = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`${BASE_URL}/destinations`);
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          // The API returns { tours: { uzbekistan: [...], world: [...] } }
          // so we need to access data.tours
          setDestinationsData(data.tours || data);
        } catch (error) {
          console.error("Error fetching tours:", error);
          // Fallback to seed data if fetch fails
          setDestinationsData(destinations);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchDestinations();
    }, []);
  

  return (
    <div className="min-h-screen">
      {/* Page Header */}

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinationsData.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onLearnMore={setSelectedDestination}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Details Drawer */}
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
