import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Mail,
  Phone,
  User,
  ChevronUp,
  Send,
  CheckCircle2,
  Star,
  Facebook,
  MessageCircle,
  Clock,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { tours } from "@/data/seed";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

// --- Utility Functions ---

function normalizeAllTours(seed) {
  if (!seed) return [];
  if (Array.isArray(seed)) return seed;
  return Object.values(seed).reduce((acc, val) => {
    if (Array.isArray(val)) acc.push(...val);
    return acc;
  }, []);
}

// --- Component Start ---

const ToursDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const tourParam = params.tourid ?? params.id ?? null;
  const tourFromState = location.state?.tour ?? null;

  // Simplified data loading logic
  const findTourById = (idToFind) => {
    const allTours = normalizeAllTours(tours);
    return allTours.find((x) => String(x?.id) === String(idToFind)) ?? null;
  };

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedDay, setExpandedDay] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState(null);

  const { t } = useTranslation();

  console.log(tour);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    people: 1,
    tourTitle: "",
    unitPrice: 0,
  });

  const contactColors = {
    orange: {
      bg: "bg-gradient-to-br from-orange-500 to-orange-700",
      hoverShadow: "rgba(255, 165, 0, 0.3)",
      hoverText: "text-orange-600",
    },
    amber: {
      bg: "bg-gradient-to-br from-amber-500 to-amber-700",
      hoverShadow: "rgba(255, 193, 7, 0.3)",
      hoverText: "text-amber-600",
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-600 to-blue-800",
      hoverShadow: "rgba(59, 89, 152, 0.3)",
      hoverText: "text-blue-600",
    },
    green: {
      bg: "bg-gradient-to-br from-green-500 to-green-700",
      hoverShadow: "rgba(37, 211, 102, 0.3)",
      hoverText: "text-green-600",
    },
  };

  const organizerEmail = tour?.organizer?.email ?? "info@tourcompany.com";
  const organizerPhone = tour?.organizer?.phone ?? "+998 98 101 33 11";

  const contactItems = [
    {
      icon: Phone,
      title: t("tourDetail.confirmation.callus"),
      value: organizerPhone,
      colorKey: "orange",
      href: `tel:${organizerPhone}`,
    },
    {
      icon: Mail,
      title: "Email",
      value: organizerEmail,
      colorKey: "amber",
      href: `mailto:${organizerEmail}`,
    },
    {
      icon: Facebook,
      title: "Facebook",
      value: "Visit Page",
      colorKey: "blue",
      href: `https://www.facebook.com/${
        tour?.organizer?.facebookHandle || "tourcompany"
      }`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "Chat Now",
      colorKey: "green",
      href: `https://wa.me/${organizerPhone.replace(/\D/g, "")}`,
    },
  ];

  // --- Data Initialization and Effects ---
  useEffect(() => {
    setLoading(true);
    let foundTour = tourFromState;

    if (!foundTour && tourParam) {
      foundTour = findTourById(tourParam);
    }

    if (foundTour) {
      setTour(foundTour);
      setFormData((p) => ({
        ...p,
        tourTitle: foundTour.title || "",
        unitPrice: foundTour.price || 0,
      }));
    }
    setLoading(false);
  }, [tourFromState, tourParam]);

  // Calculate Total Price dynamically using useMemo
  const totalPrice = useMemo(() => {
    return formData.unitPrice ? formData.people * formData.unitPrice : 0;
  }, [formData.people, formData.unitPrice]);

  const itinerary = Array.isArray(tour?.itinerary) ? tour.itinerary : [];
  const highlights = Array.isArray(tour?.highlights) ? tour.highlights : [];

  // ✅ Corrected Logic
  const IMAGE_BASE_URL = "https://alpha-backend-iieo.onrender.com";

  // 1. Safely access and process the image paths array or string
  const rawImagePaths =
    Array.isArray(tour?.images) && tour.images.length > 0
      ? tour.images
      : tour?.image
      ? [tour.image]
      : [];

  // 2. Map over the list to construct the full URLs
  const imageSources = rawImagePaths.map((path) => `${IMAGE_BASE_URL}${path}`);

  // Handler for register button - navigate to tour detail page
  const handleRegisterClick = () => {
    // Navigate with both route param and state for reliability
    navigate(`/tours/${tour.id}`, { state: { tour } });
  };

  const toggleDay = (idx) => setExpandedDay((p) => (p === idx ? null : idx));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "people") {
      const n = parseInt(value, 10);
      newValue = isNaN(n) || n < 1 ? 1 : n;
    }

    setFormData((p) => ({ ...p, [name]: newValue }));
  };

  // ... inside ToursDetail component, replace your current handleSubmit ...

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      formData.people < 1
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const registrationPayload = {
      ...formData,
      totalPrice: totalPrice, // Already calculated via useMemo
      // The backend doesn't need organizerEmail, but we keep it here for local confirmation display
    };

    try {
      const response = await fetch(`${IMAGE_BASE_URL}/api/registrations`, {
        // Use your constant IMAGE_BASE_URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationPayload),
      });

      if (!response.ok) {
        // Read the error message from the backend response
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit registration.");
      }

      const result = await response.json();

      // Success: Update state to show confirmation card
      setRegistrationDetails(registrationPayload);
      setFormSubmitted(true);

      console.log("Registration saved successfully:", result.data);

      // Scroll to the top of the page to show the success message
      setTimeout(() => {
        document
          .getElementById("top-of-page")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Error submitting form: ${error.message}`);
      // Optionally, reset formSubmitted if you want them to retry
      setFormSubmitted(false);
    }
  };

  // Telegram contact
  const TELEGRAM_USERNAME = "Tour_OrganizerUzbekistan";
  const TELEGRAM_WEB_LINK = `https://t.me/${TELEGRAM_USERNAME}`;
  const TELEGRAM_NATIVE_LINK = `tg://resolve?domain=${TELEGRAM_USERNAME}`;

  const openTelegram = (e) => {
    // Try to open native app, then fallback to web
    // We open native in current window then open web in new tab after a short delay as fallback.
    // This is a commonly used UX pattern (not perfect but works in most browsers/devices).
    try {
      window.location.href = TELEGRAM_NATIVE_LINK;
      // fallback to web after 500ms
      setTimeout(() => {
        window.open(TELEGRAM_WEB_LINK, "_blank", "noopener,noreferrer");
      }, 500);
    } catch (err) {
      // If something goes wrong, open web link
      window.open(TELEGRAM_WEB_LINK, "_blank", "noopener,noreferrer");
    }
  };

  // ... rest of the component

  if (loading || !tour) {
    return (
      <div className="min-h-screen p-8">
        <Header />
        <Skeleton className="h-40 w-full mb-8" />
        <Skeleton className="h-[500px] w-full" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section
          id="top-of-page"
          className="py-12 container mx-auto px-4 max-w-5xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl font-extrabold mb-4 text-orange-600 tracking-tight">
              {tour.title}
            </h1>
            <p className="text-gray-700 text-xl mb-4 max-w-2xl mx-auto">
              {tour.short || "A breathtaking journey awaits!"}
            </p>
          </motion.div>
        </section>

        {/* REGISTRATION SECTION */}
        <section className="pb-12 bg-gray-50 border-t border-b border-orange-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <AnimatePresence mode="wait">
              {formSubmitted && registrationDetails ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.68, -0.55, 0.265, 1.55],
                  }}
                  className="mt-12"
                >
                  <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-white">
                    <CardContent className="p-10 text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 12,
                        }}
                      >
                        <CheckCircle2 className="h-20 w-20 text-green-600 mx-auto mb-6" />
                      </motion.div>

                      <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
                        {t("tourDetail.confirmation.bookingSecured")}
                      </h2>

                      <p className="text-gray-700 text-lg mb-6 max-w-lg mx-auto">
                        {t("tourDetail.confirmation.confirm")}
                        <span className="font-bold">
                          {" "}
                          {registrationDetails.name}{" "}
                        </span>
                        {t("tourDetail.confirmation.congraluate")}
                      </p>

                      {/* Compact Summary */}
                      <div className="mx-auto max-w-md bg-white p-5 rounded-2xl border border-green-200 shadow-lg mb-6">
                        <div className="text-left space-y-2">
                          <div className="flex justify-between items-center text-gray-800">
                       
                            <span className="font-bold text-2xl">
                              {registrationDetails.tourTitle}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-gray-800">
                            <span className="text-xl opacity-80">
                              {t("tourDetail.confirmation.guests")}
                            </span>
                            <span className="font-bold text-xl text-orange-600">
                              {registrationDetails.people}{" "}
                              {t("tourDetail.confirmation.people")}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mt-3 p-3 rounded-lg bg-orange-600 text-white font-extrabold text-lg">
                            <span>
                              {t("tourDetail.confirmation.totalCost")}
                            </span>
                            <span>${registrationDetails.totalPrice}</span>
                          </div>
                        </div>
                      </div>

                      {/* Single Large Animated Telegram CTA */}
                      <motion.div
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <motion.button
                          onClick={openTelegram}
                          aria-label={`Message @${TELEGRAM_USERNAME} on Telegram`}
                          whileHover={{ scale: 1.03, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative inline-flex items-center justify-center w-full max-w-2xl px-8 py-5 rounded-3xl text-white font-extrabold text-2xl shadow-2xl overflow-hidden focus:outline-none"
                          style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                          {/* Animated gradient background layers */}
                          <span
                            aria-hidden
                            className="absolute inset-0 transform-gpu -skew-x-12 bg-gradient-to-r from-blue-500 via-indigo-600 to-violet-600"
                            style={{ filter: "saturate(1.05)", opacity: 0.98 }}
                          />
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-white/5 backdrop-blur-sm"
                            style={{ mixBlendMode: "overlay" }}
                          />
                          {/* Glowing pulse */}
                          <motion.span
                            aria-hidden
                            className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full opacity-30"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.35, 0.15, 0.35],
                            }}
                            transition={{ duration: 2.4, repeat: Infinity }}
                            style={{
                              background:
                                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 40%)",
                            }}
                          />

                          {/* Button content */}
                          <span className="relative z-10 flex items-center gap-4">
                            <MessageCircle className="h-8 w-8 text-white drop-shadow-lg" />
                            <span>
                              {t("tourDetail.confirmation.goToTelegram", {
                                username: `@${TELEGRAM_USERNAME}`,
                              }) || `Message @${TELEGRAM_USERNAME}`}
                            </span>
                          </span>
                        </motion.button>
                      </motion.div>

                      <p className="mt-6 text-sm italic text-gray-600">
                        {t("tourDetail.confirmation.detailedReceipt")}{" "}
                        <span className="font-medium">
                          {registrationDetails.email}
                        </span>
                        .
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="mt-12"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                      {t("tourDetail.registrationDetails.bookTrip")}
                    </h2>
                    <p className="text-gray-600">
                      {t("tourDetail.registrationDetails.securePlace")}
                      {tour.price || 0}.
                    </p>
                  </div>
                  <Card className="shadow-2xl border-2 border-orange-300">
                    <form onSubmit={handleSubmit}>
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <motion.label
                            className="space-y-1"
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                              <User className="h-4 w-4 text-orange-500" />{" "}
                              {t("tourDetail.registrationDetails.name")}
                            </div>
                            <Input
                              required
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                            />
                          </motion.label>
                          <motion.label
                            className="space-y-1"
                            initial={{ x: 10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                              <Mail className="h-4 w-4 text-orange-500" />{" "}
                              {t("tourDetail.registrationDetails.email")}
                            </div>
                            <Input
                              required
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="you@email.com"
                            />
                          </motion.label>
                          <motion.label
                            className="space-y-1"
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                          >
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                              <Phone className="h-4 w-4 text-orange-500" />{" "}
                              {t("tourDetail.registrationDetails.phone")}
                            </div>
                            <Input
                              required
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+XXX XX XXX XX XX"
                            />
                          </motion.label>
                          <motion.label
                            className="space-y-1"
                            initial={{ x: 10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                          >
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                              <Users className="h-4 w-4 text-orange-500" />{" "}
                              {t("tourDetail.registrationDetails.people")}
                            </div>
                            <Input
                              required
                              name="people"
                              type="number"
                              min={1}
                              value={formData.people}
                              onChange={handleInputChange}
                            />
                          </motion.label>
                        </div>

                        <motion.div
                          className="mt-6 p-4 rounded-xl bg-orange-50 border-l-4 border-orange-500 shadow-inner"
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center justify-between text-xl font-bold text-gray-800">
                            <span>
                              {t("tourDetail.registrationDetails.totalPrice")}:
                            </span>
                            <motion.span
                              key={formData.people}
                              initial={{ scale: 1.1, opacity: 0.5 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="text-orange-700 text-3xl font-extrabold"
                            >
                              ${totalPrice}
                            </motion.span>
                          </div>
                          <p className="text-sm text-gray-500 text-right mt-1">
                            (
                            {t("tourDetail.registrationDetails.priceForPerson")}{" "}
                            {formData.people}{" "}
                            {formData.people === 1 ? "person" : "people"})
                          </p>
                        </motion.div>

                        <div className="mt-6">
                          <Button
                            type="submit"
                            className="w-full h-12 text-xl font-bold bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 shadow-xl hover:shadow-2xl transition-all duration-300"
                            disabled={formSubmitted}
                          >
                            <span className="flex items-center justify-center gap-3">
                              <Send className="h-5 w-5" />
                              {t(
                                "tourDetail.registrationDetails.confirmBooking"
                              )}
                            </span>
                          </Button>
                        </div>
                      </CardContent>
                    </form>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ADVENTURE DETAILS */}
        <section className="py-16 bg-gradient-to-br from-orange-100 to-amber-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-center text-4xl font-extrabold pb-8 text-orange-700">
                {t("tourDetail.FullAdventure.adventure")}
              </h2>

              {/* Duration and Day Count */}
              <div className="flex justify-center items-center gap-12 mb-10 bg-white p-6 rounded-2xl shadow-2xl border-b-4 border-orange-400">
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <Clock className="h-10 w-10 text-orange-600 mx-auto mb-2" />
                  <p className="text-xl font-bold text-gray-800">
                    {t("tourDetail.FullAdventure.duration")}
                  </p>
                  <p className="text-3xl font-extrabold text-orange-700">
                    {tour.duration || "N/A"}
                  </p>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                >
                  <Calendar className="h-10 w-10 text-orange-600 mx-auto mb-2" />
                  <p className="text-xl font-bold text-gray-800">
                    {t("tourDetail.FullAdventure.day:")}
                  </p>
                  <p className="text-3xl font-extrabold text-orange-700">
                    {itinerary.length} {t("tourDetail.FullAdventure.days")}
                  </p>
                </motion.div>
              </div>

              {/* Images */}
              {imageSources.length > 0 && (
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {imageSources.map((img, idx) => (
                    <motion.img
                      key={idx}
                      src={img}
                      alt={`Tour Image ${idx + 1}`}
                      className="rounded-xl  shadow-xl object-cover w-full h-56 cursor-pointer border-4 border-white"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{
                        scale: 1.05,
                        rotate: [0, 1, -1, 0],
                        boxShadow: "0 15px 25px -5px rgba(0,0,0,0.3)",
                      }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    />
                  ))}
                </div>
              )}

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-3xl font-bold mb-6 text-orange-600 border-b pb-2">
                    {t("tourDetail.FullAdventure.highlights")}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 bg-white p-5 rounded-xl shadow-lg cursor-pointer border border-orange-200"
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: "#fff7ed",
                          boxShadow: "0 6px 12px rgba(255,165,0,0.2)",
                        }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                      >
                        <Star className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0 animate-pulse" />
                        <div className="text-gray-700 font-medium">{h}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {itinerary.length > 0 && (
                <>
                  <h3 className="text-3xl font-bold mb-6 mt-12 text-orange-600 border-b pb-2">
                    {t("tourDetail.FullAdventure.itinerary")}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                    {itinerary.map((dayObj, idx) => (
                      <motion.button
                        key={idx}
                        type="button"
                        onClick={() => toggleDay(idx)}
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className={`relative p-5 rounded-xl text-lg font-bold transition-all ${
                          expandedDay === idx
                            ? "bg-gradient-to-br from-orange-600 to-amber-600 text-white shadow-2xl scale-105 z-10"
                            : "bg-white text-gray-800 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                        }`}
                      >
                        <div className="text-sm opacity-80 mb-1">
                          {t("tourDetail.FullAdventure.day")}
                        </div>
                        <div className="text-2xl font-black">
                          {dayObj?.day ?? idx + 1}
                        </div>
                        {expandedDay === idx ? (
                          <ChevronUp className="absolute bottom-2 right-2 h-5 w-5" />
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute bottom-2 right-2 text-sm"
                          >
                            {t("tourDetail.FullAdventure.view")}
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {expandedDay !== null && (
                      <motion.div
                        key={expandedDay}
                        initial={{ opacity: 0, y: 8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Card className="shadow-2xl border-4 border-orange-400 overflow-hidden mt-6">
                          <CardHeader className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6">
                            <h3 className="text-3xl font-bold">
                              {t("tourDetail.FullAdventure.day")}{" "}
                              {itinerary[expandedDay]?.day ?? expandedDay + 1}:{" "}
                              {itinerary[expandedDay]?.title ||
                                "Daily Activities"}
                            </h3>
                          </CardHeader>
                          <CardContent className="p-6">
                            <p className="text-lg text-gray-700 leading-relaxed">
                              {itinerary[expandedDay]?.activity ||
                                "No details available"}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  {t("tourDetail.FullAdventure.DirectContact")}
                </h2>
                <p className="text-gray-600 text-lg">
                  {t("tourDetail.FullAdventure.assist")}
                </p>
              </div>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                {contactItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 flex flex-col items-center justify-center border-2 border-gray-100 rounded-xl shadow-lg bg-white group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 10px 20px ${
                        contactColors[item.colorKey].hoverShadow
                      }`,
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 10,
                      delay: index * 0.1,
                    }}
                  >
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 text-white ${
                        contactColors[item.colorKey].bg
                      }`}
                      whileHover={{ rotate: 10 }}
                    >
                      <item.icon className="h-8 w-8" />
                    </motion.div>
                    <h4
                      className={`text-xl font-bold text-gray-800 transition-colors group-hover:${
                        contactColors[item.colorKey].hoverText
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-sm font-semibold text-gray-600 mt-1">
                      {item.value}
                    </p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ToursDetail;
