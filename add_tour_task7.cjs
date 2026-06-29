const fs = require('fs');
const path = require('path');

const tourId = "t_fann_mountains_3d";

const translations = {
  en: {
    id: tourId,
    title: "The Fann Mountains Expedition — 3 Days",
    short: "Experience the pinnacle of Central Asian beauty from the Seven Lakes of Shing to legendary Lake Iskanderkul.",
    destination: "Panjakent, Seven Lakes (Haftkul), Iskanderkul Lake",
    region: "Tajikistan",
    images: [
      "/images/samarqand/samarkand.jpg",
      "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg",
      "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"
    ],
    price: 160,
    priceNote: "Rate per Person: $160.00 (Based on a group of 29 participants). Child Policy (Under 8 years): 50% Discount on Hotel.",
    duration: "3 days / 2 nights",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "The Turquoise Road (Seven Lakes of Shing)", activity: "Meet at the Jarteppa Border. Scenic journey through the Shing Valley to witness the Haftkul (Seven Lakes). Authentic mountain lunch. Return to Panjakent. Overnight at Sarazm Plaza Hotel 3*." },
      { day: 2, title: "The Legend of Alexander (Lake Iskanderkul)", activity: "Drive through the Fann Mountain passes. Explore Iskanderkul Lake, the 'Fann Niagara' waterfall, and Snake Lake. Overnight in Lakeside Cottages or a Resort in Sarotog. Farewell mountain dinner." },
      { day: 3, title: "Ancient Heritage & Silk Road Spirit", activity: "Lakeside breakfast and village walk. Return to Panjakent for a Grand Farewell Lunch featuring 'Festive Panjakent Plov'. Visit the local bazaar. Transfer back to the Jarteppa Border." }
    ],
    highlights: ["Seven Lakes of Shing (Haftkul)", "Lake Iskanderkul", "Fann Niagara Waterfall", "Snake Lake", "Panjakent Bazaar", "Festive Panjakent Plov"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Group of 29 people",
    notes: "Included: Premium Transport, 2 nights accommodation, Full Board Meals, bottled water, English/Russian speaking guide, entrance fees. Excluded: Travel insurance, alcoholic beverages, personal expenses, tips.",
    extras: ["Travel insurance", "Alcoholic beverages", "Personal expenses and tips"]
  },
  es: {
    id: tourId,
    title: "Expedición a las Montañas Fann — 3 Días",
    short: "Experimenta la belleza de los Siete Lagos y el legendario Lago Iskanderkul.",
    destination: "Panjakent, Siete Lagos (Haftkul), Lago Iskanderkul",
    region: "Tayikistán",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 160,
    priceNote: "Precio por persona: $160.00 (Grupo de 29 participantes). Descuento para niños menores de 8 años.",
    duration: "3 días / 2 noches",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "El Camino Turquesa (Siete Lagos de Shing)", activity: "Encuentro en la frontera Jarteppa. Viaje a los Siete Lagos. Almuerzo y noche en Panjakent." },
      { day: 2, title: "La Leyenda de Alejandro (Lago Iskanderkul)", activity: "Exploración del Lago Iskanderkul, cascada Fann Niagara y el Lago de las Serpientes. Noche en cabañas." },
      { day: 3, title: "Patrimonio Antiguo y Ruta de la Seda", activity: "Regreso a Panjakent para el Plov Festivo. Visita al bazar y traslado a la frontera." }
    ],
    highlights: ["Siete Lagos (Haftkul)", "Lago Iskanderkul", "Cascada Fann Niagara", "Plov de Panjakent"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Grupo de 29 personas",
    notes: "Incluye: Transporte, alojamiento, pensión completa, guía y entradas. No incluye: Seguro, alcohol, gastos personales y propinas.",
    extras: ["Seguro", "Alcohol", "Propinas"]
  },
  uz: {
    id: tourId,
    title: "Fann Tog'lari Ekspeditsiyasi — 3 Kun",
    short: "Yetti ko'l va afsonaviy Iskandarko'l bo'ylab sayohat.",
    destination: "Panjakent, Yetti ko'l (Haftko'l), Iskandarko'l",
    region: "Tojikiston",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 160,
    priceNote: "Narx: 1 kishi uchun $160.00 (29 kishilik guruh uchun). 8 yoshgacha bolalarga chegirma.",
    duration: "3 kun / 2 tun",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Feruza yo'li (Yetti ko'l)", activity: "Jartepa chegarasida kutib olish. Yetti ko'l bo'ylab sayohat. Panjakentda tunash." },
      { day: 2, title: "Iskandar afsonasi (Iskandarko'l)", activity: "Iskandarko'l, sharshara va Ilonli ko'lni ziyorat qilish. Ko'l bo'yida tunash." },
      { day: 3, title: "Qadimiy meros", activity: "Panjakent palovi bilan xayrlashuv tushligi. Bozorga tashrif va chegaraga qaytish." }
    ],
    highlights: ["Yetti ko'l (Haftko'l)", "Iskandarko'l", "Fann sharsharasi", "Panjakent palovi"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "29 kishilik guruh",
    notes: "Kiritilgan: Transport, mehmonxona, 3 mahal ovqat, gid va chiptalar. Kiritilmagan: Sug'urta, spirtli ichimliklar, shaxsiy xarajatlar.",
    extras: ["Sug'urta", "Choychaqa"]
  },
  ru: {
    id: tourId,
    title: "Экспедиция в Фанские Горы — 3 Дня",
    short: "Откройте для себя красоту Семи озер и легендарного Искандеркуля.",
    destination: "Пенджикент, Семь Озер (Хафткул), Озеро Искандеркуль",
    region: "Таджикистан",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 160,
    priceNote: "Стоимость: $160.00 на человека (при группе 29 человек).",
    duration: "3 дня / 2 ночи",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Бирюзовый путь (Семь Озер)", activity: "Встреча на границе Джартепа. Поездка на Семь Озер. Ночь в Пенджикенте." },
      { day: 2, title: "Легенда об Александре (Искандеркуль)", activity: "Искандеркуль, Фанская Ниагара и Змеиное озеро. Ночь на озере." },
      { day: 3, title: "Древнее наследие", activity: "Возвращение в Пенджикент, праздничный плов, базар и трансфер на границу." }
    ],
    highlights: ["Семь Озер", "Искандеркуль", "Фанская Ниагара", "Пенджикентский Плов"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Группа из 29 человек",
    notes: "Включено: Транспорт, проживание, полный пансион, гид и входные билеты. Не включено: Страховка, алкоголь, чаевые.",
    extras: ["Страховка", "Чаевые"]
  },
  zh: {
    id: tourId,
    title: "范山探险 — 3 天",
    short: "体验从中亚最美的七湖到传奇的伊斯坎德尔湖之美。",
    destination: "彭吉肯特, 七湖 (Haftkul), 伊斯坎德尔湖",
    region: "塔吉克斯坦",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 160,
    priceNote: "每人：$160.00（基于29人团队）。",
    duration: "3天 / 2晚",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "绿松石之路 (七湖)", activity: "边境集合，前往七湖。彭吉肯特住宿。" },
      { day: 2, title: "亚历山大传说 (伊斯坎德尔湖)", activity: "探索伊斯坎德尔湖，瀑布和蛇湖。湖畔小木屋住宿。" },
      { day: 3, title: "古代遗产", activity: "返回彭吉肯特享用特色抓饭，逛巴扎后返回边境。" }
    ],
    highlights: ["七湖", "伊斯坎德尔湖", "范山瀑布", "彭吉肯特特色抓饭"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "29人团队",
    notes: "包含: 交通, 住宿, 一日三餐, 导游和门票。不含: 保险, 酒精饮料, 个人花费和小费。",
    extras: ["保险", "小费"]
  },
  it: {
    id: tourId,
    title: "Spedizione sui Monti Fann — 3 Giorni",
    short: "Scopri i Sette Laghi e il leggendario Lago Iskanderkul.",
    destination: "Panjakent, Sette Laghi, Lago Iskanderkul",
    region: "Tagikistan",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 160,
    priceNote: "Prezzo a persona: $160.00 (Gruppo di 29 pax).",
    duration: "3 giorni / 2 notti",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "La strada turchese (Sette Laghi)", activity: "Incontro al confine. Viaggio ai Sette Laghi. Notte a Panjakent." },
      { day: 2, title: "La Leggenda di Alessandro (Lago Iskanderkul)", activity: "Esplorazione del Lago Iskanderkul e cascata. Notte al lago." },
      { day: 3, title: "Patrimonio Antico", activity: "Ritorno a Panjakent per il Plov festivo, bazar e rientro al confine." }
    ],
    highlights: ["Sette Laghi", "Lago Iskanderkul", "Cascata Fann", "Plov di Panjakent"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Gruppo di 29 persone",
    notes: "Incluso: Trasporto, hotel, pensione completa, guida, ingressi. Escluso: Assicurazione, alcolici, mance.",
    extras: ["Assicurazione", "Mance"]
  },
  fr: {
    id: tourId,
    title: "Expédition dans les Monts Fann — 3 Jours",
    short: "Découvrez les Sept Lacs et le légendaire lac Iskanderkoul.",
    destination: "Panjakent, Sept Lacs, Lac Iskanderkoul",
    region: "Tadjikistan",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 160,
    priceNote: "Prix par personne : 160,00 $ (Base de 29 participants).",
    duration: "3 jours / 2 nuits",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "La Route Turquoise (Sept Lacs)", activity: "Rendez-vous à la frontière. Route vers les Sept Lacs. Nuit à Panjakent." },
      { day: 2, title: "La Légende d'Alexandre (Lac Iskanderkoul)", activity: "Exploration du lac Iskanderkoul et de la cascade. Nuit près du lac." },
      { day: 3, title: "Héritage Ancien", activity: "Retour à Panjakent pour un Plov festif, visite du bazar et retour à la frontière." }
    ],
    highlights: ["Sept Lacs", "Lac Iskanderkoul", "Cascade Fann", "Plov de Panjakent"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Groupe de 29 personnes",
    notes: "Inclus: Transport, hôtels, pension complète, guide, billets. Exclus: Assurance, alcools, pourboires.",
    extras: ["Assurance", "Pourboires"]
  }
};

const toursPath = path.join(__dirname, 'public', 'data', 'tours.json');
let data = JSON.parse(fs.readFileSync(toursPath, 'utf8'));

// Inject translations into each language
for (const lang of Object.keys(translations)) {
  if (!data.tours.uzbekistan[lang]) {
    data.tours.uzbekistan[lang] = [];
  }
  // Check if tour already exists to prevent duplicates
  const index = data.tours.uzbekistan[lang].findIndex(t => t.id === tourId);
  if (index !== -1) {
    data.tours.uzbekistan[lang][index] = translations[lang];
  } else {
    data.tours.uzbekistan[lang].push(translations[lang]);
  }
}

fs.writeFileSync(toursPath, JSON.stringify(data, null, 2), 'utf8');
console.log("Successfully updated tours.json with the 3-day Fann Mountains tour in 7 languages.");
