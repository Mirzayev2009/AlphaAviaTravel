const fs = require('fs');
const path = require('path');

const toursPath = path.join(__dirname, 'public', 'data', 'tours.json');
let data = JSON.parse(fs.readFileSync(toursPath, 'utf8'));

const tourIds = ['t_turkmenistan_express_4d', 't_turkmenistan_4d'];
const newImages = [
  "/images/photo_1_2026-06-29_20-38-00.jpg",
  "/images/photo_2_2026-06-29_20-38-00.jpg",
  "/images/photo_3_2026-06-29_20-38-00.jpg",
  "/images/photo_4_2026-06-29_20-38-00.jpg",
  "/images/photo_5_2026-06-29_20-38-00.jpg",
  "/images/photo_6_2026-06-29_20-38-00.jpg"
];

let updated = false;
const categories = ['central_asia', 'uzbekistan'];

for (const category of categories) {
  const languages = Object.keys(data.tours[category] || {});
  for (const lang of languages) {
    for (const tourId of tourIds) {
      const tour = data.tours[category][lang].find(t => t.id === tourId);
      if (tour) {
        tour.images = newImages;
        updated = true;
      }
    }
  }
}

if (updated) {
  fs.writeFileSync(toursPath, JSON.stringify(data, null, 2), 'utf8');
  console.log("Updated images for Turkmenistan tours.");
} else {
  console.log("Tours not found.");
}
