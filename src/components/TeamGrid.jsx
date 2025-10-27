import { motion } from "framer-motion";
import { team } from "@/data/seed";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const TeamGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, scale: 1.02 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut",
          }}
        >
          <Card className="bg-white border border-orange-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
              <motion.img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                loading="lazy"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent pointer-events-none" />
            </div>

            <CardHeader className="pb-2">
              <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
              <p className="text-sm text-orange-500 font-medium">
                {member.role}
              </p>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-gray-600 leading-relaxed">
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
