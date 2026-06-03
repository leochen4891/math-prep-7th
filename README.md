# Math Prep — 7th-Grade Placement / Algebra Readiness

A free, open practice site for the Livingston (NJ) 7th-grade math placement test — and pre-algebra / Algebra-1 readiness in general.

**Live site:** https://math-prep.leidevs.com

## What it is

Eleven chapters. Each chapter has:

1. **A full lesson** ("Learn It") — taught in an Art-of-Problem-Solving style: the *why*, worked examples, common mistakes, and pro tips.
2. **A 20-question test** at one of three difficulty levels you choose:
   - 🟢 **Medium** — regular public-school questions
   - 🟠 **Hard** — real placement-test level
   - 🔴 **Challenging** — math-competition level (Math Kangaroo style)

Tests let you navigate freely (Previous / Next / jump to any question), change answers, and **Submit** at the end for a full worked-solution review. Your best score per chapter and level is saved in your browser.

## The chapters

1. Fractions, Decimals & Percents
2. Integers & Negative Numbers
3. Order of Operations & Expressions
4. Ratios, Rates & Proportions
5. Exponents & Powers
6. Equations & Inequalities
7. Coordinate Plane & Word Problems
8. Factors, Multiples & Number Theory
9. Patterns, Sequences & Function Tables
10. Geometry & Measurement
11. Data & Statistics

## The question bank lives here — contributions welcome!

All questions are plain JSON under [`site/questions/`](site/questions/), organized by chapter and level:

```
site/questions/<chapter>/<medium|hard|challenging>.json
```

The live site reads these straight from this repo's `main` branch, so **a merged pull request shows up on the site without a redeploy**. To add or fix questions, see **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## Project layout

```
site/                 the web app (static HTML/CSS/JS — no build step)
  index.html
  css/styles.css
  js/data.js          chapter metadata + lessons
  js/app.js           app logic (lessons, difficulty chooser, test engine)
  questions/          the JSON question pools (served to the browser)  ← edit these to fix a question
tools/
  templates/<chapter>.js   question-generator templates (10+ per tier; node modules)
  dump-questions.js        builds the balanced, template-tagged JSON pools
  competition.js           appends hand-authored competition problems
```

Each test draws 20 questions from a pool with **at most 2 from any one template** (every tier has 10+ distinct problem types). To add problem *types*, edit the template files; to fix an individual question, edit the JSON.

## Running locally

It's a static site — open `site/index.html` in a browser, or serve the folder:

```
cd site && python3 -m http.server 8000   # then visit http://localhost:8000
```

## License

Educational use. Contributions are made under the same terms.
