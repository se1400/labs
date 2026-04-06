# JavaScript DOM Foundations

You built the Utah Tech University site across the last two lessons — responsive layout, modern CSS, and a full dark mode. The HTML is solid. The CSS is wired. Now it's time to turn on the electricity.

JavaScript doesn't replace your HTML or CSS. It *controls* them. In this lab you'll write JavaScript that finds elements on the page, changes their content and appearance, creates new elements, and reads data stored in your HTML. Every change you make will be visible in the preview immediately — no page reload needed.

**Objective:** Work through each step and get all 15 tests to pass.

**Note:** The starter files are your completed Utah Tech site from the previous lesson. You will primarily be editing the JavaScript file — the HTML and CSS tabs are there for reference, and you will make one small addition to the HTML in Getting Started.

---

## Getting Started: Understand the Script Tag

Before writing any JavaScript, take a moment to understand how the JavaScript file connects to the HTML page. This is how every real-world project works — the HTML and JavaScript files are separate, and the HTML has to explicitly load the JavaScript.

1. Click the **HTML** tab at the top of the editor.
2. Scroll to the top of the file and find the closing `</head>` tag.
3. Look at the line just before `</head>`. You will see a `<script>` tag that links to `starter.js` with a `defer` attribute — it was placed there for you.

   > **What does `defer` do?** It tells the browser: "Download this script in the background, but don't run it until the entire HTML page has finished loading." Without `defer`, your JavaScript might run before the page is ready and fail to find elements. With `defer`, every element is guaranteed to exist when your code runs. This is the modern, recommended approach. In your own projects, this is the tag you will add yourself.

4. Switch back to the **JS** tab. This is where you'll write all your code from here on.

5. Open the **Console** tab at the bottom of the preview panel. Every `console.log()` you write will print output there — it's your window into what JavaScript is actually doing, invisible to visitors but invaluable to you as you build.

> **You may see a console error** like `Unexpected token '<'` or a message about `starter.js` not loading. That is completely normal in this sandbox editor — it cannot load files from disk the way a real browser does. In a real project on your own computer, `starter.js` would exist and load perfectly. **Ignore this error** and keep writing your code in the JS tab.

---

## Key Concepts

Read through these briefly before starting. You don't need to memorize them — come back and reference them as you work through each step.

| API | What it does |
|-----|-------------|
| `document.querySelector('selector')` | Finds the first element on the page matching a CSS selector |
| `element.textContent` | Gets or sets the plain text inside an element |
| `element.innerHTML` | Gets or sets the HTML markup inside an element |
| `document.documentElement` | Refers to the `<html>` element — where CSS custom properties live |
| `style.setProperty('--name', 'value')` | Updates a CSS custom property directly from JavaScript |
| `element.classList.add('name')` | Adds a CSS class to an element |
| `document.createElement('tag')` | Creates a brand-new HTML element (not yet on the page) |
| `parent.appendChild(element)` | Places an element inside a parent, after any existing children |
| `element.remove()` | Removes an element from the page entirely |
| `element.dataset.name` | Reads the value of a `data-name` attribute |

---

## Steps

### Step 1: Find Elements and Change Their Text

This is the foundation of everything you'll do in JavaScript: *find* something, then *change* it. JavaScript uses `querySelector()` to find elements — and here's the great news — it accepts the exact same CSS selectors you have been writing for weeks. If you can write it in CSS, you can use it in JavaScript.

Once you have an element stored in a variable, `textContent` lets you read or replace the text inside it.

**What to do:**

1. Use `document.querySelector()` with the selector `'h1'` to find the main page heading. Store the result in a `const` variable with a meaningful name. Right after, use `console.log()` to print your variable to the Console tab — this confirms you found the right element before you change anything.

2. Use the `textContent` property on your variable to change the heading text to: `Utah Tech — Trailblazers`

   > **Watch out:** The dash in the middle is an **em dash** (—), not a regular hyphen (-). They look similar but are different characters, and the test checks for an exact match. Copy it directly from here rather than typing it.

3. Now find the hero section heading — the "Welcome to Utah Tech" text inside the `#welcome` section. Use `querySelector()` with the selector `'#welcome h2'`. The space between `#welcome` and `h2` is a **descendant combinator** — it means "find an `h2` anywhere inside the element with id `welcome`." Store it in a new `const` and log it to the console.

4. Change that heading's `textContent` to: `Your Future Starts Here`

5. Look at the preview — both headings should now show your new text.

> **Why `textContent` and not something else?** When you set `textContent`, the browser treats your string as plain text only. If you accidentally include an HTML tag like `<b>`, it shows up literally on screen rather than being parsed. This makes `textContent` the safe default for changing text. You'll use `innerHTML` in Step 5 when you actually *want* to inject HTML tags.

---

### Step 2: Change the Entire Site's Color Scheme with One Line

This is the step that shows you the real power of CSS custom properties — and why you spent time wiring them up in the previous lesson. Your entire site uses `var(--color-accent)` for headings, panel borders, buttons, bullet markers, and more. If you change that one variable from JavaScript, everything updates at once.

CSS custom properties are declared on `:root` in your stylesheet, which is the same as the `<html>` element. In JavaScript, `document.documentElement` is how you reference that element. Once you have it, call `style.setProperty()` on it, passing in the custom property name and a new color value as two separate arguments.

**What to do:**

1. Call `setProperty()` on `document.documentElement.style`, passing `'--color-accent'` as the first argument and any valid CSS color value as the second. Try `'#2d8a4e'` (Sage Green) to start.

2. Look at the preview after you run your code. Headings, panel borders, the submit button, list markers — all changed at once. That is one line of JavaScript updating an entire design system.

3. The test for this step only checks that you *set* the property — not what color you chose — so feel free to experiment with different colors. Try `'coral'`, `'#6c5ce7'`, or any color you like. Just make sure something is set when you run the tests.

> **Why does this work?** Setting an inline style on `document.documentElement` overrides the value declared in your stylesheet. Every element that uses `var(--color-accent)` reads the new value automatically — you don't have to touch those elements at all.

---

### Step 3: Apply a CSS Class from JavaScript

By now you have seen JavaScript change *content*. This step shows you how JavaScript changes *appearance* — and it's more powerful than you might expect.

The idea is simple: you write your CSS classes ahead of time (they're already in the stylesheet), and JavaScript's only job is to add or remove the class name from an element. The browser handles all the visual change automatically. This is the pattern behind every dark mode toggle, navigation menu, modal, and accordion you'll ever build.

**What to do:**

1. Use `querySelector()` to find the element with the id `colleges`. Store it in a `const`.

2. Call `.classList.add()` on your variable, passing in the class name `'highlighted'` as a string.

3. Look at the preview — the Our Colleges panel should now have a visible border and a subtle tinted background. That styling was already written in the CSS, waiting for the class to appear.

> **The key insight here:** CSS defines what *both* states look like. JavaScript only flips the switch. This is a fundamental principle you will use constantly: keep your visual logic in CSS, and use JavaScript to trigger it by changing class names.

> **Other `classList` methods to know:**
> - `.remove('name')` — takes a class off an element
> - `.toggle('name')` — adds the class if it's missing, removes it if it's there
> - `.contains('name')` — returns `true` or `false` depending on whether the class is present

---

### Step 4: Create a New Element and Remove an Old One

Everything you have done so far has worked with elements that already exist in the HTML. JavaScript can also create brand-new elements from scratch — they don't need to be in the HTML file at all. And it can remove elements that are no longer needed.

This step has two parts. In Part A you will build an announcement banner entirely in JavaScript and place it on the page. In Part B you will remove a placeholder element that was there just for this purpose.

**Part A — Build and place an announcement banner:**

Think of creating an element in JavaScript like building a piece of furniture before putting it in a room. You create it, set it up the way you want it, and then place it where it belongs. The order matters.

1. Use `document.createElement()` to create a new `div` element. Store it in a `const` variable. At this point it exists in memory but is not visible on the page yet.

2. Use `.classList.add()` to add the class `'announcement'` to your new element. This connects it to the pre-written CSS that styles announcement banners.

3. Use `.textContent` to set the text of the element to exactly: `New student applications are now open!`
   The test checks for a precise match, so copy this text carefully.

4. Use `querySelector()` to find the `header` element on the page. Then call `.appendChild()` on the header, passing in your new banner element. This places the banner inside the header as its last child. Check the preview — your banner should appear at the bottom of the header.

**Part B — Remove the placeholder:**

5. The HTML has an element with the id `info-banner` — a placeholder that says "Placeholder banner — replace this with JavaScript." Now that you've created the real announcement, it's time to remove the placeholder. Use `querySelector()` to find it by its id, then call `.remove()` directly on it. That's all it takes — `.remove()` deletes the element from the page immediately.

> **Why does the order matter in Part A?** You can set properties (class, textContent) in any order before appending. But you must configure the element *before* calling `appendChild()` — or at least it's good practice. Once it's on the page you can still change it, but building it first and placing it second is the cleaner approach.

---

### Step 5: Read Data from HTML and Inject Content

HTML elements can carry extra information using `data-*` attributes — custom attributes you define yourself. Look at the HTML tab and find the header. You'll see three small color swatch divs, each with a `data-color` and a `data-name` attribute built right into the tag.

JavaScript reads these through the `dataset` property. The naming convention is simple: `data-color` becomes `dataset.color`, and `data-first-name` would become `dataset.firstName`. Hyphens convert to camelCase.

**What to do:**

1. Use `querySelector()` with the selector `'.color-swatch'` to find the first swatch element. Store it in a `const`.

2. Access its `dataset.color` property and store the result in a `const` called `color`. Access its `dataset.name` property and store the result in a `const` called `swatchName`. After each one, use `console.log()` to print the value — you should see `#BA1C21` and `Rock Red` appear in the Console.

   > **Name your variable `swatchName`, not `name`.** The word `name` is already used by the browser as a built-in property (`window.name`), and reusing it causes a warning. `swatchName` is clearer and avoids the conflict entirely.

3. Build a label string by combining `swatchName` and `color` using a **template literal**. Template literals use backticks instead of quotes. Inside them, any expression wrapped in `${ }` gets evaluated and inserted into the string. Your label should end up looking like: `Rock Red: #BA1C21`. Store it in a `const` called `label`.

4. Use `querySelector()` to find the element with the id `swatch-label` — this is an empty `div` in the footer, placed there specifically for you to fill in. Use its `innerHTML` property to inject a `<p>` element containing your `label` variable. When using `innerHTML`, you're writing the HTML as a string — so your `<p>` tags need to be part of that string, and your `label` variable should be embedded using the `${ }` syntax.

   > **Why `innerHTML` here and not `textContent`?** Because you're creating a `<p>` element, not just setting text. `innerHTML` parses HTML tags in the string — `textContent` would print the `<p>` tags as literal characters. Use `textContent` for plain text, and `innerHTML` when you're intentionally building HTML structure.

5. Finally, use `setProperty()` on `document.documentElement.style` (just like in Step 2) to update `--color-accent` with your `color` variable. This time you're not hardcoding a color — the value comes from the data attribute in your HTML. The entire site recolors to Rock Red, driven by data you read right out of the DOM.

> **`dataset` naming rule to remember:** Any hyphen in a `data-*` attribute name becomes camelCase in JavaScript. `data-color` → `dataset.color`. `data-background-color` → `dataset.backgroundColor`. This is the same pattern as CSS property names in JavaScript.

---

## Summary

| Step | What You Practiced | Key Tool |
|------|-------------------|---------|
| Getting Started | Connecting a JavaScript file to HTML | `<script defer src="...">` |
| 1 | Finding elements and changing their text | `querySelector()`, `textContent` |
| 2 | Changing the entire site's color scheme at once | `style.setProperty()` |
| 3 | Applying a CSS class from JavaScript | `classList.add()` |
| 4 | Creating and removing elements | `createElement()`, `appendChild()`, `remove()` |
| 5 | Reading HTML data and injecting content | `dataset`, template literals, `innerHTML` |
