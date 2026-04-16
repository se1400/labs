# Toggle Everything

In the last lab you made the page respond to user events — clicks, keystrokes, and form submissions. This lab takes one idea from that work — `classList.toggle` — and shows how far it can go. Every interactive pattern you will build here works the same way: CSS defines two visual states, and your JavaScript switches between them by adding or removing a single class.

By the end, your site will have a dark mode toggle, an animated FAQ accordion, a modal dialog, and a toast notification that disappears on its own.

There are **13 tests** and **4 steps**. Run the tests after each step.

---

## Getting Started

Switch to the JS tab. That is where all your work happens. The HTML and CSS are already set up — the CSS defines both visual states for every feature, and the HTML contains every element you need. Your JavaScript's only job is to toggle the right class at the right time.

Before writing any code, look at the CSS tab and find the sections labeled "Lab 20." Notice how each feature has two states defined purely in CSS:
- `.dark-mode` on body — swaps all the colors
- `.open` on `#faq-answer` — expands from `max-height: 0` to `max-height: 500px`
- `.visible` on `#tour-modal` — fades in from `opacity: 0` to `opacity: 1`
- `.show` on `#toast` — slides up from the bottom of the screen

Your JavaScript does not change any colors, heights, or positions directly. It just adds and removes these classes — CSS handles the rest.

---

## Step 1 — Dark Mode Toggle

There is a button in the header with the id `dark-toggle`. It currently reads "Switch to Dark Mode." Your job is to make it work.

When the user clicks the button:
- The entire page should switch to dark mode — the `dark-mode` class needs to be added to the `body` element.
- The button label should change to "Switch to Light Mode."
- When the user clicks again, the page should return to light mode — the `dark-mode` class should be removed.
- The button label should flip back to "Switch to Dark Mode."

**What you need:**

Select `#dark-toggle` and attach a `click` listener to it.

Inside the listener, use `document.body.classList.toggle('dark-mode')` to flip the class on and off. Notice that you do not need `document.querySelector` here — `document.body` is a shortcut that JavaScript provides for the `<body>` element.

After the toggle, update the button's `textContent` using the ternary operator. Check whether `document.body.classList.contains('dark-mode')` is true or false, and pick the right label: `'Switch to Light Mode'` when dark mode is on, `'Switch to Dark Mode'` when it is off.

**What you will see:** clicking the button swaps the entire page between light and dark color schemes, and the button label flips to match.

---

## Step 2 — FAQ Accordion

In the sidebar there is a FAQ section with a question button (`#faq-toggle`) and an answer div (`#faq-answer`). The answer starts collapsed — CSS sets its `max-height` to `0` with `overflow: hidden`. When you add the `open` class, CSS transitions `max-height` to `500px`, which smoothly reveals the content.

When the user clicks the question button:
- The answer should expand — the `open` class needs to be added to `#faq-answer`.
- When the user clicks again, the answer should collapse — the `open` class should be removed.

**What you need:**

Select `#faq-toggle` and attach a `click` listener to it. Inside the listener, select `#faq-answer` and use `classList.toggle('open')`.

That is the entire step — two lines of JavaScript inside the listener. The CSS `transition: max-height 0.4s ease` on `.faq-answer` handles the smooth animation automatically.

**What you will see:** clicking the question reveals the answer with a smooth slide-down animation. Clicking again collapses it.

---

## Step 3 — Tour Modal

In the sidebar's "Visit Campus" section there is a "Schedule a Tour" button (`#tour-btn`). Below the footer there is a modal overlay (`#tour-modal`) that is invisible — CSS sets `opacity: 0` and `pointer-events: none` so you cannot see or click it. When you add the `visible` class, CSS transitions `opacity` to `1` and re-enables `pointer-events`, making the modal appear with a smooth fade-in.

Inside the modal there is a close button (`#modal-close`) — the X in the top corner.

**What you need:**

This step uses two separate listeners — one to open the modal, and one to close it.

**Opening the modal:** Select `#tour-btn` and attach a `click` listener. Inside the listener, select `#tour-modal` and use `classList.add('visible')`. Use `add` here, not `toggle` — you always want to add the class when opening. The open and close actions are separate buttons, so each one only needs to do its own job.

**Closing the modal:** Select `#modal-close` and attach a `click` listener. Inside the listener, select `#tour-modal` and use `classList.remove('visible')`. Use `remove` here — you always want to remove the class when closing.

**What you will see:** clicking "Schedule a Tour" fades in the modal overlay with tour information. Clicking the X button fades it out.

---

## Step 4 — Toast Notification

The final step ties into the form submission that is already working from the last lab. After the form submits successfully, you will show a toast notification — a small message that slides up from the bottom-right corner and then disappears on its own after a few seconds.

There is a `#toast` element at the bottom of the HTML. It starts hidden and empty. When you add the `show` class and set `hidden` to `false`, CSS transitions it into view. Your job is to show it on successful form submission, and then use `setTimeout` to dismiss it automatically.

**What you need:**

The form inside `#apply` already has a `submit` listener from the last lab. You need to add your toast code **inside the success branch** of that existing listener — the `else` block that runs when the name and email are both filled in.

Inside that success branch, do three things:

1. **Set the message.** Set `#toast`'s `textContent` to a success message like `'Application submitted successfully!'`.

2. **Show the toast.** Set `#toast`'s `hidden` property to `false`, and use `classList.add('show')` to trigger the CSS slide-in animation.

3. **Auto-dismiss with setTimeout.** Call `setTimeout` with a function and a delay in milliseconds. A delay of `3000` gives the user three seconds to read the message. Inside that function, use `classList.remove('show')` and set `hidden` back to `true`.

`setTimeout` is the one new JavaScript concept in this lab. It tells the browser: "wait this many milliseconds, then run this function." You write it the same way you write an event listener — a function followed by a number:

```
setTimeout(function() {
    // this code runs after the delay
}, 3000);
```

**What you will see:** submitting the form with valid data shows a green toast message in the bottom-right corner. After three seconds, it fades out and disappears automatically.

---

## Summary

You built four interactive features using one core idea: **CSS defines the states, JavaScript toggles between them.**

| Step | Feature | Class Toggled | New Skill |
|------|---------|---------------|-----------|
| 1 | Dark Mode | `dark-mode` on body | `document.body`, ternary for label |
| 2 | FAQ Accordion | `open` on answer | `max-height` CSS transition trick |
| 3 | Tour Modal | `visible` on overlay | `classList.add` / `classList.remove` |
| 4 | Toast | `show` on toast | `setTimeout` for auto-dismiss |

Every toggle, accordion, modal, and notification on the web is built from this same pattern. The CSS is always ready — it just waits for JavaScript to flip the switch.
