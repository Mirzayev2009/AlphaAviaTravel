import { createElement, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin, Plus, Check, Phone, Mail, MessageCircle, Facebook, ChevronRight } from "lucide-react";
import { useTravelData, findCatalogTour } from "@/hooks/use-travel-data";
import { PageIntro, SectionHeading, LoadingCards, StateMessage, TextLink, TravelImage } from "@/components/TravelUI";
import TourInquiryForm from "@/components/TourInquiryForm";
import ImageLightbox from "@/components/ImageLightbox";

export default function ToursDetail() {
  const { tourid } = useParams();
  const [params] = useSearchParams();
  const requestedOption = Number(params.get("option"));
  const option = Number.isInteger(requestedOption) && requestedOption >= 0 ? requestedOption : 0;
  const { t } = useTranslation();
  const query = useTravelData("tours", "tours");
  const tour = findCatalogTour(query.data, tourid, query.language, option);
  const [photo, setPhoto] = useState(null);
  if (query.isPending) return <div className="site-container section"><LoadingCards/></div>;
  if (query.isError) return <div className="site-container section"><StateMessage title={t("design.loadError")} retry={() => query.refetch()}/></div>;
  if (!tour) return <><PageIntro title={t("design.tourNotFound")} description={t("design.tourNotFoundDescription")}/><div className="section-end"><TextLink to="/tours">{t("hero.cta")}</TextLink></div></>;
  const images = tour.images?.length ? tour.images : tour.image ? [tour.image] : [];
  const phone = tour.organizer?.phone?.trim() || "+998981013311";
  const email = tour.organizer?.email?.trim() || "alpha.avia.travel@gmail.com";
  const contacts = [
    [Phone, t("tourDetail.confirmation.callus"), phone, "tel:" + phone.replace(/[^+\d]/g, "")],
    [Mail, t("tourDetail.contact.email"), email, "mailto:" + email],
    [MessageCircle, "WhatsApp", t("tourDetail.contact.chatNow"), "https://wa.me/" + phone.replace(/\D/g, "")],
    [Facebook, "Facebook", t("tourDetail.contact.visitPage"), "https://www.facebook.com/" + (tour.organizer?.facebookHandle || "")],
  ];
  return <>
    <section className="tour-heading" id="top-of-page"><div className="site-container">
      <nav className="breadcrumbs" aria-label={t("design.breadcrumbs")}><Link to="/">{t("header.nav.home")}</Link><ChevronRight size={13}/><Link to="/tours">{t("header.nav.tours")}</Link></nav>
      <h1>{tour.title}</h1><p>{tour.short}</p><div className="tour-heading-meta"><span><Calendar size={16}/>{tour.duration}</span><span><MapPin size={16}/>{tour.destination}</span></div>
    </div></section>
    <TourInquiryForm key={tour.id + "-" + option} tour={tour}/>
    <section className="section"><div className="site-container">
      <SectionHeading title={t("tourDetail.FullAdventure.adventure")}/>
      {images.length > 0 && <div className="tour-gallery">{images.slice(0, 3).map((image, index) => <button key={image} onClick={() => setPhoto(index)} aria-label={t("tourDetail.imageAlt", { number: index + 1 })}><TravelImage src={image} alt={t("tourDetail.imageAlt", { number: index + 1 })}/></button>)}</div>}
      <div className="tour-information">
        <div><h3>{t("tourDetail.FullAdventure.highlights")}</h3><ul className="highlight-list">{tour.highlights?.map((item, index) => <li key={index}><Check size={16}/>{item}</li>)}</ul></div>
        <div id="itinerary"><h3>{t("tourDetail.FullAdventure.itinerary")}</h3>{tour.itinerary?.map((day, index) => <details key={index} className="itinerary-day" open={index === 0 ? true : undefined}><summary><span><small>{t("tourDetail.FullAdventure.day")} {day.day || index + 1}</small>{day.title || t("tourDetail.fallback.dayTitle")}</span><Plus size={20}/></summary><div className="itinerary-content">{Array.isArray(day.activities) ? <ul>{day.activities.map((activity, index) => <li key={index}>{activity}</li>)}</ul> : <p>{day.activity || day.description || day.activities || t("tourDetail.fallback.noDetails")}</p>}</div></details>)}</div>
      </div>
    </div></section>
    <section className="section section--soft"><div className="site-container"><SectionHeading title={t("design.directContact")} description={t("tourDetail.FullAdventure.assist")}/>
      <div className="contact-options">{contacts.map(([Icon, label, text, href]) => <a className="contact-option" key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{createElement(Icon, { size: 24 })}<strong>{label}</strong><span>{text}</span></a>)}</div>
    </div></section>
    {photo !== null && <ImageLightbox images={images.map((src, index) => ({ src, alt: t("tourDetail.imageAlt", { number: index + 1 }) }))} index={photo} onIndexChange={setPhoto} onClose={() => setPhoto(null)}/>}
  </>;
}
