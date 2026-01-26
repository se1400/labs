# Understanding JavaScript

In this lab, you'll learn the fundamentals of JavaScript by adding interactive functionality to your Utah Tech University page. You'll create a button that shows and hides tour hours information.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** JavaScript code must follow specific syntax rules. Pay close attention to capitalization, punctuation, and matching brackets. JavaScript is case-sensitive, meaning `getElementById` is different from `getElementByID`.

## Instructions:

### Part 1: Add Interactive HTML Elements

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

**Note:** The `id` attributes are important because JavaScript will use them to find these specific elements.

### Part 2: Link an External JavaScript File

External JavaScript files (`.js` files) keep your code organized and separate from your HTML. The `<script>` tag tells the browser to load and run JavaScript code.

3. Just before the closing `</body>` tag at the bottom of your HTML file, add a `<script>` element with a `src` attribute set to `"script.js"`:

   ```html
       <script src="script.js"></script>
   </body>
   </html>
   ```

**Note:** We place the `<script>` tag at the bottom of `<body>` so the HTML content loads first before the JavaScript runs.

### Part 3: Create the JavaScript File

4. Create a new file called `script.js` in the same folder as your HTML file.

5. Copy the following JavaScript code into your `script.js` file. This code waits for the page to load, finds your button and paragraph by their IDs, and listens for clicks. When clicked, it toggles the paragraph between hidden and visible and updates the button text.

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

6. Save both your HTML file and your `script.js` file, then test your page in a browser. Click the "Tour Hours" button—the tour hours should appear and the button text should change. Click again to hide them.

**Note:** If the button doesn't work, check that your `script.js` file is in the same folder as your HTML file and that the `id` values match exactly (they are case-sensitive).

## Summary

In this lab, you learned how to:

- Add HTML elements that JavaScript can interact with
- Link an external JavaScript file using `<script src="...">`
- Place scripts at the bottom of `<body>` so HTML loads first
- Create interactive functionality that responds to user clicks
