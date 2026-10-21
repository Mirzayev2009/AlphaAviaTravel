import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { build } from "esbuild";
import { createChatSession } from "../src/lib/chat-session.js";

const context = { language: "en", page: "/tours" };
const deferred = () => { let finish; const promise = new Promise((done) => { finish = done; }); return { promise, finish }; };

const response = deferred();
let calls = 0;
const session = createChatSession(async () => { calls++; return response.promise; });
session.setDraft("First question");
const pending = session.send("First question", context);
assert.equal(session.getSnapshot().status, "loading");
await session.send("Duplicate click", context);
assert.equal(calls, 1, "A pending request must not be submitted twice");
session.setDraft("Next question");
response.finish("First answer");
await pending;
assert.equal(session.getSnapshot().draft, "Next question", "Typing while waiting must survive the reply");
assert.equal(session.getSnapshot().messages.length, 2);
let lastNotification;
const unsubscribe = session.subscribe(() => { lastNotification = session.getSnapshot(); });
session.setDraft("Reopened draft");
unsubscribe();
assert.equal(lastNotification.draft, "Reopened draft", "Conversation state is independent of a mounted view");

let attempts = 0;
const retry = createChatSession(async (_text, history) => {
  attempts++;
  if (attempts === 1) throw new Error("Offline");
  assert.equal(history.length, 0, "Retry must not duplicate the unanswered user turn");
  return "Recovered answer";
});
await retry.send("Try this", context);
assert.equal(retry.getSnapshot().status, "error");
assert.equal(retry.getSnapshot().messages.length, 1);
await retry.retry(context);
assert.equal(retry.getSnapshot().messages.length, 2);
assert.equal(retry.getSnapshot().status, "idle");

const stoppedReply = deferred();
let signal;
const stopped = createChatSession(async (_text, _history, _language, _page, requestSignal) => { signal = requestSignal; return stoppedReply.promise; });
const stoppedRequest = stopped.send("Stop this", context);
stopped.setDraft("Keep my draft");
stopped.stop();
assert.ok(signal.aborted);
stoppedReply.finish("Late response");
await stoppedRequest;
assert.equal(stopped.getSnapshot().status, "stopped");
assert.equal(stopped.getSnapshot().messages.length, 1, "A late cancelled answer must not appear");
assert.equal(stopped.getSnapshot().draft, "Keep my draft");

const oldReply = deferred();
const reset = createChatSession(async () => oldReply.promise);
const oldRequest = reset.send("Old conversation", context);
reset.reset();
oldReply.finish("Stale answer");
await oldRequest;
assert.deepEqual(reset.getSnapshot().messages, [], "A reset must reject replies from its previous conversation");

const late = deferred();
const timed = createChatSession(async () => late.promise, { timeout: 5 });
const timedRequest = timed.send("Slow question", context);
await new Promise((done) => setTimeout(done, 15));
assert.equal(timed.getSnapshot().status, "error", "Timeout must recover even if a provider ignores cancellation");
late.finish("Too late");
await timedRequest;
assert.equal(timed.getSnapshot().messages.length, 1);

const root = resolve(import.meta.dirname, "..");
const compiled = await build({ entryPoints: [resolve(root, "src/components/ChatMessage.jsx")], bundle: true, platform: "node", format: "cjs", packages: "external", jsx: "automatic", write: false });
const module = { exports: {} };
new Function("require", "module", "exports", compiled.outputFiles[0].text)(createRequire(import.meta.url), module, module.exports);
const html = renderToStaticMarkup(createElement(MemoryRouter, null, createElement(module.exports.default, { text: "## Route\n\n**Samarkand**\n- First stop\n- Second stop\n\n1. Arrival\n2. Depart\n\n[tours](/tours) [unsafe](javascript:alert) <script>alert(1)</script>" })));
assert.ok(html.includes("<strong>Samarkand</strong>"));
assert.ok(html.includes("<ul>") && html.includes("<ol>"));
assert.ok(html.includes('href="/tours"'));
assert.ok(!html.includes('href="javascript:') && !html.includes("<script>"), "Model output must never become executable HTML");

const translations = JSON.parse(await readFile(resolve(root, "src/i18n/design.json"), "utf8"));
const keys = Object.keys(translations.en).filter((key) => key.startsWith("chat"));
for (const language of ["en", "ru", "uz", "es", "fr", "it", "zh"]) for (const key of keys) assert.ok(typeof translations[language][key] === "string" && translations[language][key].trim(), `${language}: ${key}`);
console.log("Chat checks passed: drafts, duplicate submits, retry history, cancellation, reset races, timeout recovery, safe formatting, and seven-language text.");
