# Colors, Images & Media

In this lab, you'll transform your Utah Tech University page using a color system, multiple image formats, and embedded video. You'll learn how CSS custom properties make colors easier to manage, how different image formats serve different purposes, and how to embed video with captions for accessibility.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** This lab builds on your completed page from the Understanding Links lab. Your starter page already has navigation, links, and styling in place. You'll be modifying both the HTML and CSS files throughout this lab.

## Instructions:

### Part 1: CSS Custom Properties

Right now, the color <code>#003058</code> (Utah Tech navy) appears in many places across your CSS file. If you ever needed to change it, you'd have to find and update every instance. CSS custom properties solve this problem — you define a color once, give it a name, and reference that name everywhere.

Custom properties are defined inside a <code>:root</code> selector (which targets the entire document) and always start with two dashes. You reference them using the <code>var()</code> function.

1. At the very top of your CSS file (before any other rules), add a <code>:root</code> rule. Inside it, define these five custom properties:

   - <code>--ut-navy</code> with value <code>#003058</code>
   - <code>--ut-red</code> with value <code>#BA1C21</code>
   - <code>--ut-white</code> with value <code>#ffffff</code>
   - <code>--ut-light-gray</code> with value <code>#f2f2f2</code>
   - <code>--ut-panel-gray</code> with value <code>#f7f7f7</code>

   Each line inside the rule follows the pattern: <code>--name: value;</code>

2. Now go through your CSS file and replace hardcoded color values with <code>var()</code> references. Find each of these properties and swap the hex code for the matching variable:

   - In the <code>body</code> rule, replace the <code>color</code> value with <code>var(--ut-navy)</code>
   - In the <code>body</code> rule, replace the <code>background-color</code> value with <code>var(--ut-white)</code>
   - In the <code>nav</code> rule, replace the <code>background-color</code> value with <code>var(--ut-navy)</code>
   - In the <code>nav</code> rule, replace the <code>color</code> value with <code>var(--ut-white)</code>

   After saving, the page should look exactly the same — you're just making the colors easier to manage.

### Part 2: Page Layout Updates

Before adding images and media, let's update the page layout so the new elements will look right. These changes use CSS properties you already know.

3. Make these changes to your CSS file:

   - In the <code>body</code> rule, change <code>padding</code> from <code>16px</code> to <code>0</code>. This lets the header and nav stretch to the full width of the page.
   - In the <code>header</code> rule, change <code>padding</code> from <code>12px</code> to <code>16px</code> for a bit more breathing room.
   - In the <code>nav</code> rule, remove the <code>margin-top</code> property entirely, and add <code>text-align: center</code> so the nav links are centered.
   - In the <code>.panel</code> rule, change <code>padding</code> to <code>16px 24px</code> (this is shorthand — 16px top/bottom, 24px left/right). Also remove the <code>margin-top</code> and <code>min-height</code> properties.
   - In the <code>h2, h3, h4</code> rule, replace the hardcoded color <code>#BA1C21</code> with <code>var(--ut-red)</code>.

4. Add a <code>border-top</code> to the <code>.panel</code> rule. The <code>border</code> property takes three values: width, style, and color. Set it to <code>3px solid var(--ut-red)</code>. Notice how you can use a CSS variable as the border color — variables work anywhere you'd use a color value.

### Part 3: Color Formats

CSS supports many ways to write colors beyond hex codes. You've been using hex (<code>#003058</code>), but there are also named colors, RGB, and HSL.

5. In the <code>header</code> rule, change the <code>background-color</code> value to the named color <code>whitesmoke</code>. CSS recognizes about 140 built-in color names — just type the name directly, no quotes or hash symbol needed.

6. In the <code>a:hover</code> rule, change the <code>color</code> value from <code>#D32F2F</code> to <code>hsl(0, 65%, 51%)</code>. HSL stands for Hue (a position on the color wheel from 0 to 360), Saturation (intensity, from 0% to 100%), and Lightness (brightness, from 0% to 100%). A hue of 0 is red, 120 is green, and 240 is blue.

### Part 4: SVG Logo

Different image formats serve different purposes. SVG (Scalable Vector Graphics) uses mathematical shapes instead of pixels, so it looks perfectly sharp at any size. This makes SVG ideal for logos and icons.

7. In your HTML file, inside the <code>&lt;header&gt;</code>, add an <code>&lt;img&gt;</code> element before the <code>&lt;h1&gt;</code>. Set three attributes:

   - <code>src</code> pointing to <code>https://se1400.github.io/labs/assets/logo.svg</code>
   - <code>alt</code> with a description of the image (e.g., "Utah Tech University Logo")
   - <code>width</code> set to <code>200</code>

8. In your CSS file, add a <code>header img</code> rule (this targets any <code>&lt;img&gt;</code> inside the <code>&lt;header&gt;</code>) and set <code>margin-bottom</code> to <code>8px</code>. This creates a small gap between the logo and the university name below it.

### Part 5: Hero Background Image

A background image is applied through CSS rather than an HTML <code>&lt;img&gt;</code> tag. It sits behind the element's content, so you can layer text and other elements on top of it. You'll use this to turn the welcome section into a hero banner.

9. In your HTML file, find the <code>#welcome</code> section and remove <code>class="panel"</code> from it. This section will have its own unique styling instead of using the shared panel style.

10. Inside the <code>#welcome</code> section, wrap all of the existing content (the <code>&lt;h2&gt;</code> and all three <code>&lt;p&gt;</code> elements) in a <code>&lt;div&gt;</code> element with <code>class="hero-overlay"</code>. A <code>&lt;div&gt;</code> is a generic container element — it has no semantic meaning like <code>&lt;section&gt;</code> or <code>&lt;header&gt;</code>, but it's useful when you just need a wrapper for styling purposes.

11. In your CSS file, add a <code>#welcome</code> rule with these three properties:

    - <code>background-image</code> — this tells CSS to display an image behind the element's content. The value uses the <code>url()</code> function: <code>url("https://se1400.github.io/labs/assets/campus.jpg")</code>
    - <code>background-size</code> set to <code>cover</code> — this scales the image to fill the entire element while maintaining its proportions. Parts of the image may be cropped, but there will never be gaps.
    - <code>background-position</code> set to <code>center</code> — this centers the image so the middle of the photo is always visible, even when parts are cropped.

12. Add a <code>.hero-overlay</code> rule. This is where you'll use RGBA — a color format that adds transparency. Set:

    - <code>background-color</code> to <code>rgba(0, 48, 88, 0.8)</code> — RGBA takes four values: Red, Green, Blue (each 0-255), and Alpha (transparency from 0 to 1). An alpha of 0.8 means 80% opaque, letting the campus photo subtly show through.
    - <code>color</code> to <code>var(--ut-white)</code> — white text so it's readable on the dark overlay.
    - <code>padding</code> to <code>32px 24px</code>

13. Add a <code>.hero-overlay h2</code> rule that sets <code>color</code> to <code>var(--ut-white)</code>. Without this, the heading would still use the red color from the <code>h2, h3, h4</code> rule, which wouldn't be readable on the dark background.

### Part 6: Campus Photo with Figure & Picture

JPEG is the most common format for photographs — it compresses well while keeping good visual quality. The <code>&lt;figure&gt;</code> element semantically groups an image with a caption, and the <code>&lt;picture&gt;</code> element lets the browser choose the best image based on the user's screen size.

14. In the <code>#colleges</code> section, after the closing <code>&lt;/ul&gt;</code> tag, add a <code>&lt;figure&gt;</code> element. Inside the figure, add:

    - A <code>&lt;picture&gt;</code> element (this is the container for responsive image sources)
    - After the <code>&lt;/picture&gt;</code>, a <code>&lt;figcaption&gt;</code> element with the text "Utah Tech University campus in St. George, Utah"

15. Inside the <code>&lt;picture&gt;</code> element, add two <code>&lt;source&gt;</code> elements and one <code>&lt;img&gt;</code> element. The browser reads the sources top-to-bottom and uses the first one whose <code>media</code> condition matches. The <code>&lt;img&gt;</code> at the bottom is the fallback for any screen size that doesn't match a source.

    Add the elements in this order:

    - A <code>&lt;source&gt;</code> with <code>srcset</code> pointing to <code>https://se1400.github.io/labs/assets/campus-large.jpg</code> and <code>media</code> set to <code>(min-width: 1200px)</code>
    - A <code>&lt;source&gt;</code> with <code>srcset</code> pointing to <code>https://se1400.github.io/labs/assets/campus-medium.jpg</code> and <code>media</code> set to <code>(min-width: 600px)</code>
    - An <code>&lt;img&gt;</code> with <code>src</code> pointing to <code>https://se1400.github.io/labs/assets/campus-small.jpg</code>, an <code>alt</code> attribute describing the image, and <code>width</code> set to <code>480</code>

    Try resizing your browser window — you should see different images appear at different widths. This is how real websites serve appropriately sized images to save bandwidth on smaller devices.

16. In your CSS file, add a <code>#colleges figure</code> rule with <code>margin</code> set to <code>16px 0 0 0</code>. Then add a <code>#colleges figcaption</code> rule with <code>color</code> set to <code>rgb(68, 68, 68)</code> and <code>margin-top</code> set to <code>4px</code>. RGB specifies colors using Red, Green, and Blue values from 0 to 255. This dark grey is more subtle than black for a caption.

### Part 7: Video with Captions

The <code>&lt;video&gt;</code> element embeds video content, similar to how <code>&lt;img&gt;</code> embeds images. The <code>&lt;track&gt;</code> element provides text tracks (like captions or subtitles) for accessibility — this is important so that people who are deaf or hard of hearing can follow along.

17. In the <code>#welcome</code> section, inside the <code>.hero-overlay</code> div, after the last <code>&lt;p&gt;</code> element, add a <code>&lt;video&gt;</code> element with the <code>controls</code> attribute (this adds play/pause/volume buttons) and <code>width</code> set to <code>320</code>.

18. Inside the <code>&lt;video&gt;</code>, add two child elements:

    - A <code>&lt;source&gt;</code> element with <code>src</code> set to <code>https://se1400.github.io/labs/assets/video.mp4</code> and <code>type</code> set to <code>video/mp4</code>. The <code>type</code> attribute tells the browser what format the video is in.
    - A <code>&lt;track&gt;</code> element with four attributes: <code>src</code> set to <code>https://se1400.github.io/labs/assets/video.vtt</code>, <code>kind</code> set to <code>captions</code>, <code>srclang</code> set to <code>en</code> (for English), and <code>label</code> set to <code>English</code>. The label is what users see in the video player's caption menu.

### Part 8: Footer Redesign with PNG Image

PNG (Portable Network Graphics) supports transparency, making it the right format for images like seals and logos that need to sit on different backgrounds without a white box around them.

19. In your HTML file, in the <code>&lt;footer&gt;</code>, after the <code>&lt;hr&gt;</code> and before the copyright paragraph, add an <code>&lt;img&gt;</code> element for the university seal:

    - <code>src</code> pointing to <code>https://se1400.github.io/labs/assets/seal.png</code>
    - <code>alt</code> with a description (e.g., "Utah Tech University Seal")
    - <code>width</code> set to <code>80</code>

20. In your CSS file, update the <code>footer</code> rule. Replace the existing <code>margin-top</code> and <code>padding-top</code> properties with <code>padding: 16px</code>. Add <code>background-color</code> set to <code>var(--ut-navy)</code> and <code>color</code> set to <code>var(--ut-white)</code>. The footer should now have a dark navy background with white text.

21. The footer links are now hard to see on the dark background. Add a <code>footer a:link, footer a:visited</code> rule with <code>color</code> set to <code>var(--ut-white)</code>. Then add a <code>footer a:hover</code> rule with <code>color</code> set to <code>hsl(0, 65%, 51%)</code>. This follows the same pattern you used for nav links in the previous lab — descendant selectors with pseudo-classes to override the general link colors for a specific area.

22. Add a <code>#visit</code> rule with <code>background-color</code> set to <code>var(--ut-light-gray)</code>. This gives the Visit Campus aside a slightly different shade from the other panels.

### Part 9: CSS Filter

CSS filters let you apply visual effects to any element — things like blur, brightness, contrast, and grayscale. You'll use grayscale to create a hover effect on the university seal.

23. In your CSS file, add a <code>footer img</code> rule with <code>filter</code> set to <code>grayscale(100%)</code>. This makes the seal appear completely black and white.

24. Add a <code>footer img:hover</code> rule with <code>filter</code> set to <code>grayscale(0%)</code>. Now when you hover over the seal, it reveals its full color. Try it — you should see the color appear and disappear as you move your mouse over the seal.

## Summary

In this lab, you learned:

- **CSS Custom Properties** — Defining reusable color variables in <code>:root</code> and referencing them with <code>var()</code>
- **Named Colors** — Using CSS color names like <code>whitesmoke</code> instead of hex codes
- **HSL Colors** — Specifying colors with Hue, Saturation, and Lightness
- **RGB Colors** — Specifying colors with Red, Green, and Blue values (0-255)
- **RGBA Transparency** — Adding an alpha channel for semi-transparent colors
- **Background Images** — Using <code>background-image</code> with <code>background-size: cover</code> to fill an element
- **SVG Images** — Using scalable vector graphics for logos that stay sharp at any size
- **JPEG Photos** — Displaying photographs with standard compression
- **PNG Images** — Using images with transparent backgrounds
- **Figure & Figcaption** — Semantically grouping images with captions
- **Picture Element** — Serving different images based on screen size for performance
- **Video with Captions** — Embedding video with <code>&lt;source&gt;</code> and <code>&lt;track&gt;</code> for accessibility
- **CSS Filters** — Applying visual effects like <code>grayscale()</code> with hover interactions
- **Border Property** — Adding decorative borders using CSS variables for color
