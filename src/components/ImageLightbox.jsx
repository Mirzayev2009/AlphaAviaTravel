import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TravelImage } from "./TravelUI";

export default function ImageLightbox({ images, index, onIndexChange, onClose }) {
  const { t } = useTranslation();
  const image = images[index];
  const change = (step) => onIndexChange((index + images.length + step) % images.length);
  return <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
    <DialogContent className="lightbox-content" onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); change(1); } if (event.key === "ArrowLeft") { event.preventDefault(); change(-1); } }}>
      <DialogTitle className="sr-only">{t("gallery.lightbox.lightboxAria")}</DialogTitle><DialogDescription className="sr-only">{image?.alt}</DialogDescription>
      <TravelImage src={image?.src} alt={image?.alt || ""} eager/>
      <div className="lightbox-controls"><button className="icon-button" aria-label={t("gallery.lightbox.prevAria")} onClick={() => change(-1)}><ChevronLeft size={22}/></button><span aria-live="polite">{image?.location} {index + 1} / {images.length}</span><button className="icon-button" aria-label={t("gallery.lightbox.nextAria")} onClick={() => change(1)}><ChevronRight size={22}/></button></div>
    </DialogContent>
  </Dialog>;
}
