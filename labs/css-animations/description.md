# CSS Animations and Pseudo-Elements

In this lab you'll make the Utah Tech University website come alive with motion that plays automatically — no hovering required. Right now, the page loads and everything appears instantly. By the end of this lab, the hero text will slide into view, a bouncing arrow will invite users to scroll down, the submit button will pulse with a glowing light, and program cards will cascade in as you scroll. You'll also learn to generate decorative content with CSS pseudo-elements: an animated underline that grows beneath nav links, a large drop cap letter, styled list markers, custom placeholder text, and branded text selection colors.

**<a href="https://se1400.github.io/labs/labs/css-animations/example.jpg" target="_blank">View completed example</a>** — Since animations play on page load and on hover, a static screenshot can't show everything. Build each step and refresh your page to see your animations in action.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Note:** The starter file includes the complete Utah Tech page from the previous lab — all the HTML structure, forms, transitions, transforms, and flip card are already in place. You'll be adding CSS rules (and a small HTML addition for the scroll arrow) below the comment at the bottom of the CSS file.

**Where to add your CSS:** Add all new rules below the `/* CSS Animations and Pseudo-Elements — add your CSS below */` comment at the bottom of your CSS file.

## Key Concepts

### What is a CSS Animation?

In the previous lab, you learned **transitions** — they animate between two states when something changes, like a color shifting on hover. But transitions can only react to changes. They cannot start on their own, loop, or pass through more than two states.

A **CSS animation** is proactive — it runs on its own schedule, starting automatically when the page loads. You define a sequence of style snapshots called **keyframes**, and the browser smoothly moves between them. Animations can loop forever, reverse direction, pause, and pass through as many intermediate states as you want.

### How @keyframes Works

Every animation starts with a `@keyframes` rule. You give your animation a name (like `fadeIn` or `bounce`) and list the styles the element should have at specific points during the animation.

The simplest form uses `from` (the start, same as 0%) and `to` (the end, same as 100%). For example, a fade-in animation would set opacity to 0 at the start and opacity to 1 at the end.

For animations with more than two states, you use percentage values. You can add as many percentage stops as you need — 0%, 25%, 50%, 75%, 100%, or any values in between. The percentages represent progress through the animation, not clock time.

### The animation Shorthand

Once you have a `@keyframes` rule, you attach it to an element using the `animation` property. The shorthand combines several values in order:

1. **Name** — which `@keyframes` rule to play (like `fadeIn`)
2. **Duration** — how long one cycle takes (like `0.6s`)
3. **Timing function** — the speed curve (`ease`, `ease-out`, `ease-in-out`, `linear`)
4. **Delay** — how long to wait before starting (like `0.2s`)
5. **Iteration count** — how many times to play (`1`, `3`, or `infinite`)
6. **Direction** — which way to play (`normal`, `reverse`, `alternate`)
7. **Fill mode** — what styles to keep before/after (`none`, `forwards`, `backwards`, `both`)

You don't need to include all of these — only the name and duration are required. If you include two time values, the browser always treats the first as duration and the second as delay.

### What is animation-fill-mode?

By default, when an animation finishes, the element snaps back to its original styles — which can look jarring. The `both` value is the most useful fill mode: it applies the starting keyframe styles during any delay period, and holds the ending keyframe styles after the animation finishes. You'll use `both` in most of your animations in this lab.

### What are Pseudo-Elements?

Pseudo-elements are special CSS selectors that let you style a part of an element — or generate entirely new content — without modifying your HTML. They use a double-colon syntax to distinguish them from pseudo-classes like `:hover`.

The most powerful ones are `::before` and `::after`, which insert generated content at the beginning or end of an element. The critical rule: **a pseudo-element must have a `content` property to appear at all.** Use an empty string (`content: ""`) when you want a visual shape with no text.

Other pseudo-elements style specific parts of existing content: `::first-letter` targets the first letter of a block, `::marker` targets list bullet points, `::placeholder` targets form placeholder text, and `::selection` targets text the user has highlighted.

## Instructions

### Step 1: Hero Entrance Animation

When the page loads, the hero heading and paragraphs should slide up from below and fade into view — instead of appearing instantly.

1. Below the `/* CSS Animations and Pseudo-Elements — add your CSS below */` comment, create a `@keyframes` rule. Name it `fadeSlideIn`. Inside it, define two stops: a `from` block that sets `opacity` to `0` and `transform` to `translateY(30px)`, and a `to` block that sets `opacity` to `1` and `transform` to `translateY(0)`.

   This defines the animation sequence: the element starts invisible and shifted 30 pixels down, then fades in while sliding up to its natural position.

2. Add a rule for `.hero-content h2`. Set its `animation` property using the shorthand: the name `fadeSlideIn`, a duration of `0.6s`, the timing function `ease-out`, and a fill mode of `both`.

3. Add a rule for `.hero-content p`. Apply the same animation, but add a delay of `0.2s` between the duration and the fill mode. This makes the paragraphs wait a moment after the heading appears, creating a cascading entrance effect.

> **Why `ease-out`?** The text should feel like it's arriving with momentum — it starts moving quickly and gently decelerates to a stop. This mimics how objects naturally slow down, making the entrance feel organic rather than mechanical.

**Try it out:** Save your file and refresh your browser. The hero heading should slide up and fade in first, followed by the paragraphs a fraction of a second later. If the text appears instantly with no animation, double-check that your `@keyframes` name matches exactly what you wrote in the `animation` property.

### Step 2: Bouncing Scroll Arrow

You'll add a bouncing arrow at the bottom of the hero section that invites users to scroll down. This is a common UI pattern on websites with large hero banners — a gentle, repeating animation that signals there's more content below.

#### Part A: HTML Change

Open your **HTML file** and find the `#welcome` section. This section contains a single child: the `.hero-overlay` div (which itself contains `.hero-content`). After the `.hero-overlay`'s closing `</div>` tag — but still inside the `</section>` tag — add a new `<div>` with the class `scroll-arrow`. The arrow div is a sibling of `.hero-overlay`, not nested inside it. Set `aria-hidden` to `true` (this is purely decorative, so screen readers should skip it). For the content, type the HTML entity `&#8595;` — this renders a downward arrow character (↓).

#### Part B: CSS Changes

1. Create a `@keyframes` rule named `bounce`. In the `from` block, set `transform` to `translateY(0)`. In the `to` block, set `transform` to `translateY(12px)`. This defines a simple up-and-down motion of 12 pixels.

2. Add a rule for `.scroll-arrow`. Set `text-align` to `center`, `font-size` to `2rem`, and `color` to `var(--ut-white)`. Then set `animation` to use `bounce` with a duration of `0.8s`, timing function `ease-in-out`, iteration count `infinite`, and direction `alternate`. Finally, add `padding-bottom` set to `1rem` so the arrow doesn't sit flush against the bottom edge.

   The `alternate` direction makes the arrow bounce up and down smoothly — it moves down on the first cycle, then back up on the next, creating a natural bouncing rhythm.

> **Why `ease-in-out`?** The arrow should slow down at the top and bottom of each bounce and speed up in the middle — like a ball at the peak of its arc. `linear` would move at a constant speed, which looks mechanical.

**Try it out:** Save both files and refresh. At the bottom of the hero section, you should see a white downward arrow gently bouncing up and down. If it doesn't appear, check that your HTML entity `&#8595;` is inside the `.scroll-arrow` div and that the div is inside the `#welcome` section.

### Step 3: Pulsing Submit Button Glow

The submit button should have a continuously pulsing glow — a breathing effect where a red shadow grows and shrinks rhythmically. This draws attention to the call-to-action without requiring any user interaction.

1. Create a `@keyframes` rule named `pulse`. In the `from` block, set `box-shadow` to `0 0 4px rgba(186, 28, 33, 0.3)` — a small, subtle red glow. In the `to` block, set `box-shadow` to `0 0 20px rgba(186, 28, 33, 0.6)` — a larger, more intense glow. The numbers `186, 28, 33` are the Utah Tech red color expressed as RGB values, and the last number (`0.3` or `0.6`) controls the opacity of the shadow.

2. Add a new rule for `button[type="submit"]`. Set `animation` to use the name `pulse`, a duration of `1.2s`, the timing function `ease-in-out`, an iteration count of `infinite`, and a direction of `alternate`.

   The `infinite` keyword makes the animation loop forever. The `alternate` direction means each cycle reverses: the glow grows (forward), then shrinks (backward), then grows again — creating a natural breathing rhythm.

> **Why `ease-in-out`?** Think of someone breathing — the motion starts slow, speeds up in the middle, then slows down again at each end. `ease-in-out` creates exactly that feeling, making the pulse feel natural and calming rather than robotic.

**Try it out:** Scroll to the form section and look at the submit button. It should have a soft red glow that smoothly pulses in and out. The button should still lift on hover (from the previous lab's transition). If the glow isn't visible, make sure your `box-shadow` values use `rgba` with the parentheses and commas in the right places.

### Step 4: Scroll-Driven Card and Figure Entrance

The campus photo and program cards should slide into view as the user scrolls down to them — not when the page first loads. This is called a **scroll-driven animation**: instead of playing on a timer, the animation's progress is tied to how far the element has entered the viewport.

Traditionally, this required JavaScript. Modern CSS provides `animation-timeline: view()`, which tells the browser to drive the animation based on the element's visibility in the viewport instead of clock time. Each card enters the viewport at a slightly different scroll position, so they naturally stagger without needing explicit delays.

1. Create a new `@keyframes` rule named `cardEntrance`. This time, use percentage-based stops instead of `from`/`to` — they work the same way (`0%` equals `from`, `100%` equals `to`), but percentages let you add intermediate stops later if needed. At `0%`, set `opacity` to `0` and `transform` to `translateY(30px)`. At `100%`, set `opacity` to `1` and `transform` to `translateY(0)`.

2. Add a rule targeting `.programs-grid > *` (every direct child of the programs grid — the figure and all program cards). Set the `animation` property to use `cardEntrance` with a duration of `0.4s`, timing function `ease-out`, and fill mode `both`.

   The duration serves as a fallback for browsers that don't yet support scroll-driven animations — in those browsers, the cards will simply animate on page load over 0.4 seconds.

3. In the same rule, add `animation-timeline` set to `view()`. This switches the animation from time-based to scroll-based. The animation will play as the element scrolls into the viewport.

4. Also in the same rule, add `animation-range` set to `entry 0% entry 40%`. This means the animation starts when the element first begins entering the viewport (entry 0%) and completes when the element is 40% visible (entry 40%). The remaining 60% of scrolling keeps the element fully visible.

> **Why does this work without staggering?** Each card sits at a different vertical position on the page. As you scroll, each card enters the viewport at a slightly different moment — the card at the top of the grid enters first, and each card below it enters a fraction of a second later. The scroll position naturally creates the cascade effect, no `animation-delay` or `nth-child` rules needed.

> **What about older browsers?** If a browser doesn't support `animation-timeline: view()`, it simply ignores that property and the `animation-range` property. The animation falls back to time-based playback using the 0.4s duration — the cards animate in on page load instead. This is called **graceful degradation**: the page still works and still looks good, just without the scroll-triggered entrance.

**Try it out:** Save your file and scroll down slowly to the "Our Colleges" section. As each card enters the bottom of your viewport, it should slide up and fade in. Scroll back up and then down again — the animation replays each time the cards re-enter the viewport. If nothing animates, make sure you have all three properties in the same rule: `animation`, `animation-timeline`, and `animation-range`.

### Step 5: Animated Nav Underline with ::after

Right now, the nav links change color when you hover over them (from white to gray). You'll replace that color change with something more sophisticated: an underline that grows from one side of the link to the other. This underline is built entirely with a `::after` pseudo-element — no extra HTML needed.

1. Add a rule for `nav a` and set `position` to `relative`. This is necessary because the underline pseudo-element will be positioned absolutely — and absolute positioning is relative to the nearest positioned ancestor. Without this, the underline would position itself relative to the page instead of the link.

2. Add a rule for `nav a::after`. Inside it, set `content` to an empty string (two quotation marks with nothing between them). This is required — without it, the pseudo-element won't render at all. Set `position` to `absolute`, `bottom` to `-4px`, and `left` to `0`. Set `width` to `100%` and `height` to `2px`. Set `background` to `var(--ut-white)`. Set `transform` to `scaleX(0)` — this collapses the underline to zero width, making it invisible. Set `transform-origin` to `right`. Finally, set `transition` to animate `transform` over `0.3s` with `ease` timing.

3. Add a rule for `nav a:hover::after`. Set `transform` to `scaleX(1)` and `transform-origin` to `left`.

   Here's what this does: in the default state, the underline is scaled to zero width from the right side. On hover, it scales to full width from the left side. This creates a smooth growing effect from left to right. When you move your cursor away, it shrinks back from left to right (because the default `transform-origin` is `right`).

4. This sub-step is different — instead of adding a new rule, you'll **edit an existing rule** in the starter CSS above the comment line. Find the existing `nav a:hover` rule (it currently sets `color` to `#cccccc`). Change the color value to `var(--ut-white)` so the link stays white on hover — the underline is now the hover indicator instead of a color change.

> **Why use `scaleX` instead of changing `width`?** Animating `width` forces the browser to recalculate the layout of surrounding elements on every frame — an expensive operation. Animating `transform: scaleX()` is handled entirely by the GPU, making it silky smooth even on slower devices. This is the same performance principle from the previous lab.

**Try it out:** Hover over the nav links. A white underline should smoothly grow from left to right beneath each link. When you move away, it should shrink back. If the underline doesn't appear at all, make sure you included `content: ""` — this is the most common mistake with pseudo-elements.

### Step 6: Typographic Polish with Pseudo-Elements

In this step, you'll add four small but impactful visual refinements using different pseudo-elements. Each one is just a few lines of CSS, but together they give the page a polished, professional feel.

#### Part A: Drop Cap

A **drop cap** is a large, decorative first letter at the start of a paragraph — a classic typographic technique used in books, magazines, and newspapers for centuries.

1. Add a rule targeting `.hero-content p:first-of-type::first-letter`. This selector chains two things together: `p:first-of-type` picks the first paragraph inside `.hero-content`, and `::first-letter` targets only that paragraph's opening letter. Set `float` to `left`, `font-size` to `3.5rem`, `font-weight` to `700`, `line-height` to `0.85`, `margin-right` to `0.1em`, and `color` to `var(--ut-white)`.

   The `float: left` makes the surrounding text wrap around the large letter. The `line-height` of `0.85` pulls it up slightly so it aligns with the top of the text.

#### Part B: List Markers

The sidebar lists use default black bullet points. You'll brand them with the Utah Tech red.

1. Add a rule for `.sidebar li::marker`. Set `color` to `var(--ut-red)` and `font-size` to `1.2em`.

   The `::marker` pseudo-element targets just the bullet point (or number) of each list item — not the text itself. Before `::marker` existed, customizing bullets required removing the default marker entirely and rebuilding it with `::before`.

#### Part C: Placeholder Text

The form inputs have placeholder text that uses the browser's default gray styling. You'll make it more distinctive.

1. Add a grouped rule for `input::placeholder, textarea::placeholder`. Set `color` to `#94a3b8` and `font-style` to `italic`.

   This styles the hint text that appears inside form fields before the user types anything. Remember that placeholder text is not a substitute for a label — it disappears once the user starts typing.

#### Part D: Selection Colors

When a user selects (highlights) text on the page, the browser uses its default blue highlight. You'll replace this with Utah Tech's brand colors.

1. Add a rule for `::selection`. Set `background-color` to `var(--ut-red)` and `color` to `var(--ut-white)`.

   Try selecting text anywhere on the page — it should now highlight in red with white text instead of the default blue.

**Try it out:** Check each addition: the large "U" at the start of the first hero paragraph, the red bullet points in the sidebar lists, the italic gray placeholder text in the form fields, and the red highlight when you select text. If the drop cap doesn't appear, make sure your selector includes both `p:first-of-type` and `::first-letter` with the double colons.

### Step 7: Reduced Motion (Comprehensive)

In the previous lab, you added a `prefers-reduced-motion` media query that set `transition-duration` and `animation-duration` to near-zero. Now that you've added looping animations (the bouncing arrow and pulsing button), you also need to stop them from repeating.

1. Find the existing `@media (prefers-reduced-motion: reduce)` block at the bottom of the starter CSS. Inside the `*, *::before, *::after` rule, add `animation-iteration-count` set to `1 !important`.

   This ensures that looping animations like the bouncing arrow and pulsing button play only once instead of forever — effectively stopping them after a single cycle. Combined with the near-zero `animation-duration` that's already there, animations will appear to complete instantly and then stop.

> **Why is this important?** Continuously moving elements — especially looping bounces and pulsing glows — are among the most commonly reported accessibility barriers. Users with vestibular disorders or motion sensitivity may experience dizziness or nausea. By adding this single line, you ensure your page is comfortable for everyone.

**Try it out:** On macOS, go to System Settings, then Accessibility, then Display, and enable "Reduce motion." On Windows, go to Settings, then Accessibility, then Visual Effects, and turn off "Animation effects." With reduced motion enabled, the scroll arrow should stop bouncing and the button should stop pulsing. Turn it back off to see your animations again.

## Summary

| Step | What you built | Key CSS concepts |
|---|---|---|
| 1 | Hero slide-in entrance | `@keyframes` with `from`/`to`, `animation` shorthand, `fill-mode: both` |
| 2 | Bouncing scroll arrow | `@keyframes bounce`, `translateY()`, `infinite alternate` |
| 3 | Pulsing button glow | `infinite`, `alternate`, `box-shadow` animation |
| 4 | Scroll-driven card entrance | Percentage keyframes, `animation-timeline: view()`, `animation-range` |
| 5 | Animated nav underline | `::after`, `content: ""`, `scaleX()`, `transform-origin` |
| 6 | Typographic pseudo-elements | `::first-letter`, `::marker`, `::placeholder`, `::selection` |
| 7 | Reduced motion update | `animation-iteration-count: 1 !important` |
