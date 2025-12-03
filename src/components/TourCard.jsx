import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Calendar, DollarSign, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const IMAGE_BASE_URL = "https://alpha-backend-iieo.onrender.com";

/**
 * TourCard component - Displays tour data directly from backend
 * Backend already provides translated data based on language
 */
const TourCard = ({ tour, onViewDetails, onRegister }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ✅ ADD DEBUGGING - Remove after testing
  console.log("TourCard received tour:", tour);

  // Backend provides pre-translated data, use it directly
  const {
    id,
    title = "",
    destination = "",
    duration = "",
    price = 0,
    short = "",
    images = [],
    image = "",
  } = tour || {};

  // ✅ ADD MORE DEBUGGING
  console.log("Extracted data:", { id, title, price, duration, destination });

  // UI labels (these come from frontend translation files)
  const perPersonLabel = t("card.perPerson", "per person");
  const viewDetailsLabel = t("tours.viewDetails", "View Details");
  const registerLabel = t("card.register", "Register Now");

  // Handle image path
  const imagePath = (images && images.length > 0 && images[0]) || image || "";
  const imageSrc = imagePath ? `${IMAGE_BASE_URL}${imagePath}` : "";

  // Navigate to tour detail page
  const handleRegisterClick = () => {
    navigate(`/tours/${tour.id}`, { state: { tour } });
  };

  // ✅ ADD FALLBACK FOR MISSING DATA
  if (!id || !title) {
    console.error("Invalid tour data:", tour);
    return (
      <Card className="h-full p-4 bg-red-50 border-2 border-red-300">
        <p className="text-red-600 font-bold">Error: Invalid tour data</p>
        <pre className="text-xs mt-2 overflow-auto">
          {JSON.stringify(tour, null, 2)}
        </pre>
      </Card>
    );
  }

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
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              loading="lazy"
              onError={(e) => {
                console.error("Image failed to load:", imageSrc);
                e.target.src = "https://via.placeholder.com/400x300?text=Tour+Image";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-400">No image</p>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            {duration || "N/A"}
          </div>
        </div>

        <CardHeader className="pb-3">
          <h3 className="text-xl text-orange-500 font-bold line-clamp-2">
            {title || "Untitled Tour"}
          </h3>
        </CardHeader>

        <CardContent className="flex-1 pb-3">
          <div className="space-y-2 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 text-orange-400" />
              <span>{destination || "Location TBD"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0 text-orange-400" />
              <span>{duration || "Duration TBD"}</span>
            </div>
          </div>
          <p className="text-sm line-clamp-3">{short || "No description available"}</p>
        </CardContent>

        <CardFooter className="pt-3 flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-baseline gap-1">
              <DollarSign className="h-4 w-4 text-orange-400" />
              <span className="text-2xl font-bold text-orange-500">
                {price || "N/A"}
              </span>
              <span className="text-xs text-muted-foreground">
                {perPersonLabel}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full">
            {/* View Details Button */}
            {/* <motion.button
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
            </motion.button> */}

            {/* Register Button */}
            <motion.button
              onClick={handleRegisterClick}
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
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TourCard;