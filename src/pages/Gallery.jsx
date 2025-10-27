import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import GalleryGrid from "@/components/GalleryGrid";

const Gallery = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl text-range-400 text-orange-400 font-bold mb-4">{t("gallery.title")}</h1>
            <p className="text-xl text-blue-600 max-w-2xl mx-auto">
              {t("gallery.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
};

export default Gallery;
