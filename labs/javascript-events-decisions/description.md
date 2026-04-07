# JavaScript Events & Decisions

In the last lab you changed the page once — when it loaded — and then JavaScript went silent. This lab is different. You will make the page respond to the user: every click, every keystroke, every form submission. By the end, the Utah Tech admissions form will validate input live, toggle sections on and off, and respond to a submission with a personalized message — all driven by the code you write.

There are **16 tests** and **5 steps**. Run the tests after each step.

---

## Getting Started

Open the HTML tab and find the `<script>` tag in the `<head>` section. It should look like this:

```html
<script defer src="starter.js"></script>
```

The `defer` attribute tells the browser to wait until the full page has loaded before running your script. This means you can safely select any element on the page — it will already exist.

You do not need to add or change this tag. Just know it is there, because the tests will check for it.

Switch to the JS tab. That is where all your work happens.

---

## How Event Listeners Work

Every step in this lab follows the same two-line pattern: select an element, then tell it what to do when something happens.

```javascript
const btn = document.querySelector('#my-button');

btn.addEventListener('click', function(event) {
    // This runs every time the button is clicked
    console.log(event.target); // the element that was clicked
});
```

The second argument to `addEventListener` is a **handler function** — the code that runs when the event fires. The browser automatically passes an **event object** to it, which contains details about what happened. You can name that parameter anything, but `event` (or just `e`) is the convention.

> **Console tip:** Use `console.log(event)` inside any handler to see the full event object. `console.log(event.target.value)` shows the current value of whatever the user typed.

---

## Step 1 — click: Toggle the Areas of Interest Section

The admissions form has an Areas of Interest section with a small button inside its heading that reads "Hide". Your job is to make that button work.

When the user clicks the button:
- The section content (the checkboxes) should disappear — add the class `hidden` to the `#interests-content` div.
- The button label should change to "Show".
- If the user clicks again, the content should reappear — remove `hidden` from `#interests-content`.
- The button label should flip back to "Hide".

**What you need:**
- Select `#toggle-interests` (the button) and attach a `click` listener.
- Inside the listener, select `#interests-content` and call `classList.toggle('hidden')` on it.
- After toggling, check whether `#interests-content` now has the `hidden` class using `classList.contains('hidden')`. Use that result with the **ternary operator** to set the button's `textContent` to either `'Show'` or `'Hide'`.

The ternary operator is a one-line shortcut for picking between two values:

```
condition ? valueIfTrue : valueIfFalse
```

So for the button label, you are choosing between two strings based on whether the content is currently hidden.

**What you will see:** clicking the button collapses and expands the checkboxes, and the label flips between "Show" and "Hide".

---

## Step 2 — input: Live Character Counter

The Personal Statement textarea needs a live character counter. There is already a `#char-count` element just below the textarea — your job is to keep it updated as the user types.

When the user types in `#statement`:
- Immediately update `#char-count` to show how many characters have been typed.
- Change the message depending on how much has been written:
  - Fewer than 50 characters: show a message like "Keep writing... (X characters)"
  - 50–99 characters: show something like "Getting there (X characters)"
  - 100 or more characters: show something like "Looks great! (X characters)"

**What you need:**
- Select `#statement` (the textarea) and attach an `input` listener.
- The `input` event fires **every time** the user types, deletes, or pastes — it is perfect for live updates.
- Inside the listener, read `event.target.value.length` to get the character count.
- Use `if / else if / else` to choose the right message and set it as `#char-count`'s `textContent`.

**What you will see:** as you type in the textarea, the counter updates immediately with a message that reflects how much you have written.

---

## Step 3 — input: Username Validation

There is a "Create a Username" field (`#username`) in the Personal Information section. It has a `#username-hint` element below it where you will display live feedback.

As the user types in `#username`:
- If the field is **empty**: clear the hint (set it to an empty string). An empty string is **falsy**, so you can check for this with `if (!value)`.
- If the value **contains a space**: show an error like "No spaces allowed".
- If the value is **shorter than 4 characters**: show an error like "Too short — at least 4 characters needed".
- If the value is **4 or more characters with no spaces**: show a success message like "Username looks good!"

**What you need:**
- Select `#username` and attach an `input` listener.
- Read `event.target.value` and store it in a variable.
- Use `if / else if / else` to cover all four cases above.
- The `!value` check uses **truthy/falsy**: an empty string is falsy in JavaScript, so `!value` is true when the field is empty.
- The `value.includes(' ')` check tests whether the string contains a space. Put this check **before** the length check, because a value with spaces might also be short — you want the most specific match first.
- Update `#username-hint`'s `textContent` with the appropriate message.

**What you will see:** as you type in the username field, a hint appears and changes in real time. Spaces trigger an error, short values get a different error, and a valid username gets a green-feeling success message.

---

## Step 4 — change: Major Selection Feedback

The Intended Major dropdown (`#major`) already has an empty `#major-feedback` paragraph below it. When the user picks a major, show them a brief fact about that program.

When the user changes the dropdown selection:
- Check `event.target.value` to see which option was chosen.
- Use `if / else if / else` to show a different message for different groups of majors.
- For example: Computer Science, Software Engineering, and Cybersecurity can share one message. Nursing and Public Health can share another. Biology can get its own. Any other major can get a friendly catch-all.
- If the user reselects the blank "-- Select a major --" option, clear the feedback.

**What you need:**
- Select `#major` and attach a `change` listener.
- The `change` event fires **once** when the user finishes choosing — unlike `input`, it does not fire for every intermediate state.
- Use `===` for equality checks (strict equality — always prefer this over `==`).
- Use `||` (OR) to check multiple values in a single condition: `value === 'cs' || value === 'se'` is true if either one matches.
- Set `#major-feedback`'s `textContent` to the chosen message.

**What you will see:** picking a major from the dropdown instantly shows a one-line description below the select field. Choosing a different major updates it. Returning to "-- Select a major --" clears it.

---

## Step 5 — submit: Form Validation

The final step brings together everything. The form needs a submit listener that:
1. Stops the page from refreshing.
2. Reads the name and email fields.
3. Checks whether they are filled in.
4. Shows either an error or a personalized success message.

**What you need:**
- Select the form inside `#apply` — use `document.querySelector('#apply form')`.
- Attach a `submit` listener. The `submit` event fires when the user clicks Submit or presses Enter in a text field.
- **The first line of your handler must be `event.preventDefault()`.** Without it, the browser sends the form and reloads the page, erasing everything. This is the single most important thing to know about form submission in JavaScript.
- Read the values of `#first-name` and `#email`: `document.querySelector('#first-name').value`.
- Use `if (!firstName || !email)` to check whether either value is missing. An empty string is falsy, so `!firstName` is true when the field is blank. The `||` operator means the condition is true if **either** field is empty.
  - If something is missing: set `#form-feedback`'s `textContent` to an error message, set its `className` to `'form-feedback error'`, and set `hidden` to `false`.
  - If both are filled in: set a personalized success message that includes the user's name, set `className` to `'form-feedback success'`, and set `hidden` to `false`.

**What you will see:** clicking Submit with empty fields shows a red error box. Filling in a name and email and clicking Submit shows a green box with a personalized confirmation.

---

## Summary

You just built five interactive behaviors into a real web form using five different event types:

| Step | Event | Skill |
|------|-------|-------|
| 1 | `click` | classList.toggle, ternary operator |
| 2 | `input` | Live updates, if/else if/else |
| 3 | `input` | Truthy/falsy, logical operators (!) |
| 4 | `change` | if/else if/else, logical operators (||) |
| 5 | `submit` | event.preventDefault(), truthy/falsy, || |

Every interactive feature on the web — toggles, search-as-you-type, live validation, form submission — is built from the same idea: listen for an event, read a value, make a decision, update the page.
