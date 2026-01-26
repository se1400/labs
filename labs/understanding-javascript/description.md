# Understanding JavaScript

In this lab, you'll learn the fundamentals of JavaScript by adding interactive functionality to your Utah Tech University page. JavaScript is a scripting language that lets you make web pages interactive—responding to user clicks, showing and hiding content, validating forms, and much more.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** JavaScript code must follow specific syntax rules. Pay close attention to capitalization, punctuation, and matching brackets. JavaScript is case-sensitive, meaning `getElementById` is different from `getElementByID`.

## Instructions:

### Part 1: Understanding How JavaScript Connects to HTML

JavaScript can be added to web pages in three ways:

1. **Inline** - Inside an HTML attribute like `onclick="..."`
2. **Internal** - Inside `<script>` tags in your HTML file
3. **External** - In a separate `.js` file linked to your HTML

External JavaScript files are the preferred method because they keep your code organized and can be reused across multiple pages. In this lab, you'll create an external JavaScript file.

### Part 2: Add Interactive HTML Elements

Before writing JavaScript, you need HTML elements for JavaScript to interact with. You'll add a button that users can click and a paragraph that will show/hide tour hours.

1. In your HTML file, find the `<aside>` element with `id="visit-campus"`. After the existing `<p>` element that contains "Schedule a tour today!", add a `<button>` element with:
   - A `type` attribute set to `"button"`
   - An `id` attribute set to `"toggle-hours"`
   - The text content `Tour Hours`

   Your button should look like this:
   ```html
   <button type="button" id="toggle-hours">Tour Hours</button>
   ```

2. After your new button, add a `<p>` element with:
   - An `id` attribute set to `"office-hours"`
   - A `hidden` attribute (this HTML attribute hides the element by default)
   - The tour hours content shown below

   Your paragraph should look like this:
   ```html
   <p id="office-hours" hidden>
       Tour hours:<br>
       Monday through Friday, 8AM - 5PM<br>
       Saturday, 9AM - 2PM<br>
       Sunday, Closed<br>
   </p>
   ```

**Note:** The `hidden` attribute is a boolean attribute—just including it (without a value) hides the element. The `id` attributes are crucial because JavaScript will use them to find these specific elements.

### Part 3: Link an External JavaScript File

Now you'll connect an external JavaScript file to your HTML. The `<script>` tag tells the browser to load and run JavaScript code.

3. Just before the closing `</body>` tag at the bottom of your HTML file, add a `<script>` element with a `src` attribute set to `"script.js"`:

   ```html
       <!-- External JavaScript file -->
       <script src="script.js"></script>
   </body>
   </html>
   ```

**Note:** We place the `<script>` tag at the bottom of `<body>` (not in `<head>`) so the HTML content loads first. This way, when the JavaScript runs, all the HTML elements already exist on the page.

### Part 4: Create the JavaScript File

Now you'll create the JavaScript file that makes the button work. This script will:
- Wait for the page to fully load
- Find the button and paragraph elements
- Listen for clicks on the button
- Toggle the paragraph between visible and hidden

4. Create a new file called `script.js` in the same folder as your HTML file.

5. Copy the following JavaScript code into your `script.js` file:

```javascript
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggle-hours");
    const hoursParagraph = document.getElementById("office-hours");

    if (!toggleButton || !hoursParagraph) {
        console.error(
            "Visit Campus toggle elements not found. " +
            'Expected ids: "toggle-hours" and "office-hours".'
        );
        return;
    }

    toggleButton.addEventListener("click", function () {
        if (hoursParagraph.hidden) {
            hoursParagraph.hidden = false;
            toggleButton.textContent = "Hide office hours";
        } else {
            hoursParagraph.hidden = true;
            toggleButton.textContent = "Show office hours";
        }
    });
});
```

### Part 5: Understanding the JavaScript Code

Let's break down what each part of the code does:

**`document.addEventListener("DOMContentLoaded", function () { ... });`**

This wraps all our code and tells the browser: "Wait until the HTML page is fully loaded before running this code." Without this, JavaScript might try to find elements that haven't been created yet.

**`const toggleButton = document.getElementById("toggle-hours");`**

This creates a variable called `toggleButton` that stores a reference to the button element. The `const` keyword means this variable won't change. The `document.getElementById()` method searches the page for an element with the specified `id`.

**`const hoursParagraph = document.getElementById("office-hours");`**

Same as above, but finds and stores the paragraph element.

**`if (!toggleButton || !hoursParagraph) { ... return; }`**

This is a safety check. If either element isn't found (perhaps due to a typo in the id), it logs an error message and stops the script. The `!` means "not" and `||` means "or".

**`toggleButton.addEventListener("click", function () { ... });`**

This tells the browser: "When someone clicks on `toggleButton`, run this function." An event listener waits for something to happen (like a click) and then responds.

**`if (hoursParagraph.hidden) { ... } else { ... }`**

This checks if the paragraph is currently hidden. If it is hidden, we show it and change the button text. If it's visible, we hide it and change the button text back.

**`hoursParagraph.hidden = false;`** and **`hoursParagraph.hidden = true;`**

These lines change the `hidden` property of the paragraph, making it visible (`false`) or hidden (`true`).

**`toggleButton.textContent = "Hide office hours";`**

This changes the text displayed on the button.

### Part 6: Test Your Work

6. Save both your HTML file and your `script.js` file.

7. Open your HTML file in a web browser (or refresh if already open).

8. Find the "Visit Campus" section and click the "Tour Hours" button:
   - The tour hours should appear
   - The button text should change to "Hide office hours"

9. Click the button again:
   - The tour hours should disappear
   - The button text should change back to "Show office hours"

**Note:** If the button doesn't work, check that:
- Your `script.js` file is in the same folder as your HTML file
- The `id` values match exactly (they are case-sensitive)
- You saved both files after making changes
- There are no typos in the JavaScript code

## Summary

In this lab, you learned:

- **External JavaScript files** - Using `<script src="...">` to link a `.js` file
- **Script placement** - Why scripts go at the bottom of `<body>`
- **DOMContentLoaded** - Waiting for the page to load before running code
- **Variables with const** - Storing values that won't change
- **getElementById()** - Finding HTML elements by their `id` attribute
- **Event listeners** - Responding to user actions like clicks
- **Conditionals (if/else)** - Making decisions in code
- **DOM manipulation** - Changing element properties like `hidden` and `textContent`

These are fundamental JavaScript concepts that you'll use throughout your web development journey.
