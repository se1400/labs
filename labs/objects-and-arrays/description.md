# Objects & Arrays of Objects

In the last lab you used a function and a loop to turn an array of strings into a grid of program cards. That worked — but each program only knew one thing about itself: its name. Real programs have a name **and** a department **and** a total credit count **and** a number of credits required in the major (pulled straight from Utah Tech's degree worksheets). You need a way to bundle those values together so they travel through your code as one thing.

That bundle is called an **object**. Without objects, you would need four parallel arrays — one for names, one for departments, one for total credits, one for major credits — and trust that `names[2]` and `majorCredits[2]` always line up. Objects keep related values glued together so they travel as one thing.

And when you put a bunch of objects in an array, you get the single most common data shape in web development: the **array of objects**. Every product list, every user directory, every search result, every feed — they are all arrays of objects.

By the end of this lab, your programs grid will be generated from real data, three buttons above the grid will sort, re-sort, and clear it, each card will open a details modal when clicked, and a form will let you add brand-new programs to the page without a reload.

There are **11 tests** and **5 steps**. Run the tests after each step.

---

## Getting Started

Switch to the JS tab. That is where all your work happens. The HTML and CSS are already set up.

Scroll to the bottom of the HTML tab and look at the `programs` array. In Lab 21 it was a simple list of strings. It is now an array of **objects**:

```
var programs = [
    { id: 1, name: 'Computer Science',     department: 'Computing', credits: 120, majorCredits: 42 },
    { id: 2, name: 'Software Engineering', department: 'Computing', credits: 120, majorCredits: 69 },
    ...
];
```

Each object has five properties. Read a property with dot notation: `programs[0].name` gives you `'Computer Science'`, and `programs[0].majorCredits` gives you `42`. That is the only new syntax you need to get started.

> **Scope tip:** The `programs` array is declared with `var` in the HTML so it is available everywhere — including in your JS tab. The `renderPrograms` function you write in Step 2 must be declared with `function` (not `const` or `let`) so the tests can find it.

---

## Step 1 — Featured Program

**Goal:** Fill the empty `<p id="featured-program">` with a short sentence built from the **first program** in the array. It should read exactly like this:

> Featured program: Computer Science — Computing department

**Why this step:** Before you can render eight cards, you need to know how to pull one piece of information off one object. This step is the smallest possible taste of that — one sentence, one object.

**What to do:**

1. Use `document.querySelector()` to grab `#featured-program`.
2. Set its `textContent` to a **template literal** — the backtick string from Lab 21. Template literals let you drop values into a string using `${}`.
3. Inside the template literal, write the words **Featured program:**, then the program's name, then a space, an em-dash (`—`), a space, the department, and the word **department**.
4. To read the name and department, use **dot notation** on the first object in the array. `programs[0]` pulls the first object out. Adding `.name` to the end returns that object's name property; `.department` returns its department property.

**Example of new syntax:** `programs[0].name` evaluates to the string `'Computer Science'`. That is the only new pattern you need for this step — combine it with template literals from Lab 21 to build the full sentence.

**What you will see:** A small banner appears above the programs grid showing the name and department of the first program in the list.

---

## Step 2 — renderPrograms (data-driven cards)

**Goal:** Write a function called `renderPrograms(list)` that takes an array of program objects and fills `#programs-grid` with a card for each one — showing **four** pieces of data per card (department badge, name, total credits, major credits). The function also needs to handle an empty list gracefully, so Step 3's **Clear All** button has something to lean on.

**Why this step:** This is the heart of a data-driven page. You are replacing the `for...of` loop from Lab 21 with `.map()` + `.join('')` — the standard modern pattern for turning an array into HTML. And because you write ONE function that the whole rest of the lab calls, every feature after this (sort, clear, add) becomes trivial.

**What to do:**

**1. Grab the grid once, ABOVE your function.**

Use `document.querySelector()` to grab `#programs-grid` and store it in a constant called `grid`. Declare it **outside** the function body. That way the function can reach it every time it runs, without re-querying the DOM.

**2. Declare the function with an empty-state guard.**

Use the `function` keyword (not `const` or `let` — the tests rely on it being a real function declaration) to define `renderPrograms`, taking one parameter named `list`.

The very first thing inside the function: check whether `list.length === 0`. When that is true:
- Set `grid.innerHTML` to a `<p>` with class `empty-state` and the text **No programs available. Add one below to get started.**
- Write `return;` by itself — no value after it — to exit the function early.

This pattern is called a **guard clause**: handle the edge case at the top, then the rest of the function only has to worry about the normal case. Not every `return` has to send back a value — a bare `return;` just means "stop here." Writing this now means Step 3's Clear All button becomes a one-liner.

**3. Render the cards with `.map()` and `.join('')`.**

Below the guard, set `grid.innerHTML` equal to `list.map(...).join('')`.

Inside `.map()`, pass an arrow function that receives **one parameter** named `program` and returns a template literal. The template literal should produce a single `<div>` with class `program-card`. On the opening tag, include a `data-id` attribute set to `${program.id}` — you will read that in Step 4 to know which card was clicked.

Inside the div, lay out four lines:
- A `<span class="badge">` containing the program's **department**.
- An `<h4>` containing the program's **name**.
- A `<p class="card-meta">` containing the **total credits** followed by the words `total credits`.
- A `<p class="card-major">` containing the **major credits** followed by the words `in major`.

Read each value off the `program` parameter with dot notation — `program.name`, `program.department`, `program.credits`, `program.majorCredits` — wrapped in `${}` placeholders.

Then chain `.join('')` onto the end of `.map(...)`. `.map()` returns an ARRAY of strings (one per program); `.join('')` glues them into one big string with nothing between them, which is what `innerHTML` needs.

**Why `data-id`?** Any HTML attribute that starts with `data-` is a **custom data attribute** — a place to stash information on an element that you can read back later with `.dataset`. You'll use this in Step 4 to look up which program was clicked.

**4. Call your function once with the full programs array.**

Below the function definition, call `renderPrograms(programs)` so the page renders its initial eight cards.

**What you will see:** Eight program cards appear, each with a navy department badge, the program name, a total-credits line, and a red "in major" line. If you temporarily call `renderPrograms([])` (an empty array), you should see the empty-state paragraph instead — your function is already ready for the Clear All button in Step 3.

---

## Step 3 — Control Buttons

**Goal:** Wire up the three buttons above the grid — **Sort by Major Credits**, **Sort by Name**, and **Clear All** — so they re-render the grid with a different list each time.

**Why this step:** All three buttons illustrate the same powerful idea: the `programs` array never changes. Each click handler just builds a different list and hands it to the same `renderPrograms` function. That is how real apps handle sorting and filtering — one source of truth, many views of it.

**What to do:**

**1. Sort by Major Credits.**

Select `#sort-major` and attach a **click** listener with `.addEventListener('click', ...)`. Inside the handler:

- Make a **copy** of the `programs` array using the spread operator — `[...programs]`. You saw this in Lab 21. Sorting a copy is important because `.sort()` **mutates** (changes) the array it is called on. If you sorted the original, then Clear All followed by Sort by Name would give the wrong "original" order.
- Call `.sort()` on the copy and pass it an arrow function called a **comparator**. A comparator receives two items (call them `a` and `b`) and returns a number. If the number is negative, `a` comes before `b`; if positive, `b` comes first; if zero, their order is unchanged. For numeric properties, the idiomatic comparator is simply `a.property - b.property` — which sorts ascending (smallest first).
- Pass the sorted copy to `renderPrograms`.

For this button, the comparator should return `a.majorCredits - b.majorCredits`.

**2. Sort by Name.**

Select `#sort-name` and attach a click listener. Same pattern as above, with one change: names are **strings**, and subtracting strings does not work.

Instead, use the built-in string method `.localeCompare()`. Call it on `a.name` and pass `b.name` — it returns a negative number, zero, or a positive number depending on alphabetical order. That is exactly the shape `.sort()` wants.

**3. Clear All.**

Select `#clear-programs` and attach a click listener. Inside, just call `renderPrograms([])` — pass an empty array. The guard clause you wrote in Step 2 does the rest of the work and shows the empty-state message.

Notice that Clear All does **not** erase the `programs` array — it just re-renders the grid with nothing. Click Sort by Name next and all eight programs come right back, because the real data is untouched.

**What you will see:** Clicking **Sort by Major Credits** puts Computer Science (42 major credits) at the top. Clicking **Sort by Name** puts Biology at the top alphabetically. Clicking **Clear All** shows the empty-state message. The `programs` array itself never changes — each click just passes a different list to the same render function.

---

## Step 4 — Click a Card to Open a Modal

**Goal:** Make each card open a details modal when clicked — showing the department, name, total credits, credits in the major, and **remaining credits** (total minus major — the credits needed for gen ed and electives).

**Why this step:** The obvious approach would be to loop through every card and attach a click listener to each one. That works — until you re-sort, because the new cards are brand-new elements with no listeners on them. The better pattern, called **event delegation**, attaches ONE listener to the grid and asks each click which card it came from. One listener handles every card — even cards that do not exist yet.

**What to do:**

**1. Attach ONE click listener to the grid.**

On your `grid` variable (the constant you declared in Step 2), call `.addEventListener('click', ...)`. The handler function receives an `event` parameter.

Inside the handler, find the clicked card by calling `event.target.closest('.program-card')` and storing the result in a variable called `card`:
- `event.target` is whatever the user actually clicked — it might be the `<h4>`, the badge span, a paragraph, or the card itself.
- `.closest('.program-card')` walks up the DOM starting from `event.target` and returns the nearest ancestor (including itself) that matches the selector. If the user clicked inside a card, you get that card back. If they clicked the empty space between cards, you get `null`.

Right after that, **guard against null clicks**: `if (!card) return;`. This uses the `!` (NOT) operator with the truthy/falsy idea from Lab 19 — `null` is falsy, so `!null` is `true`, and the handler exits early.

**2. Look up the program from the card's data-id.**

Read the card's `data-id` attribute with `card.dataset.id`. All `data-*` attributes on an element are exposed as properties on its `.dataset` object. The value always comes back as a **string**, so wrap it in `Number()` and store the result in a constant called `id`.

Then use the `.find()` array method to get the matching program object. `.find()` takes a callback that receives one item at a time; the first item for which the callback returns `true` is the one returned. If nothing matches, `.find()` returns `undefined`. Inside your callback, compare each program's `.id` to the `id` variable you just built.

Store the result in a constant called `program`, then guard against `undefined`: `if (!program) return;`.

**3. Fill in the modal and show it.**

The modal is already in the HTML as `#program-modal`. It has five fillable slots, each with its own id: `#modal-department`, `#modal-program-name`, `#modal-credits`, `#modal-major`, `#modal-remaining`.

Select each one with `document.querySelector()` and set its `textContent`:

- `#modal-department` — set to `program.department`.
- `#modal-program-name` — set to `program.name`.
- `#modal-credits` — set to `program.credits` followed by the word **credits**.
- `#modal-major` — set to `program.majorCredits` followed by the word **credits**.
- `#modal-remaining` — set to `program.credits - program.majorCredits` followed by the word **credits**. Wrap the subtraction in parentheses so the math happens before the string concatenation.

Finally, add the class `visible` to `#program-modal` — the same modal-open trick from Lab 20.

**Why compute remaining instead of storing it?** You are NOT storing "remaining credits" on each object, because it can always be derived from the two values you DO store. Keeping data minimal and computing the rest on demand is a habit worth building early — it means there is only one place the truth lives, and no way the three numbers can fall out of sync.

**4. Wire up the close button.**

Select `#program-modal-close` and attach a click listener. Inside, remove the `visible` class from `#program-modal`.

**What you will see:** Clicking any card opens a modal showing the program's department badge, its name as the heading, its total credits, the credits required in the major, and the calculated remaining credits for gen ed and electives. Clicking the × closes the modal. Re-sort the cards and click a new one — it still works, because the listener is on the grid, not on each individual card.

---

## Step 5 — Add a Program

**Goal:** Let the user type a new program into the **Add a New Program** form and append it to the catalog. The form already exists in the HTML with four inputs (`#new-name`, `#new-department`, `#new-credits`, `#new-major`) and a submit button. You write the handler that brings it to life.

**Why this step:** So far you have only *read* from objects. This step is the first time you **build** one from scratch. Once you push that new object into `programs`, every other feature you already wrote — sort, clear, click to open the modal — works with it automatically. That is the payoff of having one source of truth for your data.

**What to do:**

**1. Attach a `submit` listener to `#add-program-form`.**

The handler receives an `event` parameter. The very first thing inside, call `event.preventDefault()` — this stops the form from submitting the traditional way and reloading the page. You saw this same trick in Lab 19.

**2. Build a new program object from the form values.**

Declare a constant called `newProgram` and set it equal to an **object literal**. An object literal is curly braces containing `key: value` pairs, separated by commas — the same shape as the objects already in the `programs` array, but this one you are constructing yourself out of what the user typed.

Your new object needs **five properties**:

- `id` — set to `programs.length + 1` so each new program gets a unique id. (When the array has 8 programs, the next id is 9.)
- `name` — read the `.value` of `#new-name`.
- `department` — read the `.value` of `#new-department`.
- `credits` — read the `.value` of `#new-credits`, wrapped in `Number()`.
- `majorCredits` — read the `.value` of `#new-major`, wrapped in `Number()`.

**Why `Number()`?** Input `.value` is always a **string**, even for number inputs. But your Step 3 sort comparator does math on these values (`a.majorCredits - b.majorCredits`) — and subtracting strings does not do what you want. `Number(...)` converts the string into an actual number so sorting stays correct.

**3. Push the new object into the array and re-render.**

Call `programs.push(newProgram)`. `.push()` adds an item to the **end** of an array; the array grows from 8 items to 9.

Then call `renderPrograms(programs)` so the grid rebuilds with the new program included.

Finally, call `event.target.reset()` to clear the form inputs, so the user can add another program without having to retype.

**What you will see:** Fill in the form with a new program and click Add Program — a ninth card appears at the end of the grid, matching the style of the others. Click it and the modal shows your new program's details. Click Sort by Major Credits and your new program slots in based on its major-credit count. Click Clear All and the empty state returns — click Sort by Name and your new program is back, because it is saved in the array.

---

## Summary

You built a data-driven programs catalog using five new skills:

| Step | Feature | New Skill |
|------|---------|-----------|
| 1 | Featured Program | Object literals, dot notation (`obj.property`) |
| 2 | renderPrograms | Array of objects, `.map().join('')`, early `return` guard, `data-*` attributes |
| 3 | Control Buttons | `.sort()` with comparator functions, `[...array]` non-mutating sort |
| 4 | Card Modal | Event delegation, `.closest()`, `dataset`, `.find()` |
| 5 | Add Program Form | Building objects from form values, `.push()` to grow an array |

Objects let you group related values under one name. Arrays of objects let you store a whole list of them. Together with `.map()`, `.sort()`, and `.find()`, they are how every modern web app renders its lists — and every list you have ever seen on the internet. Now you know the pattern.
