// About.jsx - UPDATED TO FETCH MULTI-LANGUAGE TEAM DATA

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TeamGrid from "@/components/TeamGrid";
import SuccessStories from "../components/SuccesStories";

const BASE_URL = "https://alpha-backend-iieo.onrender.com/api";

const About = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en'; // Get the current language

  const [allTeamData, setAllTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch ALL team data (all languages) once on mount
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log("🔍 Fetching team data from:", `${BASE_URL}/team`);
        const response = await fetch(`${BASE_URL}/team`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Team data received:", data);
        
        // Assuming the new backend returns: { "en": [...], "ru": [...] }
        setAllTeamData(data);
      } catch (error) {
        console.error("❌ Error fetching team data:", error);
        setError(error.message);
        setAllTeamData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  // 2. Filter team members based on current language
  const filteredTeamMembers = useMemo(() => {
    if (!allTeamData) {
      return [];
    }

    // Attempt to get data for the current language (e.g., allTeamData['ru'])
    let members = allTeamData[currentLang];
    
    // Fallback to English if the current language array is missing or empty
    if (!members || members.length === 0) {
      console.log(`⚠️ No team data for language '${currentLang}', falling back to English ('en')`);
      members = allTeamData['en'] || [];
    }

    console.log(`✅ Showing ${members.length} team members in language: ${currentLang}`);
    return members;
    
  }, [allTeamData, currentLang]);


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
              {t("about.title")}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t("about.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story (Unchanged) */}
      <section className="py-16 bg-white">
        {/* ... (Unchanged content) */}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-400">
              {t("about.teamTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("about.teamSubtitle")}
            </p>
          </motion.div>

          {/* 3. Render TeamGrid with loading/error states and filtered data */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12 text-red-500">
              Error loading team: {error}
            </div>
          ) : (
            <TeamGrid members={filteredTeamMembers} />
          )}
          
        </div>
      </section>

      {/* Success Stories (Unchanged) */}
      <section className="py-16">
        {/* ... (Unchanged content) */}
      </section>
    </div>
  );
};

export default About;