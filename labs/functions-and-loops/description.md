# Functions & Loops

In the last two labs you made the page interactive — responding to clicks, toggling classes, and showing toast notifications. Every piece of JavaScript you wrote ran once, in order, from top to bottom. This lab introduces two ideas that change that: **functions** let you package code so you can run it whenever you want, and **loops** let you repeat the same action for every item in a list.

By the end, your site will display formatted tuition prices, a personalized greeting, a numbered list of quick facts, a grid of program cards built entirely from data, and a shuffle button that re-renders the cards in reverse order.

There are **10 tests** and **5 steps**. Run the tests after each step.

---

## Getting Started

Switch to the JS tab. That is where all your work happens. The HTML and CSS are already set up.

Scroll down in the HTML tab and look for the two `var` arrays near the bottom — `facts` and `programs`. These arrays hold the data your JavaScript will use. Do not modify them. Your code in the JS tab reads from them to generate content on the page.

> **Scope tip:** The `facts` and `programs` arrays are declared with `var` in the HTML so they are available everywhere — including in your JS tab. The functions you write in Steps 1, 2, and 5 must be declared with `function` (not `const` or `let`) so the tests can find them.

---

## Step 1 — formatPrice

In the tuition section there is a highlighted box with two `<strong>` elements: `#price-resident` and `#price-nonresident`. They are currently empty. Your job is to write a function that formats a number as a dollar amount, then use it to fill in both prices.

**What you need to write:**

Declare a function called `formatPrice` that takes one parameter called `amount`. Inside the function, use `return` to send back a formatted string. The string should start with a `$` sign followed by the number with exactly two decimal places.

To get two decimal places, use the `.toFixed(2)` method. When you call `.toFixed(2)` on a number, it returns a string with exactly two digits after the decimal point. For example, `10.toFixed(2)` gives you `"10.00"`, and `227.toFixed(2)` gives you `"227.00"`.

Build the return value by joining the dollar sign and the formatted number: `return '$' + amount.toFixed(2);`

**Using the function:**

After the function, write two lines that call it. Select `#price-resident` and set its `textContent` to `formatPrice(227)`. Then select `#price-nonresident` and set its `textContent` to `formatPrice(725)`.

**What you will see:** The tuition highlight box now shows "$227.00" and "$725.00" with proper formatting.

---

## Step 2 — buildGreeting

In the header there is an empty `<p id="greeting">` element. Your job is to write a function that builds a welcome message, using a **default parameter** so the greeting works even when no name is provided.

**What you need to write:**

Declare a function called `buildGreeting` that takes one parameter called `name`. Give that parameter a **default value** of `'Trailblazer'` — this is the Utah Tech mascot. A default parameter looks like this:

```
function buildGreeting(name = 'Trailblazer') {
```

The `= 'Trailblazer'` part means: if someone calls `buildGreeting()` without passing an argument, `name` will automatically be `'Trailblazer'` instead of `undefined`. If they do pass a value — like `buildGreeting('Ada')` — the default is ignored and `name` takes the value that was passed in.

Inside the function, return a string that says `'Welcome, '` followed by the name, followed by `'!'`. Build it with: `return 'Welcome, ' + name + '!';`

**Using the function:**

After the function, select `#greeting` and set its `textContent` to `buildGreeting()`. Call it with no argument so the default kicks in.

**What you will see:** The header now displays "Welcome, Trailblazer!" in the greeting area.

---

## Step 3 — Quick Facts (arrow function + for loop)

In the sidebar there is an empty `<ul id="facts-list">`. Your job is to fill it with numbered facts from the `facts` array using an **arrow function** and a **for loop**.

This step introduces two new tools at once. The arrow function is a shorter way to write a function. The `for` loop repeats code once for every item in an array.

**First — write the arrow function.**

Create a variable called `formatFact` and assign it an arrow function. An arrow function looks like this:

```
const formatFact = (index, text) => (index + 1) + '. ' + text;
```

This function takes two parameters: `index` (the position in the array, starting at 0) and `text` (the fact string). It returns a string like `'1. 12,000+ students enrolled'`. The `(index + 1)` part is important — arrays start counting at 0, but humans expect lists to start at 1.

Notice there is no `return` keyword and no curly braces. When an arrow function has a single expression after the `=>`, the result of that expression is automatically returned. This is called an **implicit return**. It only works when the body is a single expression — if you add curly braces, you need an explicit `return` statement.

**Second — select the target and prepare a variable.**

Select `#facts-list` and store it in a variable called `factsList`. Then create a `let` variable called `factsHTML` and set it to an empty string `''`. This variable will hold all the HTML you are building.

**Third — write the for loop.**

A `for` loop has three parts inside the parentheses, separated by semicolons:

```
for (let i = 0; i < facts.length; i++) {
```

- `let i = 0` — the **starting point**. This creates a counter variable `i` that begins at 0 (the first index of the array).
- `i < facts.length` — the **condition**. The loop keeps running as long as `i` is less than the number of items in the array. Once `i` equals `facts.length`, the loop stops.
- `i++` — the **update**. After each pass through the loop, `i` goes up by 1. This is shorthand for `i = i + 1`.

Inside the loop, use your `formatFact` function and build an `<li>` element for each fact. On each pass, add to your `factsHTML` string:

```
factsHTML += '<li>' + formatFact(i, facts[i]) + '</li>';
```

The `+=` operator appends to the existing string. `facts[i]` uses the counter `i` to grab one item from the array — when `i` is 0 you get the first fact, when `i` is 1 you get the second, and so on.

**Fourth — set the innerHTML.**

After the loop finishes, set `factsList.innerHTML = factsHTML;`. This takes the HTML string you built and puts it into the page. Unlike `textContent` (which treats everything as plain text), `innerHTML` parses the string as HTML, so your `<li>` tags become real list items.

**What you will see:** The sidebar Quick Facts section now shows a numbered list: "1. 12,000+ students enrolled", "2. 300+ days of sunshine per year", and so on.

---

## Step 4 — Program Cards (for...of + template literals)

The `#programs-grid` div is currently empty. Your job is to fill it with program cards using a **for...of loop** and **template literals**.

**First — select the target and prepare a variable.**

Select `#programs-grid` and store it in a variable called `grid`. Create a `let` variable called `cardsHTML` and set it to `''`.

**Second — write the for...of loop.**

A `for...of` loop is a cleaner way to go through every item in an array when you do not need the index number:

```
for (const program of programs) {
```

On each pass, `program` automatically holds the current item — first `'Computer Science'`, then `'Software Engineering'`, then `'Nursing'`, and so on. You do not need a counter variable, and you do not need to write `programs[i]`. The loop handles all of that for you.

**Third — build each card with a template literal.**

Template literals use **backticks** (`` ` ``) instead of regular quotes. Inside them, you can embed variables using `${}`:

```
cardsHTML += `<div class="program-card"><h4>${program}</h4></div>`;
```

Everything between `${` and `}` gets replaced with the value of that variable. So when `program` is `'Computer Science'`, the string becomes `<div class="program-card"><h4>Computer Science</h4></div>`.

Template literals are much easier to read than string concatenation when you are building HTML. Compare:

- Concatenation: `'<div class="program-card"><h4>' + program + '</h4></div>'`
- Template literal: `` `<div class="program-card"><h4>${program}</h4></div>` ``

Both produce the same result, but the template literal lets you see the HTML structure at a glance.

**Fourth — set the innerHTML.**

After the loop, set `grid.innerHTML = cardsHTML;`.

**What you will see:** The programs grid now shows 8 cards, one for each program in the array, styled with the same card design from earlier labs.

---

## Step 5 — renderPrograms

Right now, your Step 4 code runs once and builds the cards. But what if you want to rebuild them — for example, to show them in a different order? You need to wrap that logic in a **function** so you can call it any time.

**First — write the renderPrograms function.**

Declare a function called `renderPrograms` that takes one parameter called `list`. Move your card-building logic from Step 4 inside this function — but change it so it loops over `list` (the parameter) instead of `programs` (the global array). This is important: the function should work with whatever array is passed to it, not just the global one.

```
function renderPrograms(list) {
    let html = '';
    for (const item of list) {
        html += `<div class="program-card"><h4>${item}</h4></div>`;
    }
    grid.innerHTML = html;
}
```

Notice that this function does not return anything — instead, it directly updates the page by setting `innerHTML`. Not every function needs `return`. Functions like `formatPrice` and `buildGreeting` return values for you to use elsewhere. Functions like `renderPrograms` perform an action (updating the DOM) and do not need to send a value back.

**Second — call it to render the initial cards.**

After the function, call `renderPrograms(programs)` to build the cards for the first time. This replaces the `grid.innerHTML = cardsHTML` line from Step 4 — you can remove that line now since the function handles it.

**Third — wire up the shuffle button.**

Select `#shuffle-btn` and attach a `click` listener to it. Inside the listener, call `renderPrograms` with a reversed copy of the array:

```
renderPrograms([...programs].reverse());
```

This uses two things you have not seen together before:
- `[...programs]` creates a **copy** of the array using the spread operator (`...`). The three dots take every item out of `programs` and put them into a new array. This is important because `.reverse()` changes the array it is called on — if you called `programs.reverse()` directly, it would permanently rearrange the original data.
- `.reverse()` flips the copy so the last item comes first and the first item comes last.

The result: every click re-renders the cards in reverse order without damaging the original `programs` array.

**What you will see:** Clicking "Shuffle Programs" flips the cards so the last program appears first. Clicking again flips them back.

---

## Summary

You wrote five pieces of JavaScript that introduced functions and loops:

| Step | Feature | New Skill |
|------|---------|-----------|
| 1 | formatPrice | `function` declaration, parameters, `return`, `.toFixed(2)` |
| 2 | buildGreeting | Default parameters (`name = 'Trailblazer'`) |
| 3 | Quick Facts | Arrow functions, `for` loop, `innerHTML` |
| 4 | Program Cards | `for...of` loop, template literals (`` ` `` and `${}`) |
| 5 | renderPrograms | Wrapping logic in a reusable function, `[...array].reverse()` |

Functions and loops are the tools that let you stop repeating yourself. A function packages code you want to reuse. A loop repeats code for every item in a collection. Together, they let you build entire sections of a page from data — which is exactly how real web applications work.
