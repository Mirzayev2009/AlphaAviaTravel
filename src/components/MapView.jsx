import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import L from "leaflet";
const officeIcon = new L.DivIcon({
  className: "office-marker",
  html: '<span aria-hidden="true"></span>',
  iconSize: [26, 26], iconAnchor: [13, 26], popupAnchor: [0, -28],
});
export default function MapView({ officeLat, officeLng }) {
  const { t } = useTranslation();
  const url = "https://yandex.uz/maps/?mode=routes&rtext=~" + officeLat + "%2C" + officeLng + "&rtt=auto&z=15";
  return <>
    <MapContainer center={[officeLat, officeLng]} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }} className="z-0">
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <Marker position={[officeLat, officeLng]} icon={officeIcon}><Popup><strong>Alpha Avia Travel</strong><br/>{t("contact.info.address")}</Popup></Marker>
    </MapContainer>
    <a className="button button--small map-directions" href={url} target="_blank" rel="noreferrer">{t("home.getDirections")}<ArrowUpRight size={16}/></a>
  </>;
}
