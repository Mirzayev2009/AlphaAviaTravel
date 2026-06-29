const fs = require('fs');
const path = require('path');

const tourId = "t_journey_thousand_miles_8d";

const translations = {
  en: {
    id: tourId,
    title: "The Journey of a Thousand Miles — 8 Days",
    short: "Guaranteed departures exploring Tashkent, Bukhara, and Samarkand over 8 days.",
    destination: "Tashkent, Bukhara, Samarkand",
    region: "Uzbekistan",
    images: [
      "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg",
      "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg",
      "/images/samarqand/samarkand.jpg"
    ],
    price: 0,
    priceNote: "Prices are valid for 2026 and are based on 4 people, with reduced prices for larger groups on request.",
    duration: "8 days / 7 nights",
    rating: null,
    category: "uzbekistan",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Home country – Tashkent", activity: "Arrival in Tashkent. Transfer to the hotel. Night in the hotel." },
      { day: 2, title: "Tashkent — Heart of Uzbekistan", activity: "Welcome to Uzbekistan! Visit Khast Imam Complex, Chorsu Bazaar, Kukaldosh Madrasah, and Amir Temur Square. Night in the hotel." },
      { day: 3, title: "Tashkent – Bukhara (morning flight)", activity: "Transfer to Tashkent airport and flight to Bukhara. Welcome by guide, transfer to hotel. Discover the old town: Ismail Samani Mausoleum, Chashmai Ayub, Bolo Hauz Mosque, and Ark Citadel." },
      { day: 4, title: "Bukhara", activity: "Explore Bukhara: Complex of Liab-i Khaouz, Ulugbek and Abdulaziz Khan Madrasas, Poyi Kalon Complex, Chor Minor, and Ancient Eastern Covered Bazaars with domes." },
      { day: 5, title: "Bukhara – Samarkand", activity: "Visit Bahaouddin Nakshbandi necropolis and Sitora-i-Mokhi Khossa. Drive to Samarkand. Dinner with Kouzacha Kebab." },
      { day: 6, title: "Samarkand", activity: "Explore Samarkand: Gur-Emir Mausoleum, Registan Square, Amir Temur Mosque and Bibikhanum Mausoleum, Siab Bazaar, Khazrati Khizr Mosque, and Shah-i-Zinda Necropolis." },
      { day: 7, title: "Samarkand - Tashkent (Train)", activity: "Visit the Complex of Imam Al-Bukhari. Evening transfer to Tashkent via 'Afrasiab' high-speed train." },
      { day: 8, title: "Tashkent – Home country", activity: "Breakfast at the hotel. Free time and departure from Tashkent. End of services." }
    ],
    highlights: ["Khast Imam Complex", "Chorsu Bazaar", "Ismail Samani Mausoleum", "Ark Citadel", "Registan Square", "Gur-Emir Mausoleum", "Shah-i-Zinda Necropolis"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "2-20 people",
    notes: "Included: Round trip/excursions, accommodation in double rooms, domestic flight (Tashkent-Bukhara), full board (8 breakfasts, 7 dinners), train ticket (Samarkand-Tashkent), English-speaking guide, entrance fees, dance performance in Bukhara, 3D show in Samarkand. Not included: International flights, travel/health insurance, lunches, camera fees, tips, personal expenses, alcohol.",
    extras: ["International flights", "Travel and health insurances", "Lunches", "Tips for guides, drivers", "Alcohol drinks"]
  },
  es: {
    id: tourId,
    title: "El Viaje de Mil Millas — 8 Días",
    short: "Salidas garantizadas para explorar Taskent, Bujará y Samarcanda durante 8 días.",
    destination: "Taskent, Bujará, Samarcanda",
    region: "Uzbekistán",
    images: ["/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/samarqand/samarkand.jpg"],
    price: 0,
    priceNote: "Los precios son válidos para 2026 y están basados en 4 personas, con precios reducidos para grupos más grandes bajo petición.",
    duration: "8 días / 7 noches",
    rating: null,
    category: "uzbekistan",
    availableDates: [],
    itinerary: [
      { day: 1, title: "País de origen – Taskent", activity: "Llegada a Taskent. Traslado al hotel. Noche en el hotel." },
      { day: 2, title: "Taskent — El corazón de Uzbekistán", activity: "¡Bienvenido a Uzbekistán! Visita al Complejo Khast Imam, el Bazar Chorsu, la Madraza Kukaldosh y la Plaza Amir Temur. Noche en el hotel." },
      { day: 3, title: "Taskent – Bujará (vuelo matutino)", activity: "Traslado al aeropuerto de Taskent y vuelo a Bujará. Bienvenida por el guía, traslado al hotel. Descubra el casco antiguo: Mausoleo de Ismail Samani, Chashmai Ayub, Mezquita Bolo Hauz y la Ciudadela Ark." },
      { day: 4, title: "Bujará", activity: "Explora Bujará: Complejo Liab-i Khaouz, Madrasas de Ulugbek y Abdulaziz Khan, Complejo Poyi Kalon, Chor Minor y los Antiguos Bazares Cubiertos del Este." },
      { day: 5, title: "Bujará – Samarcanda", activity: "Visita a la necrópolis de Bahaouddin Nakshbandi y Sitora-i-Mokhi Khossa. Viaje a Samarcanda. Cena con Kebab Kouzacha." },
      { day: 6, title: "Samarcanda", activity: "Explora Samarcanda: Mausoleo Gur-Emir, Plaza Registán, Mezquita Amir Temur y Mausoleo Bibikhanum, Bazar Siab, Mezquita Khazrati Khizr y Necrópolis Shah-i-Zinda." },
      { day: 7, title: "Samarcanda - Taskent (Tren)", activity: "Visita al Complejo del Imán Al-Bukhari. Traslado nocturno a Taskent en el tren de alta velocità 'Afrasiab'." },
      { day: 8, title: "Taskent – País de origen", activity: "Desayuno en el hotel. Tiempo libre y salida de Taskent. Fin de nuestros servicios." }
    ],
    highlights: ["Complejo Khast Imam", "Bazar Chorsu", "Mausoleo Ismail Samani", "Ciudadela Ark", "Plaza Registán", "Mausoleo Gur-Emir", "Necrópolis Shah-i-Zinda"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "2-20 personas",
    notes: "Incluye: Transporte/excursiones, alojamiento en habitación doble, vuelo nacional (Taskent-Bujará), pensión completa (8 desayunos, 7 cenas), billete de tren (Samarcanda-Taskent), guía, entradas, espectáculo de danza en Bujará, show 3D en Samarcanda. No incluye: Vuelos internacionales, seguros, almuerzos, propinas, gastos personales.",
    extras: ["Vuelos internacionales", "Seguro médico y de viaje", "Almuerzos", "Propinas", "Bebidas alcohólicas"]
  },
  uz: {
    id: tourId,
    title: "Ming ChaQirimlik Sayohat — 8 Kun",
    short: "Toshkent, Buxoro va Samarqand bo'ylab 8 kunlik kafolatlangan sayohatlar.",
    destination: "Toshkent, Buxoro, Samarqand",
    region: "O'zbekiston",
    images: ["/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/samarqand/samarkand.jpg"],
    price: 0,
    priceNote: "Narxlar 2026 yil uchun amal qiladi va 4 kishiga mo'ljallangan, katta guruhlar uchun chegirmalar mavjud.",
    duration: "8 kun / 7 tun",
    rating: null,
    category: "uzbekistan",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Kelish – Toshkent", activity: "Toshkentga yetib kelish. Mehmonxonaga transfer. Mehmonxonada tunash." },
      { day: 2, title: "Toshkent — O'zbekiston yuragi", activity: "O'zbekistonga xush kelibsiz! Xasti Imom majmuasi, Chorsu bozori, Ko'kaldosh madrasasi va Amir Temur maydoniga tashrif." },
      { day: 3, title: "Toshkent – Buxoro (ertalabki reys)", activity: "Toshkent aeroportiga transfer va Buxoroga parvoz. Gid kutib olishi, eski shahar: Ismoil Somoniy maqbarasi, Chashmai Ayub, Bolo Hovuz va Ark." },
      { day: 4, title: "Buxoro", activity: "Buxoroni kashf eting: Labi Hovuz majmuasi, Ulug'bek va Abdulazizxon madrasalari, Poyi Kalon, Chor Minor va qadimiy bozorlar." },
      { day: 5, title: "Buxoro – Samarqand", activity: "Bahouddin Naqshbandiy majmuasi va Sitorai Mohi Xosaga tashrif. Samarqandga yo'l. Ko'zacha kabob bilan kechki ovqat." },
      { day: 6, title: "Samarqand", activity: "Go'ri Amir maqbarasi, Registon maydoni, Bibixonim masjidi, Siyob bozori, Hazrati Xizr va Shohi Zinda majmualarini tomosha qilish." },
      { day: 7, title: "Samarqand - Toshkent (Poyezd)", activity: "Imom Al-Buxoriy majmuasiga tashrif. Kechqurun 'Afrosiyob' poyezdida Toshkentga qaytish." },
      { day: 8, title: "Toshkent – Uyga qaytish", activity: "Mehmonxonada nonushta. Bo'sh vaqt va Toshkentdan uchib ketish. Xizmatlar yakuni." }
    ],
    highlights: ["Xasti Imom", "Chorsu", "Ismoil Somoniy", "Ark", "Registon", "Go'ri Amir", "Shohi Zinda"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "2-20 kishi",
    notes: "Kiritilgan: Transfer/ekskursiyalar, mehmonxona, mahalliy reys (Toshkent-Buxoro), 3 mahal ovqat (8 nonushta, 7 kechki ovqat), poyezd (Samarqand-Toshkent), gid, kirish chiptalari. Kiritilmagan: Xalqaro reyslar, sug'urta, tushlik, shaxsiy xarajatlar.",
    extras: ["Xalqaro reyslar", "Sug'urta", "Tushlik", "Choychaqa", "Alkogol"]
  },
  ru: {
    id: tourId,
    title: "Путешествие в Тысячу Миль — 8 Дней",
    short: "Гарантированные туры по Ташкенту, Бухаре и Самарканду на 8 дней.",
    destination: "Ташкент, Бухара, Самарканд",
    region: "Узбекистан",
    images: ["/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/samarqand/samarkand.jpg"],
    price: 0,
    priceNote: "Цены действительны на 2026 год и рассчитаны на 4 человек, скидки для больших групп по запросу.",
    duration: "8 дней / 7 ночей",
    rating: null,
    category: "uzbekistan",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Домашняя страна – Ташкент", activity: "Прибытие в Ташкент. Трансфер в отель. Ночь в отеле." },
      { day: 2, title: "Ташкент — Сердце Узбекистана", activity: "Добро пожаловать в Узбекистан! Посещение комплекса Хаст-Имам, базара Чорсу, медресе Кукельдаш и сквера Амира Темура." },
      { day: 3, title: "Ташкент – Бухара (утренний рейс)", activity: "Перелет в Бухару. Встреча с гидом. Экскурсия по старому городу: мавзолей Исмаила Самани, Чашма-Аюб, мечеть Боло-Хауз и крепость Арк." },
      { day: 4, title: "Бухара", activity: "Комплекс Ляби-Хауз, медресе Улугбека и Абдулазиз-хана, комплекс Пои-Калян, Чор-Минор и старинные торговые купола." },
      { day: 5, title: "Бухара – Самарканд", activity: "Посещение некрополя Бахауддина Накшбанди и Ситораи-Мохи-Хоса. Переезд в Самарканд. Ужин." },
      { day: 6, title: "Самарканд", activity: "Мавзолей Гур-Эмир, площадь Регистан, мечеть Биби-Ханум, Сиабский базар, мечеть Хазрат-Хизр и некрополь Шахи-Зинда." },
      { day: 7, title: "Самарканд - Ташкент (Поезд)", activity: "Посещение комплекса Имама Аль-Бухари. Вечерний трансфер в Ташкент на поезде 'Афросиаб'." },
      { day: 8, title: "Ташкент – Домашняя страна", activity: "Завтрак. Свободное время и вылет из Ташкента. Конец услуг." }
    ],
    highlights: ["Хаст-Имам", "Чорсу", "Исмаил Самани", "Арк", "Регистан", "Гур-Эмир", "Шахи-Зинда"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "2-20 человек",
    notes: "Включено: Экскурсии, проживание, внутренний рейс, полупансион, билет на поезд, гид, входные билеты. Не включено: Международные рейсы, страховка, обеды, чаевые, личные расходы.",
    extras: ["Международные авиабилеты", "Страховка", "Обеды", "Чаевые", "Алкогольные напитки"]
  },
  zh: {
    id: tourId,
    title: "千里之行 — 8 天",
    short: "保证出发的8天乌兹别克斯坦塔什干、布哈拉、撒马尔罕之旅。",
    destination: "塔什干, 布哈拉, 撒马尔罕",
    region: "乌兹别克斯坦",
    images: ["/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/samarqand/samarkand.jpg"],
    price: 0,
    priceNote: "价格适用于2026年，按4人计算，大型团队可申请优惠。",
    duration: "8天 / 7晚",
    rating: null,
    category: "uzbekistan",
    availableDates: [],
    itinerary: [
      { day: 1, title: "出发地 – 塔什干", activity: "抵达塔什干，接机入住酒店。在酒店休息。" },
      { day: 2, title: "塔什干 — 乌兹别克斯坦的心脏", activity: "欢迎来到乌兹别克斯坦！参观哈斯特·伊玛目建筑群，琼苏巴扎，库克尔达什神学院和帖木儿广场。" },
      { day: 3, title: "塔什干 – 布哈拉 (早班机)", activity: "乘飞机前往布哈拉。导游接机，探索老城区：萨曼王朝陵墓，恰什马·阿尤布，波罗·哈乌兹清真寺和雅克城堡。" },
      { day: 4, title: "布哈拉", activity: "游览布哈拉：利亚比·哈乌兹，乌鲁伯格和阿卜杜拉齐兹汗神学院，波伊·卡杨建筑群，乔尔·米诺及古代东方圆顶集市。" },
      { day: 5, title: "布哈拉 – 撒马尔罕", activity: "参观巴哈乌丁·纳克什班迪陵墓和夏宫。驱车前往撒马尔罕。享用Kouzacha Kebab晚餐。" },
      { day: 6, title: "撒马尔罕", activity: "游览撒马尔罕：古尔·埃米尔陵墓，雷吉斯坦广场，比比哈努姆清真寺，西亚布巴扎及沙赫静达陵墓群。" },
      { day: 7, title: "撒马尔罕 - 塔什干 (高铁)", activity: "参观伊玛目布哈里建筑群。傍晚乘坐Afrasiab高铁返回塔什干。" },
      { day: 8, title: "塔什干 – 出发地", activity: "酒店早餐，自由活动，送机。服务结束。" }
    ],
    highlights: ["哈斯特·伊玛目", "琼苏巴扎", "萨曼王朝陵墓", "雅克城堡", "雷吉斯坦广场", "古尔·埃米尔陵墓", "沙赫静达陵墓群"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "2-20 人",
    notes: "包含：行程交通，双人间住宿，内陆航班，早晚餐，高铁票，英文导游及门票。不含：国际航班，保险，午餐，小费及个人开销。",
    extras: ["国际航班", "旅游及医疗保险", "午餐", "导游及司机小费", "酒精饮料"]
  },
  it: {
    id: tourId,
    title: "Il Viaggio di Mille Miglia — 8 Giorni",
    short: "Partenze garantite per esplorare Tashkent, Bukhara e Samarcanda in 8 giorni.",
    destination: "Tashkent, Bukhara, Samarcanda",
    region: "Uzbekistan",
    images: ["/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/samarqand/samarkand.jpg"],
    price: 0,
    priceNote: "I prezzi sono validi per il 2026 e basati su 4 persone, con riduzioni per gruppi più grandi su richiesta.",
    duration: "8 giorni / 7 notti",
    rating: null,
    category: "uzbekistan",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Paese d'origine – Tashkent", activity: "Arrivo a Tashkent. Trasferimento in hotel. Notte in hotel." },
      { day: 2, title: "Tashkent — Cuore dell'Uzbekistan", activity: "Benvenuti in Uzbekistan! Visita del Complesso Khast Imam, Bazar Chorsu, Madrasa Kukaldosh e Piazza Amir Temur." },
      { day: 3, title: "Tashkent – Bukhara (volo mattutino)", activity: "Trasferimento all'aeroporto di Tashkent e volo per Bukhara. Visita del centro storico: Mausoleo di Ismail Samani, Chashmai Ayub, Moschea Bolo Hauz e Cittadella di Ark." },
      { day: 4, title: "Bukhara", activity: "Esplorazione di Bukhara: Complesso Liab-i Khaouz, Madrase di Ulugbek e Abdulaziz Khan, Complesso Poyi Kalon, Chor Minor e gli antichi bazar coperti." },
      { day: 5, title: "Bukhara – Samarcanda", activity: "Visita della necropoli di Bahaouddin Nakshbandi e Sitora-i-Mokhi Khossa. Viaggio per Samarcanda. Cena con Kebab Kouzacha." },
      { day: 6, title: "Samarcanda", activity: "Esplorazione di Samarcanda: Mausoleo Gur-Emir, Piazza Registan, Moschea di Amir Temur e Mausoleo di Bibikhanum, Bazar Siab, Necropoli di Shah-i-Zinda." },
      { day: 7, title: "Samarcanda - Tashkent (Treno)", activity: "Visita del Complesso dell'Imam Al-Bukhari. Ritorno a Tashkent in serata con il treno ad alta velocità 'Afrasiab'." },
      { day: 8, title: "Tashkent – Paese d'origine", activity: "Colazione in hotel. Tempo libero e partenza da Tashkent. Fine dei servizi." }
    ],
    highlights: ["Complesso Khast Imam", "Bazar Chorsu", "Mausoleo Ismail Samani", "Cittadella di Ark", "Piazza Registan", "Mausoleo Gur-Emir", "Necropoli di Shah-i-Zinda"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "2-20 persone",
    notes: "Incluso: Trasferimenti/escursioni, sistemazione in camera doppia, volo interno, mezza pensione, biglietto del treno, guida parlante inglese, ingressi. Escluso: Voli internazionali, assicurazione, pranzi, mance.",
    extras: ["Voli internazionali", "Assicurazione di viaggio e sanitaria", "Pranzi", "Mance per guide e autisti", "Bevande alcoliche"]
  },
  fr: {
    id: tourId,
    title: "Le Voyage de Mille Lieues — 8 Jours",
    short: "Départs garantis pour explorer Tachkent, Boukhara et Samarcande sur 8 jours.",
    destination: "Tachkent, Boukhara, Samarcande",
    region: "Ouzbékistan",
    images: ["/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/samarqand/samarkand.jpg"],
    price: 0,
    priceNote: "Les prix sont valables pour 2026 sur la base de 4 personnes, réductions pour les grands groupes sur demande.",
    duration: "8 jours / 7 nuits",
    rating: null,
    category: "uzbekistan",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Pays d'origine – Tachkent", activity: "Arrivée à Tachkent. Transfert à l'hôtel. Nuit à l'hôtel." },
      { day: 2, title: "Tachkent — Cœur de l'Ouzbékistan", activity: "Bienvenue en Ouzbékistan ! Visite du complexe Khast Imam, du bazar Chorsu, de la médersa Kukaldosh et de la place Amir Temur." },
      { day: 3, title: "Tachkent – Boukhara (vol matinal)", activity: "Transfert à l'aéroport de Tachkent et vol pour Boukhara. Découverte de la vieille ville : Mausolée d'Ismail Samani, Chashmai Ayub, Mosquée Bolo Hauz et Citadelle Ark." },
      { day: 4, title: "Boukhara", activity: "Exploration de Boukhara : Complexe Liab-i Khaouz, Médersas Ulugbek et Abdulaziz Khan, Complexe Poyi Kalon, Chor Minor et anciens bazars couverts." },
      { day: 5, title: "Boukhara – Samarcande", activity: "Visite de la nécropole de Bahaouddin Nakshbandi et du Sitora-i-Mokhi Khossa. Route vers Samarcande. Dîner avec Kebab Kouzacha." },
      { day: 6, title: "Samarcande", activity: "Exploration de Samarcande : Mausolée Gour-Émir, Place du Régistan, Mosquée Bibi-Khanym, Bazar Siab, Nécropole de Shah-i-Zinda." },
      { day: 7, title: "Samarcande - Tachkent (Train)", activity: "Visite du complexe de l'Imam Al-Bukhari. Retour à Tachkent en soirée via le train à grande vitesse 'Afrasiab'." },
      { day: 8, title: "Tachkent – Pays d'origine", activity: "Petit-déjeuner à l'hôtel. Temps libre et départ de Tachkent. Fin des services." }
    ],
    highlights: ["Complexe Khast Imam", "Bazar Chorsu", "Mausolée Ismail Samani", "Citadelle Ark", "Place du Régistan", "Mausolée Gour-Émir", "Nécropole de Shah-i-Zinda"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "2-20 personnes",
    notes: "Inclus: Transferts/excursions, hébergement en chambre double, vol intérieur, demi-pension, billet de train, guide francophone/anglophone, frais d'entrée. Non inclus: Vols internationaux, assurance, déjeuners, pourboires.",
    extras: ["Vols internationaux", "Assurances voyage et santé", "Déjeuners", "Pourboires pour les guides et chauffeurs", "Boissons alcoolisées"]
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
console.log("Successfully updated tours.json with the new tour in 7 languages.");
