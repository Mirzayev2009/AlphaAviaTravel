// Local-only preview with controlled API responses. Never forwards an inquiry.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const directory = resolve(import.meta.dirname, "../dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
createServer(async (request, response) => {
  const url = new URL(request.url, "http://127.0.0.1:5175");
  if (url.pathname.startsWith("/api/")) {
    response.setHeader("Content-Type", "application/json");
    if (url.pathname === "/api/opinions") { response.end("[]"); return; }
    if (url.pathname === "/api/registrations" && request.method === "POST") {
      let body = "";
      for await (const chunk of request) body += chunk;
      const payload = JSON.parse(body);
      if (payload.name === "Failure QA") { response.statusCode = 503; response.end(JSON.stringify({ success: false })); return; }
      response.statusCode = 201;
      response.end(JSON.stringify({ success: true, data: { ...payload, id: "local-preview-only" } }));
      return;
    }
    response.statusCode = 404; response.end("{}"); return;
  }
  let path = resolve(directory, "." + decodeURIComponent(url.pathname));
  if (!path.startsWith(directory + sep)) path = resolve(directory, "index.html");
  try { if ((await stat(path)).isDirectory()) path = resolve(path, "index.html"); }
  catch { path = resolve(directory, "index.html"); }
  try { const contents = await readFile(path); response.setHeader("Content-Type", types[extname(path)] || "application/octet-stream"); response.end(contents); }
  catch { response.statusCode = 404; response.end("Not found"); }
}).listen(5175, "127.0.0.1", () => console.log("Local review: http://localhost:5175 (inquiries stay local)"));
