import { createElement, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowUpRight, Map, Globe, ImageOff, RefreshCw } from "lucide-react";
import { imageUrl } from "@/hooks/use-travel-data";
import { responsiveImage } from "@/lib/responsive-images";

export function PageIntro({ title, description, children, className = "" }) {
  return <section className={`page-intro ${className}`}><div className="site-container">
    <h1>{title}</h1>{description && <p>{description}</p>}{children}
  </div></section>;
}

export function SectionHeading({ title, description, children, centered = false }) {
  return <div className={`section-heading${centered ? " section-heading--center" : ""}`}>
    <div><h2>{title}</h2>{description && <p>{description}</p>}</div>{children}
  </div>;
}

export function TextLink({ to, children, external = false, className = "" }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = <>{children}<Icon size={17} aria-hidden="true" /></>;
  return external ? <a href={to} className={`text-link ${className}`} target="_blank" rel="noreferrer">{content}</a>
    : <Link to={to} className={`text-link ${className}`}>{content}</Link>;
}

export function TravelImage({ src, alt, className = "", eager = false, sizes = "(max-width: 580px) calc(100vw - 40px), (max-width: 1024px) calc((100vw - 72px) / 2), 400px", ...props }) {
  const [failedSource, setFailedSource] = useState(null);
  const { t } = useTranslation();
  const resolved = imageUrl(src);
  const image = responsiveImage(resolved);
  if (!resolved || failedSource === resolved) return <div className={`image-fallback ${className}`} role="img" aria-label={alt}>
    <ImageOff size={24} aria-hidden="true"/><span>{t("design.imageUnavailable")}</span>
  </div>;
  return <img {...image} sizes={image.srcSet ? sizes : undefined} alt={alt} className={className} loading={eager ? "eager" : "lazy"}
    decoding="async" fetchPriority={eager ? "high" : undefined} onError={() => setFailedSource(resolved)} {...props}/>;
}

export function CategoryTabs({ value, onChange }) {
  const { t } = useTranslation();
  return <div className="category-tabs" role="group" aria-label={t("design.tourCategories")}>
    {[["uzbekistan", "tours.uzTours", Map], ["central_asia", "tours.centralAsiaTours", Globe], ["world", "tours.worldTours", Globe]].map(([key, label, Icon]) =>
      <button key={key} type="button" aria-pressed={value === key} className={value === key ? "is-selected" : ""} onClick={() => onChange(key)}>
        {createElement(Icon, { size: 16, "aria-hidden": true })}{t(label)}
      </button>)}
  </div>;
}

export function LoadingCards({ count = 3 }) {
  const { t } = useTranslation();
  return <div className="tour-grid" aria-busy="true" role="status"><span className="sr-only">{t("design.loading")}</span>
    {Array.from({ length: count }, (_, index) => <div key={index} className="card-skeleton"><div/><span/><span/><span/></div>)}
  </div>;
}

export function StateMessage({ title, description, retry, children }) {
  const { t } = useTranslation();
  return <div className="state-message" role={retry ? "alert" : "status"}>
    <h2>{title}</h2>{description && <p>{description}</p>}
    {retry && <button className="button button--secondary" onClick={retry}><RefreshCw size={16}/>{t("design.retry")}</button>}{children}
  </div>;
}
