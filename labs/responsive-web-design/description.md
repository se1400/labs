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

/* Only applies when viewport is 1024px or wider */
@media (min-width: 1024px) {
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

### The Viewport Meta Tag

Your starter HTML already includes this tag in the `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Without this tag, mobile browsers pretend the screen is 980px wide and zoom out to fit — so your page looks like a shrunken desktop site. This one line tells the browser: "Use the actual device width." It's required for any responsive design to work.

### What is a Container Query?

Media queries respond to the **viewport** width. Container queries respond to a **parent element's** width. This means a card component can adapt based on how much space it actually has — whether it's in a narrow sidebar or a wide main column.

```css
/* Declare a containment context */
.card-grid { container-type: inline-size; }

/* Style cards based on the grid's width, not the viewport */
@container (min-width: 450px) {
  .card { grid-column: span 2; }
}
```

### What is dvh?

Standard `vh` (viewport height) measures the browser window's full height — but on mobile phones, the address bar and toolbar appear and disappear as you scroll, changing the actual visible area. `dvh` (dynamic viewport height) adjusts in real time as browser chrome appears and disappears. Use `vh` as a fallback for older browsers, then override with `dvh`:

```css
.hero { min-height: 60vh; }   /* fallback */
.hero { min-height: 60dvh; }  /* override if supported */
```

---

## Steps

### Step 1: Mobile-First Body Grid

Right now, the `body` rule near the top of the CSS sets a fixed 4-column grid: `minmax(0, 1fr) minmax(640px, 1fr) 280px minmax(0, 1fr)`. That `640px` minimum forces horizontal scroll on any screen under about 960px wide. You'll fix this by making the default layout single-column, then restoring the multi-column layout for wider screens.

1. **Edit the existing `body` rule** in the starter CSS. Find the `grid-template-columns` property — it currently has a long value with four column tracks. Change the entire value to just `1fr` (a single column that takes all available space). Also **delete** the `column-gap: 1.5rem;` line — column gaps don't make sense when there's only one column.

   After this change, save and refresh your browser at 375px. Everything stacks in a single column — it's not pretty yet, but there's no more horizontal scroll. That one change fixed the biggest problem.

2. Find the existing rules for `main` and `.sidebar`. There are three separate rules in the starter CSS that you need to edit — look for each one:
   - The `main, .sidebar` rule (the one with both selectors separated by a comma) has `grid-row: 4` and `padding-top: 1.5rem`. **Delete** the `grid-row: 4;` line entirely, and change `padding-top: 1.5rem` to `padding: 1rem` (you'll upgrade this to a fluid value in Step 3).
   - The `main` rule (the one with just `main` as the selector) has `grid-column: 2`. **Delete** the `grid-column: 2;` line.
   - The `.sidebar` rule has `grid-column: 3` and `align-self: start`. **Delete** the `grid-column: 3;` line but keep `align-self: start`.

   Why? On mobile, `main` and `.sidebar` should just flow naturally in the single column, one after the other. The `grid-column` and `grid-row` properties force them into specific positions in the 4-column grid — which no longer exists on mobile.

3. Below the comment line at the bottom of the CSS, add a media query:

   ```
   @media (min-width: 1024px) { ... }
   ```

   Inside this media query, add a rule for `body` that restores the multi-column grid:
   - Set `grid-template-columns` to `minmax(0, 1fr) minmax(640px, 1fr) 280px minmax(0, 1fr)`
   - Set `column-gap` to `1.5rem`

4. Inside the same `@media (min-width: 1024px)` block, add rules to place the content columns:
   - `main` should get `grid-column: 2` and `grid-row: 4` and `padding-top: 1.5rem`
   - `.sidebar` should get `grid-column: 3` and `grid-row: 4` and `padding-top: 1.5rem`

> **Why 1024px?** This is roughly the width where a sidebar and main content column can both have enough space to be readable. Below 1024px, squeezing two columns side by side would make both too narrow.

**Try it out:** Drag your browser from narrow to wide. At 1024px the sidebar should snap to the right side and the main content column should get wider. If you still see a horizontal scrollbar on mobile, make sure you also removed `column-gap` from the base `body` rule.

### Step 2: Responsive Navigation with Hamburger Toggle

On mobile, the horizontal nav links take up too much space and should collapse behind a hamburger button. The `<button class="menu-toggle">` is already in the HTML — you just need to style it and wire up the toggle.

**Part A: CSS**

1. Find the existing `.menu-toggle` rule in the starter CSS. It currently has `display: none`, which hides the hamburger button. Replace that with the following properties to make the button visible and lay out the three lines vertically:
   - `display: flex` — makes it a flex container so the three lines stack inside it
   - `flex-direction: column`, `justify-content: center`, `align-items: center` — stacks and centers the lines
   - `gap: 5px` — adds spacing between the three lines
   - `background: var(--ut-navy)`, `border: none`, `padding: 0.75rem 1rem` — styles the button to match the nav bar
   - `cursor: pointer` — shows a hand cursor on hover, so users know it's clickable
   - `width: 100%` — stretches the button to fill the full width

2. Add a rule for `.menu-toggle span` — these are the three hamburger lines:
   - Set `display` to `block`, `width` to `24px`, `height` to `2px`
   - Set `background` to `var(--ut-white)` and `border-radius` to `2px`

3. Find the existing `nav` rule. On mobile, the nav links should be hidden behind the hamburger button — users will click the hamburger to reveal them. Make these changes to the `nav` rule:
   - Change `display: flex` to `display: none` — this hides the nav by default on mobile
   - Add `flex-direction: column` and `align-items: center` — when the nav does appear, the links will stack vertically instead of horizontally
   - Change `gap: 2rem` to `gap: 0.5rem` — less spacing between vertically stacked links

4. Add a new rule for `nav.nav-open` (below the existing `nav` rule):
   - Set `display` to `flex`

   This rule only activates when the nav has the class `nav-open`. When a user clicks the hamburger button, JavaScript adds this class to the nav, changing it from `display: none` to `display: flex` — making the links appear.

5. Inside your `@media (min-width: 1024px)` query, add two rules:
   - `.menu-toggle` gets `display: none` (hide hamburger on desktop)
   - `nav` gets `display: flex`, `flex-direction: row`, `justify-content: center`, and `gap: 2rem`

6. Update the full-width spanning rule. Find the rule that lists `header, nav, #welcome, footer` — it sets `grid-column: 1 / -1` to make those elements span all columns. Add `.menu-toggle` to that comma-separated list so the hamburger button also spans the full width.

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

> **Why `aria-expanded`?** Screen readers can't see that a menu is visually open or closed. The `aria-expanded` attribute tells assistive technology whether the nav is currently showing or hidden, so users who can't see the screen know whether clicking the button will open or close the menu.

**Try it out:** At 375px, you should see the three-line hamburger button. Click it — the nav links appear as a vertical column. Click again — they disappear. At 1024px+, the hamburger vanishes and the nav links show horizontally.

### Step 3: Fluid Typography with clamp()

Fixed font sizes create jarring jumps at breakpoints. The `clamp()` function makes typography scale smoothly across all viewport widths — no media queries needed.

1. Find the `h1` rule and add a `font-size` property using `clamp()`:
   - `font-size: clamp(1.5rem, 4vw + 1rem, 3rem)`

2. Add a new rule for `h2` with:
   - `font-size: clamp(1.25rem, 3vw + 0.5rem, 2rem)`

3. Add a new rule for `h3, h4` with:
   - `font-size: clamp(1rem, 2vw + 0.5rem, 1.5rem)`

4. In the `:root` rule near the top of the CSS (the one that defines `--ut-navy`, `--ut-red`, etc.), add a new custom property:
   - `--space-fluid: clamp(1rem, 3vw, 2rem)`

   Custom properties (the `--` variables you've been using all semester) let you define a value once and reuse it everywhere. This one creates a spacing value that scales smoothly from 1rem on small screens to 2rem on large screens. You'll use it for padding and grid gaps in the next steps.

5. Find the `.panel` rule and change the `padding` to use `clamp()`:
   - `padding: clamp(0.75rem, 3vw, 1.5rem)`

6. Update the padding you set in Step 1. In Step 1, you changed the `main, .sidebar` rule's padding to `1rem`. Now replace that `1rem` with `var(--space-fluid)` so the padding scales with the viewport. You can either update the existing `main, .sidebar` rule, or split it into separate `main` and `.sidebar` rules — both approaches work.

**Try it out:** Slowly resize your browser. The headings and spacing should scale smoothly — no sudden jumps at breakpoints.

### Step 4: Intrinsic Programs Grid

The programs grid already uses CSS Grid's `repeat()` with `auto-fit`, but the 180px minimum is too small for readable cards on mobile. You'll also switch from `auto-fit` to `auto-fill` and use your fluid spacing variable.

1. Find the `.programs-grid` rule and update it:
   - Change `grid-template-columns` to `repeat(auto-fill, minmax(min(200px, 100%), 1fr))`
   - Change `gap` to `var(--space-fluid)` — this uses the fluid spacing variable you created in Step 3
   - Add `container-type: inline-size` — this tells the browser to track how wide this element is, which you'll need in Step 6 when you write a container query

   The `min(200px, 100%)` trick prevents the 200px minimum from overflowing on screens narrower than 200px — it falls back to 100% of the container width.

2. Find the `.program-card` rule and **remove** the `aspect-ratio: 1` property. On mobile, square cards are too tall for their content. The cards will size naturally to fit their content instead.

> **Why auto-fill instead of auto-fit?** Both create as many columns as fit. The difference appears when there are fewer items than possible columns. `auto-fill` keeps empty column tracks, maintaining consistent card widths. `auto-fit` collapses empty tracks, stretching items wider. For a card grid, `auto-fill` produces more predictable results.

**Try it out:** Resize your browser slowly. The cards should automatically switch from 1 column (mobile) to 2 columns to 3 columns — all without a single media query. That's intrinsic responsive design.

### Step 5: Hero Section & Responsive Images

The hero section needs a proper height and the images and video need to be responsive.

**Part A: Responsive Media Resets**

1. Add a global responsive image reset. Add a new `img` rule right after the `*, *::before, *::after` box-sizing rule (and before the `html` rule). Set:
   - `max-width: 100%` and `height: auto`

   This single rule prevents every image on the page from overflowing its container. The `max-width: 100%` means an image can never be wider than its parent, and `height: auto` keeps the image's proportions correct.

2. Add a rule for `video` with the same approach:
   - `max-width: 100%` and `height: auto`

3. Find the existing `header img` rule and add:
   - `max-width: 120px`

   This prevents the logo from being too large on mobile screens.

**Part B: Hero Layout Refactoring**

4. Find the `#welcome` rule. It currently has `grid-template-columns: subgrid` — this inherits column tracks from the parent body grid, but on a single-column body it only inherits one track, which breaks the layout. **Delete** the entire `grid-template-columns: subgrid;` line from the rule. Then add two new properties to the same rule:
   - `min-height: 60vh` (fallback for older browsers)
   - `min-height: 60dvh` (overrides the fallback if supported)

5. Find the `.hero-overlay` rule. **Delete** the `display: grid;` line and the `grid-template-columns: subgrid;` line — these are only needed when the body has multiple columns. Keep the other properties (`grid-column`, `color`, `backdrop-filter`). The overlay will flow naturally in a single-column layout.

6. Find the `.hero-content` rule. **Delete** the `grid-column: 2 / 4;` line — this refers to columns that don't exist on mobile. Then update the padding to use `clamp()` so it scales with the viewport:
   - `padding: clamp(1rem, 5vw, 2rem) clamp(1rem, 8vw, 1.5rem)`

**Part C: Image Formatting & Desktop Restore**

7. Find the `#colleges figure img` rule and add:
   - `aspect-ratio: 16 / 9`
   - `object-fit: cover`

   The `aspect-ratio` gives the image a consistent shape regardless of the original file dimensions. The `object-fit: cover` fills that shape edge-to-edge, cropping if needed rather than stretching.

8. Inside your `@media (min-width: 1024px)` query, add three rules to restore the hero's subgrid layout for desktop. These re-apply the properties you removed in steps 4–6, but only on wide screens where the body has four columns:
   - `#welcome` gets `display: grid`, `grid-template-columns: subgrid`, `align-items: end`
   - `.hero-overlay` gets `grid-column: 1 / -1`, `display: grid`, `grid-template-columns: subgrid`
   - `.hero-content` gets `grid-column: 2 / 4`

> **Why remove subgrid on mobile and restore it on desktop?** Subgrid inherits column tracks from the parent grid. On mobile, the body has just one column (`1fr`), so subgrid only gives you one track — which breaks the hero layout. On desktop, the body has four columns, and subgrid lets the hero content align perfectly with the main content and sidebar columns.

**Try it out:** The hero should fill a good portion of the viewport height on mobile. The campus image should have a consistent 16:9 shape. The video should shrink to fit narrow screens. If the hero looks broken on desktop, make sure you added the subgrid rules *inside* the media query, not outside it.

### Step 6: Container Queries on Program Cards

Media queries respond to the viewport — but your program cards live inside a grid that might be narrow even on a wide screen (because the sidebar takes space). Container queries let the cards respond to how much space the grid actually gives them.

In Step 4, you added `container-type: inline-size` to `.programs-grid` — that told the browser to track the grid's width. Now you'll write a `@container` query that checks that width and applies styles only when the grid is wide enough.

1. Find the base `.featured` rule (the one **outside** any `@media` or `@container` block) and **delete** the `grid-column: span 2;` line. On a single-column mobile grid, `span 2` tries to make the card span two columns that don't exist, causing it to overflow. You'll re-add this inside a container query so it only applies when there's room.

2. Add a `@container` query:

   ```
   @container (min-width: 450px) { ... }
   ```

   Inside it, add one rule:
   - `.featured` gets `grid-column: span 2` (the featured card spans two columns only when the grid is wide enough)

> **Why not just use a media query here?** If the programs grid were in a narrow sidebar instead of the main column, a media query based on viewport width would still trigger `span 2` — even though there's no room for two columns. The container query checks the *grid's* actual width, so the featured card only spans when there's actually space.

**Try it out:** Resize your browser. When the programs grid is narrow (mobile), the featured card is the same width as the others. When the grid is wider (desktop), the featured card spans two columns. The card responds to the *grid's* width, not the browser's width.

### Step 7: Responsive Table & Final Polish

The tuition table overflows on narrow screens because table cells can't wrap. You'll fix this with a scrollable wrapper, then verify everything works across devices.

1. Open `starter.html`. Find the `<table>` element inside the `#tuition` section. You need to wrap it in a new `<div>` — this means adding an opening `<div class="table-wrapper">` tag right before `<table>` and a closing `</div>` tag right after `</table>`. The result should look like:

   ```html
   <div class="table-wrapper">
       <table>
           ... existing table content stays exactly the same ...
       </table>
   </div>
   ```

2. In the CSS, add a rule for `.table-wrapper`:
   - `overflow-x: auto`

   This allows the table to scroll horizontally when it overflows. The rest of the page stays fixed — only the table moves.

> **Why not just make the table smaller?** Tables have a natural minimum width — each cell needs enough room for its content. Shrinking the table below that minimum makes text unreadable. `overflow-x: auto` keeps the table at its natural size and adds a scrollbar only when needed. This is the standard approach for responsive tables across the web.

3. Open Chrome DevTools (F12) and test at these sizes. Use the device toolbar (Cmd+Shift+M / Ctrl+Shift+M) to resize the viewport:
   - **iPhone SE (375px):** Single column, hamburger nav, cards stacked, table scrollable horizontally
   - **iPad (768px):** Single column with wider spacing, cards in a multi-column grid
   - **Desktop (1024px+):** Two-column layout with sidebar, horizontal nav, generous spacing
   - **Verify the hamburger:** Click the hamburger button at 375px — the nav links should appear as a vertical column. Click again — they should disappear. At 1024px+, the hamburger should be gone and the nav links should show horizontally.
   - **Verify reduced motion:** If you added `@media (prefers-reduced-motion: reduce)` in the previous lab, confirm it still works. On macOS: System Settings > Accessibility > Display > Reduce motion. All animations should stop.

**Try it out:** At 375px, the table should scroll left-right inside its container without causing the entire page to scroll horizontally.

---

## Summary

| Step | What you built | Key CSS |
|------|---------------|---------|
| 1 | Mobile-first body grid | `grid-template-columns: 1fr`, `@media (min-width: 1024px)` |
| 2 | Hamburger navigation | `.menu-toggle`, `nav.nav-open`, `aria-expanded` |
| 3 | Fluid typography | `clamp()`, `--space-fluid` custom property |
| 4 | Intrinsic card grid | `repeat(auto-fill, minmax(min(200px, 100%), 1fr))` |
| 5 | Responsive hero & images | `60dvh`, `max-width: 100%`, `object-fit: cover` |
| 6 | Container queries | `container-type: inline-size`, `@container (min-width: ...)` |
| 7 | Scrollable table | `.table-wrapper { overflow-x: auto }` |
