# Spacing, Alignment & Float

In this lab, you'll refine your Utah Tech University page by mastering CSS spacing and layout techniques. You'll learn how the box model works, how to use margin and padding shorthand efficiently, how to center content with auto margins, how to use scalable rem units, and how to float an image so text wraps around it.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** This lab builds on your completed page from the Colors, Images & Media lab. Your starter page already has CSS variables, images, video, and styling in place. You'll be modifying both the HTML and CSS files throughout this lab.

## Instructions:

### Part 1: The Box Model & box-sizing

Every HTML element is a rectangular box made up of four layers: **content** (your text or image), **padding** (space between the content and the border), **border** (the edge of the box), and **margin** (space outside the border that separates the element from its neighbors).

By default, CSS adds padding and border ON TOP of the element's width. So if you set an element to <code>width: 200px</code> and add <code>padding: 20px</code>, the element actually takes up 240px of space. This is confusing and causes layout surprises.

The <code>box-sizing: border-box</code> property fixes this. It tells the browser to INCLUDE padding and border within the element's width. A 200px element with 20px of padding stays at 200px total — the content area shrinks to 160px to make room.

1. In your CSS file, right after the <code>:root</code> rule, add a new rule that targets <code>*, *::before, *::after</code>. The <code>*</code> selector matches every element on the page. The <code>::before</code> and <code>::after</code> are pseudo-elements that some CSS techniques create — you want them included too. Inside this rule, set <code>box-sizing</code> to <code>border-box</code>.

   This is a standard CSS reset that nearly every modern website uses. You set it once and forget about it.

### Part 2: Centering with Auto Margins

Right now, your page content stretches from edge to edge. On wide screens, text lines get very long and hard to read. Professional websites constrain their content to a comfortable reading width and center it on the page. You'll do this using the <code>margin: 0 auto</code> technique.

When you set the left and right margins to <code>auto</code>, the browser calculates the remaining space and splits it equally on both sides — centering the element. This only works on block elements that have a set width (or max-width).

2. You'll add the <code>container</code> class in two places so that all page content is centered consistently while the hero background still spans full width.

   First, in the <code>#welcome</code> section, inside the <code>.hero-overlay</code> div, wrap all of the existing content (the <code>&lt;h2&gt;</code>, the <code>&lt;p&gt;</code> elements, and the <code>&lt;video&gt;</code>) in a <code>&lt;div&gt;</code> with <code>class="container"</code>. This centers the hero text without affecting the full-width background.

   Second, find the closing <code>&lt;/section&gt;</code> tag of the <code>#welcome</code> section. After it, wrap all of the remaining content — the <code>#colleges</code>, <code>#apply</code>, <code>#tuition</code> sections and the <code>#visit</code> aside — inside another <code>&lt;div&gt;</code> with <code>class="container"</code>.

3. In your CSS file, add a <code>.container</code> rule with three properties:

   - <code>max-width</code> set to <code>960px</code> — this limits how wide the content can get. On screens wider than 960px, the content stops growing and centers itself.
   - <code>margin</code> set to <code>0 auto</code> — zero margin on top and bottom, <code>auto</code> on left and right. This is the centering technique.
   - <code>padding</code> set to <code>0 1.5rem</code> — this adds horizontal padding so content doesn't touch the screen edges on smaller devices. (You'll learn about <code>rem</code> units in Part 5.)

   Save and check your page — the panel sections should now be centered with a maximum width, while the hero section still stretches full width.

### Part 3: Margin Shorthand

You've already been using margin shorthand in previous labs, but let's formally learn the pattern. Margin (and padding) shorthand follows a **clockwise** pattern starting from the top:

- **1 value:** <code>margin: 16px</code> — all four sides get 16px
- **2 values:** <code>margin: 16px 24px</code> — top/bottom get 16px, left/right get 24px
- **3 values:** <code>margin: 16px 24px 8px</code> — top gets 16px, left/right get 24px, bottom gets 8px
- **4 values:** <code>margin: 16px 24px 8px 0</code> — top, right, bottom, left (clockwise)

A helpful way to remember: think of a clock — top (12), right (3), bottom (6), left (9).

4. Right now, the panel sections stack directly on top of each other with no vertical breathing room. In the <code>.panel</code> rule, add <code>margin-bottom</code> set to <code>1.5rem</code>. This creates consistent spacing between each section. (The <code>rem</code> unit will be explained in Part 5 — for now, just know that <code>1.5rem</code> equals 24px.)

5. The <code>#colleges figure</code> rule currently has <code>margin: 16px 0 0 0</code> — that's 4-value shorthand for top: 16px, right: 0, bottom: 0, left: 0. Since the right, bottom, and left values are all 0, you can simplify this. Change it to <code>margin: 1rem 0 0</code> (3-value shorthand: top: 1rem, left/right: 0, bottom: 0). This also converts from px to rem.

### Part 4: Padding Shorthand

Padding follows the exact same shorthand pattern as margin — the difference is that padding adds space INSIDE the element (between the content and the border), while margin adds space OUTSIDE the element (between the border and neighboring elements).

6. The <code>nav</code> rule currently has <code>padding: 10px</code> (1 value = all sides equal). Change it to use 2-value shorthand: <code>0.75rem 1.5rem</code>. This gives the nav more horizontal room for the links while keeping the vertical padding tighter. The first value (0.75rem) applies to top and bottom, and the second value (1.5rem) applies to left and right.

7. The <code>th, td</code> rule has <code>padding: 8px</code>. Change it to <code>0.5rem 0.75rem</code> to give table cells a bit more horizontal space, making the data easier to read.

### Part 5: Converting to rem Units

Up to now, you've been using <code>px</code> (pixels) for all your spacing. Pixels are fixed — <code>16px</code> is always exactly 16 pixels regardless of the user's settings. The <code>rem</code> unit is more flexible. <code>1rem</code> equals the root font size of the document, which is 16px by default. If a user increases their browser's font size for accessibility, rem-based spacing scales up proportionally while px-based spacing stays fixed.

Here's a quick reference: 8px = 0.5rem, 12px = 0.75rem, 16px = 1rem, 24px = 1.5rem, 32px = 2rem.

8. Convert the spacing in your <code>header</code> and <code>footer</code> rules from pixels to rem:

   - In the <code>header</code> rule, change <code>padding</code> from <code>16px</code> to <code>1rem</code>
   - In the <code>footer</code> rule, change <code>padding</code> from <code>16px</code> to <code>1rem</code>

9. Convert the spacing in your panel and hero overlay rules:

   - In the <code>.panel</code> rule, change <code>padding</code> from <code>16px 24px</code> to <code>1rem 1.5rem</code>
   - In the <code>.hero-overlay</code> rule, change <code>padding</code> from <code>32px 24px</code> to <code>2rem 0</code>. The horizontal padding is now <code>0</code> because the <code>.container</code> div inside already provides the horizontal spacing.

   After saving, the page should look the same — rem values at the default font size produce the same result as the equivalent pixel values. The difference only shows when a user changes their browser font size.

### Part 6: Float & Clear

The <code>float</code> property was originally designed for a simple purpose: wrapping text around an image, like you'd see in a newspaper or magazine article. When you float an element, it shifts to the left or right side of its container, and the surrounding content flows around it.

**Important:** Float is for text wrapping around images — it is NOT meant for building page layouts. Modern CSS uses Flexbox and Grid for layout (which you'll learn later). Using float for layout is an outdated practice.

10. In your HTML file, in the <code>#colleges</code> section, move the entire <code>&lt;figure&gt;</code> element (including its <code>&lt;picture&gt;</code> and <code>&lt;figcaption&gt;</code>) to BEFORE the <code>&lt;ul&gt;</code>. The figure should be between the <code>&lt;h3&gt;</code> and the <code>&lt;ul&gt;</code>.

    This matters because float elements must come BEFORE the content you want to wrap around them in the HTML source. If the figure comes after the list, the list won't wrap around it.

11. In your CSS file, modify the <code>#colleges figure</code> rule. Add two new properties:

    - <code>float</code> set to <code>right</code> — this pushes the figure to the right side of the section
    - <code>width</code> set to <code>50%</code> — this constrains the figure to half the section width so the college list has room to wrap beside it

    Also change the <code>margin</code> to <code>0 0 1rem 1rem</code> (4-value shorthand: no top or right margin, 1rem below the image, and 1rem gap between the image and the wrapping text on the left). Try your clockwise memory trick: top: 0, right: 0, bottom: 1rem, left: 1rem.

    Also add a new <code>#colleges figure img</code> rule with <code>width</code> set to <code>100%</code> and <code>height</code> set to <code>auto</code>. This ensures the image scales to fit within the floated figure instead of overflowing past its edges.

    The college list should now wrap around the campus photo on the right side.

12. You may notice that the float can cause the next section to wrap up beside the image as well. The <code>clear</code> property prevents this. It tells an element: "don't allow any floated elements on my side — start below them."

    Add a new CSS rule for <code>#apply</code> with <code>clear</code> set to <code>both</code>. The value <code>both</code> clears floats on both the left and right sides. You could also use <code>clear: right</code> since we only have a right float, but <code>both</code> is a safe default.

## Summary

In this lab, you learned:

- **The Box Model** — Understanding content, padding, border, and margin layers and how <code>box-sizing: border-box</code> makes sizing predictable
- **Auto Margins** — Using <code>margin: 0 auto</code> with a max-width to center block content on the page
- **Margin Shorthand** — The clockwise pattern for 1, 2, 3, and 4 value shorthand (top, right, bottom, left)
- **Padding Shorthand** — The same clockwise pattern applied to inner spacing
- **rem Units** — Using root-relative units instead of pixels for scalable, accessible spacing
- **Float** — Wrapping text around an image using <code>float: right</code> (for text wrapping, not layout)
- **Clear** — Using <code>clear: both</code> to prevent content from wrapping beside a floated element
