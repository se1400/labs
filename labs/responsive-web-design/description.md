# Responsive Web Design

The Utah Tech site you've been building all semester looks great on desktop — but try resizing your browser to 375px wide (the width of an iPhone). The layout breaks immediately: a horizontal scrollbar appears, the sidebar gets crushed, and text overflows its containers. More than half of all web traffic comes from mobile devices, so this is a serious problem.

In this lab you'll transform the site from a fixed desktop layout into a fully responsive design that works beautifully from a 320px phone to a 1920px ultrawide monitor. You'll use media queries to restructure the grid at different screen sizes, build a hamburger navigation menu, replace fixed font sizes with fluid typography, create an intrinsically responsive card grid, and introduce container queries — one of the newest and most powerful features in CSS.

**<a href="https://se1400.github.io/labs/labs/responsive-web-design/example.jpg" target="_blank">View completed example</a>** — The screenshot shows the desktop layout. To see the responsive behavior, build each step and resize your browser.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Note:** The starter file includes the complete Utah Tech page from all previous labs — HTML structure, forms, transitions, transforms, animations, and pseudo-elements are already in place. You'll be modifying existing CSS rules AND adding new ones.

**Where to add your CSS:** Some steps ask you to **edit existing rules** in the starter CSS (like the `body` rule). New rules go below the `/* Responsive Web Design — add your CSS below */` comment at the bottom of your CSS file.

**How to test:** After each step, open Chrome DevTools (F12 or Cmd+Option+I), click the device toolbar icon (or press Cmd+Shift+M / Ctrl+Shift+M), and resize the viewport. Watch your layout adapt in real time.

## Key Concepts

### What is Responsive Web Design?

Responsive web design is the practice of building a single HTML document that adapts its layout and appearance to fit any screen size. Instead of building separate mobile and desktop websites, you write one set of HTML and use CSS to rearrange, resize, and restyle elements based on the available space.

### Mobile-First Design

Mobile-first means you write your default CSS for the smallest screen, then use `@media (min-width: ...)` queries to add layout complexity for larger screens. This approach works well because:

- **Simpler base styles.** A single-column layout needs fewer rules than a multi-column one. You start simple and add complexity.
- **CSS cascade works in your favor.** Adding rules for wider screens with `min-width` is cleaner than stripping them back with `max-width`.
- **Performance.** Mobile users on slower connections get only the CSS they need. Larger-screen enhancements load progressively.

### What is a Media Query?

A `@media` rule is a conditional block of CSS. If the condition is true, the styles inside apply. The most common condition is viewport width:

```css
/* Default: applies to ALL screen sizes */
.container { padding: 1rem; }

/* Only applies when viewport is 768px or wider */
@media (min-width: 768px) {
  .container { padding: 2rem; }
}
```

The structure is similar to `@keyframes` from the previous lab — it's a block (curly braces) that wraps other CSS rules. Inside the `@media` block, you write normal CSS rules with selectors and properties.

### What is clamp()?

`clamp(minimum, preferred, maximum)` returns the preferred value as long as it falls between the minimum and maximum. By using a viewport-relative unit (`vw`) as the preferred value, you get smooth scaling:

```css
/* Font scales from 1.5rem (small screens) to 3rem (large screens) */
h1 { font-size: clamp(1.5rem, 4vw + 1rem, 3rem); }
```

The formula `4vw + 1rem` means "4% of viewport width plus 1rem." On a 375px phone, that's about 16px + 16px = 32px. On a 1280px desktop, it's about 51px + 16px = 67px. The `clamp()` caps it at 3rem (48px) maximum.

### What is a Container Query?

Media queries respond to the **viewport** width. Container queries respond to a **parent element's** width. This means a card component can adapt based on how much space it actually has — whether it's in a narrow sidebar or a wide main column.

```css
/* Declare a containment context */
.card-grid { container-type: inline-size; }

/* Style cards based on the grid's width, not the viewport */
@container (min-width: 500px) {
  .card { aspect-ratio: auto; }
}
```

---

## Steps

### Step 1: Mobile-First Body Grid

Right now, the `body` rule near the top of the CSS sets a fixed 4-column grid: `minmax(0, 1fr) minmax(640px, 1fr) 280px minmax(0, 1fr)`. That `640px` minimum forces horizontal scroll on any screen under about 960px wide. You'll fix this by making the default layout single-column, then restoring the multi-column layout for wider screens.

1. **Edit the existing `body` rule** (near line 22 in the starter CSS). Change `grid-template-columns` from the 4-column value to just `1fr`. Also remove the `column-gap` property — it's not needed for a single column.

   After this change, refresh and look at the page at 375px. Everything stacks in a single column — it's not pretty yet, but there's no more horizontal scroll. That one change fixed the biggest problem.

2. Find the existing rules for `main` and `.sidebar`. They currently have `grid-column`, `grid-row`, and `padding-top` values that reference the old 4-column layout. **Remove** `grid-column` and `grid-row` from both rules — on mobile, `main` and `.sidebar` should just flow naturally in the single column. Change the `padding-top` to `padding: var(--space-fluid)` (you'll create this custom property in Step 3 — for now, just use `padding: 1rem` as a placeholder, or skip ahead and add the variable first).

3. Below the comment line at the bottom of the CSS, add your first media query:

   ```
   @media (min-width: 768px) { ... }
   ```

   Inside this media query, add a rule for `body` that restores the multi-column grid:
   - Set `grid-template-columns` to `minmax(0, 1fr) minmax(0, 1fr) 280px minmax(0, 1fr)`
   - Set `column-gap` to `1.5rem`

4. Inside the same `@media (min-width: 768px)` block, add rules to place the content columns:
   - `main` should get `grid-column: 2` and `grid-row: 4` and `padding-top: 1.5rem`
   - `.sidebar` should get `grid-column: 3` and `grid-row: 4` and `padding-top: 1.5rem`

5. Add a second media query for large desktops:

   ```
   @media (min-width: 1024px) { ... }
   ```

   Inside it, set the body `grid-template-columns` to `minmax(0, 1fr) minmax(640px, 1fr) 280px minmax(0, 1fr)`. This restores the original wide main column on large screens.

**Try it out:** Drag your browser from narrow to wide. At 768px the sidebar should snap to the right side. At 1024px the main content column should get wider.

### Step 2: Responsive Navigation with Hamburger Toggle

On mobile, the horizontal nav links take up too much space and should collapse behind a hamburger button. The `<button class="menu-toggle">` is already in the HTML — you just need to style it and wire up the toggle.

**Part A: CSS**

1. Find the existing `.menu-toggle` rule in the starter CSS. It currently has `display: none`. Change it to show the button on mobile:
   - Set `display` to `flex`
   - Set `flex-direction` to `column`, `justify-content` to `center`, `align-items` to `center`
   - Set `gap` to `5px`
   - Set `background` to `var(--ut-navy)`, `border` to `none`, `padding` to `0.75rem 1rem`
   - Set `cursor` to `pointer` and `width` to `100%`

2. Add a rule for `.menu-toggle span` — these are the three hamburger lines:
   - Set `display` to `block`, `width` to `24px`, `height` to `2px`
   - Set `background` to `var(--ut-white)` and `border-radius` to `2px`

3. Find the existing `nav` rule. Change it so the nav is hidden on mobile:
   - Set `display` to `none`
   - Set `flex-direction` to `column` and `align-items` to `center`
   - Change `gap` to `0.5rem`

4. Add a new rule for `nav.nav-open`:
   - Set `display` to `flex`

   This is the class that JavaScript will toggle when the hamburger is clicked.

5. Inside your `@media (min-width: 768px)` query, add two rules:
   - `.menu-toggle` gets `display: none` (hide hamburger on desktop)
   - `nav` gets `display: flex`, `flex-direction: row`, `justify-content: center`, and `gap: 2rem`

6. Update the full-width spanning rule. Find the rule that sets `grid-column: 1 / -1` for `header, nav, #welcome, footer`. Add `.menu-toggle` to the selector list so the hamburger spans the full width.

**Part B: JavaScript**

7. Open `starter.js`. After the existing year script, add the hamburger toggle:

   ```javascript
   const menuToggle = document.querySelector('.menu-toggle');
   const nav = document.querySelector('#main-nav');

   menuToggle.addEventListener('click', () => {
       const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
       menuToggle.setAttribute('aria-expanded', String(!expanded));
       nav.classList.toggle('nav-open', !expanded);
   });
   ```

   This toggles the `nav-open` class on the nav and updates `aria-expanded` for screen readers.

**Try it out:** At 375px, you should see the three-line hamburger button. Click it — the nav links appear as a vertical column. Click again — they disappear. At 768px+, the hamburger vanishes and the nav links show horizontally.

### Step 3: Fluid Typography with clamp()

Fixed font sizes create jarring jumps at breakpoints. The `clamp()` function makes typography scale smoothly across all viewport widths — no media queries needed.

1. Find the `h1` rule and add a `font-size` property using `clamp()`:
   - `font-size: clamp(1.5rem, 4vw + 1rem, 3rem)`

2. Add a new rule for `h2` with:
   - `font-size: clamp(1.25rem, 3vw + 0.5rem, 2rem)`

3. Add a new rule for `h3, h4` with:
   - `font-size: clamp(1rem, 2vw + 0.5rem, 1.5rem)`

4. In the `:root` rule near the top of the CSS, add a custom property:
   - `--space-fluid: clamp(1rem, 3vw, 2rem)`

   This creates a reusable spacing value that scales from 1rem on small screens to 2rem on large screens. You'll use it for padding and grid gaps.

5. Find the `.panel` rule and change the `padding` to use `clamp()`:
   - `padding: clamp(0.75rem, 3vw, 1.5rem)`

6. Update the `main` and `.sidebar` rules to use `var(--space-fluid)` for padding instead of fixed values. For the mobile (default) styles, set:
   - `main { padding: var(--space-fluid); }`
   - `.sidebar { padding: var(--space-fluid); }`

**Try it out:** Slowly resize your browser. The headings and spacing should scale smoothly — no sudden jumps at breakpoints.

### Step 4: Intrinsic Programs Grid

The programs grid already uses CSS Grid's `repeat()` with `auto-fit`, but the 180px minimum is too small for readable cards on mobile. You'll also switch from `auto-fit` to `auto-fill` and use your fluid spacing variable.

1. Find the `.programs-grid` rule and update it:
   - Change `grid-template-columns` to `repeat(auto-fill, minmax(min(250px, 100%), 1fr))`
   - Change `gap` to `var(--space-fluid)`
   - Add `container-type: inline-size` (you'll use this in Step 6)

   The `min(250px, 100%)` trick prevents the 250px minimum from overflowing on screens narrower than 250px — it falls back to 100% of the container width.

> **Why auto-fill instead of auto-fit?** Both create as many columns as fit. The difference appears when there are fewer items than possible columns. `auto-fill` keeps empty column tracks, maintaining consistent card widths. `auto-fit` collapses empty tracks, stretching items wider. For a card grid, `auto-fill` produces more predictable results.

**Try it out:** Resize your browser slowly. The cards should automatically switch from 1 column (mobile) to 2 columns to 3 columns — all without a single media query. That's intrinsic responsive design.

### Step 5: Hero Section & Responsive Images

The hero section needs a proper height and the images and video need to be responsive.

1. Add a global responsive image reset. Near the top of the CSS (before the body rule), add:
   - `img { max-width: 100%; height: auto; }`

   This single rule prevents every image on the page from overflowing its container.

2. Add a rule for `video` with the same approach:
   - `max-width: 100%` and `height: auto`

3. Find the `#welcome` rule. It currently has `grid-template-columns: subgrid` — this inherits column tracks from the parent body grid, but on a single-column body it only inherits one track. **Remove** the `grid-template-columns: subgrid` line. Then add:
   - `min-height: 100vh` (fallback for older browsers)
   - `min-height: 100dvh` (overrides the fallback if supported)

   Dynamic viewport height (`dvh`) adjusts in real time as mobile browser chrome (address bar, tab bar) appears and disappears. The `vh` fallback ensures the layout still works in older browsers.

4. Find the `.hero-overlay` rule. **Remove** `display: grid` and `grid-template-columns: subgrid` — these are only needed when the body has multiple columns. The overlay will flow naturally in a single-column layout.

5. Find the `.hero-content` rule. **Remove** `grid-column: 2 / 4` — this refers to columns that don't exist on mobile. Update the padding to use `clamp()`:
   - `padding: clamp(1rem, 5vw, 2rem) clamp(1rem, 8vw, 1.5rem)`

6. Find the `#colleges figure img` rule and add:
   - `aspect-ratio: 16 / 9`
   - `object-fit: cover`

   The `aspect-ratio` gives the image a consistent shape regardless of the original file dimensions. The `object-fit: cover` fills that shape edge-to-edge, cropping if needed rather than stretching.

7. Inside your `@media (min-width: 768px)` query, restore the hero's subgrid layout for desktop:
   - `#welcome` gets `display: grid`, `grid-template-columns: subgrid`, `align-items: end`
   - `.hero-overlay` gets `grid-column: 1 / -1`, `display: grid`, `grid-template-columns: subgrid`
   - `.hero-content` gets `grid-column: 2 / 4`

**Try it out:** The hero should fill the viewport height on mobile. The campus image should have a consistent 16:9 shape. The video should shrink to fit narrow screens.

### Step 6: Container Queries on Program Cards

Media queries respond to the viewport — but your program cards live inside a grid that might be narrow even on a wide screen (because the sidebar takes space). Container queries let the cards respond to how much space the grid actually gives them.

You already added `container-type: inline-size` to `.programs-grid` in Step 4. Now write the query.

1. Add a `@container` query:

   ```
   @container (min-width: 500px) { ... }
   ```

   Inside it, add two rules:
   - `.program-card` gets `aspect-ratio: auto` (removes the square constraint when cards have room)
   - `.featured` gets `grid-column: span 2` (the featured card spans two columns only when the grid is wide enough)

2. Find the base `.featured` rule (the one outside any query) and **remove** the `grid-column: span 2` line. On a single-column mobile grid, `span 2` causes the card to overflow. The container query now handles it.

**Try it out:** Resize your browser. When the programs grid is narrow (mobile), all cards are the same width and square. When the grid is wider (desktop), the featured card spans two columns and cards lose their forced square aspect ratio. The cards respond to the *grid's* width, not the browser's width.

### Step 7: Responsive Table & Final Polish

The tuition table overflows on narrow screens because table cells can't wrap. You'll fix this with a scrollable wrapper.

1. Open `starter.html`. Find the `<table>` inside the `#tuition` section and wrap it in a new `<div>`:

   ```html
   <div class="table-wrapper">
       <table>
           ... existing table content ...
       </table>
   </div>
   ```

2. In the CSS, add a rule for `.table-wrapper`:
   - `overflow-x: auto`

   This allows the table to scroll horizontally when it overflows. The rest of the page stays fixed — only the table moves.

3. Open Chrome DevTools (F12) and test at these sizes:
   - **iPhone SE (375px):** Single column, hamburger nav, cards stacked, table scrollable
   - **iPad (768px):** Two-column layout with sidebar, horizontal nav, cards in grid
   - **Desktop (1280px):** Full layout, wider main column, generous spacing

**Try it out:** At 375px, the table should scroll left-right inside its container without causing the entire page to scroll horizontally.

---

## Summary

| Step | What you built | Key CSS |
|------|---------------|---------|
| 1 | Mobile-first body grid | `grid-template-columns: 1fr`, `@media (min-width: 768px)` |
| 2 | Hamburger navigation | `.menu-toggle`, `nav.nav-open`, `aria-expanded` |
| 3 | Fluid typography | `clamp()`, `--space-fluid` custom property |
| 4 | Intrinsic card grid | `repeat(auto-fill, minmax(min(250px, 100%), 1fr))` |
| 5 | Responsive hero & images | `100dvh`, `max-width: 100%`, `object-fit: cover` |
| 6 | Container queries | `container-type: inline-size`, `@container (min-width: ...)` |
| 7 | Scrollable table | `.table-wrapper { overflow-x: auto }` |
