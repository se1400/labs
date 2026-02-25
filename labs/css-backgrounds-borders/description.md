# CSS Backgrounds & Borders

In this lab you'll use advanced CSS properties to visually transform the Utah Tech University page. You'll learn how to layer gradient backgrounds over photos, blur backgrounds for a cinematic effect, fill text with a gradient, and add rounded corners, shadows, and consistent card proportions.

**<a href="https://se1400.github.io/labs/labs/css-backgrounds-borders/example.jpg" target="_blank">View completed example</a>** — This is what your page should look like when you're done.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Note:** The starter file already has all the grid layout, navigation, and structural styles from the previous lab built in. You won't need to touch the HTML at all — every change in this lab happens in the CSS file.

## Instructions

### Part 1: Linear Gradient & Layered Backgrounds

CSS gradients are generated images — not colors. That's why they go in the `background-image` property (or the `background` shorthand), not in `background-color`. When you write `background: linear-gradient(...)`, the browser generates a smooth color transition and treats it exactly like a background image.

**What is a shorthand property?** A *shorthand* is a single CSS property that sets multiple related values at once. The `background` shorthand can set the background image, size, position, and repeat behavior all in one line, instead of writing each as a separate property.

This matters because the `background` shorthand also allows you to **stack multiple backgrounds** on the same element by separating them with commas. The first item in the list is painted on top; the last item is painted on the bottom. This lets you place a semi-transparent gradient over a photo — no extra HTML needed.

1. In your **CSS file**, find the `#welcome` rule. It currently has three separate background properties: `background-image`, `background-size`, and `background-position`. **Delete all three of those lines** and replace them with a single `background` property that contains two comma-separated layers.

   Your two layers should be:

   - **First layer (top):** A `linear-gradient()` that fades from a semi-transparent dark blue at the top to a deeper, slightly more opaque dark blue at the bottom. Use `rgba()` for both color values. The `rgba()` function takes four values — red, green, blue, and alpha — where alpha controls opacity (0 is fully transparent, 1 is fully opaque). Use values in the `rgba(0, 20–48, 60–88, ...)` range and keep the alpha values low enough that the campus photo still shows through underneath.
   - **Second layer (bottom):** The campus photo. Use this exact URL and positioning: `url("https://se1400.github.io/labs/assets/campus.jpg") center / cover no-repeat`

   The two layers sit inside the same `background` property, separated by a comma.

   > **Why does the gradient go first?** Background layers are painted in list order — first listed means on top. If you put the photo first, it would sit above the gradient and cover it entirely.

2. Now find the `.hero-overlay` rule and **remove the `background-color` property** from it. The dark overlay you need is now coming from the gradient on `#welcome` — `.hero-overlay` no longer needs its own background. Removing it makes the div fully transparent, which is required for the next step.

   > **Why does this matter for the next step?** The `backdrop-filter` property you'll add in Part 2 only works when the element is transparent. If `.hero-overlay` still has a solid background-color, nothing shows through it and there is nothing to blur.

### Part 2: backdrop-filter

The `backdrop-filter` property applies a visual effect — like a blur — to whatever is *behind* an element, not to the element itself. This is the key difference from `filter`, which affects the element and all of its contents. For `backdrop-filter` to have any visible effect, the element must be transparent (or semi-transparent) so that content behind it shows through.

3. In the `.hero-overlay` rule, add the `backdrop-filter` property with the value `blur(3px)`. This softens the campus photo and gradient that are visible behind the overlay, giving the hero section a cinematic, slightly dreamy quality. The text inside `.hero-content` is *inside* the overlay, not behind it, so the text stays sharp.

   > **Connecting Steps 2 and 3:** You made `.hero-overlay` transparent in Step 2. That's what allows `backdrop-filter` to work here — the campus photo now shows through the overlay, and `backdrop-filter: blur()` blurs that visible content.

### Part 3: Gradient Text

The `background-clip: text` technique clips an element's background to the exact shape of its text characters. When you pair this with a transparent text color, the gradient (or image) you set as the background fills the letter shapes instead of a solid color. The effect requires four properties working together inside the same rule.

4. In your CSS file, find the `h1` rule. **Inside that same rule**, add these four properties:

   - A `background` property using a `linear-gradient()` that goes `to right`, starting with `var(--ut-navy)` and ending with `var(--ut-red)`. The `var()` function references a CSS custom property (a variable) that's already defined at the top of your CSS file — `--ut-navy` is dark blue and `--ut-red` is Utah Tech's red. Using variables here means if the brand colors ever change, you only update them once.
   - `-webkit-background-clip` with the value `text` — this is required for the effect to work in Chrome and Safari.
   - `background-clip` with the value `text` — this is the standard version required for Firefox and other browsers.
   - `color` with the value `transparent` — this hides the solid text color so the gradient background shows through the letter shapes.

   All four of these properties go inside the existing `h1 { }` rule alongside `margin` and `font-family`. Do not create a new rule.

   > **Why does `color` need to be transparent?** The solid text color sits on top of the background. Without setting it to transparent, the solid color covers the gradient entirely and the effect disappears.

   > **Why two `background-clip` lines?** The `-webkit-` prefixed version was introduced first and is still required by Chrome and Safari, even though the unprefixed version is now the standard. Both lines together ensure the effect works across all browsers.

### Part 4: Radial & Conic Gradients

`linear-gradient()` fades colors along a straight line. CSS provides two other gradient types that work differently:

- A **radial gradient** starts at a center point and radiates outward in a circular or elliptical shape — like a spotlight shining on a surface.
- A **conic gradient** sweeps colors around a center point — like the hands of a clock moving through a color wheel.

5. In the `header` rule, find the `background-color: whitesmoke` declaration and **replace that line** with a `background` property. Use this exact gradient value:

   ```
   radial-gradient(circle at 50% 50%, #fff 0%, #eee 70%)
   ```

   This creates a circular white glow in the center of the header that fades to light gray at the edges. The keyword `circle` forces a perfectly circular shape — without it, the gradient would stretch into an ellipse to fill the element. `50% 50%` places the center of the glow in the middle of the header.

6. In the `.featured` rule, add a `background` property using `conic-gradient()`. The conic-gradient function takes a starting angle (using the keyword `from` followed by a degree value like `200deg`), a center point (using the keyword `at` followed by two percentage values), and then a list of colors with optional percentage stops.

   Choose soft, light colors that keep the card text readable — light blues, off-whites, and light pinks all complement the Utah Tech palette well. The goal is a subtle sweep of color that makes the featured card stand out from the plain white cards without being distracting.

   > **What is a conic gradient?** Imagine a clock face where each hour mark is a different color blending into the next. That's a conic gradient — colors sweep around the center rather than fading outward or along a line.

### Part 5: Border Radius, Box Shadow & Aspect Ratio

Three CSS properties that add visual polish and consistency to UI elements:

- `border-radius` rounds the corners of an element. You can round all four corners equally or set each corner individually.
- `box-shadow` adds a soft drop shadow behind an element, making it appear to float slightly above the surface behind it.
- `aspect-ratio` locks the relationship between an element's width and height so elements in a grid stay proportionally consistent regardless of their content.

7. Find the `.program-card` rule and the `.panel` rule. Add `border-radius` with the value `0 0 0.5rem 0.5rem` to **both** rules separately. This rounds only the bottom-left and bottom-right corners, leaving the top edge flat where the red `border-top` accent line sits.

   > **border-radius shorthand order:** The four values go clockwise starting from the top-left corner: top-left, top-right, bottom-right, bottom-left. So `0 0 0.5rem 0.5rem` means flat top, rounded bottom.

8. In the `.program-card` rule, add `box-shadow` with the value `0 2px 8px rgba(0, 0, 0, 0.08)`. The four values are: horizontal offset, vertical offset, blur radius, and color. `0 2px` shifts the shadow slightly downward with no left-right offset. `8px` gives it a soft spread. The alpha value in `rgba()` here is `0.08` — very low — which keeps the shadow barely visible, just enough to create a subtle sense of depth without looking heavy.

9. In the `.program-card` rule, add `aspect-ratio` with the value `1`. A ratio of 1 means the width and height are equal — every card becomes a perfect square regardless of how much text it contains. Consistent proportions make the card grid feel structured and intentional.

   > **What about the featured card?** The `.featured` rule already has `aspect-ratio: auto`, which overrides the value of `1` on that card only. So the featured card still grows to fit its content while all other cards stay square.

### Part 6: :nth-child & :focus-visible

Two pseudo-class selectors that give you precise control over *which* elements are styled and *when*:

- `:nth-child()` selects elements based on their numbered position among their siblings. It lets you style every other row, every third item, or any repeating pattern.
- `:focus-visible` selects an element only when it receives keyboard focus — not when it's clicked with a mouse. This is the modern, accessible way to show focus indicators only to the users who need them.

10. In your CSS, find the rule `tbody tr:nth-child(even)`. Change the keyword `even` to `odd`. That single word change switches which rows are highlighted — odd-numbered rows (1st, 3rd, 5th) instead of even-numbered rows (2nd, 4th, 6th). Nothing else in the rule needs to change.

    > **The formula behind the keywords:** `even` is shorthand for `2n` and `odd` is shorthand for `2n+1`. Any repeating pattern can be written as `an+b` — for example, `3n+2` selects every 3rd element starting from the 2nd.

11. Below the existing nav link rules in your CSS, create a new CSS rule using the selector `nav a:focus-visible`. A CSS rule is a selector followed by a pair of curly braces with your declarations inside. Add the `outline` property with the value `2px solid var(--ut-white)`, and add `outline-offset` with the value `4px`. The `outline-offset` property pushes the outline ring slightly away from the element's edge, making it easier to see against the navy background.

    `:focus-visible` fires only when a link is focused via keyboard navigation (Tab key), not when it's clicked with a mouse. Keyboard users get a clear visible ring; mouse users never see it.

12. Find the `.skip-link:focus` rule near the bottom of your CSS. Change only the selector — update the text `.skip-link:focus` to `.skip-link:focus-visible`. The property values inside the curly braces stay exactly the same. You are only renaming the part before the opening brace.

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
