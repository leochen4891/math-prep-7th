# Math Prep — 7th-Grade Placement / Algebra Readiness

A free, open practice site for the Livingston (NJ) 7th-grade math placement test — and pre-algebra / Algebra-1 readiness in general.

**Live site:** https://math-prep.leidevs.com

## What it is

Seven chapters. Each chapter has:

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
6. Equations (Solving for x)
7. Coordinate Plane & Word Problems

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
  js/generators.js    question generators (used only by the dump tool, not at runtime)
  questions/          the JSON question pools  ← contribute here
tools/                Node scripts that generated the initial pools
```

## Running locally

It's a static site — open `site/index.html` in a browser, or serve the folder:

```
cd site && python3 -m http.server 8000   # then visit http://localhost:8000
```

## License

Educational use. Contributions are made under the same terms.
