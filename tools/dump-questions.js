/* Builds the static JSON question pools from the per-chapter template modules
   in tools/templates/<chapter>.js (each exports [ mediumFns, hardFns, challengeFns ]).
   - BALANCED: equal share from each template so none dominates.
   - TAGGED: every question carries a "tpl" id so the test builder can cap how many
     come from the same template (goal: <=2 of any template in a 20-question test).
   Output: site/questions/<chapter>/<medium|hard|challenging>.json
   Run: node tools/dump-questions.js
*/
const fs = require("fs");
const path = require("path");

const CHAPTERS = ["fractions", "integers", "order", "ratios", "exponents", "equations", "graphing", "numbertheory", "patterns", "geometry", "data"];
const LEVEL_NAME = { 1: "medium", 2: "hard", 3: "challenging" };
const PER_POOL = 72; // ~6 per template across ~12 templates

function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }

function toSchema(q, tpl) {
  const base = q.type === "mc"
    ? { q: q.q, type: "mc", choices: q.choices, answer: q.answer, solution: q.explain }
    : { q: q.q, type: "typed", accept: q.accept, solution: q.explain };
  base.tpl = tpl;
  return base;
}

const outRoot = path.join(__dirname, "..", "site", "questions");
let grand = 0;
const summary = [];

for (const chapter of CHAPTERS) {
  const tiers = require(path.join(__dirname, "templates", chapter + ".js")); // [ medium[], hard[], challenge[] ]
  const dir = path.join(outRoot, chapter);
  fs.mkdirSync(dir, { recursive: true });
  for (let level = 1; level <= 3; level++) {
    const templates = tiers[level - 1];
    const perTemplate = Math.ceil(PER_POOL / templates.length);
    const seen = new Set();
    const out = [];
    templates.forEach((fn, idx) => {
      const tpl = chapter + ":" + LEVEL_NAME[level] + ":" + idx;
      let count = 0, guard = 0;
      while (count < perTemplate && guard < perTemplate * 300) {
        const q = fn();
        if (!seen.has(q.q)) { seen.add(q.q); out.push(toSchema(q, tpl)); count++; }
        guard++;
      }
    });
    shuffle(out);
    const file = path.join(dir, LEVEL_NAME[level] + ".json");
    fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
    grand += out.length;
    summary.push(chapter.padEnd(13) + LEVEL_NAME[level].padEnd(12) + out.length + " (" + templates.length + " templates)");
  }
}

console.log(summary.join("\n"));
console.log("\nTotal questions written:", grand);
