import assert from "node:assert/strict";
import { readFile, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { createInstance } from "i18next";
import { createTranslationBackend } from "../src/i18n/backend.js";
import { categoryTours, findCatalogTour } from "../src/hooks/use-travel-data.js";

const root = resolve(import.meta.dirname, "..");
const json = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));
const languages = ["en", "ru", "uz", "es", "fr", "it", "zh"];
const fullCatalog = (await json("public/data/tours.json")).tours;
let routeChecks = 0;
for (const language of languages) {
  const catalog = (await json(`public/data/optimized/tours.${language}.json`)).tours;
  for (const category of Object.keys(fullCatalog)) {
    for (const sourceLanguage of languages) {
      const records = categoryTours(fullCatalog, category, sourceLanguage);
      for (const [index, tour] of records.entries()) {
        const option = records.slice(0, index).filter((item) => item.id === tour.id).length;
        assert.deepEqual(findCatalogTour(catalog, tour.id, language, option), findCatalogTour(fullCatalog, tour.id, language, option), `Localized delivery must preserve ${tour.id} option${option} in ${language}`);
        routeChecks++;
      }
    }
  }
  for (const [file, key] of [["destination", "destinations"], ["hotel", "hotels"], ["transport", "transport"], ["team", "team"]]) {
    const original = await json(`public/data/${file}.json`);
    const delivered = await json(`public/data/optimized/${file}.${language}.json`);
    const originalData = original[key] ?? original;
    const deliveredData = delivered[key] ?? delivered;
    const records = originalData[language] ?? originalData.en;
    assert.ok(Array.isArray(records) && records.length > 0, `Missing test coverage for ${file} in ${language}`);
    assert.deepEqual(deliveredData[language] ?? deliveredData.en, records, `${file} facts changed in ${language}`);
    assert.ok(Object.keys(deliveredData).every((key) => key === language || key === "en"), `${file} loaded unrelated languages`);
  }
}

// Exercise the same async i18next backend used by the app, with real dictionaries.
const dictionaries = {};
const design = await json("src/i18n/design.json");
for (const language of languages) {
  const generated = await json(`src/generated/locales/${language}.json`);
  assert.deepEqual(generated, { ...await json(`src/i18n/${language}.json`), design: design[language] });
  dictionaries[`../generated/locales/${language}.json`] = async () => ({ default: generated });
}
const english = await json("src/generated/locales/en.json");
const i18n = createInstance();
await i18n.use(createTranslationBackend(dictionaries, english)).init({ resources: { en: { translation: english } }, partialBundledLanguages: true, fallbackLng: "en", lng: "en", supportedLngs: languages, ns: ["translation"], defaultNS: "translation" });
for (const language of languages) {
  const previous = i18n.language;
  const cached = i18n.hasResourceBundle(language, "translation");
  const loading = i18n.changeLanguage(language);
  if (!cached) assert.equal(i18n.language, previous, "Keep current text visible while another language loads");
  await loading;
  assert.equal(i18n.t("design.viewTour"), design[language].viewTour);
}
const unavailable = createInstance();
await unavailable.use(createTranslationBackend({ "../generated/locales/ru.json": async () => { throw new Error("Offline"); } }, english)).init({ resources: { en: { translation: english } }, partialBundledLanguages: true, fallbackLng: "en", lng: "ru", supportedLngs: ["en", "ru"], ns: ["translation"], defaultNS: "translation" });
assert.equal(unavailable.t("design.viewTour"), english.design.viewTour, "A failed dictionary request must leave readable fallback text");
assert.equal(unavailable.resolvedLanguage, "en");

const images = await json("src/generated/image-manifest.json");
const helperSource = (await readFile(resolve(root, "src/lib/responsive-images.js"), "utf8")).replace(/^import manifest[^\n]+\n/, "");
const { responsiveImage } = await import(`data:text/javascript,${encodeURIComponent(`const manifest = ${JSON.stringify(images)};\n${helperSource}`)}`);
let imageChecks = 0;
for (const url of Object.keys(images)) {
  const delivery = responsiveImage(url);
  assert.ok(delivery.width > 0 && delivery.height > 0);
  assert.ok(!delivery.srcSet.includes("undefined"));
  for (const candidate of delivery.srcSet.split(", ")) {
    const [path, width] = candidate.split(" ");
    assert.ok(Number.parseInt(width) <= 1920);
    assert.ok((await stat(resolve(root, "public", "." + path))).size > 0, `Missing responsive asset ${path}`);
    assert.ok((await stat(resolve(root, "dist", "." + path))).size > 0, `Responsive asset omitted from production ${path}`);
  }
  imageChecks++;
}
assert.deepEqual(responsiveImage("https://example.com/photo.jpg"), { src: "https://example.com/photo.jpg" });

const manifest = await json("dist/.vite/manifest.json");
const entry = Object.keys(manifest).find((key) => manifest[key].isEntry);
assert.ok(entry);
const initial = new Set();
function collect(key) {
  if (initial.has(key)) return;
  initial.add(key);
  for (const dependency of manifest[key].imports || []) collect(dependency);
}
collect(entry);
let startupJsBytes = 0;
let startupJsGzipBytes = 0;
const css = new Set();
for (const key of initial) {
  const item = manifest[key];
  const file = await readFile(resolve(root, "dist", item.file));
  startupJsBytes += file.length;
  startupJsGzipBytes += gzipSync(file).length;
  for (const path of item.css || []) css.add(path);
  assert.ok(!/locales\/(ru|uz|es|fr|it|zh)\.json|ChatPanel|MapView/.test(key), `Noncritical code became eager: ${key}`);
}
for (const language of languages.filter((language) => language !== "en")) assert.ok(Object.keys(manifest).some((key) => key.endsWith(`locales/${language}.json`) && !initial.has(key)), `Missing deferred locale ${language}`);
const startupCssBytes = (await Promise.all([...css].map(async (path) => (await stat(resolve(root, "dist", path))).size))).reduce((total, size) => total + size, 0);
const baseline = await json(".impeccable/review/performance-baseline.json");
assert.ok(startupJsBytes < baseline.startupJsBytes, "Startup JavaScript must shrink");
const assets = await json(".impeccable/review/performance-assets.json");
const report = {
  measured: "Production file sizes, not a browser timing or Lighthouse score",
  before: baseline,
  after: { startupJsBytes, startupJsGzipBytes, startupCssBytes },
  checks: { crossLanguageTourUrls: routeChecks, responsivePhotos: imageChecks, interfaceLanguages: languages.length },
  keyImages: assets.images.filter((image) => ["/iStock-1249451586.jpg", "/data/images/samarqand/registan_square.png"].includes(image.url)),
  englishCatalog: assets.data.filter((item) => item.language === "en"),
};
await writeFile(resolve(root, ".impeccable/review/performance-results.json"), JSON.stringify(report, null, 2));
console.log(`${routeChecks} cross-language tour URL checks, ${imageChecks} responsive photos, and ${languages.length} async language switches passed.`);
console.log(`Startup JavaScript: ${baseline.startupJsBytes} → ${startupJsBytes} bytes; gzip ${baseline.startupJsGzipBytes} → ${startupJsGzipBytes}. CSS: ${baseline.startupCssBytes} → ${startupCssBytes} bytes.`);
console.log("Detailed measurements: .impeccable/review/performance-results.json");
if (process.argv.includes("--preview")) {
  const hero = responsiveImage("/iStock-1249451586.jpg");
  const checks = [
    ["/", "text/html"], ["/tours/t_pearls_uzbekistan_11d", "text/html"],
    ["/data/optimized/tours.en.json", "application/json"], ["/data/optimized/destination.ru.json", "application/json"],
    [hero.src, "image/webp"], ["/" + manifest[entry].file, "text/javascript"],
  ];
  for (const [path, type] of checks) {
    const response = await fetch("http://127.0.0.1:5175" + path);
    assert.equal(response.status, 200, path);
    assert.ok(response.headers.get("content-type").startsWith(type), `Wrong response type for ${path}`);
    assert.ok((await response.arrayBuffer()).byteLength > 0);
  }
  console.log("Local production HTTP checks: six routes/resources passed; no forms submitted.");
}
