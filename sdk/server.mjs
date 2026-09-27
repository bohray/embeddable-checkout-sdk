import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const PORT = 4000;
const DIST_DIR = new URL("./dist/", import.meta.url);

const mimeTypes = {
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
};

const server = createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/checkout-sdk.js") {
    try {
      const file = await readFile(new URL("./checkout-sdk.js", DIST_DIR));

      res.writeHead(200, {
        "Content-Type": "application/javascript",
      });

      res.end(file);
      return;
    } catch {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`SDK server running at http://localhost:${PORT}`);
});
