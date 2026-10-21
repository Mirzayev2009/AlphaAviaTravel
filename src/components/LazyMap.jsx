import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
const MapView = lazy(() => import("./MapView"));

export default function LazyMap(props) {
  const [show, setShow] = useState(false);
  const root = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShow(true); observer.disconnect(); }
    }, { rootMargin: "200px" });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const placeholder = <div className="map-placeholder" role="status">{t("design.loadingMap")}</div>;
  return <div ref={root} className="map-frame">{show ? <Suspense fallback={placeholder}><MapView {...props}/></Suspense> : placeholder}</div>;
}
