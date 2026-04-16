# Toggle Everything

In the last lab you made the page respond to user events — clicks, keystrokes, and form submissions. This lab takes one idea from that work — `classList.toggle` — and shows how far it can go. Every interactive pattern you will build here works the same way: CSS defines two visual states, and your JavaScript switches between them by adding or removing a single class.

By the end, your site will have a dark mode toggle, an animated FAQ accordion, a modal dialog, and a toast notification that disappears on its own.

There are **10 tests** and **4 steps**. Run the tests after each step.

---

## Getting Started

Switch to the JS tab. That is where all your work happens. The HTML and CSS are already set up — your JavaScript's only job is to toggle the right class at the right time.

Every step in this lab follows the same pattern you used in the last lab:

1. **Select** the element you want to control, using `document.querySelector`, and store it in a variable.
2. **Attach** an event listener to that element — usually `'click'` or `'submit'`.
3. **Write the handler** — the function that runs when the event fires. Inside this function, you will add, remove, or toggle a CSS class.

Before writing any code, open the CSS tab and scroll down to the section labeled **"LAB 20: TOGGLE EVERYTHING."** You will see that every feature in this lab already has two visual states defined in CSS — a default state and an "on" state. Your JavaScript does not need to change any colors, sizes, or positions. It just flips a class, and CSS handles the rest.

> **Console tip:** If something is not working, add `console.log('clicked!')` as the first line inside your handler. If the message does not appear in the Console when you interact with the element, the listener is not connected. Check your selector and event name.

---

## Step 1 — Dark Mode Toggle

There is a button in the header with the id `dark-toggle`. It currently reads "Switch to Dark Mode." Your job is to make it work.

When the user clicks the button:
- The entire page should switch to dark mode — the `dark-mode` class needs to be added to the `body` element.
- The button label should change to "Switch to Light Mode."
- When the user clicks again, the page should return to light mode — the `dark-mode` class should be removed.
- The button label should flip back to "Switch to Dark Mode."

**What you need:**

Start by selecting the button. Use `document.querySelector` with `'#dark-toggle'` and store the result in a variable. Then attach a `click` listener to it — the same way you attached listeners in the last lab. Everything else happens inside that listener.

**First — toggle the class on the body.** Use `document.body.classList.toggle('dark-mode')` to flip the class on and off. You do not need `document.querySelector` to get the body — JavaScript has a built-in shortcut called `document.body` that always points to the `<body>` element. The `toggle` method works in both directions: if `dark-mode` is not there, it adds it; if it is already there, it removes it.

**Second — update the button label.** After the toggle, you need to know whether dark mode is now on or off so you can set the right button text. Use `document.body.classList.contains('dark-mode')` — this returns `true` if the class is present, and `false` if it is not.

Use the **ternary operator** to pick the label. The ternary is the `? :` shortcut you used in the last lab — write a condition, then a `?`, then the value if true, then a `:`, then the value if false. Your condition is whether the body contains `'dark-mode'`, and your two values are `'Switch to Light Mode'` and `'Switch to Dark Mode'`. Set the button's `textContent` to whichever one the ternary picks.

**What you will see:** clicking the button swaps the entire page between light and dark color schemes, and the button label flips to match.

---

## Step 2 — FAQ Accordion

In the sidebar there is a FAQ section. It has a question button (`#faq-toggle`) that reads "Is housing guaranteed for freshmen?" and an answer div (`#faq-answer`) below it. Right now the answer is invisible — CSS sets its `max-height` to `0` with `overflow: hidden`, so there is no room for the text to show. When you add the `open` class, CSS transitions `max-height` to `500px`, which smoothly reveals the answer.

This is different from the `hidden` class you used in the last lab. That class used `display: none`, which works — but it snaps instantly. There is no way to animate `display` in CSS because it is an on/off switch, not a number. The `max-height` technique is different: because `max-height` is a number, CSS can smoothly transition between `0` and `500px` over time. Same idea — hide and show content — but with a polished animation instead of an instant jump.

When the user clicks the question button:
- The answer should expand — the `open` class needs to be added to `#faq-answer`.
- When the user clicks again, the answer should collapse — the `open` class should be removed.

**What you need:**

Select `#faq-toggle` (the question button) and attach a `click` listener to it.

**Inside the listener, do one thing:** select `#faq-answer` and call `classList.toggle('open')` on it. The CSS transition handles the smooth animation automatically — you do not need to change any heights or styles yourself.

This is a short step on purpose. The JavaScript is nearly identical to what you wrote in Step 1 — the only difference is which element gets the class and which class name you use. The new idea here is on the CSS side: `max-height` gives you animation that `display: none` cannot.

**What you will see:** clicking the question reveals the answer with a smooth slide-down animation. Clicking again collapses it back up.

---

## Step 3 — Tour Modal

In the sidebar's "Visit Campus" section there is a "Schedule a Tour" button (`#tour-btn`). Below the footer in the HTML there is a modal overlay (`#tour-modal`). You cannot see it yet because CSS sets its `opacity` to `0` and `pointer-events` to `none` — it is invisible and cannot be clicked. When you add the `visible` class, CSS transitions `opacity` to `1` and turns `pointer-events` back on, making the modal fade in and become clickable.

Inside the modal there is a close button (`#modal-close`) — the X in the top-right corner.

**What you need:**

This step requires two separate listeners — one to open the modal, and one to close it. Write them one after the other in your JS tab.

In Steps 1 and 2, you used `classList.toggle` because a single button handled both directions — one click to turn it on, another click to turn it off. This step is different. The open and close actions belong to two different buttons: `#tour-btn` opens the modal, and `#modal-close` closes it. When each button has only one job, use `classList.add` for the button that opens, and `classList.remove` for the button that closes. This way each listener does exactly one thing, and the two buttons cannot get out of sync.

**Opening the modal:**

Select `#tour-btn` and attach a `click` listener. Inside the listener, select `#tour-modal` and call `classList.add('visible')` on it.

**Closing the modal:**

Select `#modal-close` and attach a `click` listener. Inside the listener, select `#tour-modal` and call `classList.remove('visible')` on it.

**What you will see:** clicking "Schedule a Tour" fades in a dark overlay with tour information. Clicking the X button fades it back out.

---

## Step 4 — Toast Notification

The final step ties into the form submission from the last lab. After the form submits successfully, you will show a **toast notification** — a small message that slides up from the bottom-right corner, stays visible for a few seconds, and then disappears on its own.

There is a `#toast` element near the bottom of the HTML. It starts hidden and empty. When you set its `hidden` property to `false` and add the `show` class, CSS transitions it into view. Your job is to show it when the form is submitted with valid data, and then use `setTimeout` to dismiss it automatically after a delay.

**What you need:**

The form inside `#apply` already has a `submit` listener from the last lab — you can see it in the HTML tab if you scroll to the bottom. You are going to add a **second** listener to the same form. JavaScript allows multiple listeners on the same event: when the form is submitted, every listener attached to it runs. The existing listener handles the green/red feedback box. Your new listener will handle the toast.

**First — select the elements and attach the listener.** Select the form inside `#apply` (the same way you did in the last lab — the selector combines the id and the element type with a space between them). Also select `#toast` and store it in a variable. Attach a `submit` listener to the form.

**Second — prevent the default.** The very first line inside your handler must call `event.preventDefault()`. This stops the browser from reloading the page, the same way it did in the last lab.

**Third — read the form values and check them.** Select `#first-name` and `#email` by their ids, and read each element's `.value` property. Store each value in its own variable. Then write an `if` statement to check that both fields have values. Remember from the last lab: an empty string is **falsy**, which means it behaves like `false` in a condition. So `if (firstName && email)` is true only when both variables contain text — if either one is empty, the condition is false and the code inside the `if` block will not run.

**Fourth — inside that `if` block, show the toast.** Do three things in order:

1. **Set the message.** Set the toast's `textContent` to a success message — something like `'Application submitted successfully!'`.

2. **Make it visible.** Set the toast's `hidden` property to `false` — this removes the HTML `hidden` attribute so the element enters the page. Then call `classList.add('show')` on the toast to trigger the CSS slide-in animation.

3. **Auto-dismiss after a delay.** This is where `setTimeout` comes in — the one new JavaScript concept in this lab. `setTimeout` tells the browser: "wait this many milliseconds, then run this function." You give it two things: a function to run later, and a number for the delay. The delay is in milliseconds — `1000` equals one second, so `3000` gives the user three seconds to read the message.

    Inside that delayed function, reverse what you did in step 2: call `classList.remove('show')` on the toast, and set its `hidden` property back to `true`. This makes it slide away and disappear.

    `setTimeout` looks like an event listener — you pass it a function and one more value:

    ```
    setTimeout(function() {
        // this code runs after the delay
    }, 3000);
    ```

    The difference is that a listener runs every time an event happens, while `setTimeout` runs the function exactly once, after the delay you specified.

> **Watch the Console:** if the page reloads when you click Submit, `event.preventDefault()` is either missing or not being reached. Open the Console tab and check for errors before anything else.

**What you will see:** fill in the first name and email fields, then click Submit. A green toast message should slide up in the bottom-right corner. After three seconds, it fades out and disappears on its own.

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
