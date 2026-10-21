import { useTranslation } from "react-i18next";
import { PageIntro } from "@/components/TravelUI";
import GalleryGrid from "@/components/GalleryGrid";
export default function Gallery() {
  const { t } = useTranslation();
  return <><PageIntro title={t("gallery.title")} description={t("gallery.subtitle")}/><section className="catalog-section"><div className="site-container"><GalleryGrid/></div></section></>;
}
