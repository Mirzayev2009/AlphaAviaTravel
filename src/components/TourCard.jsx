import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

/**
 * TourCard component
 * - Uses translations from `tours` namespace (detail.<tour.id>.*)
 * - Falls back to values from `tour` prop when translations are missing
 *
 * @param {Object} tour - Tour data object (must include stable `id`)
 * @param {Function} onViewDetails - Handler for viewing full tour details
 * @param {Function} onRegister - Handler for registration
 */
const TourCard = ({ tour, onViewDetails, onRegister }) => {
  // use the 'tours' namespace so translations live under public/locales/<lang>/tours.json
  const { t, i18n } = useTranslation("tours");

  // Safe helper: return translated string or fallback
  const tx = (path, fallback) =>
    // use defaultValue so i18next returns fallback if key missing
    t(path, { defaultValue: fallback });

  // Strings (simple)
  const title = tx(`detail.${tour.id}.title`, tour.title || "");
  const destination = tx(`detail.${tour.id}.destination`, tour.destination || "");
  const duration = tx(`detail.${tour.id}.duration`, tour.duration || "");
  const price = tx(`detail.${tour.id}.price`, tour.price || "");
  const dates = tx(`detail.${tour.id}.dates`, tour.dates || "");
  const short = tx(`detail.${tour.id}.short`, tour.short || "");

  // Arrays / objects: use returnObjects:true and fallback to provided tour fields
  const highlights =
    t(`detail.${tour.id}.highlights`, {
      returnObjects: true,
      defaultValue: tour.highlights || [],
    }) || [];

  const itinerary =
    t(`detail.${tour.id}.itinerary`, {
      returnObjects: true,
      defaultValue: tour.itinerary || [],
    }) || [];

  // UI labels inside the same namespace (or your common namespace) — adjust if needed
  const perPersonLabel = t("card.perPerson", { defaultValue: "per person" });
  const viewDetailsLabel = t("card.viewDetails", { defaultValue: "View Details" });
  const registerLabel = t("card.register", { defaultValue: "Register Now" });
  const dayLabel = t("modal.day", { defaultValue: "Day" });

  // image fallback (some tours use `images` array, some `image`)
  const imageSrc =
    (tour.images && tour.images.length > 0 && tour.images[0]) ||
    tour.image ||
    "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="h-full w-full"
    >
      <Card className="h-full p-0 pb-7 flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 bg-white rounded-xl">
        {/* Tour Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            {duration}
          </div>
        </div>

        <CardHeader className="pb-3">
          <h3 className="text-xl text-orange-500 font-bold line-clamp-2">
            {title}
          </h3>
        </CardHeader>

        <CardContent className="flex-1 pb-3">
          <div className="space-y-2 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 text-orange-400" />
              <span>{destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0 text-orange-400" />
              <span>{duration}</span>
            </div>
          </div>
          <p className="text-sm line-clamp-3">{short}</p>
        </CardContent>

        <CardFooter className="pt-3 flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-baseline gap-1">
              <DollarSign className="h-4 w-4 text-orange-400" />
              <span className="text-2xl font-bold text-orange-500">
                {price}
              </span>
              <span className="text-xs text-muted-foreground">
                {perPersonLabel}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 w-full">
            {/* View Details Button */}
            <motion.button
              onClick={() => onViewDetails(tour)}
              className="flex-1 px-4 py-2 rounded-lg border border-orange-300 text-orange-500 font-medium bg-white shadow-sm relative overflow-hidden transition-all"
              whileHover={{
                scale: 1.05,
                color: "#fff",
                backgroundColor: "#fb923c",
                boxShadow: "0 0 25px rgba(255,140,0,0.5)",
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              {viewDetailsLabel}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 opacity-0"
                whileHover={{
                  opacity: 0.2,
                  x: [0, 40, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.button>

            {/* Register Button */}
            <motion.button
              onClick={() => onRegister(tour)}
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 text-white font-semibold shadow-md relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 35px rgba(255,140,0,0.6)",
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              {registerLabel}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-600 via-yellow-400 to-orange-600 opacity-0"
                whileHover={{
                  opacity: 0.25,
                  x: [0, 60, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.button>
          </div>



          {/* Note: itinerary is not rendered fully here to keep card compact — use modal/page to show full itinerary */}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TourCard;
