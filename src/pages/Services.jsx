import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { PageIntro, SectionHeading, LoadingCards, StateMessage, TravelImage } from "@/components/TravelUI";
import { useTravelData } from "@/hooks/use-travel-data";
import ImageLightbox from "@/components/ImageLightbox";

function ServiceRail({ title, description, query, onSelect }) {
  const { t } = useTranslation();
  const rail = useRef(null);
  const [bounds, setBounds] = useState({ previous: false, next: false });
  useEffect(() => {
    const node = rail.current;
    if (!node) return;
    const update = () => {
      const previous = node.scrollLeft > 2;
      const next = node.scrollLeft + node.clientWidth < node.scrollWidth - 2;
      setBounds((value) => value.previous === previous && value.next === next ? value : { previous, next });
    };
    update();
    const resize = new ResizeObserver(update);
    resize.observe(node);
    node.addEventListener("scroll", update, { passive: true });
    return () => { resize.disconnect(); node.removeEventListener("scroll", update); };
  }, [query.isPending, query.localized.length]);
  const scroll = (direction) => rail.current?.scrollBy({ left: direction * rail.current.clientWidth * .85, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  return <div className="site-container">
    <div className="service-rail-heading"><SectionHeading title={title} description={description}/><div className="rail-controls"><button className="icon-button" aria-label={t("design.previous")} disabled={!bounds.previous} onClick={() => scroll(-1)}><ChevronLeft size={19}/></button><button className="icon-button" aria-label={t("design.next")} disabled={!bounds.next} onClick={() => scroll(1)}><ChevronRight size={19}/></button></div></div>
    {query.isPending ? <LoadingCards/> : query.isError ? <StateMessage title={t("design.loadError")} retry={() => query.refetch()}/> : <div className="service-rail" data-motion="rail" ref={rail} role="region" aria-label={title} tabIndex={0}>
      {query.localized.map((item) => <button className="service-card" key={item.id} onClick={() => onSelect(item)}><div className="service-card-media"><TravelImage src={item.image || item.images?.[0]} alt={item.title}/></div><div className="service-card-content"><small>{item.category || item.location?.city}</small><h3>{item.title}</h3><p>{item.features?.slice(0, 3).join(" · ") || item.description}</p><span className="text-link">{t("design.viewDetails")}<ArrowUpRight size={16}/></span></div></button>)}
    </div>}
  </div>;
}

export default function Services() {
  const { t } = useTranslation();
  const transport = useTravelData("transport", "transport");
  const hotels = useTravelData("hotel", "hotels");
  const [selected, setSelected] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [closing, setClosing] = useState(false);
  const launcher = useRef(null);
  const select = (item) => { launcher.current = document.activeElement; setClosing(false); setSelected(item); };
  const images = selected?.images?.length ? selected.images : selected?.gallery?.length ? selected.gallery : selected?.image ? [selected.image] : [];
  return <>
    <PageIntro title={t("services.title")} description={t("services.subtitle")}/>
    <section className="section pt-4"><ServiceRail title={t("services.transport.title")} description={t("services.transport.subtitle")} query={transport} onSelect={select}/></section>
    <section className="section section--soft"><ServiceRail title={t("services.hotels.title")} description={t("services.hotels.subtitle")} query={hotels} onSelect={select}/></section>
    <section className="section"><div className="site-container"><div className="contact-invitation" data-motion="composition"><h2>{t("services.question")}</h2><p>{t("services.contactUs")}</p><Link className="button" to="/contact">{t("services.GetInTouch")}<ArrowRight size={16}/></Link></div></div></section>
    <Sheet open={!!selected && !closing} onOpenChange={(open) => { if (!open) setClosing(true); }}>
      <SheetContent className="detail-sheet" onCloseAutoFocus={(event) => { event.preventDefault(); launcher.current?.focus({ preventScroll: true }); }} onClosed={() => { setSelected(null); setPhoto(null); setClosing(false); }}>
        <SheetHeader className="sheet-header"><SheetTitle>{selected?.title}</SheetTitle><SheetDescription>{selected?.category || selected?.location?.city || t("services.title")}</SheetDescription></SheetHeader>
        <div className="sheet-body">{selected && <>
          <TravelImage src={images[0]} alt={selected.title} eager sizes="(max-width: 768px) 92vw, 720px"/><p className="mt-6">{selected.description}</p>
          {(selected.features || selected.facilities) && <><h3>{t("design.features")}</h3><ul>{(selected.features || selected.facilities).map((feature, index) => <li key={index}>{feature}</li>)}</ul></>}
          {images.length > 1 && <><h3>{t("gallery.title")}</h3><div className="sheet-photos" data-photo-gallery>{images.map((src, index) => <button data-photo-src={src} key={index} onClick={(event) => setPhoto({ index, origin: event.currentTarget })} aria-label={t("tourDetail.imageAlt", { number: index + 1 })}><TravelImage src={src} alt={selected.title}/></button>)}</div></>}
        </>}</div>
        <div className="sheet-footer"><Link to="/contact" className="button" onClick={() => setSelected(null)}>{t("services.book")}<ArrowRight size={16}/></Link></div>
      </SheetContent>
    </Sheet>
    {photo !== null && <ImageLightbox images={images.map((src) => ({ src, alt: selected?.title }))} index={photo.index} origin={photo.origin} onIndexChange={(index) => setPhoto({ ...photo, index })} onClose={() => setPhoto(null)}/>}
  </>;
}
