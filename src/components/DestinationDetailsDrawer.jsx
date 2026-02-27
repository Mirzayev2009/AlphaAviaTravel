import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Calendar, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const IMAGE_BASE_URL = ""; // Images now served from same domain via CDN
/**
 * DestinationDetailsDrawer - Right-side drawer with full destination info
 */
const DestinationDetailsDrawer = ({ destination, open, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!destination) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl p-0 bg-white shadow-xl rounded-l-2xl">
        {/* Header */}
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle className="text-2xl font-bold text-orange-500 pr-8">
            {destination.name}
          </SheetTitle>
          <SheetClose />
        </SheetHeader>

        {/* Scrollable Content */}
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-6 pt-4">
            {/* Hero Image */}
            {destination.heroImage && (
              <img
                // 2. Prepend the Base URL to the heroImage path
                src={`${IMAGE_BASE_URL}${destination.heroImage}`}
                alt={destination.name}
                className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
                loading="lazy"
              />
            )}

            {/* Quick Info */}
            <div className="grid grid-cols-1 gap-4 mb-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Summary</p>
                  <p className="text-sm text-gray-700">{destination.summary}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Best Time to Visit
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {destination.bestTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Travel Tips
                  </p>
                  <p className="text-sm text-gray-700">
                    {destination.travelTips}
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Description */}
            <div className="mb-6 p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-orange-500">✦</span>
                What Makes It Special
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {destination.featureDescription}
              </p>
            </div>

            {/* Must See Attractions */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                🎯 Must-See Attractions
              </h3>
              <div className="space-y-3">
                {destination.mustSee.map((item, index) => {
                  const [title, ...descParts] = item.split(":");
                  const description = descParts.join(":").trim();
                  return (
                    <div
                      key={index}
                      className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <p className="font-semibold text-gray-800 mb-1">
                        {title}
                      </p>
                      {description && (
                        <p className="text-sm text-gray-600">{description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nature & Landscape */}
            <div className="mb-6 p-5 bg-green-50 rounded-xl border border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-green-600">🌿</span>
                Nature & Landscape
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {destination.nature}
              </p>
            </div>

            {/* Food & Cuisine */}
            <div className="mb-6 p-5 bg-amber-50 rounded-xl border border-amber-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-amber-600">🍽️</span>
                Food & Cuisine
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {destination.food}
              </p>
            </div>

            {/* Getting There */}
            <div className="mb-6 p-5 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-blue-600">🚂</span>
                Getting There
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {destination.gettingThere}
              </p>
            </div>

            {/* Call To Action */}
            <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigate("/tours");
                  onClose();
                }}
                className="w-full px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition-all duration-300"
              >
                {t("destinations.drawer.viewTours")}
              </motion.button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default DestinationDetailsDrawer;
