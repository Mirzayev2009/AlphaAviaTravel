const fs = require('fs');
const path = require('path');

const toursPath = path.join(__dirname, 'public', 'data', 'tours.json');
let data = JSON.parse(fs.readFileSync(toursPath, 'utf8'));

const tourId = 't_kazakhstan_kyrgyzstan_15d';
const newImages = [
  "/images/photo_1_2026-06-29_20-29-56.jpg",
  "/images/photo_2_2026-06-29_20-29-56.jpg",
  "/images/photo_3_2026-06-29_20-29-56.jpg",
  "/images/photo_4_2026-06-29_20-29-56.jpg",
  "/images/photo_5_2026-06-29_20-29-56.jpg",
  "/images/photo_6_2026-06-29_20-29-56.jpg"
];

let updated = false;
const languages = Object.keys(data.tours.central_asia || {});
for (const lang of languages) {
  const tour = data.tours.central_asia[lang].find(t => t.id === tourId);
  if (tour) {
    tour.images = newImages;
    updated = true;
  }
}

if (updated) {
  fs.writeFileSync(toursPath, JSON.stringify(data, null, 2), 'utf8');
  console.log("Updated images for Kazakhstan & Kyrgyzstan tour.");
} else {
  console.log("Tour not found.");
}
