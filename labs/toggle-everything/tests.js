// Lab 20: Toggle Everything — Tests
// ─────────────────────────────────────────────────────────
// These tests inspect the live DOM after your JS runs.
// For event-driven steps, each test triggers the event
// programmatically, checks the result, then resets state.
// ─────────────────────────────────────────────────────────


// ── Step 1: Dark Mode Toggle ────────────────────────────

test('Step 1a: #dark-toggle button is in the HTML', function() {
    const btn = document.querySelector('#dark-toggle');
    if (!btn) {
        throw new Error(
            '#dark-toggle was not found. ' +
            'This button is already in the starter HTML — make sure you have not changed it.'
        );
    }
});

test('Step 1b: clicking the dark toggle adds the "dark-mode" class to body', function() {
    const btn = document.querySelector('#dark-toggle');
    if (!btn) {
        throw new Error('#dark-toggle was not found.');
    }

    // Ensure known starting state — light mode
    document.body.classList.remove('dark-mode');

    btn.click();
    const hasDarkMode = document.body.classList.contains('dark-mode');

    // Reset
    document.body.classList.remove('dark-mode');

    if (!hasDarkMode) {
        throw new Error(
            'After clicking #dark-toggle, the body should have the "dark-mode" class. ' +
            'Use document.body.classList.toggle("dark-mode") inside your click listener.'
        );
    }
});

test('Step 1c: clicking the dark toggle a second time removes the "dark-mode" class', function() {
    const btn = document.querySelector('#dark-toggle');
    if (!btn) {
        throw new Error('#dark-toggle was not found.');
    }

    // Start in light mode
    document.body.classList.remove('dark-mode');

    btn.click(); // → dark
    btn.click(); // → light again
    const hasDarkMode = document.body.classList.contains('dark-mode');

    // Reset
    document.body.classList.remove('dark-mode');

    if (hasDarkMode) {
        throw new Error(
            'After clicking #dark-toggle twice, the body should NOT have the "dark-mode" class. ' +
            'Make sure you are using classList.toggle("dark-mode") — not classList.add("dark-mode").'
        );
    }
});

test('Step 1d: the button label changes when dark mode is toggled', function() {
    const btn = document.querySelector('#dark-toggle');
    if (!btn) {
        throw new Error('#dark-toggle was not found.');
    }

    // Start in light mode
    document.body.classList.remove('dark-mode');
    const originalText = btn.textContent;

    btn.click(); // → dark
    const darkText = btn.textContent;

    btn.click(); // → light
    const lightText = btn.textContent;

    // Reset
    document.body.classList.remove('dark-mode');

    if (darkText === originalText) {
        throw new Error(
            'After clicking #dark-toggle, the button text should change ' +
            '(e.g., from "Switch to Dark Mode" to "Switch to Light Mode"). ' +
            'Use a ternary operator to pick the right label based on whether ' +
            'body.classList.contains("dark-mode") is true or false.'
        );
    }

    if (lightText !== originalText) {
        throw new Error(
            'After clicking #dark-toggle twice, the button text should return to its original value. ' +
            'Make sure your ternary updates the label in both directions.'
        );
    }
});


// ── Step 2: FAQ Accordion ───────────────────────────────

test('Step 2a: #faq-toggle button is in the HTML', function() {
    const btn = document.querySelector('#faq-toggle');
    if (!btn) {
        throw new Error(
            '#faq-toggle was not found. ' +
            'This button is already in the starter HTML — make sure you have not changed it.'
        );
    }
});

test('Step 2b: #faq-answer div is in the HTML', function() {
    const answer = document.querySelector('#faq-answer');
    if (!answer) {
        throw new Error(
            '#faq-answer was not found. ' +
            'This div is already in the starter HTML — make sure you have not changed it.'
        );
    }
});

test('Step 2c: clicking the FAQ button adds the "open" class to #faq-answer', function() {
    const btn = document.querySelector('#faq-toggle');
    const answer = document.querySelector('#faq-answer');
    if (!btn || !answer) {
        throw new Error('Could not find #faq-toggle or #faq-answer.');
    }

    // Ensure known starting state — closed
    answer.classList.remove('open');

    btn.click();
    const isOpen = answer.classList.contains('open');

    // Reset
    answer.classList.remove('open');

    if (!isOpen) {
        throw new Error(
            'After clicking #faq-toggle, #faq-answer should have the "open" class. ' +
            'Use classList.toggle("open") inside your click listener.'
        );
    }
});

test('Step 2d: clicking the FAQ button again removes the "open" class', function() {
    const btn = document.querySelector('#faq-toggle');
    const answer = document.querySelector('#faq-answer');
    if (!btn || !answer) {
        throw new Error('Could not find #faq-toggle or #faq-answer.');
    }

    // Start closed
    answer.classList.remove('open');

    btn.click(); // → open
    btn.click(); // → closed
    const isOpen = answer.classList.contains('open');

    // Reset
    answer.classList.remove('open');

    if (isOpen) {
        throw new Error(
            'After clicking #faq-toggle twice, #faq-answer should NOT have the "open" class. ' +
            'Make sure you are using classList.toggle("open") — not classList.add("open").'
        );
    }
});


// ── Step 3: Tour Modal ──────────────────────────────────

test('Step 3a: #tour-btn button is in the HTML', function() {
    const btn = document.querySelector('#tour-btn');
    if (!btn) {
        throw new Error(
            '#tour-btn was not found. ' +
            'This button is already in the starter HTML — make sure you have not changed it.'
        );
    }
});

test('Step 3b: #tour-modal overlay is in the HTML', function() {
    const modal = document.querySelector('#tour-modal');
    if (!modal) {
        throw new Error(
            '#tour-modal was not found. ' +
            'This overlay is already in the starter HTML — make sure you have not changed it.'
        );
    }
});

test('Step 3c: #modal-close button is in the HTML', function() {
    const closeBtn = document.querySelector('#modal-close');
    if (!closeBtn) {
        throw new Error(
            '#modal-close was not found. ' +
            'This button is already in the starter HTML — make sure you have not changed it.'
        );
    }
});

test('Step 3d: clicking #tour-btn adds the "visible" class to #tour-modal', function() {
    const btn = document.querySelector('#tour-btn');
    const modal = document.querySelector('#tour-modal');
    if (!btn || !modal) {
        throw new Error('Could not find #tour-btn or #tour-modal.');
    }

    // Ensure known starting state — modal hidden
    modal.classList.remove('visible');

    btn.click();
    const isVisible = modal.classList.contains('visible');

    // Reset
    modal.classList.remove('visible');

    if (!isVisible) {
        throw new Error(
            'After clicking #tour-btn, #tour-modal should have the "visible" class. ' +
            'Use classList.add("visible") inside your click listener.'
        );
    }
});

test('Step 3e: clicking #modal-close removes the "visible" class from #tour-modal', function() {
    const btn = document.querySelector('#tour-btn');
    const modal = document.querySelector('#tour-modal');
    const closeBtn = document.querySelector('#modal-close');
    if (!btn || !modal || !closeBtn) {
        throw new Error('Could not find #tour-btn, #tour-modal, or #modal-close.');
    }

    // Open the modal first
    modal.classList.remove('visible');
    btn.click();

    // Now close it
    closeBtn.click();
    const isVisible = modal.classList.contains('visible');

    // Reset
    modal.classList.remove('visible');

    if (isVisible) {
        throw new Error(
            'After clicking #modal-close, #tour-modal should NOT have the "visible" class. ' +
            'Use classList.remove("visible") inside your close button click listener.'
        );
    }
});


// ── Step 4: Toast Notification ──────────────────────────

test('Step 4a: #toast element is in the HTML', function() {
    const toast = document.querySelector('#toast');
    if (!toast) {
        throw new Error(
            '#toast was not found. ' +
            'This element is already in the starter HTML — make sure you have not changed it.'
        );
    }
});

test('Step 4b: submitting the form shows the toast with a message', function() {
    const formEl = document.querySelector('#apply form');
    const toast = document.querySelector('#toast');
    if (!formEl || !toast) {
        throw new Error('Could not find the form inside #apply or #toast.');
    }

    // Fill in required fields so submission logic runs the success path
    const firstName = document.querySelector('#first-name');
    const lastName = document.querySelector('#last-name');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');

    const origFirst = firstName.value;
    const origLast = lastName.value;
    const origEmail = email.value;
    const origPhone = phone.value;

    firstName.value = 'Test';
    lastName.value = 'User';
    email.value = 'test@example.com';
    phone.value = '555-555-5555';

    // Reset toast state
    toast.classList.remove('show');
    toast.hidden = true;
    toast.textContent = '';

    // Submit the form
    formEl.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    const hasShow = toast.classList.contains('show');
    const hasText = toast.textContent.length > 0;
    const isVisible = !toast.hidden;

    // Reset form values
    firstName.value = origFirst;
    lastName.value = origLast;
    email.value = origEmail;
    phone.value = origPhone;

    if (!hasShow || !isVisible) {
        throw new Error(
            'After submitting the form with valid data, #toast should be visible. ' +
            'Set toast.hidden = false and use classList.add("show") to reveal it.'
        );
    }

    if (!hasText) {
        throw new Error(
            'After submitting the form, #toast should contain a success message. ' +
            'Set toast.textContent to something like "Application submitted successfully!"'
        );
    }
});

test('Step 4c: the toast disappears after a delay (uses setTimeout)', function() {
    const formEl = document.querySelector('#apply form');
    const toast = document.querySelector('#toast');
    if (!formEl || !toast) {
        throw new Error('Could not find the form inside #apply or #toast.');
    }

    // Fill in required fields
    const firstName = document.querySelector('#first-name');
    const lastName = document.querySelector('#last-name');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');

    const origFirst = firstName.value;
    const origLast = lastName.value;
    const origEmail = email.value;
    const origPhone = phone.value;

    firstName.value = 'Test';
    lastName.value = 'User';
    email.value = 'test@example.com';
    phone.value = '555-555-5555';

    // Reset toast
    toast.classList.remove('show');
    toast.hidden = true;

    // Check if setTimeout was called by temporarily wrapping it
    let setTimeoutCalled = false;
    let timeoutDelay = 0;
    const originalSetTimeout = window.setTimeout;

    window.setTimeout = function(fn, delay) {
        setTimeoutCalled = true;
        timeoutDelay = delay;
        return originalSetTimeout.call(window, fn, delay);
    };

    // Submit
    formEl.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    // Restore setTimeout
    window.setTimeout = originalSetTimeout;

    // Reset form values
    firstName.value = origFirst;
    lastName.value = origLast;
    email.value = origEmail;
    phone.value = origPhone;

    // Reset toast
    toast.classList.remove('show');
    toast.hidden = true;

    if (!setTimeoutCalled) {
        throw new Error(
            'Your form submit handler should use setTimeout() to auto-dismiss the toast after a delay. ' +
            'Inside setTimeout, remove the "show" class and set toast.hidden = true.'
        );
    }

    if (timeoutDelay < 1000) {
        throw new Error(
            'The setTimeout delay should be at least 1000 milliseconds (1 second). ' +
            'A delay of 3000 (3 seconds) gives the user enough time to read the message.'
        );
    }
});
