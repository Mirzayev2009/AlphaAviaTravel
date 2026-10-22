// Local browser fixture: serve the production app with a deliberately late
// optional loader chunk. No application code or responses are instrumented.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "../../dist");
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
const servers = [];
for (const [port, delay] of [[4174, 1500], [4175, 2100], [4176, 3000]]) {
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname);
      const path = resolve(root, `.${pathname}`);
      if (path !== root && !path.startsWith(root + sep)) {
        response.writeHead(403).end();
        return;
      }
      const file = extname(path) ? path : resolve(root, "index.html");
      const data = await readFile(file);
      if (/JourneyLoaderMotion-[^/]+\.js$/.test(file)) {
        await new Promise((resolveDelay) => setTimeout(resolveDelay, delay));
      }
      response.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
      response.end(data);
    } catch {
      response.writeHead(404).end();
    }
  });
  server.listen(port, "127.0.0.1", () => console.log(`Startup fixture ${port}: loader motion chunk delayed ${delay}ms`));
  servers.push(server);
}
process.on("SIGINT", () => { for (const server of servers) server.close(); });
