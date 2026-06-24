import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import SwiperHero from "@/components/SwiperHero";
import TourCard from "@/components/TourCard";
import TourModal from "@/components/TourModal";
import RegistrationForm from "@/components/RegistrationForm";
import DestinationCard from "@/components/DestinationCard";
import DestinationDetailsDrawer from "@/components/DestinationDetailsDrawer";
import LazyMap from "@/components/LazyMap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import {
  ArrowRight, Users, Award, Heart, Map, Globe, X, MapPin,
  Calendar, Wallet, Compass, CheckCircle2, ArrowLeft, Sparkles, MessageCircle, Star, Quote, ShieldCheck, HeadphonesIcon, Plane, Car, Hotel
} from "lucide-react";

// Static data now served from Vercel CDN (public/data/ folder)
const BASE_URL = "";
const IMAGE_BASE_URL = "/data"; // JSON refs /images/... → actual /data/images/...

// Office location – Samarkand
const OFFICE_LAT = 39.676871;
const OFFICE_LNG = 66.927456;
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



// Travel Assistant Modal Component
const TravelAssistantModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    tripType: null, travelers: null, duration: null, budget: null, regions: []
  });
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: "tripType", titleKey: "home.travelAssistant.questionTripType", icon: Compass,
      options: [
        { value: "cultural", labelKey: "home.travelAssistant.optionCultural", emoji: "🏛️" },
        { value: "nature", labelKey: "home.travelAssistant.optionNature", emoji: "⛰️" },
        { value: "city", labelKey: "home.travelAssistant.optionCity", emoji: "🏙️" },
        { value: "relax", labelKey: "home.travelAssistant.optionRelax", emoji: "🌴" },
        { value: "family", labelKey: "home.travelAssistant.optionFamily", emoji: "👨‍👩‍👧‍👦" },
        { value: "adventure", labelKey: "home.travelAssistant.optionAdventure", emoji: "🎒" },
        { value: "religious", labelKey: "home.travelAssistant.optionReligious", emoji: "🕌" }
      ], multiSelect: false
    },
    {
      id: "travelers", titleKey: "home.travelAssistant.questionTravelers", icon: Users,
      options: [
        { value: "solo", labelKey: "home.travelAssistant.optionSolo", emoji: "🧳" },
        { value: "couple", labelKey: "home.travelAssistant.optionCouple", emoji: "💑" },
        { value: "family", labelKey: "home.travelAssistant.optionFamilyKids", emoji: "👨‍👩‍👧" },
        { value: "friends", labelKey: "home.travelAssistant.optionFriends", emoji: "👥" }
      ], multiSelect: false
    },
    {
      id: "duration", titleKey: "home.travelAssistant.questionDuration", icon: Calendar,
      options: [
        { value: "2-3", labelKey: "home.travelAssistant.option2to3", emoji: "📅" },
        { value: "5-7", labelKey: "home.travelAssistant.option5to7", emoji: "📆" },
        { value: "8-14", labelKey: "home.travelAssistant.option8to14", emoji: "🗓️" },
        { value: "14-17", labelKey: "home.travelAssistant.option14to17", emoji: "🗓️" },
        { value: "flexible", labelKey: "home.travelAssistant.optionFlexible", emoji: "❓" }
      ], multiSelect: false
    },
    {
      id: "budget", titleKey: "home.travelAssistant.questionBudget", icon: Wallet,
      options: [
        { value: "economy", labelKey: "home.travelAssistant.optionEconomy", emoji: "💵" },
        { value: "mid-range", labelKey: "home.travelAssistant.optionMidRange", emoji: "💰" },
        { value: "premium", labelKey: "home.travelAssistant.optionPremium", emoji: "💎" },
        { value: "undecided", labelKey: "home.travelAssistant.optionUndecided", emoji: "🤔" }
      ], multiSelect: false
    },
    {
      id: "regions", titleKey: "home.travelAssistant.questionRegions", icon: MapPin,
      subtitleKey: "home.travelAssistant.questionRegionsSubtitle",
      options: [
        { value: "uzbekistan", labelKey: "home.travelAssistant.optionAllUzbekistan", emoji: "🕌 🏰 🏛️ 🌆 🏔️ " },
        { value: "samarkand", labelKey: "home.travelAssistant.optionSamarkand", emoji: "🕌" },
        { value: "bukhara", labelKey: "home.travelAssistant.optionBukhara", emoji: "🏰" },
        { value: "khiva", labelKey: "home.travelAssistant.optionKhiva", emoji: "🏛️" },
        { value: "tashkent", labelKey: "home.travelAssistant.optionTashkent", emoji: "🌆" },
        { value: "mountains", labelKey: "home.travelAssistant.optionMountains", emoji: "🏔️" },
        { value: "undecided", labelKey: "home.travelAssistant.optionNotDecided", emoji: "🗺️" }
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
    const option = question?.options.find(opt => opt.value === value);
    return option ? t(option.labelKey) : value;
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
                  <h2 className="text-2xl font-bold">{t("home.travelAssistant.popupTitle")}</h2>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-sm text-white/80">{t("home.travelAssistant.questionLabel", { current: currentStep + 1, total: questions.length })}</span>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t(currentQuestion.titleKey)}</h3>
                  {currentQuestion.subtitleKey && <p className="text-gray-600 mb-6">{t(currentQuestion.subtitleKey)}</p>}
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
                              {t(option.labelKey)}
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
                {t("home.travelAssistant.back")}
              </button>
              {currentQuestion.multiSelect && (
                <motion.button
                  onClick={() => currentStep < questions.length - 1 ? setCurrentStep(prev => prev + 1) : setIsComplete(true)}
                  disabled={!isStepValid}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-40"
                  whileHover={{ scale: 1.02 }}
                >
                  {currentStep === questions.length - 1 ? t("home.travelAssistant.complete") : t("home.travelAssistant.next")}
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
            <h3 className="text-3xl font-bold text-gray-900 mb-3">{t("home.travelAssistant.resultTitle")}</h3>
            <p className="text-gray-600 mb-8">{t("home.travelAssistant.resultSubtitle")}</p>
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-3">
              {answers.tripType && (
                <div className="flex gap-3">
                  <Compass className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div><span className="font-semibold">{t("home.travelAssistant.resultTripType")}:</span> {getAnswerLabel("tripType", answers.tripType)}</div>
                </div>
              )}
              {answers.travelers && (
                <div className="flex gap-3">
                  <Users className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div><span className="font-semibold">{t("home.travelAssistant.resultTravelers")}:</span> {getAnswerLabel("travelers", answers.travelers)}</div>
                </div>
              )}
              {answers.duration && (
                <div className="flex gap-3">
                  <Calendar className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div><span className="font-semibold">{t("home.travelAssistant.resultDuration")}:</span> {getAnswerLabel("duration", answers.duration)}</div>
                </div>
              )}
              {answers.budget && (
                <div className="flex gap-3">
                  <Wallet className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div><span className="font-semibold">{t("home.travelAssistant.resultBudget")}:</span> {getAnswerLabel("budget", answers.budget)}</div>
                </div>
              )}
              {answers.regions?.length > 0 && (
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div><span className="font-semibold">{t("home.travelAssistant.resultRegions")}:</span> {answers.regions.map(r => getAnswerLabel("regions", r)).join(", ")}</div>
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
                {t("home.travelAssistant.resultContact")}
              </motion.button>
              <motion.button
                onClick={() => navigate("/tours")}
                className="w-full bg-white border-2 border-orange-500 text-orange-500 py-4 rounded-xl font-semibold hover:bg-orange-50"
                whileHover={{ scale: 1.02 }}
              >
                {t("home.travelAssistant.resultViewTours")}
              </motion.button>
              <button onClick={handleReset} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                {t("home.travelAssistant.close")}
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
  const [allDestinationsData, setAllDestinationsData] = useState(null);
  const [selectedHomeDestination, setSelectedHomeDestination] = useState(null);
  const [isDestinationsLoading, setIsDestinationsLoading] = useState(true);
  const [opinions, setOpinions] = useState([]);
  const [isOpinionsLoading, setIsOpinionsLoading] = useState(true);
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
    
    const fetchDestinations = async () => {
      try {
        setIsDestinationsLoading(true);
        const response = await fetch("/data/destination.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const rawData = await response.json();
        const data = rawData.destinations || rawData;
        setAllDestinationsData(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setAllDestinationsData(null);
      } finally {
        setIsDestinationsLoading(false);
      }
    };
    
    const fetchOpinions = async () => {
      try {
        setIsOpinionsLoading(true);

        // Try 1: Use /api/opinions (works on Vercel production)
        try {
          const response = await fetch("/api/opinions");
          if (response.ok) {
            const data = await response.json();
            setOpinions(data);
            return;
          }
        } catch (e) {
          // API not available (likely local dev), try Supabase directly
        }

        // Try 2: Use Supabase client directly (works in local dev with .env)
        if (supabase) {
          const { data, error } = await supabase
            .from('Alpha-opinion')
            .select('*')
            .order('created_at', { ascending: false });
          if (!error && data) {
            setOpinions(data);
            return;
          }
        }

        // Both failed — fallback data will be used
        setOpinions([]);
      } catch (error) {
        console.error("Error fetching opinions:", error);
        setOpinions([]);
      } finally {
        setIsOpinionsLoading(false);
      }
    };

    fetchTours();
    fetchDestinations();
    fetchOpinions();
  }, []);

  const currentDestinations = useMemo(() => {
    if (!allDestinationsData) return [];
    let languageData = allDestinationsData[currentLang];
    if (!languageData || !Array.isArray(languageData)) {
      languageData = allDestinationsData['en'] || [];
    }
    return Array.isArray(languageData) ? languageData.slice(0, 3) : [];
  }, [allDestinationsData, currentLang]);

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

  // Fallback testimonials in case Supabase fetch fails or returns empty
  const fallbackTestimonials = [
    {
      tourist_name: "Sarah Jenkins",
      tourist_country: "USA",
      tourist_opinion: "The trip to Samarkand was absolutely magical. The architecture is breathtaking and the local guides were incredibly knowledgeable.",
    },
    {
      tourist_name: "Marco Rossi",
      tourist_country: "Italy",
      tourist_opinion: "A flawless experience from start to finish. The food in Bukhara and the hospitality of the Uzbek people exceeded my expectations.",
    },
    {
      tourist_name: "Elena Petrova",
      tourist_country: "Russia",
      tourist_opinion: "Our family trip to the Fergana Valley was unforgettable. Such rich culture and beautiful landscapes. Highly recommended!",
    }
  ];

  const testimonials = opinions.length > 0 ? opinions : fallbackTestimonials;

  return (
    <div>
      <TravelAssistantModal isOpen={showTravelAssistant} onClose={() => setShowTravelAssistant(false)} />
      <SwiperHero />

      {/* Featured Tours */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">{t("home.featuredTitle")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.featuredSubtitle")}</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {[
              { key: "uzbekistan", icon: Map, label: t("tours.uzTours"), sub: t("tours.explore") },
              { key: "central_asia", icon: Globe, label: t("tours.centralAsiaTours"), sub: t("tours.findOut") },
              { key: "world", icon: Globe, label: t("tours.worldTours"), sub: t("tours.discover") },
            ].map(({ key, icon: Icon, label, sub }) => (
              <motion.button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                  selectedCategory === key
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon className={`h-4 w-4 ${selectedCategory === key ? "text-white" : "text-orange-400"}`} />
                <span className="hidden sm:inline text-xs opacity-70">{sub}</span>
                <span className="font-bold">{label}</span>
              </motion.button>
            ))}
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

      {/* NEW: Top Destinations Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">{t("destinations.title", "Top Destinations")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("destinations.subtitle", "Discover the most enchanting cities and landscapes.")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {isDestinationsLoading ? (
              <>
                <TourCardSkeleton />
                <TourCardSkeleton />
                <TourCardSkeleton />
              </>
            ) : currentDestinations.length > 0 ? (
              currentDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} onLearnMore={setSelectedHomeDestination} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500 text-lg">
                {t("destinations.noDestinations")}
              </div>
            )}
          </div>

          <div className="text-center flex justify-center">
            <motion.button
              onClick={() => navigate("/destinations")}
              className="relative flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-orange-500 bg-white border border-orange-300 shadow-md overflow-hidden"
              whileHover={{ scale: 1.07, color: "#fff", backgroundColor: "#fb923c" }}
              whileTap={{ scale: 0.94 }}
            >
              <span>{t("destinations.viewAll", "View All Destinations")}</span>
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
              <span>{t("home.travelAssistant.sectionBadge")}</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("home.travelAssistant.sectionTitle")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t("home.travelAssistant.sectionDescription")}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
            <motion.button
              onClick={() => navigate("/chatbot")}
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
                {t("home.travelAssistant.sectionButton")}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: "⚡", textKey: "home.travelAssistant.featureFast" },
                { icon: "🎯", textKey: "home.travelAssistant.featurePersonalized" },
                { icon: "🔒", textKey: "home.travelAssistant.featurePrivate" }
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
                  <p className="text-sm text-gray-600">{t(item.textKey)}</p>
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

      {/* NEW: Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">{t("home.testimonialsTitle", "What Our Travelers Say")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("home.testimonialsSubtitle", "Read stories and experiences from explorers who have journeyed with us.")}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
             <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              className="w-full max-w-sm"
            >
              {isOpinionsLoading ? (
                <SwiperSlide className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 flex flex-col justify-between animate-pulse" style={{ minHeight: "300px" }}>
                  <div>
                    <div className="h-10 w-10 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </SwiperSlide>
              ) : testimonials.map((testimonial, idx) => (
                <SwiperSlide key={testimonial.id || idx} className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 flex flex-col justify-between" style={{ minHeight: "300px" }}>
                  <div>
                    <Quote className="h-10 w-10 text-orange-200 mb-4" />
                    <p className="text-gray-700 italic text-lg leading-relaxed mb-6">"{testimonial.tourist_opinion}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner">
                      {testimonial.tourist_name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.tourist_name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.tourist_country}</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Our Office Location Map */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 ">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">{t("home.locationTitle", "Visit Our Office")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("home.locationSubtitle", "Find us in the heart of Samarkand. We'd love to meet you in person!")}
            </p>
          </motion.div>

          <LazyMap officeLat={OFFICE_LAT} officeLng={OFFICE_LNG} />
        </div>
      </section>

      {/* NEW: Services Preview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">{t("home.servicesTitle", "Our Premium Services")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("home.servicesSubtitle", "We provide comprehensive travel solutions to make your journey seamless.")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {[
              { icon: Plane, title: t("home.serviceTours", "Custom Tours"), text: t("home.serviceToursDesc", "Tailor-made itineraries for your interests and budget."), delay: 0.05 },
              { icon: ShieldCheck, title: t("home.serviceVisa", "Visa Processing"), text: t("home.serviceVisaDesc", "Hassle-free visa assistance for all documentation."), delay: 0.1 },
              { icon: Car, title: t("home.serviceCars", "Car Rental"), text: t("home.serviceCarsDesc", "Premium vehicles with professional drivers for every trip."), delay: 0.15 },
              { icon: Hotel, title: t("home.serviceHotels", "Hotel Booking"), text: t("home.serviceHotelsDesc", "Handpicked accommodations from boutique to luxury."), delay: 0.2 },
              { icon: HeadphonesIcon, title: t("home.serviceSupport", "24/7 Support"), text: t("home.serviceSupportDesc", "Round-the-clock assistance from our dedicated local team."), delay: 0.25 },
            ].map(({ icon: SvcIcon, title, text, delay }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay }}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white border border-gray-100 shadow-sm hover:shadow-[0_0_25px_rgba(255,165,0,0.3)] rounded-2xl p-6 transition-all duration-300"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-400 flex items-center justify-center mb-5 shadow-md">
                  <SvcIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-orange-500">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center flex justify-center">
            <motion.button
              onClick={() => navigate("/services")}
              className="relative flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-orange-500 bg-white border border-orange-300 shadow-md overflow-hidden"
              whileHover={{ scale: 1.07, color: "#fff", backgroundColor: "#fb923c" }}
              whileTap={{ scale: 0.94 }}
            >
              <span>{t("home.exploreServices", "Explore All Services")}</span>
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

      {/* Contact CTA Banner */}
      <section className="py-20 relative overflow-hidden flex items-center justify-center mb-12">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-600 to-orange-500 z-0"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 200%' }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            className="text-center"
          >
             <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-md">
               {t("home.ctaTitle")}
             </h2>
             <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
               {t("home.ctaDescription")}
             </p>
             <motion.button 
               onClick={() => navigate("/contact")}
               className="px-10 py-5 bg-white text-orange-600 rounded-2xl font-bold flex items-center justify-center gap-3 text-xl mx-auto shadow-xl hover:shadow-2xl transition-all"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               {t("home.ctaButton")}
               <ArrowRight className="w-6 h-6" />
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

      {selectedHomeDestination && (
        <DestinationDetailsDrawer
          destination={selectedHomeDestination}
          open={!!selectedHomeDestination}
          onClose={() => setSelectedHomeDestination(null)}
        />
      )}
    </div>
  );
};

export default Home;