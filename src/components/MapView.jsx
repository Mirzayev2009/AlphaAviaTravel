import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";

const YANDEX_DIRECTIONS_URL = (lat, lng) =>
  `https://yandex.uz/maps/?mode=routes&rtext=~${lat}%2C${lng}&rtt=auto&z=15`;

const MapClickHandler = ({ yandexUrl }) => {
  useMapEvents({
    click: () => window.open(yandexUrl, "_blank"),
  });
  return null;
};

const officeIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#f97316,#f59e0b);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(249,115,22,.45);border:3px solid #fff;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -40],
});

const MapView = ({ officeLat, officeLng }) => {
  const url = YANDEX_DIRECTIONS_URL(officeLat, officeLng);

  return (
    <>
      <MapContainer
        center={[officeLat, officeLng]}
        zoom={15}
        scrollWheelZoom={true}
        zoomControl={true}
        style={{ height: "100%", width: "100%", cursor: "pointer" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[officeLat, officeLng]} icon={officeIcon}>
          <Popup className="text-sm">
            <strong>Avia Alfa Travel</strong><br />
            Samarkand, Uzbekistan
          </Popup>
        </Marker>
        <MapClickHandler yandexUrl={url} />
      </MapContainer>

      <div className="absolute bottom-5 left-5 z-[1000] flex flex-col sm:flex-row gap-3">
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Directions
        </motion.a>
      </div>
    </>
  );
};

export default MapView;
