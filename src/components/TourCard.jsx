import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, MapPin } from "lucide-react";
import { TravelImage } from "./TravelUI";

export default function TourCard({ tour, highlighted = false, option = 0 }) {
  const { t, i18n } = useTranslation();
  if (!tour?.id) return null;
  const url = "/tours/" + tour.id + (option ? "?option=" + option : "");
  const price = new Intl.NumberFormat(i18n.resolvedLanguage || "en", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(tour.price) || 0);
  return <article className={"tour-card" + (highlighted ? " tour-card--highlighted" : "")}>
    <Link to={url} className="tour-card-image" aria-label={tour.title}><TravelImage src={tour.images?.[0] || tour.image} alt={tour.title}/></Link>
    <div className="tour-card-body">
      <p className="tour-card-meta">{tour.duration}</p>
      <h3><Link to={url}>{tour.title}</Link></h3>
      <p className="tour-card-destination"><MapPin size={14} aria-hidden="true"/>{tour.destination}</p>
      <p className="tour-card-description">{tour.short}</p>
      <div className="tour-card-bottom"><div className="tour-price"><strong>{price}</strong><small>{t("card.perPerson")}</small></div><Link className="button button--small button--secondary" to={url}>{t("design.viewTour")}<ArrowUpRight size={15} aria-hidden="true"/></Link></div>
    </div>
  </article>;
}
