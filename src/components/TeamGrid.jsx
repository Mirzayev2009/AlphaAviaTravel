// TeamGrid.jsx - REFACTORED TO ACCEPT PROPS AND HANDLE IMAGES

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom"; 

// Variant for the languages container to enable staggering
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Stagger effect for individual tags
      delayChildren: 0.1
    }
  }
};

// Variant for individual language tags
const itemVariants = {
  hidden: { y: 10, opacity: 0, scale: 0.8 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};


// Define the component to accept 'members' (the filtered data) and 'imageBaseUrl'
const TeamGrid = ({ members, imageBaseUrl }) => {
  if (!members || members.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">No team members found for this language.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
      {members.map((member, index) => (
        <motion.div
          key={member.id || index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6, scale: 1.03 }} // Increased hover effect
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut",
          }}
          className="w-full max-w-sm"
        >
          <Card className="bg-white border-2 border-orange-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
            
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
              <motion.img
                // CORRECTED IMAGE SOURCE: Using the prop for the base URL
                src={`${imageBaseUrl}${member.image}`} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
                whileHover={{ scale: 1.1 }} // Enhanced hover zoom
                transition={{ type: "spring", stiffness: 200 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-transparent pointer-events-none" />
            </div>

            {/* Text Content */}
            <CardHeader className=" pt-4 flex-grow-0">
              <h3 className="font-extrabold text-xl text-gray-900">{member.name}</h3>
              <p className="text-base text-orange-600 font-semibold">
                {member.role}
              </p>
            </CardHeader>

            <CardContent className="flex-grow pt-0">
              {/* 💡 NEW: Language Display */}
              {member.languages && member.languages.length > 0 && (
                <motion.div 
                  className="flex flex-wrap gap-2 mb-3"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  {member.languages.map((lang, langIndex) => (
                    <motion.span
                      key={langIndex}
                      variants={itemVariants}
                      className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-600 border border-orange-200"
                    >
                      🌐 {lang}
                    </motion.span>
                  ))}
                </motion.div>
              )}
              
              {/* Bio Section */}
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                {member.bio}
              </p>
            </CardContent>
            
            
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default TeamGrid;