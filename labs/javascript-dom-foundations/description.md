# JavaScript DOM Foundations

You built the Utah Tech University site across Labs 16 and 17 — responsive layout, modern CSS, and a full dark mode. The HTML is solid. The CSS is wired. Now it's time to turn on the electricity.

JavaScript doesn't replace your HTML or CSS. It *controls* them. In this lab you'll write JavaScript that finds elements on the page, changes their content and appearance, creates new elements, and reads data stored in your HTML — all without touching a single line of HTML or CSS.

**Objective:** Work through each step and get all 14 tests to pass.

**Note:** The starter files are your completed Utah Tech site from Lab 17. You will only be editing the JavaScript file — the HTML and CSS tabs are for reference.

**Before you start:** Open the Console tab at the bottom of the preview panel. Every `console.log()` you write will appear there. It is your most important tool for understanding what your code is doing.

**How JavaScript fits into your page:** The HTML file already has `<script defer src="starter.js">` in the `<head>`. The `defer` attribute tells the browser to run your script *after* the entire page has loaded, so every element is available the moment your code runs. That is why you do not need any extra wrapper code — just write your JavaScript directly.

---

## Key Concepts

| Concept | What it does |
|---------|-------------|
| `document.querySelector('selector')` | Finds the first element matching a CSS selector |
| `element.textContent = 'text'` | Sets the visible text inside an element (safe — no HTML parsed) |
| `element.innerHTML = '<p>text</p>'` | Sets the HTML inside an element (parses tags) |
| `document.documentElement.style.setProperty('--var', 'value')` | Updates a CSS custom property on the `<html>` element |
| `element.classList.add('name')` | Adds a CSS class to an element |
| `document.createElement('tag')` | Creates a new HTML element (not yet on the page) |
| `parent.appendChild(element)` | Appends an element as the last child of a parent |
| `element.remove()` | Removes an element from the page entirely |
| `element.dataset.name` | Reads the `data-name` attribute value from an element |

---

## Steps

### Step 1: Find Elements and Change Their Text

JavaScript uses `querySelector()` to find elements — and it uses the exact same CSS selectors you already know. Once you have an element, `textContent` lets you change the text inside it.

**What to do:**

1. Use `document.querySelector('h1')` to find the page heading. Store it in a `const` variable called `heading`.

2. Set `heading.textContent` to the string `Utah Tech — Trailblazers`.

   > The dash in the middle is an **em dash** (—), not a regular hyphen (-). Copy it directly from here.

3. Use `document.querySelector('header > p')` to find the tagline paragraph. The `>` means "direct child of" — it finds the `<p>` that is immediately inside `<header>`.

4. Set that tagline's `textContent` to: `Where curiosity meets red rock country.`

5. After each `querySelector()` call, add a `console.log()` to print the element to the Console tab. This lets you confirm you found the right element before changing it.

   ```
   console.log(heading);    // shows the h1 element in the console
   ```

> **Why `textContent` and not `innerHTML`?** `textContent` treats everything as plain text — HTML tags in the string are displayed literally, not parsed. This makes it safe for any text you set. `innerHTML` is more powerful but parses tags, which you will use in Step 5.

---

### Step 2: Change the Site's Accent Color

CSS custom properties (variables) make this lab's "wow moment" possible. Your CSS uses `var(--color-accent)` on headings, panel borders, buttons, sidebar bullet points, and more. Changing that one variable changes everything at once.

**What to do:**

1. CSS custom properties live on the `<html>` element. In JavaScript, `document.documentElement` refers to that element.

2. Call `style.setProperty()` on it to update `--color-accent`:

   ```
   document.documentElement.style.setProperty('--color-accent', '#2d8a4e');
   ```

3. Look at the preview. Every accent-colored element on the page just shifted to Sage Green — headings, panel top borders, the submit button, bullet markers, and the selected text color. That is the power of CSS custom properties: one change, everywhere.

4. Try different color values if you want to experiment. The test only checks that `--color-accent` was set to *some* value, so you have creative freedom here. Just make sure *something* is set before running the tests.

> **Why `document.documentElement`?** CSS custom properties are declared on `:root` in your stylesheet, which is the same as the `<html>` element. Setting an inline style on `document.documentElement` overrides the stylesheet value, which is exactly what you want.

---

### Step 3: Apply a Class to a Panel

The most common way JavaScript changes visual appearance is by toggling CSS classes. The CSS already defines what the `.highlighted` class looks like — a visible border and a tinted background. Your job is to apply that class to an element using JavaScript.

**What to do:**

1. Use `querySelector('#colleges')` to find the Our Colleges panel. Store it in a `const`.

2. Call `.classList.add('highlighted')` on it.

3. Look at the preview — the panel now has a colored border and a subtle background tint.

> **The key insight:** CSS defines what both states look like. JavaScript just switches between them. The `.highlighted` class was written in the CSS before you touched a single line of JavaScript. You do not need to write any style rules — only apply the class.

> **`classList` methods you will use:**
> - `.add('name')` — adds a class
> - `.remove('name')` — removes a class
> - `.toggle('name')` — adds it if missing, removes it if present
> - `.contains('name')` — returns `true` or `false`

---

### Step 4: Create a New Element and Remove an Old One

So far you have found and changed existing elements. JavaScript can also create brand-new elements from scratch and add them to the page — or remove ones that are no longer needed.

**What to do:**

**Part A — Create and add an announcement banner:**

1. Create a new `<div>` element:
   ```
   const banner = document.createElement('div');
   ```

2. Add the `announcement` class to it:
   ```
   banner.classList.add('announcement');
   ```

3. Set its text:
   ```
   banner.textContent = 'Applications for Fall 2025 are now open!';
   ```
   Copy this text exactly — the test checks for a precise match.

4. Find the `<header>` element and append the banner inside it:
   ```
   const header = document.querySelector('header');
   header.appendChild(banner);
   ```
   The banner appears at the bottom of the header, after the existing content.

**Part B — Remove the placeholder banner:**

5. The HTML has a `<div id="info-banner">` that says "Placeholder banner — replace this with JavaScript." Now that you have created a real announcement, remove the placeholder:
   ```
   document.querySelector('#info-banner').remove();
   ```
   `.remove()` deletes the element from the DOM immediately. It does not need a parent reference — just call it directly on the element.

---

### Step 5: Read Data Attributes and Inject HTML

HTML elements can store extra information using `data-*` attributes. JavaScript reads them through the `dataset` property. In the header you will find three color swatches — each one stores a color value and a name right in the HTML.

**What to do:**

1. Select the first color swatch:
   ```
   const swatch = document.querySelector('.color-swatch');
   ```

2. Read its `data-color` and `data-name` attribute values using `dataset`:
   ```
   const color = swatch.dataset.color;   // reads data-color="#BA1C21"
   const name  = swatch.dataset.name;    // reads data-name="Rock Red"
   ```
   The rule: `data-color` in HTML becomes `dataset.color` in JavaScript. Hyphens convert to camelCase.

3. Build a label string using a **template literal**. Template literals use backticks (`` ` ``) instead of quotes, and `${}` to embed variable values:
   ```
   const label = `${name}: ${color}`;
   // Produces: "Rock Red: #BA1C21"
   ```

4. Find the swatch row and inject your label as a paragraph using `innerHTML`:
   ```
   const swatchRow = document.querySelector('#swatch-row');
   swatchRow.innerHTML = `<p class="swatch-label">${name}: ${color}</p>`;
   ```
   `innerHTML` parses the string as HTML, so the `<p>` tag becomes a real element in the DOM.

5. Apply the swatch's color as the new accent color:
   ```
   document.documentElement.style.setProperty('--color-accent', color);
   ```
   This reapplies `setProperty()` from Step 2 — but this time the value comes from the HTML data attribute rather than a hardcoded string.

> **`dataset` naming rule:** `data-color` → `dataset.color`. `data-first-name` → `dataset.firstName`. Hyphens become camelCase in JavaScript.

> **`innerHTML` vs `textContent`:** Use `textContent` for plain text. Use `innerHTML` when you need to inject actual HTML tags (like `<p>`, `<strong>`, etc.). Never use `innerHTML` with content that came from a user — that is a security risk called XSS. Here it is safe because the content comes from your own HTML data attributes.

---

## Summary

| Step | Skill | Key API |
|------|-------|---------|
| 1 | Find elements and change text | `querySelector()`, `textContent` |
| 2 | Change the entire site's color scheme | `style.setProperty('--color-accent', value)` |
| 3 | Apply a CSS class from JavaScript | `classList.add('highlighted')` |
| 4 | Create, add, and remove elements | `createElement()`, `appendChild()`, `remove()` |
| 5 | Read HTML data and inject content | `dataset.color`, template literals, `innerHTML` |
