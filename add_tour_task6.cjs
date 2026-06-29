const fs = require('fs');
const path = require('path');

const tourId = "t_pamir_highway_7d";

const translations = {
  en: {
    id: tourId,
    title: "Legendary Pamir Highway Expedition — 7 Days",
    short: "An epic 7-day high-altitude 4x4 expedition from Dushanbe through the Wakhan Valley to Osh.",
    destination: "Dushanbe, Kalai Khumb, Khorog, Langar, Bulunkul, Murghab, Karakul Lake, Osh",
    region: "Tajikistan & Kyrgyzstan",
    images: [
      "/images/samarqand/samarkand.jpg",
      "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg",
      "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"
    ],
    price: 2820,
    priceNote: "Total Price: $2,820 USD per person. Full Board (Breakfast, Lunch, Dinner included daily).",
    duration: "7 days / 6 nights",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Dushanbe – Kalai Khumb", activity: "Stop at the Nurek Dam viewpoint. Explore the medieval Hulbuk Fortress. Lunch in Kulob. Arrive in Kalai Khumb. Meals: L, D." },
      { day: 2, title: "Kalai Khumb – Khorog (The Capital of the Pamirs)", activity: "Riverside drive along the Afghan border. Visit Khorog Botanical Garden, Khorog City Park, and De Pamiri Handicraft Centre. Meals: B, L, D." },
      { day: 3, title: "Khorog – Langar (Wakhan Valley)", activity: "Drive through Ishkashim. Explore the 3rd-century BC Yamchun Fortress. Relax at the sacred Bibi Fatima Hot Springs. Visit the ancient Vrang Buddhist Stupa. Meals: B, L, D." },
      { day: 4, title: "Langar – Bulunkul Lake", activity: "See the ancient Langar Petroglyphs. Cross the Khargush Pass (4,344 m). Visit the crystal-clear Yashilkul and Bulunkul Lakes. Meals: B, L, D." },
      { day: 5, title: "Bulunkul – Murghab", activity: "Stop in the nomadic settlement of Alichur. Visit the pristine Aq Balyk (Holy Blue Fish) Spring. Arrive in Murghab, the highest town in the region. Meals: B, L, D." },
      { day: 6, title: "Murghab – Karakul Lake", activity: "Cross the spectacular Ak-Baital Pass (4,655 m). Descend to Karakul Lake, a meteor-impact crater lake surrounded by 7,000-meter peaks. Meals: B, L, D." },
      { day: 7, title: "Karakul Lake – Osh (Kyrgyzstan)", activity: "Drive to Kyzylart Pass, complete Tajik border formalities, and cross into Kyrgyzstan. Enjoy views of Peak Lenin before arriving in Osh. Meals: B, L." }
    ],
    highlights: ["Nurek Dam", "Wakhan Valley", "Bibi Fatima Hot Springs", "Khargush Pass", "Bulunkul Lake", "Ak-Baital Pass (4,655m)", "Karakul Lake", "Pamir Highway"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Flexible",
    notes: "Included: 3* hotels & traditional guesthouses, Full Board meals, private 4x4 SUV with driver, English-speaking guide, GBAO permit, entry fees, and water. Excluded: International flights, visas, insurance, tips, and personal expenses.",
    extras: ["International flights", "Visas", "Travel insurance", "Tips", "Personal expenses"]
  },
  es: {
    id: tourId,
    title: "Expedición por la Legendaria Carretera del Pamir — 7 Días",
    short: "Una épica expedición 4x4 de 7 días desde Dusambé a través del Valle de Wakhan hasta Osh.",
    destination: "Dusambé, Kalai Khumb, Khorog, Langar, Bulunkul, Murghab, Lago Karakul, Osh",
    region: "Tayikistán y Kirguistán",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 2820,
    priceNote: "Precio Total: $2,820 USD por persona. Pensión Completa.",
    duration: "7 días / 6 noches",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Dusambé – Kalai Khumb", activity: "Presa de Nurek, Fortaleza de Hulbuk. Llegada a Kalai Khumb." },
      { day: 2, title: "Kalai Khumb – Khorog", activity: "Viaje a lo largo de la frontera afgana. Jardín Botánico de Khorog y Centro de Artesanía." },
      { day: 3, title: "Khorog – Langar (Valle de Wakhan)", activity: "Fortaleza de Yamchun, Aguas termales de Bibi Fatima y Estupa Budista de Vrang." },
      { day: 4, title: "Langar – Lago Bulunkul", activity: "Petroglifos de Langar, Paso de Khargush (4,344 m). Lagos Yashilkul y Bulunkul." },
      { day: 5, title: "Bulunkul – Murghab", activity: "Asentamiento nómada de Alichur. Manantial de Aq Balyk. Llegada a Murghab." },
      { day: 6, title: "Murghab – Lago Karakul", activity: "Paso de Ak-Baital (4,655 m). Lago Karakul, un cráter de impacto de meteorito." },
      { day: 7, title: "Lago Karakul – Osh (Kirguistán)", activity: "Cruce de frontera hacia Kirguistán. Vistas del Pico Lenin. Llegada a Osh." }
    ],
    highlights: ["Valle de Wakhan", "Aguas Termales", "Paso Ak-Baital (4,655m)", "Lago Karakul", "Carretera del Pamir"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Flexible",
    notes: "Incluye: Hoteles 3* y casas de huéspedes, Pensión Completa, 4x4 con conductor, guía, permiso GBAO. No incluye: Vuelos, visas, seguro, propinas.",
    extras: ["Vuelos", "Visas", "Seguro", "Propinas"]
  },
  uz: {
    id: tourId,
    title: "Afsonaviy Pomir Trakti Ekspeditsiyasi — 7 Kun",
    short: "Dushanbedan O'shgacha bo'lgan 7 kunlik Pomir trakti 4x4 ekspeditsiyasi.",
    destination: "Dushanbe, Qal'ai Xumb, Xorug', Langar, Bulunko'l, Murg'ob, Qorako'l, O'sh",
    region: "Tojikiston va Qirg'iziston",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 2820,
    priceNote: "Narx: 1 kishi uchun $2,820 USD. 3 mahal ovqat kiritilgan.",
    duration: "7 kun / 6 tun",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Dushanbe – Qal'ai Xumb", activity: "Nurek suv ombori, Xulbuk qal'asi. Qal'ai Xumbga yetib kelish." },
      { day: 2, title: "Qal'ai Xumb – Xorug'", activity: "Afg'oniston chegarasi bo'ylab harakatlanish. Xorug' botanika bog'i." },
      { day: 3, title: "Xorug' – Langar (Vaxon vodiysi)", activity: "Yamchun qal'asi, Bibi Fotima issiq buloqlari, Vrang Budda stupasi." },
      { day: 4, title: "Langar – Bulunko'l", activity: "Langar qoyatosh suratlari, Xargush dovoni (4344 m). Yashilko'l va Bulunko'l." },
      { day: 5, title: "Bulunko'l – Murg'ob", activity: "Alichur ko'chmanchilar qishlog'i. Murg'obga yetib kelish." },
      { day: 6, title: "Murg'ob – Qorako'l", activity: "Oq-Baytal dovoni (4655 m). Qorako'lga tushish." },
      { day: 7, title: "Qorako'l – O'sh (Qirg'iziston)", activity: "Qizil-Art dovoni, Qirg'izistonga o'tish va O'sh shahriga yetib kelish." }
    ],
    highlights: ["Vaxon vodiysi", "Oq-Baytal dovoni", "Qorako'l", "Pomir trakti"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Moslashuvchan",
    notes: "Kiritilgan: 3* mehmonxona, 3 mahal ovqat, 4x4 avtomobil, gid, TBMV (GBAO) ruxsatnomasi. Kiritilmagan: Reyslar, viza, sug'urta, choychaqa.",
    extras: ["Reyslar", "Viza", "Sug'urta", "Choychaqa"]
  },
  ru: {
    id: tourId,
    title: "Экспедиция по Легендарному Памирскому Тракту — 7 Дней",
    short: "7-дневная высокогорная 4x4 экспедиция от Душанбе до Оша через Ваханскую долину.",
    destination: "Душанбе, Калаи-Хумб, Хорог, Лангар, Булункуль, Мургаб, Каракуль, Ош",
    region: "Таджикистан и Кыргызстан",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 2820,
    priceNote: "Итого: $2,820 USD на человека. Полный пансион.",
    duration: "7 дней / 6 ночей",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Душанбе – Калаи-Хумб", activity: "Нурекская ГЭС, крепость Хулбук. Переезд в Калаи-Хумб." },
      { day: 2, title: "Калаи-Хумб – Хорог", activity: "Поездка вдоль афганской границы. Ботанический сад в Хороге." },
      { day: 3, title: "Хорог – Лангар (Ваханская долина)", activity: "Крепость Ямчун, горячие источники Биби-Фатима, Буддийская ступа во Вранге." },
      { day: 4, title: "Лангар – озеро Булункуль", activity: "Петроглифы Лангара, перевал Харгуш (4344 м), озера Яшилькуль и Булункуль." },
      { day: 5, title: "Булункуль – Мургаб", activity: "Поселок Аличур, святой источник Ак Балык. Приезд в Мургаб." },
      { day: 6, title: "Мургаб – озеро Каракуль", activity: "Перевал Ак-Байтал (4655 м). Озеро Каракуль (кратер метеорита)." },
      { day: 7, title: "Каракуль – Ош (Кыргызстан)", activity: "Пересечение границы, вид на пик Ленина. Прибытие в Ош." }
    ],
    highlights: ["Ваханская долина", "Перевал Ак-Байтал", "Озеро Каракуль", "Памирский тракт"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Гибко",
    notes: "Включено: отели 3* и гостевые дома, полный пансион, 4x4 авто с водителем, гид, пермит ГБАО. Не включено: авиабилеты, визы, страховка, чаевые.",
    extras: ["Авиабилеты", "Визы", "Страховка", "Чаевые"]
  },
  zh: {
    id: tourId,
    title: "传奇帕米尔公路探险 — 7 天",
    short: "从杜尚别穿越瓦罕山谷到奥什的史诗级高海拔4x4探险。",
    destination: "杜尚别, 卡莱洪布, 霍罗格, 兰加尔, 布伦库尔, 穆尔加布, 喀拉库勒湖, 奥什",
    region: "塔吉克斯坦与吉尔吉斯斯坦",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 2820,
    priceNote: "总价：每人 $2,820 USD。全食宿。",
    duration: "7天 / 6晚",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "杜尚别 – 卡莱洪布", activity: "努列克大坝观景台，Hulbuk要塞。抵达卡莱洪布。" },
      { day: 2, title: "卡莱洪布 – 霍罗格", activity: "沿着阿富汗边境行驶。参观霍罗格植物园和手工艺中心。" },
      { day: 3, title: "霍罗格 – 兰加尔 (瓦罕山谷)", activity: "Yamchun要塞，比比法蒂玛温泉，Vrang佛教佛塔。" },
      { day: 4, title: "兰加尔 – 布伦库尔湖", activity: "兰加尔岩画，翻越Khargush山口（4344米）。Yashilkul和Bulunkul湖。" },
      { day: 5, title: "布伦库尔 – 穆尔加布", activity: "Alichur游牧定居点，抵达穆尔加布。" },
      { day: 6, title: "穆尔加布 – 喀拉库勒湖", activity: "翻越海拔4655米的白马山口 (Ak-Baital)。抵达喀拉库勒湖（陨石坑湖）。" },
      { day: 7, title: "喀拉库勒湖 – 奥什 (吉尔吉斯斯坦)", activity: "过境吉尔吉斯斯坦。远眺列宁峰。抵达奥什。" }
    ],
    highlights: ["瓦罕山谷", "比比法蒂玛温泉", "白马山口", "喀拉库勒湖", "帕米尔公路"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "灵活",
    notes: "包含: 3*酒店与民宿, 一日三餐, 4x4越野车, 导游, GBAO通行证。不含: 国际航班, 签证, 保险, 小费。",
    extras: ["国际航班", "签证", "旅游保险", "小费"]
  },
  it: {
    id: tourId,
    title: "Spedizione sulla Leggendaria Autostrada del Pamir — 7 Giorni",
    short: "Un'epica spedizione in 4x4 da Dushanbe a Osh attraverso la Valle di Wakhan.",
    destination: "Dushanbe, Kalai Khumb, Khorog, Langar, Bulunkul, Murghab, Karakul Lake, Osh",
    region: "Tagikistan e Kirghizistan",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 2820,
    priceNote: "Prezzo totale: $2,820 USD a persona. Pensione completa.",
    duration: "7 giorni / 6 notti",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Dushanbe – Kalai Khumb", activity: "Diga di Nurek, Fortezza di Hulbuk. Arrivo a Kalai Khumb." },
      { day: 2, title: "Kalai Khumb – Khorog", activity: "Guida lungo il confine afgano. Giardino botanico di Khorog." },
      { day: 3, title: "Khorog – Langar", activity: "Fortezza di Yamchun, Sorgenti termali di Bibi Fatima." },
      { day: 4, title: "Langar – Bulunkul", activity: "Passo Khargush (4.344 m). Laghi Yashilkul e Bulunkul." },
      { day: 5, title: "Bulunkul – Murghab", activity: "Villaggio nomade di Alichur. Arrivo a Murghab." },
      { day: 6, title: "Murghab – Karakul", activity: "Passo Ak-Baital (4.655 m). Lago Karakul." },
      { day: 7, title: "Karakul – Osh", activity: "Attraversamento del confine con il Kirghizistan. Arrivo a Osh." }
    ],
    highlights: ["Valle di Wakhan", "Passo Ak-Baital", "Lago Karakul", "Autostrada del Pamir"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Flessibile",
    notes: "Incluso: Hotel 3*, pensione completa, SUV 4x4, guida, permesso GBAO. Escluso: voli, visti, assicurazione, mance.",
    extras: ["Voli", "Visti", "Assicurazione", "Mance"]
  },
  fr: {
    id: tourId,
    title: "Expédition sur la Mythique Route du Pamir — 7 Jours",
    short: "Une expédition épique en 4x4 de Douchanbé à Och via la vallée de Wakhan.",
    destination: "Douchanbé, Kalai Khumb, Khorog, Langar, Bulunkul, Murghab, Lac Karakul, Och",
    region: "Tadjikistan et Kirghizistan",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 2820,
    priceNote: "Prix total : 2 820 $ USD par personne. Pension complète.",
    duration: "7 jours / 6 nuits",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Douchanbé – Kalai Khumb", activity: "Barrage de Nurek, forteresse de Hulbuk. Arrivée à Kalai Khumb." },
      { day: 2, title: "Kalai Khumb – Khorog", activity: "Route le long de la frontière afghane. Jardin botanique de Khorog." },
      { day: 3, title: "Khorog – Langar (Vallée de Wakhan)", activity: "Forteresse de Yamchun, sources chaudes de Bibi Fatima." },
      { day: 4, title: "Langar – Lac Bulunkul", activity: "Pétroglyphes de Langar, col de Khargush (4 344 m). Lacs Yashilkul et Bulunkul." },
      { day: 5, title: "Bulunkul – Murghab", activity: "Campement nomade d'Alichur. Arrivée à Murghab." },
      { day: 6, title: "Murghab – Lac Karakul", activity: "Col d'Ak-Baital (4 655 m). Lac Karakul." },
      { day: 7, title: "Lac Karakul – Och (Kirghizistan)", activity: "Passage de la frontière kirghize. Vue sur le pic Lénine et arrivée à Och." }
    ],
    highlights: ["Vallée de Wakhan", "Sources de Bibi Fatima", "Col d'Ak-Baital", "Lac Karakul", "Route du Pamir"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Flexible",
    notes: "Inclus: Hôtels 3* et guesthouses, pension complète, SUV 4x4, guide, permis GBAO. Exclus: Vols, visas, assurance, pourboires.",
    extras: ["Vols", "Visas", "Assurance", "Pourboires"]
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
console.log("Successfully updated tours.json with the 7-day Pamir Highway tour in 7 languages.");
