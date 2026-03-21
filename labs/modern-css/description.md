# Modern CSS

Your Utah Tech site is fully responsive — it works on phones, tablets, and desktops. But the CSS file that powers it is 730 lines of flat, repetitive code written in a traditional style. Modern CSS has added powerful new features that all major browsers now support: you can organize rules into layers, nest related styles together, group selectors, style parents based on their children, and add dark mode — all without JavaScript.

In this lab you'll reorganize and improve the existing CSS using five modern features. You won't change any HTML. When you're done, the site should look identical in light mode. Dark mode is the only new visual change.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Note:** The starter files are your completed responsive site from Lab 16. The HTML is already finished — you will only be editing the CSS file.

**Before you start:** Consider duplicating your `starter.css` as a backup before restructuring. You'll be moving hundreds of lines around, and it's helpful to have the original to compare against.

**How to test:** After each step, run the tests. For dark mode testing, open Chrome DevTools, then go to the Rendering panel (three-dot menu at the top right of DevTools, then More tools, then Rendering) and set "Emulate CSS media feature prefers-color-scheme" to "dark."

## Key Concepts

Read through these concepts before starting. You don't need to memorize them — come back and reference them as you work through each step.

### Cascade Layers (`@layer`)

When two CSS rules target the same element, the browser needs to decide which one wins. Normally, the more *specific* selector wins (an ID beats a class, a class beats a tag). This can lead to problems: you end up writing longer and longer selectors just to override something.

`@layer` solves this by letting you group your CSS into named layers with a set priority order. A rule in a higher-priority layer **always** wins over a rule in a lower-priority layer, no matter how specific the selectors are.

### CSS Nesting

In traditional CSS, if you want to style a card and its hover state, you write two separate rules: `.card { ... }` and `.card:hover { ... }`. These can end up far apart in a long file. CSS nesting lets you put the hover rule *inside* the card rule, keeping related styles together. The `&` character stands for the parent selector — so `&:hover` inside `.card` means `.card:hover`.

### `:is()` and `:where()`

These let you group selectors inside a comma-separated list, turning repetitive rules into shorter ones. The only difference between them is a concept called **specificity** (how the browser decides which rule wins when two rules conflict):

- **`:is(A, B)`** — normal specificity. Use this when you just want to shorten your selectors.
- **`:where(A, B)`** — zero specificity, meaning any other rule can easily override it. Use this for default/base styles that you want other rules to be able to override without a fight.

### `:has()` — The Parent Selector

Until recently, CSS could only style elements based on their parents or siblings — never the other direction. `:has()` changes that. It lets you style a parent element based on what's *inside* it. For example, `figure:has(figcaption)` selects only `<figure>` elements that contain a `<figcaption>` child. Before `:has()`, this required JavaScript.

### Dark Mode with `prefers-color-scheme`

Modern operating systems let users choose between light and dark themes. CSS can detect this choice with `@media (prefers-color-scheme: dark)`. The best approach is to define your colors as CSS custom properties (variables) with light-mode values by default, then override those same variables with dark-mode values inside the media query. Every element using those variables automatically switches colors — no extra rules needed.

---

## Steps

### Step 1: Cascade Layers (`@layer`)

In this step you'll organize your CSS into four named groups called **layers**. Think of layers like folders — each one holds a category of styles, and you decide upfront which folder has the highest priority.

**What "wrapping" means:** To wrap existing rules in a layer, you type `@layer layerName {` on a new line above the first rule in that group, then add a closing `}` after the last rule in that group. Everything between the braces is now inside that layer. The rules themselves don't change — you're just putting them in a container.

1. **Add the layer order declaration.** At the very top of your CSS file (before everything else, including `:root`), add a single line that declares the four layer names in order from lowest to highest priority:

   `@layer base, components, forms, utilities;`

   This tells the browser: "base" styles have the lowest priority, and "utilities" have the highest. A rule inside `utilities` will always beat a rule inside `base`, even if the base rule has a more specific selector.

2. **Wrap the base styles** inside `@layer base { }`.

   "Base" means everything you'd want on a blank page before adding any components — resets, fonts, and default link colors. Find each of the following rules in your CSS and make sure they are between the opening `@layer base {` and its closing `}`:

   The `:root` custom properties, the `*` box-sizing reset, `html`, `img`, `body`, all heading rules (`h1`, `h2, h3, h4`, `h2` size, `h3, h4` size), the link styles (`a:link`, `a:visited`, `a:hover`, `a:active`), `.skip-link` and `.skip-link:focus-visible`, `pre`, `address`, `video`, and `::selection`.

3. **Wrap the component styles** inside `@layer components { }`.

   "Components" are the visual building blocks of the page — anything you can point to and name. This includes: `header` and `header img`, `.menu-toggle` and `.menu-toggle span`, `nav` and all `nav`-related rules (`nav.nav-open`, `nav a`, `nav a::after`, `nav a:hover::after`, `nav a:link`, `nav a:visited`, `nav a:hover`, `nav a:focus-visible`), the hero section (`#welcome`, `.hero-overlay`, `.hero-overlay h2`, `.hero-content`, `.hero-content h2`, `.hero-content p`, `.hero-content p:first-of-type::first-letter`), the grid-column spanning rule (`header, .menu-toggle, nav, #welcome, footer`), `main`, `.sidebar` and `.sidebar li::marker`, `.panel`, `.programs-grid`, `#colleges figure` and its children (`#colleges figure img`, `#colleges figure:hover img`, `#colleges figcaption`), `.program-card` and `.program-card:hover`, `.featured`, the `@container` query, all flip-card rules (`.flip-card`, `.flip-card-inner`, `.flip-card:hover .flip-card-inner`, `.flip-card-front, .flip-card-back`, `.flip-card-front`, `.flip-card-back`, `.flip-card-back h4`), `.key-dates` rules, `footer` and all footer-related rules (`footer a:link`, `footer a:visited`, `footer a:hover`, `footer img`, `footer img:hover`), table rules (`.table-wrapper`, `table`, `th, td`, `th`, `tbody tr:nth-child(odd)`), and the placeholder rules (`input::placeholder`, `textarea::placeholder`).

4. **Wrap the form styles** inside `@layer forms { }`.

   Everything related to the application form goes here: `form`, `.form-group`, `fieldset`, `legend`, `form label`, the input/select/textarea styles, `textarea` resize, `.field-hint`, the focus styles, required-input styles, validation states (`input:user-invalid`, `input:valid`), `button[type="submit"]`, and `button[type="submit"]:hover`.

5. **Wrap the animation and utility styles** inside `@layer utilities { }`.

   Animations and motion preferences are small, single-purpose rules. This includes: all four `@keyframes` blocks (`fadeSlideIn`, `bounce`, `pulse`, `cardEntrance`), `.scroll-arrow` and `.scroll-arrow::after`, the `.programs-grid > *` animation rule, and the `@media (prefers-reduced-motion: reduce)` block.

6. **Leave the desktop media query outside any layer.** The `@media (min-width: 1024px)` block at the bottom of your file should NOT be inside any `@layer`. Layout overrides need to apply regardless of layer order.

> **Why layers matter in the real world:** Imagine you add Bootstrap to your project. Bootstrap's `.btn` class and your `.btn` class have the same specificity — whichever stylesheet loads last wins, and it's unpredictable. With layers, you can put Bootstrap in a `vendor` layer and your code in a `components` layer. Your styles always win, no matter what. That's the problem layers solve.

---

### Step 2: CSS Nesting

Right now, related styles are scattered across your file. For example, `.program-card` might be on line 200 while `.program-card:hover` is on line 220. CSS nesting lets you put child and state rules *inside* their parent, so everything about one component lives in a single block.

**How `&` works:** Inside a nested block, `&` represents the parent selector. So if you're inside `.program-card { }` and write `&:hover { }`, the browser reads that as `.program-card:hover`. This is required for pseudo-classes on the same element (`:hover`, `:focus`, etc.). For descendant selectors (targeting children), `&` is optional: `& img` and `img` both work the same way inside a parent block.

1. **Nest the program card hover state.** Find the `.program-card:hover` rule in your CSS. Cut its properties (the `transform` and `box-shadow` declarations). Then, inside the `.program-card` block, add `&:hover { }` and paste those properties inside it. Delete the now-empty `.program-card:hover` rule.

2. **Nest nav-related rules inside `nav`.** There are many rules that start with `nav` scattered through your CSS: `nav.nav-open`, `nav a`, `nav a::after`, `nav a:hover::after`, `nav a:link, nav a:visited`, `nav a:hover`, and `nav a:focus-visible`. Move each of these inside the main `nav { }` block using `&` syntax:

   - `nav.nav-open` becomes `&.nav-open` (no space — this means "nav when it also has the class nav-open")
   - `nav a` becomes `& a` (with a space — this means "an anchor inside nav")
   - `nav a::after` becomes `&::after` nested inside `& a` (it's a pseudo-element on the anchor, which is itself inside nav)
   - `nav a:hover::after` becomes `&:hover::after`, also nested inside `& a`
   - `nav a:link, nav a:visited` becomes `& a:link, & a:visited` (or you can combine them later in Step 3)
   - `nav a:hover` becomes `& a:hover`
   - `nav a:focus-visible` becomes `& a:focus-visible`

   After moving, delete all the original standalone rules that you moved.

3. **Nest `#colleges figure` children.** Find the `#colleges figure img`, `#colleges figure:hover img`, and `#colleges figcaption` rules. Move the image rule inside `#colleges figure` as `& img { }`. Move the hover-zoom rule inside as `&:hover img { }`. Delete the original standalone rules. (Note: leave `#colleges figcaption` as a separate rule — it's not a direct nesting candidate since it doesn't share the same parent selector.)

4. **Nest footer children.** Find `footer a:link, footer a:visited`, `footer a:hover`, `footer img`, and `footer img:hover`. Move each inside the `footer { }` block:
   - The link rules become `& a:link, & a:visited` and `& a:hover`
   - `footer img` becomes `& img { }`
   - `footer img:hover` becomes `&:hover { }` nested *inside* the `& img` block (this is nesting two levels deep — the hover is on the image, which is inside the footer)

   Delete the original standalone rules.

> **Common mistake:** Writing `:hover` without `&` inside a parent block. Without `&`, the browser treats `:hover` as a *descendant* selector — meaning "any hovered element inside the parent." With `&:hover`, it means "the parent itself when hovered." Always use `&` for pseudo-classes on the same element.

---

### Step 3: `:is()` and `:where()` Selector Grouping

Look through your CSS for places where you have the same styles repeated with comma-separated selectors. `:is()` and `:where()` let you combine these into one shorter selector.

**How it works:** Instead of writing `h2, h3, h4 { color: red; }`, you can write `:is(h2, h3, h4) { color: red; }`. Both do the same thing. The benefit becomes clearer with longer selectors — `footer a:link, footer a:visited` becomes `footer :is(a:link, a:visited)`.

1. **Change the heading color rule to use `:is()`.** Find the rule that sets `color` and `margin-top` on `h2, h3, h4`. Replace the comma-separated selector with `:is(h2, h3, h4)`. The properties inside stay the same.

2. **Group the placeholder selectors with `:is()`.** Find the rule that styles `input::placeholder, textarea::placeholder`. Replace the two selectors with `:is(input, textarea)::placeholder`. This applies the `::placeholder` pseudo-element to both input types at once.

3. **Use `:is()` to simplify at least one more selector.** Look through your CSS for other comma-separated selectors. Good candidates include:
   - `footer a:link, footer a:visited` can become `footer :is(a:link, a:visited)` (or `& :is(a:link, a:visited)` if you already nested it)
   - `.flip-card-front, .flip-card-back` can become `:is(.flip-card-front, .flip-card-back)`
   - `header, .menu-toggle, nav, #welcome, footer` can become `:is(header, .menu-toggle, nav, #welcome, footer)`

4. **Use `:where()` for at least one rule.** The best candidate is your base link styles — the `a:link`, `a:visited`, `a:hover`, and `a:active` rules in your base layer. Wrap each selector in `:where()`:

   - `a:link` becomes `:where(a:link)`
   - `a:visited` becomes `:where(a:visited)`
   - `a:hover` becomes `:where(a:hover)`
   - `a:active` becomes `:where(a:active)`

   The properties inside don't change — only the selector changes. **Why?** Because `:where()` gives these rules zero specificity. That means when your nav or footer defines its own link colors, those component-level styles automatically win without needing more specific selectors. It prevents the "specificity arms race" where you keep adding selectors to override other rules.

> **Rule of thumb:** Use `:where()` for defaults you want to be easy to override. Use `:is()` everywhere else — it's just shorthand for reducing repetition.

---

### Step 4: `:has()` Relational Pseudo-class

In this step you'll add three brand-new rules that style parent elements based on what they contain. This is something CSS couldn't do at all until `:has()` was introduced — it always required JavaScript.

Use your existing brand tokens (like `--ut-red` and `--ut-panel-gray`) for colors in these rules. You'll replace them with semantic tokens in Step 5.

1. **Style figures that contain a caption.** Add a new rule with the selector `figure:has(figcaption)`. This targets any `<figure>` element that has a `<figcaption>` inside it. Give it a `border-bottom` of `2px solid var(--ut-red)` and set `padding-bottom` to `0`. Figures without a caption won't be affected. Add this rule inside your components layer, near the other figure styles.

2. **Highlight form groups when an input is focused.** Add a new rule with the selector `.form-group:has(:focus)`. This targets any `.form-group` container when the user clicks into one of its input fields. Give it a `background-color` of `var(--ut-panel-gray)`, a `border-radius` of `0.25rem`, and `padding` of `0.5rem`. Add this rule inside your forms layer, near the `.form-group` rule. If you're using CSS nesting, you can put it inside the `.form-group` block as `&:has(:focus) { }`.

3. **Mark the form when it contains invalid inputs.** Add a new rule with the selector `form:has(:invalid)`. This targets the entire `<form>` when any of its required fields are empty or have invalid values. Give it a `border-left` of `3px solid var(--ut-red)` and `padding-left` of `1rem`. Add this rule inside your forms layer.

> **Why this matters:** Before `:has()` existed, all three of these patterns required JavaScript — you'd need event listeners to detect focus/invalid states and toggle CSS classes on parent elements. Now it's pure CSS, with no JavaScript needed.

---

### Step 5: Dark Mode

In this final step, you'll add dark mode support. The strategy is: define your colors as **CSS custom properties** (variables) with meaningful names, then swap their values when the user's operating system is in dark mode.

Right now, your CSS uses brand tokens like `--ut-red` and `--ut-navy` directly. The problem is that `--ut-navy` is a dark blue — great for text on a white background, but invisible on a dark background. Instead of changing every rule for dark mode, you'll create a new set of variables with names that describe their *purpose* (like `--color-text` for "whatever color text should be") rather than their appearance. Then dark mode just redefines what "text color" means.

1. **Add semantic custom properties to `:root`.** Open your `:root` rule (inside `@layer base`) and add these new variables alongside the existing brand tokens. Don't remove the old tokens — they're still used in places like the nav and footer where colors don't change in dark mode.

   | Variable | Light Mode Value | What It's For |
   |----------|-----------------|---------------|
   | `--color-bg` | `#ffffff` | Page background |
   | `--color-surface` | `#f7f7f7` | Panel/card backgrounds |
   | `--color-text` | `#003058` | Main text color |
   | `--color-text-muted` | `#555` | Secondary/hint text |
   | `--color-border` | `#f2f2f2` | Borders and dividers |
   | `--color-accent` | `#BA1C21` | Brand red (links, headings, borders) |
   | `--color-accent-hover` | `#8B1518` | Darker red for hover/visited states |

2. **Add the dark mode media query.** At the very bottom of your CSS file, *after* the desktop media query and *outside* any `@layer` block, add a `@media (prefers-color-scheme: dark)` block. Inside it, add a `:root` rule that redefines the same semantic variables with dark-friendly values:

   | Variable | Dark Mode Value |
   |----------|----------------|
   | `--color-bg` | `#0f172a` |
   | `--color-surface` | `#1e293b` |
   | `--color-text` | `#f1f5f9` |
   | `--color-text-muted` | `#94a3b8` |
   | `--color-border` | `#334155` |
   | `--color-accent` | `#f87171` |
   | `--color-accent-hover` | `#fca5a5` |

3. **Replace old color tokens with the new semantic ones.** Go through your CSS and swap old brand tokens for the matching semantic tokens. Use Find & Replace (Ctrl+H / Cmd+H) to speed this up.

   **Safe to "Replace All"** — these tokens can be replaced everywhere without checking each one:

   | Find | Replace With | Replace All? |
   |------|-------------|:---:|
   | `var(--ut-red)` | `var(--color-accent)` | Yes |
   | `var(--ut-light-gray)` | `var(--color-border)` | Yes |
   | `var(--ut-panel-gray)` | `var(--color-surface)` | Yes |
   | `#555` | `var(--color-text-muted)` | Yes |
   | `#8B1518` | `var(--color-accent-hover)` | Yes |

   **Replace one at a time** — these tokens are used in two different contexts, so you must check each occurrence before replacing. Use the "Replace" button (not "Replace All") and skip the ones that should stay:

   | Find | Replace With | Replace When... | Keep When... |
   |------|-------------|-----------------|-------------|
   | `var(--ut-navy)` | `var(--color-text)` | Used as `color`, `outline`, or `border-color` (text/borders on light backgrounds) | Used as `background` or `background-color` (nav, footer, table headers, skip-link, flip-card-back, menu-toggle, h1 gradient) |
   | `var(--ut-white)` | `var(--color-bg)` | Used as `background-color` on `body` or `.program-card` | Used as `color` (text on dark backgrounds like nav, footer, hero) or in gradients |

   The reason: elements like the nav bar, footer, table headers, and flip-card back are **always** dark navy with white text, even in dark mode. Those should keep using `--ut-navy` and `--ut-white`. Only colors on *light-background* elements (body, panels, cards, form fields) need to switch for dark mode.

4. **Test your dark mode.** Open Chrome DevTools, then go to the Rendering panel (three-dot menu, More tools, Rendering). Set "Emulate CSS media feature prefers-color-scheme" to "dark." Your entire site should switch to a dark color scheme. If some elements still look light, check whether you missed replacing their color tokens in step 3.

> **Why put dark mode outside layers?** The `@media (prefers-color-scheme: dark)` block only redefines variable values on `:root`. It doesn't contain any selectors for specific elements. Since custom properties inherit to every element on the page regardless of layers, your components automatically pick up the new dark values without any extra rules.

---

## Summary

| Step | What You Learned | Key CSS |
|------|-----------------|---------|
| 1 | Organizing CSS with cascade layers | `@layer base, components, forms, utilities;` |
| 2 | Nesting related styles together | `&:hover`, `& a`, `&::after` |
| 3 | Grouping selectors to reduce repetition | `:is(h2, h3, h4)`, `:where(a:link)` |
| 4 | Styling parents based on their children | `figure:has(figcaption)`, `form:has(:invalid)` |
| 5 | Adding dark mode with custom properties | `@media (prefers-color-scheme: dark)` |
