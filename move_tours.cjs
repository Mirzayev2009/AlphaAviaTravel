const fs = require('fs');
const path = require('path');

const toursPath = path.join(__dirname, 'public', 'data', 'tours.json');
let data = JSON.parse(fs.readFileSync(toursPath, 'utf8'));

const idsToMove = [
  't_central_asia_17d', // 2nd
  't_kazakhstan_kyrgyzstan_15d', // 3rd
  't_turkmenistan_express_4d', // 5th
  't_pamir_highway_7d', // 6th
  't_fann_mountains_3d' // 7th
];

if (!data.tours.centralAsia) {
  data.tours.centralAsia = {};
}

const languages = ['en', 'es', 'uz', 'ru', 'zh', 'it', 'fr'];

for (const lang of languages) {
  if (!data.tours.centralAsia[lang]) {
    data.tours.centralAsia[lang] = [];
  }
  
  if (data.tours.uzbekistan && data.tours.uzbekistan[lang]) {
    // Find tours to move
    const toursToMove = data.tours.uzbekistan[lang].filter(t => idsToMove.includes(t.id));
    
    // Add them to centralAsia
    for (const tour of toursToMove) {
      // Check if it already exists to avoid duplicates if run multiple times
      if (!data.tours.centralAsia[lang].find(t => t.id === tour.id)) {
        data.tours.centralAsia[lang].push(tour);
      }
    }
    
    // Remove them from uzbekistan
    data.tours.uzbekistan[lang] = data.tours.uzbekistan[lang].filter(t => !idsToMove.includes(t.id));
  }
}

fs.writeFileSync(toursPath, JSON.stringify(data, null, 2), 'utf8');
console.log("Successfully moved the specified tours to Central Asia.");
