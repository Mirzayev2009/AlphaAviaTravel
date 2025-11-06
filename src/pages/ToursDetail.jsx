// ToursDetail.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  DollarSign,
  Users,
  Mail,
  Phone,
  User,
  ChevronUp,
  Clock,
  Star,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { tours } from "@/data/seed";

/**
 * Utility: normalize the `tours` import into a single flat array.
 * Accepts:
 *  - an array (already flat)
 *  - an object with array values (e.g. { uzbekistan: [...], world: [...] })
 *  - null/undefined -> returns []
 */
function normalizeTours(toursInput) {
  if (!toursInput) return [];
  if (Array.isArray(toursInput)) return toursInput;
  // object-of-arrays
  return Object.values(toursInput)
    .filter((v) => Array.isArray(v))
    .flat();
}

const ToursDetail = () => {
  const { t } = useTranslation("tours");
  const navigate = useNavigate();
  const location = useLocation();

  // Support both param names (many routes use either `id` or `tourid`)
  const params = useParams();
  const tourParam = params.tourid ?? params.id ?? params.slug ?? null;

  const tourFromState = location.state?.tour ?? null;

  // Prepare a normalized list once (safe even if seed shape differs)
  const allTours = normalizeTours(tours);

  // Initialize tour synchronously if possible (state navigation or seed)
  const [tour, setTour] = useState(() => {
    if (tourFromState) return tourFromState;
    if (tourParam) {
      return allTours.find((tt) => tt?.id?.toString() === tourParam) ?? null;
    }
    return null;
  });

  const [expandedDay, setExpandedDay] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form state: ensure tourTitle is synced if tour exists at start
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    people: 1,
    tourTitle: (tour && tour.title) || tourFromState?.title || "",
  });

  // Keep formData.tourTitle in sync when tour changes later
  useEffect(() => {
    if (tour?.title) {
      setFormData((prev) => ({ ...prev, tourTitle: tour.title }));
    }
  }, [tour]);

  // Sync fallback: if we didn't have tour at init, try to find it when param or state changes
  useEffect(() => {
    if (tourFromState && (!tour || tour.id !== tourFromState.id)) {
      setTour(tourFromState);
      return;
    }

    if (tourParam) {
      const found =
        allTours.find((tt) => tt?.id?.toString() === tourParam) ?? null;
      // Only update if changed to avoid unnecessary rerenders
      if (!tour || (found && tour.id !== found.id)) {
        setTour(found);
      } else if (!found && tour === null) {
        // keep null to show Not Found (no overwrite)
        setTour(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourFromState, tourParam]);

  // DEBUG - keep these while you're testing, remove in production
  // console.log("ToursDetail render:", { tourParam, tour, allToursLength: allTours.length });

  // Guard: Loading or Not Found
  if (!tour) {
    return (
      <Layout>
        <div className="container mx-auto p-8 text-center min-h-screen flex items-center justify-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {tourParam ? "Loading / Tour Not Found" : "Tour Not Found"}
            </h1>
            <p className="text-gray-600 mb-6">
              {tourParam
                ? "We couldn't find a tour for that id. Try refreshing or go back to tours."
                : "No tour selected."}
            </p>
            <div className="flex justify-center gap-3">
              <Button type="button" onClick={() => navigate("/tours")}>
                {t("detail.backToTours", {
                  defaultValue: "← Back to All Tours",
                })}
              </Button>
            </div>
            <div className="mt-6 text-left">
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-gray-500">
                  Debug info
                </summary>
                <pre className="bg-gray-50 p-3 rounded text-xs mt-2 overflow-auto">
                  {JSON.stringify(
                    {
                      tourParam,
                      tourFromState: !!tourFromState,
                      allToursLength: allTours.length,
                    },
                    null,
                    2
                  )}
                </pre>
              </details>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Derived data rebuilt each render (safe)
  const imageSrc =
    (tour.images && tour.images.length > 0 && tour.images[0]) ||
    tour.image ||
    "";
  const itinerary = tour.itinerary || [];
  const highlights = tour.highlights || [];

  const toggleDay = (index) => {
    setExpandedDay((prev) => (prev === index ? null : index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "people") {
      const num = parseInt(value, 10);
      setFormData((prev) => ({ ...prev, [name]: isNaN(num) ? "" : num }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // TODO: send to backend / supabase
    console.log("Registration data:", formData);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
        {/* Hero */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={tour.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-200 to-amber-100" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>

          <div className="relative h-full container mx-auto px-4 flex items-end pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {tour.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{tour.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-2xl font-bold">{tour.price}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  {t("detail.registration.title", {
                    defaultValue: "Book Your Adventure",
                  })}
                </h2>
                <p className="text-gray-600 text-lg">
                  {t("detail.registration.subtitle", {
                    defaultValue: "Fill in your details to reserve your spot",
                  })}
                </p>
              </div>

              <Card className="shadow-2xl border-2 border-orange-100">
                <form onSubmit={handleSubmit}>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Name */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="space-y-2"
                        >
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <User className="h-4 w-4 text-orange-500" />
                            {t("detail.registration.name", {
                              defaultValue: "Full Name",
                            })}
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={t(
                              "detail.registration.namePlaceholder",
                              { defaultValue: "Enter your full name" }
                            )}
                            required
                            className="border-2 border-gray-200 focus:border-orange-400 transition-colors"
                          />
                        </motion.div>

                        {/* Email */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="space-y-2"
                        >
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Mail className="h-4 w-4 text-orange-500" />
                            {t("detail.registration.email", {
                              defaultValue: "Email Address",
                            })}
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t(
                              "detail.registration.emailPlaceholder",
                              { defaultValue: "your@email.com" }
                            )}
                            required
                            className="border-2 border-gray-200 focus:border-orange-400 transition-colors"
                          />
                        </motion.div>

                        {/* Phone */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="space-y-2"
                        >
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Phone className="h-4 w-4 text-orange-500" />
                            {t("detail.registration.phone", {
                              defaultValue: "Phone Number",
                            })}
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t(
                              "detail.registration.phonePlaceholder",
                              { defaultValue: "+998 XX XXX XX XX" }
                            )}
                            required
                            className="border-2 border-gray-200 focus:border-orange-400 transition-colors"
                          />
                        </motion.div>

                        {/* People */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="space-y-2"
                        >
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Users className="h-4 w-4 text-orange-500" />
                            {t("detail.registration.people", {
                              defaultValue: "Number of People",
                            })}
                          </label>
                          <Input
                            type="number"
                            name="people"
                            min="1"
                            value={formData.people}
                            onChange={handleInputChange}
                            className="border-2 border-gray-200 focus:border-orange-400 transition-colors"
                          />
                        </motion.div>
                      </div>

                      {/* Chosen Tour (Read-only) */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <Star className="h-4 w-4 text-orange-500" />
                          {t("detail.registration.chosenTour", {
                            defaultValue: "Chosen Tour",
                          })}
                        </label>
                        <Input
                          type="text"
                          name="tourTitle"
                          value={formData.tourTitle}
                          readOnly
                          className="border-2 border-orange-200 bg-orange-50 font-semibold text-orange-700"
                        />
                      </motion.div>

                      {/* Submit */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 hover:from-orange-600 hover:via-amber-500 hover:to-orange-600 shadow-lg"
                        >
                          {formSubmitted ? (
                            <span className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5" />
                              {t("detail.registration.submitted", {
                                defaultValue: "Submitted!",
                              })}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="h-5 w-5" />
                              {t("detail.registration.submit", {
                                defaultValue: "Submit Registration",
                              })}
                            </span>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </form>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Itinerary */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  {t("detail.itinerary.title", {
                    defaultValue: "Tour Itinerary",
                  })}
                </h2>
                <p className="text-gray-600 text-lg">
                  {t("detail.itinerary.subtitle", {
                    defaultValue: "Click any day to see details",
                  })}
                </p>
              </div>

              {highlights.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-orange-500">
                    {t("detail.highlights.title", {
                      defaultValue: "Tour Highlights",
                    })}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md"
                      >
                        <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                {itinerary.map((day, idx) => (
                  <motion.button
                    key={idx}
                    type="button"
                    onClick={() => toggleDay(idx)}
                    className={`relative p-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                      expandedDay === idx
                        ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-2xl scale-110 z-10"
                        : "bg-white text-gray-700 shadow-md hover:shadow-lg hover:scale-105"
                    }`}
                    whileHover={{ scale: expandedDay === idx ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-expanded={expandedDay === idx}
                    aria-controls={`itinerary-day-${idx}`}
                  >
                    <div className="text-sm opacity-80 mb-1">
                      {t("modal.day", { defaultValue: "Day" })}
                    </div>
                    <div className="text-3xl font-black">{idx + 1}</div>
                    {expandedDay === idx && (
                      <ChevronUp className="absolute bottom-2 right-2 h-5 w-5" />
                    )}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {expandedDay !== null && (
                  <motion.div
                    key={expandedDay}
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="shadow-2xl border-2 border-orange-200 overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-3xl font-bold mb-2">
                              {t("modal.day", { defaultValue: "Day" })}{" "}
                              {expandedDay + 1}
                            </h3>
                            <p className="text-white/90 text-lg">
                              {itinerary[expandedDay]?.title ||
                                "Tour Activities"}
                            </p>
                          </div>
                          <motion.button
                            type="button"
                            onClick={() => setExpandedDay(null)}
                            className="bg-white/20 hover:bg-white/30 rounded-full p-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Close day details"
                          >
                            <ChevronUp className="h-6 w-6" />
                          </motion.button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="prose max-w-none">
                          <p className="text-gray-700 text-lg leading-relaxed">
                            {itinerary[expandedDay]?.description ||
                              "Detailed itinerary for this day is not available."}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  {t("detail.contact.title", {
                    defaultValue: "Contact Our Team",
                  })}
                </h2>
                <p className="text-gray-600 text-lg">
                  {t("detail.contact.subtitle", {
                    defaultValue: "Have questions? We're here to help!",
                  })}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="relative overflow-hidden">
                  <Card className="h-full border-2 border-orange-200 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-orange-50 to-white">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 mb-4">
                        <Phone className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">
                        {t("detail.contact.phone", { defaultValue: "Call Us" })}
                      </h3>
                      <a
                        href={`tel:${tour.organizer?.phone ?? "+998901234567"}`}
                        className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors"
                      >
                        {tour.organizer?.phone ?? "+998 90 123 45 67"}
                      </a>
                      <p className="text-sm text-gray-600 mt-2">
                        {t("detail.contact.phoneHours", {
                          defaultValue: "Mon-Fri: 9AM-6PM",
                        })}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative overflow-hidden">
                  <Card className="h-full border-2 border-orange-200 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-amber-50 to-white">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 mb-4">
                        <Mail className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">
                        {t("detail.contact.email", {
                          defaultValue: "Email Us",
                        })}
                      </h3>
                      <a
                        href={`mailto:${
                          tour.organizer?.email ?? "info@yourtours.com"
                        }`}
                        className="text-xl font-bold text-orange-500 hover:text-orange-600 transition-colors break-all"
                      >
                        {tour.organizer?.email ?? "info@yourtours.com"}
                      </a>
                      <p className="text-sm text-gray-600 mt-2">
                        {t("detail.contact.emailResponse", {
                          defaultValue: "Response within 24h",
                        })}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative overflow-hidden">
                  <Card className="h-full border-2 border-orange-200 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-orange-50 to-white">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 mb-4">
                        <MapPin className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">
                        {t("detail.contact.visit", {
                          defaultValue: "Visit Us",
                        })}
                      </h3>
                      <p className="text-lg font-semibold text-orange-500">
                        {tour.organizer?.name ?? "Alpha Travel"}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {tour.organizer?.address ?? "Address not provided"}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Back */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="button"
                onClick={() => navigate("/tours")}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-6 text-lg font-bold shadow-xl"
              >
                {t("detail.backToTours", {
                  defaultValue: "← Back to All Tours",
                })}
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ToursDetail;
