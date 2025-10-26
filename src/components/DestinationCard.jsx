import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

/**
 * DestinationCard component
 * @param {Object} destination - Destination data
 * @param {Function} onLearnMore - Handler for viewing details
 */
const DestinationCard = ({ destination, onLearnMore }) => {
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
        {/* Destination Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white drop-shadow-lg">
            {destination.name}
          </h3>
        </div>

        <CardHeader className="pb-3">
          <p className="text-muted-foreground line-clamp-3">{destination.summary}</p>
        </CardHeader>

        <CardContent className="flex-1 pb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>
              <span className="font-medium">{t("destinations.card.bestTime")}:</span>{" "}
              {destination.bestTime}
            </span>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => onLearnMore(destination)}
            className="w-full"
            variant="outline"
          >
            {t("destinations.card.learnMore")}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DestinationCard;
