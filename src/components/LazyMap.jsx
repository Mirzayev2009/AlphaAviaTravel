import { lazy, Suspense, useState, useEffect, useRef } from "react";

const LazyMap = ({ officeLat, officeLng, yandexUrl }) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShow(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const MapView = lazy(() => import("./MapView"));

  return (
    <div ref={ref} className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200" style={{ height: "450px" }}>
      {show ? (
        <Suspense fallback={<div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Loading map...</div>}>
          <MapView officeLat={officeLat} officeLng={officeLng} yandexUrl={yandexUrl} />
        </Suspense>
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">Scroll to see map</div>
      )}
    </div>
  );
};

export default LazyMap;
