---
title: Understanding JavaScript Lab
type: feat
date: 2026-01-26
---

# Understanding JavaScript Lab

## Overview

Create a lab that introduces students to JavaScript fundamentals by adding interactive functionality to their existing Utah Tech University page. Students will learn to link external JavaScript files, use event listeners, manipulate the DOM, and create a simple show/hide toggle for tour hours.

## Learning Objectives

Students will learn:
1. What JavaScript is and how it enhances web pages
2. How to link an external JavaScript file to HTML
3. What the `<script>` tag is and where to place it
4. Basic JavaScript syntax: variables with `const`, functions, conditionals
5. How to select HTML elements using `getElementById()`
6. How to respond to user events with `addEventListener()`
7. How to manipulate element properties (changing text content, hiding/showing elements)
8. The importance of `DOMContentLoaded` to ensure the page loads before scripts run

## Source Materials

- PDF: "Lesson - Understanding JavaScript" (8 pages)
- Key concepts covered:
  - What web scripting is
  - JavaScript basics and capabilities
  - The `<script>` tag and placement
  - External JavaScript files with `.js` extension
  - Event handlers and user interaction
  - Variables (const/let)
  - DOM manipulation
  - DOMContentLoaded event

## Student Skill Level

- Students have completed HTML and CSS labs
- This is their FIRST JavaScript lab
- They need code provided with explanations
- Focus on "copy this, place it here, here's what it does"
- Don't expect deep understanding yet—build confidence first

## Changes Required (Starter → Completed)

### HTML Changes
1. Add a `<button>` element with `id="toggle-hours"` and text "Tour Hours"
2. Add a `<p>` element with `id="office-hours"` and the `hidden` attribute
3. Fill paragraph with tour hours content (Mon-Fri 8AM-5PM, etc.)
4. Add `<script src="script.js"></script>` tag before closing `</body>`
5. Add HTML comment explaining the external JavaScript

### CSS Changes
- None (file stays the same)

### JavaScript Changes
- Create entire `script.js` file with:
  - `DOMContentLoaded` event listener wrapper
  - `const` variables to select button and paragraph
  - Error checking with `console.error()` and `return`
  - Click event listener on button
  - Conditional logic to toggle `hidden` property
  - Change button text based on state

## Implementation Plan

### Part 1: Introduction to JavaScript
- Brief explanation of what JavaScript does (interactivity)
- Mention that scripts can be internal (`<script>` tags) or external (`.js` files)
- Explain that external files are better for organization

### Part 2: Add HTML Elements for Interactivity
**Steps:**
1. Add button inside the "Visit Campus" aside
2. Add paragraph with tour hours
3. Explain the `hidden` attribute (hides element by default)
4. Link the external JavaScript file

**Teaching Points:**
- `id` attributes let JavaScript find specific elements
- The `hidden` attribute is a simple way to hide content
- `<script src="...">` goes before `</body>` so HTML loads first

### Part 3: Create External JavaScript File
**Steps:**
1. Create `script.js` file
2. Provide complete JavaScript code in one block
3. Explain each section with comments

**Teaching Points:**
- `DOMContentLoaded` - waits for page to load before running script
- `const` - creates a variable that won't change
- `getElementById()` - finds an element by its id
- `addEventListener()` - responds to user actions (like clicks)
- `if/else` - checks conditions and does different things
- `.hidden` - property that shows/hides elements
- `.textContent` - property that changes text inside an element

### Part 4: Testing the Result
- Save files and refresh browser
- Click button to test toggle functionality
- Button text should change
- Tour hours should appear/disappear

## Code Blocks to Provide

### HTML Button and Paragraph (to add to aside)
```html
<button type="button" id="toggle-hours">Tour Hours</button>

<p id="office-hours" hidden>
    Tour hours:<br>
    Monday through Friday, 8AM - 5PM<br>
    Saturday, 9AM - 2PM<br>
    Sunday, Closed<br>
</p>
```

### Script Tag (to add before </body>)
```html
<!-- External JavaScript file -->
<script src="script.js"></script>
```

### Complete script.js File
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

## Test Requirements

### HTML Tests
1. Button exists with `id="toggle-hours"`
2. Button has correct initial text: "Tour Hours"
3. Button has `type="button"`
4. Paragraph exists with `id="office-hours"`
5. Paragraph has `hidden` attribute initially
6. Paragraph contains tour hours content (check for key phrases)
7. Script tag with `src="script.js"` exists before `</body>`

### JavaScript Tests
1. `script.js` file exists and is not empty
2. Code contains `DOMContentLoaded` event listener
3. Code contains `getElementById("toggle-hours")`
4. Code contains `getElementById("office-hours")`
5. Code contains `addEventListener("click")`
6. Code contains conditional logic (if/else or ternary)

### Functional Tests
1. Button click toggles paragraph visibility
2. Button text changes to "Hide office hours" when showing
3. Button text changes back to "Tour Hours" when hiding
4. Paragraph is hidden initially on page load
5. Multiple clicks continue to toggle correctly

## Potential Student Mistakes

1. **Forgetting the script tag** - Test checks for it
2. **Wrong id names** - Case-sensitive, must match exactly
3. **Script tag in wrong location** - Should be before `</body>`
4. **Missing `hidden` attribute** - Paragraph should start hidden
5. **Creating script.js in wrong location** - Should be same directory as HTML
6. **Copying code with syntax errors** - Extra/missing brackets, quotes
7. **Not saving both files** - HTML and JS changes both need saving

## Success Criteria

- [ ] All HTML elements added correctly with proper IDs
- [ ] Script tag links to external `script.js` file
- [ ] JavaScript file created with complete code
- [ ] Button initially shows "Tour Hours"
- [ ] Paragraph is hidden on page load
- [ ] Clicking button shows tour hours
- [ ] Button text changes to "Hide office hours"
- [ ] Clicking again hides tour hours
- [ ] Button text returns to "Tour Hours"
- [ ] All tests pass

## Educational Notes to Include

1. **Why external JavaScript?** - Keeps code organized, can reuse across pages, easier to maintain
2. **Why DOMContentLoaded?** - JavaScript runs immediately, but HTML might not be ready yet. This waits for HTML to finish loading.
3. **Why const instead of var?** - Modern JavaScript best practice, prevents accidental changes
4. **What is the DOM?** - Document Object Model - JavaScript's way of interacting with HTML
5. **What are events?** - Actions that happen (click, hover, key press) that JavaScript can respond to
6. **Why check if elements exist?** - Defensive programming - prevents errors if IDs are mistyped

## Next Lab Preview

The next lab will cover:
- Debugging with developer tools and console
- More complex event handling
- Form validation
- Working with user input

## Notes

- Console.log() statements removed from completed file (can't test effectively)
- Kept console.error() since it's part of error handling logic
- Focus on "copy and understand" rather than "write from scratch"
- Build student confidence with working code first
