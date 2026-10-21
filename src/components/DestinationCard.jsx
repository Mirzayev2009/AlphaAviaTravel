import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { TravelImage } from "./TravelUI";

export default function DestinationCard({ destination, onLearnMore }) {
  const { t } = useTranslation();
  return <article className="destination-card" data-motion="card">
    <button className="destination-image" onClick={() => onLearnMore(destination)} aria-label={t("destinations.card.learnMore") + ": " + destination.name}>
      <TravelImage src={destination.heroImage} alt={destination.name}/><h3>{destination.name}</h3><ArrowUpRight className="destination-arrow" size={25} aria-hidden="true"/>
    </button>
    <div className="destination-description"><p>{destination.summary?.replace(/\*+/g, "")}</p>
      <div className="destination-best-time"><strong>{t("destinations.card.bestTime")}</strong>{destination.bestTime}</div>
      <button className="text-link" type="button" onClick={() => onLearnMore(destination)}>{t("destinations.card.learnMore")}<ArrowRight size={16}/></button>
    </div>
  </article>;
}
