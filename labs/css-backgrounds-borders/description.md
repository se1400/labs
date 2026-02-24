# CSS Backgrounds & Borders

In this lab you'll use advanced CSS properties to visually transform the Utah Tech University page. You'll learn how to layer gradient backgrounds over photos, blur backgrounds for a cinematic effect, fill text with a gradient, and add rounded corners, shadows, and consistent card proportions.

**<a href="https://se1400.github.io/labs/labs/css-backgrounds-borders/example.jpg" target="_blank">View completed example</a>** — This is what your page should look like when you're done.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Note:** This lab builds directly on the CSS Grid layout from the previous lab. All grid rules, Flexbox navigation, and structural styles are already in the starter file.

## Instructions

### Part 1: Linear Gradient & Layered Backgrounds

CSS gradients are generated images — not colors. That's why they go in the `background-image` property (or the `background` shorthand), not `background-color`. When you write `background: linear-gradient(...)`, the browser generates a smooth color transition and uses it as if it were a background image.

This matters because CSS allows you to **layer multiple backgrounds** on the same element using a comma-separated list. The first item is the top layer, the last is the bottom. This lets you combine a gradient overlay with a photo — no extra HTML needed.

1. In your **CSS file**, find the `#welcome` rule. It currently uses three separate background properties: `background-image`, `background-size`, and `background-position`. Replace all three with a single `background` shorthand that contains two comma-separated layers:

   - First layer (top): `linear-gradient(to bottom, ...)` — a gradient fading from a semi-transparent dark blue at the top to a deeper dark blue at the bottom. Use `rgba()` colors so the campus photo partially shows through.
   - Second layer (bottom): `url("https://se1400.github.io/labs/assets/campus.jpg") center / cover no-repeat` — the campus photo, sized and centered.

   After adding the new `background` property, also **remove `background-color`** from the `.hero-overlay` rule. The gradient on `#welcome` now handles the dark overlay — `.hero-overlay` should be fully transparent.

   > **Why does the gradient go first?** Background layers are painted in order — first in the list means on top. If you put the photo first and the gradient second, the photo would cover the gradient entirely.

### Part 2: backdrop-filter

The `backdrop-filter` property applies visual effects to whatever is *behind* an element — not the element itself. This is the key difference from `filter`, which affects the element and all its contents. When an element has a transparent or semi-transparent background, `backdrop-filter: blur()` softens the content showing through from behind.

2. In the `.hero-overlay` rule, add `backdrop-filter` set to `blur(3px)`. This applies a soft blur to the campus photo and gradient visible behind the transparent overlay, while the text inside `.hero-content` stays sharp.

   > **Why does backdrop-filter need transparency?** If an element's background is fully opaque, nothing shows through from behind — so there is nothing to blur. Since you removed `.hero-overlay`'s background in Step 1, the campus photo now shows through it, and `backdrop-filter` blurs that content.

### Part 3: Gradient Text

The `background-clip: text` technique clips an element's background — whether a color, image, or gradient — to the exact shape of its text. Combined with a transparent text color, the gradient fills the letterforms instead of a solid color.

3. In the `h1` rule, add the following four properties to create gradient text:

   - `background` set to `linear-gradient(to right, var(--ut-navy), var(--ut-red))` — a left-to-right gradient using Utah Tech's brand colors
   - `-webkit-background-clip: text` — required for Safari and Chrome support
   - `background-clip: text` — the standard property for Firefox and other browsers
   - `color: transparent` — makes the text itself transparent so the gradient background shows through

   > **Why two `background-clip` lines?** The `-webkit-` prefixed version was introduced first and is still required even in modern Chrome and Safari, even though the unprefixed version is now the standard. Both lines together give you reliable cross-browser support.

### Part 4: Radial & Conic Gradients

`linear-gradient()` moves along a straight line, but CSS has two other gradient types. A **radial gradient** starts at a center point and radiates outward as an ellipse or circle. A **conic gradient** sweeps colors around a center point, like a color wheel or pie chart.

4. In the `header` rule, replace `background-color: whitesmoke` with a `background` property using a `radial-gradient()`. The user-provided value is:

   ```
   radial-gradient(circle at 50% 50%, #fff 0%, #eee 70%)
   ```

   This creates a circular glow in the center of the header — pure white at the middle fading to light gray at the edges. The `circle` keyword forces a circular shape; the default without it is an ellipse.

5. In the `.featured` rule, add a `background` property using a `conic-gradient()`. A conic gradient sweeps colors around a center point — choose colors that complement the Utah Tech palette (subtle light blues and pinks work well). The `from` keyword sets the starting angle and `at` sets the center point:

   ```
   conic-gradient(from Xdeg at X% Y%, color1, color2, ...)
   ```

   > **What is a conic gradient?** Imagine a clock face where each hour mark is a different color blending into the next. That's a conic gradient — colors sweep around the center rather than fading in a straight line or outward ring.

### Part 5: Border Radius, Box Shadow & Aspect Ratio

6. Add `border-radius` to both the `.program-card` rule and the `.panel` rule. Use `0 0 0.5rem 0.5rem` — this rounds only the bottom-left and bottom-right corners, leaving the top flat where the red `border-top` accent line sits. Add the same value to both rules.

   > **border-radius shorthand order:** The four values go clockwise: top-left, top-right, bottom-right, bottom-left. So `0 0 0.5rem 0.5rem` means flat top, rounded bottom.

7. Add `box-shadow` to the `.program-card` rule. A small, soft shadow adds visual lift. The four values are: `x-offset y-offset blur-radius color`. Something subtle like `0 2px 8px rgba(0, 0, 0, 0.08)` works well — a slight downward shadow with soft edges.

8. Add `aspect-ratio` set to `1` to the `.program-card` rule. This forces every card to be a perfect square, regardless of content length. Consistent proportions make card grids feel more intentional and polished.

   > **What about the featured card?** The `.featured` rule already has `aspect-ratio: auto` which overrides this, so the featured card will still stretch naturally to fit its content.

### Part 6: :nth-child & :focus-visible

9. Find the `tbody tr:nth-child(even)` rule in your CSS. Change the keyword `even` to `odd`. This switches which rows are highlighted — odd rows (1st, 3rd, 5th...) instead of even rows — demonstrating how a single keyword change shifts the whole pattern.

   > **The formula behind the keywords:** `even` is shorthand for `2n` and `odd` is shorthand for `2n+1`. Any repeating pattern can be expressed with `an+b` — for example, `3n+2` selects every 3rd row starting from the 2nd.

10. Add a new CSS rule for `nav a:focus-visible` with an `outline` property. Use a value that's visible against the navy background — `2px solid var(--ut-white)` with `outline-offset: 4px` works well.

    `:focus-visible` fires only when the element is focused via keyboard navigation, not when clicked with a mouse. This is the modern, accessible approach: keyboard users see a clear indicator, mouse users don't see it cluttering the interface.

11. In the `.skip-link` section, change the selector `.skip-link:focus` to `.skip-link:focus-visible`. This is the same concept applied to the skip link — keyboard-only focus styling.

    > **Why :focus-visible instead of :focus?** `:focus` fires for both mouse clicks and keyboard navigation. Many designers historically used `outline: none` to hide focus rings for mouse users, which broke keyboard accessibility entirely. `:focus-visible` solves this cleanly — the browser decides when to show the indicator based on how the user is interacting with the page.

## Summary

| Property / Technique | Where applied |
|---|---|
| `linear-gradient()` | `#welcome` hero overlay and `h1` gradient text |
| Multiple layered backgrounds | `#welcome` (gradient + photo in one `background` declaration) |
| `backdrop-filter: blur()` | `.hero-overlay` (blurs campus photo behind transparent overlay) |
| `background-clip: text` | `h1` (clips gradient to the shape of the text) |
| `radial-gradient()` | `header` (centered circular spotlight) |
| `conic-gradient()` | `.featured` card (color sweep around a center point) |
| `border-radius` | `.program-card` and `.panel` (rounded bottom corners) |
| `box-shadow` | `.program-card` (soft elevation shadow) |
| `aspect-ratio` | `.program-card` (square proportions) |
| `:nth-child(odd)` | Table row striping |
| `:focus-visible` | Nav links and skip link (keyboard-only focus indicators) |
