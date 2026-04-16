// Lab 20: Toggle Everything — Tests
// ─────────────────────────────────────────────────────────
// These tests inspect the live DOM after your JS runs.
// For event-driven steps, each test triggers the event
// programmatically, checks the result, then resets state.
// ─────────────────────────────────────────────────────────


// ── Step 1: Dark Mode Toggle ────────────────────────────

test('Step 1a: clicking the dark toggle adds the "dark-mode" class to body', function() {
    const btn = document.querySelector('#dark-toggle');
    if (!btn) {
        throw new Error(
            '#dark-toggle was not found. ' +
            'This button is already in the starter HTML — make sure you have not changed it.'
        );
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

test('Step 1b: clicking the dark toggle when dark mode is on removes the "dark-mode" class', function() {
    const btn = document.querySelector('#dark-toggle');
    if (!btn) {
        throw new Error('#dark-toggle was not found.');
    }

    // Manually put the page into dark mode
    document.body.classList.add('dark-mode');

    // The student's click should toggle it off
    btn.click();
    const hasDarkMode = document.body.classList.contains('dark-mode');

    // Reset
    document.body.classList.remove('dark-mode');

    if (hasDarkMode) {
        throw new Error(
            'When the body already has the "dark-mode" class, clicking #dark-toggle should remove it. ' +
            'Make sure you are using classList.toggle("dark-mode") — not classList.add("dark-mode").'
        );
    }
});

test('Step 1c: the button label changes when dark mode is toggled', function() {
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
            'document.body.classList.contains("dark-mode") is true or false.'
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

test('Step 2a: clicking the FAQ button adds the "open" class to #faq-answer', function() {
    const btn = document.querySelector('#faq-toggle');
    const answer = document.querySelector('#faq-answer');
    if (!btn || !answer) {
        throw new Error(
            'Could not find #faq-toggle or #faq-answer. ' +
            'These elements are already in the starter HTML — make sure you have not changed them.'
        );
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

test('Step 2b: clicking the FAQ button when open removes the "open" class', function() {
    const btn = document.querySelector('#faq-toggle');
    const answer = document.querySelector('#faq-answer');
    if (!btn || !answer) {
        throw new Error('Could not find #faq-toggle or #faq-answer.');
    }

    // Manually open the accordion
    answer.classList.add('open');

    // The student's click should toggle it closed
    btn.click();
    const isOpen = answer.classList.contains('open');

    // Reset
    answer.classList.remove('open');

    if (isOpen) {
        throw new Error(
            'When #faq-answer already has the "open" class, clicking #faq-toggle should remove it. ' +
            'Make sure you are using classList.toggle("open") — not classList.add("open").'
        );
    }
});


// ── Step 3: Tour Modal ──────────────────────────────────

test('Step 3a: clicking #tour-btn adds the "visible" class to #tour-modal', function() {
    const btn = document.querySelector('#tour-btn');
    const modal = document.querySelector('#tour-modal');
    if (!btn || !modal) {
        throw new Error(
            'Could not find #tour-btn or #tour-modal. ' +
            'These elements are already in the starter HTML — make sure you have not changed them.'
        );
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

test('Step 3b: clicking #modal-close removes the "visible" class from #tour-modal', function() {
    const modal = document.querySelector('#tour-modal');
    const closeBtn = document.querySelector('#modal-close');
    if (!modal || !closeBtn) {
        throw new Error(
            'Could not find #tour-modal or #modal-close. ' +
            'These elements are already in the starter HTML — make sure you have not changed them.'
        );
    }

    // Manually open the modal — do not rely on the student's open listener
    modal.classList.add('visible');

    // The student's close listener should remove it
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

test('Step 4a: submitting the form with valid data shows the toast with a message', function() {
    const formEl = document.querySelector('#apply form');
    const toast = document.querySelector('#toast');
    if (!formEl || !toast) {
        throw new Error(
            'Could not find the form inside #apply or #toast. ' +
            'These elements are already in the starter HTML — make sure you have not changed them.'
        );
    }

    // Fill in required fields so submission logic runs the success path
    const firstName = document.querySelector('#first-name');
    const email = document.querySelector('#email');

    const origFirst = firstName.value;
    const origEmail = email.value;

    firstName.value = 'Test';
    email.value = 'test@example.com';

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
    email.value = origEmail;

    // Reset toast
    toast.classList.remove('show');
    toast.hidden = true;
    toast.textContent = '';

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

test('Step 4b: submitting the form with empty fields does NOT show the toast', function() {
    const formEl = document.querySelector('#apply form');
    const toast = document.querySelector('#toast');
    if (!formEl || !toast) {
        throw new Error('Could not find the form inside #apply or #toast.');
    }

    // Clear the fields the student should be checking
    const firstName = document.querySelector('#first-name');
    const email = document.querySelector('#email');

    const origFirst = firstName.value;
    const origEmail = email.value;

    firstName.value = '';
    email.value = '';

    // Reset toast state
    toast.classList.remove('show');
    toast.hidden = true;
    toast.textContent = '';

    // Submit with empty fields
    formEl.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    const hasShow = toast.classList.contains('show');

    // Reset form values
    firstName.value = origFirst;
    email.value = origEmail;

    // Reset toast
    toast.classList.remove('show');
    toast.hidden = true;
    toast.textContent = '';

    if (hasShow) {
        throw new Error(
            'The toast should NOT appear when the form is submitted with empty fields. ' +
            'Check that the first name and email both have values before showing the toast — ' +
            'use if (firstName && email) to verify both are filled in.'
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
    const email = document.querySelector('#email');

    const origFirst = firstName.value;
    const origEmail = email.value;

    firstName.value = 'Test';
    email.value = 'test@example.com';

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

    // Restore setTimeout immediately
    window.setTimeout = originalSetTimeout;

    // Reset form values
    firstName.value = origFirst;
    email.value = origEmail;

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
