import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { categoryTours, findCatalogTour, imageUrl } from "../src/hooks/use-travel-data.js";

const root = resolve(import.meta.dirname, "..");
const json = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));
const catalogJson = await json("public/data/tours.json");
const catalog = catalogJson.tours ?? catalogJson;
const languages = ["en", "ru", "uz", "es", "fr", "it", "zh"];
let routes = 0;
for (const category of Object.keys(catalog)) {
  for (const language of languages) {
    const records = categoryTours(catalog, category, language);
    for (const [index, tour] of records.entries()) {
      const option = records.slice(0, index).filter((item) => item.id === tour.id).length;
      const loaded = findCatalogTour(catalog, tour.id, language, option);
      assert.equal(loaded?.id, tour.id, `Fresh URL must resolve ${language}: ${tour.id}`);
      assert.equal(loaded.title, tour.title);
      assert.equal(loaded.price, tour.price, "Selected tour price must survive a fresh URL");
      routes++;
    }
  }
}
for (const language of languages) {
  assert.equal(categoryTours(catalog, "world", language).length, 0);
  const translated = findCatalogTour(catalog, "t_turkmenistan_8d_en", language);
  assert.ok(translated?.title, `Language change must retain a tour: ${language}`);
}
assert.equal(findCatalogTour(catalog, "missing-tour", "en"), null);
assert.deepEqual(categoryTours(null, "uzbekistan", "en"), []);
assert.equal(imageUrl("/images/example.jpg"), "/data/images/example.jpg");
assert.equal(imageUrl("/data/images/example.jpg"), "/data/images/example.jpg");
assert.equal(imageUrl("https://example.com/image.jpg"), "https://example.com/image.jpg");

const design = await json("src/i18n/design.json");
const sources = [];
async function walk(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const full = resolve(path, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(jsx|js)$/.test(entry.name)) sources.push(full);
  }
}
await walk(resolve(root, "src/pages"));
for (const file of ["TravelUI", "Header", "Footer", "Layout", "SwiperHero", "TourCard", "DestinationCard", "DestinationDetailsDrawer", "TourInquiryForm", "ImageLightbox", "ChatPanel", "ChatBot", "TeamGrid", "LazyMap"]) sources.push(resolve(root, `src/components/${file}.jsx`));
const keys = new Set();
for (const path of sources) {
  const source = await readFile(path, "utf8");
  for (const match of source.matchAll(/\bt\(["']([a-zA-Z][a-zA-Z0-9_.]+)["']\s*[,)]/g)) {
    if (!match[1].endsWith(".")) keys.add(match[1]);
  }
}
const missing = [];
for (const language of languages) {
  const resource = { ...await json(`src/i18n/${language}.json`), design: design[language] };
  for (const key of keys) {
    const lookup = (path) => path.split(".").reduce((value, part) => value?.[part], resource);
    if (lookup(key) === undefined && lookup(key + "_other") === undefined) missing.push(`${language}: ${key}`);
  }
}
console.log(`Tour URL and language checks: ${routes} catalog records passed.`);
console.log(`Translation checks: ${keys.size} literal keys across ${languages.length} languages.`);
if (missing.length) { console.log(missing.join("\n")); process.exitCode = 1; }
else console.log("No missing interface translations.");
for (const path of ["public/iStock-1249451586.jpg", "public/data/images/samarqand/registan_square.png"]) assert.ok((await stat(resolve(root, path))).isFile());
