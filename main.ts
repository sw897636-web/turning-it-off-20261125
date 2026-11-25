// Have You Tried Turning It Off? — make.fun bounty entry.
// Writes one funny single-line reply from a hopeless tech support agent
// to a desperate customer, deterministically, to /output/entry.txt
// (falls back to ./output/entry.txt when /output is unavailable).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "Okay Linda, you've unplugged it 6 times, so I'm escalating your ticket to Tier 2, which is me, standing up. If Tier 2 fails, Tier 3 is me standing up near a window.";

function main(): void {
  const targets = [
    process.env.ENTRY_OUTPUT,
    "/output/entry.txt",
    "output/entry.txt",
  ].filter((t): t is string => Boolean(t));
  let lastError: unknown;
  for (const target of targets) {
    try {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, ENTRY, "utf8");
      return;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

main();
