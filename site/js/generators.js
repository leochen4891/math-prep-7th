/* ====== LEVELED Question Generators (Algebra-Readiness calibrated) ======
   3 tiers per topic: [ onLevel[], advanced[], challenge[] ].
   Level 1 = on-level pre-algebra, 2 = advanced, 3 = challenge (Algebra-1 readiness & beyond).
   Fresh random numbers every time → unmemorizable.
*/
(function () {
  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(a) { return a[rand(0, a.length - 1)]; }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rand(0, i);[a[i], a[j]] = [a[j], a[i]]; } return a; }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }
  function fracStr(n, d) { const g = gcd(n, d); return (n / g) + "/" + (d / g); }
  function fmt(x) { return Number(x.toFixed(6)).toString(); }
  function parn(x) { return x < 0 ? "(" + x + ")" : "" + x; }
  function snz(min, max) { return pick([-1, 1]) * rand(min, max); }       // signed nonzero
  function withSign(x) { return x < 0 ? "− " + Math.abs(x) : "+ " + x; }   // " − 3" / " + 3"
  const SUP = { 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸" };

  function typed(q, ans, explain, ph) {
    const a = String(ans); const accept = [a];
    if (a.indexOf("0.") === 0) accept.push(a.slice(1));
    return { type: "typed", q: q, accept: accept, explain: explain, placeholder: ph || "Type a number" };
  }
  function typedFrac(q, raw, simp, explain) {
    const accept = [simp]; if (accept.indexOf(raw) === -1) accept.push(raw);
    return { type: "typed", q: q, accept: accept, explain: explain, placeholder: "Type a fraction (like a/b)" };
  }
  function mcNum(q, answer, distractors, explain) {
    const set = [answer];
    (distractors || []).forEach(d => { if (set.indexOf(d) === -1 && d !== answer) set.push(d); });
    let g = 0; while (set.length < 4 && g < 200) { const c = answer + pick([-10, -5, -3, -2, -1, 1, 2, 3, 4, 5, 10]); if (set.indexOf(c) === -1) set.push(c); g++; }
    const choices = shuffle(set.slice(0, 4)).map(String);
    return { type: "mc", q: q, choices: choices, answer: choices.indexOf(String(answer)), explain: explain };
  }
  function mcText(q, choices, correct, explain) {
    const sh = shuffle(choices);
    return { type: "mc", q: q, choices: sh, answer: sh.indexOf(correct), explain: explain };
  }

  /* ============================ FRACTIONS / % ============================ */
  const fractions = [
    [ // ON-LEVEL
      function () { let d1 = pick([2, 3, 4, 5, 6, 8]), d2 = pick([2, 3, 4, 5, 6, 8]); if (d2 === d1) d2 = d1 === 8 ? 3 : d1 + 1; const a = rand(1, d1 - 1), b = rand(1, d2 - 1); const num = a * d2 + b * d1, den = d1 * d2; return typedFrac(a + "/" + d1 + " + " + b + "/" + d2 + " = ?", num + "/" + den, fracStr(num, den), "Common denominator " + den + ": " + (a * d2) + "/" + den + " + " + (b * d1) + "/" + den + " = " + fracStr(num, den) + "."); },
      function () { const a = pick([5, 15, 25, 35, 45]); const b = pick([20, 40, 60, 80, 100]); return typed("What is " + a + "% of " + b + "?", b * a / 100, fmt(a / 100) + " × " + b + " = " + (b * a / 100) + ".", "Type a number"); },
      function () { const d = pick([8, 16, 20, 25, 40, 50]); const n = rand(1, d - 1); return typed("Write " + n + "/" + d + " as a decimal.", fmt(n / d), n + " ÷ " + d + " = " + fmt(n / d) + ".", "Type a decimal"); }
    ],
    [ // ADVANCED
      function () { const b = pick([2, 3, 4, 5]), d = pick([2, 3, 4, 5]); const a = rand(1, b - 1), c = rand(1, d - 1); const num = a * c, den = b * d; return typedFrac(a + "/" + b + " × " + c + "/" + d + " = ?", num + "/" + den, fracStr(num, den), "Multiply straight across: " + num + "/" + den + " = " + fracStr(num, den) + "."); },
      function () { const b = pick([2, 3, 4, 5]), d = pick([2, 3, 4, 5]); const a = rand(1, b - 1), c = rand(1, d - 1); const num = a * d, den = b * c; return typedFrac(a + "/" + b + " ÷ " + c + "/" + d + " = ?", num + "/" + den, fracStr(num, den), "Keep-Change-Flip: " + a + "/" + b + " × " + d + "/" + c + " = " + num + "/" + den + " = " + fracStr(num, den) + "."); },
      function () { const q = pick([2, 3, 4, 5]); const p = rand(1, q - 1); const k = rand(3, 9); return typed("If " + p + "/" + q + " of a number is " + (p * k) + ", what is the number?", q * k, "Undo it: " + (p * k) + " ÷ " + p + " × " + q + " = " + (q * k) + ".", "Type a number"); },
      function () { const price = pick([40, 60, 80, 120]); const off = pick([10, 25, 50, 75]); return typed("A $" + price + " item is marked up by " + off + "%. What is the new price?", price * (100 + off) / 100, "Add " + off + "%: " + price + " × " + fmt((100 + off) / 100) + " = $" + (price * (100 + off) / 100) + ".", "Type a dollar amount"); }
    ],
    [ // CHALLENGE
      function () { const s = pick([{ t: "(1/2 + 1/4) × 8", a: 6 }, { t: "(2/3 + 1/6) × 12", a: 10 }, { t: "(3/4 − 1/2) ÷ 1/8", a: 2 }, { t: "(1/2 + 1/3) × 6", a: 5 }, { t: "(5/8 − 1/4) × 16", a: 6 }, { t: "(2/5 + 1/2) ÷ 1/10", a: 9 }]); return typed("Simplify: " + s.t, s.a, "Do the parentheses first, then the outside operation → " + s.a + ".", "Type a number"); },
      function () { const orig = pick([40, 60, 80, 100]); const d = pick([10, 20, 25]); const final = orig * (100 - d) / 100; return typed("After a " + d + "% discount, an item costs $" + final + ". What was the original price?", orig, "It sold for " + (100 - d) + "% of the original: " + final + " ÷ " + fmt((100 - d) / 100) + " = $" + orig + ".", "Type a dollar amount"); },
      function () { const B = pick([20, 40, 80, 100]); const p = pick([10, 25, 40, 50, 75]); return typed("What percent of " + B + " is " + (B * p / 100) + "?", p, (B * p / 100) + " ÷ " + B + " = " + fmt(p / 100) + " = " + p + "%.", "Type a number (the %)"); },
      function () { const s = pick([{ t: "A $100 item is 20% off, then 10% off the new price.", a: 72 }, { t: "A $200 item is 50% off, then 10% off.", a: 90 }, { t: "A $80 item is 25% off, then 20% off.", a: 48 }, { t: "A $120 item is 25% off, then 20% off.", a: 72 }, { t: "A $100 item is 10% off, then 50% off.", a: 45 }]); return typed(s.t + " What is the final price?", s.a, "Apply the discounts one after the other (not added together) → $" + s.a + ".", "Type a dollar amount"); }
    ]
  ];

  /* ============================ INTEGERS / NUMBER SENSE ============================ */
  const integers = [
    [ // ON-LEVEL
      function () { const a = snz(2, 14), b = snz(2, 14), c = snz(2, 14); return typed(a + " " + withSign(b) + " " + withSign(c) + " = ?", a + b + c, "Work left to right: " + a + (b < 0 ? "−" + Math.abs(b) : "+" + b) + (c < 0 ? "−" + Math.abs(c) : "+" + c) + " = " + (a + b + c) + ".", "Type a number"); },
      function () { let a = snz(3, 12), b = snz(3, 12); if (a > 0 && b > 0) { pick([0, 1]) ? a = -a : b = -b; } const ans = a * b; return typed(parn(a) + " × " + parn(b) + " = ?", ans, (a < 0 && b < 0) ? "Negative × negative = positive: " + ans + "." : "One negative → negative: " + ans + ".", "Type a number"); },
      function () { const a = rand(2, 9), b = rand(2, 9); return typed("|−" + a + "| + |" + b + "| = ?", a + b, "Absolute value makes it positive: " + a + " + " + b + " = " + (a + b) + ".", "Type a number"); }
    ],
    [ // ADVANCED
      function () { const a = snz(2, 9), b = snz(2, 6), c = snz(2, 6); return typed(a + " " + withSign(b) + " × " + parn(c) + " = ?", a + b * c, "Multiply first: " + parn(b) + "×" + parn(c) + " = " + (b * c) + ", then " + a + (b * c < 0 ? "−" + Math.abs(b * c) : "+" + b * c) + " = " + (a + b * c) + ".", "Type a number"); },
      function () { const s = pick([{ b: -2, e: 3, a: -8 }, { b: -2, e: 4, a: 16 }, { b: -3, e: 3, a: -27 }, { b: -4, e: 2, a: 16 }, { b: -5, e: 2, a: 25 }, { b: -2, e: 5, a: -32 }, { b: -3, e: 2, a: 9 }]); return typed("What is (" + s.b + ")" + SUP[s.e] + "?", s.a, "(" + s.b + ") multiplied " + s.e + " times = " + s.a + ". (Even power → positive, odd → negative.)", "Type a number"); },
      function () { const a = rand(2, 9), b = rand(10, 18); return typed("|" + a + " − " + b + "| = ?", b - a, a + " − " + b + " = " + (a - b) + ", and |" + (a - b) + "| = " + (b - a) + ".", "Type a number"); }
    ],
    [ // CHALLENGE
      function () { const a = rand(1, 8), b = rand(2, 5), c = rand(1, 6), d = rand(c + 1, 9); return typed(a + " − " + b + "(" + c + " − " + d + ") = ?", a - b * (c - d), "Parentheses: " + c + "−" + d + " = " + (c - d) + ". Then " + a + " − " + b + "×" + parn(c - d) + " = " + a + " − " + parn(b * (c - d)) + " = " + (a - b * (c - d)) + ".", "Type a number"); },
      function () { const x = -rand(2, 5); const k = pick([2, 3]); return typed("Evaluate " + k + "x" + SUP[2] + " when x = " + x + ".", k * x * x, "Square first: (" + x + ")² = " + (x * x) + ". Then ×" + k + " = " + (k * x * x) + ". (Note: " + k + "x² means " + k + "·x², not (" + k + "x)².)", "Type a number"); },
      function () { const x = -rand(2, 6); const m = rand(2, 5); const b = rand(1, 9); return typed("Evaluate " + m + "x " + withSign(b) + " when x = " + x + ".", m * x + b, m + "(" + x + ") " + withSign(b) + " = " + (m * x) + (b < 0 ? "−" + Math.abs(b) : "+" + b) + " = " + (m * x + b) + ".", "Type a number"); }
    ]
  ];

  /* ============================ ORDER OF OPERATIONS / EXPRESSIONS ============================ */
  const order = [
    [ // ON-LEVEL
      function () { const a = rand(2, 9), b = rand(2, 9), c = rand(2, 6); return mcNum("(" + a + " + " + b + ") × " + c + " = ?", (a + b) * c, [a + b * c, a * c + b, (a + b) * c + c], "Parentheses first: " + (a + b) + " × " + c + " = " + ((a + b) * c) + "."); },
      function () { const d = pick([2, 3, 4, 5]); const q = rand(2, 9); const e = rand(2, 9); return typed((d * q) + " ÷ " + d + " + " + e + " × 2 = ?", q + e * 2, "Divide and multiply first: " + q + " + " + (e * 2) + " = " + (q + e * 2) + ".", "Type a number"); },
      function () { const b = rand(2, 6), c = rand(2, 6), a = rand(b * c + 1, b * c + 15); return typed(a + " − " + b + " × " + c + " = ?", a - b * c, "Multiply first: " + (b * c) + ", then " + a + " − " + (b * c) + " = " + (a - b * c) + ".", "Type a number"); }
    ],
    [ // ADVANCED
      function () { const a = rand(1, 9), b = rand(2, 4), c = rand(2, 4); return typed(a + " + " + b + " × " + c + SUP[2] + " = ?", a + b * c * c, "Exponent: " + c + "² = " + (c * c) + ". Then ×" + b + " = " + (b * c * c) + ", + " + a + " = " + (a + b * c * c) + ".", "Type a number"); },
      function () { const a = rand(1, 4), b = rand(1, 4), c = rand(1, 9); return typed("2 × (" + a + " + " + b + ")" + SUP[2] + " − " + c + " = ?", 2 * (a + b) * (a + b) - c, "Inside = " + (a + b) + ", squared = " + ((a + b) * (a + b)) + ", ×2 = " + (2 * (a + b) * (a + b)) + ", − " + c + " = " + (2 * (a + b) * (a + b) - c) + ".", "Type a number"); },
      function () { const k = rand(2, 5), x = rand(2, 6), m = rand(1, 9); return typed("Evaluate " + k + "x + " + m + " when x = " + x + ".", k * x + m, k + "(" + x + ") + " + m + " = " + (k * x) + " + " + m + " = " + (k * x + m) + ".", "Type a number"); }
    ],
    [ // CHALLENGE
      function () { const a = rand(2, 6), b = rand(2, 3), c = rand(2, 5), d = rand(1, 4), e = rand(1, d); const inner = d - e; return typed(a + " + " + b + " × [" + c + " + (" + d + " − " + e + ")" + SUP[2] + "] = ?", a + b * (c + inner * inner), "Innermost: (" + d + "−" + e + ")² = " + (inner * inner) + ". Brackets: " + c + " + " + (inner * inner) + " = " + (c + inner * inner) + ". Then " + a + " + " + b + "×" + (c + inner * inner) + " = " + (a + b * (c + inner * inner)) + ".", "Type a number"); },
      function () { const a = rand(3, 6), b = rand(1, 9), c = rand(1, a - 2), d = pick([1, 2, 3, 4, 5, 6, 7, 8, 9].filter(v => v !== b)); const co = a - c, k = b + d; return mcText("Combine like terms: " + a + "x + " + b + " − " + c + "x + " + d, [co + "x + " + k, (a + c) + "x + " + k, co + "x + " + (b * d), (a + c) + "x + " + (b * d)], co + "x + " + k, "x-terms: " + a + "x − " + c + "x = " + co + "x. Numbers: " + b + " + " + d + " = " + k + ". → " + co + "x + " + k + "."); },
      function () { const a = rand(2, 6), b = rand(2, 6), av = rand(2, 7), bv = rand(2, 7); return typed("Evaluate " + a + "a − " + b + "b when a = " + av + " and b = " + bv + ".", a * av - b * bv, a + "(" + av + ") − " + b + "(" + bv + ") = " + (a * av) + " − " + (b * bv) + " = " + (a * av - b * bv) + ".", "Type a number"); }
    ]
  ];

  /* ============================ RATIOS / RATES / % CHANGE ============================ */
  const ratios = [
    [ // ON-LEVEL
      function () { const b = pick([2, 3, 4, 5, 6]); const f = pick([2, 3, 4]); const a = rand(1, b); return typed("Solve the proportion " + a + "/" + b + " = x/" + (b * f) + "<br>x = ?", a * f, "Cross multiply: " + a + "×" + (b * f) + " ÷ " + b + " = " + (a * f) + ".", "Type a number"); },
      function () { const a = pick([15, 25, 35, 45]); const b = pick([20, 40, 60, 80, 100]); return typed("What is " + a + "% of " + b + "?", b * a / 100, fmt(a / 100) + " × " + b + " = " + (b * a / 100) + ".", "Type a number"); },
      function () { const ratio = pick([2, 3]); const other = pick([3, 4, 5]); const red = ratio * pick([2, 3, 4]); return typed("The ratio of red to blue is " + ratio + ":" + other + ". If there are " + red + " red, how many blue?", (red / ratio) * other, "Scale up: " + red + " ÷ " + ratio + " = " + (red / ratio) + ", × " + other + " = " + ((red / ratio) * other) + ".", "Type a number"); }
    ],
    [ // ADVANCED
      function () { const price = pick([40, 60, 80, 100]); const off = pick([10, 20, 25, 50]); return typed("A $" + price + " jacket is " + off + "% off. What is the sale price?", price * (100 - off) / 100, "Pay " + (100 - off) + "%: " + price + " × " + fmt((100 - off) / 100) + " = $" + (price * (100 - off) / 100) + ".", "Type a dollar amount"); },
      function () { const u = rand(2, 6); const n1 = pick([2, 3, 4]); const n2 = pick([5, 7, 9, 11]); return typed("If " + n1 + " notebooks cost $" + (u * n1) + ", how much do " + n2 + " notebooks cost?", u * n2, "Each is $" + u + ", so " + n2 + " × $" + u + " = $" + (u * n2) + ".", "Type a dollar amount"); },
      function () { const speed = pick([40, 50, 60]); const t1 = pick([2, 3]); const t2 = pick([4, 5, 6]); return typed("A car drives " + (speed * t1) + " miles in " + t1 + " hours. At that rate, how far in " + t2 + " hours?", speed * t2, "Speed = " + (speed * t1) + "÷" + t1 + " = " + speed + " mph. In " + t2 + " h: " + speed + "×" + t2 + " = " + (speed * t2) + " miles.", "Type a number"); }
    ],
    [ // CHALLENGE
      function () { const a = rand(1, 3), b = rand(2, 4), c = rand(3, 6); const k = pick([2, 3, 4]); const total = (a + b + c) * k; return typed("Three numbers are in the ratio " + a + ":" + b + ":" + c + " and add up to " + total + ". What is the largest one?", c * k, "Total parts = " + (a + b + c) + ". One part = " + total + " ÷ " + (a + b + c) + " = " + k + ". Largest = " + c + " × " + k + " = " + (c * k) + ".", "Type a number"); },
      function () { const old = pick([20, 40, 80]); const p = pick([10, 25, 50]); const nw = old * (100 + p) / 100; return typed("A price went from $" + old + " to $" + nw + ". What was the percent increase?", p, "Increase = " + (nw - old) + ". As a percent of the original: " + (nw - old) + " ÷ " + old + " = " + fmt(p / 100) + " = " + p + "%.", "Type a number (the %)"); },
      function () { const orig = pick([40, 60, 80, 100]); const d = pick([10, 20, 25]); const final = orig * (100 - d) / 100; return typed("After a " + d + "% discount, a bike costs $" + final + ". What was the original price?", orig, final + " is " + (100 - d) + "% of the original: " + final + " ÷ " + fmt((100 - d) / 100) + " = $" + orig + ".", "Type a dollar amount"); }
    ]
  ];

  /* ============================ EXPONENTS / ROOTS ============================ */
  const exponents = [
    [ // ON-LEVEL
      function () { const n = rand(6, 15); return typed("What is " + n + SUP[2] + "?", n * n, n + " × " + n + " = " + (n * n) + ".", "Type a number"); },
      function () { const n = rand(2, 6); return typed("What is " + n + SUP[3] + "?", n * n * n, n + "×" + n + "×" + n + " = " + (n * n * n) + ".", "Type a number"); },
      function () { const n = rand(11, 20); return typed("What is √" + (n * n) + "?", n, n + " × " + n + " = " + (n * n) + ", so √" + (n * n) + " = " + n + ".", "Type a number"); }
    ],
    [ // ADVANCED
      function () { const s = pick([[2, 5, 32], [2, 6, 64], [3, 4, 81], [4, 3, 64], [5, 3, 125], [2, 7, 128], [2, 8, 256], [3, 5, 243]]); return typed("What is " + s[0] + SUP[s[1]] + "?", s[2], s[0] + " multiplied " + s[1] + " times = " + s[2] + ".", "Type a number"); },
      function () { const a = rand(6, 12), b = rand(2, 5); return typed("What is " + a + SUP[2] + " − " + b + SUP[2] + "?", a * a - b * b, a * a + " − " + b * b + " = " + (a * a - b * b) + ".", "Type a number"); },
      function () { const n = rand(4, 12); return typed("If x" + SUP[2] + " = " + (n * n) + ", what is the positive value of x?", n, "√" + (n * n) + " = " + n + ", since " + n + "² = " + (n * n) + ".", "Type a number"); }
    ],
    [ // CHALLENGE
      function () { const s = pick([{ t: "2³ × 2²", a: 32 }, { t: "(2²)³", a: 64 }, { t: "3⁴ ÷ 3²", a: 9 }, { t: "2⁵ ÷ 2²", a: 8 }, { t: "10³ ÷ 10", a: 100 }, { t: "(3²)² ÷ 9", a: 9 }]); return typed("What is " + s.t + "?", s.a, "Use exponent rules (add exponents when multiplying, subtract when dividing) → " + s.a + ".", "Type a number"); },
      function () { const m = rand(2, 6), k = rand(2, 6); return typed("x" + SUP[m] + " · x" + SUP[k] + " = xⁿ.  What is n?", m + k, "Multiplying same bases → add exponents: " + m + " + " + k + " = " + (m + k) + ".", "Type a number"); },
      function () { const a = rand(2, 4), b = rand(2, 3); return typed(a + SUP[3] + " + " + b + SUP[2] + " × 2 = ?", a * a * a + b * b * 2, "Exponents first: " + a + "³ = " + (a * a * a) + ", " + b + "² = " + (b * b) + ". Then " + (a * a * a) + " + " + (b * b) + "×2 = " + (a * a * a + b * b * 2) + ".", "Type a number"); }
    ]
  ];

  /* ============================ EQUATIONS ============================ */
  const equations = [
    [ // ON-LEVEL
      function () { const a = pick([2, 3, 4, 5]); const b = rand(1, 9); const x = rand(2, 9); return typed("Solve: " + a + "x + " + b + " = " + (a * x + b) + "<br>x = ?", x, "Subtract " + b + " → " + a + "x = " + (a * x) + ". Divide by " + a + " → x = " + x + ".", "Type a number"); },
      function () { const a = pick([2, 3, 4]); const b = rand(1, 8); const x = rand(2, 9); return typed("Solve: " + a + "x − " + b + " = " + (a * x - b) + "<br>x = ?", x, "Add " + b + " → " + a + "x = " + (a * x) + ". Divide by " + a + " → x = " + x + ".", "Type a number"); },
      function () { const a = pick([2, 3, 4]); const x = rand(2, 9); return typed("Solve: x/" + a + " = " + x + "<br>x = ?", a * x, "Multiply both sides by " + a + ": x = " + (a * x) + ".", "Type a number"); }
    ],
    [ // ADVANCED
      function () { const x = rand(1, 6), b = pick([2, 3, 4]), c = rand(1, 10), a = c + b * x; return typed("Solve: " + a + " − " + b + "x = " + c + "<br>x = ?", x, "Subtract " + a + ": −" + b + "x = " + (c - a) + ". Divide by −" + b + ": x = " + x + ".", "Type a number"); },
      function () { const a = pick([2, 3, 4]); const b = rand(1, 5); const x = rand(2, 8); return typed("Solve: " + a + "(x + " + b + ") = " + (a * (x + b)) + "<br>x = ?", x, "Divide by " + a + ": x + " + b + " = " + (x + b) + ". Subtract " + b + ": x = " + x + ".", "Type a number"); },
      function () { const p = pick([2, 3, 4]); const x = rand(1, 6); const q = rand(1, 9); const s = (p - 1) * x + q; return typed("Solve: " + p + "x + " + q + " = x + " + s + "<br>x = ?", x, "Subtract x from both sides: " + (p - 1) + "x + " + q + " = " + s + ". Then " + (p - 1) + "x = " + (s - q) + ", x = " + x + ".", "Type a number"); }
    ],
    [ // CHALLENGE
      function () { const x = rand(2, 8), p = pick([3, 4, 5]), r = pick([1, 2]), a = rand(1, 9), b = (p - r) * x + a; return typed("Solve: " + p + "x + " + a + " = " + (r === 1 ? "x" : r + "x") + " + " + b + "<br>x = ?", x, "Move variables to one side: " + (p - r) + "x = " + b + " − " + a + " = " + (b - a) + ", so x = " + x + ".", "Type a number"); },
      function () { const a = pick([2, 3]); const x = rand(3, 8); const c = (a - 1) * x - a; return typed("Solve: " + a + "(x − 1) = x + " + c + "<br>x = ?", x, "Distribute: " + a + "x − " + a + " = x + " + c + ". Then " + (a - 1) + "x = " + (c + a) + ", x = " + x + ".", "Type a number"); },
      function () { const d = pick([2, 3, 4]); const b = rand(1, 6); const r = rand(3, 8); return typed("Solve: (x + " + b + ")/" + d + " = " + r + "<br>x = ?", r * d - b, "Multiply both sides by " + d + ": x + " + b + " = " + (r * d) + ". Subtract " + b + ": x = " + (r * d - b) + ".", "Type a number"); }
    ]
  ];

  /* ============================ COORDINATE / WORD / REASONING ============================ */
  const graphing = [
    [ // ON-LEVEL
      function () { const packs = rand(3, 7), per = pick([6, 8, 10, 12]), give = rand(3, 11); return typed("Maya buys " + packs + " packs of " + per + " markers, then gives away " + give + ". How many does she have now?", packs * per - give, packs + "×" + per + " = " + (packs * per) + ", − " + give + " = " + (packs * per - give) + ".", "Type a number"); },
      function () { const base = rand(2, 6), per = rand(2, 4), miles = rand(4, 9); return typed("A taxi costs $" + base + " plus $" + per + " per mile. How much for a " + miles + "-mile trip?", base + per * miles, per + "×" + miles + " = " + (per * miles) + ", + $" + base + " = $" + (base + per * miles) + ".", "Type a dollar amount"); },
      function () { const sx = pick([-1, 1]), sy = pick([-1, 1]); const x = sx * rand(1, 6), y = sy * rand(1, 6); const quad = (x > 0 && y > 0) ? "Quadrant I" : (x < 0 && y > 0) ? "Quadrant II" : (x < 0 && y < 0) ? "Quadrant III" : "Quadrant IV"; return mcText("Which quadrant is (" + x + ", " + y + ") in?", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], quad, "x " + (x > 0 ? "+" : "−") + ", y " + (y > 0 ? "+" : "−") + " → " + quad + "."); }
    ],
    [ // ADVANCED
      function () { const s = pick([{ t: "2, 6, 18, 54, ?", a: 162, e: "× 3 each time → 162." }, { t: "3, 6, 12, 24, ?", a: 48, e: "× 2 each time → 48." }, { t: "1, 4, 9, 16, ?", a: 25, e: "Squares 1²…4², next 5² = 25." }, { t: "2, 3, 5, 8, 12, ?", a: 17, e: "Jumps grow +1,+2,+3,+4,+5 → 17." }, { t: "1, 1, 2, 3, 5, 8, ?", a: 13, e: "Each is the sum of the previous two → 13." }, { t: "81, 27, 9, 3, ?", a: 1, e: "÷ 3 each time → 1." }]); return typed("What number comes next?<br>" + s.t, s.a, s.e, "Type a number"); },
      function () { const start = rand(2, 6), d = rand(2, 5), N = rand(8, 15); return typed("A pattern starts at " + start + " and adds " + d + " each step. What is the " + N + "th term?", start + d * (N - 1), "Term = start + step×(N−1) = " + start + " + " + d + "×" + (N - 1) + " = " + (start + d * (N - 1)) + ".", "Type a number"); },
      function () { const n = pick([2, 3, 4, 5, 6]); const each = rand(4, 12); return typed((n * each) + " books are shared equally among " + n + " shelves, then 3 are added to one shelf. How many on that shelf?", each + 3, (n * each) + " ÷ " + n + " = " + each + ", + 3 = " + (each + 3) + ".", "Type a number"); }
    ],
    [ // CHALLENGE
      function () { const n = rand(4, 12), k = pick([2, 3, 4]), add = rand(2, 9); return typed("A number is multiplied by " + k + ", then increased by " + add + ". The result is " + (k * n + add) + ". What is the number?", n, "Work backwards: " + (k * n + add) + " − " + add + " = " + (k * n) + ", ÷ " + k + " = " + n + ". (Equation: " + k + "x + " + add + " = " + (k * n + add) + ".)", "Type a number"); },
      function () { const n = rand(8, 25); return typed("The sum of two consecutive integers is " + (2 * n + 1) + ". What is the smaller one?", n, "Consecutive integers x and x+1: 2x + 1 = " + (2 * n + 1) + ", so x = " + n + ".", "Type a number"); },
      function () { const b = rand(6, 14), m = pick([2, 3, 4]); return typed("Maria is " + m + " times as old as her brother. Together they are " + (b * (m + 1)) + ". How old is her brother?", b, "Brother = x, Maria = " + m + "x. x + " + m + "x = " + (m + 1) + "x = " + (b * (m + 1)) + ", so x = " + b + ".", "Type a number"); }
    ]
  ];

  /* ---- Inequalities folded into the Equations chapter ---- */
  equations[0].push(
    function () { const a = rand(1, 9), x = rand(1, 9); return mcText("Solve the inequality: x + " + a + " > " + (x + a), ["x > " + x, "x < " + x, "x > " + (x + a), "x < " + (x + a)], "x > " + x, "Subtract " + a + " from both sides: x > " + (x + a) + " − " + a + ", so x > " + x + "."); }
  );
  equations[1].push(
    function () { const a = pick([2, 3, 4]), x = rand(2, 8); return mcText("Solve the inequality: " + a + "x ≤ " + (a * x), ["x ≤ " + x, "x ≥ " + x, "x ≤ " + (a * x), "x ≥ " + (a * x)], "x ≤ " + x, "Divide both sides by " + a + " (a positive number, so the sign stays): x ≤ " + x + "."); },
    function () { const a = rand(1, 8), thr = rand(4, 10), need = thr - a; return mcText("Which value of x makes  x + " + a + " > " + thr + "  true?", ["x = " + (need + 1), "x = " + need, "x = " + (need - 1), "x = " + (need - 2)], "x = " + (need + 1), "x + " + a + " > " + thr + " means x > " + need + ". The smallest whole number greater than " + need + " is " + (need + 1) + "."); }
  );
  equations[2].push(
    function () { const x = rand(2, 6); return mcText("Solve the inequality: −2x < " + (-2 * x) + "  (watch the sign!)", ["x > " + x, "x < " + x, "x > " + (-2 * x), "x < " + (-2 * x)], "x > " + x, "Divide both sides by −2. Dividing by a NEGATIVE number flips the inequality: x > " + x + "."); },
    function () { const a = pick([2, 3]), b = rand(1, 6), x = rand(2, 7), c = (a - 1) * x + b; return mcText("Solve the inequality: " + a + "x + " + b + " < x + " + c, ["x < " + x, "x > " + x, "x < " + c, "x > " + c], "x < " + x, "Subtract x and " + b + " from both sides: " + (a - 1) + "x < " + (c - b) + ", so x < " + x + "."); }
  );

  /* ============================ NUMBER THEORY (GCF / LCM / PRIMES) ============================ */
  const numbertheory = [
    [ // MEDIUM
      function () { const a = rand(8, 40), b = rand(8, 40); return typed("What is the GCF (greatest common factor) of " + a + " and " + b + "?", gcd(a, b), "List the factors of each; the largest factor they share is " + gcd(a, b) + ".", "Type a number"); },
      function () { const a = rand(2, 9), b = rand(2, 9); const l = a * b / gcd(a, b); return typed("What is the LCM (least common multiple) of " + a + " and " + b + "?", l, "The smallest number that both " + a + " and " + b + " divide into evenly is " + l + ".", "Type a number"); },
      function () { const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29], comp = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 21, 22, 25, 27]; const isP = pick([true, false]); const n = isP ? pick(primes) : pick(comp); return mcText("Is " + n + " prime or composite?", ["Prime", "Composite"], isP ? "Prime" : "Composite", isP ? n + " has exactly two factors (1 and itself), so it is prime." : n + " has factors besides 1 and itself, so it is composite."); }
    ],
    [ // HARD
      function () { const a = rand(12, 60), b = rand(12, 60); return typed("Find the GCF of " + a + " and " + b + ".", gcd(a, b), "The greatest common factor of " + a + " and " + b + " is " + gcd(a, b) + ".", "Type a number"); },
      function () { const a = rand(4, 15), b = rand(4, 15); const l = a * b / gcd(a, b); return typed("Find the LCM of " + a + " and " + b + ".", l, "A shortcut: LCM = (a × b) ÷ GCF = (" + a + " × " + b + ") ÷ " + gcd(a, b) + " = " + l + ".", "Type a number"); },
      function () { const s = pick([{ n: 12, f: "2² × 3" }, { n: 18, f: "2 × 3²" }, { n: 24, f: "2³ × 3" }, { n: 36, f: "2² × 3²" }, { n: 30, f: "2 × 3 × 5" }, { n: 40, f: "2³ × 5" }, { n: 60, f: "2² × 3 × 5" }]); return mcText("Which is the prime factorization of " + s.n + "?", [s.f, "2 × " + s.n, "3 × " + (s.n / 3), s.n + " × 1"], s.f, "Break " + s.n + " down into prime factors only → " + s.f + "."); }
    ],
    [ // CHALLENGING
      function () { const a = pick([4, 6, 8]), b = pick([6, 9, 10, 12]); const l = a * b / gcd(a, b); return typed("Two lights blink every " + a + " seconds and every " + b + " seconds. They just blinked together. After how many seconds will they next blink together?", l, "They sync again at the LCM of " + a + " and " + b + ", which is " + l + " seconds.", "Type a number"); },
      function () { const l = pick([4, 6, 8, 12]), w = rand(2, 12); const area = l * w; return typed("What is the side length of the largest square tile that can exactly tile a " + area + "-by-" + l + " floor with no cutting?", gcd(area, l), "The tile's side must divide both " + area + " and " + l + ", and the largest such number is the GCF = " + gcd(area, l) + ".", "Type a number"); },
      function () { const a = rand(6, 12), b = rand(6, 12); return typed("Two numbers are " + a + " and " + b + ". What is (their GCF) × (their LCM)?", a * b, "A neat fact: GCF × LCM always equals the product of the two numbers, so " + a + " × " + b + " = " + (a * b) + ".", "Type a number"); }
    ]
  ];

  /* ============================ PATTERNS, SEQUENCES & TABLES ============================ */
  const patterns = [
    [ // MEDIUM
      function () { const start = rand(2, 9), d = rand(2, 6), seq = [start, start + d, start + 2 * d, start + 3 * d]; return typed("What comes next?<br>" + seq.join(", ") + ", ?", start + 4 * d, "Each term goes up by " + d + ": " + (start + 3 * d) + " + " + d + " = " + (start + 4 * d) + ".", "Type a number"); },
      function () { const start = pick([1, 2, 3]), r = pick([2, 3]), seq = [start, start * r, start * r * r, start * r * r * r]; return typed("What comes next?<br>" + seq.join(", ") + ", ?", start * r * r * r * r, "Each term is multiplied by " + r + ": " + (start * r * r * r) + " × " + r + " = " + (start * r * r * r * r) + ".", "Type a number"); },
      function () { const m = rand(2, 5), b = rand(1, 9), x = rand(2, 9); return typed("A function rule is y = " + m + "x + " + b + ". If x = " + x + ", what is y?", m * x + b, "Substitute x = " + x + ": " + m + "(" + x + ") + " + b + " = " + (m * x + b) + ".", "Type a number"); }
    ],
    [ // HARD
      function () { const start = rand(2, 8), d = rand(2, 6), N = rand(8, 15); return typed("A pattern starts at " + start + " and adds " + d + " each step. What is the " + N + "th term?", start + d * (N - 1), "Term = start + step×(N−1) = " + start + " + " + d + "×" + (N - 1) + " = " + (start + d * (N - 1)) + ".", "Type a number"); },
      function () { const m = pick([2, 3, 4]), b = rand(1, 6), x = rand(2, 8); return typed("Rule: multiply the input by " + m + ", then add " + b + ". What is the output when the input is " + x + "?", m * x + b, m + " × " + x + " + " + b + " = " + (m * x + b) + ".", "Type a number"); },
      function () { const m = pick([2, 3, 4, 5]), b = rand(1, 5), ys = [1, 2, 3, 4].map(x => m * x + b); return mcText("A table shows x: 1, 2, 3, 4 and y: " + ys.join(", ") + ". What is the rule?", ["y = " + m + "x + " + b, "y = " + (m + 1) + "x + " + b, "y = " + m + "x + " + (b + 1), "y = x + " + (m + b)], "y = " + m + "x + " + b, "y goes up by " + m + " each step (so the coefficient is " + m + "), and the pattern gives y = " + m + "x + " + b + "."); }
    ],
    [ // CHALLENGING
      function () { const m = pick([2, 3, 4]), b = rand(1, 6), y = m * rand(3, 8) + b, x = (y - b) / m; return typed("A machine does: input × " + m + ", then + " + b + " = output. The output is " + y + ". What was the input?", x, "Work backwards: (" + y + " − " + b + ") ÷ " + m + " = " + x + ".", "Type a number"); },
      function () { const m = pick([2, 3, 4]), b = rand(1, 6), x = rand(8, 20); return typed("For the rule y = " + m + "x + " + b + ", what is y when x = " + x + "?", m * x + b, m + "(" + x + ") + " + b + " = " + (m * x) + " + " + b + " = " + (m * x + b) + ".", "Type a number"); },
      function () { const s = pick([{ t: "1, 3, 6, 10, 15, ?", a: 21, e: "Triangular numbers — the gaps grow +2, +3, +4, +5, so next is +6: 15 + 6 = 21." }, { t: "2, 5, 10, 17, 26, ?", a: 37, e: "The differences are 3, 5, 7, 9 (odd numbers); next is 11: 26 + 11 = 37. (These are n² + 1.)" }, { t: "1, 2, 4, 7, 11, 16, ?", a: 22, e: "The gaps grow 1, 2, 3, 4, 5; next is 6: 16 + 6 = 22." }, { t: "1, 1, 2, 3, 5, 8, 13, ?", a: 21, e: "Each term is the sum of the two before it: 8 + 13 = 21 (Fibonacci)." }]); return typed("What number comes next?<br>" + s.t, s.a, s.e, "Type a number"); }
    ]
  ];

  /* ============================ GEOMETRY & MEASUREMENT ============================ */
  const geometry = [
    [ // MEDIUM
      function () { const l = rand(3, 15), w = rand(3, 15); return typed("A rectangle is " + l + " by " + w + ". What is its area?", l * w, "Area = length × width = " + l + " × " + w + " = " + (l * w) + ".", "Type a number"); },
      function () { const l = rand(3, 15), w = rand(3, 15); return typed("A rectangle is " + l + " by " + w + ". What is its perimeter?", 2 * (l + w), "Perimeter = 2 × (length + width) = 2 × (" + l + " + " + w + ") = " + (2 * (l + w)) + ".", "Type a number"); },
      function () { const b = rand(2, 16), h = rand(2, 16), area = b * h / 2; return typed("A triangle has base " + b + " and height " + h + ". What is its area?", area, "Area = ½ × base × height = ½ × " + b + " × " + h + " = " + area + ".", "Type a number"); }
    ],
    [ // HARD
      function () { const l = rand(2, 10), w = rand(2, 10), h = rand(2, 10); return typed("A box measures " + l + " × " + w + " × " + h + ". What is its volume?", l * w * h, "Volume = length × width × height = " + l + " × " + w + " × " + h + " = " + (l * w * h) + ".", "Type a number"); },
      function () { const r = pick([5, 10, 20, 50]), a = Number((3.14 * r * r).toFixed(2)); return typed("A circle has radius " + r + ". What is its area? (Use π ≈ 3.14)", a, "Area = π × r² ≈ 3.14 × " + r + "² = 3.14 × " + (r * r) + " = " + a + ".", "Type a number"); },
      function () { const r = pick([5, 10, 25, 50, 100]), c = Number((2 * 3.14 * r).toFixed(2)); return typed("A circle has radius " + r + ". What is its circumference? (Use π ≈ 3.14)", c, "Circumference = 2 × π × r ≈ 2 × 3.14 × " + r + " = " + c + ".", "Type a number"); }
    ],
    [ // CHALLENGING
      function () { const a1 = rand(20, 70); return typed("Two angles are complementary. One measures " + a1 + "°. What is the other?", 90 - a1, "Complementary angles add to 90°: 90 − " + a1 + " = " + (90 - a1) + "°.", "Type a number"); },
      function () { const a1 = rand(30, 140); return typed("Two angles are supplementary. One measures " + a1 + "°. What is the other?", 180 - a1, "Supplementary angles add to 180°: 180 − " + a1 + " = " + (180 - a1) + "°.", "Type a number"); },
      function () { const l = pick([4, 6, 8, 12]), w = rand(2, 12), area = l * w; return typed("A rectangle has area " + area + " and length " + l + ". What is its width?", w, "Width = area ÷ length = " + area + " ÷ " + l + " = " + w + ".", "Type a number"); },
      function () { const l = rand(2, 6), w = rand(2, 6), h = rand(2, 6), sa = 2 * (l * w + l * h + w * h); return typed("A box is " + l + " × " + w + " × " + h + ". What is its surface area?", sa, "Surface area = 2(lw + lh + wh) = 2(" + (l * w) + " + " + (l * h) + " + " + (w * h) + ") = " + sa + ".", "Type a number"); }
    ]
  ];

  /* ============================ DATA & STATISTICS ============================ */
  const data = [
    [ // MEDIUM
      function () { const a = [rand(2, 9), rand(2, 9), rand(2, 9), rand(2, 9)], s = a.reduce((x, y) => x + y, 0), m = fmt(s / 4); return typed("Find the mean (average) of " + a.join(", ") + ".", m, "Add them: " + a.join(" + ") + " = " + s + ", then divide by 4: " + s + " ÷ 4 = " + m + ".", "Type a number"); },
      function () { const a = [rand(1, 9), rand(1, 9), rand(1, 9), rand(1, 9), rand(1, 9)].sort((x, y) => x - y); return typed("Find the median of " + a.join(", ") + ".", a[2], "Put them in order, then take the middle value: " + a[2] + ".", "Type a number"); },
      function () { const a = [rand(1, 20), rand(1, 20), rand(1, 20), rand(1, 20)], r = Math.max.apply(null, a) - Math.min.apply(null, a); return typed("Find the range of " + a.join(", ") + ".", r, "Range = largest − smallest = " + Math.max.apply(null, a) + " − " + Math.min.apply(null, a) + " = " + r + ".", "Type a number"); }
    ],
    [ // HARD
      function () { const a = [rand(1, 9), rand(1, 9), rand(1, 9), rand(1, 9), rand(1, 9), rand(1, 9)].sort((x, y) => x - y), med = (a[2] + a[3]) / 2; return typed("Find the median of " + a.join(", ") + ".", med, "With 6 numbers there are two middle ones — average them: (" + a[2] + " + " + a[3] + ") ÷ 2 = " + med + ".", "Type a number"); },
      function () { const m = pick([5, 6, 7, 8, 9, 10]), known = [rand(1, 9), rand(1, 9), rand(1, 9)], ks = known.reduce((x, y) => x + y, 0), missing = m * 4 - ks; return typed("The mean of four numbers is " + m + ". Three of them are " + known.join(", ") + ". What is the fourth?", missing, "The four must total " + m + " × 4 = " + (m * 4) + ". Subtract the known sum: " + (m * 4) + " − " + ks + " = " + missing + ".", "Type a number"); },
      function () { const red = rand(2, 6), blue = rand(2, 6); return typedFrac("A bag has " + red + " red and " + blue + " blue marbles. What is the probability of drawing red? (as a fraction)", red + "/" + (red + blue), fracStr(red, red + blue), "P(red) = red ÷ total = " + red + "/" + (red + blue) + (fracStr(red, red + blue) !== red + "/" + (red + blue) ? " = " + fracStr(red, red + blue) : "") + "."); }
    ],
    [ // CHALLENGING
      function () { const k = pick([4, 5]), cur = pick([78, 80, 82, 84]), target = cur + rand(1, 4), need = target * (k + 1) - cur * k; return typed("Your average on " + k + " tests is " + cur + ". What must you score on the next test to raise your average to " + target + "?", need, "You need a total of " + (k + 1) + " × " + target + " = " + (target * (k + 1)) + ". You already have " + k + " × " + cur + " = " + (cur * k) + ". So you need " + (target * (k + 1)) + " − " + (cur * k) + " = " + need + ".", "Type a number"); },
      function () { const a = [rand(2, 9), rand(2, 9), rand(2, 9)], os = a.reduce((x, y) => x + y, 0), nm = pick([5, 6, 7, 8]), v = nm * 4 - os; return typed("Three numbers are " + a.join(", ") + ". What value must be added so that the mean of all four is " + nm + "?", v, "Four numbers averaging " + nm + " total " + (nm * 4) + ". The new value = " + (nm * 4) + " − " + os + " = " + v + ".", "Type a number"); },
      function () { const total = pick([6, 8, 10, 12]), fav = rand(1, total - 1); return typedFrac("A spinner has " + total + " equal sections, " + fav + " of them blue. What is the probability of landing on blue? (as a fraction)", fav + "/" + total, fracStr(fav, total), "P(blue) = blue ÷ total = " + fav + "/" + total + (fracStr(fav, total) !== fav + "/" + total ? " = " + fracStr(fav, total) : "") + "."); }
    ]
  ];

  const GEN = {
    fractions: fractions, integers: integers, order: order, ratios: ratios,
    exponents: exponents, equations: equations, graphing: graphing,
    numbertheory: numbertheory, patterns: patterns, geometry: geometry, data: data
  };

  function titleFor(id) { const t = (typeof TOPICS !== "undefined") ? TOPICS.find(x => x.id === id) : null; return t ? t.title : ""; }
  function clampLvl(l) { return Math.max(1, Math.min(3, l)); }
  function tierArr(id, level) { return GEN[id][clampLvl(level) - 1]; }
  function questionForTopic(id, level) { const q = pick(tierArr(id, level))(); q._level = clampLvl(level); return q; }
  function question(level) { const id = pick(Object.keys(GEN)); const q = questionForTopic(id, level); q._topic = titleFor(id); return q; }

  const BLEND = [1, 2, 2, 3, 3]; // lean toward advanced/challenge
  function generate(id, n) {
    const out = [], seen = {}; let g = 0;
    while (out.length < n && g < n * 50) { const q = questionForTopic(id, pick(BLEND)); if (!seen[q.q]) { seen[q.q] = 1; out.push(q); } g++; }
    return out;
  }
  function mixed(n) {
    const out = [], seen = {}, ids = Object.keys(GEN); let g = 0;
    while (out.length < n && g < n * 50) { const id = pick(ids); const q = questionForTopic(id, pick(BLEND)); if (!seen[q.q]) { seen[q.q] = 1; q._topic = titleFor(id); out.push(q); } g++; }
    return out;
  }

  window.MathGen = { question: question, questionForTopic: questionForTopic, generate: generate, mixed: mixed, topics: Object.keys(GEN) };
})();
