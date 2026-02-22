# CSS Grid

In this lab you'll learn CSS Grid — the most powerful layout system in CSS. You'll transform a stacked page into a sophisticated two-column layout with a sidebar, a full-width hero with a centered content overlay, and a responsive card grid — all using CSS Grid.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Note:** The starter page for this lab already has the Flexbox navigation, sticky nav, and figcaption overlay from the previous lab built in. You'll work primarily in the CSS file, with one HTML change in Part 5.

## Instructions

### Part 1: Body as Grid Container

CSS Grid starts with a **grid container** — an element you turn into a grid by setting `display: grid`. Every **direct child** of that element automatically becomes a **grid item** and gets placed on the grid.

In this layout, `body` is the grid container. Every major section of the page — header, nav, hero, main, aside, footer — is a direct child of `body`, so all of them become grid items you can control from one place.

You'll define four columns. Think of them like invisible vertical lanes running top to bottom across the page:

```
| 1fr gutter | main content (up to 640px) | sidebar (280px) | 1fr gutter |
|  column 1  |          column 2          |    column 3     |  column 4  |
```

- **Columns 1 and 4** are `1fr` gutters — they each take an equal share of whatever space is left over, creating automatic side margins that grow and shrink with the viewport
- **Column 2** uses `minmax(0, 640px)` — it grows to fill space, but never wider than 640px
- **Column 3** is a fixed `280px` sidebar

1. In your **CSS file**, find the `body` rule. Add three properties:

   - `display` set to `grid` — this activates the grid, making every direct child of body a grid item
   - `grid-template-columns` set to `1fr minmax(0, 640px) 280px 1fr` — this defines the four columns described above
   - `column-gap` set to `1.5rem` — this adds horizontal space *between* the columns only

   > **Why `column-gap` and not `gap`?** `gap` sets spacing in both directions — between rows *and* columns. Using `gap` here would add vertical space between your header, nav, hero, main, and footer too, which you don't want. `column-gap` only affects the space between columns.

### Part 2: Full-Width Elements

Now that `body` is a grid, every direct child gets auto-placed. By default, auto-placement fills one column at a time, left to right, top to bottom — so your header would land in column 1 and take up only that first narrow gutter column, not the full width.

The header, nav, hero section, and footer all need to span the **entire width** of the page across all four columns.

To span multiple columns, you use `grid-column` with two line numbers separated by a slash: `grid-column: start / end`. CSS Grid draws a line *between* every column — a 4-column grid has 5 lines, numbered 1 through 5 from left to right. You can also count backward: line `-1` is always the very last line, no matter how many columns there are.

So `grid-column: 1 / -1` means "start at the first line, end at the last line" — always the full width, even if you later change the number of columns.

2. In your **CSS file**, add a **new** CSS rule — separate from any existing rules — using the selector `header, nav, #welcome, footer`. Give it one property:

   - `grid-column` set to `1 / -1` — this makes all four elements span the full width of the page

   After this step, the page should look mostly similar to before (these elements were already full-width by nature), but now their width is controlled by the grid. In the next step you'll see the grid's real power.

### Part 3: Placing Main and Sidebar

With the full-width elements handled, you now have two elements that need to sit **side by side**: `main` in the content column and `.sidebar` in the sidebar column.

When `main` is placed in column 2 and `.sidebar` is placed in column 3, they'll sit beside each other naturally — but only if they're in the **same row**. Without explicit row placement, auto-placement might put `.sidebar` after `main` in a new row rather than next to it.

Count the rows your full-width elements occupy: header is row 1, nav is row 2, the hero section is row 3. That makes row 4 the right place for main and sidebar. Adding `grid-row: 4` to both guarantees they share the same row regardless of how auto-placement might otherwise work.

3. In your **CSS file**, find the `main` rule. Add two properties:

   - `grid-column` set to `2` — places main in the second column (the wide content area)
   - `grid-row` set to `4` — places main in row 4, below the hero section

4. In your **CSS file**, find the `.sidebar` rule. Add three properties:

   - `grid-column` set to `3` — places the sidebar in the third column, beside main
   - `grid-row` set to `4` — puts the sidebar in the same row as main so they appear side by side
   - `align-self` set to `start` — by default, a grid item stretches to fill the full height of its row; if main is tall, the sidebar would stretch to match it. `start` pins the sidebar to the top and lets it be only as tall as its content.

### Part 4: Hero Section with Subgrid

The hero section needs to do two things simultaneously:
- The **blue overlay** should cover the full width (all four body columns)
- The **hero text** inside the overlay should line up with the same content columns as `main` — not stretch edge to edge

To achieve both, you need **CSS `subgrid`**. When a grid item sets `grid-template-columns: subgrid`, it doesn't define new column sizes — it *inherits* the column tracks from its parent grid. This means nested elements can align to the same columns as everything else on the page.

The inheritance works in a chain:

- `body` → owns the 4 columns
- `#welcome` → becomes a grid itself and inherits those 4 columns via `subgrid`
- `.hero-overlay` → spans all 4 columns AND becomes a grid with `subgrid`, passing the columns through
- `.hero-content` → gets placed in specific columns using those inherited tracks

5. In your **CSS file**, find the `#welcome` rule. Add two properties:

   - `display` set to `grid` — makes `#welcome` a grid container so it can have its own grid items
   - `grid-template-columns` set to `subgrid` — instead of defining new column sizes, this inherits the 4 column tracks from the `body` grid directly above it

6. In your **CSS file**, find the `.hero-overlay` rule. Add three properties:

   - `grid-column` set to `1 / -1` — this is a *placement* instruction: it tells the overlay where to go within `#welcome`'s grid (all the way across, edge to edge)
   - `display` set to `grid` — this is separate from placement: it turns the overlay into its *own* grid container so `.hero-content` inside it can be placed on a grid
   - `grid-template-columns` set to `subgrid` — this inherits the 4 column tracks from `body` (through `#welcome`), so `.hero-content` can reference the same column lines as the rest of the page

   > **Why does `.hero-overlay` need both `grid-column` and `display: grid`?** These two properties do completely different things. `grid-column: 1 / -1` controls *where the overlay is placed* within its parent grid. `display: grid` + `grid-template-columns: subgrid` controls *what happens inside the overlay* — it makes the overlay itself a grid container so you can place `.hero-content` in specific columns.

7. In your **CSS file**, find the `.hero-content` rule. Add one property:

   - `grid-column` set to `2 / 4` — places the hero text starting at column line 2 and ending at column line 4

   > **Line numbers vs. column numbers:** `grid-column: 2 / 4` uses *line* numbers, not column numbers. Column lines are the boundaries between columns — line 1 is the far left edge, line 2 is between column 1 and column 2, line 3 is between column 2 and column 3, and line 4 is between column 3 and column 4. So `2 / 4` means "from the left edge of column 2 to the right edge of column 3" — spanning two columns.

### Part 5: Programs Grid

Inside `#colleges`, you'll create a **responsive card grid** using `repeat(auto-fit, minmax(180px, 1fr))`. This is one of the most practical Grid patterns: the browser figures out how many columns fit given the available width, and each column is at least 180px wide. Resize the window and the number of columns adjusts automatically — no media queries needed.

Before you can style the grid, you need a wrapper element to act as the grid container.

8. In your **HTML file**, find the `#colleges` section. The `<figure>` (campus photo) and the six `<div class="program-card">` elements need to be wrapped together in a new `<div>`. Add this `<div>` **after** the `<h3>Our Colleges</h3>` heading and place the `<figure>` and all six program cards inside it. The `<h3>` should remain outside the wrapper as a direct child of the section.

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
   - `grid-template-columns` set to `repeat(auto-fit, minmax(180px, 1fr))` — this tells the browser to create as many columns as fit, where each column is at least 180px wide and can grow to fill available space (`1fr` here means the same thing as in Step 1: one equal share of remaining space)
   - `gap` set to `1rem` — adds consistent spacing between all grid items (both rows and columns, since everything here should be evenly spaced)

   > **Why `gap` here but `column-gap` on body?** On `body`, you only wanted horizontal space between columns — not vertical space between your page sections. Here in `.programs-grid`, you want even spacing in all directions between the cards, so `gap` (which sets both) is the right choice.

### Part 6: Spanning Across the Grid

Two items inside `.programs-grid` need special treatment: the campus photo should always span the full width, and the featured college card should be twice as wide as the others.

Both use `grid-column`, but with different approaches for different reasons.

10. In your **CSS file**, find the `#colleges figure` rule. Add one property:

    - `grid-column` set to `1 / -1` — this makes the campus photo span the full width of the programs grid

    > **Which grid does this `1 / -1` refer to?** It refers to `.programs-grid` — the direct parent grid of the figure. Every `grid-column` value is always relative to the element's immediate grid container, not the page grid. The `1 / -1` here spans all columns of the card grid, not all columns of the body. The result is a full-width photo banner across the top of the cards.

11. In your **CSS file**, add a new `.featured` rule with one property:

    - `grid-column` set to `span 2` — makes the Science, Engineering & Technology card occupy two column tracks instead of one

    > **Why `span 2` instead of `1 / -1`?** Both make an element wider, but they work differently. `1 / -1` always spans *everything* — from the very first line to the very last. `span 2` means "be exactly twice as wide as one column, wherever I'm placed." When auto-fit reduces the grid to fewer columns at a narrow viewport, `span 2` keeps the card proportionally wider, while `1 / -1` would still span the entire width. `span 2` is the right tool when you want a card to be *relatively* larger than its neighbors.

## Summary

In this lab, you learned:

- **Body Grid Layout** — Using `display: grid` on `body` with `grid-template-columns` to define a 4-column page layout
- **`fr` units and `minmax()`** — Creating flexible gutters with `1fr` and a bounded content column with `minmax(0, 640px)`
- **`column-gap` vs `gap`** — Choosing between column-only spacing and all-direction spacing depending on the context
- **Negative line numbers** — Using `grid-column: 1 / -1` to span all columns regardless of how many there are
- **`grid-column` and `grid-row`** — Explicitly placing elements in specific columns and rows
- **`align-self: start`** — Preventing a grid item from stretching to fill its row
- **CSS `subgrid`** — Inheriting parent grid columns so nested elements align to the same tracks
- **Line numbers vs. column numbers** — Understanding that `2 / 4` spans columns 2 and 3 because the numbers refer to the lines *between* columns
- **`repeat(auto-fit, minmax())`** — Responsive grids that create the right number of columns automatically
- **`grid-column: span 2`** — Making an item span multiple columns without knowing the exact line numbers, adapting gracefully as the grid changes
