import { useState } from "react";
import { useTravelData } from "@/hooks/use-travel-data";
import { TravelImage, LoadingCards, StateMessage } from "./TravelUI";
import { useTranslation } from "react-i18next";
import ImageLightbox from "./ImageLightbox";

export default function GalleryGrid() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(null);
  const destinations = useTravelData("destination", "destinations");
  const gallery = destinations.localized.map((item) => ({ id: item.id, src: item.heroImage, alt: item.name, location: item.name }));
  const samarkand = destinations.localized[0]?.name || "Samarkand";
  if (gallery.length) gallery.push(
    { id: "samarkand-shah", src: "/data/images/samarqand/shah_i_zinda.png", alt: samarkand, location: samarkand },
    { id: "samarkand-gur", src: "/data/images/samarqand/gur_emir.png", alt: samarkand, location: samarkand },
  );
  if (destinations.isPending) return <LoadingCards/>;
  if (destinations.isError) return <StateMessage title={t("design.loadError")} retry={() => destinations.refetch()}/>;
  return <><div className="gallery-grid" data-photo-gallery>{gallery.map((image, index) => <button className="gallery-tile" data-motion="card" data-photo-src={image.src} key={image.id} onClick={(event) => setIndex({ index, origin: event.currentTarget })} aria-label={image.alt}><TravelImage src={image.src} alt={image.alt}/><span>{image.location}</span></button>)}</div>
    {index !== null && <ImageLightbox images={gallery} index={index.index} origin={index.origin} onIndexChange={(next) => setIndex({ ...index, index: next })} onClose={() => setIndex(null)}/>}
  </>;
}
