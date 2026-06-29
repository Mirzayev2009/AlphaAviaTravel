const fs = require('fs');
const path = require('path');

const tourId = "t_turkmenistan_4d";

const translations = {
  en: {
    id: tourId,
    title: "Ancient Capitals & Desert Infernos — 4 Days",
    short: "Discover Turkmenistan's Ancient Merv, the marble city of Ashgabat, the flaming Darvaza Crater, and Kunya-Urgench.",
    destination: "Turkmenabad, Mary, Ashgabat, Darvaza, Dashoguz",
    region: "Turkmenistan",
    images: [
      "/images/samarqand/samarkand.jpg",
      "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg",
      "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"
    ],
    price: 1075,
    priceNote: "Prices start from $1075 per person (1 pax, 3*), down to $430 per person (8 pax). Single supplement: $270.",
    duration: "4 days / 3 nights",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Turkmenabad - Mary", activity: "Meet at the Farap border. Drive to Mary to explore the Cultural and Historical park 'Ancient Merv' (UNESCO site), including Kyz Galas, Complex of Askhabs, Erk Gala, Gyaur Gala, and Sultan Sanjar mausoleum. Overnight in Mary." },
      { day: 2, title: "Mary – Ashgabat", activity: "Morning drive to Ashgabat. Visit the National Museum of Turkmenistan. Afternoon Ashgabat city tour to see the marble architecture: Ertogrul Gazy Mosque, Independence Park, Arch of Neutrality, and Constitution Monument. Overnight in Ashgabat." },
      { day: 3, title: "Ashgabat – Darvaza", activity: "Free morning in Ashgabat. Afternoon drive to the Karakum desert. Visit the famous Darvaza gas crater ('Door to Hell'). Camp in a traditional yurt or private tents." },
      { day: 4, title: "Darvaza – Dashoguz", activity: "Picnic breakfast. Drive to Dashoguz to visit Kunya-Urgench (UNESCO site), including the Mausoleum of Tyurabek-khanym, Kutlug-Timur minaret, and mausoleum of Sultan Tekesh. Cross the border back to Urgench (Uzbekistan)." }
    ],
    highlights: ["Ancient Merv (UNESCO)", "National Museum of Turkmenistan", "Ashgabat Marble Architecture", "Darvaza Gas Crater (Door to Hell)", "Kunya-Urgench (UNESCO)", "Karakum Desert"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "1-8 people",
    notes: "Included: Letter of invitation, accommodation, guide, transportation, entrance fees, breakfasts, and dinner in the desert. Not Included: International flights, Turkmen visa/border fees (70-100 USD), PCR test, lunches/dinners, tips, and insurance.",
    extras: ["Turkmen visa/border fees", "Lunches and Dinners", "Tips for guide and drivers", "Medical insurance"]
  },
  es: {
    id: tourId,
    title: "Capitales Antiguas e Infiernos del Desierto — 4 Días",
    short: "Descubre la antigua Merv, Asjabad, el cráter de Darvaza y Kunya-Urgench en Turkmenistán.",
    destination: "Turkmenabad, Mary, Asjabad, Darvaza, Dashoguz",
    region: "Turkmenistán",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 1075,
    priceNote: "Desde $1075 por persona (1 pasajero) hasta $430 (8 pasajeros).",
    duration: "4 días / 3 noches",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Turkmenabad - Mary", activity: "Reunión en la frontera de Farap. Conducción a Mary para explorar la 'Antigua Merv' (UNESCO). Noche en Mary." },
      { day: 2, title: "Mary – Asjabad", activity: "Viaje a Asjabad. Visita al Museo Nacional. Tour por la tarde por la ciudad de mármol. Noche en Asjabad." },
      { day: 3, title: "Asjabad – Darvaza", activity: "Mañana libre. Viaje al desierto de Karakum. Visita al cráter de Darvaza ('Puerta del Infierno'). Campamento en yurta." },
      { day: 4, title: "Darvaza – Dashoguz", activity: "Viaje a Dashoguz para visitar Kunya-Urgench (UNESCO). Cruce de frontera hacia Urgench, Uzbekistán." }
    ],
    highlights: ["Antigua Merv", "Museo Nacional de Turkmenistán", "Asjabad", "Cráter de Darvaza", "Kunya-Urgench", "Desierto de Karakum"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "1-8 personas",
    notes: "Incluye: Carta de invitación, alojamiento, guía, transporte, entradas, desayunos y cena en el desierto. No incluye: Vuelos, visa turcomana, almuerzos, cenas, propinas.",
    extras: ["Visa turcomana", "Almuerzos y cenas", "Propinas"]
  },
  uz: {
    id: tourId,
    title: "Qadimiy Poytaxtlar va Cho'l Olovi — 4 Kun",
    short: "Turkmanistonning qadimiy Merv, Ashxobod, Darvoza krateri va Ko'hna Urganch shaharlariga sayohat.",
    destination: "Turkmanobod, Mari, Ashxobod, Darvoza, Toshhovuz",
    region: "Turkmaniston",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 1075,
    priceNote: "Narxlar 1 kishi uchun $1075 dan (3*), 8 kishi uchun $430 gacha.",
    duration: "4 kun / 3 tun",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Turkmanobod - Mari", activity: "Farap chegarasida kutib olish. Mariga yo'l va 'Qadimiy Merv' (UNESCO) ziyorati. Marida tunash." },
      { day: 2, title: "Mari – Ashxobod", activity: "Ashxobodga yo'l. Milliy muzeyni ziyorat qilish. Tushdan keyin oq marmar shahar bo'ylab sayohat." },
      { day: 3, title: "Ashxobod – Darvoza", activity: "Ertalab bo'sh vaqt. Tushdan keyin Qoraqum cho'liga yo'l. Darvoza gaz kraterini ko'rish. O'tovda tunash." },
      { day: 4, title: "Darvoza – Toshhovuz", activity: "Toshhovuzga yo'l va Ko'hna Urganchni ziyorat qilish. O'zbekistonning Urganch shahriga chegara orqali o'tish." }
    ],
    highlights: ["Qadimiy Merv", "Turkmaniston Milliy Muzeyi", "Ashxobod", "Darvoza", "Ko'hna Urganch", "Qoraqum cho'li"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "1-8 kishi",
    notes: "Kiritilgan: Taklifnoma, mehmonxona, gid, transport, kirish chiptalari, nonushta va cho'lda kechki ovqat. Kiritilmagan: Turkmaniston vizasi ($70-100), tushlik va kechki ovqat, choychaqa.",
    extras: ["Turkmaniston vizasi", "Tushlik va kechki ovqat", "Choychaqa"]
  },
  ru: {
    id: tourId,
    title: "Древние столицы и Пламя Пустыни — 4 Дня",
    short: "Откройте для себя древний Мерв, мраморный Ашхабад, горящий кратер Дарваза и Куня-Ургенч.",
    destination: "Туркменабад, Мары, Ашхабад, Дарваза, Дашогуз",
    region: "Туркменистан",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 1075,
    priceNote: "От $1075 на 1 человека (3*) до $430 на 8 человек.",
    duration: "4 дня / 3 ночи",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Туркменабад - Мары", activity: "Встреча на границе Фарап. Переезд в Мары для экскурсии по Древнему Мерву (ЮНЕСКО). Ночь в Мары." },
      { day: 2, title: "Мары – Ашхабад", activity: "Переезд в Ашхабад. Национальный музей Туркменистана. Обзорная экскурсия по мраморному городу." },
      { day: 3, title: "Ашхабад – Дарваза", activity: "Свободное утро. Поездка в пустыню Каракумы к кратеру Дарваза ('Врата Ада'). Ночь в юрте." },
      { day: 4, title: "Дарваза – Дашогуз", activity: "Поездка в Дашогуз для посещения Куня-Ургенча (ЮНЕСКО). Пересечение границы в Ургенч, Узбекистан." }
    ],
    highlights: ["Древний Мерв", "Национальный музей Туркменистана", "Ашхабад", "Дарваза", "Куня-Ургенч", "Каракумы"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "1-8 человек",
    notes: "Включено: Приглашение, отели, гид, транспорт, входные билеты, завтраки и ужин в пустыне. Не включено: Виза Туркменистана (70-100 USD), обеды, ужины, чаевые.",
    extras: ["Виза Туркменистана", "Обеды и ужины", "Чаевые"]
  },
  zh: {
    id: tourId,
    title: "古代首都与地狱之门 — 4 天",
    short: "探索土库曼斯坦的古代梅尔夫，大理石之城阿什哈巴德，达尔瓦扎火山口和库尼亚乌尔根奇。",
    destination: "土库曼纳巴德, 马雷, 阿什哈巴德, 达尔瓦扎, 达绍古兹",
    region: "土库曼斯坦",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 1075,
    priceNote: "单人价从 $1075 起，8人团低至 $430。",
    duration: "4天 / 3晚",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "土库曼纳巴德 - 马雷", activity: "在法拉普边境会面。前往马雷探索古代梅尔夫遗址（联合国教科文组织）。夜宿马雷。" },
      { day: 2, title: "马雷 – 阿什哈巴德", activity: "前往阿什哈巴德，参观国家博物馆和城市大理石建筑。夜宿阿什哈巴德。" },
      { day: 3, title: "阿什哈巴德 – 达尔瓦扎", activity: "上午自由活动。下午前往卡拉库姆沙漠，参观达尔瓦扎火山口（地狱之门）。毡房露营。" },
      { day: 4, title: "达尔瓦扎 – 达绍古兹", activity: "前往达绍古兹参观库尼亚乌尔根奇遗址。随后过境乌兹别克斯坦乌尔根奇。" }
    ],
    highlights: ["古代梅尔夫", "土库曼斯坦国家博物馆", "阿什哈巴德大理石之城", "达尔瓦扎火山口", "库尼亚乌尔根奇", "卡拉库姆沙漠"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "1-8 人",
    notes: "包含: 邀请函，住宿，导游，交通，门票，早餐，以及沙漠晚餐。不含: 土库曼斯坦签证及过境费，午晚餐，小费。",
    extras: ["土库曼斯坦签证费", "午餐和晚餐", "小费"]
  },
  it: {
    id: tourId,
    title: "Capitali Antiche e Inferni nel Deserto — 4 Giorni",
    short: "Scopri l'antica Merv in Turkmenistan, Ashgabat, il cratere di Darvaza e Kunya-Urgench.",
    destination: "Turkmenabad, Mary, Ashgabat, Darvaza, Dashoguz",
    region: "Turkmenistan",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 1075,
    priceNote: "Da $1075 per 1 pax fino a $430 per 8 pax.",
    duration: "4 giorni / 3 notti",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Turkmenabad - Mary", activity: "Incontro al confine di Farap. Viaggio a Mary per l'Antica Merv (UNESCO). Notte a Mary." },
      { day: 2, title: "Mary – Ashgabat", activity: "Viaggio per Ashgabat. Museo Nazionale del Turkmenistan e tour dell'architettura in marmo." },
      { day: 3, title: "Ashgabat – Darvaza", activity: "Viaggio nel deserto del Karakum. Cratere del gas di Darvaza ('Porta dell'Inferno'). Campeggio in yurta." },
      { day: 4, title: "Darvaza – Dashoguz", activity: "Viaggio a Dashoguz per Kunya-Urgench. Attraversamento del confine per l'Uzbekistan." }
    ],
    highlights: ["Antica Merv", "Museo Nazionale", "Ashgabat", "Cratere di Darvaza", "Kunya-Urgench", "Deserto del Karakum"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "1-8 persone",
    notes: "Incluso: Lettera di invito, hotel, guida, trasporti, ingressi, colazioni e cena nel deserto. Escluso: Visto turkmeno, pranzi e cene, mance.",
    extras: ["Visto turkmeno", "Pranzi e Cene", "Mance"]
  },
  fr: {
    id: tourId,
    title: "Capitales Antiques et Enfers du Désert — 4 Jours",
    short: "Découvrez l'ancienne Merv, Achgabat, le cratère de Darvaza et Kounia-Ourguentch.",
    destination: "Turkménabad, Mary, Achgabat, Darvaza, Dachogouz",
    region: "Turkménistan",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 1075,
    priceNote: "À partir de 1075 $ pour 1 personne jusqu'à 430 $ pour 8 personnes.",
    duration: "4 jours / 3 nuits",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Turkménabad - Mary", activity: "Rendez-vous à la frontière de Farap. Route vers Mary pour explorer l'Ancienne Merv (UNESCO). Nuit à Mary." },
      { day: 2, title: "Mary – Achgabat", activity: "Route vers Achgabat. Musée National du Turkménistan et tour de ville. Nuit à Achgabat." },
      { day: 3, title: "Achgabat – Darvaza", activity: "Matinée libre. Route vers le désert du Karakoum et le cratère de Darvaza ('Porte de l'Enfer'). Nuit en yourte." },
      { day: 4, title: "Darvaza – Dachogouz", activity: "Route vers Dachogouz pour visiter Kounia-Ourguentch. Passage de la frontière vers l'Ouzbékistan." }
    ],
    highlights: ["Ancienne Merv", "Musée National", "Achgabat", "Cratère de Darvaza", "Kounia-Ourguentch", "Désert du Karakoum"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "1-8 personnes",
    notes: "Inclus: Lettre d'invitation, hôtels, guide, transports, billets d'entrée, petits-déjeuners et dîner dans le désert. Non inclus: Visa turkmène, déjeuners et dîners, pourboires.",
    extras: ["Visa turkmène", "Repas", "Pourboires"]
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
console.log("Successfully updated tours.json with the 4-day Turkmenistan tour in 7 languages.");
