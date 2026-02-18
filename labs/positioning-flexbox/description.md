# Positioning & Flexbox

In this lab, you'll modernize your Utah Tech University page by replacing outdated layout techniques with modern CSS. You'll convert the navigation from text-separated links to a Flexbox layout, make the nav bar stick to the top of the page as users scroll, replace the float-based image layout with Flexbox, and use absolute positioning to turn the figcaption into a sleek overlay on the campus photo.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** This lab builds on your completed page from the Spacing, Alignment & Float lab. Your starter page already has floated images, a centered container, and styled panels. You'll be modifying both the HTML and CSS files throughout this lab.

## Instructions:

### Part 1: Flexbox Navigation

Right now, the navigation links are separated by pipe characters (`|`) and centered with `text-align: center`. This works, but Flexbox gives you much more control over spacing, alignment, and responsiveness — all without manual separator characters.

Flexbox is a one-dimensional layout system. You apply `display: flex` to a **container** element, and its direct children become **flex items** that you can arrange horizontally or vertically. Three key properties control the layout:

- `justify-content` — controls how items are distributed along the main axis (left-to-right by default). Common values: `flex-start`, `center`, `flex-end`, `space-between`, `space-around`.
- `align-items` — controls how items are aligned along the cross axis (top-to-bottom by default).
- `gap` — adds consistent spacing between flex items without needing margins.

1. In your **HTML file**, find the `<nav>` element. Remove all the pipe `|` characters that separate the links. Keep all five `<a>` elements — just delete the ` | ` text between them. Each link can go on its own line for readability.

   **Before:** `<a href="#welcome">Home</a> | <a href="#apply">Admissions</a> | ...`
   **After:** Each `<a>` tag with no separator text between them.

2. In your **CSS file**, find the `nav` rule. Make three changes:

   - **Add** `display: flex` — this turns the nav into a flex container, laying out the links in a row.
   - **Add** `justify-content: center` — this centers the group of links horizontally within the nav bar.
   - **Add** `gap: 2rem` — this creates even spacing between each link. Flexbox's `gap` property replaces the old pipe characters with clean, consistent spacing.
   - **Remove** `text-align: center` — Flexbox uses `justify-content` for alignment, so `text-align` is no longer needed. Delete this line from the nav rule.

### Part 2: Sticky Navigation

When users scroll down a long page, the navigation disappears off the top of the screen. CSS `position: sticky` solves this — it keeps the nav pinned to the top of the viewport once the user scrolls past it. It's like a combination of `relative` (normal flow) and `fixed` (locked in place).

For sticky positioning to work, you need two things: `position: sticky` and a `top` value that tells the browser where to "stick" the element. You also need `z-index` to ensure the sticky nav appears above other content as the page scrolls beneath it.

3. In your **CSS file**, in the same `nav` rule, add two properties:

   - `position` set to `sticky` — this tells the browser to keep the nav in its normal position until the user scrolls past it, then lock it to the viewport.
   - `top` set to `0` — this tells the browser to stick the nav at the very top of the viewport (0 pixels from the top edge).

4. Still in the `nav` rule, add one more property:

   - `z-index` set to `10` — this creates a stacking layer. Elements with a higher `z-index` appear in front of elements with a lower one. Without this, page content could scroll on top of the nav bar. The value `10` gives plenty of room for other stacking needs.

### Part 3: From Float to Flexbox

In the previous lab, you used `float: right` to position the campus photo beside the college list. Float works for text wrapping, but it has limitations: you need `clear` to prevent layout problems, and it's hard to control the exact sizing and alignment of floated elements.

Flexbox is the modern solution for side-by-side layouts. Instead of floating one element, you make a flex container and let Flexbox handle the arrangement. This is cleaner, more predictable, and doesn't require `clear` hacks.

5. In your **HTML file**, find the `#colleges` section. Inside it, find the `<figure>` element and the `<ul>` element. Wrap **both** of these elements together in a new `<div>` with `class="colleges-content"`. The `<h3>Our Colleges</h3>` should stay OUTSIDE this wrapper — it remains a direct child of the section.

   Your HTML structure should look like this:
   ```
   <section class="panel" id="colleges">
       <h3>Our Colleges</h3>
       <div class="colleges-content">
           ...ul and figure go here...
       </div>
   </section>
   ```

6. Inside the new `<div class="colleges-content">`, move the `<figure>` element so it comes AFTER the `</ul>`. In the previous lab, the figure had to come first because float requires that. With Flexbox, the source order doesn't matter for visual layout, but putting the college list first makes more sense for screen readers and keyboard navigation — users want to read the list of colleges before seeing the decorative photo.

   Your HTML order inside `.colleges-content` should be: `<ul>` first, then `<figure>` second.

7. In your **CSS file**, add a new `.colleges-content` rule with three properties:

   - `display` set to `flex` — this creates a flex container, placing the list and figure side by side.
   - `gap` set to `1.5rem` — this adds spacing between the list and the photo.
   - `align-items` set to `flex-start` — this aligns both items to the top of the container. Without this, flex items stretch to fill the full height by default, which would distort the image.

8. In your **CSS file**, find the `#colleges figure` rule. Make four changes:

   - **Remove** `float: right` — Flexbox handles the positioning now.
   - **Remove** `width: 50%` — Flexbox will control the sizing through the `flex` property.
   - **Change** `margin` to `0` — the float needed margins for spacing, but Flexbox's `gap` handles that now.
   - **Add** `flex: 1` — this tells the figure to grow and fill available space equally with other flex items. The `flex: 1` shorthand sets `flex-grow: 1`, meaning the element will expand to take up its fair share of the container.

9. In your **CSS file**, find the `#apply` rule that has `clear: both`. **Delete the entire rule.** The `clear` property was only needed because of the float. Since you've replaced float with Flexbox, there's nothing to clear anymore.

### Part 4: Positioned Figcaption Overlay

Right now, the figcaption text sits below the campus photo as regular text. You'll transform it into a translucent overlay that sits on top of the bottom edge of the image — a common design pattern you see on news sites and photo galleries.

This uses two CSS positioning concepts working together:

- **`position: relative`** on the parent creates a positioning context — it tells any absolutely-positioned children to position themselves relative to THIS element, not the entire page.
- **`position: absolute`** on the child removes it from normal flow and positions it relative to the nearest positioned ancestor. Combined with `bottom: 0`, `left: 0`, and `right: 0`, this pins the element to the bottom edge of the parent, spanning its full width.

10. In your **CSS file**, in the `#colleges figure` rule, add one property:

    - `position` set to `relative` — this establishes the figure as the positioning context for the figcaption. Without this, the absolutely-positioned figcaption would position itself relative to the page instead of the figure.

11. In your **CSS file**, find the `#colleges figcaption` rule. Replace the existing properties (`color` and `margin-top`) with the following properties:

    - `position` set to `absolute` — this removes the figcaption from normal document flow and allows you to place it precisely within the figure.
    - `bottom` set to `0` — this pins the figcaption to the bottom edge of the figure.
    - `left` set to `0` — this stretches the figcaption to the left edge.
    - `right` set to `0` — this stretches the figcaption to the right edge. Combined with `left: 0`, the figcaption spans the full width of the figure.
    - `background-color` set to `rgba(0, 0, 0, 0.6)` — this creates a semi-transparent black background. The `rgba()` function takes red, green, blue (all 0 for black) and an alpha value (0.6 = 60% opaque), letting the photo show through behind the text.
    - `color` set to `var(--ut-white)` — white text on the dark overlay for readability.
    - `padding` set to `0.5rem` — a small amount of breathing room around the text.

## Summary

In this lab, you learned:

- **Flexbox Basics** — Using `display: flex`, `justify-content`, `align-items`, and `gap` to create flexible, evenly-spaced layouts
- **Sticky Positioning** — Using `position: sticky` with `top: 0` to keep the nav visible while scrolling
- **z-index** — Controlling stacking order so the sticky nav appears above scrolling content
- **Replacing Float with Flexbox** — Converting a float-based layout to Flexbox for cleaner, more predictable results
- **Relative + Absolute Positioning** — Using `position: relative` on a parent and `position: absolute` on a child to create positioned overlays
- **rgba Colors** — Using `rgba()` for semi-transparent backgrounds that let underlying content show through
