const fs = require('fs');
const path = require('path');

const toursPath = path.join(__dirname, 'public', 'data', 'tours.json');
let data = JSON.parse(fs.readFileSync(toursPath, 'utf8'));

if (data.tours.centralAsia) {
  if (!data.tours.central_asia) {
    data.tours.central_asia = {};
  }
  
  const languages = ['en', 'es', 'uz', 'ru', 'zh', 'it', 'fr'];
  for (const lang of languages) {
    if (!data.tours.central_asia[lang]) {
      data.tours.central_asia[lang] = [];
    }
    if (data.tours.centralAsia[lang]) {
      data.tours.central_asia[lang].push(...data.tours.centralAsia[lang]);
    }
  }
  
  delete data.tours.centralAsia;
  fs.writeFileSync(toursPath, JSON.stringify(data, null, 2), 'utf8');
  console.log("Successfully moved tours from centralAsia to central_asia.");
} else {
  console.log("No centralAsia object found.");
}
