import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TourList from "@/components/TourList";

const Tours = () => {
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
            <h1 className="text-4xl md:text-5xl text-orange-400 font-bold mb-4">{t("tours.detail.title")}</h1>
            <p className="text-xl text-blue-600 max-w-2xlue-400l mx-auto">
              {t("tours.detail.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tours List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <TourList />
        </div>
      </section>
    </div>
  );
};

export default Tours;
