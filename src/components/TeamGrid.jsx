import { motion } from "framer-motion";
import { team } from "@/data/seed";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const TeamGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-64 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
            </div>
            <CardHeader className="pb-2">
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-sm text-primary font-medium">{member.role}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default TeamGrid;
