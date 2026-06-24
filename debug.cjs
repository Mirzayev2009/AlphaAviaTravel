const fs = require('fs');
const c = fs.readFileSync('./src/i18n/en.json', 'utf8');
const detailIdx = c.indexOf('"detail"');
const destinationsIdx = c.indexOf('"destinations"', detailIdx + 1);
console.log(c.substring(detailIdx, destinationsIdx + 50));
