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

function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }

const outRoot = path.join(__dirname, "..", "site", "questions");
let grand = 0;
const summary = [];

for (const chapter of G.topics) {
  const dir = path.join(outRoot, chapter);
  fs.mkdirSync(dir, { recursive: true });
  const tiers = G.genTiers(chapter); // [ mediumFns, hardFns, challengeFns ]
  for (let level = 1; level <= 3; level++) {
    const templates = tiers[level - 1];
    // BALANCED: collect roughly equal questions from EACH template so no single
    // template can dominate the pool (templates with more number-combos used to backfill).
    const perTemplate = Math.ceil(PER_POOL / templates.length);
    const seen = new Set();
    const out = [];
    for (const fn of templates) {
      let count = 0, guard = 0;
      while (count < perTemplate && guard < perTemplate * 300) {
        const q = fn();
        if (!seen.has(q.q)) { seen.add(q.q); out.push(toSchema(q)); count++; }
        guard++;
      }
    }
    shuffle(out); // mix templates together
    const file = path.join(dir, LEVEL_NAME[level] + ".json");
    fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
    grand += out.length;
    summary.push(chapter.padEnd(12) + " " + LEVEL_NAME[level].padEnd(12) + out.length + " (" + templates.length + " templates × ~" + perTemplate + ")");
  }
}

console.log(summary.join("\n"));
console.log("\nTotal questions written:", grand);
