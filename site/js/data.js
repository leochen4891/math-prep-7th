/* ====== Math Placement Prep — topic metadata + AoPS-style lessons ======
   Quizzes are produced by js/generators.js. This file holds the lesson text. */

const TEST_DATE = "2026-06-10"; // Wednesday, June 10, 2026

const TOPICS = [
  /* ---------------- DAY 1 ---------------- */
  {
    id: "fractions", day: 1, emoji: "🍕", title: "Fractions, Decimals & Percents",
    lesson: `
      <h2>🍕 Fractions, Decimals &amp; Percents</h2>
      <p>Here's the big idea most people miss: a fraction, a decimal, and a percent are <b>three different costumes for the exact same number</b>. "Half" doesn't change when you write it as 1/2, 0.5, or 50% — only its outfit changes. Once you can switch costumes freely, a huge amount of math gets easy.</p>
      <table class="convert">
        <tr><th>Fraction</th><th>Decimal</th><th>Percent</th><th>Picture</th></tr>
        <tr><td>1/2</td><td>0.5</td><td>50%</td><td>half</td></tr>
        <tr><td>3/4</td><td>0.75</td><td>75%</td><td>three quarters</td></tr>
        <tr><td>1/5</td><td>0.2</td><td>20%</td><td>one fifth</td></tr>
      </table>

      <h3>What a fraction really means</h3>
      <p>A fraction <b>a/b</b> means "cut a whole into <b>b</b> equal pieces, then take <b>a</b> of them." The bottom number (denominator) tells you the <i>size</i> of the pieces; the top (numerator) tells you <i>how many</i> you grabbed. That single idea explains every rule below.</p>

      <h3>Converting between the three forms</h3>
      <h4>Fraction → Decimal: just divide</h4>
      <p>The fraction bar literally means "divide." So 3/4 is just 3 ÷ 4.</p>
      <div class="worked">3/4 → 3 ÷ 4 = <b class="ans">0.75</b><br>5/8 → 5 ÷ 8 = <b class="ans">0.625</b></div>
      <h4>Decimal → Percent: ×100</h4>
      <p>"Percent" means "per hundred," so a percent is just the decimal scaled up by 100. Shortcut: <b>move the dot two places right</b>.</p>
      <div class="worked">0.75 → <b class="ans">75%</b> &nbsp;·&nbsp; 0.4 → <b class="ans">40%</b> &nbsp;·&nbsp; 1.2 → <b class="ans">120%</b></div>
      <h4>Percent → Decimal: ÷100</h4>
      <p>Going the other way, <b>move the dot two places left</b> and drop the % sign.</p>
      <div class="worked">40% → <b class="ans">0.40</b> &nbsp;·&nbsp; 7% → <b class="ans">0.07</b> &nbsp;·&nbsp; 125% → <b class="ans">1.25</b></div>
      <h4>Decimal → Fraction: read it out loud</h4>
      <p>Say the decimal: 0.6 is "six tenths," which <i>is</i> 6/10. Then simplify.</p>
      <div class="worked">0.6 = 6/10 = <b class="ans">3/5</b> &nbsp;·&nbsp; 0.25 = 25/100 = <b class="ans">1/4</b></div>

      <h3>Simplifying fractions (and why it's allowed)</h3>
      <p>Dividing the top and bottom by the same number doesn't change the value — you're just cutting the pizza into fewer, bigger slices that add up to the same amount.</p>
      <div class="worked">6/8: both share a factor of 2 → 6÷2 / 8÷2 = <b class="ans">3/4</b></div>
      <div class="tip">💡 To simplify fastest, divide by the <b>greatest</b> common factor. 12/18 → both ÷6 → 2/3 in one step.</div>

      <h3>Comparing &amp; ordering</h3>
      <p>Never compare a fraction, a decimal, and a percent while they're in different costumes. <b>Put them all in the same form first</b> (decimals are usually easiest).</p>
      <div class="worked">Which is biggest: 1/2, 0.4, 30%?<br>1/2 = 0.5, &nbsp; 0.4 = 0.4, &nbsp; 30% = 0.3<br>Biggest is 0.5 = <b class="ans">1/2</b></div>

      <h3>Adding &amp; subtracting fractions</h3>
      <p>You can only add pieces that are the <b>same size</b> — so you need a common denominator. (You can't add 1 "half-slice" to 1 "third-slice" until you re-cut them into the same size.)</p>
      <div class="worked">1/2 + 1/3<br>Common bottom 6: &nbsp; 3/6 + 2/6 = <b class="ans">5/6</b></div>

      <h3>Multiplying fractions — straight across</h3>
      <p>No common denominator needed! "2/3 of 4/5" means take 4/5, then take 2/3 of <i>that</i> — multiply tops and multiply bottoms.</p>
      <div class="worked">2/3 × 4/5 = (2×4)/(3×5) = <b class="ans">8/15</b></div>

      <h3>Dividing fractions — Keep, Change, Flip 🔄</h3>
      <p>Dividing by 1/4 asks "how many quarter-pieces fit in here?" Multiplying by the flipped fraction (the <b>reciprocal</b>) answers that.</p>
      <div class="worked">1/2 ÷ 1/4 → 1/2 × 4/1 = 4/2 = <b class="ans">2</b> &nbsp;(yes, two quarters fit in a half!)</div>

      <h3>Percent of a number</h3>
      <p>"% of" → turn the percent into a decimal and multiply.</p>
      <div class="worked">25% of 80 → 0.25 × 80 = <b class="ans">20</b></div>
      <h3>Percent increase &amp; decrease</h3>
      <div class="worked">A $40 shirt, 25% off:<br>You pay 100% − 25% = 75% → 0.75 × 40 = <b class="ans">$30</b></div>
      <div class="worked">Reverse it: after 20% off, it costs $48. Original?<br>$48 is 80% of the original → 48 ÷ 0.8 = <b class="ans">$60</b></div>

      <div class="pitfall">⚠️ <b>Common mistakes:</b> (1) Adding fractions by adding tops AND bottoms — 1/2 + 1/3 is <b>not</b> 2/5! (2) Forgetting that "% off" means you pay the <i>rest</i>. (3) Two discounts (20% then 10%) do <b>not</b> equal 30% off — apply them one at a time.</div>
      <div class="tip">💡 Memorize these forever: 1/2=50%, 1/4=25%, 3/4=75%, 1/5=20%, 1/3≈33%, 1/8=12.5%. They show up constantly.</div>
    `
  },

  /* ---------------- DAY 2 ---------------- */
  {
    id: "integers", day: 2, emoji: "🌡️", title: "Integers & Negative Numbers",
    lesson: `
      <h2>🌡️ Integers &amp; Negative Numbers</h2>
      <p><b>Integers</b> are the whole numbers plus their negatives: …−3, −2, −1, 0, 1, 2, 3… The secret to never getting confused is to picture a <b>number line</b>: positives go right, negatives go left, and 0 is home base.</p>
      <p>Think of it like a thermometer or money: <b>+</b> is warmer / money you have, <b>−</b> is colder / debt you owe.</p>

      <h3>Adding integers</h3>
      <h4>Same signs → add and keep the sign</h4>
      <p>Two debts make a bigger debt; two gains make a bigger gain.</p>
      <div class="worked">−4 + (−3): both negative → 4+3=7, keep the minus → <b class="ans">−7</b></div>
      <h4>Different signs → subtract, keep the bigger one's sign</h4>
      <p>A gain and a debt partly cancel. Whoever is "stronger" wins.</p>
      <div class="worked">−8 + 5: 8 vs 5 → 8−5 = 3; the 8 was negative → <b class="ans">−3</b></div>

      <h3>Subtracting = "Add the Opposite" 🔁</h3>
      <p>This is the trick that fixes almost all negative-number errors. <b>Subtracting is the same as adding the opposite.</b> Change the subtraction to addition, flip the sign of the next number, and use the adding rules.</p>
      <div class="worked">3 − (−5) → 3 + (+5) = <b class="ans">8</b> &nbsp;(subtracting a debt is like getting money!)<br>−2 − 6 → −2 + (−6) = <b class="ans">−8</b></div>

      <h3>Multiplying &amp; dividing — count the negative signs</h3>
      <ul>
        <li>negative × negative = <b>positive</b></li>
        <li>negative × positive = <b>negative</b></li>
      </ul>
      <p><b>Why does neg × neg = positive?</b> Watch the pattern: −3×2 = −6, −3×1 = −3, −3×0 = 0, −3×(−1) = +3. Each step the answer climbs by 3, so it must keep going positive. The rule isn't random — it's the only way the pattern stays consistent.</p>
      <div class="worked">−3 × −4 = <b class="ans">12</b> &nbsp;·&nbsp; −5 × 4 = <b class="ans">−20</b> &nbsp;·&nbsp; −12 ÷ −3 = <b class="ans">4</b></div>
      <div class="tip">💡 Shortcut: an <b>even</b> number of negative signs → positive; an <b>odd</b> number → negative.</div>

      <h3>Absolute value | |</h3>
      <p>|x| means "distance from 0," and distance is never negative. So |−7| = 7 and |7| = 7. Do whatever is inside first, then take the distance.</p>
      <div class="worked">|−5| + |3| = 5 + 3 = <b class="ans">8</b><br>|4 − 9| = |−5| = <b class="ans">5</b></div>

      <h3>Negatives with order of operations</h3>
      <div class="worked">−3 + 4 × (−2)<br>Multiply first: 4 × (−2) = −8<br>−3 + (−8) = <b class="ans">−11</b></div>

      <div class="pitfall">⚠️ <b>The #1 trap:</b> −3² vs (−3)². Without parentheses, the exponent grabs only the 3: −3² = −(3×3) = −9. With parentheses, (−3)² = (−3)(−3) = +9. Tiny parentheses, totally different answer.</div>
      <div class="tip">💡 When subtracting, rewrite it as "+ the opposite" <i>every time</i> until it's automatic. It kills sign mistakes.</div>
    `
  },

  /* ---------------- DAY 3 ---------------- */
  {
    id: "order", day: 3, emoji: "🔢", title: "Order of Operations & Expressions",
    lesson: `
      <h2>🔢 Order of Operations &amp; Expressions</h2>
      <p>Here's a problem: what is 2 + 3 × 4? If you go left to right you get 20; if you multiply first you get 14. They can't both be right — so mathematicians <b>agreed on one order</b> so everyone on Earth gets the same answer. That agreement is PEMDAS.</p>
      <ul>
        <li><b>P</b> — Parentheses (and brackets) first</li>
        <li><b>E</b> — Exponents next</li>
        <li><b>MD</b> — Multiply &amp; Divide, left to right</li>
        <li><b>AS</b> — Add &amp; Subtract, left to right</li>
      </ul>
      <div class="tip">💡 <b>P</b>lease <b>E</b>xcuse <b>M</b>y <b>D</b>ear <b>A</b>unt <b>S</b>ally. Key subtlety: M/D are a <i>tie</i> (do them left to right), and so are A/S. Multiply does NOT always come before divide.</div>

      <h3>Worked examples, easy → hard</h3>
      <div class="worked">2 + 3 × 4 → multiply first → 2 + 12 = <b class="ans">14</b></div>
      <div class="worked">(2 + 3) × 4 → parentheses first → 5 × 4 = <b class="ans">20</b></div>
      <div class="worked">10 − 2 × 3 + 1 → 10 − 6 + 1 = <b class="ans">5</b></div>
      <div class="worked">2 + 3 × 4² → exponent: 4²=16 → 3×16=48 → 2+48 = <b class="ans">50</b></div>
      <div class="worked">4 + 2 × [3 + (5 − 2)²]<br>Innermost: (5−2)² = 3² = 9<br>Brackets: 3 + 9 = 12<br>Then: 4 + 2×12 = 4 + 24 = <b class="ans">28</b></div>
      <p>Notice the strategy: with nested grouping, work from the <b>inside out</b>, one layer at a time.</p>

      <h3>Expressions with variables</h3>
      <p>A letter just stands for an unknown number. To <b>evaluate</b> an expression, substitute the value (use parentheses!) and run PEMDAS.</p>
      <div class="worked">Evaluate 3x + 2 when x = 5<br>3(5) + 2 = 15 + 2 = <b class="ans">17</b></div>
      <div class="worked">Evaluate 2x² when x = −3<br>Square first: (−3)² = 9, then 2 × 9 = <b class="ans">18</b> &nbsp;(<i>not</i> (2·−3)² = 36)</div>

      <h3>Combining like terms</h3>
      <p>"Like terms" have the exact same variable part. You can add 4 apples + 2 apples = 6 apples (4x + 2x = 6x), but you can't combine apples with plain numbers.</p>
      <div class="worked">3x + 5 − x + 2 − 4x<br>x-terms: 3x − x − 4x = −2x<br>numbers: 5 + 2 = 7<br>→ <b class="ans">−2x + 7</b></div>

      <div class="pitfall">⚠️ <b>Common mistakes:</b> (1) Doing addition before multiplication. (2) Treating 3² as 3×2. (3) Forgetting that "−" in front of a term travels <i>with</i> that term when you combine.</div>
      <div class="tip">💡 Underline or box each "chunk" (each term with its sign) before you combine — it prevents losing a negative.</div>
    `
  },

  /* ---------------- DAY 4 ---------------- */
  {
    id: "ratios", day: 4, emoji: "⚖️", title: "Ratios, Rates & Proportions",
    lesson: `
      <h2>⚖️ Ratios, Rates &amp; Proportions</h2>
      <p>A <b>ratio</b> compares two quantities — "3 cats to 2 dogs" is 3:2. The magic of ratios is that they stay true when you <b>scale</b> them up or down: 3:2 is the same relationship as 6:4 and 30:20.</p>

      <h3>Equivalent ratios (scaling)</h3>
      <p>Multiply (or divide) both parts by the same number and the ratio is unchanged.</p>
      <div class="worked">Red:Blue = 3:5. If there are 9 red, how many blue?<br>9 ÷ 3 = 3, so scale up by 3: &nbsp; 5 × 3 = <b class="ans">15 blue</b></div>

      <h3>Unit rate — the "per one" amount</h3>
      <p>A rate compares different units (miles per hour, dollars per item). A <b>unit rate</b> is per <i>one</i> of something — just divide.</p>
      <div class="worked">150 miles in 3 hours → 150 ÷ 3 = <b class="ans">50 miles per hour</b><br>$12 for 4 notebooks → 12 ÷ 4 = <b class="ans">$3 each</b></div>
      <p>Unit rates are powerful: once you know "$3 each," you can find the cost of any number — 7 notebooks = 7 × $3 = $21.</p>

      <h3>Proportions &amp; cross-multiplication</h3>
      <p>A <b>proportion</b> says two ratios are equal: a/b = c/d. To solve for a missing piece, <b>cross-multiply</b> (multiply diagonally) then divide.</p>
      <div class="worked">2/3 = x/12<br>Cross-multiply: 2 × 12 = 3 × x → 24 = 3x → x = 24 ÷ 3 = <b class="ans">8</b></div>
      <p><b>Why does cross-multiplying work?</b> Multiply both sides of a/b = c/d by b and by d, and the b's and d's cancel, leaving a·d = b·c. It's just clearing the fractions.</p>

      <h3>Percent is a ratio out of 100</h3>
      <div class="worked">What is 25% of 80? &nbsp; 25/100 = x/80 → x = <b class="ans">20</b><br>What percent of 80 is 60? &nbsp; 60 ÷ 80 = 0.75 = <b class="ans">75%</b></div>
      <div class="worked">A price rises from $40 to $50. Percent increase?<br>Change = $10. As a percent of the <b>original</b>: 10 ÷ 40 = 0.25 = <b class="ans">25%</b></div>

      <h3>Three-part ratios</h3>
      <div class="worked">Three numbers are in ratio 2:3:5 and total 60.<br>Parts: 2+3+5 = 10. One part = 60 ÷ 10 = 6.<br>Largest = 5 × 6 = <b class="ans">30</b></div>

      <div class="pitfall">⚠️ <b>Common mistakes:</b> (1) Writing the ratio backwards — "3 cats to 2 dogs" is 3:2, not 2:3. (2) For percent change, dividing by the <i>new</i> value instead of the <b>original</b>. (3) Setting up a proportion with mismatched units (miles over hours must line up with miles over hours).</div>
      <div class="tip">💡 Label your proportion's units on top and bottom (miles/hours = miles/hours). If the labels line up, your setup is right.</div>
    `
  },

  /* ---------------- DAY 5 ---------------- */
  {
    id: "exponents", day: 5, emoji: "⚡", title: "Exponents & Powers",
    lesson: `
      <h2>⚡ Exponents &amp; Powers</h2>
      <p>An exponent is a shortcut for <b>repeated multiplication</b>. Instead of writing 2 × 2 × 2 × 2 × 2, we write 2⁵. The big number (base) is what you multiply; the little number (exponent) is how many times.</p>
      <div class="worked">2³ = 2 × 2 × 2 = <b class="ans">8</b> &nbsp;(read "2 to the 3rd power")<br>5² = 5 × 5 = <b class="ans">25</b> &nbsp;(read "5 squared")</div>

      <h3>Squares worth memorizing</h3>
      <table class="convert">
        <tr><th>n</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td></tr>
        <tr><th>n²</th><td>1</td><td>4</td><td>9</td><td>16</td><td>25</td><td>36</td><td>49</td><td>64</td><td>81</td><td>100</td><td>121</td><td>144</td></tr>
      </table>

      <h3>Special cases (and why)</h3>
      <ul>
        <li><b>Power of 1:</b> 7¹ = 7 (multiplying "one 7" is just 7).</li>
        <li><b>Power of 0:</b> 9⁰ = 1. Strange, but it keeps the patterns consistent (each step down in exponent divides by the base: 9³=729, 9²=81, 9¹=9, 9⁰=1).</li>
        <li><b>Powers of 10:</b> 10² = 100, 10³ = 1000 — the exponent is the number of zeros.</li>
      </ul>

      <h3>Square roots √ (the inverse of squaring)</h3>
      <p>√25 asks "what <i>positive</i> number times itself gives 25?" Since 5×5 = 25, √25 = 5. Knowing your squares table makes roots instant.</p>
      <div class="worked">√49 = <b class="ans">7</b> &nbsp;·&nbsp; √144 = <b class="ans">12</b> &nbsp;·&nbsp; √100 = <b class="ans">10</b></div>
      <div class="pitfall">⚠️ <b>One root vs. two — a key difference:</b> The radical sign √ always means the <b>positive</b> root, so √81 = 9 only. But the <i>equation</i> x² = 81 has <b>two</b> solutions: <b>x = 9 or x = −9</b>, because 9² = 81 <i>and</i> (−9)² = 81. We write that as x = ±9. (If a question asks for "the positive value of x," it just wants 9.)</div>

      <h3>Negative bases</h3>
      <div class="worked">(−2)³ = (−2)(−2)(−2) = <b class="ans">−8</b> &nbsp;(odd power → negative)<br>(−2)⁴ = <b class="ans">16</b> &nbsp;(even power → positive)</div>

      <h3>Exponent rules (a sneak peek at algebra)</h3>
      <p>When the <b>base is the same</b>: multiplying <b>adds</b> exponents, dividing <b>subtracts</b> them, and a power of a power <b>multiplies</b> them.</p>
      <div class="worked">2³ × 2² = 2⁵ = <b class="ans">32</b> &nbsp;(3 + 2 = 5)<br>2⁵ ÷ 2² = 2³ = <b class="ans">8</b> &nbsp;(5 − 2 = 3)<br>(2²)³ = 2⁶ = <b class="ans">64</b> &nbsp;(2 × 3 = 6)<br>x³ · x⁴ = x⁷ &nbsp;(the rule works with letters too)</div>

      <div class="pitfall">⚠️ <b>The classic trap:</b> 3² is 3×3 = 9, NOT 3×2 = 6. The exponent means multiply the base by <i>itself</i>, not by the exponent.</div>
      <div class="tip">💡 Always do exponents <b>before</b> multiplying/adding (that's the E in PEMDAS). 2 + 3² = 2 + 9 = 11, not 25.</div>
    `
  },

  /* ---------------- DAY 6 ---------------- */
  {
    id: "equations", day: 6, emoji: "🧩", title: "Equations & Inequalities",
    lesson: `
      <h2>🧩 Solving Equations</h2>
      <p>An equation is a <b>balance scale</b>: the "=" means both sides weigh the same. Your job is to get the variable alone on one side. The golden rule: <b>whatever you do to one side, do to the other</b> — that keeps the scale balanced.</p>
      <p>You "undo" operations using their <b>inverse</b>: + undoes −, × undoes ÷.</p>

      <h3>One-step equations</h3>
      <div class="worked">x + 7 = 12 → subtract 7 from both sides → x = <b class="ans">5</b><br>3x = 15 → divide both sides by 3 → x = <b class="ans">5</b><br>x/4 = 2 → multiply both sides by 4 → x = <b class="ans">8</b></div>

      <h3>Two-step equations — undo in reverse order</h3>
      <p>Build-up order is "multiply, then add," so to take it apart you <b>undo the +/− first, then the ×/÷</b> (reverse of PEMDAS — like taking off your shoes before your socks).</p>
      <div class="worked">2x + 3 = 11<br>Step 1 — subtract 3: &nbsp; 2x = 8<br>Step 2 — divide by 2: &nbsp; x = <b class="ans">4</b><br><b>Check:</b> 2(4) + 3 = 11 ✓</div>

      <h3>Distributing first</h3>
      <p>If there's a number hugging a parenthesis, multiply it through, then solve.</p>
      <div class="worked">3(x + 2) = 21<br>Distribute: 3x + 6 = 21<br>Subtract 6: 3x = 15 → x = <b class="ans">5</b><br>(Shortcut: divide by 3 first → x + 2 = 7 → x = 5)</div>

      <h3>Variables on both sides</h3>
      <p>Collect the variables on one side and the numbers on the other.</p>
      <div class="worked">5x + 7 = 2x + 22<br>Subtract 2x: 3x + 7 = 22<br>Subtract 7: 3x = 15 → x = <b class="ans">5</b></div>

      <h3>Equations with fractions</h3>
      <div class="worked">(x + 3)/2 = 8<br>Multiply both sides by 2: x + 3 = 16<br>Subtract 3: x = <b class="ans">13</b></div>

      <h3>Inequalities — solved almost the same way</h3>
      <p>An inequality uses <b>&lt;, &gt;, ≤, ≥</b> instead of =. You isolate the variable exactly like an equation — but there's <b>one special rule</b>.</p>
      <div class="worked">x + 3 &gt; 7 → subtract 3 → x &gt; <b class="ans">4</b> &nbsp;(every number bigger than 4 is a solution)</div>
      <div class="worked">2x ≤ 10 → divide by 2 → x ≤ <b class="ans">5</b></div>
      <h4>⚠️ The flip rule</h4>
      <p>When you <b>multiply or divide both sides by a negative number, flip the inequality sign.</b></p>
      <div class="worked">−2x &lt; 6 → divide both sides by −2 and flip → x &gt; <b class="ans">−3</b></div>

      <div class="pitfall">⚠️ <b>Common mistakes:</b> (1) Only doing the operation to one side. (2) Undoing the ×/÷ before the +/−. (3) Dropping a negative sign when moving a term across. Always <b>check</b> your answer by plugging it back in.</div>
      <div class="tip">💡 The check isn't optional bonus work — it catches almost every mistake in seconds. Substitute your x and make sure both sides match.</div>
    `
  },

  /* ---------------- DAY 7 ---------------- */
  {
    id: "graphing", day: 7, emoji: "📍", title: "Coordinate Plane & Word Problems",
    lesson: `
      <h2>📍 The Coordinate Plane</h2>
      <p>Two number lines cross to make a map: the <b>x-axis</b> runs left–right, the <b>y-axis</b> runs up–down, and they meet at the <b>origin</b> (0, 0). Every point has an address written <b>(x, y)</b>.</p>
      <p><b>x first, then y</b> — always. Read it as: walk <i>across</i> first (the x), then <i>up or down</i> (the y). ("You go in the door, then up the stairs.")</p>
      <div class="worked">(3, 2) → right 3, then up 2<br>(−4, 1) → left 4, then up 1<br>(5, −2) → right 5, then down 2</div>

      <h3>The four quadrants</h3>
      <ul>
        <li>Quadrant I: (+, +) — top right</li>
        <li>Quadrant II: (−, +) — top left</li>
        <li>Quadrant III: (−, −) — bottom left</li>
        <li>Quadrant IV: (+, −) — bottom right</li>
      </ul>
      <p>They're numbered counter-clockwise starting from the top right. The <b>signs</b> of x and y tell you the quadrant instantly.</p>

      <h2>📝 Word Problems — translate words into math</h2>
      <p>The whole skill is turning English into an expression or equation. Watch for keyword clues:</p>
      <ul>
        <li>"sum / total / more / increased" → <b>+</b></li>
        <li>"difference / less / fewer / decreased" → <b>−</b></li>
        <li>"product / of / times / each" → <b>×</b></li>
        <li>"quotient / per / split / shared equally" → <b>÷</b></li>
        <li>"is / equals / result" → <b>=</b></li>
      </ul>

      <h3>From a few words to one equation</h3>
      <div class="worked">"A number tripled, then increased by 4, is 25."<br>Translate: 3x + 4 = 25<br>Solve: 3x = 21 → x = <b class="ans">7</b></div>
      <div class="worked">"Maria is 3 times as old as her brother. Together they are 32."<br>Brother = x, Maria = 3x → x + 3x = 32 → 4x = 32 → brother = <b class="ans">8</b></div>
      <div class="worked">"The sum of two consecutive integers is 27."<br>They are x and x+1 → x + (x+1) = 27 → 2x + 1 = 27 → x = <b class="ans">13</b> (so 13 and 14)</div>

      <h3>Multi-step problems</h3>
      <div class="worked">"Maya buys 4 packs of 8 markers, then gives away 5."<br>4 × 8 = 32, then 32 − 5 = <b class="ans">27</b></div>

      <div class="pitfall">⚠️ <b>Common mistakes:</b> (1) Reversing coordinates — (3, 2) is NOT (2, 3). (2) Grabbing the keyword without thinking ("less than" often flips the order: "5 less than x" is x − 5, not 5 − x). (3) Forgetting to answer the actual question (it may ask for the smaller integer, not x).</div>
      <div class="tip">💡 For word problems: define your variable in words first ("let x = the brother's age"), write the equation, solve, then re-read the question to give the exact thing it asked for.</div>
    `
  },

  /* ---------------- CHAPTER 8 ---------------- */
  {
    id: "numbertheory", day: 8, emoji: "🧮", title: "Factors, Multiples & Number Theory",
    lesson: `
      <h2>🧮 Factors, Multiples &amp; Number Theory</h2>
      <p>Before algebra, you need to be quick with the building blocks of numbers: <b>factors</b> (what divides into a number) and <b>multiples</b> (its times table). Two ideas show up constantly — GCF and LCM.</p>

      <h3>Factors vs. multiples</h3>
      <ul>
        <li><b>Factors</b> of 12: 1, 2, 3, 4, 6, 12 (they divide 12 evenly).</li>
        <li><b>Multiples</b> of 12: 12, 24, 36, 48, … (12×1, 12×2, …).</li>
      </ul>

      <h3>Prime vs. composite</h3>
      <p>A <b>prime</b> has exactly two factors — 1 and itself (2, 3, 5, 7, 11, …). A <b>composite</b> has more (4, 6, 8, 9, …). The number 1 is neither.</p>

      <h3>Prime factorization</h3>
      <p>Every whole number breaks into a unique product of primes.</p>
      <div class="worked">36 = 4 × 9 = (2×2) × (3×3) = <b class="ans">2² × 3²</b></div>

      <h3>GCF — Greatest Common Factor</h3>
      <p>The biggest number that divides into <b>both</b>. Use it for "split into equal groups" problems.</p>
      <div class="worked">GCF of 18 and 24:<br>factors of 18 = 1, 2, 3, 6, 9, 18 · factors of 24 = 1, 2, 3, 4, 6, 8, 12, 24<br>Largest shared = <b class="ans">6</b></div>

      <h3>LCM — Least Common Multiple</h3>
      <p>The smallest number that <b>both</b> divide into. Use it for "when do they line up again" problems.</p>
      <div class="worked">LCM of 6 and 8:<br>multiples of 6 = 6, 12, 18, 24… · multiples of 8 = 8, 16, 24…<br>First shared = <b class="ans">24</b></div>
      <div class="tip">💡 Fast LCM: <b>LCM(a, b) = (a × b) ÷ GCF(a, b)</b>. For 6 and 8: 48 ÷ 2 = 24.</div>

      <div class="pitfall">⚠️ Don't mix them up: <b>GCF</b> is for <i>splitting/sharing</i> (it's ≤ your numbers); <b>LCM</b> is for <i>repeating/lining up</i> (it's ≥ your numbers).</div>
    `
  },

  /* ---------------- CHAPTER 9 ---------------- */
  {
    id: "patterns", day: 9, emoji: "🔁", title: "Patterns, Sequences & Function Tables",
    lesson: `
      <h2>🔁 Patterns, Sequences &amp; Function Tables</h2>
      <p>This is the heart of algebra readiness: finding the <b>rule</b> behind numbers. Readiness tests (especially the IAAT) lean heavily on "find the next term," "find the formula," and "fill in the table."</p>

      <h3>Arithmetic sequences — add the same amount</h3>
      <div class="worked">3, 7, 11, 15, … &nbsp;(+4 each time) → next is 15 + 4 = <b class="ans">19</b></div>

      <h3>Geometric sequences — multiply by the same amount</h3>
      <div class="worked">2, 6, 18, 54, … &nbsp;(×3 each time) → next is 54 × 3 = <b class="ans">162</b></div>

      <h3>Find the nth term without listing them all</h3>
      <p>For an arithmetic pattern: <b>term = start + step × (n − 1)</b>.</p>
      <div class="worked">Start 5, add 3, find the 10th term: 5 + 3 × (10 − 1) = 5 + 27 = <b class="ans">32</b></div>

      <h3>Function rules &amp; input-output tables</h3>
      <p>A rule turns an input (x) into an output (y). Read the table to discover the rule.</p>
      <table class="convert"><tr><th>x</th><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>y</th><td>5</td><td>7</td><td>9</td><td>11</td></tr></table>
      <p>y goes up by 2 each step → the coefficient is 2; checking the start gives <b>y = 2x + 3</b>.</p>

      <h3>Reverse a rule (work backwards)</h3>
      <div class="worked">Rule: × 3, then + 2. The output is 17 → input = (17 − 2) ÷ 3 = <b class="ans">5</b></div>

      <div class="tip">💡 Stuck on a sequence? Write the <b>differences</b> between terms. Constant differences → arithmetic. Differences that grow evenly (1, 2, 3, 4…) → patterns like 1, 3, 6, 10 (triangular numbers).</div>
    `
  },

  /* ---------------- CHAPTER 10 ---------------- */
  {
    id: "geometry", day: 10, emoji: "📐", title: "Geometry & Measurement",
    lesson: `
      <h2>📐 Geometry &amp; Measurement</h2>
      <p>Readiness tests include measurement: area, perimeter, volume, circles, and angles. Memorize a handful of formulas and these become fast, reliable points.</p>

      <h3>Rectangles &amp; squares</h3>
      <p>Area = length × width. &nbsp; Perimeter = 2 × (length + width).</p>
      <div class="worked">An 8 × 5 rectangle: area = 8 × 5 = <b class="ans">40</b>, perimeter = 2 × (8 + 5) = <b class="ans">26</b></div>

      <h3>Triangles</h3>
      <p>Area = ½ × base × height.</p>
      <div class="worked">Base 6, height 4 → ½ × 6 × 4 = <b class="ans">12</b></div>

      <h3>Circles (use π ≈ 3.14)</h3>
      <p>Area = π × r². &nbsp; Circumference = 2 × π × r. &nbsp;(r is the radius.)</p>
      <div class="worked">Radius 10: area ≈ 3.14 × 10² = <b class="ans">314</b>, circumference ≈ 2 × 3.14 × 10 = <b class="ans">62.8</b></div>

      <h3>Volume &amp; surface area of a box</h3>
      <p>Volume = l × w × h. &nbsp; Surface area = 2(lw + lh + wh).</p>
      <div class="worked">A 3 × 4 × 2 box: volume = <b class="ans">24</b>, surface area = 2(12 + 6 + 8) = <b class="ans">52</b></div>

      <h3>Angle pairs</h3>
      <ul>
        <li><b>Complementary</b> angles add to <b>90°</b>.</li>
        <li><b>Supplementary</b> angles add to <b>180°</b>.</li>
      </ul>
      <div class="worked">One of two complementary angles is 35° → the other is 90 − 35 = <b class="ans">55°</b></div>

      <div class="pitfall">⚠️ Don't confuse <b>area</b> (space inside, square units) with <b>perimeter</b> (distance around). And if you're given a circle's <i>diameter</i>, halve it to get the radius first.</div>
    `
  },

  /* ---------------- CHAPTER 11 ---------------- */
  {
    id: "data", day: 11, emoji: "📊", title: "Data & Statistics",
    lesson: `
      <h2>📊 Data &amp; Statistics</h2>
      <p>You'll see "averages" and simple probability. These are quick once you know the three M's and the basic probability idea.</p>

      <h3>Mean (the average)</h3>
      <p>Add all the values, then divide by how many there are.</p>
      <div class="worked">4, 8, 6, 2 → (4 + 8 + 6 + 2) ÷ 4 = 20 ÷ 4 = <b class="ans">5</b></div>

      <h3>Median (the middle)</h3>
      <p>Put the numbers <b>in order</b>, then take the middle. With an even count, average the two middle ones.</p>
      <div class="worked">3, 9, 1, 7, 5 → ordered 1, 3, 5, 7, 9 → middle = <b class="ans">5</b><br>2, 4, 6, 10 → average the two middles: (4 + 6) ÷ 2 = <b class="ans">5</b></div>

      <h3>Mode &amp; Range</h3>
      <ul>
        <li><b>Mode</b> = the value that appears most often.</li>
        <li><b>Range</b> = largest − smallest.</li>
      </ul>

      <h3>Working backwards with the mean</h3>
      <div class="worked">The mean of 4 numbers is 10, so they total 4 × 10 = 40. If three are 8, 12, 9 (sum 29), the fourth is 40 − 29 = <b class="ans">11</b></div>

      <h3>Basic probability</h3>
      <p>P(event) = favorable outcomes ÷ total outcomes.</p>
      <div class="worked">A bag has 3 red and 5 blue marbles. P(red) = 3 ÷ 8 = <b class="ans">3/8</b></div>

      <div class="tip">💡 Always put the numbers <b>in order</b> before finding the median — skipping that step is the most common slip.</div>
    `
  }
];
