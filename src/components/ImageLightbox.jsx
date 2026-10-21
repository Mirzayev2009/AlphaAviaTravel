import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { photoGeometry } from "@/lib/photo-geometry";
import { TravelImage } from "./TravelUI";

gsap.registerPlugin(useGSAP);

export default function ImageLightbox({ images, index, origin, onIndexChange, onClose }) {
  const { t } = useTranslation();
  const frame = useRef(null);
  const root = useRef(null);
  const [node, setNode] = useState(null);
  const attach = useCallback((value) => { root.current = value; setNode(value); }, []);
  const first = useRef(true);
  const closing = useRef(false);
  const transition = useRef(null);
  const returnTarget = useRef(origin);
  const image = images[index];
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { if (preference.matches && closing.current) onClose(); };
    preference.addEventListener("change", finish);
    return () => preference.removeEventListener("change", finish);
  }, [onClose]);
  const findThumbnail = () => {
    const gallery = origin?.closest("[data-photo-gallery]");
    const current = [...(gallery?.querySelectorAll("[data-photo-src]") || [])].find((item) => item.dataset.photoSrc === image?.src);
    return current || origin;
  };
  // Only direct style writes run per frame; layout is measured at the endpoints.
  function movePhoto(from, to, duration, onComplete) {
    const element = frame.current;
    const photograph = element?.querySelector("img");
    if (!element || !photograph) { onComplete?.(); return; }
    element.style.transform = ""; photograph.style.transform = "";
    const layout = element.getBoundingClientRect();
    const start = photoGeometry(from, layout, 0);
    const end = photoGeometry(to || layout, layout, 0);
    if (!start || !end) { onComplete?.(); return; }
    const value = { x: start.x, y: start.y, sx: start.sx, sy: start.sy };
    const draw = () => {
      element.style.transform = "translate3d(" + value.x + "px," + value.y + "px,0) scale(" + value.sx + "," + value.sy + ")";
      const cover = Math.max(value.sx, value.sy);
      photograph.style.transform = "scale(" + cover / value.sx + "," + cover / value.sy + ")";
    };
    draw();
    transition.current = gsap.to(value, { x: end.x, y: end.y, sx: end.sx, sy: end.sy, duration, ease: "power2.out", onUpdate: draw, onComplete: () => {
      element.style.transform = ""; photograph.style.transform = ""; onComplete?.();
    } });
  }
  const { contextSafe } = useGSAP(() => {
    if (!node) return;
    const element = frame.current;
    const photograph = element?.querySelector("img");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) first.current = false;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", (motionContext) => {
      const ready = motionContext.add("photoReady", () => {
        if (closing.current || !photograph?.naturalWidth) return;
        if (first.current && origin?.isConnected) {
          first.current = false;
          movePhoto(origin.getBoundingClientRect(), null, .32);
        } else {
          first.current = false;
          gsap.fromTo(element, { opacity: .8 }, { opacity: 1, duration: .16, clearProps: "opacity", overwrite: "auto" });
        }
      });
      if (photograph?.complete) ready();
      else photograph?.addEventListener("load", ready, { once: true });
      return () => { photograph?.removeEventListener("load", ready); transition.current?.kill(); element.style.transform = ""; if (photograph) photograph.style.transform = ""; };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [node, index], revertOnUpdate: true });
  const close = contextSafe(() => {
    if (closing.current) return;
    closing.current = true;
    const thumbnail = findThumbnail();
    const destination = thumbnail?.isConnected ? thumbnail.getBoundingClientRect() : null;
    const visible = destination?.bottom > 0 && destination.top < window.innerHeight && destination.right > 0 && destination.left < window.innerWidth;
    returnTarget.current = visible ? thumbnail : origin;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { onClose(); return; }
    transition.current?.kill();
    const source = frame.current?.getBoundingClientRect();
    if (source && visible) movePhoto(source, destination, .2, onClose);
    else gsap.to(root.current, { opacity: 0, duration: .14, onComplete: onClose });
  });
  const change = (step) => { if (!closing.current) onIndexChange((index + images.length + step) % images.length); };
  return <Dialog open onOpenChange={(open) => { if (!open) close(); }}>
    <DialogContent ref={attach} className="lightbox-content" onCloseAutoFocus={(event) => { event.preventDefault(); (returnTarget.current?.isConnected ? returnTarget.current : origin)?.focus({ preventScroll: true }); }} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); change(1); } if (event.key === "ArrowLeft") { event.preventDefault(); change(-1); } }}>
      <DialogTitle className="sr-only">{t("gallery.lightbox.lightboxAria")}</DialogTitle><DialogDescription className="sr-only">{image?.alt}</DialogDescription>
      <div className="lightbox-stage"><div className="lightbox-media" ref={frame}><TravelImage key={image?.src} src={image?.src} alt={image?.alt || ""} eager sizes="92vw"/></div></div>
      <div className="lightbox-controls"><button className="icon-button" aria-label={t("gallery.lightbox.prevAria")} onClick={() => change(-1)}><ChevronLeft size={22}/></button><span aria-live="polite">{image?.location} {index + 1} / {images.length}</span><button className="icon-button" aria-label={t("gallery.lightbox.nextAria")} onClick={() => change(1)}><ChevronRight size={22}/></button></div>
    </DialogContent>
  </Dialog>;
}
