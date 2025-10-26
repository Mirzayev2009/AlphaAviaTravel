import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import DestinationCard from "@/components/DestinationCard";
import DestinationDetailsDrawer from "@/components/DestinationDetailsDrawer";
import { destinations } from "@/data/seed";

const Destinations = () => {
  const { t } = useTranslation();
  const [selectedDestination, setSelectedDestination] = useState(null);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl text-orange-400 font-bold mb-4">
              {t("destinations.title")}
            </h1>
            <p className="text-xl text-blue-600  max-w-2xl mx-auto">
              {t("destinations.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
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
