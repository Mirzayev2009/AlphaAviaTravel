import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SwiperHero from "@/components/SwiperHero";
import TourCard from "@/components/TourCard";
import TourModal from "@/components/TourModal";
import RegistrationForm from "@/components/RegistrationForm";
import { Button } from "@/components/ui/button";
import { tours } from "@/data/seed";
import { useState } from "react";
import { ArrowRight, CheckCircle, Users, Award, Heart } from "lucide-react";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedTour, setSelectedTour] = useState(null);
  const [registrationTour, setRegistrationTour] = useState(null);

  // Featured tours (first 3)
  const featuredTours = tours.slice(0, 3);

  return (
    <div>
      {/* Hero Swiper */}
      <SwiperHero />

      {/* Featured Tours Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.featuredTitle")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("home.featuredSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onViewDetails={setSelectedTour}
                onRegister={setRegistrationTour}
              />
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => navigate("/tours")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {t("hero.cta")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-400">{t("home.aboutTitle")}</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">{t("home.aboutText")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-orange-400">Expert Guides</h3>
              <p className="text-muted-foreground">
                Our passionate guides bring history and culture alive with deep local knowledge.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-orange-400">15+ Years Experience</h3>
              <p className="text-muted-foreground">
                Over a decade of creating unforgettable Uzbekistan adventures for travelers worldwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-orange-400">Personalized Service</h3>
              <p className="text-muted-foreground">
                We tailor every tour to your interests, ensuring a truly personal experience.
              </p>
            </motion.div>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" onClick={() => navigate("/about")}>
              {t("home.aboutCta")}
            </Button>
          </div>
        </div>
      </section>

      {/* Modals */}
      {selectedTour && (
        <TourModal
          tour={selectedTour}
          open={!!selectedTour}
          onClose={() => setSelectedTour(null)}
          onRegister={() => {
            setRegistrationTour(selectedTour);
            setSelectedTour(null);
          }}
        />
      )}

      {registrationTour && (
        <RegistrationForm
          tour={registrationTour}
          open={!!registrationTour}
          onClose={() => setRegistrationTour(null)}
        />
      )}
    </div>
  );
};

export default Home;
