import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { photoGeometry } from "../src/lib/photo-geometry.js";
import { bindCarouselPlayback } from "../src/lib/carousel-playback.js";

class Surface {
  hidden = false;
  listeners = new Map();
  matches() { return false; }
  addEventListener(type, handler) { this.listeners.set(type, handler); }
  removeEventListener(type, handler) { if (this.listeners.get(type) === handler) this.listeners.delete(type); }
  emit(type) { this.listeners.get(type)?.(); }
}

function playback(options = {}) {
  const element = new Surface();
  const page = new Surface();
  let observer;
  class Observer {
    constructor(callback) { this.callback = callback; observer = this; }
    observe(target) { assert.equal(target, element); }
    disconnect() { this.disconnected = true; }
    enter(visible) { this.callback([{ isIntersecting: visible, intersectionRatio: visible ? 1 : 0 }]); }
  }
  const autoplay = { running: false, starts: 0, start() { this.running = true; this.starts++; }, stop() { this.running = false; } };
  const swiper = { autoplay, destroyed: false };
  const cleanup = bindCarouselPlayback(element, swiper, { document: page, Observer, ...options });
  return { element, page, observer, autoplay, swiper, cleanup };
}

const active = playback();
assert.equal(active.autoplay.running, true);
active.observer.enter(false);
assert.equal(active.autoplay.running, false, "Offscreen carousel must stop");
active.page.hidden = true;
active.observer.enter(true);
assert.equal(active.autoplay.running, false, "Returning to view must not start in a hidden tab");
active.page.hidden = false;
active.page.emit("visibilitychange");
assert.equal(active.autoplay.running, true);
active.element.emit("mouseenter");
assert.equal(active.autoplay.running, false, "Pointer hover must pause playback");
active.element.emit("mouseleave");
assert.equal(active.autoplay.running, true);
const starts = active.autoplay.starts;
active.page.emit("visibilitychange");
assert.equal(active.autoplay.starts, starts, "Unchanged visibility must not restart the timer");
active.cleanup();
assert.equal(active.autoplay.running, false);
assert.equal(active.observer.disconnected, true);
assert.equal(active.element.listeners.size + active.page.listeners.size, 0, "Unmount must release every listener");

for (const options of [{ paused: true }, { reduceMotion: true }]) {
  const inactive = playback(options);
  inactive.observer.enter(false);
  inactive.observer.enter(true);
  inactive.element.emit("mouseleave");
  assert.equal(inactive.autoplay.running, false, "Visibility changes must preserve an intentional pause or reduced motion");
  inactive.cleanup();
}
const touch = playback({ hoverCapable: false });
touch.element.emit("mouseenter");
assert.equal(touch.autoplay.running, true, "Synthetic touch hover must not control playback");
touch.cleanup();
const destroyed = playback();
destroyed.swiper.destroyed = true;
delete destroyed.swiper.autoplay;
destroyed.observer.enter(false);
destroyed.page.emit("visibilitychange");
assert.doesNotThrow(destroyed.cleanup, "Swiper may be destroyed before React effect cleanup during reload or navigation");
assert.equal(destroyed.element.listeners.size + destroyed.page.listeners.size, 0);

// Verify endpoints, crop compensation, and invalid geometry without browser stubs.
const source = { left: 28, top: 90, width: 320, height: 240 };
const target = { left: 100, top: 70, width: 900, height: 500 };
for (const p of [0, .25, .5, .75, 1]) {
  const frame = photoGeometry(source, target, p);
  assert(Math.abs(frame.sx * frame.imageX - frame.sy * frame.imageY) < 1e-10, "A photograph must retain its aspect ratio throughout expansion");
}
const begin = photoGeometry(source, target, 0);
assert.equal(target.left + begin.x, source.left);
assert.equal(target.top + begin.y, source.top);
assert.equal(target.width * begin.sx, source.width);
assert.equal(target.height * begin.sy, source.height);
assert.deepEqual(photoGeometry(source, target, 1), { x: 0, y: 0, sx: 1, sy: 1, imageX: 1, imageY: 1 });
assert.equal(photoGeometry({ ...source, width: 0 }, target, .5), null);
assert.equal(photoGeometry(null, target, .5), null);

const reportPath = ".impeccable/review/motion-performance.json";
const report = JSON.parse(await readFile(reportPath, "utf8"));
const manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
const entry = Object.keys(manifest).find((key) => manifest[key].isEntry);
const initial = new Set();
function visit(key) {
  if (initial.has(key)) return;
  initial.add(key);
  for (const child of manifest[key]?.imports || []) visit(child);
}
visit(entry);
assert(![...initial].some((key) => /ChatPanel|FloatingChat|MapView|SiteMotion/.test(key)), "Chat, map, and optional motion must stay outside the initial JavaScript graph");
const files = [...initial].map((key) => manifest[key].file).filter((file) => file.endsWith(".js"));
const buffers = await Promise.all(files.map((file) => readFile("dist/" + file)));
report.reworkBefore ||= { rawBytes: 681596, gzipBytes: 222697 };
report.approvedInitialGzipBudget = 222697;
report.after = { rawBytes: buffers.reduce((total, data) => total + data.length, 0), gzipBytes: buffers.reduce((total, data) => total + gzipSync(data).length, 0), files };
assert(report.after.gzipBytes <= report.approvedInitialGzipBudget, "The motion rework must meet its approved initial JavaScript budget");
const motionEntry = Object.keys(manifest).find((key) => /SiteMotion/.test(key));
const deferred = new Set();
function visitMotion(key) { if (initial.has(key) || deferred.has(key)) return; deferred.add(key); for (const child of manifest[key]?.imports || []) visitMotion(child); }
visitMotion(motionEntry);
const motionFiles = [...deferred].map((key) => manifest[key].file).filter((file) => file.endsWith(".js"));
const motionBuffers = await Promise.all(motionFiles.map((file) => readFile("dist/" + file)));
report.deferredMotion = { rawBytes: motionBuffers.reduce((n, data) => n + data.length, 0), gzipBytes: motionBuffers.reduce((n, data) => n + gzipSync(data).length, 0), files: motionFiles };
report.startupIncludingDeferredMotion = { rawBytes: report.after.rawBytes + report.deferredMotion.rawBytes, gzipBytes: report.after.gzipBytes + report.deferredMotion.gzipBytes };
report.saved = { rawBytes: report.before.rawBytes - report.after.rawBytes, gzipBytes: report.before.gzipBytes - report.after.gzipBytes };
await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n");
console.log("Motion checks passed: offscreen/hidden/hover pause, manual pause, reduced motion, touch behavior, listener cleanup, lazy chat/map/motion, and undistorted photo geometry.");
console.log(`Initial JavaScript: ${report.before.rawBytes.toLocaleString()} → ${report.after.rawBytes.toLocaleString()} bytes; gzip ${report.before.gzipBytes.toLocaleString()} → ${report.after.gzipBytes.toLocaleString()} bytes.`);
