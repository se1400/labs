# JavaScript Events & Decisions

In the last lab you changed the page once — when it loaded — and then JavaScript went silent. This lab is different. You will make the page respond to the user: every click, every keystroke, every form submission. By the end, the Utah Tech admissions form will validate input live, toggle sections on and off, and respond to a submission with a personalized message — all driven by the code you write.

There are **16 tests** and **5 steps**. Run the tests after each step.

---

## Getting Started

Switch to the JS tab. That is where all your work happens. Your code in the JS tab runs automatically against the page you see in the preview — you do not need to connect them yourself.

Every step in this lab follows the same pattern: select an element, attach an event listener, then write the code that should run when that event fires. That code is called a **handler** — it is just a function that the browser calls for you each time the event happens. Inside every handler, `event.target` refers to the specific element the user interacted with, and `event.target.value` is what they typed or selected in it.

> **Console tip:** Add `console.log(event.target)` inside any handler to inspect the element, and `console.log(event.target.value)` to see the current value as the user interacts. This is the fastest way to understand what is happening.

---

## Step 1 — click: Toggle the Areas of Interest Section

The admissions form has an Areas of Interest section with a small button inside its heading that reads "Hide". Your job is to make that button work so it collapses and expands the checkboxes below it.

Before you write a single line of JavaScript, open the CSS tab and search for a class called `hidden`. You will find it there — it simply sets `display: none`, which makes any element invisible. Your JavaScript's job is to add and remove that class at the right moment. This is how JavaScript and CSS work together: CSS defines what a state looks like, and JavaScript decides when to switch into it.

When the user clicks the button:
- The checkboxes should disappear — the `hidden` CSS class needs to be added to the `#interests-content` div.
- The button label should change from "Hide" to "Show".
- When the user clicks again, the checkboxes should reappear — the `hidden` class should be removed.
- The button label should flip back to "Hide".

**What you need:**

Start by selecting `#toggle-interests` (the button) and attaching a `click` listener to it. Everything else happens inside that listener.

**First — toggle the content.** Select `#interests-content` and use `classList.toggle` with the class name `'hidden'`. This method works in both directions automatically: if the class is not there, it adds it; if it is already there, it removes it. One method, two directions.

**Second — check the result.** After the toggle, you need to know whether the content is now hidden or visible, so you can update the button label. Use `classList.contains` with `'hidden'` to check — it gives back `true` if the class is present, and `false` if it is not.

**Third — update the button label.** Use the **ternary operator** to pick the right label based on that true or false result. The ternary is a one-line way to choose between two values: write your condition, then a question mark, then the value to use if true, then a colon, then the value to use if false. Your condition is whether the content is hidden, and your two values are the strings `'Show'` and `'Hide'`. Set the button's `textContent` to whichever one the ternary picks.

**What you will see:** clicking the button collapses and expands the checkboxes, and the label flips between "Show" and "Hide".

---

## Step 2 — input: Live Character Counter

The Personal Statement textarea needs a live character counter. There is already a `#char-count` element just below the textarea — your job is to keep it updated as the user types.

When the user types in the Personal Statement:
- Immediately update the counter to show how many characters have been typed.
- Change the message depending on how much has been written:
  - Fewer than 50 characters: show a message like "Keep writing... (X characters)"
  - 50–99 characters: show something like "Getting there (X characters)"
  - 100 or more characters: show something like "Looks great! (X characters)"

**What you need:**

Select `#statement` (the textarea) and attach an `input` listener to it. The `input` event fires **every time** the user types, deletes, or pastes — it is perfect for live updates.

Inside the listener, `event.target` is the textarea, and `event.target.value` is all of the text currently inside it. Every string in JavaScript has a `length` property that tells you how many characters it contains. Chain `.length` onto `event.target.value` to get the count, and store that number in a variable.

Use `if / else if / else` to compare that number to 50 and 100, and set `#char-count`'s `textContent` to the appropriate message.

To include the actual count number inside your message text, use a template literal — wrap the whole message in backticks instead of quotes, and put your count variable inside a dollar sign and curly braces wherever you want it to appear in the sentence.

**What you will see:** as you type in the textarea, the counter updates immediately with a message that reflects how much you have written.

---

## Step 3 — input: Username Validation

This step uses the same `input` event as Step 2, but this time the logic has multiple branches — each one checking a different condition before deciding what to show.

There is a "Create a Username" field in the Personal Information section. It has a `#username-hint` element below it where you will display live feedback as the user types.

Here is the behavior you are building:
- If the field is **empty**: clear the hint. There is nothing to say yet, so showing nothing is the right choice — it keeps the form from looking like it is scolding someone who has not started typing.
- If the value **contains a space**: show an error like "No spaces allowed".
- If the value is **shorter than 4 characters**: show an error like "Too short — at least 4 characters needed".
- If the value is **4 or more characters with no spaces**: show a success message like "Username looks good!"

**What you need:**

Select `#username` and attach an `input` listener to it. Inside the listener, read the current value from `event.target.value` and store it in a variable. You will use that variable in every condition below.

Write an `if / else if / else` chain to handle all four cases. The order matters — JavaScript checks each condition from top to bottom and stops at the first one that is true. Here is how to think through each branch:

- **Empty check:** An empty string is **falsy** in JavaScript, which means it behaves like `false` when used in a condition. Put the NOT operator in front of your variable to check for this — if the variable is falsy, the NOT operator makes the condition true. Clear the hint inside this branch.

- **Space check:** Strings have a built-in method called `includes` that accepts a character or word and returns `true` if the string contains it, and `false` if it does not. Use it to check whether the value contains a space character. Place this check before the length check — a username with a space might also be too short, and you want to report the space problem first.

- **Length check:** Use the `length` property on your variable, the same way you used it in Step 2. If the length is less than 4, show the "too short" error.

- **Success:** The final `else` runs only when none of the conditions above were true — meaning the value is not empty, has no spaces, and is long enough. This is the right place for a positive message.

In each branch, update `#username-hint`'s `textContent` with the appropriate message.

**What you will see:** as you type in the username field, a hint appears and changes in real time. Spaces trigger an error, short values get a different error, and a valid username gets a positive message.

---

## Step 4 — change: Major Selection Feedback

The Intended Major dropdown already has an empty `#major-feedback` paragraph below it. When the user picks a major, your JavaScript will fill that paragraph with a brief, encouraging fact about that program.

When the user changes the dropdown selection:
- Read which option was chosen.
- Show a different message depending on the major.
- If the user reselects the blank "-- Select a major --" option at the top, clear the feedback.

**What you need:**

Select `#major` and attach a `change` listener to it. The `change` event fires **once** when the user finishes making a selection and moves on — unlike `input`, it does not fire for every character typed. This is the right event for dropdowns.

Inside the listener, `event.target.value` gives you the value of whichever option the user picked. These values are short codes, not the full major names — things like `cs`, `nursing`, or `marketing`. Open the HTML tab and find the `#major` dropdown to see all the option values available. Those are the strings you will compare against.

Write an `if / else if / else` chain. In each branch, compare the value using strict equality — three equals signs — to check for an exact match. For majors that should share the same message, you can combine them in a single condition using the OR operator. Think of it as saying: "if the value is this one, or the value is that one, show this message." You already used `===` and `||` in Step 3 — this step applies the same ideas to a dropdown.

Make sure one of your branches checks for the empty value — that is what the blank "-- Select a major --" option sends. When that is selected, clear `#major-feedback` by setting its `textContent` to an empty string.

Set `#major-feedback`'s `textContent` to the right message in each branch.

**What you will see:** picking a major from the dropdown instantly shows a one-line description below the select field. Choosing a different major updates it. Returning to "-- Select a major --" clears it.

---

## Step 5 — submit: Form Validation

The final step brings everything together. When the user clicks Submit, you need to stop the page from refreshing, check whether the required fields are filled in, and show either an error message or a personalized confirmation.

**What you need:**

Select the form element inside `#apply` and attach a `submit` listener to it. The `submit` event fires when the user clicks the Submit button or presses Enter inside a text field. To select the form, use `document.querySelector` with a selector that says: find a `form` that is inside the element with the id `apply`. In CSS selector terms, a space between two selectors means "inside of."

**The very first line inside your handler must call `event.preventDefault()`.** By default, submitting a form tells the browser to send the data to a server and reload the page. That reload wipes out your JavaScript — and the student's work. Calling this method stops that from happening. It must be the first line so nothing else gets skipped.

Next, read the values of the first name and email fields. Select each one by its id and read its `value` property. Store each value in its own clearly named variable.

Now write an `if / else` to decide what to show:

**If either field is empty:** An empty value is falsy. Use the NOT operator on each variable and connect them with the OR operator — "if the first name is empty, OR the email is empty, show an error." Inside this branch, set `#form-feedback`'s `textContent` to a message explaining what is missing.

**If both fields have values:** Set a personalized success message. You already have the user's first name stored in a variable — use a template literal to include it directly in the message.

In **both** branches — error and success — you also need to do two more things to make the feedback box appear with the right color:
- Set the `className` property of `#form-feedback` to the appropriate class string. For an error, use `'form-feedback error'`. For a success, use `'form-feedback success'`. Setting `className` replaces whatever classes the element has, so include `form-feedback` in both — it keeps the base styling.
- Set the `hidden` property of `#form-feedback` to `false`. The feedback box starts hidden in the HTML — this line makes it appear.

> **Watch the Console:** if the page reloads when you click Submit, `event.preventDefault()` was either missing or not reached. Open the Console tab and check for errors before anything else.

**What you will see:** clicking Submit with empty fields shows a red error box. Filling in a name and email and clicking Submit shows a green box with a personalized confirmation.

---

## Summary

You just built five interactive behaviors into a real web form using five different event types:

| Step | Event | Skill |
|------|-------|-------|
| 1 | `click` | classList.toggle, ternary operator |
| 2 | `input` | Live updates, if/else if/else, template literals |
| 3 | `input` | Truthy/falsy, includes(), logical operators |
| 4 | `change` | if/else if/else, event.target.value, OR operator |
| 5 | `submit` | event.preventDefault(), truthy/falsy, className |

Every interactive feature on the web — toggles, search-as-you-type, live validation, form submission — is built from the same idea: listen for an event, read a value, make a decision, update the page.
