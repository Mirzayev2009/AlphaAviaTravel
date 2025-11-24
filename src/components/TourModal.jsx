import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { X, MapPin, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
// import { useNavigate } from "react-router-dom"; // Removed as it is not used directly for the final CTA

// 🎯 FIX 1: Define the base path for images
  const IMAGE_BASE_URL = "https://alpha-backend-iieo.onrender.com"
 // Adjust this base path as needed for your project structure (e.g., "", "/static", or a CDN URL)

const getAbsoluteImageUrl = (relativePath) => {
    if (relativePath.startsWith("/")) {
        return `${IMAGE_BASE_URL}${relativePath}`;
    }
    return `${IMAGE_BASE_URL}/${relativePath}`;
};

/**
 * TourModal - Displays full tour details
 * @param {Object} tour - Tour data
 * @param {boolean} open - Modal open state
 * @param {Function} onClose - Close handler
 * @param {Function} onRegister - Registration handler
 */
const TourModal = ({ tour, open, onClose, onRegister }) => {
    const { t } = useTranslation();
    // 🎯 INITIALIZED: useNavigate hook
    const navigate = useNavigate()

    if (!tour) return null;

    const handleRegisterClick = () => {
        // Primary action: Closes modal and sets the registration state in the parent
        if (onRegister) {
            onRegister(tour);
        }
        onClose(); // Close the modal after triggering registration setup
    };

    // 🎯 LEARNING: Function to handle navigation to the tour detail page
    const handleNavigateToDetails = () => {
        onClose(); // Always close the modal before navigating
        // Syntax: navigate(path)
        navigate(`/tours/${tour.id}`);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-2xl font-bold pr-8">{tour.title}</DialogTitle>
                    <DialogClose className="absolute right-4 top-4" />
                </DialogHeader>

                <ScrollArea className="max-h-[calc(90vh-80px)]">
                    <div className="p-6 pt-4">
                        {/* ... (Images, Quick Info, Description, Itinerary, Highlights remain the same) ... */}
                         {/* Tour Images */}
                        <div className="grid grid-cols-2 gap-2 mb-6">
                            {tour.images.slice(0, 4).map((img, idx) => ( 
                                <motion.img
                                    key={idx}
                                    src={getAbsoluteImageUrl(img)}
                                    alt={`${tour.title} - ${idx + 1}`}
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    loading="lazy"
                                />
                            ))}
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-orange-500" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Destination</p>
                                    <p className="font-semibold">{tour.destination}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-orange-500" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Duration</p>
                                    <p className="font-semibold">{tour.duration}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-orange-500" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Price</p>
                                    <p className="font-semibold">${tour.price}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <p className="text-gray-600 leading-relaxed">{tour.short}</p>
                        </div>

                        {/* Itinerary */}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-4">{t("tours.modal.itinerary")}</h3>
                            <div className="space-y-4">
                                {tour.itinerary.map((day, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.8 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="border-l-4 border-orange-500 pl-4"
                                    >
                                        <h4 className="font-semibold mb-2 text-gray-800">
                                            {day.title || `${t("tours.modal.day")} ${day.day}`}
                                        </h4>
                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                            {Array.isArray(day.activities) ? (
                                                day.activities.map((activity, actIdx) => (
                                                    <li key={actIdx}>• {activity}</li>
                                                ))
                                            ) : (
                                                <li className="list-none ml-[-1rem]">{day.activity}</li> 
                                            )}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-4">{t("tours.modal.highlights")}</h3>
                            <div className="flex flex-wrap gap-2">
                                {tour.highlights.map((highlight, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                                    >
                                        {highlight}
                                    </span>
                                ))}
                            </div>
                        </div>


                        {/* CTA Section */}
                        <div className="sticky bottom-0 bg-background pt-4 border-t flex gap-4">
                            {/* 🎯 PRIMARY ACTION: Your desired registration flow */}
                            <Button
                                size="lg"
                                onClick={handleRegisterClick}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold transition-colors duration-200"
                            >
                                {t("tours.modal.registerNow")}
                            </Button>

                            {/* 🎯 SECONDARY ACTION (FOR LEARNING): Navigation */}
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={handleNavigateToDetails}
                                className="bg-white hover:bg-gray-50 text-orange-500 border-orange-400"
                            >
                                <ArrowRight className="h-5 w-5" />
                                <span className="sr-only">Go to Tour Page</span>
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default TourModal;