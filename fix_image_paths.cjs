const fs = require('fs');
const path = require('path');

// Fix seed.js gallery paths
const seedPath = path.join(__dirname, 'src', 'data', 'seed.js');
let seedContent = fs.readFileSync(seedPath, 'utf8');
seedContent = seedContent.replace(/src: "\/images\/photo_/g, 'src: "/data/images/photo_');
fs.writeFileSync(seedPath, seedContent, 'utf8');
console.log('Fixed seed.js gallery paths.');

// Fix tours.json image paths
const toursPath = path.join(__dirname, 'public', 'data', 'tours.json');
let toursContent = fs.readFileSync(toursPath, 'utf8');
toursContent = toursContent.replace(/\/images\/photo_/g, '/data/images/photo_');
fs.writeFileSync(toursPath, toursContent, 'utf8');
console.log('Fixed tours.json image paths.');
