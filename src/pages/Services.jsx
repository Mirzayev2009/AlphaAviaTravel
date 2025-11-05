import React, { useEffect, useRef, useState } from "react";
import { Car, Hotel, UtensilsCrossed, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

// Updated Services page with Slide-in detail panel
// Click any card to open a right-side panel with full details (image, title, subtitle, description, CTA).
// Replace placeholder imageUrl values with real backend URLs when ready.

export default function Services() {
  const transportRef = useRef(null);
  const hotelsRef = useRef(null);
  const restaurantsRef = useRef(null);
  const [selectedTransportCategory, setSelectedTransportCategory] =
    useState("all");
  const [activeService, setActiveService] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);

  // --- SAMPLE DATA (replace with API/static image URLs later) ---
  const transportServices = [
    {
      id: "t-mercedes",
      category: "car",
      title: "Mercedes S‑Class",
      subtitle: "Luxury sedan — executive comfort",
      description:
        "Experience superior comfort and advanced features with Mercedes S-Class. Perfect for executive transfers and VIP guests.",
      imageUrl:
        "https://imgd.aeplcdn.com/370x208/n/cw/ec/48067/s-class-exterior-right-front-three-quarter-10.png?isig=0&q=80",
    },
    {
      id: "t-bmw",
      category: "car",
      title: "BMW 7 Series",
      subtitle: "Executive performance and elegance",
      description:
        "BMW 7 Series combines dynamic driving with luxurious interiors — ideal for business travelers.",
      imageUrl: "https://media.istockphoto.com/id/1187096723/photo/bmw-7-series.jpg?s=612x612&w=0&k=20&c=s-wcbkyQBzuZvGNDlPQDGjHU5Ibr9uY5KrzyacvIzXc=",
    },
    {
      id: "t-prado",
      category: "car",
      title: "Toyota Prado",
      subtitle: "Spacious SUV for family/group travel",
      description:
        "Robust and reliable SUV with plenty of room for luggage and passengers — great for off-road excursions.",
      imageUrl: "https://media.istockphoto.com/id/1149195076/photo/toyota-land-cruiser-prado-150.jpg?s=612x612&w=0&k=20&c=vOFj46Psb2WdkwM_Tosd5cbUG2B2G8sPoMHXTim6-Tg=",
    },
    {
      id: "t-heli-1",
      category: "helicopter",
      title: "Helicopter City Tour",
      subtitle: "Aerial views and VIP transfer",
      description:
        "See the city from above in a private helicopter tour — customizable flight routes and VIP handling.",
      imageUrl: "https://media.istockphoto.com/id/157383904/photo/high-banking-helicopter.jpg?s=612x612&w=0&k=20&c=hK6hn91NCXd3ETT8JHwx-4xiJBn4CqlWLacOLD6JyHQ=",
    },
    {
      id: "t-citybus",
      category: "city",
      title: "City Sightseeing Bus",
      subtitle: "Hop-on hop-off city exploration",
      description:
        "Comfortable city buses with multilingual guides — perfect for first-time visitors.",
      imageUrl: "https://media.istockphoto.com/id/2214267404/photo/tour-bus-on-the-road.jpg?s=612x612&w=0&k=20&c=mxk8Yc33bvw0OreS5Af0bppTGgKZSIxJhvmFxBBpOKI=",
    },
    {
      id: "t-limo",
      category: "car",
      title: "Stretch Limo",
      subtitle: "Private chauffeur & VIP service",
      description:
        "Arrive in style with a stretch limo — suited for special events and VIP transfers.",
      imageUrl: "https://media.istockphoto.com/id/1405364323/photo/lincoln-town-car.jpg?s=612x612&w=0&k=20&c=b0LzblxM6fUdIinOqDC4Ha7axFWXE1Qhlgyx8ojzGiQ=",
    },
  ];

  const hotelServices = [
    {
      id: "h-grand",
      title: "Grand Royale Hotel",
      subtitle: "5★ luxury in the city center",
      description:
        "Elegant rooms, rooftop restaurant, spa and conference facilities. Located steps from the main attractions.",
      imageUrl:
        "https://media.istockphoto.com/id/139959582/photo/entrance-lobby-of-a-luxurious-hotel.jpg?s=612x612&w=0&k=20&c=w28ylacdyzJljUzFRTla0kmbCjRnJHtePjtpHgFCj_U=",
    },
    {
      id: "h-boutique",
      title: "The Boutique Inn",
      subtitle: "Characterful rooms and local charm",
      description:
        "Small boutique hotel with uniquely styled rooms and personalized service — a local gem.",
      imageUrl: "https://media.istockphoto.com/id/2157752377/photo/pool-view-in-ao-yon-yai-beach-in-phuket-thailand.jpg?s=612x612&w=0&k=20&c=RDCCTnaLwO1giRxswFBRe--n2_jwORcAZKLzCkn5nJ4=",
    },
    {
      id: "h-resort",
      title: "Seaside Resort & Spa",
      subtitle: "Beachfront relaxation",
      description:
        "Spacious suites, private beach access and a full-service spa — perfect for getaway vacations.",
      imageUrl: "https://media.istockphoto.com/id/641448082/photo/beautiful-tropical-beach-front-hotel-resort-with-swimming-pool-sunshine.jpg?s=612x612&w=0&k=20&c=9PyitcP743oS7oGAoSW8iGDjf1goapy40Ol7PcCNv24=",
    },
    {
      id: "h-business",
      title: "Business Tower Hotel",
      subtitle: "Modern amenities for corporate stays",
      description:
        "High-speed internet, meeting rooms and express check-in for corporate guests.",
      imageUrl: "https://media.istockphoto.com/id/1401340906/photo/four-colleagues-sitting-in-a-luxury-hotel-lobby-and-preparing-for-a-business-meeting.jpg?s=612x612&w=0&k=20&c=XIAHhi5E7VQtT27sU0VT42y_zfAurDGF2Cq58-KwyrA=",
    },
    {
      id: "h-historic",
      title: "Heritage Palace",
      subtitle: "Historic architecture, refined service",
      description:
        "Stay in a building full of history with carefully restored interiors and classic service.",
      imageUrl: "https://media.istockphoto.com/id/2200939697/photo/the-beautiful-famous-pink-winter-palace-hotel-in-luxor.jpg?s=612x612&w=0&k=20&c=yVBoDD0VriQcoNg5WwgvY7hwcU50WrydEU86WxMOoJ0=",
    },
    {
      id: "h-budget",
      title: "Comfort Budget Inn",
      subtitle: "Good value & convenience",
      description:
        "Clean, comfortable rooms at an affordable price near public transport.",
      imageUrl: "https://media.istockphoto.com/id/168791951/photo/hotel-family-bedroom.jpg?s=612x612&w=0&k=20&c=ObSE_H2XPvIoS1fE889uxS2Zc71ZB0_tRQJAeDyOjWM=",
    },
  ];

  const restaurantServices = [
    {
      id: "r-fine",
      title: "La Crème Fine Dining",
      subtitle: "Gourmet tasting menu",
      description:
        "An elegant tasting menu crafted by our head chef using seasonal ingredients.",
      imageUrl: "https://media.istockphoto.com/id/2212532765/photo/elegant-fine-dining-experience-at-a-luxury-event-a-beautifully-plated-dinner-set-on-a.jpg?s=612x612&w=0&k=20&c=_gAj6punOvZlNKhhi5AS_YoNFneP9Iq50JyOozCPeWU=",
    },
    {
      id: "r-cafe",
      title: "Corner Cafe",
      subtitle: "Local specialties and coffee",
      description: "Casual cafe with great coffee and daily specials.",
      imageUrl: "https://media.istockphoto.com/id/2190211503/photo/illuminated-pub-on-the-corner-at-night-people-in-wet-street-in-front-of-it-paris-france.jpg?s=612x612&w=0&k=20&c=3mK-Oo42SyhFMToJ3kB6FJ0FJYq-KYRGTJmXPaD9Gso=",
    },
    {
      id: "r-street",
      title: "Street Bites",
      subtitle: "Authentic street flavors",
      description:
        "A curated selection of the city's best street food vendors.",
      imageUrl: "https://media.istockphoto.com/id/2175764363/photo/samsa-with-tomato-sauce-in-white-plate-fruit-teapot-of-tea-central-asian-cuisine-on-the.jpg?s=612x612&w=0&k=20&c=rPJBm8GMAWiaU03iavoLLGVfXpa7ESp7TItu2WxBFvs=",
    },
    {
      id: "r-rooftop",
      title: "Rooftop Terrace",
      subtitle: "Dinner with skyline views",
      description: "Romantic rooftop dinner with sweeping city views.",
      imageUrl: "https://media.istockphoto.com/id/1423553379/photo/caucasian-couple-celebrating-holiday-event-at-luxury-rooftop-bar-at-night.jpg?s=612x612&w=0&k=20&c=DVtXsrzV49u6nGlujPO2Wq3UmlohE2jB43Sen1mRQmE=",
    },
    {
      id: "r-teahouse",
      title: "Green Tea House",
      subtitle: "Traditional tea & desserts",
      description: "Relaxing tea house featuring regional teas and sweets.",
      imageUrl: "https://media.istockphoto.com/id/2225059603/photo/traditional-uzbek-halva-and-tea-setup.jpg?s=612x612&w=0&k=20&c=w_QIHNwp_KrG0ixkX45QYvE1AyqCxOS6ByBvyi2Rqek=",
    },
    {
      id: "r-class",
      title: "Chef's Workshop",
      subtitle: "Hands-on cooking classes",
      description: "Learn to prepare local dishes with our professional chefs.",
      imageUrl: "https://media.istockphoto.com/id/2197604608/photo/outdoor-pilau-kitchen-in-tashkent.jpg?s=612x612&w=0&k=20&c=OPQqiwSdIzl0OrZtfk1jeio3Yr75EUVjcyus2hTSkak=",
    },
  ];

  // --- auto-scroll using requestAnimationFrame for smoothness ---
  useEffect(() => {
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
        last = now;
        // Normalize movement so it feels similar across devices
        el.scrollLeft += c.speed * (delta / 16);
        // loop when reached end
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
  }, []);

  // filter for transport types
  const filteredTransport = transportServices.filter((s) =>
    selectedTransportCategory === "all"
      ? true
      : s.category === selectedTransportCategory
  );

  // Open panel with selected service
  function openPanel(service) {
    setActiveService(service);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
    // small delay so we can clear activeService after exit animation
    setTimeout(() => setActiveService(null), 300);
  }

  // close with ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") closePanel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        {tag && (
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-orange-50 text-orange-600 mb-2">
            {tag}
          </span>
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
      </div>
    </div>
  );

  // Slide-in panel component
  const SlideInPanel = ({ isOpen, onClose, service }) => (
    <AnimatePresence>
      {isOpen && service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex"
          aria-hidden={!isOpen}
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="ml-auto relative w-full md:w-1/3 lg:w-1/4 h-full bg-white shadow-2xl overflow-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="w-full h-48 md:h-64 bg-gray-100 rounded-md overflow-hidden mb-4">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-gray-700 mb-4">
                {service.description || service.subtitle}
              </p>

              <div className="flex gap-3">
                <Link to={`/contact`}>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium">
                  Book Now
                </button>
                </Link>
                <button
                  onClick={onClose}
                  className="px-4 py-2 border rounded-md"
                >
                  Close
                </button>
              </div>

              {/* Extra metadata area — you can add price, duration, gallery, features here */}
              <div className="mt-6 text-sm text-gray-500">
                <strong>Category:</strong> {service.category || "—"}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white">
        {/* Hero */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-400 text-white py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Premium Services
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Everything you need for an unforgettable journey
            </p>
          </div>
        </div>

        {/* Transport */}
        <section className="py-12 px-4">
          <div className="container mx-auto mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Car className="h-7 w-7 text-orange-500" />
              <h2 className="text-3xl font-bold">Transport Services</h2>
            </div>
            <p className="text-gray-600">
              Choose from cars, helicopters and city tours
            </p>

            {/* Filters */}
            <div className="mt-4 flex gap-2 items-center flex-wrap">
              {[
                { key: "all", label: "All" },
                { key: "car", label: "Cars" },
                { key: "helicopter", label: "Helicopters" },
                { key: "city", label: "City Tours" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setSelectedTransportCategory(f.key)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTransportCategory === f.key
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-700 border"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={transportRef}
            className="flex gap-6 overflow-x-auto py-4 px-4 scrollbar-hide"
            style={{ scrollBehavior: "auto" }}
          >
            {[...filteredTransport, ...filteredTransport].map((s, idx) => (
              <ServiceCard
                key={`${s.id}-${idx}`}
                title={s.title}
                subtitle={s.subtitle}
                imageUrl={s.imageUrl}
                tag={s.category}
                onClick={() => openPanel(s)}
              />
            ))}
          </div>
        </section>

        {/* Hotels */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Hotel className="h-7 w-7 text-orange-500" />
              <h2 className="text-3xl font-bold">Hotel Accommodations</h2>
            </div>
            <p className="text-gray-600">
              From boutique gems to luxury resorts — photo-first listings
            </p>
          </div>

          <div
            ref={hotelsRef}
            className="flex gap-6 overflow-x-auto py-4 px-4"
            style={{ scrollBehavior: "auto" }}
          >
            {[...hotelServices, ...hotelServices].map((h, idx) => (
              <ServiceCard
                key={`${h.id}-${idx}`}
                title={h.title}
                subtitle={h.subtitle}
                imageUrl={h.imageUrl}
                tag={"Hotel"}
                onClick={() => openPanel(h)}
              />
            ))}
          </div>
        </section>

        {/* Restaurants */}
        <section className="py-12 px-4">
          <div className="container mx-auto mb-6">
            <div className="flex items-center gap-3 mb-2">
              <UtensilsCrossed className="h-7 w-7 text-orange-500" />
              <h2 className="text-3xl font-bold">Dining Experiences</h2>
            </div>
            <p className="text-gray-600">
              Taste local and international cuisine — with photos
            </p>
          </div>

          <div
            ref={restaurantsRef}
            className="flex gap-6 overflow-x-auto py-4 px-4"
            style={{ scrollBehavior: "auto" }}
          >
            {[...restaurantServices, ...restaurantServices].map((r, idx) => (
              <ServiceCard
                key={`${r.id}-${idx}`}
                title={r.title}
                subtitle={r.subtitle}
                imageUrl={r.imageUrl}
                tag={"Dining"}
                onClick={() => openPanel(r)}
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-orange-500 text-white py-12 px-4 mt-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
            <p className="text-xl mb-6">
              Contact us to customize your perfect travel package
            </p>
            <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get in Touch
            </button>
          </div>
        </div>

        {/* Slide-in panel */}
        <SlideInPanel
          isOpen={panelOpen}
          onClose={closePanel}
          service={activeService}
        />
      </main>

      <Footer />
    </div>
  );
}
