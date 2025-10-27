import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const DestinationCard = ({ destination, onLearnMore }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }} // subtle hover
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden bg-white rounded-xl hover:shadow-lg transition-all duration-300">
        {/* Destination Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white drop-shadow-md">
            {destination.name}
          </h3>
        </div>

        <CardHeader className="pb-3">
          <p className="text-muted-foreground line-clamp-3">
            {destination.summary}
          </p>
        </CardHeader>

        <CardContent className="flex-1 pb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0 text-orange-400" />
            <span>
              <span className="font-medium text-gray-800">
                {t("destinations.card.bestTime")}:
              </span>{" "}
              {destination.bestTime}
            </span>
          </div>
        </CardContent>

        <CardFooter>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onLearnMore(destination)}
            className="w-full px-5 py-2.5 rounded-xl bg-orange-400 text-white font-semibold shadow-md hover:bg-orange-500 transition-all duration-300"
          >
            {t("destinations.card.learnMore")}
          </motion.button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DestinationCard;
