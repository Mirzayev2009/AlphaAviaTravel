const fs = require('fs');
const path = require('path');

const tourId = "t_kazakhstan_kyrgyzstan_15d";

const translations = {
  en: {
    id: tourId,
    title: "Kazakhstan & Kyrgyzstan Adventure Expedition — 15 Days",
    short: "Breathtaking landscapes, alpine lakes, canyons, nomadic culture, and authentic yurt stays in Kazakhstan and Kyrgyzstan.",
    destination: "Almaty, Charyn Canyon, Saty, Kolsai, Karakol, Bokonbaevo, Issyk-Kul, Son Kul, Bishkek",
    region: "Kazakhstan & Kyrgyzstan",
    images: [
      "/images/samarqand/samarkand.jpg",
      "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg",
      "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"
    ],
    price: 5299,
    priceNote: "Price: €5,299 per person based on double occupancy. Single supplement available upon request.",
    duration: "15 days / 14 nights",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Arrival in Almaty", activity: "Welcome to Kazakhstan! Transfer to your hotel. Evening walk in Almaty city center." },
      { day: 2, title: "Almaty City Tour & Mountain Adventure", activity: "Visit Green Bazaar, Zenkov Cathedral, Panfilov Park, Medeu Ice Skating Rink, and cable car to Shymbulak Mountain Resort." },
      { day: 3, title: "Free Day in Almaty", activity: "Relaxed and flexible day. Optional activities: Arbat Street, Central State Museum, shopping, café hopping." },
      { day: 4, title: "Charyn Canyon & Saty Village", activity: "Scenic drive through the Kazakh steppe. Visit Charyn Canyon (Valley of Castles). Arrive in Saty village." },
      { day: 5, title: "Kaindy Lake & Kolsai Lakes", activity: "Explore Kaindy Lake and its submerged forest. Off-road mountain drive and hiking in Kolsai Lakes National Park." },
      { day: 6, title: "Relaxed Nature Day in Saty", activity: "Leisure time in nature. Optional hiking or horse riding. Enjoy the peaceful atmosphere of Kazakhstan's mountain region." },
      { day: 7, title: "Border Crossing to Kyrgyzstan & Karakol", activity: "Cross into Kyrgyzstan. Scenic drive along Issyk-Kul Lake. Arrival in Karakol. Visit Dungan Mosque and Russian Orthodox Church." },
      { day: 8, title: "Jeti-Ögüz Canyon & Karakol Region", activity: "Visit Jeti-Ögüz Canyon ('Seven Bulls') and Broken Heart Rock. Optional hot spring experience." },
      { day: 9, title: "Bokonbaevo & Eagle Hunter Experience", activity: "Scenic drive along southern Issyk-Kul. Traditional Eagle Hunter Demonstration. Meet nomadic families and learn about traditional Kyrgyz life." },
      { day: 10, title: "Fairy Tale Canyon & Issyk-Kul Region", activity: "Explore Skazka Canyon (Fairy Tale Canyon) with incredible red rock formations. Relax by Issyk-Kul Lake." },
      { day: 11, title: "Journey to Son Kul Lake", activity: "Travel deep into the mountains to Son Kul Lake (3,000m altitude). Tea with local nomadic families and stunning sunset views." },
      { day: 12, title: "Nomadic Life at Son Kul", activity: "Experience authentic Kyrgyz nomadic lifestyle. Hiking, horse riding, meeting shepherd families, and stargazing." },
      { day: 13, title: "Ala Archa National Park & Bishkek", activity: "Visit Ala Archa National Park for riverside walks and spectacular mountain scenery. Arrival in Bishkek for a relaxed evening." },
      { day: 14, title: "Bishkek City Experience", activity: "Discover Bishkek: Osh Bazaar, Ala-Too Square, Soviet monuments, Victory Square, and local parks." },
      { day: 15, title: "Departure", activity: "Airport transfer and departure." }
    ],
    highlights: ["Almaty & Shymbulak Mountain Resort", "Charyn Canyon", "Kaindy & Kolsai Lakes", "Traditional Eagle Hunter Experience", "Issyk-Kul Lake Region", "Jeti-Ögüz Canyon", "Authentic Yurt Experiences", "Nomadic Life at Son Kul Lake", "Ala Archa National Park", "Bishkek City Experience"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Flexible",
    notes: "Included: Private English-speaking driver, 14 nights accommodation, daily breakfast, private transportation, airport transfers, fuel/tolls, border crossing assistance. Not Included: International flights, entrance fees & national park fees, optional activities, horse riding, lunches & dinners, personal expenses, travel insurance, visa fees.",
    extras: ["International flights", "Entrance fees & national park fees", "Optional activities & attractions", "Horse riding activities", "Lunches & dinners", "Travel insurance", "Visa fees"]
  },
  es: {
    id: tourId,
    title: "Aventura y Expedición en Kazajistán y Kirguistán — 15 Días",
    short: "Paisajes impresionantes, lagos alpinos, cañones, cultura nómada y estancias en yurtas.",
    destination: "Almaty, Cañón de Charyn, Saty, Kolsai, Karakol, Bokonbaevo, Issyk-Kul, Son Kul, Biskek",
    region: "Kazajistán y Kirguistán",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 5299,
    priceNote: "Precio: €5,299 por persona en base a ocupación doble.",
    duration: "15 días / 14 noches",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Llegada a Almaty", activity: "¡Bienvenido a Kazajistán! Traslado al hotel y paseo nocturno." },
      { day: 2, title: "Tour de Almaty y Aventura en la Montaña", activity: "Green Bazaar, Catedral Zenkov, Parque Panfilov, Pista de hielo Medeu, y teleférico a Shymbulak." },
      { day: 3, title: "Día Libre en Almaty", activity: "Día relajado y flexible. Actividades opcionales." },
      { day: 4, title: "Cañón de Charyn y Pueblo Saty", activity: "Conducción por la estepa. Cañón de Charyn. Llegada a Saty." },
      { day: 5, title: "Lago Kaindy y Lagos Kolsai", activity: "Lago Kaindy y su bosque sumergido. Senderismo en Kolsai." },
      { day: 6, title: "Día de Naturaleza en Saty", activity: "Tiempo libre en la naturaleza. Senderismo o equitación opcional." },
      { day: 7, title: "Cruce de frontera a Kirguistán y Karakol", activity: "Cruce a Kirguistán. Lago Issyk-Kul. Llegada a Karakol." },
      { day: 8, title: "Cañón Jeti-Ögüz y Región de Karakol", activity: "Cañón Jeti-Ögüz y Roca del Corazón Roto. Aguas termales opcionales." },
      { day: 9, title: "Bokonbaevo y Experiencia con Águilas", activity: "Demostración de cazadores con águilas. Cultura nómada." },
      { day: 10, title: "Cañón de Cuento de Hadas e Issyk-Kul", activity: "Cañón Skazka (Cuento de Hadas). Relax en Issyk-Kul." },
      { day: 11, title: "Viaje al Lago Son Kul", activity: "Viaje a Son Kul (3,000m). Té con familias nómadas." },
      { day: 12, title: "Vida Nómada en Son Kul", activity: "Estilo de vida nómada, equitación, y observación de estrellas." },
      { day: 13, title: "Parque Nacional Ala Archa y Biskek", activity: "Parque Nacional Ala Archa y llegada a Biskek." },
      { day: 14, title: "Experiencia en Biskek", activity: "Osh Bazaar, Plaza Ala-Too, monumentos soviéticos." },
      { day: 15, title: "Salida", activity: "Traslado al aeropuerto y salida." }
    ],
    highlights: ["Almaty", "Cañón de Charyn", "Lagos Kaindy y Kolsai", "Cazadores con águilas", "Lago Issyk-Kul", "Cañón Jeti-Ögüz", "Estancias en Yurtas", "Lago Son Kul", "Ala Archa", "Biskek"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Flexible",
    notes: "Incluye: Conductor privado, 14 noches de alojamiento, desayunos, traslados. No incluye: Vuelos internacionales, entradas a parques, actividades opcionales, almuerzos y cenas.",
    extras: ["Vuelos internacionales", "Entradas a parques", "Almuerzos y cenas", "Visas"]
  },
  uz: {
    id: tourId,
    title: "Qozog'iston va Qirg'iziston Sarguzashtlari — 15 Kun",
    short: "Qozog'iston va Qirg'izistonda ajoyib manzara, tog' ko'llari, kanyonlar va o'tovlarda yashash tajribasi.",
    destination: "Olmaota, Charin Kanyoni, Sati, Kolsay, Qorako'l, Bokonbaevo, Issiqko'l, Sonko'l, Bishkek",
    region: "Qozog'iston va Qirg'iziston",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 5299,
    priceNote: "Narx: 1 kishi uchun €5,299 (ikki kishilik joylashuvda).",
    duration: "15 kun / 14 tun",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Olmaotaga kelish", activity: "Qozog'istonga xush kelibsiz! Mehmonxonaga transfer va shahar markazida sayr." },
      { day: 2, title: "Olmaota va tog' sarguzashtlari", activity: "Yashil bozor, Zenkov sobori, Panfilov bog'i, Medeu muz saroyi, Shimbuloqqa dor yo'li." },
      { day: 3, title: "Olmaotada bo'sh kun", activity: "Bo'sh vaqt, xaridlar va sayr." },
      { day: 4, title: "Charin Kanyoni va Sati qishlog'i", activity: "Charin kanyoni bo'ylab sayohat va Satiga kelish." },
      { day: 5, title: "Qayindi va Kolsay ko'llari", activity: "Qayindi ko'li va uning suv osti o'rmoni. Kolsay ko'llarida piyoda sayr." },
      { day: 6, title: "Satida dam olish", activity: "Tabiat qo'ynida dam olish, ot minib sayr qilish (ixtiyoriy)." },
      { day: 7, title: "Qirg'iziston chegarasi va Qorako'l", activity: "Qirg'iziston chegarasidan o'tish. Issiqko'l manzaralari va Qorako'lga kelish." },
      { day: 8, title: "Jeti-O'g'uz kanyoni", activity: "Jeti-O'g'uz ('Yetti ho'kiz') va Yoriq yurak qoyasi." },
      { day: 9, title: "Bokonbaevo va burgut ovi", activity: "Burgut bilan ov qilish shousi, ko'chmanchilar madaniyati bilan tanishish." },
      { day: 10, title: "Ertak kanyoni", activity: "Skazka kanyoni va Issiqko'l bo'yida dam olish." },
      { day: 11, title: "Sonko'lga sayohat", activity: "3000 metr balandlikdagi Sonko'lga yo'l. O'tovda qolish." },
      { day: 12, title: "Sonko'lda ko'chmanchi hayot", activity: "Ot minish, piyoda sayr va yulduzlarni tomosha qilish." },
      { day: 13, title: "Ala-Archa milliy bog'i va Bishkek", activity: "Ala-Archa milliy bog'i manzaralari va Bishkekka qaytish." },
      { day: 14, title: "Bishkek bo'ylab sayohat", activity: "O'sh bozori, Ala-Too maydoni va shahar sayri." },
      { day: 15, title: "Jo'nab ketish", activity: "Aeroportga transfer." }
    ],
    highlights: ["Olmaota", "Charin", "Qayindi va Kolsay", "Burgut ovi", "Issiqko'l", "Jeti-O'g'uz", "Sonko'l", "Ala-Archa", "Bishkek"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Moslashuvchan",
    notes: "Kiritilgan: Haydovchi, mehmonxona va o'tovlar, nonushta, transferlar. Kiritilmagan: Xalqaro reyslar, bog'larga kirish, tushlik va kechki ovqatlar, sug'urta, viza.",
    extras: ["Xalqaro reyslar", "Kirish chiptalari", "Tushlik va kechki ovqatlar", "Sug'urta", "Viza"]
  },
  ru: {
    id: tourId,
    title: "Приключение в Казахстане и Кыргызстане — 15 Дней",
    short: "Захватывающие пейзажи, альпийские озера, каньоны и культура кочевников.",
    destination: "Алматы, Чарынский каньон, Саты, Кольсай, Каракол, Боконбаево, Иссык-Куль, Сон-Куль, Бишкек",
    region: "Казахстан и Кыргызстан",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 5299,
    priceNote: "Цена: €5,299 на человека при двухместном размещении.",
    duration: "15 дней / 14 ночей",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Прибытие в Алматы", activity: "Добро пожаловать в Казахстан! Трансфер и вечерняя прогулка." },
      { day: 2, title: "Алматы и горы", activity: "Зеленый базар, Зенковский собор, Медео, Чимбулак." },
      { day: 3, title: "Свободный день в Алматы", activity: "Свободное время, шопинг, музеи." },
      { day: 4, title: "Чарынский каньон и Саты", activity: "Долина замков в Чарынском каньоне. Прибытие в Саты." },
      { day: 5, title: "Озера Каинды и Кольсай", activity: "Озеро Каинды с затопленным лесом и прогулка на Кольсай." },
      { day: 6, title: "Отдых в Саты", activity: "Свободное время на природе." },
      { day: 7, title: "Граница с Кыргызстаном и Каракол", activity: "Переход границы, озеро Иссык-Куль, прибытие в Каракол." },
      { day: 8, title: "Каньон Джеты-Огуз", activity: "Семь быков и Разбитое сердце. Опционально горячие источники." },
      { day: 9, title: "Боконбаево и охота с орлами", activity: "Демонстрация охоты с орлами, знакомство с кочевниками." },
      { day: 10, title: "Каньон Сказка", activity: "Каньон Сказка и отдых на Иссык-Куле." },
      { day: 11, title: "Озеро Сон-Куль", activity: "Дорога к Сон-Кулю (3000м). Ночь в юрте." },
      { day: 12, title: "Жизнь кочевников на Сон-Куле", activity: "Верховая езда, прогулки и звезды." },
      { day: 13, title: "Ала-Арча и Бишкек", activity: "Парк Ала-Арча и приезд в Бишкек." },
      { day: 14, title: "Бишкек", activity: "Ошский базар, площадь Ала-Тоо." },
      { day: 15, title: "Вылет", activity: "Трансфер в аэропорт." }
    ],
    highlights: ["Алматы", "Чарын", "Каинды", "Иссык-Куль", "Джеты-Огуз", "Сон-Куль", "Ала-Арча", "Бишкек"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Гибко",
    notes: "Включено: водитель, отели и юрты, завтраки. Не включено: авиабилеты, входные билеты в парки, обеды и ужины, визы.",
    extras: ["Авиабилеты", "Входные билеты", "Обеды и ужины", "Страховка"]
  },
  zh: {
    id: tourId,
    title: "哈萨克斯坦与吉尔吉斯斯坦探险 — 15 天",
    short: "高山湖泊，峡谷，游牧文化，以及真实的毡房体验。",
    destination: "阿拉木图, 恰伦大峡谷, 萨特, 科尔塞, 卡拉科尔, 博孔巴耶沃, 伊塞克湖, 颂湖, 比什凯克",
    region: "哈萨克斯坦与吉尔吉斯斯坦",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 5299,
    priceNote: "价格：每人 €5,299（双人入住）。",
    duration: "15天 / 14晚",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "抵达阿拉木图", activity: "欢迎来到哈萨克斯坦！入住酒店并在市中心漫步。" },
      { day: 2, title: "阿拉木图城市及高山游", activity: "绿色巴扎，潘菲洛夫公园，麦迪奥溜冰场，琼布拉克高山滑雪场。" },
      { day: 3, title: "阿拉木图自由活动", activity: "轻松自由的一天。可选择逛街，参观博物馆。" },
      { day: 4, title: "恰伦大峡谷与萨特村", activity: "恰伦大峡谷，城堡谷，随后抵达萨特村。" },
      { day: 5, title: "卡因迪湖与科尔塞湖", activity: "沉没森林卡因迪湖及科尔塞湖徒步。" },
      { day: 6, title: "萨特村自然休息日", activity: "在大自然中放松，可选骑马或徒步。" },
      { day: 7, title: "过境吉尔吉斯斯坦与卡拉科尔", activity: "过境，欣赏伊塞克湖，抵达卡拉科尔。" },
      { day: 8, title: "杰季奥古兹峡谷", activity: "七牛岩和心碎石。可选温泉体验。" },
      { day: 9, title: "博孔巴耶沃及猎鹰体验", activity: "传统猎鹰表演，了解游牧家庭。" },
      { day: 10, title: "童话峡谷与伊塞克湖", activity: "探索童话峡谷，在伊塞克湖边放松。" },
      { day: 11, title: "前往颂湖", activity: "前往海拔3000米的颂湖，体验游牧民营地。" },
      { day: 12, title: "颂湖游牧生活", activity: "骑马，徒步，星空观赏。" },
      { day: 13, title: "阿拉阿查国家公园与比什凯克", activity: "游览阿拉阿查国家公园，抵达首都比什凯克。" },
      { day: 14, title: "比什凯克城市体验", activity: "奥什巴扎，阿拉套广场，苏联纪念碑。" },
      { day: 15, title: "离境", activity: "前往机场，行程结束。" }
    ],
    highlights: ["阿拉木图", "恰伦大峡谷", "卡因迪湖", "猎鹰体验", "伊塞克湖", "颂湖", "比什凯克"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "灵活",
    notes: "包含: 司机, 14晚住宿, 早餐。不含: 国际航班, 国家公园门票, 午餐晚餐, 签证及个人花费。",
    extras: ["国际航班", "门票", "午晚餐", "签证"]
  },
  it: {
    id: tourId,
    title: "Avventura in Kazakistan e Kirghizistan — 15 Giorni",
    short: "Paesaggi mozzafiato, laghi alpini, canyon e cultura nomade in yurta.",
    destination: "Almaty, Canyon di Charyn, Saty, Kolsai, Karakol, Bokonbaevo, Issyk-Kul, Son Kul, Bishkek",
    region: "Kazakistan e Kirghizistan",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 5299,
    priceNote: "Prezzo: €5.299 a persona su base doppia.",
    duration: "15 giorni / 14 notti",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Arrivo ad Almaty", activity: "Benvenuti in Kazakistan! Trasferimento in hotel." },
      { day: 2, title: "Almaty e Montagne", activity: "Green Bazaar, Medeu e funivia per Shymbulak." },
      { day: 3, title: "Giorno libero ad Almaty", activity: "Tempo libero per shopping o musei." },
      { day: 4, title: "Canyon di Charyn e Saty", activity: "Visita al Canyon di Charyn (Valle dei Castelli). Arrivo a Saty." },
      { day: 5, title: "Laghi Kaindy e Kolsai", activity: "Il bosco sommerso di Kaindy e trekking a Kolsai." },
      { day: 6, title: "Natura a Saty", activity: "Relax nella natura, trekking o equitazione opzionale." },
      { day: 7, title: "Confine col Kirghizistan e Karakol", activity: "Attraversamento del confine, lago Issyk-Kul." },
      { day: 8, title: "Canyon Jeti-Ögüz", activity: "Canyon dei Sette Tori. Sorgenti termali opzionali." },
      { day: 9, title: "Bokonbaevo e caccia con le aquile", activity: "Dimostrazione di caccia con aquile e cultura nomade." },
      { day: 10, title: "Canyon Skazka e Issyk-Kul", activity: "Canyon delle Fiabe e relax sul lago Issyk-Kul." },
      { day: 11, title: "Viaggio verso Son Kul", activity: "Arrivo a Son Kul (3.000m) e notte in yurta." },
      { day: 12, title: "Vita nomade a Son Kul", activity: "Equitazione, trekking e osservazione delle stelle." },
      { day: 13, title: "Ala Archa e Bishkek", activity: "Parco Nazionale Ala Archa. Arrivo a Bishkek." },
      { day: 14, title: "Esperienza a Bishkek", activity: "Osh Bazaar, Piazza Ala-Too." },
      { day: 15, title: "Partenza", activity: "Trasferimento in aeroporto." }
    ],
    highlights: ["Almaty", "Canyon di Charyn", "Laghi Kaindy", "Cacciatori con le aquile", "Issyk-Kul", "Son Kul", "Bishkek"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Flessibile",
    notes: "Incluso: autista, hotel e yurte, colazioni. Escluso: voli, ingressi ai parchi, pranzi/cene, visti.",
    extras: ["Voli", "Ingressi", "Pranzi e cene", "Assicurazione"]
  },
  fr: {
    id: tourId,
    title: "Aventure au Kazakhstan et Kirghizistan — 15 Jours",
    short: "Paysages à couper le souffle, lacs alpins, canyons et culture nomade en yourte.",
    destination: "Almaty, Canyon de Charyn, Saty, Kolsai, Karakol, Bokonbaevo, Issyk-Koul, Son Koul, Bichkek",
    region: "Kazakhstan et Kirghizistan",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 5299,
    priceNote: "Prix: 5 299 € par personne (base double).",
    duration: "15 jours / 14 nuits",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Arrivée à Almaty", activity: "Bienvenue au Kazakhstan ! Transfert à l'hôtel." },
      { day: 2, title: "Almaty et Montagnes", activity: "Green Bazaar, Medeu, et téléphérique vers Shymbulak." },
      { day: 3, title: "Journée libre à Almaty", activity: "Temps libre pour shopping, musées ou cafés." },
      { day: 4, title: "Canyon de Charyn et Saty", activity: "Visite du Canyon de Charyn. Arrivée à Saty." },
      { day: 5, title: "Lacs Kaindy et Kolsai", activity: "Lac Kaindy et sa forêt immergée, randonnée à Kolsai." },
      { day: 6, title: "Détente à Saty", activity: "Journée nature, randonnée ou équitation optionnelle." },
      { day: 7, title: "Frontière Kirghize et Karakol", activity: "Passage de la frontière, route le long du lac Issyk-Koul." },
      { day: 8, title: "Canyon de Jeti-Ögüz", activity: "Les Sept Taureaux et le Cœur Brisé." },
      { day: 9, title: "Bokonbaevo et Chasseurs à l'aigle", activity: "Démonstration de chasse à l'aigle, rencontre avec des nomades." },
      { day: 10, title: "Canyon Skazka", activity: "Canyon des Contes de Fées et détente au bord du lac Issyk-Koul." },
      { day: 11, title: "Lac Son Koul", activity: "Route vers Son Koul (3 000 m). Nuit en yourte." },
      { day: 12, title: "Vie nomade à Son Koul", activity: "Équitation, randonnée, et observation des étoiles." },
      { day: 13, title: "Parc National d'Ala Archa et Bichkek", activity: "Promenade à Ala Archa et arrivée à Bichkek." },
      { day: 14, title: "Bichkek", activity: "Bazar d'Och, Place Ala-Too, monuments soviétiques." },
      { day: 15, title: "Départ", activity: "Transfert à l'aéroport." }
    ],
    highlights: ["Almaty", "Canyon de Charyn", "Lacs Kaindy", "Chasse à l'aigle", "Issyk-Koul", "Son Koul", "Bichkek"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "Flexible",
    notes: "Inclus: chauffeur, hôtels et yourtes, petits-déjeuners. Non inclus: vols, frais d'entrée, déjeuners/dîners, visas.",
    extras: ["Vols internationaux", "Frais d'entrée", "Repas", "Assurance", "Visa"]
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
console.log("Successfully updated tours.json with the 15-day Kazakhstan & Kyrgyzstan tour in 7 languages.");
