import { createElement, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Users, Award, Heart, Bot, Quote, ChevronLeft, ChevronRight, Plane, ShieldCheck, Car, Hotel, Headphones } from "lucide-react";
import SwiperHero from "@/components/SwiperHero";
import TourCard from "@/components/TourCard";
import DestinationCard from "@/components/DestinationCard";
import DestinationDetailsDrawer from "@/components/DestinationDetailsDrawer";
import LazyMap from "@/components/LazyMap";
import { CategoryTabs, SectionHeading, LoadingCards, StateMessage, TextLink, TravelImage } from "@/components/TravelUI";
import { useTravelData, categoryTours } from "@/hooks/use-travel-data";

function Testimonials() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const reviews = useQuery({
    queryKey: ["travel", "reviews"],
    queryFn: async ({ signal }) => {
      const controller = new AbortController();
      const abort = () => controller.abort();
      signal.addEventListener("abort", abort);
      const timer = setTimeout(abort, 8000);
      try {
        const response = await fetch("/api/opinions", { signal: controller.signal });
        if (!response.ok) return [];
        const data = await response.json();
        return Array.isArray(data) ? data.filter((item) => item.tourist_opinion) : [];
      } finally { clearTimeout(timer); signal.removeEventListener("abort", abort); }
    },
    retry: false, staleTime: 300000,
  });
  const entries = reviews.data || [];
  const review = entries[index % Math.max(entries.length, 1)];
  return <section className="section section--soft"><div className="site-container">
    <SectionHeading title={t("home.testimonialsTitle")} description={t("home.testimonialsSubtitle")} centered/>
    {reviews.isPending ? <div className="card-skeleton h-56 max-w-3xl mx-auto" role="status" aria-label={t("design.loading")}><span/><span/><span/></div>
      : review ? <div className="testimonials">
        <Quote className="testimonial-quote-icon" size={34} aria-hidden="true"/>
        <blockquote className="testimonial-text">{review.tourist_opinion}</blockquote>
        <p className="testimonial-author">{review.tourist_name}</p><p className="testimonial-country">{review.tourist_country}</p>
        {entries.length > 1 && <div className="testimonial-controls"><button className="icon-button" aria-label={t("design.previous")} onClick={() => setIndex((index + entries.length - 1) % entries.length)}><ChevronLeft size={18}/></button><span aria-live="polite">{index % entries.length + 1} / {entries.length}</span><button className="icon-button" aria-label={t("design.next")} onClick={() => setIndex((index + 1) % entries.length)}><ChevronRight size={18}/></button></div>}
      </div> : <div className="testimonials"><p className="text-muted-foreground leading-relaxed">{t("design.reviewsUnavailable")}</p><TextLink to="/contact">{t("header.nav.contact")}</TextLink></div>}
  </div></section>;
}

export default function Home() {
  const { t } = useTranslation();
  const [category, setCategory] = useState("uzbekistan");
  const [destination, setDestination] = useState(null);
  const tours = useTravelData("tours", "tours");
  const destinations = useTravelData("destination", "destinations");
  const featured = categoryTours(tours.data, category, tours.language).slice(0, 3);
  return <>
    <SwiperHero/>
    <section className="section section--soft"><div className="site-container">
      <SectionHeading title={t("home.featuredTitle")} description={t("home.featuredSubtitle")}><TextLink to="/tours">{t("hero.cta")}</TextLink></SectionHeading>
      <CategoryTabs value={category} onChange={setCategory}/>
      {tours.isPending ? <LoadingCards/> : tours.isError ? <StateMessage title={t("design.loadError")} retry={() => tours.refetch()}/> : featured.length ? <div className="tour-grid">{featured.map((tour) => <TourCard key={tour.id} tour={tour}/>)}</div> : <StateMessage title={t("design.noTours")} description={t("design.emptyTours")}><TextLink to="/contact">{t("header.nav.contact")}</TextLink></StateMessage>}
    </div></section>
    <section className="section"><div className="site-container">
      <SectionHeading title={t("destinations.title")} description={t("destinations.subtitle")}><TextLink to="/destinations">{t("design.allDestinations")}</TextLink></SectionHeading>
      {destinations.isPending ? <LoadingCards/> : destinations.isError ? <StateMessage title={t("design.loadError")} retry={() => destinations.refetch()}/> : <div className="destination-grid">{destinations.localized.slice(0, 3).map((item) => <DestinationCard key={item.id} destination={item} onLearnMore={setDestination}/>)}</div>}
    </div></section>
    <section className="section pt-0"><div className="site-container"><div className="assistant-feature">
      <div><h2>{t("home.travelAssistant.sectionTitle")}</h2><p>{t("home.travelAssistant.sectionDescription")}</p><Link className="button" to="/chatbot">{t("home.travelAssistant.sectionButton")}<ArrowRight size={16}/></Link></div>
      <div className="assistant-preview"><Bot size={34} className="assistant-preview-icon" aria-hidden="true"/><p>{t("chatbot.greeting")}</p><div className="assistant-preview-features"><span>{t("home.travelAssistant.featureFast")}</span><span>{t("home.travelAssistant.featurePersonalized")}</span><span>{t("home.travelAssistant.featurePrivate")}</span></div></div>
    </div></div></section>
    <section className="section"><div className="site-container why-layout">
      <TravelImage className="why-image" src="/data/images/samarqand/registan_square.png" alt="Registan Square, Samarkand"/>
      <div className="why-content"><h2>{t("home.aboutTitle")}</h2><p>{t("home.aboutText")}</p>
        <div className="reason-list">{[[Users, "1"], [Award, "2"], [Heart, "3"]].map(([Icon, key]) => <div className="reason" key={key}>{createElement(Icon, { size: 22, "aria-hidden": true })}<div><h3>{t("home.aboutcard" + key + "Title")}</h3><p>{t("home.aboutcard" + key + "Text")}</p></div></div>)}</div>
        <TextLink to="/about">{t("home.aboutCta")}</TextLink>
      </div>
    </div></section>
    <Testimonials/>
    <section className="section"><div className="site-container location-layout">
      <div><h2>{t("home.locationTitle")}</h2><p>{t("home.locationSubtitle")}</p><div className="location-address">{t("contact.info.address")}</div><TextLink external to="https://yandex.com/maps/?pt=66.927456,39.676871&z=17&l=map">{t("home.getDirections")}</TextLink></div>
      <LazyMap officeLat={39.676871} officeLng={66.927456}/>
    </div></section>
    <section className="section section--soft"><div className="site-container">
      <SectionHeading title={t("home.servicesTitle")} description={t("home.servicesSubtitle")}/>
      <div className="service-preview-grid">{[[Plane, "Tours"], [ShieldCheck, "Visa"], [Car, "Cars"], [Hotel, "Hotels"], [Headphones, "Support"]].map(([Icon, key]) => <div className="service-preview" key={key}>{createElement(Icon, { size: 25, "aria-hidden": true })}<h3>{t("home.service" + key)}</h3><p>{t("home.service" + key + "Desc")}</p></div>)}</div>
      <div className="section-end"><TextLink to="/services">{t("home.exploreServices")}</TextLink></div>
    </div></section>
    <section className="section"><div className="site-container"><div className="contact-invitation"><h2>{t("home.ctaTitle")}</h2><p>{t("home.ctaDescription")}</p><Link className="button" to="/contact">{t("home.ctaButton")}<ArrowRight size={16}/></Link></div></div></section>
    {destination && <DestinationDetailsDrawer destination={destination} open onClose={() => setDestination(null)}/>}
  </>;
}
