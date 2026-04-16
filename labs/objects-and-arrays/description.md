# Objects & Arrays of Objects

In the last lab you used a function and a loop to turn an array of strings into a grid of program cards. That worked — but each program only knew one thing about itself: its name. Real programs have a name **and** a department **and** a credit count **and** a price per credit. You need a way to bundle those values together so they travel through your code as one thing.

That bundle is called an **object**. Without objects, you would need four parallel arrays — one for names, one for departments, one for credits, one for prices — and trust that `names[2]` and `credits[2]` always line up. Objects keep related values glued together so they travel as one thing.

And when you put a bunch of objects in an array, you get the single most common data shape in web development: the **array of objects**. Every product list, every user directory, every search result, every feed — they are all arrays of objects.

By the end of this lab, your programs grid will be generated from real data, three buttons above the grid will sort, re-sort, and clear it, each card will open a details modal when clicked, and a form will let you add brand-new programs to the page without a reload.

There are **11 tests** and **5 steps**. Run the tests after each step.

---

## Getting Started

Switch to the JS tab. That is where all your work happens. The HTML and CSS are already set up.

Scroll to the bottom of the HTML tab and look at the `programs` array. In Lab 21 it was a simple list of strings. It is now an array of **objects**:

```
var programs = [
    { id: 1, name: 'Computer Science', department: 'Computing', credits: 120, costPerCredit: 250 },
    { id: 2, name: 'Software Engineering', department: 'Computing', credits: 120, costPerCredit: 260 },
    ...
];
```

Each object has five properties. Read a property with dot notation: `programs[0].name` gives you `'Computer Science'`, and `programs[0].costPerCredit` gives you `250`. That is the only new syntax you need to get started.

> **Scope tip:** The `programs` array is declared with `var` in the HTML so it is available everywhere — including in your JS tab. The `renderPrograms` function you write in Step 2 must be declared with `function` (not `const` or `let`) so the tests can find it.

---

## Step 1 — Featured Program

Just below the campus photo there is an empty `<p id="featured-program">`. Your job is to fill it with a short sentence that reads from the **first program** in the array.

**What you need to write:**

Select `#featured-program` and set its `textContent` to a string built from `programs[0]`. The string should look like this:

> Featured program: Computer Science — Computing department

The cleanest way to build it is with a template literal. Remember template literals from Lab 21? They use backticks (`` ` ``) and let you drop values in with `${}`. Inside the `${}`, you can read object properties with dot notation:

```
document.querySelector('#featured-program').textContent =
    `Featured program: ${programs[0].name} — ${programs[0].department} department`;
```

`programs[0]` grabs the **first object** in the array. The `.name` and `.department` after it read those specific properties off that object.

**What you will see:** A small banner appears above the programs grid showing the name and department of the first program in the list.

---

## Step 2 — renderPrograms (data-driven cards)

The `#programs-grid` div is empty. Your job is to write a `renderPrograms` function that takes a list of program objects and builds a card for each one — showing **four** pieces of data per card (department badge, name, credits, price). While you are at it, you will teach the function to handle an empty list gracefully, so Step 3's **Clear All** button has something to lean on.

This step replaces what you did in Steps 4 and 5 of Lab 21, but in a more powerful way. Instead of `for...of` and string concatenation, you will use `.map()` and `.join('')` — the standard pattern for turning an array into HTML.

**First — select the grid once, outside the function.**

Above your function, grab the grid and store it in a variable so the function can reach it:

```
const grid = document.querySelector('#programs-grid');
```

**Second — start the function with an empty-state guard.**

Declare a function called `renderPrograms` that takes one parameter called `list`. Before you do anything else, check if the list has no items and show a friendly message if so:

```
function renderPrograms(list) {
    if (list.length === 0) {
        grid.innerHTML = '<p class="empty-state">No programs available. Add one below to get started.</p>';
        return;
    }
    // normal rendering goes here ↓
}
```

`return` by itself (with nothing after it) simply exits the function early — not every `return` has to send a value back. This pattern is called a **guard clause**: good functions handle edge cases at the top, then the rest of the function can focus on the normal case without extra nesting. Writing this now means Step 3's Clear All button is literally `renderPrograms([])` — this guard does the work.

**Third — render the cards with .map() and .join('').**

Below the guard, turn each program object into an HTML string with `.map(...)`, join them together with `.join('')`, and assign the result to `grid.innerHTML`:

```
grid.innerHTML = list.map(program => `
    <div class="program-card" data-id="${program.id}">
        <span class="badge">${program.department}</span>
        <h4>${program.name}</h4>
        <p class="card-meta">${program.credits} credits</p>
        <p class="card-price">$${program.costPerCredit.toFixed(2)}/credit</p>
    </div>
`).join('');
```

Three things to notice:

- `.map(program => ...)` is an arrow function (same as Lab 21) that runs once for every item in the array. On each pass, `program` is the current object — so `program.name` reads the name off that specific program.
- `data-id="${program.id}"` stores the program's id directly on the card in the HTML. You will use that in Step 4 to figure out which program was clicked. Any attribute that starts with `data-` is a **custom data attribute** — a place to stash information on an element that JavaScript can read later.
- `.toFixed(2)` is the same method you used in Lab 21 for `formatPrice`. It formats a number with exactly two decimal places.

**Fourth — call the function to render the initial cards.**

Below the function, call it with the full `programs` array:

```
renderPrograms(programs);
```

**What you will see:** Eight program cards appear, each with a navy department badge, the program name, a credits line, and a red price per credit. If you temporarily try `renderPrograms([])`, you will see the empty-state message instead — your function is already ready for the Clear All button in Step 3.

---

## Step 3 — Control Buttons

Above the grid there are three buttons: **Sort by Name**, **Sort by Price**, and **Clear All**. All three do the same kind of thing: they call `renderPrograms` with a different list. You are about to write three click listeners — each one a single idea, each one four lines of code.

**First — Sort by Price.**

Select `#sort-price` and attach a `click` listener. Inside the handler, build a sorted copy of the array and pass it to `renderPrograms`:

```
document.querySelector('#sort-price').addEventListener('click', function() {
    const sorted = [...programs].sort((a, b) => a.costPerCredit - b.costPerCredit);
    renderPrograms(sorted);
});
```

Two things to notice:

- `[...programs]` uses the spread operator (same one you used in Lab 21 for `.reverse()`) to make a **copy** of the array. `.sort()` changes the array it is called on — calling it on a copy keeps the original `programs` array in its original order.
- The function passed to `.sort()` is called a **comparator**. It takes two items (`a` and `b`) and returns a number. If the number is negative, `a` comes before `b`. If positive, `b` comes first. For numbers like price, `a.costPerCredit - b.costPerCredit` sorts ascending (cheapest first).

**Second — Sort by Name.**

Names are strings, so subtraction does not work. Use `.localeCompare()` — a string method that returns a negative number, zero, or a positive number depending on alphabetical order:

```
document.querySelector('#sort-name').addEventListener('click', function() {
    const sorted = [...programs].sort((a, b) => a.name.localeCompare(b.name));
    renderPrograms(sorted);
});
```

**Third — Clear All.**

Clear All is the simplest of the three: pass `renderPrograms` an empty array, and the guard clause you wrote in Step 2 takes care of the rest.

```
document.querySelector('#clear-programs').addEventListener('click', function() {
    renderPrograms([]);
});
```

Notice that this does **not** erase the `programs` array — it just re-renders the grid with nothing in it. Click Sort by Name next and all eight programs come right back, because the real data is untouched.

**What you will see:** Clicking **Sort by Price** puts Psychology ($215) at the top. Clicking **Sort by Name** puts Biology at the top alphabetically. Clicking **Clear All** shows the empty-state message. The `programs` array itself never changes — each click just passes a different list to the same render function.

---

## Step 4 — Click a Card to Open a Modal

Right now the cards just sit there. Your job is to make each card open a details modal when clicked — showing the department, name, credits, price per credit, and **total tuition** (credits × price).

The obvious approach would be: loop through every card and attach a click listener to each one. That works, but it breaks the moment you re-render — the new cards have no listeners. The better approach, called **event delegation**, attaches a **single** listener to the grid and asks the click event which card was clicked.

**First — attach one listener to the grid.**

```
grid.addEventListener('click', function(event) {
    const card = event.target.closest('.program-card');
    if (!card) return;
```

- `event.target` is whatever the user actually clicked — it might be the `<h4>`, the badge span, the price paragraph, or the card itself.
- `.closest('.program-card')` walks up from `event.target` and returns the nearest ancestor (including itself) that matches the selector. If the user clicked inside a card, you get the card. If they clicked empty space between cards, you get `null`.
- `if (!card) return;` bails out on null clicks. This is the `!` operator (NOT) combined with the truthy-falsy idea from Lab 19 — `null` is falsy, so `!null` is `true` and `return` runs.

**Second — look up the program from the card's data-id.**

The `data-id` you added in Step 2 is how you know which program was clicked. Read it with `card.dataset.id`:

```
const id = Number(card.dataset.id);
const program = programs.find(p => p.id === id);
if (!program) return;
```

- `card.dataset.id` reads the `data-id` attribute. All `data-*` attributes are exposed as properties on `card.dataset`. The value always comes back as a string, so wrap it in `Number()`.
- `.find()` walks through the array and returns the **first** item where the callback returns `true` — or `undefined` if nothing matches. Here, it finds the program whose id equals the one stored on the card.

**Third — fill in the modal and show it.**

The modal is already in the HTML as `#program-modal`. It has five elements you need to fill: `#modal-department`, `#modal-program-name`, `#modal-credits`, `#modal-price`, `#modal-total`.

```
document.querySelector('#modal-department').textContent = program.department;
document.querySelector('#modal-program-name').textContent = program.name;
document.querySelector('#modal-credits').textContent = program.credits + ' credits';
document.querySelector('#modal-price').textContent = '$' + program.costPerCredit.toFixed(2);
document.querySelector('#modal-total').textContent = '$' + (program.credits * program.costPerCredit).toFixed(2);
document.querySelector('#program-modal').classList.add('visible');
});
```

The last line — `classList.add('visible')` — reuses the exact same modal-open trick from Lab 20.

**Fourth — wire up the close button.**

```
document.querySelector('#program-modal-close').addEventListener('click', function() {
    document.querySelector('#program-modal').classList.remove('visible');
});
```

**What you will see:** Clicking any card opens a modal showing the program's department badge, its name as the heading, its credit count, its price per credit, and the calculated total tuition for the degree. Clicking the × closes the modal. Re-sort the cards and click a new one — it still works, because the listener is on the grid, not on each card.

---

## Step 5 — Add a Program

Your final step grows the catalog. The **Add a New Program** form lets the user type in a new program and append it to the grid — the first time in this course that the user adds data instead of the data being hard-coded.

The form has four inputs: `#new-name`, `#new-department`, `#new-credits`, `#new-price`. Your handler needs to read those values, build a new program **object**, push it into the array, and re-render.

**Building an object literal.**

So far you have only *read* from objects — `programs[0].name`, `program.department`. This step is the first time you build one from scratch. The curly braces below are an **object literal**: the same shape as the objects in the `programs` array, but this one you are constructing yourself out of the values the user typed in.

```
document.querySelector('#add-program-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const newProgram = {
        id: programs.length + 1,
        name: document.querySelector('#new-name').value,
        department: document.querySelector('#new-department').value,
        credits: Number(document.querySelector('#new-credits').value),
        costPerCredit: Number(document.querySelector('#new-price').value)
    };

    programs.push(newProgram);
    renderPrograms(programs);
    event.target.reset();
});
```

A few things worth pausing on:

- `event.preventDefault()` stops the form from submitting the traditional way and reloading the page (same as Lab 19).
- `Number(...)` converts the string the user typed into an actual number. Input `.value` is always a string, and `.toFixed(2)` only works on numbers.
- `.push(newProgram)` adds the object to the **end** of the array. The array grew from 8 items to 9. The next `renderPrograms(programs)` call will build 9 cards.
- `event.target.reset()` clears the form inputs so the user can add another program without retyping.

**What you will see:** Fill in the form with a new program and click Add Program — a ninth card appears at the end of the grid, stylishly matching the others. Click it and the modal shows your new program's details. Click Sort by Price and your new program slots in based on its cost. Click Clear All and the empty state returns — click Sort by Name and your new program is back, because it is saved in the array.

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
