# Contributing questions

Thank you for helping build the question bank! You don't need to know how to code — questions are plain JSON.

## Where questions live

```
site/questions/<chapter>/<level>.json
```

- **chapters:** `fractions`, `integers`, `order`, `ratios`, `exponents`, `equations`, `graphing`
- **levels:** `medium` (regular school), `hard` (placement-test level), `challenging` (competition / Math Kangaroo)

Each file is a JSON **array** of question objects.

## Question format

There are two question types.

### Typed answer

The student types the answer.

```json
{
  "q": "Solve: 2(x + 3) = 3(x − 1).",
  "type": "typed",
  "accept": ["9"],
  "solution": "Distribute: 2x + 6 = 3x − 3. Subtract 2x: 6 = x − 3. Add 3: x = 9.",
  "source": "competition"
}
```

- **`accept`** is a list of answers counted as correct. Add every reasonable form, e.g. `["1/2", "0.5"]` or `["25", "$25"]`. Matching ignores spaces, `$`, `°`, and treats `−` and `-` the same.

### Multiple choice

```json
{
  "q": "Which is larger, 3⁴ or 4³?",
  "type": "mc",
  "choices": ["3⁴", "4³", "They are equal", "Cannot tell"],
  "answer": 0,
  "solution": "3⁴ = 81 and 4³ = 64, so 3⁴ is larger."
}
```

- **`answer`** is the **index** of the correct choice (0 = first, 1 = second, …). The site shuffles the choices, so the index just needs to point at the right one.

## Rules of thumb

1. **Always include a clear `solution`** — a short step-by-step explanation. This is shown in the review after a test. The more it teaches, the better. Basic HTML like `<b>…</b>` is allowed.
2. **No answer leaks in the question text.** Don't write "(the answer is a fraction like 5/6)" — say "(write your answer as a fraction)" instead.
3. **Match the level.** `medium` = grade-level; `hard` = placement-test; `challenging` = competition-style reasoning.
4. **Double-check the math.** Solve it yourself before submitting.
5. **`source`** is optional — use `"competition"` for original competition-style problems, or your own tag. It's just a label.
6. Use real math symbols where helpful: `×` `÷` `−` `²` `³` `√` `≤` `≥`.

## How to submit

1. Fork this repo.
2. Edit (or add) the relevant `site/questions/<chapter>/<level>.json` file.
3. Make sure the file is still valid JSON (a trailing comma will break it — most editors will warn you).
4. Open a pull request describing what you added or fixed.

Corrections to existing questions are just as welcome as new ones. Thank you! 🙏
