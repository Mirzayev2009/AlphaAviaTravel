import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TeamGrid from "@/components/TeamGrid";
import SuccessStories from "../components/SuccesStories";

const About = () => {
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
            <h1 className="text-4xl md:text-5xl text-orange-400 font-bold mb-4">{t("about.title")}</h1>
            <p className="text-xl text-blue-600 max-w-2xl mx-auto">
              {t("about.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-lg text-muted-foreground mb-6">{t("about.story")}</p>
              <p className="text-lg text-muted-foreground">{t("about.mission")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("about.teamTitle")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("about.teamSubtitle")}</p>
          </motion.div>

          <TeamGrid />
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("about.storiesTitle")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("about.storiesSubtitle")}
            </p>
          </motion.div>

          <SuccessStories />
        </div>
      </section>
    </div>
  );
};

export default About;
