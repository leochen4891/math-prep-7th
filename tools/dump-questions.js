/* Dumps the validated question generators into static JSON pools.
   Output: site/questions/<chapter>/<level>.json
   Levels: 1→medium, 2→hard, 3→challenging
   Run: node tools/dump-questions.js
*/
const fs = require("fs");
const path = require("path");

global.window = {};
global.TOPICS = []; // titleFor() will just return "" — fine for dumping
require(path.join(__dirname, "..", "site", "js", "generators.js"));
const G = global.window.MathGen;

const LEVEL_NAME = { 1: "medium", 2: "hard", 3: "challenging" };
const PER_POOL = 60; // try to collect up to this many unique questions per pool

function toSchema(q) {
  if (q.type === "mc") return { q: q.q, type: "mc", choices: q.choices, answer: q.answer, solution: q.explain };
  return { q: q.q, type: "typed", accept: q.accept, solution: q.explain };
}

const outRoot = path.join(__dirname, "..", "site", "questions");
let grand = 0;
const summary = [];

for (const chapter of G.topics) {
  const dir = path.join(outRoot, chapter);
  fs.mkdirSync(dir, { recursive: true });
  for (let level = 1; level <= 3; level++) {
    const seen = new Set();
    const out = [];
    let guard = 0;
    while (out.length < PER_POOL && guard < PER_POOL * 80) {
      const q = G.questionForTopic(chapter, level);
      if (!seen.has(q.q)) { seen.add(q.q); out.push(toSchema(q)); }
      guard++;
    }
    const file = path.join(dir, LEVEL_NAME[level] + ".json");
    fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
    grand += out.length;
    summary.push(chapter.padEnd(12) + " " + LEVEL_NAME[level].padEnd(12) + " " + out.length);
  }
}

console.log(summary.join("\n"));
console.log("\nTotal questions written:", grand);
