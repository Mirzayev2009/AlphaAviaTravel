import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import TourCard from "./TourCard";
import TourModal from "./TourModal";
import RegistrationForm from "./RegistrationForm";
import { tours } from "@/data/seed";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TourList = () => {
  const { t } = useTranslation();
  const [selectedTour, setSelectedTour] = useState(null);
  const [registrationTour, setRegistrationTour] = useState(null);
  const [destinationFilter, setDestinationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  // Get unique destinations
  const destinations = useMemo(() => {
    const unique = [...new Set(tours.map((tour) => tour.destination))];
    return ["all", ...unique];
  }, []);

  // Filter tours
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchesDestination =
        destinationFilter === "all" || tour.destination === destinationFilter;
      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "budget" && tour.price < 300) ||
        (priceFilter === "mid" && tour.price >= 300 && tour.price < 600) ||
        (priceFilter === "luxury" && tour.price >= 600);
      return matchesDestination && matchesPrice;
    });
  }, [destinationFilter, priceFilter]);

  const handleViewDetails = (tour) => {
    setSelectedTour(tour);
  };

  const handleRegister = (tour) => {
    setRegistrationTour(tour);
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Select value={destinationFilter} onValueChange={setDestinationFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder={t("tours.filter.destination")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("tours.filter.all")}</SelectItem>
            {destinations.slice(1).map((dest) => (
              <SelectItem key={dest} value={dest}>
                {dest}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder={t("tours.filter.price")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("tours.filter.all")}</SelectItem>
            <SelectItem value="budget">Budget (&lt; $300)</SelectItem>
            <SelectItem value="mid">Mid-range ($300-$600)</SelectItem>
            <SelectItem value="luxury">Luxury ($600+)</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            onViewDetails={handleViewDetails}
            onRegister={handleRegister}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredTours.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">No tours match your filters. Try adjusting your selection.</p>
        </motion.div>
      )}

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

export default TourList;
