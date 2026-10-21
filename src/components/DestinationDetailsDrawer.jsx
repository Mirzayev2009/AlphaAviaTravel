import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { TravelImage } from "./TravelUI";

export default function DestinationDetailsDrawer({ destination, open, onClose }) {
  const { t } = useTranslation();
  if (!destination) return null;
  const clean = (text) => typeof text === "string" ? text.replace(/\*+/g, "") : text;
  return <Sheet open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
    <SheetContent className="detail-sheet">
      <SheetHeader className="sheet-header"><SheetTitle>{destination.name}</SheetTitle><SheetDescription>{t("destinations.drawer.summary")}</SheetDescription></SheetHeader>
      <div className="sheet-body">
        <TravelImage src={destination.heroImage} alt={destination.name} eager sizes="(max-width: 768px) 92vw, 720px"/>
        <h3>{t("destinations.drawer.summary")}</h3><p>{clean(destination.summary)}</p>
        <h3>{t("destinations.card.bestTime")}</h3><p>{destination.bestTime}</p>
        <h3>{t("destinations.drawer.travelTips")}</h3><p>{clean(destination.travelTips)}</p>
        <h3>{t("destinations.drawer.feature")}</h3><p>{clean(destination.featureDescription)}</p>
        <h3>{t("destinations.drawer.mustSee")}</h3><ul>{destination.mustSee?.map((item, index) => <li key={index}>{clean(item)}</li>)}</ul>
        {[["nature", "nature"], ["food", "food"], ["gettingThere", "gettingThere"]].map(([key, field]) => destination[field] && <div key={key}><h3>{t("destinations.drawer." + key)}</h3><p>{clean(destination[field])}</p></div>)}
      </div>
      <div className="sheet-footer"><Link className="button" to="/tours" onClick={onClose}>{t("destinations.drawer.viewTours")}<ArrowRight size={16}/></Link></div>
    </SheetContent>
  </Sheet>;
}
