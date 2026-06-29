const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'seed.js');
let content = fs.readFileSync(filePath, 'utf8');

// Find the gallery export and replace everything from it to end of file
const galleryStart = content.indexOf('export const gallery = [');
if (galleryStart === -1) {
  console.error('Could not find gallery export');
  process.exit(1);
}

// Keep everything before gallery
const before = content.substring(0, galleryStart);

// Write the correct gallery
const galleryContent = `export const gallery = [
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
    alt: "Fergana Valley wild horses",
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
  // Kazakhstan Photos
  { id: "g_kz1", src: "/images/photo_1_2026-06-29_20-29-56.jpg", alt: "Kazakhstan landscapes", location: "Kazakhstan" },
  { id: "g_kz2", src: "/images/photo_2_2026-06-29_20-29-56.jpg", alt: "Kazakhstan scenery", location: "Kazakhstan" },
  { id: "g_kz3", src: "/images/photo_3_2026-06-29_20-29-56.jpg", alt: "Kazakhstan nature", location: "Kazakhstan" },
  { id: "g_kz4", src: "/images/photo_4_2026-06-29_20-29-56.jpg", alt: "Kazakhstan highlights", location: "Kazakhstan" },
  { id: "g_kz5", src: "/images/photo_5_2026-06-29_20-29-56.jpg", alt: "Kazakhstan adventure", location: "Kazakhstan" },
  { id: "g_kz6", src: "/images/photo_6_2026-06-29_20-29-56.jpg", alt: "Kazakhstan mountains", location: "Kazakhstan" },
  // Kyrgyzstan Photos
  { id: "g_kg1", src: "/images/photo_1_2026-06-29_20-34-47.jpg", alt: "Kyrgyzstan landscapes", location: "Kyrgyzstan" },
  { id: "g_kg2", src: "/images/photo_2_2026-06-29_20-34-47.jpg", alt: "Kyrgyzstan scenery", location: "Kyrgyzstan" },
  { id: "g_kg3", src: "/images/photo_3_2026-06-29_20-34-47.jpg", alt: "Kyrgyzstan mountains", location: "Kyrgyzstan" },
  { id: "g_kg4", src: "/images/photo_4_2026-06-29_20-34-47.jpg", alt: "Pamir Highway, Kyrgyzstan", location: "Kyrgyzstan" },
  // Tajikistan Photos
  { id: "g_tj1", src: "/images/photo_1_2026-06-29_20-36-10.jpg", alt: "Fann Mountains, Tajikistan", location: "Tajikistan" },
  { id: "g_tj2", src: "/images/photo_2_2026-06-29_20-36-10.jpg", alt: "Seven Lakes, Tajikistan", location: "Tajikistan" },
  { id: "g_tj3", src: "/images/photo_3_2026-06-29_20-36-10.jpg", alt: "Alpine scenery, Tajikistan", location: "Tajikistan" },
  { id: "g_tj4", src: "/images/photo_4_2026-06-29_20-36-10.jpg", alt: "Tajikistan nature", location: "Tajikistan" },
  { id: "g_tj5", src: "/images/photo_5_2026-06-29_20-36-10.jpg", alt: "Tajikistan landscapes", location: "Tajikistan" },
  { id: "g_tj6", src: "/images/photo_6_2026-06-29_20-36-10.jpg", alt: "Iskanderkul Lake, Tajikistan", location: "Tajikistan" },
  // Turkmenistan Photos
  { id: "g_tm1", src: "/images/photo_1_2026-06-29_20-38-00.jpg", alt: "Ancient Merv, Turkmenistan", location: "Turkmenistan" },
  { id: "g_tm2", src: "/images/photo_2_2026-06-29_20-38-00.jpg", alt: "Ashgabat, Turkmenistan", location: "Turkmenistan" },
  { id: "g_tm3", src: "/images/photo_3_2026-06-29_20-38-00.jpg", alt: "Darvaza Gas Crater, Turkmenistan", location: "Turkmenistan" },
  { id: "g_tm4", src: "/images/photo_4_2026-06-29_20-38-00.jpg", alt: "Turkmenistan landscapes", location: "Turkmenistan" },
  { id: "g_tm5", src: "/images/photo_5_2026-06-29_20-38-00.jpg", alt: "Turkmenistan heritage", location: "Turkmenistan" },
  { id: "g_tm6", src: "/images/photo_6_2026-06-29_20-38-00.jpg", alt: "Turkmenistan scenery", location: "Turkmenistan" },
];
`;

fs.writeFileSync(filePath, before + galleryContent, 'utf8');
console.log('Successfully fixed seed.js gallery. Total length:', (before + galleryContent).length);
