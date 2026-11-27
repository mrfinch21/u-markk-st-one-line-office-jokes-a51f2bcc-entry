// One-Line Office Jokes
// Entry program: writes one office joke to /output/entry.txt.
// Sealed gate (RULES.txt): UTF-8 text of 1-199 characters, not only whitespace.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I replied-all asking to be removed from the thread, and now the thread is forty people replying-all to ask to be removed from the thread.";
const OUT = "/output/entry.txt";

const len = [...LINE].length;
if (len < 1 || len > 199) {
  throw new Error(`entry length ${len} outside sealed gate 1-199`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is whitespace-only");
}
// One line, no embedded newline; no leading/trailing whitespace.
if (/[\n\r]/.test(LINE)) {
  throw new Error("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry has leading/trailing whitespace");
}
// One sentence: exactly one sentence-ending mark, at the very end.
const enders = (LINE.match(/[.!?]/g) || []).length;
if (enders !== 1 || !LINE.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, LINE, "utf8");

const back = readFileSync(OUT, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch");
}
console.log(`wrote ${OUT} (${len} chars)`);
