# CSS Transitions and Transforms

In this lab you'll bring the Utah Tech University website to life with smooth, interactive motion — all using pure CSS. Right now, when you hover over a nav link, the color snaps instantly from one color to another. By the end of this lab, that change will happen as a smooth fade. You'll also make cards lift off the page, zoom into a photo, spin the university seal, and build a card that flips over in 3D to reveal hidden content on the back.

**<a href="https://se1400.github.io/labs/labs/css-transitions-transforms/example.jpg" target="_blank">View completed example</a>** — Since transitions and transforms are interactive effects, you won't see them in a static screenshot. Hover over the elements on your own page to see them in action as you build each step.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Note:** The starter file includes the complete Utah Tech page from the previous lab — all the HTML structure, forms, and CSS styling are already in place. You'll only be adding CSS rules (and a small HTML modification for the flip card).

**Where to add your CSS:** Some steps ask you to add properties to an **existing** rule (like `.program-card`). You can either scroll up and add the property directly inside that rule, or create a new rule with the same selector below the section marker at the bottom of `starter.css`. Both approaches work — CSS merges properties from multiple rules with the same selector. New rules go below the `/* CSS Transitions and Transforms — add your CSS below */` comment.

## Key Concepts

### What is a Transition?

A **transition** tells the browser: "When this property changes, don't change it instantly — animate it over time." Without a transition, a color change on hover snaps from white to gray in a single frame. With a transition, it fades smoothly.

The `transition` shorthand has three parts:

1. **Property** — which CSS property to animate (like `color`, `transform`, or `box-shadow`)
2. **Duration** — how long the animation takes (like `0.2s` for two-tenths of a second)
3. **Timing function** — the acceleration curve (see below)

For example, `transition: color 0.2s ease-out` means "animate the `color` property over 0.2 seconds using the ease-out curve."

You can transition multiple properties by separating them with commas: `transition: transform 0.2s ease, box-shadow 0.2s ease`.

### What is a Transform?

A **transform** visually moves, rotates, or resizes an element — without affecting the layout around it. When you use `transform: translateY(-6px)` to move a card up, no other element on the page shifts. The card moves visually, but its "slot" in the layout stays the same.

Common transform functions you'll use:

| Function | What it does | Example |
|---|---|---|
| `translateY()` | Moves up (negative) or down (positive) | `translateY(-6px)` moves up 6px |
| `scale()` | Enlarges (>1) or shrinks (<1) | `scale(1.05)` = 105% size |
| `rotate()` | Spins by an angle | `rotate(360deg)` = full circle |
| `rotateY()` | Spins around the vertical axis (3D) | `rotateY(180deg)` = flip to back |

### Timing Functions

Timing functions control how fast the animation moves at different points:

- **`ease`** — Starts slow, speeds up, then slows down at the end. This is the default.
- **`ease-out`** — Starts fast, then slows to a stop. Good for hover effects because it feels responsive.
- **`ease-in-out`** — Slow at the start AND the end. Good for continuous motion like spinning.
- **`linear`** — Same speed the whole time. Can feel robotic.

You don't need to memorize these — just know that different timing functions create different "feelings" of motion.

## Instructions

### Step 1: Nav Link Transition

Right now, the nav links at the top of the page change color on hover — but the change is instant. Your job is to make that color change happen smoothly.

1. In your **CSS file**, add a new rule for `nav a` (this targets every `<a>` element inside the `<nav>`).

2. Inside this rule, add a `transition` property. Set it to animate the `color` property over `0.2s` using `ease-out` timing.

   The format is: `transition: property duration timing-function;`

> **Why `ease-out`?** When you hover, you want the response to feel immediate — `ease-out` starts the color change quickly, then gently slows to a stop. It feels natural, like a ball rolling to a stop.

**Try it out:** Save your file and hover over the nav links in your browser. The color should now fade smoothly from white to gray instead of snapping. If it still snaps instantly, double-check that your rule targets `nav a` (not just `nav` or `a`).

### Step 2: Program Card Lift

When users hover over a program card, it should rise up and cast a deeper shadow — as if the card is lifting off the table toward you. This takes two things: a **transition** on the base state (so the movement animates smoothly) and a **transform** on the hover state (to define where the card moves to).

1. Find the existing `.program-card` rule in your CSS. Add a `transition` property that animates both `transform` and `box-shadow`, each over `0.2s` with `ease` timing. Remember, you separate multiple transitions with a comma.

2. Below that, add a new `.program-card:hover` rule. Inside it, add two properties:
   - `transform` set to `translateY(-6px)` — this moves the card **up** 6 pixels. Negative values move up on screen.
   - `box-shadow` set to `0 8px 20px rgba(0, 0, 0, 0.15)` — this is a larger, softer shadow that makes the card look like it's floating higher above the page.

> **Why does `transform` not affect layout?** If you used `margin-top: -6px` to move a card up, everything below it would shift. `transform` is different — it moves the element visually, like picking up a sticker and holding it higher, without moving anything else on the page. This is why transforms are perfect for hover effects.

**Try it out:** Hover over any program card in the "Our Colleges" section. It should smoothly rise up and its shadow should grow. When you move your cursor away, it should smoothly settle back down.

### Step 3: Campus Photo Zoom

When the user hovers over the campus photo, it should zoom in slightly — like looking through a magnifying glass. The trick is that the zoomed image stays inside its frame instead of spilling out.

This requires changes to three rules:

1. Find the existing `#colleges figure` rule. Add `overflow: hidden` to it. This is the key property — it tells the browser to clip (cut off) anything inside the figure that extends beyond its edges. Without this, the zoomed image would grow outside the frame.

2. Find the existing `#colleges figure img` rule. Add two properties:
   - `display: block` — images are inline by default, which creates a tiny gap below them. Setting `display: block` removes that gap.
   - `transition` set to animate `transform` over `0.4s` with `ease` timing.

3. Add a new rule for `#colleges figure:hover img`. Inside it, set `transform` to `scale(1.05)`. This enlarges the image to 105% of its original size. Because the parent figure has `overflow: hidden`, the extra 5% is clipped at the edges — creating a smooth zoom-within-frame effect.

> **Why put `:hover` on the `figure` but `transform` on the `img`?** If you put `:hover` directly on the `img`, the image edges could shift away from your cursor as it scales, causing the hover to flicker on and off. Putting `:hover` on the stable parent `figure` avoids this problem — the hover area stays the same while the image inside it zooms.

**Try it out:** Hover over the campus photo. It should smoothly zoom in without overflowing its container. Move your cursor away and it should zoom back out.

### Step 4: Submit Button Lift

The submit button already changes its background color on hover (look at the existing `button[type="submit"]:hover` rule in the starter CSS). You'll enhance this by adding a lift effect — the same idea as the program cards, but smaller.

1. Find the existing `button[type="submit"]` rule. Add a `transition` property that animates three things: `background-color`, `transform`, and `box-shadow` — each over `0.2s` with `ease` timing. Separate them with commas.

   You're transitioning `background-color` here because the hover rule already changes it — adding it to the transition makes that existing color change smooth too.

2. Find the existing `button[type="submit"]:hover` rule. It already has `background-color: #8B1518`. Add two more properties to it:
   - `transform` set to `translateY(-3px)` — a subtle 3-pixel lift (less than the cards, since buttons are smaller)
   - `box-shadow` set to `0 4px 12px rgba(186, 28, 33, 0.4)` — this shadow uses the Utah Tech red color at 40% opacity, so the shadow has a red tint that matches the button

**Try it out:** Hover over the "Submit Application" button. It should lift up slightly, its background color should darken smoothly, and a red-tinted shadow should appear beneath it.

### Step 5: Footer Seal Spin

The university seal in the footer already has a grayscale filter that removes color, and a hover rule that restores color. You'll add a fun spin effect on top of that.

1. Find the existing `footer img` rule (it currently has `filter: grayscale(100%)`). Add a `transition` property that animates two things: `transform` over `0.6s` with `ease-in-out` timing, and `filter` over `0.3s` with `ease` timing.

   By transitioning `filter`, the existing grayscale-to-color change will also animate smoothly.

2. Find the existing `footer img:hover` rule (it currently has `filter: grayscale(0%)`). Add `transform` set to `rotate(360deg)`. This spins the seal one full revolution.

> **Why `ease-in-out` for the spin?** Think about a coin spinning on a table — it starts slow, speeds up in the middle, and slows down before stopping. `ease-in-out` creates that same natural feeling. If you used `linear`, it would spin at a constant speed, which feels mechanical and unnatural.

**Try it out:** Scroll down to the footer and hover over the Utah Tech seal. It should spin a full circle while transitioning from grayscale to full color. The spin should feel smooth and natural, not robotic.

### Step 6: 3D Flip Card (HTML + CSS)

This is the most complex step — and the most rewarding. You'll convert the featured "Science, Engineering & Technology" program card into a 3D flip card. When a user hovers over it, the card flips over to reveal a list of programs on the back. Think of it like flipping a playing card over on a table.

A flip card requires four layers:
- **The container** (`.flip-card`) — sets up the 3D viewing angle using `perspective`
- **The rotating element** (`.flip-card-inner`) — this is the piece that actually spins when hovered
- **The front face** (`.flip-card-front`) — what the user sees by default
- **The back face** (`.flip-card-back`) — hidden behind the front, revealed when flipped

#### Part A: HTML Changes

Open your **HTML file** and find the featured program card. It currently looks like this — a `<div>` with classes `program-card featured` containing an `<h4>` and a `<p>`.

Here's what you need to do:

1. Add the class `flip-card` to the outer `<div>` so it has three classes: `program-card`, `flip-card`, and `featured`.

2. Inside that div, add a new `<div>` with the class `flip-card-inner`. Move the existing `<h4>` and `<p>` inside a new `<div>` with the class `flip-card-front`, and place that inside `flip-card-inner`.

3. After the `flip-card-front` div (still inside `flip-card-inner`), add another `<div>` with the class `flip-card-back`. Inside it, add:
   - An `<h4>` with the text `SET Programs`
   - A `<ul>` with five `<li>` items: `Computer Science`, `Software Engineering`, `Biology`, `Cybersecurity`, and `Data Science`

When you're done, the structure should be: the outer div contains `flip-card-inner`, which contains both `flip-card-front` and `flip-card-back` as siblings (side by side, not nested inside each other).

#### Part B: CSS Changes

Now add the CSS that makes the flip work. Add these rules to your CSS file:

**1. The container** — Add a `.flip-card` rule with:
   - `perspective` set to `800px` — this tells the browser how far away the "viewer" is from the card. Smaller values create a more dramatic 3D effect. Try changing it to `200px` later to see the difference.
   - `background` set to `transparent` — removes the white background inherited from `.program-card`
   - `border` set to `none` — removes the border inherited from `.program-card`
   - `box-shadow` set to `none` — removes the shadow inherited from `.program-card`
   - `padding` set to `0` — removes padding so the inner card faces can fill the full space

**2. The rotating element** — Add a `.flip-card-inner` rule with:
   - `position: relative` and `width: 100%` and `height: 100%` — makes it fill the container
   - `transition` set to animate `transform` over `0.6s` with `ease-in-out` timing
   - `transform-style` set to `preserve-3d` — this is critical. Without it, the browser flattens everything into 2D and the flip effect breaks completely. This property tells the browser to keep child elements in real 3D space.

**3. The hover trigger** — Add a `.flip-card:hover .flip-card-inner` rule with:
   - `transform` set to `rotateY(180deg)` — when the user hovers over the container, the inner element rotates 180 degrees around the Y (vertical) axis

**4. Both card faces** — Add a grouped rule for `.flip-card-front, .flip-card-back` with:
   - `position: absolute`, `top: 0`, `left: 0`, `width: 100%`, `height: 100%` — stacks both faces on top of each other, filling the container
   - `backface-visibility` set to `hidden` — this is the other critical 3D property. It hides each face when it's rotated away from the viewer. Without this, you'd see a backwards mirror image of the front face bleeding through from behind.
   - `border-top` set to `3px solid var(--ut-red)` — restores the red top border (since we removed borders from the container)
   - `border-radius` set to `0 0 0.5rem 0.5rem` — restores rounded bottom corners
   - `padding` set to `1rem`

**5. The front face** — Add a `.flip-card-front` rule with:
   - `background` set to a conic gradient. You don't need to memorize this value — find the existing `.featured` rule in your starter CSS and copy its `background` value. It starts with `conic-gradient(from 200deg ...`.

**6. The back face** — Add a `.flip-card-back` rule with:
   - `background-color` set to `var(--ut-navy)` — navy blue background
   - `color` set to `var(--ut-white)` — white text
   - `transform` set to `rotateY(180deg)` — this pre-rotates the back face 180 degrees. Think about why: the inner element starts at 0 degrees. When it rotates to 180 degrees on hover, the front face (which started at 0) ends up at 180 degrees (facing away — hidden). The back face (which started at 180 degrees) ends up at 360 degrees (same as 0 — facing the viewer). It's like two people standing back-to-back on a turntable.

**7. The back face heading** — Add a `.flip-card-back h4` rule with `color` set to `var(--ut-white)`. Without this, the `<h4>` inherits the red color from the site-wide `h4` rule, which would be hard to read on the navy background.

> **How does 3D flipping work?** Imagine two cards glued back-to-back. The front card faces you. The back card faces away from you and is invisible (thanks to `backface-visibility: hidden`). When you spin the pair 180 degrees, the front card now faces away (invisible) and the back card now faces you (visible). That's exactly what's happening here with CSS.

**Try it out:** Hover over the featured "Science, Engineering & Technology" card. It should flip over smoothly to reveal a navy blue back with a list of programs. Move your cursor away and it should flip back. If it looks broken, double-check that you have `transform-style: preserve-3d` on `.flip-card-inner` and `backface-visibility: hidden` on both faces.

### Step 7: Respect Reduced Motion

Some users experience motion sickness, dizziness, or discomfort from animations on screen. Both macOS and Windows let users turn on a "reduce motion" preference in their accessibility settings. As web developers, we should respect that choice.

CSS provides a media query that detects this preference: `@media (prefers-reduced-motion: reduce)`.

1. At the very end of your CSS file, add a `@media (prefers-reduced-motion: reduce)` block.

2. Inside it, add a rule targeting `*, *::before, *::after` (every element on the page). Set two properties:
   - `transition-duration` set to `0.01ms !important`
   - `animation-duration` set to `0.01ms !important`

This makes every transition and animation happen in essentially zero time — the changes still occur, but instantly instead of animating. We use `0.01ms` instead of `0` because some browsers treat `0` as "no transition at all" and might skip transition-related events. The `!important` flag is necessary here because this accessibility rule needs to override every other transition duration in the stylesheet, regardless of specificity.

> **Why does this matter?** Accessibility isn't optional — it's part of being a professional web developer. About 35% of adults experience some form of motion sensitivity. By adding these four lines of CSS, you ensure that your site is comfortable for everyone while still looking great for users who enjoy animations.

**Try it out:** On macOS, go to System Settings > Accessibility > Display and enable "Reduce motion." On Windows, go to Settings > Accessibility > Visual Effects and turn off "Animation effects." With reduced motion enabled, all your transitions should now happen instantly. Turn it back off to see the animations again.

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
