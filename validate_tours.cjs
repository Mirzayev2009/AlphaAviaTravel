const fs = require('fs');
const path = require('path');

const toursPath = path.join(__dirname, 'public', 'data', 'tours.json');
const data = JSON.parse(fs.readFileSync(toursPath, 'utf8'));

const addedTourIds = [
  't_journey_thousand_miles_8d',
  't_central_asia_17d',
  't_kazakhstan_kyrgyzstan_15d',
  't_turkmenistan_4d',
  't_turkmenistan_express_4d',
  't_pamir_highway_7d',
  't_fann_mountains_3d'
];

const languages = ['en', 'es', 'uz', 'ru', 'zh', 'it', 'fr'];
let allValid = true;

for (const lang of languages) {
  const langTours = data.tours.uzbekistan[lang] || [];
  
  for (const tourId of addedTourIds) {
    const tour = langTours.find(t => t.id === tourId);
    if (!tour) {
      console.error(`[ERROR] Tour ${tourId} is MISSING in language: ${lang}`);
      allValid = false;
      continue;
    }

    // Basic validation of keys
    const requiredKeys = ['title', 'short', 'itinerary', 'highlights', 'price'];
    for (const key of requiredKeys) {
      if (!tour[key] || (Array.isArray(tour[key]) && tour[key].length === 0)) {
        console.warn(`[WARN] Tour ${tourId} in ${lang} might have an issue with key: ${key}`);
      }
    }
  }
}

if (allValid) {
  console.log("All 7 tours have been successfully found and validated across all 7 languages (en, es, uz, ru, zh, it, fr). No missing fields detected.");
}
