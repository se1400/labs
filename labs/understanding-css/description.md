# Understanding Cascading Style Sheets

In this lab, you'll learn the fundamentals of CSS (Cascading Style Sheets) by styling the Utah Tech University page you built in the previous lab. You will practice using external stylesheets, internal stylesheets, and inline styles while learning about element selectors, class selectors, and ID selectors.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** CSS rules follow this format: `selector { property: value; }`. Each property-value pair ends with a semicolon. Multiple properties can be included within the same rule.

## Instructions:

### Part 1: Link External Stylesheet

1. In the <code>&lt;head&gt;</code> element, add a <code>&lt;link&gt;</code> element with a <code>rel</code> attribute set to <code>stylesheet</code> and an <code>href</code> attribute set to <code>styles.css</code>. This connects your HTML to your external CSS file.

### Part 2: Basic Element Selectors

2. In your CSS file, create a <code>body</code> selector and set the following properties:
   - <code>font-family</code> to <code>Arial, Helvetica, sans-serif</code>
   - <code>color</code> to <code>#003058</code> (dark blue)
   - <code>background-color</code> to <code>#ffffff</code>
   - <code>line-height</code> to <code>1.6</code>
   - <code>margin</code> to <code>0</code>
   - <code>padding</code> to <code>16px</code>

3. Create a <code>header</code> selector and set:
   - <code>padding</code> to <code>12px</code>
   - <code>background-color</code> to <code>#f2f2f2</code> (light gray)

4. Create a <code>nav</code> selector and set:
   - <code>margin-top</code> to <code>12px</code>
   - <code>padding</code> to <code>10px</code>
   - <code>background-color</code> to <code>#003058</code> (dark blue)
   - <code>color</code> to <code>#ffffff</code> (white)

5. Create an <code>h1</code> selector and set <code>margin</code> to <code>0</code>.

6. Create a grouped selector for <code>h2</code>, <code>h3</code>, and <code>h4</code>. A grouped selector applies the same styles to multiple elements by separating each selector with a comma. Your selector should look like this: <code>h2, h3, h4</code>. Inside this single rule, set:
   - <code>color</code> to <code>#BA1C21</code> (Utah Tech red)
   - <code>margin-top</code> to <code>0</code>

   **Example of a grouped selector:**
   ```css
   h2, h3, h4 {
     color: #BA1C21;
     margin-top: 0;
   }
   ```

7. Create a <code>footer</code> selector and set:
   - <code>margin-top</code> to <code>16px</code>
   - <code>padding-top</code> to <code>10px</code>
   - <code>color</code> to <code>#444444</code> (dark gray)
   - <code>text-align</code> to <code>center</code>

8. Create an <code>address</code> selector and set:
   - <code>font-style</code> to <code>normal</code>
   - <code>line-height</code> to <code>1.4</code>

### Part 3: Class Selectors

Class selectors target elements that have a specific <code>class</code> attribute. In CSS, class selectors always start with a dot (<code>.</code>).

9. In your HTML, add <code>class="panel"</code> to both <code>&lt;section&gt;</code> elements and to the <code>&lt;aside&gt;</code> element.

10. In your CSS file, create a <code>.panel</code> selector (the dot is required—without it, CSS would look for a <code>&lt;panel&gt;</code> element which doesn't exist) and set:
    - <code>background-color</code> to <code>#f7f7f7</code>
    - <code>padding</code> to <code>12px</code>
    - <code>margin-top</code> to <code>12px</code>

### Part 4: ID Selectors

ID selectors target a single element that has a specific <code>id</code> attribute. In CSS, ID selectors always start with a hash/pound sign (<code>#</code>).

11. In your HTML, add <code>id="visit-campus"</code> to the <code>&lt;aside&gt;</code> element.

12. In your CSS file, create a <code>#visit-campus</code> selector (the hash is required—without it, CSS would look for a <code>&lt;visit-campus&gt;</code> element which doesn't exist) and set <code>background-color</code> to <code>#eef3f7</code> (light blue).

**Note:** The aside now has both the <code>.panel</code> class AND the <code>#visit-campus</code> ID. The ID selector is more specific, so its background color overrides the panel's background color. This is the CSS cascade in action!

### Part 5: Internal (Embedded) Stylesheet

An internal stylesheet is CSS written directly in your HTML file inside a <code>&lt;style&gt;</code> element. This is different from the external CSS file you've been working in.

13. In your HTML <code>&lt;head&gt;</code> element, after the <code>&lt;link&gt;</code> element, add a <code>&lt;style&gt;</code> element with opening and closing tags: <code>&lt;style&gt;&lt;/style&gt;</code>

14. Inside your <code>&lt;style&gt;</code> element (not in your external CSS file), create a <code>.tagline</code> selector and set <code>font-style</code> to <code>italic</code>. Your style element should look like this:
    ```html
    <style>
      .tagline {
        font-style: italic;
      }
    </style>
    ```

15. In your HTML, find the <code>&lt;p&gt;</code> element inside the <code>&lt;header&gt;</code> that contains "Active Learning. Active Life." and add <code>class="tagline"</code> to it.

### Part 6: Inline Styles

Inline styles are CSS written directly on an HTML element using the <code>style</code> attribute. Use the hex color format (e.g., <code>#BA1C21</code>) not rgb format.

16. In your HTML, find the text "Active Life." inside the tagline paragraph. Wrap ONLY "Active Life." (including the period) in a <code>&lt;span&gt;</code> element with <code>style="color: #BA1C21;"</code> to make it Utah Tech red. The paragraph should now read: <code>Active Learning. &lt;span style="color: #BA1C21;"&gt;Active Life.&lt;/span&gt;</code>

**Note:** This lab covers the three ways to add CSS (external, internal, and inline) and three types of selectors (element, class, and ID). Understanding how these work together through the cascade is fundamental to CSS.
