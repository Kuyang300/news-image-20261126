// news-image-20261126 v2: decodes entry.b64.txt and writes /output/entry.png.
// Node 22 standard library only; all paths resolve from this file's location.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const b64 = readFileSync(join(here, "entry.b64.txt"), "utf8").trim();
const bytes = Buffer.from(b64, "base64");
if (bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
  throw new Error("entry.b64.txt is not a JPEG");
}
if (bytes.length > 1024 * 1024) {
  throw new Error("entry image exceeds 1 MiB");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.png"), bytes);
// v2 image: 50 stories, verified Thursday 26 November 2026.
