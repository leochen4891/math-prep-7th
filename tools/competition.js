/* Hand-authored Math-Kangaroo-style competition problems.
   Appended to each chapter's challenging.json pool.
   Run: node tools/competition.js   (run AFTER dump-questions.js)
*/
const fs = require("fs");
const path = require("path");

const T = (q, accept, solution) => ({ q, type: "typed", accept: accept.map(String), solution, source: "competition" });
const M = (q, choices, answer, solution) => ({ q, type: "mc", choices, answer, solution, source: "competition" });

const COMP = {
  fractions: [
    M("A jacket's price is raised by 20%, then that new price is lowered by 20%. Compared to the start, the final price is:",
      ["Exactly the same", "4% lower", "4% higher", "20% lower"], 1,
      "Raising by 20% multiplies by 1.20; lowering by 20% multiplies by 0.80. Together: 1.20 × 0.80 = 0.96, which is 96% of the original — that's 4% lower. The two 20%s do NOT cancel, because the second one is taken off a bigger number."),
    T("Compute 1/2 + 1/4 + 1/8 + 1/16.", ["15/16"],
      "Use a common denominator of 16: 8/16 + 4/16 + 2/16 + 1/16 = 15/16. (Notice it's just one sixteenth short of a whole.)"),
    T("In a class, 3/5 of the students are girls. If there are 12 boys, how many students are in the class?", ["30"],
      "Boys make up the other 2/5 of the class. So 2/5 of the class = 12, meaning 1/5 = 6, and the whole class = 5 × 6 = 30."),
    T("What is 1/2 of 1/3 of 1/4 of 240?", ["10"],
      "Multiply the fractions together: (1/2)(1/3)(1/4) = 1/24. Then 1/24 of 240 = 240 ÷ 24 = 10."),
    T("If 30% of a number is 45, what is 50% of the same number?", ["75"],
      "If 30% is 45, then 10% is 45 ÷ 3 = 15. So 50% is 5 × 15 = 75. (The whole number is 150.)"),
    M("A store advertises 'Buy 3, get 1 free.' Buying 4 identical items, what percent do you save?", ["20%", "25%", "33%", "50%"], 1,
      "You receive 4 items but pay for only 3. You save 1 out of 4, and 1/4 = 25%.")
  ],
  integers: [
    M("The product of three integers is negative. At most how many of them can be negative?", ["1", "2", "3", "0"], 2,
      "A product is negative only when an ODD number of factors are negative — so 1 or 3 of them. The largest possibility is 3 (negative × negative × negative = negative)."),
    T("What is (−1) + (−1)² + (−1)³ + (−1)⁴?", ["0"],
      "Evaluate each power: (−1)¹ = −1, (−1)² = +1, (−1)³ = −1, (−1)⁴ = +1. Sum: −1 + 1 − 1 + 1 = 0."),
    T("The sum of three consecutive integers is −6. What is the largest of them?", ["-1"],
      "Three consecutive integers can be written n−1, n, n+1. They add to 3n = −6, so n = −2. The integers are −3, −2, −1, and the largest is −1."),
    T("If a = −3, what is a − a²?", ["-12"],
      "First a² = (−3)² = 9. Then a − a² = −3 − 9 = −12. (Be careful: a² is positive even though a is negative.)"),
    T("How many integers are strictly between −5 and 4?", ["8"],
      "The integers strictly between are −4, −3, −2, −1, 0, 1, 2, 3 — that's 8 of them (endpoints −5 and 4 are not counted)."),
    T("Compute −2 − (−2) − (−2).", ["2"],
      "Subtracting a negative adds: −2 − (−2) − (−2) = −2 + 2 + 2 = 2.")
  ],
  order: [
    T("Evaluate (3 + 5)² − 4 × 2³.", ["32"],
      "Parentheses first: 3 + 5 = 8, so (8)² = 64. Exponent: 2³ = 8, then 4 × 8 = 32. Finally 64 − 32 = 32."),
    T("If x = 2 and y = −3, what is x² − y²?", ["-5"],
      "x² = 2² = 4 and y² = (−3)² = 9. Then x² − y² = 4 − 9 = −5."),
    T("What is 100 − 99 + 98 − 97 + 96 − ... + 2 − 1?", ["50"],
      "Group in pairs: (100 − 99) + (98 − 97) + ... + (2 − 1). Each pair equals 1, and there are 50 pairs, so the total is 50."),
    M("Simplify 2(3x − 4) − 3(x − 5).", ["3x + 7", "3x − 23", "9x − 7", "3x − 7"], 0,
      "Distribute: 2(3x − 4) = 6x − 8, and −3(x − 5) = −3x + 15. Combine: 6x − 3x = 3x, and −8 + 15 = 7. Result: 3x + 7."),
    T("Define a★b = a² − b. What is 3★(2★5)?", ["10"],
      "Work inside first: 2★5 = 2² − 5 = 4 − 5 = −1. Then 3★(−1) = 3² − (−1) = 9 + 1 = 10.")
  ],
  ratios: [
    T("A recipe for 4 people needs 6 eggs. How many eggs are needed for 10 people?", ["15"],
      "Eggs per person: 6 ÷ 4 = 1.5. For 10 people: 1.5 × 10 = 15. (Or set up 6/4 = x/10 and cross-multiply.)"),
    T("Two numbers are in the ratio 3 : 4 and their sum is 35. What is the larger number?", ["20"],
      "There are 3 + 4 = 7 equal parts. Each part = 35 ÷ 7 = 5. The larger number is 4 parts: 4 × 5 = 20."),
    T("A car travels 60 km in 45 minutes. What is its speed in km per hour?", ["80"],
      "45 minutes is 3/4 of an hour. Speed = distance ÷ time = 60 ÷ (3/4) = 60 × 4/3 = 80 km/h."),
    T("If 5 workers build a wall in 12 days, how many days would 6 workers take at the same rate?", ["10"],
      "The job takes 5 × 12 = 60 worker-days. With 6 workers: 60 ÷ 6 = 10 days. (More workers → fewer days — an inverse relationship.)"),
    T("A shirt costs $20 after a 20% discount. What was the original price?", ["25", "$25"],
      "$20 is 80% of the original price. So the original = 20 ÷ 0.80 = $25.")
  ],
  exponents: [
    T("What is 2¹⁰?", ["1024", "1,024"],
      "Build it up: 2⁵ = 32, and 2¹⁰ = 2⁵ × 2⁵ = 32 × 32 = 1024. (A handy one to memorize!)"),
    M("Which is larger, 3⁴ or 4³?", ["3⁴", "4³", "They are equal", "Cannot tell"], 0,
      "3⁴ = 81 and 4³ = 64. So 3⁴ is larger. (Same digits, different order of base and exponent — they're not equal!)"),
    T("If 2ⁿ = 32, what is n?", ["5"],
      "Count the doublings: 2, 4, 8, 16, 32 — that's five 2's multiplied. So 2⁵ = 32 and n = 5."),
    T("What is the units (ones) digit of 3⁴?", ["1"],
      "3⁴ = 81, whose units digit is 1. (The units digits of powers of 3 cycle 3, 9, 7, 1, 3, 9, 7, 1, …)"),
    T("Simplify (2³ × 2²) ÷ 2⁴.", ["2"],
      "Add exponents when multiplying: 2³ × 2² = 2⁵. Subtract when dividing: 2⁵ ÷ 2⁴ = 2¹ = 2."),
    T("What is √144 + √25?", ["17"],
      "√144 = 12 (since 12² = 144) and √25 = 5. Add: 12 + 5 = 17.")
  ],
  equations: [
    T("Solve: 2(x + 3) = 3(x − 1).", ["9"],
      "Distribute both sides: 2x + 6 = 3x − 3. Subtract 2x: 6 = x − 3. Add 3: x = 9. Check: 2(12) = 24 and 3(8) = 24. ✓"),
    T("Solve: x/2 + x/3 = 10.", ["12"],
      "Multiply every term by 6 (the common denominator) to clear fractions: 3x + 2x = 60, so 5x = 60 and x = 12."),
    T("If 3x − 7 = 2x + 5, what is x + 4?", ["16"],
      "Solve first: subtract 2x → x − 7 = 5, then add 7 → x = 12. The question asks for x + 4 = 16. (Don't stop at x!)"),
    T("Solve: 5 − 2(x − 1) = 1.", ["3"],
      "Distribute: 5 − 2x + 2 = 1, so 7 − 2x = 1. Then −2x = −6 and x = 3."),
    T("The sum of a number and twice the number is 27. What is the number?", ["9"],
      "Let the number be x. Then x + 2x = 3x = 27, so x = 9.")
  ],
  graphing: [
    T("A rectangle's length is twice its width, and its perimeter is 36. What is the width?", ["6"],
      "Let width = w, so length = 2w. Perimeter = 2(w + 2w) = 6w = 36, giving w = 6. (Length is 12.)"),
    T("Anna is 4 years older than Ben. In 3 years, the sum of their ages will be 30. How old is Ben now?", ["10"],
      "Let Ben = b now, Anna = b + 4. In 3 years: (b + 3) + (b + 7) = 30, so 2b + 10 = 30, 2b = 20, b = 10."),
    M("The point (a, b) lies in Quadrant II. What are the signs of a and b?", ["a > 0, b > 0", "a < 0, b > 0", "a < 0, b < 0", "a > 0, b < 0"], 1,
      "Quadrant II is the top-left region: x is negative and y is positive. So a < 0 and b > 0."),
    T("Tom has twice as many marbles as Jerry. Together they have 18. How many does Tom have?", ["12"],
      "Let Jerry = j, Tom = 2j. Together: j + 2j = 3j = 18, so j = 6 and Tom = 2 × 6 = 12."),
    T("What is the next number in the pattern 1, 3, 6, 10, 15, … ?", ["21"],
      "The gaps grow by one each time: +2, +3, +4, +5, so the next gap is +6. 15 + 6 = 21. (These are the 'triangular numbers.')")
  ],
  numbertheory: [
    T("What is the smallest whole number greater than 1 that is both a perfect square AND a perfect cube?", ["64"],
      "To be both a square and a cube, a number must be a 6th power. The smallest is 2⁶ = 64 (it equals 8² and also 4³)."),
    T("How many factors does 36 have?", ["9"],
      "36 = 2² × 3². The number of factors is (2+1) × (2+1) = 9. (They are 1, 2, 3, 4, 6, 9, 12, 18, 36.)"),
    T("Two numbers have a GCF of 4 and an LCM of 60. If one of the numbers is 12, what is the other?", ["20"],
      "GCF × LCM = product of the numbers, so 4 × 60 = 240 = 12 × other. The other number is 240 ÷ 12 = 20."),
    T("What is the sum of the first five prime numbers?", ["28"],
      "The first five primes are 2, 3, 5, 7, 11. Their sum is 2 + 3 + 5 + 7 + 11 = 28."),
    T("What is the smallest number greater than 1 that leaves a remainder of 1 when divided by 2, 3, and 4?", ["13"],
      "A number 1 more than a common multiple of 2, 3, 4 works. LCM(2, 3, 4) = 12, so 12 + 1 = 13."),
    M("Which of these numbers is prime?", ["51", "57", "59", "91"], 2,
      "51 = 3×17, 57 = 3×19, 91 = 7×13 — all composite. 59 has no factors but 1 and itself, so 59 is prime.")
  ],
  patterns: [
    T("In the sequence 2, 5, 8, 11, …, what is the 20th term?", ["59"],
      "It adds 3 each time, starting at 2. Term = 2 + 3 × (20 − 1) = 2 + 57 = 59."),
    T("What is the sum 1 + 2 + 3 + … + 10?", ["55"],
      "Pair them: (1+10)+(2+9)+…+(5+6) = five pairs of 11 = 55."),
    T("Toothpick squares share sides: 1 square needs 4 toothpicks, 2 squares need 7, 3 squares need 10. How many toothpicks for 6 squares?", ["19"],
      "Each new square adds 3 toothpicks: the rule is 3n + 1. For n = 6: 3(6) + 1 = 19."),
    T("Each term is double the previous one plus 1, starting at 1: 1, 3, 7, 15, … What is the next term?", ["31"],
      "15 × 2 + 1 = 31."),
    T("Numbers are arranged in rows: row 1 has 1 number, row 2 has 2, row 3 has 3, and so on. How many numbers are in the first 6 rows altogether?", ["21"],
      "Total = 1 + 2 + 3 + 4 + 5 + 6 = 21."),
    T("What is the 8th term of the pattern 1, 4, 9, 16, 25, … ?", ["64"],
      "These are perfect squares (1², 2², 3², …), so the 8th term is 8² = 64.")
  ],
  geometry: [
    T("A square has a perimeter of 36. What is its area?", ["81"],
      "All four sides are equal: side = 36 ÷ 4 = 9. Area = 9 × 9 = 81."),
    T("A rectangle has an area of 24 and a perimeter of 20. What is its longer side?", ["6"],
      "The two sides add to 10 (half the perimeter) and multiply to 24. The numbers 6 and 4 work, so the longer side is 6."),
    T("A square garden has side 10. A path 1 unit wide runs inside it along all four edges. What is the area of the path?", ["36"],
      "The whole square is 10 × 10 = 100. The inner region is 8 × 8 = 64. The path is 100 − 64 = 36."),
    T("The three angles of a triangle are in the ratio 1 : 2 : 3. What is the largest angle (in degrees)?", ["90", "90°"],
      "The angles total 180°. Parts: 1 + 2 + 3 = 6, so one part = 30°. The largest is 3 × 30° = 90°."),
    T("A cube has a volume of 27. What is its surface area?", ["54"],
      "Side = ∛27 = 3. Each face is 3 × 3 = 9, and a cube has 6 faces: 6 × 9 = 54."),
    T("A rectangle is 8 by 6. One diagonal splits it into two triangles. What is the area of ONE triangle?", ["24"],
      "The rectangle's area is 8 × 6 = 48, and the diagonal cuts it into two equal triangles: 48 ÷ 2 = 24.")
  ],
  data: [
    T("The mean of five numbers is 12. Four of them are 10, 14, 8, and 16. What is the fifth number?", ["12"],
      "The five must total 5 × 12 = 60. The four known ones sum to 48, so the fifth is 60 − 48 = 12."),
    T("A student scored 85, 90, and 95 on three tests. What score on a fourth test gives a mean of 90?", ["90"],
      "Four tests averaging 90 total 360. The first three sum to 270, so the fourth must be 360 − 270 = 90."),
    T("The mean of six numbers is 5. If the number 10 is removed, what is the mean of the remaining five?", ["4"],
      "Six numbers averaging 5 total 30. Remove 10 → 20 left, shared by 5 numbers: 20 ÷ 5 = 4."),
    T("Five friends have a mean age of 10. A sixth friend joins and the mean becomes 11. How old is the sixth friend?", ["16"],
      "Six people averaging 11 total 66. The first five totaled 5 × 10 = 50, so the sixth is 66 − 50 = 16."),
    T("The numbers 4, 7, 7, 10, and x have a mean of 8. What is x?", ["12"],
      "Five numbers averaging 8 total 40. The four known ones sum to 28, so x = 40 − 28 = 12."),
    T("A bag has 4 red, 3 blue, and 5 green marbles. What is the probability of NOT drawing a blue marble? (as a fraction)", ["3/4", "9/12"],
      "There are 12 marbles, and 12 − 3 = 9 are not blue. P(not blue) = 9/12 = 3/4.")
  ]
};

let added = 0;
const qdir = path.join(__dirname, "..", "site", "questions");
for (const chapter of Object.keys(COMP)) {
  const file = path.join(qdir, chapter, "challenging.json");
  const existing = JSON.parse(fs.readFileSync(file, "utf8"));
  // idempotent: skip items already present (by question text) and any ||OVERRIDE authoring flags
  const have = new Set(existing.map(x => x.q));
  const clean = COMP[chapter].filter(x => !x.solution.includes("||OVERRIDE") && !have.has(x.q));
  const merged = existing.concat(clean);
  fs.writeFileSync(file, JSON.stringify(merged, null, 2) + "\n");
  added += clean.length;
  console.log(chapter.padEnd(12) + " challenging now " + merged.length + " (+" + clean.length + " competition)");
}
console.log("\nCompetition questions added:", added);
