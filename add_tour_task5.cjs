const fs = require('fs');
const path = require('path');

const tourId = "t_turkmenistan_express_4d";

const translations = {
  en: {
    id: tourId,
    title: "Turkmenistan Express — 4 Days",
    short: "Experience Ancient Merv, Ashgabat's Marble Architecture, and the Darvaza Gas Crater.",
    destination: "Turkmenabad, Mary, Ashgabat, Darvaza, Dashoguz",
    region: "Turkmenistan",
    images: [
      "/images/samarqand/samarkand.jpg",
      "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg",
      "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"
    ],
    price: 665,
    priceNote: "Prices start from $665 per person for 3 pax, to $542 per person for 5 pax (4* accommodation).",
    duration: "4 days / 3 nights",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Turkmenabad - Mary", activity: "Meet at Farap border. Drive to Mary to explore 'Ancient Merv' (UNESCO). Sights include Kyz Galas, Complex of Askhabs, Erk Gala, Gyaur Gala, and Sultan Sanjar mausoleum. Overnight in Mary." },
      { day: 2, title: "Mary – Ashgabat", activity: "Drive to Ashgabat. Visit the Carpet Museum, featuring 2000 exhibits. City tour including Ertogrul Gazy Mosque, Independence Park, Arch of Neutrality, and Constitution Monument. Overnight in Ashgabat." },
      { day: 3, title: "Ashgabat – Darvaza", activity: "Free morning. Drive to the Karakum desert to visit the Darvaza gas crater ('Door to Hell'). Camp in a yurt or private tent." },
      { day: 4, title: "Darvaza – Dashoguz", activity: "Picnic breakfast. Drive to Dashoguz province to cross the border back to Urgench, Uzbekistan." }
    ],
    highlights: ["Ancient Merv (UNESCO)", "Turkmen Carpet Museum", "Ashgabat Marble City", "Darvaza Gas Crater", "Karakum Desert"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "3-8 people",
    notes: "Included: Invitation letter, accommodation, guide, transportation, entrance fees, breakfasts, and dinner in the desert. Not Included: Flights, visa fees ($70-100), lunches/dinners, and tips.",
    extras: ["Turkmen visa/border fees", "Lunches and Dinners", "Tips for guide and drivers", "Medical insurance"]
  },
  es: {
    id: tourId,
    title: "Turkmenistán Exprés — 4 Días",
    short: "Experimenta la antigua Merv, la arquitectura de mármol de Asjabad y el cráter de Darvaza.",
    destination: "Turkmenabad, Mary, Asjabad, Darvaza, Dashoguz",
    region: "Turkmenistán",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 665,
    priceNote: "Desde $665 (3 pax) hasta $542 (5 pax) en hoteles de 4*.",
    duration: "4 días / 3 noches",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Turkmenabad - Mary", activity: "Encuentro en Farap. Antigua Merv (UNESCO). Noche en Mary." },
      { day: 2, title: "Mary – Asjabad", activity: "Viaje a Asjabad. Museo de la Alfombra. Tour por la ciudad. Noche en Asjabad." },
      { day: 3, title: "Asjabad – Darvaza", activity: "Mañana libre. Viaje al cráter de Darvaza ('Puerta del Infierno'). Campamento en yurta." },
      { day: 4, title: "Darvaza – Dashoguz", activity: "Viaje a Dashoguz para cruzar la frontera a Urgench, Uzbekistán." }
    ],
    highlights: ["Antigua Merv", "Museo de la Alfombra", "Asjabad", "Cráter de Darvaza", "Desierto Karakum"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "3-8 personas",
    notes: "Incluye: Alojamiento, guía, transporte, entradas, desayunos y cena en el desierto. Excluye: Vuelos, visa turcomana, almuerzos, cenas, propinas.",
    extras: ["Visa", "Comidas", "Propinas"]
  },
  uz: {
    id: tourId,
    title: "Turkmaniston Ekspress — 4 Kun",
    short: "Qadimiy Merv, Ashxobod va Darvoza krateriga sayohat.",
    destination: "Turkmanobod, Mari, Ashxobod, Darvoza, Toshhovuz",
    region: "Turkmaniston",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 665,
    priceNote: "Narx 3 kishi uchun $665, 5 kishi uchun $542 (4* mehmonxona).",
    duration: "4 kun / 3 tun",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Turkmanobod - Mari", activity: "Farap chegarasida uchrashuv. Mariga yo'l va 'Qadimiy Merv' (UNESCO)." },
      { day: 2, title: "Mari – Ashxobod", activity: "Ashxobodga yo'l. Gilam muzeyi va shahar sayohati." },
      { day: 3, title: "Ashxobod – Darvoza", activity: "Bo'sh tong. Darvoza gaz krateriga sayohat. O'tovda tunash." },
      { day: 4, title: "Darvoza – Toshhovuz", activity: "Toshhovuz orqali Urganchga o'tish." }
    ],
    highlights: ["Qadimiy Merv", "Gilam muzeyi", "Ashxobod", "Darvoza krateri", "Qoraqum"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "3-8 kishi",
    notes: "Kiritilgan: Mehmonxona, gid, transport, chiptalar, nonushta, cho'lda kechki ovqat. Kiritilmagan: Viza ($70-100), tushlik va kechki ovqatlar.",
    extras: ["Viza", "Ovqatlar", "Choychaqa"]
  },
  ru: {
    id: tourId,
    title: "Туркменистан Экспресс — 4 Дня",
    short: "Древний Мерв, мраморный Ашхабад и газовый кратер Дарваза.",
    destination: "Туркменабад, Мары, Ашхабад, Дарваза, Дашогуз",
    region: "Туркменистан",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 665,
    priceNote: "От $665 (3 чел) до $542 (5 чел) в 4* отеле.",
    duration: "4 дня / 3 ночи",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Туркменабад - Мары", activity: "Встреча на границе Фарап. Древний Мерв (ЮНЕСКО). Ночь в Мары." },
      { day: 2, title: "Мары – Ашхабад", activity: "Переезд в Ашхабад. Музей ковров. Экскурсия по городу." },
      { day: 3, title: "Ашхабад – Дарваза", activity: "Свободное утро. Дарваза ('Врата Ада'). Ночь в юрте." },
      { day: 4, title: "Дарваза – Дашогуз", activity: "Переезд в Дашогуз и пересечение границы в Ургенч." }
    ],
    highlights: ["Древний Мерв", "Музей ковров", "Ашхабад", "Дарваза", "Каракумы"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "3-8 человек",
    notes: "Включено: отели, гид, транспорт, входные билеты, завтраки и ужин. Не включено: виза, обеды и ужины.",
    extras: ["Виза", "Питание", "Чаевые"]
  },
  zh: {
    id: tourId,
    title: "土库曼斯坦特快 — 4 天",
    short: "体验古代梅尔夫，阿什哈巴德的建筑和达尔瓦扎火山口。",
    destination: "土库曼纳巴德, 马雷, 阿什哈巴德, 达尔瓦扎, 达绍古兹",
    region: "土库曼斯坦",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 665,
    priceNote: "3人起价$665，5人起价$542 (4*住宿)。",
    duration: "4天 / 3晚",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "土库曼纳巴德 - 马雷", activity: "法拉普边境集合，前往古代梅尔夫。夜宿马雷。" },
      { day: 2, title: "马雷 – 阿什哈巴德", activity: "前往阿什哈巴德。参观地毯博物馆和市区。" },
      { day: 3, title: "阿什哈巴德 – 达尔瓦扎", activity: "早晨自由活动。前往达尔瓦扎（地狱之门）。毡房露营。" },
      { day: 4, title: "达尔瓦扎 – 达绍古兹", activity: "前往达绍古兹过境前往乌尔根奇。" }
    ],
    highlights: ["古代梅尔夫", "地毯博物馆", "阿什哈巴德", "达尔瓦扎", "卡拉库姆沙漠"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "3-8 人",
    notes: "包含: 住宿, 导游, 交通, 门票, 早餐和沙漠晚餐。不含: 签证费, 午晚餐, 小费。",
    extras: ["签证费", "餐饮", "小费"]
  },
  it: {
    id: tourId,
    title: "Turkmenistan Express — 4 Giorni",
    short: "Antica Merv, Museo del Tappeto, Ashgabat e Darvaza.",
    destination: "Turkmenabad, Mary, Ashgabat, Darvaza, Dashoguz",
    region: "Turkmenistan",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 665,
    priceNote: "Da $665 (3 pax) a $542 (5 pax) in hotel 4*.",
    duration: "4 giorni / 3 notti",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Turkmenabad - Mary", activity: "Incontro a Farap. Antica Merv (UNESCO)." },
      { day: 2, title: "Mary – Ashgabat", activity: "Viaggio ad Ashgabat. Museo del Tappeto e tour della città." },
      { day: 3, title: "Ashgabat – Darvaza", activity: "Darvaza ('Porta dell'Inferno'). Notte in yurta." },
      { day: 4, title: "Darvaza – Dashoguz", activity: "Attraversamento del confine per Urgench." }
    ],
    highlights: ["Antica Merv", "Museo del Tappeto", "Ashgabat", "Darvaza", "Karakum"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "3-8 persone",
    notes: "Incluso: Hotel, guida, trasporto, ingressi, colazioni, cena nel deserto. Escluso: Visto, pranzi/cene, mance.",
    extras: ["Visto", "Pasti", "Mance"]
  },
  fr: {
    id: tourId,
    title: "Turkménistan Express — 4 Jours",
    short: "Ancienne Merv, Musée du Tapis, Achgabat et Darvaza.",
    destination: "Turkménabad, Mary, Achgabat, Darvaza, Dachogouz",
    region: "Turkménistan",
    images: ["/images/samarqand/samarkand.jpg", "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg", "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg"],
    price: 665,
    priceNote: "De 665 $ (3 pers.) à 542 $ (5 pers.) en hôtel 4*.",
    duration: "4 jours / 3 nuits",
    rating: null,
    category: "combined",
    availableDates: [],
    itinerary: [
      { day: 1, title: "Turkménabad - Mary", activity: "Ancienne Merv (UNESCO). Nuit à Mary." },
      { day: 2, title: "Mary – Achgabat", activity: "Musée du Tapis et tour d'Achgabat." },
      { day: 3, title: "Achgabat – Darvaza", activity: "Cratère de Darvaza ('Porte de l'Enfer'). Nuit en yourte." },
      { day: 4, title: "Darvaza – Dachogouz", activity: "Route vers la frontière pour Ourguentch." }
    ],
    highlights: ["Ancienne Merv", "Musée du Tapis", "Achgabat", "Darvaza", "Karakoum"],
    organizer: { name: "Alpha Travel", phone: "+998976151603", email: "Alpha.avia.travel@gmail.com", website: "" },
    participants: "3-8 personnes",
    notes: "Inclus: Hôtels, guide, transports, billets d'entrée, petits-déjeuners, dîner. Non inclus: Visa, déjeuners/dîners, pourboires.",
    extras: ["Visa", "Repas", "Pourboires"]
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
console.log("Successfully updated tours.json with the 4-day Turkmenistan Express tour in 7 languages.");
