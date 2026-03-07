# CSS Transitions and Transforms

In this lab you'll add interactive motion to the Utah Tech University website using CSS transitions and transforms. You'll make navigation links fade smoothly on hover, lift program cards off the page, zoom the campus photo, spin the footer seal, and build a 3D flip card — all with pure CSS, no JavaScript.

**<a href="https://se1400.github.io/labs/labs/css-transitions-transforms/example.jpg" target="_blank">View completed example</a>** — This is what your page should look like when you're done. Since transitions and transforms are interactive effects, hover over the elements on your own page to see them in action.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Note:** The starter file includes the complete Utah Tech page from the previous lab — all the HTML structure, forms, and CSS styling are already in place. You'll only be adding CSS rules (and a small HTML modification for the flip card).

**Where to add your CSS:** Some steps ask you to add properties to an **existing** rule (like `.program-card`). You can either scroll up and add the property directly inside that rule, or create a new rule with the same selector below the section marker at the bottom of `starter.css`. Both approaches work — CSS merges properties from multiple rules with the same selector. New rules go below the `/* CSS Transitions and Transforms — add your CSS below */` comment.

## Key Concepts

Before you begin, here's a quick reference for the CSS properties you'll use:

| Property | What it does |
|---|---|
| `transition` | Shorthand that animates a property change over time. Format: `property duration timing-function` |
| `transform` | Applies visual changes like moving, rotating, or scaling an element without affecting layout |
| `translateY()` | Moves an element up (negative) or down (positive) along the Y axis |
| `scale()` | Makes an element larger (>1) or smaller (<1) |
| `rotate()` | Rotates an element by a given angle (e.g., `360deg`) |
| `rotateY()` | Rotates an element around the vertical Y axis (used for 3D flips) |
| `perspective` | Sets the distance between the viewer and the 3D plane — smaller values = more dramatic 3D effect |
| `transform-style: preserve-3d` | Tells child elements to exist in 3D space instead of being flattened |
| `backface-visibility: hidden` | Hides the back of an element when it's rotated away from the viewer |
| `overflow: hidden` | Clips child content that extends beyond the parent's boundaries |
| `@media (prefers-reduced-motion: reduce)` | Targets users who have requested less motion in their OS settings |

### Timing Functions

Timing functions control the acceleration curve of a transition:

- **`ease`** — Starts slow, speeds up, then slows down (default)
- **`ease-out`** — Starts fast, slows to a stop (good for things entering view)
- **`ease-in-out`** — Slow start and slow end (good for continuous motion)
- **`linear`** — Constant speed throughout

## Instructions

### Step 1: Nav Link Transition

The simplest transition: make the nav link color change happen smoothly instead of instantly.

Add a `nav a` rule with:

```css
nav a {
    transition: color 0.2s ease-out;
}
```

This tells the browser: "Whenever the `color` property changes on a nav link, animate that change over `0.2s` using the `ease-out` timing function."

> **Why `ease-out`?** When a user hovers, the color change should feel responsive — it starts fast and decelerates to a stop, which feels natural for UI interactions.

**Test it:** Hover over the nav links. The color should fade smoothly from white to gray instead of snapping instantly.

### Step 2: Program Card Lift

When users hover over a program card, it should lift up and cast a deeper shadow — giving a tactile, interactive feel.

First, add a `transition` property to the existing `.program-card` rule:

```css
transition: transform 0.2s ease, box-shadow 0.2s ease;
```

This transitions two properties at once, separated by a comma. Both animate over `0.2s` with `ease` timing.

Then add a new `.program-card:hover` rule:

```css
.program-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
```

- `translateY(-6px)` moves the card **up** 6 pixels (negative = up on screen)
- The `box-shadow` grows larger and more diffuse, simulating the card being farther from the surface

> **Why does `transform` not affect layout?** Unlike `margin-top` or `position`, `transform` moves the element visually without pushing other elements around. The card lifts, but nothing else on the page shifts.

**Test it:** Hover over any program card. It should smoothly lift up and its shadow should grow.

### Step 3: Campus Photo Zoom

When the user hovers over the campus photo, it should zoom in slightly. The key trick: the `<figure>` clips the overflow so the zoomed image doesn't spill outside its frame.

First, add `overflow: hidden` to the existing `#colleges figure` rule:

```css
overflow: hidden;
```

`overflow: hidden` clips anything that extends beyond the figure's boundaries — so when the image scales up, the extra size is trimmed at the figure's edges.

Next, add a `transition` to the existing `#colleges figure img` rule:

```css
transition: transform 0.4s ease;
```

Then update the `#colleges figure img` rule to include `display: block` (this removes the small gap below inline images):

```css
display: block;
```

Finally, add a new hover rule:

```css
#colleges figure:hover img {
    transform: scale(1.05);
}
```

`scale(1.05)` enlarges the image to 105% of its original size. Because the parent has `overflow: hidden`, the extra size is clipped — creating a smooth zoom-in-frame effect.

> **Why hover on `figure` but transform the `img`?** If we put `:hover` on the `img`, the zoom could cause the image edges to move away from the cursor, making the hover flicker. Hovering on the stable parent `figure` avoids this.

**Test it:** Hover over the campus photo. It should smoothly zoom in without overflowing its container.

### Step 4: Submit Button Lift

The submit button should lift up on hover, just like the program cards, giving it a "pressable" feel.

Add a `transition` to the existing `button[type="submit"]` rule:

```css
transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
```

This transitions three properties: the background color change (which already exists in the `:hover` rule), plus the new transform and shadow.

Then add `transform` and `box-shadow` to the existing `button[type="submit"]:hover` rule:

```css
transform: translateY(-3px);
box-shadow: 0 4px 12px rgba(186, 28, 33, 0.4);
```

The shadow uses the Utah Tech red color (`186, 28, 33`) at 40% opacity — a colored shadow that matches the button.

**Test it:** Hover over the Submit Application button. It should lift up with a red-tinted shadow underneath.

### Step 5: Footer Seal Spin

Add a fun interaction: the Utah Tech seal in the footer spins a full 360 degrees on hover. This also pairs with the existing `filter` transition (grayscale to color).

Add a `transition` to the existing `footer img` rule:

```css
transition: transform 0.6s ease-in-out, filter 0.3s ease;
```

This transitions both the transform (for the spin) and the filter (for the grayscale-to-color effect that's already styled).

Then add a `transform` to the existing `footer img:hover` rule:

```css
transform: rotate(360deg);
```

`rotate(360deg)` spins the element one full revolution. Combined with the `0.6s ease-in-out` timing, it starts slow, speeds up through the middle, and slows to a stop.

> **Why `ease-in-out` for rotation?** A spinning object that accelerates and decelerates feels physical — like a coin spinning on a table. `linear` would feel mechanical; `ease-in-out` feels natural.

**Test it:** Hover over the university seal in the footer. It should spin a full circle and transition from grayscale to color.

### Step 6: 3D Flip Card (HTML + CSS)

This is the most complex step. You'll convert the featured program card into a 3D flip card that reveals program details on the back when hovered.

#### HTML Changes

In your **HTML file**, find the featured program card:

```html
<div class="program-card featured">
    <h4>Science, Engineering &amp; Technology</h4>
    <p>Computer Science, Software Engineering, Biology, Cybersecurity, and more.</p>
</div>
```

Add the class `flip-card` to the outer div (so it has three classes: `program-card flip-card featured`). Then wrap the existing content in a new structure:

```html
<div class="program-card flip-card featured">
    <div class="flip-card-inner">
        <div class="flip-card-front">
            <h4>Science, Engineering &amp; Technology</h4>
            <p>Computer Science, Software Engineering, Biology, Cybersecurity, and more.</p>
        </div>
        <div class="flip-card-back">
            <h4>SET Programs</h4>
            <ul>
                <li>Computer Science</li>
                <li>Software Engineering</li>
                <li>Biology</li>
                <li>Cybersecurity</li>
                <li>Data Science</li>
            </ul>
        </div>
    </div>
</div>
```

The structure is:
- **`.flip-card`** — the container that sets up 3D perspective
- **`.flip-card-inner`** — the element that actually rotates
- **`.flip-card-front`** — visible by default
- **`.flip-card-back`** — hidden behind the front, pre-rotated 180 degrees

#### CSS Changes

Add these rules to your CSS file:

**The container** — sets up the 3D viewing angle and removes the default card styling that would interfere:

```css
.flip-card {
    perspective: 800px;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
}
```

`perspective: 800px` means "the viewer is 800px away from the card." Smaller values create a more dramatic 3D effect; larger values look flatter.

**The rotating element** — this is what actually flips:

```css
.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s ease-in-out;
    transform-style: preserve-3d;
}
```

`transform-style: preserve-3d` is critical — without it, the front and back faces would be flattened into 2D and the flip wouldn't work.

**The hover trigger:**

```css
.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}
```

**Both faces** share the same positioning and hide their back side:

```css
.flip-card-front,
.flip-card-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-top: 3px solid var(--ut-red);
    border-radius: 0 0 0.5rem 0.5rem;
    padding: 1rem;
}
```

`backface-visibility: hidden` hides each face when it's rotated away from the viewer. Without this, you'd see a mirrored version of the front through the back.

**The front face** gets the conic gradient background:

```css
.flip-card-front {
    background: conic-gradient(from 200deg at 0% 100%, #dce8f0, var(--ut-white) 40%, #f5e8e8 80%, var(--ut-white));
}
```

**The back face** is pre-rotated 180 degrees (so when the inner div rotates 180 degrees, the back face ends up at 0 — facing the viewer):

```css
.flip-card-back {
    background-color: var(--ut-navy);
    color: var(--ut-white);
    transform: rotateY(180deg);
}
```

**Style the back face heading** to be white (it inherits the red from `h4`):

```css
.flip-card-back h4 {
    color: var(--ut-white);
}
```

> **How 3D flipping works:** The `.flip-card-inner` starts at 0 degrees. On hover, it rotates to 180 degrees. The front face (at 0deg) ends up at 180deg (facing away → hidden). The back face (pre-rotated to 180deg) ends up at 360deg (same as 0deg → facing viewer). `backface-visibility: hidden` ensures only the face pointing toward you is visible at any time.

**Test it:** Hover over the featured Science, Engineering & Technology card. It should flip to reveal a navy blue back side with a list of programs.

### Step 7: Respect Reduced Motion

Some users experience motion sickness or discomfort from animations. Operating systems let users request "reduced motion," and we should respect that preference.

Add this media query at the very end of your CSS:

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        transition-duration: 0.01ms !important;
        animation-duration: 0.01ms !important;
    }
}
```

This targets every element and sets transition/animation durations to essentially zero — so changes still happen, but instantly instead of animating.

> **Why `0.01ms` instead of `0`?** Some browsers treat `0` as "no transition" and might skip transition events entirely. Using `0.01ms` (effectively instant) ensures any JavaScript listening for `transitionend` events still works correctly.

> **Why `!important`?** This needs to override every transition duration set elsewhere in the stylesheet. The `!important` flag ensures this accessibility rule always wins, regardless of specificity.

**Test it:** In your operating system settings, enable "Reduce motion" (macOS: System Settings > Accessibility > Display > Reduce motion). All your transitions should now happen instantly.

## Summary

Here's everything you added in this lab:

| Step | What you did | Key CSS properties |
|---|---|---|
| 1 | Nav link color transition | `transition: color 0.2s ease-out` |
| 2 | Program card lift on hover | `transition`, `transform: translateY()`, `box-shadow` |
| 3 | Campus photo zoom | `overflow: hidden`, `transition`, `transform: scale()` |
| 4 | Submit button lift | `transition`, `transform: translateY()`, `box-shadow` |
| 5 | Footer seal spin | `transition`, `transform: rotate(360deg)` |
| 6 | 3D flip card | `perspective`, `transform-style: preserve-3d`, `backface-visibility: hidden`, `rotateY(180deg)` |
| 7 | Reduced motion | `@media (prefers-reduced-motion: reduce)` |
