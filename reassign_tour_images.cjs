const fs = require('fs');
const path = require('path');

const toursPath = path.join(__dirname, 'public', 'data', 'tours.json');
let data = JSON.parse(fs.readFileSync(toursPath, 'utf8'));

const Uz_1 = "/images/samarqand/samarkand.jpg";
const Uz_2 = "/images/buxoro/55ee4898d3526351afba9e6dcb279e3bfab7a3a5.jpg";
const Uz_3 = "/images/Tashkent/hastiimom -0-0-0-0-1737975962.jpg";

const K_1 = "/images/photo_1_2026-06-29_20-29-56.jpg";
const K_2 = "/images/photo_2_2026-06-29_20-29-56.jpg";
const K_3 = "/images/photo_3_2026-06-29_20-29-56.jpg";
const K_4 = "/images/photo_4_2026-06-29_20-29-56.jpg";
const K_5 = "/images/photo_5_2026-06-29_20-29-56.jpg";
const K_6 = "/images/photo_6_2026-06-29_20-29-56.jpg";

const Ky_1 = "/images/photo_1_2026-06-29_20-34-47.jpg";
const Ky_2 = "/images/photo_2_2026-06-29_20-34-47.jpg";
const Ky_3 = "/images/photo_3_2026-06-29_20-34-47.jpg";
const Ky_4 = "/images/photo_4_2026-06-29_20-34-47.jpg";

const Tj_1 = "/images/photo_1_2026-06-29_20-36-10.jpg";
const Tj_2 = "/images/photo_2_2026-06-29_20-36-10.jpg";
const Tj_3 = "/images/photo_3_2026-06-29_20-36-10.jpg";
const Tj_4 = "/images/photo_4_2026-06-29_20-36-10.jpg";
const Tj_5 = "/images/photo_5_2026-06-29_20-36-10.jpg";
const Tj_6 = "/images/photo_6_2026-06-29_20-36-10.jpg";

const Tm_1 = "/images/photo_1_2026-06-29_20-38-00.jpg";
const Tm_2 = "/images/photo_2_2026-06-29_20-38-00.jpg";
const Tm_3 = "/images/photo_3_2026-06-29_20-38-00.jpg";
const Tm_4 = "/images/photo_4_2026-06-29_20-38-00.jpg";
const Tm_5 = "/images/photo_5_2026-06-29_20-38-00.jpg";
const Tm_6 = "/images/photo_6_2026-06-29_20-38-00.jpg";

const tourImagesMap = {
  't_journey_thousand_miles_8d': [Uz_1, Uz_2, Uz_3],
  't_central_asia_17d': [Tj_2, Tm_2, Uz_2, Tj_3, Tm_3, Uz_3],
  't_kazakhstan_kyrgyzstan_15d': [K_1, K_2, K_3, K_4, K_5, K_6, Ky_2, Ky_3],
  't_turkmenistan_4d': [Tm_1, Tm_2, Tm_3, Tm_4, Tm_5, Tm_6],
  't_turkmenistan_express_4d': [Tm_4, Tm_5, Tm_6, Tm_1, Tm_2, Tm_3],
  't_pamir_highway_7d': [Ky_1, Ky_2, Ky_3, Ky_4, Tj_4, Tj_5, Tj_6],
  't_fann_mountains_3d': [Tj_1, Tj_2, Tj_3, Tj_4, Tj_5, Tj_6]
};

const categories = ['central_asia', 'uzbekistan'];

for (const category of categories) {
  const languages = Object.keys(data.tours[category] || {});
  for (const lang of languages) {
    for (const [tourId, images] of Object.entries(tourImagesMap)) {
      const tour = data.tours[category][lang].find(t => t.id === tourId);
      if (tour) {
        tour.images = images;
      }
    }
  }
}

fs.writeFileSync(toursPath, JSON.stringify(data, null, 2), 'utf8');
console.log("Updated images for all 7 tours, ensuring the first image is unique for each.");
