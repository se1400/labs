# Colors, Images & Media

In this lab, you'll enhance your Utah Tech University page with a color system using CSS custom properties, multiple image formats, and embedded video. You'll practice using CSS variables, color functions (RGB, HSL, RGBA), the `<picture>` element for responsive images, and the `<video>` element with captions.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** This lab builds on your completed page from the Understanding Links lab. You already have a working page with navigation, links, and styling. Now you'll add a color system, images, and video.

## Instructions:

### Part 1: CSS Custom Properties

CSS custom properties (also called CSS variables) let you define a color once and reuse it everywhere. If you later decide to change a color, you only update it in one place. Custom properties are defined inside a <code>:root</code> selector and always start with two dashes (<code>--</code>). You reference them with the <code>var()</code> function.

1. At the very top of your CSS file (before any other rules), add a <code>:root</code> rule with these five custom properties:

   - <code>--ut-navy: #003058</code>
   - <code>--ut-red: #BA1C21</code>
   - <code>--ut-white: #ffffff</code>
   - <code>--ut-light-gray: #f2f2f2</code>
   - <code>--ut-panel-gray: #f7f7f7</code>

2. Now replace six hardcoded color values in your existing CSS rules with <code>var()</code> references. The page should look exactly the same — you're just switching to variables so colors are easier to manage:

   - <code>body</code> <code>color</code> → <code>var(--ut-navy)</code>
   - <code>body</code> <code>background-color</code> → <code>var(--ut-white)</code>
   - <code>nav</code> <code>background-color</code> → <code>var(--ut-navy)</code>
   - <code>nav</code> <code>color</code> → <code>var(--ut-white)</code>
   - <code>header</code> <code>background-color</code> → <code>var(--ut-light-gray)</code>
   - <code>.panel</code> <code>background-color</code> → <code>var(--ut-panel-gray)</code>

### Part 2: Color Formats

CSS supports several ways to write colors beyond hex codes. In this part, you'll try three other formats.

3. **Named color:** Change the <code>header</code> <code>background-color</code> from <code>var(--ut-light-gray)</code> to the named color <code>whitesmoke</code>. CSS has about 140 built-in color names like <code>red</code>, <code>steelblue</code>, and <code>whitesmoke</code>.

4. **RGB:** Change the <code>footer</code> <code>color</code> from <code>#444444</code> to <code>rgb(68, 68, 68)</code>. RGB specifies Red, Green, and Blue values from 0 to 255.

5. **HSL:** Change the <code>a:hover</code> <code>color</code> from <code>#D32F2F</code> to <code>hsl(0, 65%, 51%)</code>. HSL stands for Hue (0-360 on the color wheel), Saturation (0%-100%), and Lightness (0%-100%). It's often more intuitive than hex or RGB.

### Part 3: Transparency & Borders

6. Add a <code>#visit</code> CSS rule with <code>background-color</code> set to <code>rgba(0, 48, 88, 0.1)</code>. RGBA is like RGB but adds a fourth value for transparency — 0 is fully transparent and 1 is fully opaque. This creates a very light navy tint on the Visit Campus aside, giving it a slightly different look from the other panels.

7. Add a <code>border</code> property to the <code>.panel</code> rule: <code>border: 2px solid var(--ut-red)</code>. Notice how the border uses <code>var(--ut-red)</code> — you can use CSS variables anywhere you'd use a color value.

### Part 4: SVG Logo

Different image formats are suited for different purposes. SVG (Scalable Vector Graphics) is perfect for logos because it uses mathematical shapes instead of pixels, so it looks sharp at any size.

8. Inside the <code>&lt;header&gt;</code>, before the <code>&lt;h1&gt;</code>, add an <code>&lt;img&gt;</code> element for the Utah Tech logo:

   - <code>src="https://se1400.github.io/labs/assets/logo.svg"</code>
   - <code>alt="Utah Tech University Logo"</code>
   - <code>width="200"</code>

### Part 5: Campus Photo with Figure & Picture

9. In the <code>#welcome</code> section, after the last paragraph, add an <code>&lt;img&gt;</code> element for the campus photo:

   - <code>src="https://se1400.github.io/labs/assets/campus.jpg"</code>
   - <code>alt="Aerial view of Utah Tech University campus"</code>
   - <code>width="600"</code>
   - <code>height="400"</code>

   JPEG is the most common format for photographs because it provides good compression while maintaining visual quality.

10. Wrap the campus <code>&lt;img&gt;</code> in a <code>&lt;figure&gt;</code> element. Then add a <code>&lt;figcaption&gt;</code> after the image (but still inside the <code>&lt;figure&gt;</code>) with the text "Utah Tech University campus in St. George, Utah". The <code>&lt;figure&gt;</code> element is a semantic container that groups an image with its caption.

11. Now convert the image to use the <code>&lt;picture&gt;</code> element for format-based responsive images. Wrap the existing <code>&lt;img&gt;</code> in a <code>&lt;picture&gt;</code> element. Before the <code>&lt;img&gt;</code> (but inside <code>&lt;picture&gt;</code>), add a <code>&lt;source&gt;</code> element with:

    - <code>srcset="https://se1400.github.io/labs/assets/campus.webp"</code>
    - <code>type="image/webp"</code>

    The browser checks the <code>&lt;source&gt;</code> elements first. If it supports WebP, it uses that (better compression, smaller file). If not, it falls back to the JPEG <code>&lt;img&gt;</code>. The final structure should be:

    ```
    <figure>
        <picture>
            <source srcset="...campus.webp" type="image/webp">
            <img src="...campus.jpg" alt="..." width="600" height="400">
        </picture>
        <figcaption>...</figcaption>
    </figure>
    ```

### Part 6: Footer Seal

12. In the <code>&lt;footer&gt;</code>, before the <code>&lt;address&gt;</code> element, add an <code>&lt;img&gt;</code> for the university seal:

    - <code>src="https://se1400.github.io/labs/assets/seal.png"</code>
    - <code>alt="Utah Tech University Seal"</code>
    - <code>width="80"</code>

    PNG is the right format here because the seal has a transparent background — JPEG doesn't support transparency.

### Part 7: CSS Filter

CSS filters let you apply visual effects to elements — things like blur, brightness, contrast, and grayscale.

13. In your CSS file, add a <code>footer img</code> rule that applies <code>filter: grayscale(100%)</code>. This makes the seal appear in black and white. Then add a <code>footer img:hover</code> rule that sets <code>filter: grayscale(0%)</code>. Now the seal will reveal its full color when you hover over it.

### Part 8: Video

The <code>&lt;video&gt;</code> element works similarly to <code>&lt;img&gt;</code>, but for moving pictures. Like images, you use a <code>&lt;source&gt;</code> element to specify the file. The <code>&lt;track&gt;</code> element adds captions or subtitles for accessibility.

14. In the <code>#visit</code> aside, after the existing paragraph, add a <code>&lt;video&gt;</code> element with:

    - <code>controls</code> attribute (lets users play, pause, and adjust volume)
    - <code>width="400"</code>
    - Inside, a <code>&lt;source&gt;</code> with <code>src="https://se1400.github.io/labs/assets/video.mp4"</code> and <code>type="video/mp4"</code>
    - Inside, a <code>&lt;track&gt;</code> with <code>src="https://se1400.github.io/labs/assets/video.vtt"</code>, <code>kind="captions"</code>, <code>srclang="en"</code>, and <code>label="English"</code>

### Part 9: Background Image

CSS can also display images as backgrounds behind content. Unlike <code>&lt;img&gt;</code> elements, background images are decorative and not part of the HTML structure.

15. Add (or modify) a <code>#visit</code> CSS rule with:

    - <code>background-image: url("https://se1400.github.io/labs/assets/campus.jpg")</code>
    - <code>background-size: cover</code>

    The <code>url()</code> function tells CSS where to find the image. The <code>cover</code> value scales the image to fill the entire element while maintaining its aspect ratio. Combined with the semi-transparent <code>rgba()</code> background from Part 3, this creates a nice layered effect where the campus photo shows through behind the aside content.

## Summary

In this lab, you learned:

- **CSS Custom Properties** — Defining reusable color variables in <code>:root</code> and referencing them with <code>var()</code>
- **Color Formats** — Using named colors, <code>rgb()</code>, and <code>hsl()</code> in addition to hex codes
- **Transparency** — Using <code>rgba()</code> to create semi-transparent colors
- **Borders with Variables** — Applying CSS variables in border declarations
- **SVG Images** — Using scalable vector graphics for logos and icons
- **JPEG Photos** — Displaying photographs with standard compression
- **Figure & Figcaption** — Semantically grouping images with captions
- **Picture Element** — Providing multiple image formats for browser optimization (WebP with JPEG fallback)
- **PNG Images** — Using PNG for images that need transparency
- **CSS Filters** — Applying visual effects like grayscale with hover interactions
- **Video with Captions** — Embedding video with <code>&lt;source&gt;</code> and <code>&lt;track&gt;</code> for accessibility
- **Background Images** — Using CSS <code>background-image</code> with <code>background-size: cover</code>
