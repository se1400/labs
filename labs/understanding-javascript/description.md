# Understanding JavaScript

In this lab, you'll add interactive functionality to your Utah Tech University page using JavaScript. You'll learn two ways to add JavaScript: inline (directly in HTML attributes) and external (in a separate `.js` file).

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** JavaScript is case-sensitive. `getElementById` is different from `getElementByID`. Pay close attention to capitalization and spelling.

## Instructions:

### Part 1: Add HTML Elements for the Toggle Feature

1. In your HTML file, find the `<aside>` element with `id="visit-campus"`. After the existing `<p>` element that contains "Schedule a tour today!", add a `<button>` element:

   ```html
   <button type="button" id="toggle-hours">Tour Hours</button>
   ```

2. After your new button, add a hidden paragraph with the tour hours:

   ```html
   <p id="office-hours" hidden>
       Tour hours:<br>
       Monday through Friday, 8AM - 5PM<br>
       Saturday, 9AM - 2PM<br>
       Sunday, Closed<br>
   </p>
   ```

### Part 2: Add Inline JavaScript

Inline JavaScript is written directly inside an HTML attribute. This is useful for simple, one-line actions.

3. Find the paragraph that contains "Call us at (435) 652-7500". Wrap the phone number in an `<a>` element with an `onclick` attribute that displays an alert:

   ```html
   <a href="#" onclick="alert('Call us at (435) 652-7500');">(435) 652-7500</a>
   ```

   The full paragraph should now look like:
   ```html
   <p>Schedule a tour today!<br>
   Call us at <a href="#" onclick="alert('Call us at (435) 652-7500');">(435) 652-7500</a></p>
   ```

### Part 3: Create the External JavaScript

External JavaScript files keep your code organized and separate from your HTML. In LiveCodes, the JS panel on the right represents your external JavaScript file.

4. In the JS panel, copy the following code. This code waits for the page to load, finds your button and paragraph by their IDs, and adds a click listener. When clicked, it toggles the paragraph between hidden and visible and updates the button text.

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

5. Test your page:
   - Click the phone number link—an alert should appear
   - Click the "Tour Hours" button—the hours should appear and the button text should change

## Summary

In this lab, you learned two ways to add JavaScript:

- **Inline JavaScript** - Written in HTML attributes like `onclick`, good for simple actions
- **External JavaScript** - Written in a separate `.js` file (the JS panel in LiveCodes), better for organized code
