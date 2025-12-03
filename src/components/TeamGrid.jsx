// TeamGrid.jsx - REFACTORED TO ACCEPT PROPS AND HANDLE IMAGES

import { motion } from "framer-motion";
// Removed import of local 'team' data, now uses props.
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom"; // Added for potential contact link

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
          className="w-full max-w-sm" // Ensure cards don't stretch too wide on single columns
        >
          <Card className="bg-white border-2 border-orange-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"> {/* Added flex-col for consistent height */}
            
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
              <motion.img
                // 💡 CORRECTED IMAGE SOURCE: Using the prop for the base URL
                src={`${imageBaseUrl}${member.image}`} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
                whileHover={{ scale: 1.1 }} // Enhanced hover zoom
                transition={{ type: "spring", stiffness: 200 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-transparent pointer-events-none" /> {/* Stronger overlay */}
            </div>

            {/* Text Content */}
            <CardHeader className="pb-2 pt-4 flex-grow-0">
              <h3 className="font-extrabold text-xl text-gray-900">{member.name}</h3> {/* Bolder text */}
              <p className="text-base text-orange-600 font-semibold"> {/* Stronger role color/weight */}
                {member.role}
              </p>
            </CardHeader>

            <CardContent className="flex-grow"> {/* Allows bio to expand */}
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-4"> {/* Line-clamp to keep things tidy */}
                {member.bio}
              </p>
            </CardContent>
            
            {/* Optional: Add a subtle contact link */}
            <div className="p-4 pt-0">
                <Link to="/contact" className="text-sm text-orange-500 hover:text-orange-700 font-medium transition-colors">
                    Contact {member.name.split(' ')[0]} →
                </Link>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default TeamGrid;