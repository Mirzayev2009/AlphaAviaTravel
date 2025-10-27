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
          <Card className="h-full bg-white border border-orange-100 shadow-sm hover:shadow-md transition-all rounded-2xl">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4 mb-4">
                <motion.img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-300"
                  loading="lazy"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{story.name}</h4>
                  <p className="text-sm text-gray-500">{story.country}</p>
                  <p className="text-xs text-orange-500 font-medium mt-1">
                    {story.tour}
                  </p>
                </div>
                <Quote className="h-8 w-8 text-orange-200" />
              </div>
              <p className="text-sm text-gray-600 italic leading-relaxed">
                &ldquo;{story.quote}&rdquo;
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default SuccessStories;
