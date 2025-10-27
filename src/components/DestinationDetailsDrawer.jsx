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
          <div className="p-6 pt-0">
            {/* Hero Image */}
            <img
              src={destination.heroImage}
              alt={destination.name}
              className="w-full h-64 object-cover rounded-xl mb-6"
              loading="lazy"
            />

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
                  <p className="text-sm text-gray-700">{destination.travelTips}</p>
                </div>
              </div>
            </div>

            {/* Extended Content */}
            <div
              className="prose prose-sm max-w-none mb-6 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-4 [&>h3]:mb-2 [&>ul]:ml-4 [&>ul]:space-y-1 [&>li]:text-sm"
              dangerouslySetInnerHTML={{ __html: destination.extendedHtml }}
            />

            {/* Call To Action */}
            <div className="sticky bottom-0 bg-white pt-4 border-t">
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
