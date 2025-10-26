import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

/**
 * TourCard component
 * @param {Object} tour - Tour data object
 * @param {Function} onViewDetails - Handler for viewing full tour details
 * @param {Function} onRegister - Handler for registration
 */
const TourCard = ({ tour, onViewDetails, onRegister }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
        {/* Tour Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={tour.images[0]}
            alt={tour.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            {tour.duration}
          </div>
        </div>

        <CardHeader className="pb-3">
          <h3 className="text-xl text-orange-400 font-bold line-clamp-2">{tour.title}</h3>
        </CardHeader>

        <CardContent className="flex-1 pb-3">
          <div className="space-y-2 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{tour.destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>{tour.duration}</span>
            </div>
          </div>
          <p className="text-sm line-clamp-3">{tour.short}</p>
        </CardContent>

        <CardFooter className="pt-3 flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-baseline gap-1">
              <DollarSign className="h-4 w-4 text-orange-400" />
              <span className="text-2xl font-bold text-orange-400">{tour.price}</span>
              <span className="text-xs text-muted-foreground">{t("tours.card.perPerson")}</span>
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(tour)}
              className="flex-1"
            >
              {t("tours.card.viewDetails")}
            </Button>
            <Button
              size="sm"
              onClick={() => onRegister(tour)}
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {t("tours.card.register")}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TourCard;
