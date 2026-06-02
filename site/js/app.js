/* ====== Math Placement Prep — app logic ====== */

const app = document.getElementById("app");

/* ---------- Progress saved in the browser (no server needed) ---------- */
const STORE_KEY = "mathprep_best_v1";
function loadBest() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch (e) { return {}; }
}
function saveBest(topicId, score, total) {
  const best = loadBest();
  const prev = best[topicId]?.score ?? -1;
  if (score > prev) best[topicId] = { score, total };
  localStorage.setItem(STORE_KEY, JSON.stringify(best));
}

/* ---------- Countdown to the test ---------- */
function renderCountdown() {
  const el = document.getElementById("countdown");
  const test = new Date(TEST_DATE + "T08:00:00");
  const now = new Date();
  const days = Math.ceil((test - now) / (1000 * 60 * 60 * 24));
  if (days > 1) el.textContent = `📅 ${days} days until the test`;
  else if (days === 1) el.textContent = `📅 Test is tomorrow!`;
  else if (days === 0) el.textContent = `⭐ Test is today — you've got this!`;
  else el.textContent = `🎉 Test day has passed`;
}

/* ---------- Answer checking for typed questions ---------- */
function normalize(s) {
  return String(s).trim().toLowerCase()
    .replace(/\s+/g, "")        // remove spaces
    .replace(/[$°]/g, "")       // remove $ and degree
    .replace(/−/g, "-");        // unify minus signs
}
function checkTyped(input, accept) {
  const a = normalize(input);
  return accept.some(ok => normalize(ok) === a);
}

/* ======================= SCREENS ======================= */

function screenHome() {
  const best = loadBest();
  const cards = TOPICS.map(t => {
    let bestPct = null, bestLvl = null;
    [1, 2, 3].forEach(lvl => {
      const b = best[t.id + ":" + LEVELS[lvl].key];
      if (b) { const p = Math.round((b.score / b.total) * 100); if (bestPct === null || p > bestPct) { bestPct = p; bestLvl = lvl; } }
    });
    const done = bestPct !== null && bestPct >= 80;
    return `
      <div class="topic-card" data-topic="${t.id}">
        ${done ? '<div class="done-badge">✅</div>' : ''}
        <div class="emoji">${t.emoji}</div>
        <div class="day">Chapter ${t.day}</div>
        <h3>${t.title}</h3>
        <div class="progress-wrap"><div class="progress-bar" style="width:${bestPct || 0}%"></div></div>
        <div class="best">${bestPct !== null ? `Best: ${bestPct}% (${LEVELS[bestLvl].name})` : "Not tried yet"}</div>
      </div>`;
  }).join("");

  app.innerHTML = `
    <section class="hero">
      <div style="font-size:46px">🚀📘</div>
      <h1>Math Placement Prep</h1>
      <p>Seven chapters. Each has a full lesson and a 20-question test — choose your level: 🟢 Medium, 🟠 Hard, or 🔴 Challenging.</p>
    </section>
    <h2 style="margin:18px 6px 8px">Chapters</h2>
    <div class="grid">${cards}</div>
    <div class="center" style="margin-top:24px">
      <button class="btn ghost" id="resetBtn" style="font-size:14px">🗑️ Reset my progress</button>
      <div id="resetConfirm"></div>
    </div>
  `;

  const rb = document.getElementById("resetBtn");
  if (rb) rb.addEventListener("click", () => {
    document.getElementById("resetConfirm").innerHTML = `
      <div class="card" style="max-width:380px;margin:12px auto 0">
        <p style="margin:0 0 12px"><b>Erase all your saved scores?</b><br><span class="muted">This clears every chapter's best score and the ✅ checkmarks. It can't be undone.</span></p>
        <div class="row">
          <button class="btn" id="resetYes" style="background:var(--bad)">Yes, reset</button>
          <button class="btn secondary" id="resetNo">Cancel</button>
        </div>
      </div>`;
    document.getElementById("resetYes").addEventListener("click", () => { localStorage.removeItem(STORE_KEY); screenHome(); });
    document.getElementById("resetNo").addEventListener("click", () => { document.getElementById("resetConfirm").innerHTML = ""; });
  });

  app.querySelectorAll("[data-topic]").forEach(el =>
    el.addEventListener("click", () => screenTopic(el.getAttribute("data-topic"))));
}

function screenTopic(id) {
  const t = TOPICS.find(x => x.id === id);
  app.innerHTML = `
    <div class="back" data-go="home">← Back to all chapters</div>
    <div class="card lesson">${t.lesson}</div>
    <div class="row">
      <button class="btn big" id="startTestBtn">✏️ Take the ${t.title} Test →</button>
    </div>
    <p class="center muted mt">You'll pick a difficulty (Medium / Hard / Challenging), then get 20 questions you can navigate and submit.</p>
  `;
  document.getElementById("startTestBtn").addEventListener("click", () => screenChooseLevel(id));
  wireBack();
}

/* ---------- Difficulty chooser + question loading ---------- */
const GH_QUESTIONS = "https://raw.githubusercontent.com/leochen4891/math-prep-7th/main/site/questions";

async function fetchJSON(url, ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctrl.signal, cache: "no-store" });
    clearTimeout(timer);
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { clearTimeout(timer); return null; }
}
// Live from GitHub first (latest merged PRs), then the bundled copy (works offline).
async function fetchPool(chapter, levelKey) {
  let data = await fetchJSON(GH_QUESTIONS + "/" + chapter + "/" + levelKey + ".json", 4500);
  if (!Array.isArray(data) || !data.length)
    data = await fetchJSON("questions/" + chapter + "/" + levelKey + ".json", 8000);
  if (!Array.isArray(data) || !data.length) throw new Error("load failed");
  return data;
}
function mapPoolQ(raw, level) {
  const out = { type: raw.type, q: raw.q, explain: raw.solution || raw.explain || "", _level: level };
  if (raw.type === "mc") { out.choices = raw.choices; out.answer = raw.answer; }
  else { out.accept = raw.accept; }
  return out;
}
function pick20(pool, level) {
  return shuffleArr(pool).slice(0, Math.min(20, pool.length)).map(r => mapPoolQ(r, level));
}

function screenChooseLevel(chapterId) {
  const t = TOPICS.find(x => x.id === chapterId);
  const best = loadBest();
  const btn = (lvl) => {
    const L = LEVELS[lvl];
    const b = best[chapterId + ":" + L.key];
    const pct = b ? Math.round((b.score / b.total) * 100) : null;
    return `
      <button class="btn big level-btn" data-lvl="${lvl}" style="background:linear-gradient(135deg,${L.color},${L.color2})">
        <div class="level-row"><span>${L.emoji} ${L.name}</span><span class="level-best">${pct !== null ? "Best: " + pct + "%" : ""}</span></div>
        <div class="level-blurb">${L.blurb}</div>
      </button>`;
  };
  app.innerHTML = `
    <div class="back" id="backToTopic">← Back to the lesson</div>
    <section class="hero">
      <div style="font-size:42px">${t.emoji}</div>
      <h1>${t.title}</h1>
      <p>Choose a difficulty. You'll get <b>20 questions</b> — navigate freely and submit when ready.</p>
    </section>
    <div class="col">${[1, 2, 3].map(btn).join("")}</div>
  `;
  app.querySelectorAll("[data-lvl]").forEach(b => b.addEventListener("click", () => loadAndStartTest(chapterId, +b.dataset.lvl)));
  document.getElementById("backToTopic").addEventListener("click", () => screenTopic(chapterId));
  wireBack();
}

async function loadAndStartTest(chapterId, level) {
  const t = TOPICS.find(x => x.id === chapterId);
  const L = LEVELS[level];
  app.innerHTML = `
    <div class="back" data-go="home">← Quit</div>
    <div class="card center" style="padding:46px 20px">
      <div style="font-size:42px">⏳</div>
      <h3 style="margin:10px 0 4px">Loading ${L.name} questions…</h3>
      <p class="muted">${t.title}</p>
    </div>`;
  wireBack();
  let pool;
  try { pool = await fetchPool(chapterId, L.key); }
  catch (e) {
    app.innerHTML = `
      <div class="back" data-go="home">← Back</div>
      <div class="card center" style="padding:40px 20px">
        <div style="font-size:42px">😕</div>
        <h3>Couldn't load the questions</h3>
        <p class="muted">Check your internet connection, then try again.</p>
        <button class="btn mt" id="retryLoad">🔁 Try again</button>
      </div>`;
    document.getElementById("retryLoad").addEventListener("click", () => loadAndStartTest(chapterId, level));
    wireBack();
    return;
  }
  const makeSet = () => pick20(pool, level);
  startQuiz({ id: chapterId + ":" + L.key, chapter: chapterId, level, title: t.title, emoji: t.emoji, questions: makeSet(), regen: makeSet });
}

/* ---------- Quiz engine ---------- */
let quizState = null;

// A generic placeholder that NEVER reveals the answer.
// It only looks at the *shape* of the expected answer (fraction / decimal / number).
function safePlaceholder(q) {
  const a = (q.accept && q.accept[0]) ? String(q.accept[0]) : "";
  if (a.indexOf("/") !== -1) return "Type a fraction (like a/b)";
  if (a.indexOf(".") !== -1) return "Type a decimal";
  return "Type a number";
}

function shuffleArr(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// Shuffle multiple-choice options so the correct answer isn't always in the same spot.
function prepQuestion(q) {
  if (q.type !== "mc") return Object.assign({}, q);
  const correct = q.choices[q.answer];
  const choices = shuffleArr(q.choices);
  return Object.assign({}, q, { choices, answer: choices.indexOf(correct) });
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function answeredCount() {
  return quizState.answers.filter(a => a !== null && a !== "").length;
}
function saveCurrent() {
  const q = quizState.qs[quizState.i];
  if (q.type !== "mc") {
    const el = document.getElementById("typedAns");
    if (el) quizState.answers[quizState.i] = el.value;
  }
}
function updateMeta() {
  const pill = document.getElementById("answeredPill");
  if (pill) pill.textContent = answeredCount() + " / " + quizState.qs.length + " answered";
  app.querySelectorAll("[data-jump]").forEach(b => {
    const a = quizState.answers[+b.dataset.jump];
    b.classList.toggle("done", a !== null && a !== "" && a !== undefined);
  });
}

function startQuiz(topic) {
  const qs = topic.questions.map(prepQuestion);
  quizState = { topic, qs, i: 0, answers: new Array(qs.length).fill(null), score: 0 };
  renderQ();
}

function renderQ() {
  const { qs, i, answers } = quizState;
  const q = qs[i];
  const pct = Math.round(((i + 1) / qs.length) * 100);

  let answerArea = "";
  if (q.type === "mc") {
    answerArea = `<div class="choices">` + q.choices.map((c, idx) =>
      `<button class="choice ${answers[i] === idx ? "selected" : ""}" data-idx="${idx}">${c}</button>`).join("") + `</div>`;
  } else {
    const val = (answers[i] !== null && answers[i] !== undefined) ? escapeHtml(answers[i]) : "";
    answerArea = `
      <input class="answer-input" id="typedAns" type="text" autocomplete="off"
             placeholder="${safePlaceholder(q)}" value="${val}" />
      <div class="hint">Type your answer. Press <span class="kbd">Enter</span> for the next question.</div>`;
  }

  const palette = qs.map((_, idx) => {
    const a = answers[idx];
    const cls = (idx === i ? "cur " : "") + (a !== null && a !== "" && a !== undefined ? "done" : "");
    return `<button class="pal ${cls}" data-jump="${idx}">${idx + 1}</button>`;
  }).join("");

  app.innerHTML = `
    <div class="back" data-go="home">← Quit</div>
    <div class="quiz-head">
      <span class="qcount">Question ${i + 1} of ${qs.length}</span>
      <span class="score-pill" id="answeredPill">${answeredCount()} / ${qs.length} answered</span>
    </div>
    <div class="qbar-wrap"><div class="qbar" style="width:${pct}%"></div></div>
    <div style="margin-bottom:8px">
      ${q._level ? `<span class="score-pill" style="background:#fff;border:2px solid var(--line)">${LEVELS[q._level].emoji} ${LEVELS[q._level].name}</span>` : ""}
      ${q._topic ? `<span class="muted" style="font-size:13px;margin-left:6px">${q._topic}</span>` : ""}
    </div>
    <div class="card">
      <div class="question">${q.q}</div>
      ${answerArea}
    </div>
    <div class="palette">${palette}</div>
    <div class="row mt">
      <button class="btn secondary" id="prevBtn" ${i === 0 ? "disabled" : ""}>← Previous</button>
      <button class="btn secondary" id="nextBtn" ${i === qs.length - 1 ? "disabled" : ""}>Next →</button>
    </div>
    <button class="btn big mt" id="submitTestBtn" style="background:linear-gradient(135deg,var(--good),#00c2a8)">✅ Submit test</button>
    <div id="submitConfirm"></div>
  `;

  if (q.type === "mc") {
    app.querySelectorAll(".choice").forEach(btn => btn.addEventListener("click", () => {
      quizState.answers[i] = parseInt(btn.dataset.idx, 10);
      app.querySelectorAll(".choice").forEach(x => x.classList.remove("selected"));
      btn.classList.add("selected");
      updateMeta();
    }));
  } else {
    const input = document.getElementById("typedAns");
    input.addEventListener("input", () => { quizState.answers[i] = input.value; updateMeta(); });
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") { e.preventDefault(); saveCurrent(); if (quizState.i < qs.length - 1) { quizState.i++; renderQ(); } }
    });
    input.focus();
    const v = input.value; input.setSelectionRange(v.length, v.length);
  }

  document.getElementById("prevBtn").addEventListener("click", () => { saveCurrent(); if (quizState.i > 0) { quizState.i--; renderQ(); } });
  document.getElementById("nextBtn").addEventListener("click", () => { saveCurrent(); if (quizState.i < qs.length - 1) { quizState.i++; renderQ(); } });
  app.querySelectorAll("[data-jump]").forEach(b => b.addEventListener("click", () => { saveCurrent(); quizState.i = +b.dataset.jump; renderQ(); }));
  document.getElementById("submitTestBtn").addEventListener("click", trySubmit);
  wireBack();
}

function trySubmit() {
  saveCurrent();
  const un = quizState.answers.filter(a => a === null || a === "" || a === undefined).length;
  if (un > 0) {
    const box = document.getElementById("submitConfirm");
    box.innerHTML = `
      <div class="card center mt">
        <p style="margin:0 0 10px"><b>${un}</b> question${un > 1 ? "s" : ""} not answered yet. Submit anyway?</p>
        <div class="row">
          <button class="btn" id="subYes" style="background:var(--bad)">Submit anyway</button>
          <button class="btn secondary" id="subNo">Keep working</button>
        </div>
      </div>`;
    document.getElementById("subYes").addEventListener("click", gradeTest);
    document.getElementById("subNo").addEventListener("click", () => { box.innerHTML = ""; });
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    gradeTest();
  }
}

function gradeTest() {
  const { qs, answers } = quizState;
  let score = 0;
  const review = qs.map((q, idx) => {
    const a = answers[idx];
    let correct = false, userText = "(blank)";
    if (a !== null && a !== "" && a !== undefined) {
      if (q.type === "mc") { userText = q.choices[a]; correct = (a === q.answer); }
      else { userText = a; correct = checkTyped(a, q.accept); }
    }
    if (correct) score++;
    return { q, correct, userText, right: q.type === "mc" ? q.choices[q.answer] : q.accept[0] };
  });
  quizState.score = score;
  showTestResults(score, qs.length, review);
}

function showTestResults(score, total, review) {
  const topic = quizState.topic;
  const pct = Math.round((score / total) * 100);
  const chapterId = topic.chapter;
  if (chapterId) saveBest(topic.id, score, total);

  let emoji, msg;
  if (pct === 100) { emoji = "🏆"; msg = "PERFECT! You totally crushed it!"; }
  else if (pct >= 80) { emoji = "🌟"; msg = "Awesome — you've got this down!"; }
  else if (pct >= 60) { emoji = "💪"; msg = "Good work! A little more practice and you'll nail it."; }
  else { emoji = "📚"; msg = "Nice try! Review the explanations below and run it again."; }

  const reviewHtml = review.map((r, idx) => `
    <div class="card" style="border-left:5px solid ${r.correct ? "var(--good)" : "var(--bad)"};padding:14px 16px">
      <div style="font-weight:700;margin-bottom:6px">${r.correct ? "✅" : "❌"} Q${idx + 1}. ${r.q.q.replace(/<br>/g, " ")}</div>
      <div class="muted" style="font-size:14px">Your answer: <b>${escapeHtml(r.userText)}</b>${r.correct ? "" : ` &nbsp;·&nbsp; Correct: <b>${escapeHtml(String(r.right))}</b>`}</div>
      <div style="font-size:14px;margin-top:6px">${r.q.explain}</div>
    </div>`).join("");

  app.innerHTML = `
    <div class="result card">
      <div class="big-emoji">${emoji}</div>
      <h2>${msg}</h2>
      <div class="scoreline">You scored ${score} / ${total} (${pct}%)</div>
      <div class="row mt">
        <button class="btn" id="retryBtn">🔁 New ${LEVELS[topic.level] ? LEVELS[topic.level].name : ""} test</button>
        ${chapterId ? `<button class="btn secondary" id="lessonBtn">📖 Review lesson</button>` : ""}
        <button class="btn secondary" data-go="home">🏠 Home</button>
      </div>
    </div>
    <h3 style="margin:18px 6px 8px">Review every question</h3>
    ${reviewHtml}
  `;
  document.getElementById("retryBtn").addEventListener("click", () => {
    const next = topic.regen ? Object.assign({}, topic, { questions: topic.regen() }) : topic;
    startQuiz(next);
  });
  if (chapterId)
    document.getElementById("lessonBtn").addEventListener("click", () => screenTopic(chapterId));
  wireBack();
}

/* ===================== Difficulty levels ===================== */
const LEVELS = {
  1: { name: "Medium", key: "medium", emoji: "🟢", color: "#1aa86f", color2: "#34c98a", blurb: "Regular public-school questions" },
  2: { name: "Hard", key: "hard", emoji: "🟠", color: "#e8853a", color2: "#ffab4d", blurb: "Real placement-test level" },
  3: { name: "Challenging", key: "challenging", emoji: "🔴", color: "#e1495a", color2: "#ff7a6b", blurb: "Math-competition level (Math Kangaroo style)" }
};

/* ---------- helpers ---------- */
function wireBack() {
  app.querySelectorAll("[data-go='home']").forEach(el =>
    el.addEventListener("click", screenHome));
}
document.querySelector(".brand").addEventListener("click", screenHome);

/* ---------- boot ---------- */
renderCountdown();
screenHome();
