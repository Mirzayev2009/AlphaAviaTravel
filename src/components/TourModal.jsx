import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * TourModal - Displays full tour details
 * @param {Object} tour - Tour data
 * @param {boolean} open - Modal open state
 * @param {Function} onClose - Close handler
 * @param {Function} onRegister - Registration handler
 */
const TourModal = ({ tour, open, onClose, onRegister }) => {
  const { t } = useTranslation();

  if (!tour) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold pr-8">{tour.title}</DialogTitle>
          <DialogClose className="absolute right-4 top-4" />
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-80px)]">
          <div className="p-6 pt-4">
            {/* Tour Images */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {tour.images.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  alt={`${tour.title} - ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  loading="lazy"
                />
              ))}
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Destination</p>
                  <p className="font-semibold">{tour.destination}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-semibold">{tour.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="font-semibold">${tour.price}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-muted-foreground">{tour.short}</p>
            </div>

            {/* Itinerary */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">{t("tours.modal.itinerary")}</h3>
              <div className="space-y-4">
                {tour.itinerary.map((day, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-l-4 border-primary pl-4"
                  >
                    <h4 className="font-semibold mb-2">
                      {t("tours.modal.day")} {day.day}
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {day.activities.map((activity, actIdx) => (
                        <li key={actIdx}>• {activity}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">{t("tours.modal.highlights")}</h3>
              <div className="flex flex-wrap gap-2">
                {tour.highlights.map((highlight, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="sticky bottom-0 bg-background pt-4 border-t">
              <Button
                size="lg"
                onClick={onRegister}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {t("tours.modal.registerNow")}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TourModal;
