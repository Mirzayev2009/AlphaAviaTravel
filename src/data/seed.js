
// ============================================================================
// UPDATED src/data/seed.js - COPY THIS TO YOUR FILE
// ============================================================================

export const tours = {
  uzbekistan: [
    {
      id: "t1",
      title: "Samarkand Essentials — 3 Days",
      short: "Discover the crown jewel of the Silk Road — Registan, Gur-e-Amir, and the timeless charm of Samarkand's old city.",
      destination: "Samarkand",
      region: "Central Uzbekistan",
      images: [
        "https://media.gettyimages.com/id/1194231490/photo/shah-i-zinda-mausoleum-samarkand-uzbekistan-shohizinda-necropolis.jpg?s=612x612&w=0&k=20&c=YX3bVdN21PJxEjHkmhxdjpfYnJvKXj6Sayaq5AdPu0Y=",
        "https://media.gettyimages.com/id/638640833/photo/uzbekistan-samarkand-shah-i-zinda.jpg?s=612x612&w=0&k=20&c=4dssHu44u48kyZmzw5IzpWff1zAev9vRcZ1HKIzHJ8I=",
      ],
      price: 250,
      duration: "3 days / 2 nights",
      rating: 4.8,
      category: "uzbekistan",
      availableDates: ["2025-11-10", "2025-11-20", "2025-12-05"],
      itinerary: [
        {
          day: 1,
          activities: [
            "Arrival and hotel check-in",
            "Welcome dinner with traditional music",
            "Evening stroll around illuminated Registan Square",
          ],
        },
        {
          day: 2,
          activities: [
            "Morning tour: Registan, Gur-e-Amir, and Ulugh Beg Observatory",
            "Lunch at a plov center with local families",
            "Afternoon visit to Shah-i-Zinda and Bibi-Khanym Mosque",
          ],
        },
        {
          day: 3,
          activities: [
            "Shopping at Siyob Bazaar",
            "Visit to paper-making workshop",
            "Departure with sweet memories",
          ],
        },
      ],
      highlights: ["Registan Square", "Gur-e-Amir", "Shah-i-Zinda", "Bibi-Khanym"],
      organizer: {
        name: "Alpha Travel",
        phone: "+998 90 123 45 67",
        email: "info@alphatravel.uz",
        website: "https://alphatravel.uz",
      },
    },
    {
      id: "t2",
      title: "Khiva Ancient City — 2 Days",
      short: "Step into a living museum — explore Ichan-Kala's ancient walls, turquoise minarets, and the spirit of old Khiva.",
      destination: "Khiva",
      region: "Khorezm Region",
      images: [
        "https://media.gettyimages.com/id/1737422378/photo/khiva.jpg?s=612x612&w=0&k=20&c=gVIXmWlS9gISw7uQk-Ud75CCUNdQceRf4yIBWQCk8IE=",
        "https://media.gettyimages.com/id/1189800495/photo/khiva-sunset-twilight-xiva-%D1%85%D0%B8%D0%B2%D0%B0-islam-khoja-minaret-uzbekistan.jpg?s=612x612&w=0&k=20&c=bx8HgpRRqg30AeC97fUuOqjw-862_OAwes7vVMaOuTM=",
      ],
      price: 190,
      duration: "2 days / 1 night",
      rating: 4.7,
      category: "uzbekistan",
      availableDates: ["2025-11-12", "2025-11-26", "2025-12-10"],
      itinerary: [
        {
          day: 1,
          activities: [
            "Arrival and transfer to hotel inside Ichan-Kala",
            "Guided city walk through Kalta Minor and Islam Khoja complex",
            "Dinner in a rooftop restaurant with sunset view",
          ],
        },
        {
          day: 2,
          activities: [
            "Visit Tash Hauli Palace and Juma Mosque",
            "Meet local artisans at wood-carving workshop",
            "Departure after lunch",
          ],
        },
      ],
      highlights: ["Ichan-Kala", "Kalta Minor", "Islam Khoja", "Tash Hauli Palace"],
      organizer: {
        name: "Alpha Travel",
        phone: "+998 90 123 45 67",
        email: "info@alphatravel.uz",
        website: "https://alphatravel.uz",
      },
    },
    {
      id: "t3",
      title: "Bukhara Heritage — 4 Days",
      short: "Immerse yourself in the timeless beauty of Bukhara — where every street whispers stories of scholars and caravans.",
      destination: "Bukhara",
      region: "Bukhara Region",
      images: [
        "https://media.gettyimages.com/id/1184019772/photo/bukhara-uzbekistan-kalyan-minaret-and-madressa-sunset-twilight.jpg?s=612x612&w=0&k=20&c=gQofEvWI4u-NilQZcq_Uqea9iIqU7KxdiWqlbvFOjwg=",
        "https://media.gettyimages.com/id/638640851/photo/uzbekistan-bukhara-kalyan-mosque.jpg?s=612x612&w=0&k=20&c=GJV7czcCrZ0jaa9K7J9juZDu84Ke7f-U2cswo6Z7SKQ=",
      ],
      price: 320,
      duration: "4 days / 3 nights",
      rating: 4.9,
      category: "uzbekistan",
      availableDates: ["2025-11-14", "2025-12-01", "2025-12-20"],
      itinerary: [
        { day: 1, activities: ["Arrival, old town orientation", "Evening at Lyabi-Hauz"] },
        { day: 2, activities: ["Ark Citadel", "Bolo Hauz Mosque", "Poi Kalyan complex"] },
        { day: 3, activities: ["Sitorai Mohi Hosa Palace", "Chor Minor", "Bazaar shopping"] },
        { day: 4, activities: ["Bahouddin Naqshband complex", "Farewell lunch", "Departure"] },
      ],
      highlights: ["Ark Citadel", "Poi Kalyan", "Chor Minor", "Old Bazaar"],
      organizer: {
        name: "Alpha Travel",
        phone: "+998 90 123 45 67",
        email: "info@alphatravel.uz",
        website: "https://alphatravel.uz",
      },
    },
    {
      id: "t4",
      title: "Tashkent Modern & Historic — 2 Days",
      short: "Experience the fusion of modern life and ancient heritage — metro art, bustling bazaars, and sacred landmarks.",
      destination: "Tashkent",
      region: "Tashkent Region",
      images: [
        "https://media.gettyimages.com/id/2156412688/photo/tashkent-city-park.jpg?s=612x612&w=0&k=20&c=6Og0Vt9wig4f1PjvodOu-XlTSP1_-MtoJEqB2d9v0EY=",
        "https://media.gettyimages.com/id/522266662/photo/barak-khan-madrasah-in-tashkent.jpg?s=612x612&w=0&k=20&c=W4iIu5ENCJaQWh5yaG3HJoQQgqhredUn32OnJ0y6fDk=",
      ],
      price: 160,
      duration: "2 days / 1 night",
      rating: 4.6,
      category: "uzbekistan",
      availableDates: ["2025-11-09", "2025-11-23", "2025-12-07"],
      itinerary: [
        { day: 1, activities: ["Chorsu Bazaar", "Khast Imam", "Metro tour", "Amir Timur Square"] },
        { day: 2, activities: ["Museum of Applied Arts", "Broadway Street", "Farewell dinner"] },
      ],
      highlights: ["Chorsu Bazaar", "Metro art", "Khast Imam", "Modern skyline"],
      organizer: {
        name: "Alpha Travel",
        phone: "+998 90 123 45 67",
        email: "info@alphatravel.uz",
        website: "https://alphatravel.uz",
      },
    },
    {
      id: "t5",
      title: "Silk Road Grand Tour — 10 Days",
      short: "The complete Uzbekistan experience — from Khiva's ancient walls to Samarkand's turquoise domes and Bukhara's mystic charm.",
      destination: "Multi-city",
      region: "Nationwide",
      images: [
        "https://media.gettyimages.com/id/1193462464/photo/bukhara-poi-kalon-complex-aerial-view-minaret-in-uzbekistan.jpg?s=612x612&w=0&k=20&c=iyYcqS7ihvlo5wEy2zCNXSSugbo13ZG0VbMPtdYXsM0=",
        "https://media.gettyimages.com/id/1167035658/photo/registan-square-in-samarkand-uzbekistan.jpg?s=612x612&w=0&k=20&c=b7_D7jONDNzwUdhkEQ2VqFFW0HjQELKDtJKWWolQDV8=",
      ],
      price: 980,
      duration: "10 days / 9 nights",
      rating: 5.0,
      category: "uzbekistan",
      availableDates: ["2025-11-01", "2025-11-28", "2025-12-15"],
      itinerary: [
        { day: 1, activities: ["Arrive Tashkent", "City tour", "Welcome dinner"] },
        { day: 2, activities: ["Fly to Urgench", "Transfer to Khiva", "Ichan-Kala tour"] },
        { day: 3, activities: ["Full day in Khiva"] },
        { day: 4, activities: ["Drive to Bukhara", "Evening arrival"] },
        { day: 5, activities: ["Bukhara Old Town full-day"] },
        { day: 6, activities: ["Sitorai Palace", "Cultural show"] },
        { day: 7, activities: ["Train to Samarkand", "Registan sunset"] },
        { day: 8, activities: ["UNESCO Samarkand tour"] },
        { day: 9, activities: ["Return to Tashkent", "Shopping", "Farewell gala"] },
        { day: 10, activities: ["Departure"] },
      ],
      highlights: ["UNESCO cities", "Desert drive", "Cultural performances", "All major heritage sites"],
      organizer: {
        name: "Alpha Travel",
        phone: "+998 90 123 45 67",
        email: "info@alphatravel.uz",
        website: "https://alphatravel.uz",
      },
    },
  ],
  world: [
    {
      id: "w1",
      title: "Dubai & UAE Delights — 5 Days",
      short: "Experience the modern marvels of Dubai combined with the cultural richness of Abu Dhabi and desert adventures.",
      destination: "Dubai",
      region: "United Arab Emirates",
      images: [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800",
      ],
      price: 850,
      duration: "5 days / 4 nights",
      rating: 4.9,
      category: "world",
      availableDates: ["2025-11-15", "2025-12-01", "2025-12-20"],
      itinerary: [
        { day: 1, activities: ["Arrival", "Burj Khalifa visit", "Dubai Mall"] },
        { day: 2, activities: ["Desert Safari", "Bedouin camp experience"] },
        { day: 3, activities: ["Abu Dhabi city tour", "Sheikh Zayed Mosque"] },
        { day: 4, activities: ["Dubai Marina", "Palm Jumeirah", "Shopping"] },
        { day: 5, activities: ["Free time", "Departure"] },
      ],
      highlights: ["Burj Khalifa", "Desert Safari", "Sheikh Zayed Mosque", "Dubai Mall"],
      organizer: {
        name: "Alpha Travel",
        phone: "+998 90 123 45 67",
        email: "info@alphatravel.uz",
        website: "https://alphatravel.uz",
      },
    },
    {
      id: "w2",
      title: "Istanbul Cultural Journey — 4 Days",
      short: "Discover where East meets West — explore Byzantine and Ottoman heritage, bustling bazaars, and stunning Bosphorus views.",
      destination: "Istanbul",
      region: "Turkey",
      images: [
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800",
      ],
      price: 680,
      duration: "4 days / 3 nights",
      rating: 4.8,
      category: "world",
      availableDates: ["2025-11-18", "2025-12-05", "2025-12-22"],
      itinerary: [
        { day: 1, activities: ["Arrival", "Sultanahmet Square", "Blue Mosque"] },
        { day: 2, activities: ["Topkapi Palace", "Hagia Sophia", "Basilica Cistern"] },
        { day: 3, activities: ["Bosphorus cruise", "Spice Bazaar", "Grand Bazaar"] },
        { day: 4, activities: ["Free morning", "Departure"] },
      ],
      highlights: ["Hagia Sophia", "Blue Mosque", "Topkapi Palace", "Grand Bazaar"],
      organizer: {
        name: "Alpha Travel",
        phone: "+998 90 123 45 67",
        email: "info@alphatravel.uz",
        website: "https://alphatravel.uz",
      },
    },
    {
      id: "w3",
      title: "Bali Paradise Escape — 7 Days",
      short: "Tropical paradise awaits with pristine beaches, ancient temples, rice terraces, and authentic Balinese culture.",
      destination: "Bali",
      region: "Indonesia",
      images: [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
        "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800",
      ],
      price: 920,
      duration: "7 days / 6 nights",
      rating: 5.0,
      category: "world",
      availableDates: ["2025-11-20", "2025-12-10", "2025-12-28"],
      itinerary: [
        { day: 1, activities: ["Arrival", "Beach relaxation"] },
        { day: 2, activities: ["Ubud tour", "Monkey Forest", "Rice terraces"] },
        { day: 3, activities: ["Temple visits", "Traditional dance show"] },
        { day: 4, activities: ["Water sports", "Beach day"] },
        { day: 5, activities: ["Mount Batur sunrise trek"] },
        { day: 6, activities: ["Spa day", "Shopping"] },
        { day: 7, activities: ["Free time", "Departure"] },
      ],
      highlights: ["Ubud Rice Terraces", "Tanah Lot Temple", "Mount Batur", "Beach resorts"],
      organizer: {
        name: "Alpha Travel",
        phone: "+998 90 123 45 67",
        email: "info@alphatravel.uz",
        website: "https://alphatravel.uz",
      },
    },
  ],
};

// ---- Helper functions ----

// Get a tour by ID
export const getTourById = (id) => tours.find((tour) => tour.id === id);

// Get tours filtered by destination
export const getToursByDestination = (destinationName) =>
  tours.filter((tour) => tour.destination === destinationName);


export const destinations = [
  {
    id: "d1",
    name: "Samarkand",
    heroImage: "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=1200",
    summary:
      "The jewel of the Silk Road, home to the magnificent Registan Square and countless architectural wonders.",
    bestTime: "April-May, September-October",
    travelTips:
      "Book accommodations near the old town. English is limited, so basic Russian phrases help. Dress modestly when visiting mosques.",
    extendedHtml: `
      <h3>History</h3>
      <p>Samarkand is one of the oldest continuously inhabited cities in Central Asia, dating back over 2,500 years. It flourished as a key trading hub on the Silk Road and was the capital of Timur's empire in the 14th century.</p>
      <h3>Must-See Sites</h3>
      <ul>
        <li><strong>Registan Square:</strong> Three madrasas forming one of the world's most stunning Islamic architectural ensembles</li>
        <li><strong>Gur-e-Amir Mausoleum:</strong> Final resting place of Timur (Tamerlane)</li>
        <li><strong>Shah-i-Zinda:</strong> A breathtaking necropolis with azure-tiled mausoleums</li>
        <li><strong>Bibi-Khanym Mosque:</strong> Once one of the largest mosques in the Islamic world</li>
      </ul>
      <h3>Getting There</h3>
      <p>Samarkand is accessible by high-speed train from Tashkent (2 hours) or by domestic flights. The airport also receives limited international flights.</p>
    `,
  },
  {
    id: "d2",
    name: "Bukhara",
    heroImage: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1200",
    summary:
      "A living museum of Islamic architecture, with over 140 protected monuments in its historic center.",
    bestTime: "March-May, September-November",
    travelTips:
      "Stay within the old town for an authentic experience. Bargain politely at bazaars. Try local dishes like shurpa and samsa.",
    extendedHtml: `
      <h3>About Bukhara</h3>
      <p>Bukhara served as a major center of Islamic learning and culture for over a millennium. Its well-preserved old town is a UNESCO World Heritage Site.</p>
      <h3>Key Attractions</h3>
      <ul>
        <li><strong>Ark Citadel:</strong> Ancient royal fortress dating back 2,000 years</li>
        <li><strong>Poi Kalyan Complex:</strong> Includes the iconic Kalyan Minaret</li>
        <li><strong>Lyabi-Hauz:</strong> Historic plaza surrounding an ancient pool</li>
        <li><strong>Chor Minor:</strong> Unique four-minaret gatehouse</li>
      </ul>
      <h3>How to Reach</h3>
      <p>Regular trains connect Bukhara to Samarkand and Tashkent. The journey offers scenic desert views.</p>
    `,
  },
  {
    id: "d3",
    name: "Khiva",
    heroImage: "https://media.gettyimages.com/id/1189800495/photo/khiva-sunset-twilight-xiva-%D1%85%D0%B8%D0%B2%D0%B0-islam-khoja-minaret-uzbekistan.jpg?s=612x612&w=0&k=20&c=bx8HgpRRqg30AeC97fUuOqjw-862_OAwes7vVMaOuTM=",
    summary:
      "An entire walled city frozen in time, offering an unparalleled journey into medieval Central Asia.",
    bestTime: "April-June, September-October",
    travelTips:
      "Ichan-Kala requires an entrance ticket. Climb minarets for sunset views. Support local artisans by purchasing handmade crafts.",
    extendedHtml: `
      <h3>The Last Oasis</h3>
      <p>Khiva's inner town, Ichan-Kala, is a UNESCO World Heritage Site and feels like an open-air museum with its perfectly preserved city walls and narrow lanes.</p>
      <h3>Highlights</h3>
      <ul>
        <li><strong>Ichan-Kala:</strong> The walled inner city with 50+ monuments</li>
        <li><strong>Kalta Minor Minaret:</strong> Iconic turquoise minaret</li>
        <li><strong>Tash Hauli Palace:</strong> Lavishly decorated royal residence</li>
        <li><strong>Juma Mosque:</strong> Unique mosque with 200+ carved wooden columns</li>
      </ul>
      <h3>Transportation</h3>
      <p>Fly to Urgench, then take a 30-minute taxi to Khiva. Alternatively, adventurous travelers can drive through the Kyzylkum Desert from Bukhara.</p>
    `,
  },
  {
    id: "d4",
    name: "Tashkent",
    heroImage: "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=1200",
    summary:
      "The modern capital blending Soviet-era architecture, contemporary development, and Islamic heritage.",
    bestTime: "March-May, September-November",
    travelTips:
      "Use the metro for transport—it's cheap, efficient, and beautifully decorated. Exchange currency at official booths. Learn a few Uzbek or Russian phrases.",
    extendedHtml: `
      <h3>Capital of Uzbekistan</h3>
      <p>Tashkent is the largest city in Central Asia and serves as the country's political, economic, and cultural hub.</p>
      <h3>Top Sites</h3>
      <ul>
        <li><strong>Chorsu Bazaar:</strong> Massive domed market selling everything imaginable</li>
        <li><strong>Khast Imam Complex:</strong> Religious center housing a 7th-century Quran</li>
        <li><strong>Tashkent Metro:</strong> Soviet-era stations designed like underground palaces</li>
        <li><strong>Amir Timur Museum:</strong> Dedicated to Uzbekistan's national hero</li>
      </ul>
      <h3>Arrival</h3>
      <p>Tashkent International Airport is the main gateway to Uzbekistan, with connections to major cities worldwide.</p>
    `,
  },
  {
    id: "d5",
    name: "Fergana Valley",
    heroImage: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1200",
    summary:
      "A fertile valley known for its traditional crafts, fruit orchards, and authentic rural Uzbek culture.",
    bestTime: "April-June (spring blossoms), August-September (harvest)",
    travelTips:
      "Visit local workshops to see silk, ceramics, and knife-making. Hire a guide for rural areas. Try fresh fruits and local sweets.",
    extendedHtml: `
      <h3>The Garden of Uzbekistan</h3>
      <p>The Fergana Valley is Uzbekistan's most densely populated region and a center of traditional craftsmanship.</p>
      <h3>What to Experience</h3>
      <ul>
        <li><strong>Margilan:</strong> Ancient Silk Road city famous for silk production</li>
        <li><strong>Kokand:</strong> Historic Khanate capital with beautiful palaces</li>
        <li><strong>Rishtan:</strong> Renowned for distinctive blue ceramics</li>
        <li><strong>Rural Villages:</strong> Experience authentic Uzbek hospitality</li>
      </ul>
      <h3>Getting Around</h3>
      <p>Shared taxis and buses connect the valley's cities. Roads are scenic but can be slow.</p>
    `,
  },
  {
    id: "d6",
    name: "Nukus & Aral Sea",
    heroImage: "data:image/jpeg;base64,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",
    summary:
      "Remote western Uzbekistan offering the world-class Savitsky Museum and the haunting 'ship graveyard' of the Aral Sea.",
    bestTime: "April-May, September-October (extreme summer/winter temperatures)",
    travelTips:
      "Plan well in advance—this region is remote. The Savitsky Museum is a hidden gem. Hire a 4WD for the Aral Sea trip.",
    extendedHtml: `
      <h3>Off the Beaten Path</h3>
      <p>Nukus and the Aral Sea region offer a stark contrast to Uzbekistan's Silk Road cities, showcasing environmental history and avant-garde art.</p>
      <h3>Must-See</h3>
      <ul>
        <li><strong>Savitsky Museum:</strong> One of the world's finest collections of Russian avant-garde art</li>
        <li><strong>Aral Sea Ship Graveyard:</strong> Rusting ships in the desert, a powerful ecological monument</li>
        <li><strong>Mizdakhan Necropolis:</strong> Ancient hilltop burial site with panoramic views</li>
      </ul>
      <h3>Travel Information</h3>
      <p>Fly to Nukus from Tashkent. Reaching the Aral Sea requires a challenging 4-5 hour drive through desert terrain.</p>
    `,
  },
];

export const team = [
  {
    id: "tm1",
    name: "Aziza Karimova",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
    bio: "Born in Samarkand, Aziza founded AlphaTravel to share Uzbekistan's treasures with the world. 15+ years in tourism.",
  },
  {
    id: "tm2",
    name: "Timur Yusupov",
    role: "Head Guide & Historian",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    bio: "Timur holds a PhD in Central Asian history and has guided over 500 tours across Uzbekistan's heritage sites.",
  },
  {
    id: "tm3",
    name: "Dilnoza Rashidova",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    bio: "Ensures every tour runs smoothly. Fluent in 5 languages, Dilnoza coordinates logistics with precision and care.",
  },
  {
    id: "tm4",
    name: "Alisher Nabiev",
    role: "Cultural Expert",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Specializes in Uzbek traditions, crafts, and cuisine. Alisher creates authentic cultural experiences for travelers.",
  },
];

export const testimonials = [
  {
    id: "ts1",
    name: "Sarah Mitchell",
    country: "USA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    tour: "Silk Road Grand Tour",
    quote:
      "Absolutely life-changing! The team at AlphaTravel crafted a perfect journey through Uzbekistan's treasures. Every detail was thoughtfully planned.",
  },
  {
    id: "ts2",
    name: "Marco Bianchi",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    tour: "Samarkand Essentials",
    quote:
      "Registan at sunset was breathtaking. Our guide Timur brought history alive. Highly recommend AlphaTravel!",
  },
  {
    id: "ts3",
    name: "Yuki Tanaka",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    tour: "Bukhara Heritage",
    quote:
      "The spiritual atmosphere of Bukhara was incredible. AlphaTravel's organization was flawless. Already planning my return!",
  },
];

export const gallery = [
  {
    id: "g1",
    src: "https://media.gettyimages.com/id/638640833/photo/uzbekistan-samarkand-shah-i-zinda.jpg?s=612x612&w=0&k=20&c=4dssHu44u48kyZmzw5IzpWff1zAev9vRcZ1HKIzHJ8I=",
    alt: "Registan Square at sunset, Samarkand",
    location: "Samarkand",
  },
  {
    id: "g2",
    src: "https://media.gettyimages.com/id/638640851/photo/uzbekistan-bukhara-kalyan-mosque.jpg?s=612x612&w=0&k=20&c=GJV7czcCrZ0jaa9K7J9juZDu84Ke7f-U2cswo6Z7SKQ=",
    alt: "Ancient madrasas of Bukhara",
    location: "Bukhara",
  },
  {
    id: "g3",
    src: "https://media.gettyimages.com/id/1213916289/photo/ancient-city-walls-of-khiva-uzbekistan-in-sunset-twilight.jpg?s=612x612&w=0&k=20&c=Ey6m_BCjsI1PsO7WzZYouN0dQPMJKKrsKydm5OX0E44=",
    alt: "Ichan-Kala fortress walls, Khiva",
    location: "Khiva",
  },
  {
    id: "g4",
    src: "https://media.gettyimages.com/id/2171596692/photo/jalal-abad-kyrgyzstan-wild-horses-are-seen-on-a-plateau-in-the-fergana-valley-in-jalal-abad.jpg?s=612x612&w=0&k=20&c=oh_fATvDnImEitzBv1l9k8MkZb9htNrCaviitOZtJN4=",
    alt: "Traditional Uzbek ceramics",
    location: "Fergana Valley",
  },
  {
    id: "g5",
    src: "https://media.gettyimages.com/id/71785306/photo/kukand-uzbekistan-uzbek-youths-eat-their-dinner-in-the-courtyard-of-the-local-mosque-and.jpg?s=612x612&w=0&k=20&c=olMGAcJR0BF294PbZEk7Ouj-VKJuu5PI-pFz1X31SJ4=",
    alt: "Silk weaving workshop",
    location: "Margilan",
  },
  {
    id: "g6",
    src: "https://media.gettyimages.com/id/2156412688/photo/tashkent-city-park.jpg?s=612x612&w=0&k=20&c=6Og0Vt9wig4f1PjvodOu-XlTSP1_-MtoJEqB2d9v0EY=",
    alt: "Chorsu Bazaar dome",
    location: "Tashkent",
  },
  {
    id: "g7",
    src: "https://media.gettyimages.com/id/2160193340/photo/tombs-of-shah-i-zinde-in-semerkand-uzbekistan.jpg?s=612x612&w=0&k=20&c=2FLHIuKR1UXy1Nym7OW4xDWSr42zCcA3jYwavU47Mso=",
    alt: "Shah-i-Zinda necropolis",
    location: "Samarkand",
  },
  {
    id: "g8",
    src: "https://media.gettyimages.com/id/1055571236/photo/uzbekistan-karakalpakstan-ayaz-kala.jpg?s=612x612&w=0&k=20&c=39iVbVCe7vkez0S6cmdtpwOVJZxSWSHeNf8_3rHORNQ=",
    alt: "Kyzylkum Desert landscape",
    location: "Karakalpakstan",
  },
];
