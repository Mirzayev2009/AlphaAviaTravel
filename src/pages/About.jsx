// pages/About.jsx
// Handles data fetching, filtering by language, and correctly passes props to TeamGrid.

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TeamGrid from "@/components/TeamGrid";
import SuccessStories from "../components/SuccesStories"; // Retaining your original import name

const BASE_URL = "https://alpha-backend-iieo.onrender.com/api";
export const IMAGE_BASE_URL = "https://alpha-backend-iieo.onrender.com"; // Essential for images

const About = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [allTeamData, setAllTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch ALL team data once on mount
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${BASE_URL}/team`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAllTeamData(data);
      } catch (error) {
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
    let members = allTeamData[currentLang];
    // Fallback to English
    if (!members || members.length === 0) {
      members = allTeamData['en'] || [];
    }
    return members;
  }, [allTeamData, currentLang]);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-white drop-shadow-md">
              {t("about.title")} 
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto italic">
              {t("about.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      ---

         {/* Our Story */}
       <section className="py-16 bg-white">
         <div className="container mx-auto px-4">
           <div className="max-w-3xl mx-auto">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="space-y-6 text-center"
             >
               <p
                 className="text-lg md:text-xl text-gray-600 font-light leading-relaxed tracking-wide italic"
          style={{ fontFamily: "'Playfair Display', serif" }} 
                 >
                 {t("about.story")}
               </p>
               <p
                 className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed tracking-tight"
                 style={{ fontFamily: "'Playfair Display', serif" }}
                 >
                 {t("about.mission")}
               </p>
             </motion.div>
           </div>
         </div>
       </section>

      ---

      {/* Team Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-1">Meet the Visionaries</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              {t("about.teamTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("about.teamSubtitle")}
            </p>
          </motion.div>
// CORRECTED CODE SNIPPET for About.jsx

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12 text-2xl text-red-500 bg-red-50 p-6 rounded-xl border border-red-200 shadow-md">
              🚨 Error loading team: {error}
            </div>
          ) : (
            // The JSX element that caused the error:
            <TeamGrid members={filteredTeamMembers} imageBaseUrl={IMAGE_BASE_URL} />
          )}
        </div>
      </section>

      ---

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SuccessStories />
        </div>
      </section>
    </div>
  );
};

export default About;

      {/* Our Story */}
      // <section className="py-16 bg-white">
      //   <div className="container mx-auto px-4">
      //     <div className="max-w-3xl mx-auto">
      //       <motion.div
      //         initial={{ opacity: 0, y: 20 }}
      //         whileInView={{ opacity: 1, y: 0 }}
      //         viewport={{ once: true }}
      //         className="space-y-6 text-center"
      //       >
      //         <p
      //           className="text-lg md:text-xl text-gray-600 font-light leading-relaxed tracking-wide italic"
      //     style={{ fontFamily: "'Playfair Display', serif" }} 
      //           >
      //           {t("about.story")}
      //         </p>
      //         <p
      //           className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed tracking-tight"
      //           style={{ fontFamily: "'Playfair Display', serif" }}
      //           >
      //           {t("about.mission")}
      //         </p>
      //       </motion.div>
      //     </div>
      //   </div>
      // </section>
