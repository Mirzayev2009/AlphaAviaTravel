import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import GalleryGrid from "@/components/GalleryGrid";

const Gallery = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              {t("gallery.title")}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t("gallery.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-10 ">
        <div className="container mx-auto px-1">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
};

export default Gallery;
