// Keep original photography/content intact; generate delivery-sized assets before Vite starts.
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const publicRoot = resolve(root, "public");
const output = resolve(publicRoot, "data/optimized");
const generated = resolve(root, "src/generated");
const languages = ["en", "ru", "uz", "es", "fr", "it", "zh"];
const widths = [480, 960, 1600, 1920];
await Promise.all([mkdir(resolve(output, "images"), { recursive: true }), mkdir(resolve(generated, "locales"), { recursive: true })]);

// Preserve unchanged imports so a build cannot spuriously reload the dev app.
async function writeChanged(path, content) {
  let previous;
  try { previous = await readFile(path, "utf8"); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
  if (previous !== content) await writeFile(path, content);
}

async function filesIn(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name !== "optimized") files.push(...await filesIn(resolve(directory, entry.name)));
    else if (entry.isFile() && /\.(jpe?g|png|webp|avif)$/i.test(entry.name)) files.push(resolve(directory, entry.name));
  }
  return files;
}

const manifest = {};
const metrics = [];
const converted = new Map();
// Bound decoding/encoding concurrency: source photos include a 41 MB PNG.
sharp.concurrency(2);
for (const path of await filesIn(publicRoot)) {
  const original = await readFile(path);
  const hash = createHash("sha256").update("webp-v1-q80-").update(original).digest("hex").slice(0, 16);
  const url = "/" + relative(publicRoot, path).split(sep).join("/");
  let result = converted.get(hash);
  if (!result) {
    const metadata = await sharp(original).metadata();
    const sourceWidth = [5, 6, 7, 8].includes(metadata.orientation) ? metadata.height : metadata.width;
    const targets = [...new Set(widths.map((width) => Math.min(width, sourceWidth)))];
    const variants = [];
    for (const width of targets) {
      const name = `${hash}-${width}.webp`;
      const target = resolve(output, "images", name);
      let info;
      try { info = await stat(target); }
      catch { await sharp(original).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80, effort: 4 }).toFile(target); info = await stat(target); }
      variants.push({ src: `/data/optimized/images/${name}`, width, bytes: info.size });
    }
    const largest = variants.at(-1);
    result = {
      image: [hash, sourceWidth, [5, 6, 7, 8].includes(metadata.orientation) ? metadata.width : metadata.height, targets],
      variants,
      largestBytes: largest.bytes,
    };
    converted.set(hash, result);
  }
  manifest[url] = result.image;
  metrics.push({ url, originalBytes: original.length, variants: result.variants });
}
await writeChanged(resolve(generated, "image-manifest.json"), JSON.stringify(manifest));

const dataMetrics = [];
function selectLanguage(value, language) {
  if (!value || Array.isArray(value) || typeof value !== "object") return value;
  if (Object.hasOwn(value, "en") && Object.keys(value).every((key) => languages.includes(key))) {
    return Object.fromEntries(Object.entries(value).filter(([key]) => key === language || key === "en"));
  }
  return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, selectLanguage(child, language)]));
}
for (const file of ["tours", "destination", "hotel", "transport", "team"]) {
  const original = await readFile(resolve(publicRoot, `data/${file}.json`), "utf8");
  const source = JSON.parse(original);
  for (const language of languages) {
    const localized = selectLanguage(source, language);
    const json = JSON.stringify(localized);
    await writeChanged(resolve(output, `${file}.${language}.json`), json);
    dataMetrics.push({ file, language, originalBytes: Buffer.byteLength(original), optimizedBytes: Buffer.byteLength(json) });
  }
}
const design = JSON.parse(await readFile(resolve(root, "src/i18n/design.json"), "utf8"));
for (const language of languages) {
  const dictionary = JSON.parse(await readFile(resolve(root, `src/i18n/${language}.json`), "utf8"));
  await writeChanged(resolve(generated, `locales/${language}.json`), JSON.stringify({ ...dictionary, design: design[language] }));
}
await mkdir(resolve(root, ".impeccable/review"), { recursive: true });
await writeChanged(resolve(root, ".impeccable/review/performance-assets.json"), JSON.stringify({ images: metrics, data: dataMetrics }, null, 2));
const originalBytes = metrics.reduce((total, item) => total + item.originalBytes, 0);
const deliveredBytes = metrics.reduce((total, item) => total + item.variants.at(-1).bytes, 0);
console.log(`Prepared ${metrics.length} responsive photos: ${(originalBytes / 1e6).toFixed(1)} MB original → ${(deliveredBytes / 1e6).toFixed(1)} MB at their largest delivery size.`);
console.log("Prepared language-specific catalogs and seven on-demand interface dictionaries.");
