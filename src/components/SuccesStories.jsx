import { motion } from "framer-motion";
import { testimonials } from "@/data/seed";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const SuccessStories = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((story, index) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h4 className="font-bold">{story.name}</h4>
                  <p className="text-sm text-muted-foreground">{story.country}</p>
                  <p className="text-xs text-primary mt-1">{story.tour}</p>
                </div>
                <Quote className="h-8 w-8 text-muted-foreground/30" />
              </div>
              <p className="text-sm text-muted-foreground italic">&ldquo;{story.quote}&rdquo;</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default SuccessStories;
