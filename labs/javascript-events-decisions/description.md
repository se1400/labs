# Events & Decisions

You built the Utah Tech University site across the last several lessons — solid HTML structure, modern CSS, a full accessibility toolbar, and program cards that display data from HTML attributes. The page looks great. Now you're going to make it *respond*.

In the previous lab, your JavaScript ran once — when the page loaded — and then went quiet. In this lab, JavaScript doesn't run until the user does something. Click a button and the page switches to dark mode. Drag a slider and every paragraph adjusts instantly. Type in a search box and cards disappear in real time. Submit a form and the page validates without ever reloading.

This is how every real web application works. Every click, every keystroke, every form submission — the browser tracks all of it. Your job is to tell JavaScript which events to listen for and what to do when they happen.

**Objective:** Work through each step and get all 15 tests to pass.

**Note:** You will primarily edit the JavaScript file. The HTML and CSS tabs are there for reference. Everything you need — the button, the slider, the program cards, the form — is already in the HTML, fully styled and ready to wire up.

---

## Getting Started: How addEventListener Works

Before the previous lab, JavaScript ran top-to-bottom, once, on page load. Events change that model entirely. Instead of running once, an event listener *waits* — silently watching for a specific thing to happen — then runs its function every time that thing occurs.

Here is the pattern you will use in every step:

```js
const btn = document.querySelector('#my-button');

btn.addEventListener('click', function() {
  // This runs every time the button is clicked
  console.log('clicked!');
});
```

Read this as: *"Find the element with id `my-button`. When a click event occurs on it, run this function."*

The function you pass as the second argument is called a **handler**. The same button can be clicked fifty times and the handler runs fifty times.

> **Why addEventListener and not onclick?**
> You may have seen `onclick="doSomething()"` written directly in HTML. That approach works, but it mixes your JavaScript logic into your HTML markup, making both harder to read. `addEventListener` keeps them separate — and it lets you attach multiple listeners to the same element. Inline `onclick` can only hold one.

Open the **JS tab** and the **Console tab** before you start. Every `console.log()` you write will print output to the Console — use it to confirm your code is running.

---

## Key Concepts

| Concept | What it does |
|---------|-------------|
| `element.addEventListener('event', handler)` | Runs `handler` every time `event` fires on `element` |
| `'click'` | Fires when the user clicks the element |
| `'input'` | Fires on every keystroke or slider drag — continuously |
| `'change'` | Fires once after a dropdown selection or checkbox change |
| `'submit'` | Fires when a form is submitted |
| `event.preventDefault()` | Stops the browser's default action (e.g. page reload on form submit) |
| `event.target.value` | The current value of the element that fired the event |
| `document.documentElement.style.setProperty('--name', 'value')` | Updates a CSS custom property live |
| `document.body.classList.toggle('class-name')` | Adds the class if missing, removes it if present |
| `if (!value)` | True when value is empty, null, undefined, 0, or false (falsy) |

---

## Steps

### Step 1: addEventListener + click — Dark Mode Toggle

Every event listener follows the same three-step pattern: **find** the element, **add** the listener, **do something** inside the handler. This step is the simplest possible version of that pattern.

Look at the CSS tab and search for `body.dark-mode`. You'll see a block of custom property overrides already written — the background darkens, text lightens, borders change. The CSS is ready. Your only job is to toggle the class on `<body>` when the button is clicked.

**What to do:**

1. Use `document.querySelector()` to find the button with id `theme-toggle`. Store it in a `const`.

2. Call `.addEventListener()` on it, passing `'click'` as the first argument and a function as the second.

3. Inside the function, toggle the `dark-mode` class on `document.body`:
   ```js
   document.body.classList.toggle('dark-mode');
   ```
   `classList.toggle()` is the perfect tool here: it adds the class if it's missing, removes it if it's there. One method, both directions.

4. Look at the preview — clicking the button should flip the entire page between light and dark. Every element that uses a CSS custom property updates automatically because `body.dark-mode` overrides those variables.

> **The key insight:** You didn't write any code to change colors or update styles. CSS already knows what the dark version looks like. JavaScript's only job is to flip a class name. This is the fundamental pattern behind every dark mode, navigation menu, accordion, and modal you will ever build.

---

### Step 2: addEventListener + input + setProperty — Font Size Slider

The `input` event fires *continuously* as the user drags a slider or types in a field — not just once when they're done. This makes it perfect for live updates where users can see the result of each small change.

Look at the CSS tab and search for `--base-font-size`. You'll see it declared in `:root` with a default of `16px`, and `body` uses it with `font-size: var(--base-font-size)`. Drag the slider and you're updating the one variable that controls all text on the page.

**What to do:**

1. Use `document.querySelector()` to find the range input with id `font-slider`. Store it in a `const`.

2. Also find the label that displays the current value — it has id `font-size-value`. Store it in a `const`.

3. Add an `'input'` event listener to the slider.

4. Inside the handler, update the CSS custom property on the `<html>` element:
   ```js
   document.documentElement.style.setProperty('--base-font-size', event.target.value + 'px');
   ```
   `event.target` refers to the slider that fired the event. `.value` gives you the current number as a string — adding `+ 'px'` turns `"18"` into `"18px"`.

5. Also update the label so users can see the exact value:
   ```js
   label.textContent = event.target.value + 'px';
   ```

6. Drag the slider — every paragraph, heading, and label on the page should scale up and down in real time.

> **Why .value is always a string:** Every form input's `.value` property returns a string, even for `type="range"`. If you ever need to do math with the value (compare it with a number, for example), wrap it in `Number()`: `Number(event.target.value)`. In this step you're just appending `'px'`, so the string is fine.

---

### Step 3: addEventListener + change + dataset — Department Filter

The `change` event fires once — after the user finishes making a selection. Unlike `input`, it doesn't fire on every intermediate state. This makes it the right choice for dropdowns: respond when the user has made their choice, not while they're scrolling through options.

This step brings back the `dataset` skill from the previous lab. Each program card in the HTML has two data attributes: `data-department` and `data-name`. You'll read `dataset.department` to decide whether each card should be visible.

**What to do:**

1. Use `document.querySelector()` to find the select dropdown with id `dept-filter`. Store it in a `const`.

2. Add a `'change'` event listener to it.

3. Inside the handler, get the selected department:
   ```js
   const selected = event.target.value;
   ```

4. Select all program cards:
   ```js
   const cards = document.querySelectorAll('.program-card');
   ```

5. Loop through every card with a `for` loop. For each card, check its department against the selected value:
   ```js
   for (let i = 0; i < cards.length; i++) {
     if (selected === 'all' || cards[i].dataset.department === selected) {
       cards[i].style.display = '';
     } else {
       cards[i].style.display = 'none';
     }
   }
   ```
   Setting `style.display = ''` (an empty string) *removes* the inline style you set — so the card goes back to its default CSS display. Setting `style.display = 'none'` hides it entirely.

6. Try the dropdown — selecting a department should immediately show only matching cards.

> **dataset refresher:** `data-department="technology"` in HTML becomes `card.dataset.department` in JavaScript. The `data-` prefix is dropped, and any hyphens convert to camelCase (`data-my-value` → `dataset.myValue`). You built this skill in the previous lab — now you're using it in a new context.

---

### Step 4: addEventListener + input + if/else — Live Search

Search-as-you-type is the most common use of the `input` event. Every character the user types fires the event — and each time, you filter the cards to show only the ones whose name contains the typed text.

This step requires an `if/else` and a truthy/falsy check. An empty search field should show *all* cards. A non-empty field should show only matching ones.

**What to do:**

1. Use `document.querySelector()` to find the text input with id `program-search`. Store it in a `const`.

2. Add an `'input'` event listener to it.

3. Inside the handler, get the search term and convert it to lowercase:
   ```js
   const searchTerm = event.target.value.toLowerCase();
   ```
   Lowercase makes the search case-insensitive — "NURSING" and "nursing" both match "Nursing."

4. Select all program cards and loop through them. For each card:
   - Get its name in lowercase: `cards[i].dataset.name.toLowerCase()`
   - Check if the name *includes* the search term: `.includes(searchTerm)`
   - If the search term is empty OR the name matches → show the card
   - Otherwise → hide it

   ```js
   const cards = document.querySelectorAll('.program-card');
   for (let i = 0; i < cards.length; i++) {
     const name = cards[i].dataset.name.toLowerCase();
     if (!searchTerm || name.includes(searchTerm)) {
       cards[i].style.display = '';
     } else {
       cards[i].style.display = 'none';
     }
   }
   ```

5. Type in the search box — cards should filter in real time. Clearing the field should show all cards again.

> **Truthy and falsy:** An empty string `""` is falsy in JavaScript. So `!searchTerm` is `true` when the field is blank — meaning "show everything when nothing is typed." This is more concise than writing `searchTerm === ''`.

> **Why .includes()?** The `String.includes()` method returns `true` if the string contains the given text anywhere inside it. `'Web Development'.toLowerCase().includes('dev')` → `true`. It's how you match partial words without requiring an exact match.

---

### Step 5: addEventListener + submit + preventDefault — Inquiry Form

Form submissions are a critical real-world pattern. By default, submitting a form causes the browser to reload the page — which clears your UI, loses unsaved data, and produces a poor experience. `event.preventDefault()` stops that default behavior so you can handle the submission yourself.

This step uses the full `if / else if / else` chain to validate three fields before deciding whether to show an error or success message.

**What to do:**

1. Use `document.querySelector()` to find the form with id `inquiry-form`. Store it in a `const`.

2. Also find the message area: `document.querySelector('#form-message')`. Store it in a `const`.

3. Add a `'submit'` event listener to the form. The handler needs to receive the event object:
   ```js
   form.addEventListener('submit', function(event) {
     ...
   });
   ```

4. Inside the handler, call `event.preventDefault()` **first** — before reading any values. This stops the page from reloading:
   ```js
   event.preventDefault();
   ```

5. Read and trim the three field values:
   ```js
   const name    = document.getElementById('inq-name').value.trim();
   const email   = document.getElementById('inq-email').value.trim();
   const program = document.getElementById('inq-program').value;
   ```
   `.trim()` removes any leading or trailing spaces so a field with only spaces still counts as empty.

6. Validate with an `if / else if / else` chain:
   ```js
   if (!name) {
     msg.textContent = 'Please enter your full name.';
     msg.className = 'error';
   } else if (!email) {
     msg.textContent = 'Please enter your email address.';
     msg.className = 'error';
   } else if (!program) {
     msg.textContent = 'Please select a program of interest.';
     msg.className = 'error';
   } else {
     msg.textContent = 'Thank you, ' + name + '! We will be in touch soon.';
     msg.className = 'success';
   }
   ```

7. Submit the form with each field empty or filled — the right message should appear without the page reloading.

> **Why the order matters:** JavaScript evaluates the conditions top to bottom and stops at the first true one. Putting name first means: if there's no name, show the name error and stop — don't bother checking email or program. This makes sense for the user: fix one problem at a time.

> **The CSS does the showing:** Notice `#form-message` starts with `display: none` in the stylesheet. The CSS rules for `.success` and `.error` set `display: block`. When you set `msg.className = 'error'`, the browser applies the `.error` CSS rule and the message box appears — you don't need to touch `display` yourself.

---

## Summary

| Step | Skill | What You Built |
|------|-------|---------------|
| 1 | `click` + `classList.toggle()` | Dark mode button that flips the entire page |
| 2 | `input` + `setProperty()` | Accessibility slider that scales all page text live |
| 3 | `change` + `dataset` | Department dropdown that filters program cards |
| 4 | `input` + `if/else` + truthy/falsy | Search box that filters cards as you type |
| 5 | `submit` + `preventDefault()` + `if/else if/else` | Form that validates without reloading the page |
