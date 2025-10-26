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

/**
 * DestinationDetailsDrawer - Right-side drawer with full destination info
 * @param {Object} destination - Destination data
 * @param {boolean} open - Drawer open state
 * @param {Function} onClose - Close handler
 */
const DestinationDetailsDrawer = ({ destination, open, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!destination) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-2xl font-bold pr-8">{destination.name}</SheetTitle>
          <SheetClose />
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-6 pt-0">
            {/* Hero Image */}
            <img
              src={destination.heroImage}
              alt={destination.name}
              className="w-full h-64 object-cover rounded-lg mb-6"
              loading="lazy"
            />

            {/* Quick Info */}
            <div className="grid grid-cols-1 gap-4 mb-6 p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Summary</p>
                  <p className="text-sm">{destination.summary}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Best Time to Visit</p>
                  <p className="text-sm font-semibold">{destination.bestTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Travel Tips</p>
                  <p className="text-sm">{destination.travelTips}</p>
                </div>
              </div>
            </div>

            {/* Extended Content */}
            <div
              className="prose prose-sm max-w-none mb-6 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-4 [&>h3]:mb-2 [&>ul]:ml-4 [&>ul]:space-y-1 [&>li]:text-sm"
              dangerouslySetInnerHTML={{ __html: destination.extendedHtml }}
            />

            {/* CTA */}
            <div className="sticky bottom-0 bg-background pt-4 border-t">
              <Button
                size="lg"
                onClick={() => {
                  navigate("/tours");
                  onClose();
                }}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {t("destinations.drawer.viewTours")}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default DestinationDetailsDrawer;
