# CSS Grid

In this lab you'll learn CSS Grid — the most powerful layout system in CSS. You'll transform a stacked page into a sophisticated two-column layout with a sidebar, a full-width hero with a centered content overlay, and a responsive card grid — all using CSS Grid.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** This lab builds on your completed Positioning & Flexbox lab. The starter page already has Flexbox navigation, a sticky nav bar, and the figcaption overlay. You'll work primarily in the CSS file, with one HTML change in Part 5.

## Instructions

### Part 1: Body as Grid Container

CSS Grid starts with a **grid container** — an element you turn into a grid by setting `display: grid`. Every direct child becomes a **grid item** that can be placed anywhere on the grid.

In this layout, `body` is the grid container. This lets you control the placement of every major section — header, nav, hero, main, aside, footer — from one place.

The four-column pattern creates a responsive centered layout:
- Columns 1 and 4 are `1fr` gutters — they share the leftover space, creating automatic side margins
- Column 2 is `minmax(0, 640px)` — the main content area, up to 640px wide
- Column 3 is `280px` — fixed-width for the sidebar

1. In your **CSS file**, find the `body` rule. Add three properties:

   - `display` set to `grid` — this makes `body` a grid container
   - `grid-template-columns` set to `1fr minmax(0, 640px) 280px 1fr` — this defines the four-column layout
   - `column-gap` set to `1.5rem` — this adds horizontal space between the columns

### Part 2: Full-Width Elements

With the four-column body grid active, direct children of `body` auto-place into columns. But the header, nav, hero section, and footer need to span **all four columns** — the full width of the page.

The syntax `1 / -1` means "start at line 1, end at the last line." In a 4-column grid, `-1` always refers to the last column line, no matter how many columns there are. It's a shortcut that works even if you later change the number of columns.

2. In your **CSS file**, add a new rule with the selector `header, nav, #welcome, footer`. Give it one property:

   - `grid-column` set to `1 / -1` — this makes all four elements span the full page width

### Part 3: Placing Main and Sidebar

Now you'll place `main` and `.sidebar` in their specific columns. Since `header`, `nav`, and `#welcome` each take up one full row, `main` and `.sidebar` are the first items in row 4. Using `grid-row: 4` makes that placement explicit rather than relying on auto-placement.

3. In your **CSS file**, find the `main` rule. Add two properties:

   - `grid-column` set to `2` — this places main in the second column (the 640px content area)
   - `grid-row` set to `4` — this explicitly anchors main to row 4 of the body grid

4. In your **CSS file**, find the `.sidebar` rule. Add three properties:

   - `grid-column` set to `3` — this places the sidebar in the third column
   - `grid-row` set to `4` — this places the sidebar in the same row as main, so they sit side by side
   - `align-self` set to `start` — by default, grid items stretch to fill the full row height; `start` prevents the sidebar from stretching down to match main's height

### Part 4: Hero Section with Subgrid

The hero section needs two things at once: the **blue overlay** should cover the full width, while the **text content** should align to the same columns as the main content area.

CSS `subgrid` solves this. When a grid item sets `grid-template-columns: subgrid`, it inherits the column tracks from its ancestor grid — no need to redefine them. This creates a three-level cascade:

1. `body` defines the 4 columns
2. `#welcome` inherits them with subgrid
3. `.hero-overlay` spans full width and also inherits them with subgrid
4. `.hero-content` is placed in columns 2–4 using those inherited tracks

5. In your **CSS file**, find the `#welcome` rule. Add two properties:

   - `display` set to `grid` — makes `#welcome` a grid container so it can pass columns to children
   - `grid-template-columns` set to `subgrid` — inherits the 4 column tracks from `body`

6. In your **CSS file**, find the `.hero-overlay` rule. Add three properties:

   - `grid-column` set to `1 / -1` — spans the overlay across all 4 columns (full width of the hero)
   - `display` set to `grid` — makes the overlay a grid container
   - `grid-template-columns` set to `subgrid` — inherits the 4 columns so `.hero-content` can be placed precisely

7. In your **CSS file**, find the `.hero-content` rule. Add one property:

   - `grid-column` set to `2 / 4` — places the hero text in columns 2 and 3, centering it within the full-width blue overlay

### Part 5: Programs Grid

Inside `#colleges`, you'll create a **responsive card grid** using `repeat(auto-fit, minmax(180px, 1fr))`. This is one of the most useful Grid patterns — the browser automatically creates as many columns as fit, each at least 180px wide. No media queries needed.

First you need a wrapper element to become the grid container.

8. In your **HTML file**, find the `#colleges` section. After the `<h3>Our Colleges</h3>` heading, wrap the `<figure>` and all six `<div class="program-card">` elements inside a new `<div>` with `class="programs-grid"`. The `<h3>` stays outside the wrapper.

   Your structure should look like this:
   ```
   <section class="panel" id="colleges">
       <h3>Our Colleges</h3>
       <div class="programs-grid">
           <figure>...</figure>
           <div class="program-card featured">...</div>
           <div class="program-card">...</div>
           <!-- ...four more cards... -->
       </div>
   </section>
   ```

9. In your **CSS file**, add a new `.programs-grid` rule with three properties:

   - `display` set to `grid`
   - `grid-template-columns` set to `repeat(auto-fit, minmax(180px, 1fr))` — creates as many columns as fit, each at least 180px wide
   - `gap` set to `1rem` — adds spacing between all grid items

### Part 6: Spanning Across the Grid

Two items in `.programs-grid` need to span multiple columns.

The campus photo should always span the **full width** of the programs grid — it acts as a photo banner above the cards. The `1 / -1` trick works here too, inside the nested grid.

The featured college card should be **twice as wide** as the others. Using `span 2` tells the browser to stretch the item across 2 column tracks without needing to know the exact column numbers.

10. In your **CSS file**, find the `#colleges figure` rule. Add one property:

    - `grid-column` set to `1 / -1` — makes the campus photo span the full width of the programs grid

11. In your **CSS file**, add a new `.featured` rule with one property:

    - `grid-column` set to `span 2` — makes the Science, Engineering & Technology card occupy two columns

## Summary

In this lab, you learned:

- **Body Grid Layout** — Using `display: grid` on `body` with `grid-template-columns` to define a 4-column page layout
- **`fr` units and `minmax()`** — Creating flexible gutters with `1fr` and a bounded content column with `minmax(0, 640px)`
- **Negative line numbers** — Using `grid-column: 1 / -1` to span all columns regardless of how many there are
- **`grid-column` and `grid-row`** — Explicitly placing elements in specific columns and rows
- **`align-self: start`** — Preventing a grid item from stretching to fill its row
- **CSS `subgrid`** — Inheriting parent grid columns so nested elements align to the same tracks
- **`repeat(auto-fit, minmax())`** — Responsive grids that create the right number of columns automatically
- **`grid-column: span 2`** — Making an item span multiple columns without knowing the exact line numbers
