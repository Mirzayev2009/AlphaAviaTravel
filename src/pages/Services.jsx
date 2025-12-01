import React, { useEffect, useRef, useState } from "react";
import { Car, Hotel, UtensilsCrossed, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { set } from "zod";

const BASE_URL = "https://alpha-backend-iieo.onrender.com/api";

const IMAGE_BASE_URL = "https://alpha-backend-iieo.onrender.com";

// Fallback data for safety/initial load
const fallbackTransportData = [
  {
    id: "t1",
    title: "Zhong Tong LCK6127Н",
    features: ["51+1+1 seats", "Air conditioning", "Fridge", "Restroom"],
    description:
      "Experience luxury travel with our flagship Zhong Tong coach...",
    image: "/data/images/transport-1.jpg",
  },
  {
    id: "t2",
    title: "Mercedes-Benz vito",
    features: ["5+1 seats", "Large luggage space", "English-speaking driver"],
    description:
      "Discover Uzbekistan in comfort with our Mercedes-Benz Vito...",
    image: "/data/images/transport-2.jpg",
  },
];

// Updated Services page with Slide-in detail panel
export default function Services() {
  const transportRef = useRef(null);
  const hotelsRef = useRef(null);
  const restaurantsRef = useRef(null);
  const [selectedTransportCategory, setSelectedTransportCategory] =
    useState("all");
  const [activeService, setActiveService] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  // Initialize with fallback or empty array
  const [transportServices, setTransportServices] = useState(
    fallbackTransportData
  );
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const { t } = useTranslation();

  // Initialize with empty array
  const [hotelServices, setHotelServices] = useState([]);

  useEffect(() => {
    const fetchTransport = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/transport`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // FIX: Get the array from the 'transport' key or use data directly
        setTransportServices(data.transport || data);
      } catch (error) {
        console.error("Error fetching transport:", error); // Fallback to seed data
        setTransportServices(fallbackTransportData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransport(); // Execute the function
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/hotel`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // FIX: Get the array from the 'hotel' key or use data directly
        setHotelServices(data.hotel || data);
      } catch (error) {
        console.error("Error fetching hotels:", error); // Fallback to empty array
        setHotelServices([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotel();
  }, []);

  useEffect(() => {
    // ... (Parallax/Scroll effect logic remains the same)
    const containers = [
      { ref: transportRef, speed: 0.25 },
      { ref: hotelsRef, speed: 0.18 },
      { ref: restaurantsRef, speed: 0.2 },
    ];

    const rafIds = [];

    containers.forEach((c, index) => {
      const el = c.ref.current;
      if (!el) return;
      let running = true;
      let last = performance.now();

      function step(now) {
        if (!running) return;
        const delta = now - last;
        last = now; // Normalize movement so it feels similar across devices
        el.scrollLeft += c.speed * (delta / 16); // loop when reached end
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
          el.scrollLeft = 0;
        }
        rafIds[index] = requestAnimationFrame(step);
      }

      rafIds[index] = requestAnimationFrame(step);
    });

    return () => {
      rafIds.forEach((id) => {
        if (id) cancelAnimationFrame(id);
      });
    };
  }, []); // Open panel with selected service

  function openPanel(service) {
    setActiveService(service);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false); // small delay so we can clear activeService after exit animation
    setTimeout(() => setActiveService(null), 300);
  } // close with ESC

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") closePanel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []); // ServiceCard component (unchanged)

  const ServiceCard = ({ title, subtitle, imageUrl, tag, onClick }) => (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      role="button"
      tabIndex={0}
      className="flex-shrink-0 w-80 md:w-96 lg:w-[28rem] bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-300"
    >
      <div className="h-48 md:h-56 lg:h-64 bg-gray-100">
        <img
          // Prepend the base URL here
          src={`${IMAGE_BASE_URL}${imageUrl}`}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>{" "}
      <div className="p-4">
        {" "}
        {tag && (
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-orange-50 text-orange-600 mb-2">
            {tag}
          </span>
        )}
        <h3 className="text-lg font-semibold">{title}</h3>{" "}
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{subtitle}</p>{" "}
      </div>{" "}
    </div>
  ); // Slide-in panel component (MODIFIED)

  const SlideInPanel = ({ isOpen, onClose, service }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    // Set the main image when the service changes or panel opens
    useEffect(() => {
      if (isOpen && service) {
        const initialImage =
          service.images && service.images.length > 0
            ? service.images[0] // Use first image from hotel 'images' array
            : service.image; // Fallback for transport 'image'
        setSelectedImage(initialImage);
      }
    }, [isOpen, service]);

    // Handle both transport (features) and hotels (facilities)
    const features = service?.features || service?.facilities;

    return (
      <AnimatePresence>
        {" "}
        {isOpen && service && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex"
            aria-hidden={!isOpen}
          >
            {/* Overlay */} <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black"
              onClick={onClose}
            />
            {/* Panel */} <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="ml-auto relative w-full md:w-1/3 lg:w-1/4 h-full bg-white shadow-2xl overflow-auto"
              role="dialog"
              aria-modal="true"
            >
              {" "}
              <div className="p-4 border-b flex items-center justify-between">
                {" "}
                <h3 className="text-lg font-semibold">{service.title}</h3>{" "}
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />{" "}
                </button>
              </div>{" "}
              <div className="p-4">
                {" "}
                <div className="w-full h-48 md:h-64 bg-gray-100 rounded-md overflow-hidden mb-4">
                  {" "}
                  <img
                    // Use selectedImage from state
                    src={`${IMAGE_BASE_URL}${selectedImage}`}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>{" "}
                <p className="text-gray-700 mb-4">
                  {service.description || service.subtitle}{" "}
                </p>
                {/* Image Gallery for Hotels */}
                {service.images && service.images.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Gallery</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.images.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          className={`w-16 h-16 rounded-md overflow-hidden focus:outline-none ${
                            selectedImage === imgUrl
                              ? "ring-2 ring-orange-500"
                              : "opacity-70 hover:opacity-100"
                          }`}
                          onClick={() => setSelectedImage(imgUrl)}
                        >
                          <img
                            src={`${IMAGE_BASE_URL}${imgUrl}`}
                            alt={`${service.title} - ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* Display features from the service object (handles both) */}
                {features && features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Features</h4>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      {features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}{" "}
                <div className="flex gap-3">
                  {" "}
                  <Link to={`/contact`}>
                    {" "}
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium">
                      {t("services.book")}{" "}
                    </button>
                  </Link>{" "}
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border rounded-md"
                  >
                    {t("services.close")}{" "}
                  </button>
                </div>{" "}
                {/* Extra metadata area — you can add price, duration, gallery, features here */}
                {" "}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />{" "}
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white">
        {/* Hero */} <div className="bg-gradient-to-r from-orange-400 to-orange-400 text-white py-20 px-4">
          {" "}
          <div className="container mx-auto text-center">
            {" "}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("services.title")}{" "}
            </h1>
            {" "}
            <p className="text-xl md:text-2xl opacity-90">
              {t("services.subtitle")}{" "}
            </p>
          </div>
        </div>
        {/* Transport */} <section className="py-12 px-4">
          {" "}
          <div className="container mx-auto mb-6">
            {" "}
            <div className="flex items-center gap-3 mb-2">
              <Car className="h-7 w-7 text-orange-500" />{" "}
              <h2 className="text-3xl font-bold">
                {t("services.transport.title")}
              </h2>
            </div>{" "}
            <p className="text-gray-600">
              {t("services.transport.subtitle")}{" "}
            </p>
          </div>
          {/* Conditional rendering based on loading state (optional) */}
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">
              Loading transport services...
            </div>
          ) : (
            <div
              ref={transportRef}
              className="flex gap-6 overflow-x-auto py-4 px-4 scrollbar-hide"
              style={{ scrollBehavior: "auto" }}
            >
              {/* FIX: Map directly over transportServices and use correct property names */}
              {transportServices &&
                transportServices.map((s, idx) => (
                  <ServiceCard
                    key={s.id || `transport-${idx}`}
                    title={s.title}
                    // Create a descriptive subtitle from the features array
                    subtitle={
                      s.features
                        ? s.features.slice(0, 3).join(" | ")
                        : t("services.transport.defaultSubtitle")
                    }
                    imageUrl={s.image} // Correct property name from your JSON
                    tag={s.category} // Use 'category' if your API provides it
                    onClick={() => openPanel(s)}
                  />
                ))}
            </div>
          )}
        </section>
        {/* Hotels */} <section className="py-12 px-4 bg-gray-50">
          {" "}
          <div className="container mx-auto mb-6">
            {" "}
            <div className="flex items-center gap-3 mb-2">
              <Hotel className="h-7 w-7 text-orange-500" />{" "}
              <h2 className="text-3xl font-bold">
                {t("services.hotels.title")}
              </h2>
            </div>{" "}
            <p className="text-gray-600">
              {t("services.hotels.subtitle")}{" "}
            </p>
          </div>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">
              Loading hotel services...
            </div>
          ) : (
            <div
              ref={hotelsRef}
              className="flex gap-6 overflow-x-auto py-4 px-4"
              style={{ scrollBehavior: "auto" }}
            >
              {/* MODIFICATION: Map over hotelServices and use new JSON structure */}
              {hotelServices &&
                hotelServices.map((h, idx) => (
                  <ServiceCard
                    key={h.id || `hotel-${idx}`}
                    title={h.title}
                    subtitle={h.description} // Use description as subtitle
                    // Use the first image from the 'images' array
                    imageUrl={
                      h.images && h.images.length > 0
                        ? h.images[0]
                        : "/path/to/default-hotel.jpg" // Fallback image
                    }
                    // Use location city or first tag as the tag
                    tag={
                      h.location.city ||
                      (h.tags && h.tags.length > 0 ? h.tags[0] : "Hotel")
                    }
                    onClick={() => openPanel(h)}
                  />
                ))}
            </div>
          )}
        </section>
        {/* Restaurants (Commented out section) */} {/* CTA */}{" "}
        <div className="bg-orange-500 text-white py-12 px-4 mt-8">
          {" "}
          <div className="container mx-auto text-center">
            {" "}
            <h2 className="text-3xl font-bold mb-4">
              {t("services.question")}
            </h2>
            {" "}
            <p className="text-xl mb-6">
              {t("services.contactUs")}{" "}
            </p>
            <Link to="/contact">
              {" "}
              <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {t("services.GetInTouch")}{" "}
              </button>
            </Link>
          </div>
        </div>
        {/* Slide-in panel */} <SlideInPanel
          isOpen={panelOpen}
          onClose={closePanel}
          service={activeService}
        />
      </main>
      <Footer />{" "}
    </div>
  );
}