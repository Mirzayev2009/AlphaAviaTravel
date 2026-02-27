import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SwiperHero from "@/components/SwiperHero";
import TourCard from "@/components/TourCard";
import TourModal from "@/components/TourModal";
import RegistrationForm from "@/components/RegistrationForm";
import {
  ArrowRight, Users, Award, Heart, Map, Globe, X, MapPin,
  Calendar, Wallet, Compass, CheckCircle2, ArrowLeft, Sparkles, MessageCircle
} from "lucide-react";

// Static data now served from Vercel CDN (public/data/ folder)
const BASE_URL = "";
const IMAGE_BASE_URL = "/data"; // JSON refs /images/... → actual /data/images/...
const TourCardSkeleton = () => (
  <div className="animate-pulse bg-white border border-gray-100 rounded-2xl shadow-sm h-full max-h-[400px]">
    <div className="h-48 md:h-56 bg-gray-200 rounded-t-2xl"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-300 w-3/4 mb-3 rounded"></div>
      <div className="h-4 bg-gray-200 w-1/2 mb-4 rounded"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-8 bg-gray-200 w-1/4 rounded-lg"></div>
        <div className="h-10 bg-orange-300 w-1/3 rounded-xl"></div>
      </div>
    </div>
  </div>
);

// Travel Assistant Popup Component
const TravelAssistantPopup = ({ onStart }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('travelAssistantSeen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setShow(true), 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem('travelAssistantSeen', 'true');
  };

  const handleStart = () => {
    setShow(false);
    sessionStorage.setItem('travelAssistantSeen', 'true');
    onStart();
  };

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      className="fixed bottom-8 right-8 z-50 max-w-md"
    >
      <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
          animate={{ x: [-100, 400], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <button onClick={handleClose} className="absolute top-3 right-3 text-white/80 hover:text-white z-10">
          <X className="h-5 w-5" />
        </button>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Sparkles className="h-6 w-6" />
            </motion.div>
            <h3 className="text-lg font-bold">Find Your Perfect Trip</h3>
          </div>
          <p className="text-white/90 mb-4 text-sm">
            Not sure which Uzbekistan tour is right for you? Let us help you discover your ideal adventure.
          </p>
          <motion.button
            onClick={handleStart}
            className="w-full bg-white text-orange-500 font-semibold py-3 rounded-xl hover:bg-orange-50 shadow-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start (1 minutes)</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Travel Assistant Modal Component
const TravelAssistantModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    tripType: null, travelers: null, duration: null, budget: null, regions: []
  });
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: "tripType", title: "What kind of trip are you interested in?", icon: Compass,
      options: [
        { value: "cultural", label: "Cultural & Historical", emoji: "🏛️" },
        { value: "nature", label: "Nature & Mountains", emoji: "⛰️" },
        { value: "city", label: "City & Sightseeing", emoji: "🏙️" },
        { value: "relax", label: "Relax & Leisure", emoji: "🌴" },
        { value: "family", label: "Family Trip", emoji: "👨‍👩‍👧‍👦" },
        { value: "adventure", label: "Adventure", emoji: "🎒" },
        { value: "religious", label: "Religious & Spiritual", emoji: "🕌" }
      ], multiSelect: false
    },
    {
      id: "travelers", title: "Who are you traveling with?", icon: Users,
      options: [
        { value: "solo", label: "Solo", emoji: "🧳" },
        { value: "couple", label: "Couple", emoji: "💑" },
        { value: "family", label: "Family with Kids", emoji: "👨‍👩‍👧" },
        { value: "friends", label: "Friends Group", emoji: "👥" }
      ], multiSelect: false
    },
    {
      id: "duration", title: "How long do you plan to stay in Uzbekistan?", icon: Calendar,
      options: [
        { value: "2-3", label: "2–3 days", emoji: "📅" },
        { value: "5-7", label: "5–7 days", emoji: "📆" },
        { value: "8-14", label: "8–14 days", emoji: "🗓️" },
        { value: "14-17", label: "14-17 days", emoji: "🗓️" },
        { value: "flexible", label: "Flexible / Not sure", emoji: "❓" }
      ], multiSelect: false
    },
    {
      id: "budget", title: "What is your approximate budget per person?", icon: Wallet,
      options: [
        { value: "economy", label: "Economy", emoji: "💵" },
        { value: "mid-range", label: "Mid-range", emoji: "💰" },
        { value: "premium", label: "Premium", emoji: "💎" },
        { value: "undecided", label: "Not decided yet", emoji: "🤔" }
      ], multiSelect: false
    },
    {
      id: "regions", title: "Which cities or regions interest you most?", icon: MapPin,
      subtitle: "Select all that apply",
      options: [
        { value: "uzbekistan", label: "All over Uzbekistan", emoji: "🕌 🏰 🏛️ 🌆 🏔️ " },
        { value: "samarkand", label: "Samarkand", emoji: "🕌" },
        { value: "bukhara", label: "Bukhara", emoji: "🏰" },
        { value: "khiva", label: "Khiva", emoji: "🏛️" },
        { value: "tashkent", label: "Tashkent", emoji: "🌆" },
        { value: "mountains", label: "Mountains / Nature", emoji: "🏔️" },
        { value: "undecided", label: "Not decided", emoji: "🗺️" }
      ], multiSelect: true
    }
  ];

  const handleOptionSelect = (questionId, value) => {
    const question = questions[currentStep];
    if (question.multiSelect) {
      setAnswers(prev => {
        const current = prev[questionId] || [];
        const isSelected = current.includes(value);
        return { ...prev, [questionId]: isSelected ? current.filter(r => r !== value) : [...current, value] };
      });
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: value }));
      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsComplete(true);
        }
      }, 300);
    }
  };

  const getAnswerLabel = (questionId, value) => {
    const question = questions.find(q => q.id === questionId);
    return question?.options.find(opt => opt.value === value)?.label || value;
  };

  const handleReset = () => {
    setIsComplete(false);
    setCurrentStep(0);
    setAnswers({ tripType: null, travelers: null, duration: null, budget: null, regions: [] });
    onClose();
  };

  if (!isOpen) return null;

  const currentQuestion = questions[currentStep];
  const Icon = currentQuestion?.icon;
  const isStepValid = currentQuestion?.multiSelect ? answers[currentQuestion.id]?.length > 0 : answers[currentQuestion?.id] !== null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {!isComplete ? (
          <>
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: [-200, 600] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative z-10">
                <button onClick={onClose} className="absolute top-0 right-0 text-white/80 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  {Icon && <Icon className="h-7 w-7" />}
                  <h2 className="text-2xl font-bold">Find Your Perfect Trip</h2>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-sm text-white/80">Question {currentStep + 1} of {questions.length}</span>
                  <div className="flex-1 bg-white/30 rounded-full h-2">
                    <motion.div
                      className="bg-white h-full rounded-full"
                      animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentQuestion.title}</h3>
                  {currentQuestion.subtitle && <p className="text-gray-600 mb-6">{currentQuestion.subtitle}</p>}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {currentQuestion.options.map((option) => {
                      const isSelected = currentQuestion.multiSelect
                        ? answers[currentQuestion.id]?.includes(option.value)
                        : answers[currentQuestion.id] === option.value;
                      return (
                        <motion.button
                          key={option.value}
                          onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${isSelected ? "border-orange-500 bg-orange-50 shadow-md" : "border-gray-200 hover:border-orange-300"
                            }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{option.emoji}</span>
                            <span className={`font-semibold ${isSelected ? "text-orange-600" : "text-gray-700"}`}>
                              {option.label}
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="border-t p-6 flex justify-between">
              <button
                onClick={() => currentStep > 0 && setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 0}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 disabled:opacity-40 font-semibold"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </button>
              {currentQuestion.multiSelect && (
                <motion.button
                  onClick={() => currentStep < questions.length - 1 ? setCurrentStep(prev => prev + 1) : setIsComplete(true)}
                  disabled={!isStepValid}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-40"
                  whileHover={{ scale: 1.02 }}
                >
                  {currentStep === questions.length - 1 ? "Complete" : "Next"}
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              )}
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Thank You! 🎉</h3>
            <p className="text-gray-600 mb-8">We've saved your travel preferences. Here's what you're looking for:</p>
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-3">
              {answers.tripType && (
                <div className="flex gap-3">
                  <Compass className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div><span className="font-semibold">Trip Type:</span> {getAnswerLabel("tripType", answers.tripType)}</div>
                </div>
              )}
              {answers.travelers && (
                <div className="flex gap-3">
                  <Users className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div><span className="font-semibold">Traveling:</span> {getAnswerLabel("travelers", answers.travelers)}</div>
                </div>
              )}
              {answers.duration && (
                <div className="flex gap-3">
                  <Calendar className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div><span className="font-semibold">Duration:</span> {getAnswerLabel("duration", answers.duration)}</div>
                </div>
              )}
              {answers.budget && (
                <div className="flex gap-3">
                  <Wallet className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div><span className="font-semibold">Budget:</span> {getAnswerLabel("budget", answers.budget)}</div>
                </div>
              )}
              {answers.regions?.length > 0 && (
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div><span className="font-semibold">Regions:</span> {answers.regions.map(r => getAnswerLabel("regions", r)).join(", ")}</div>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <motion.button
                onClick={() => navigate("/contact")}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <MessageCircle className="h-5 w-5" />
                Contact Us (We Know Your Preferences)
              </motion.button>
              <motion.button
                onClick={() => navigate("/tours")}
                className="w-full bg-white border-2 border-orange-500 text-orange-500 py-4 rounded-xl font-semibold hover:bg-orange-50"
                whileHover={{ scale: 1.02 }}
              >
                View Recommended Tours
              </motion.button>
              <button onClick={handleReset} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedTour, setSelectedTour] = useState(null);
  const [registrationTour, setRegistrationTour] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("uzbekistan");
  const [allToursData, setAllToursData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTravelAssistant, setShowTravelAssistant] = useState(false);
  const currentLang = i18n.language || 'en';

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/data/tours.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const rawData = await response.json();
        const data = rawData.tours || rawData;
        setAllToursData(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setAllToursData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  const currentTours = useMemo(() => {
    if (!allToursData) return [];
    const categoryData = allToursData[selectedCategory];
    if (!categoryData) return [];
    let languageTours = categoryData[currentLang];
    if (!languageTours || !Array.isArray(languageTours)) {
      languageTours = categoryData['en'] || [];
    }
    return Array.isArray(languageTours) ? languageTours : [];
  }, [allToursData, selectedCategory, currentLang]);

  const featuredTours = useMemo(() => currentTours.slice(0, 3), [currentTours]);

  return (
    <div>
      <TravelAssistantPopup onStart={() => setShowTravelAssistant(true)} />
      <TravelAssistantModal isOpen={showTravelAssistant} onClose={() => setShowTravelAssistant(false)} />
      <SwiperHero />

      {/* Featured Tours */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">{t("home.featuredTitle")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.featuredSubtitle")}</p>
          </motion.div>

          <div className="flex justify-center gap-6 mb-6">
            <motion.button
              onClick={() => setSelectedCategory("uzbekistan")}
              className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${selectedCategory === "uzbekistan" ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xl scale-105" : "bg-gray-100 text-gray-700"
                }`}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-3">
                <Map className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-sm opacity-80">{t("tours.explore")}</div>
                  <div className="text-base font-semibold">{t("tours.uzTours")}</div>
                </div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => setSelectedCategory("world")}
              className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${selectedCategory === "world" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-2xl scale-105" : "bg-gray-100 text-gray-700"
                }`}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-sm opacity-80">{t("tours.discover")}</div>
                  <div className="text-base font-semibold">{t("tours.worldTours")}</div>
                </div>
              </div>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {isLoading ? (
              <>
                <TourCardSkeleton />
                <TourCardSkeleton />
                <TourCardSkeleton />
              </>
            ) : featuredTours.length > 0 ? (
              featuredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} onViewDetails={setSelectedTour} onRegister={setRegistrationTour} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500 text-lg">
                {t("home.noToursAvailable", "No tours found in this category.")}
              </div>
            )}
          </div>

          <div className="text-center flex justify-center">
            <motion.button
              onClick={() => navigate("/tours")}
              className="relative flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-orange-500 bg-white border border-orange-300 shadow-md overflow-hidden"
              whileHover={{ scale: 1.07, color: "#fff", backgroundColor: "#fb923c" }}
              whileTap={{ scale: 0.94 }}
            >
              <span>{t("hero.cta")}</span>
              <ArrowRight className="h-5 w-5" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 opacity-0 rounded-xl"
                whileHover={{ opacity: 0.25, x: [0, 50, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.button>
          </div>
        </div>
      </section>

      {/* NEW: Travel Assistant Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              <Sparkles className="h-4 w-4" />
              <span>Personalized Recommendations</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Uzbekistan Trip
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Answer a few quick questions and we'll understand your travel style to help you better.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
            <motion.button
              onClick={() => setShowTravelAssistant(true)}
              className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-bold py-6 rounded-2xl shadow-xl hover:shadow-2xl relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
                animate={{ x: [-200, 600] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                <Compass className="h-6 w-6" />
                Start Travel Assistant (2 minutes)
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: "⚡", text: "Takes 2 minutes" },
                { icon: "🎯", text: "Personalized matches" },
                { icon: "🔒", text: "No personal data needed" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white text-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.05),transparent_70%)] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-500 drop-shadow-[0_0_6px_rgba(255,165,0,0.2)]">
              {t("home.aboutTitle")}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("home.aboutText")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                Icon: Users,
                title: t("home.aboutcard1Title"),
                text: t("home.aboutcard1Text"),
                delay: 0.1,
              },
              {
                Icon: Award,
                title: t("home.aboutcard2Title"),
                text: t("home.aboutcard2Text"),
                delay: 0.2,
              },
              {
                Icon: Heart,
                title: t("home.aboutcard3Title"),
                text: t("home.aboutcard3Text"),
                delay: 0.3,
              },
            ].map(({ Icon, title, text, delay }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay }}
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                className="text-center bg-white border border-gray-100 shadow-sm hover:shadow-[0_0_25px_rgba(255,165,0,0.3)] rounded-2xl p-8 transition-all duration-300"
              >
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, 10, -10, 0],
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-400 flex items-center justify-center mb-6 shadow-md relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.5),transparent_70%)] opacity-50"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <Icon className="h-10 w-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                </motion.div>

                <h3 className="text-xl font-semibold mb-3 text-orange-500 tracking-wide">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => navigate("/about")}
              className="relative px-8 py-3 rounded-lg border border-orange-400 text-orange-500 hover:text-white hover:bg-orange-500 transition-all duration-300 font-semibold overflow-hidden shadow-sm"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(255,165,0,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t("home.aboutCta")}
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600 opacity-0"
                whileHover={{
                  opacity: 0.2,
                  x: [0, 60, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        </div>
      </section>

      ---

      {/* Modals */}
      {selectedTour && (
        <TourModal
          tour={selectedTour}
          open={!!selectedTour}
          onClose={() => setSelectedTour(null)}
          onRegister={() => {
            setRegistrationTour(selectedTour);
            setSelectedTour(null);
          }}
        />
      )}

      {registrationTour && (
        <RegistrationForm
          tour={registrationTour}
          open={!!registrationTour}
          onClose={() => setRegistrationTour(null)}
        />
      )}
    </div>
  );
};

export default Home;