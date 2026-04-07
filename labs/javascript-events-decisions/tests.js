// Lab 19: JavaScript Events & Decisions — Tests
// ─────────────────────────────────────────────────────────
// These tests inspect the live DOM after your JS runs.
// For event-driven steps, each test triggers the event
// programmatically, checks the result, then resets state.
// ─────────────────────────────────────────────────────────


// ── Step 1: click — toggle Areas of Interest ─────────────

test('Step 1a: #toggle-interests button is in the HTML', function() {
    const btn = document.querySelector('#toggle-interests');
    if (!btn) {
        throw new Error(
            '#toggle-interests was not found. ' +
            'This button is already in the starter HTML — make sure you have not changed it.'
        );
    }
});

test('Step 1b: #interests-content div is in the HTML', function() {
    const content = document.querySelector('#interests-content');
    if (!content) {
        throw new Error(
            '#interests-content was not found. ' +
            'This div is already in the starter HTML — make sure you have not changed it.'
        );
    }
});

test('Step 1c: clicking the toggle button hides and shows the interests section', function() {
    const btn = document.querySelector('#toggle-interests');
    const content = document.querySelector('#interests-content');
    if (!btn || !content) {
        throw new Error(
            'Could not find #toggle-interests or #interests-content. ' +
            'Have you accidentally changed the HTML?'
        );
    }

    // Ensure a known starting state — content visible, button reads "Hide"
    content.classList.remove('hidden');

    btn.click();
    const isHiddenAfterFirst = content.classList.contains('hidden');

    btn.click();
    const isHiddenAfterSecond = content.classList.contains('hidden');

    if (!isHiddenAfterFirst) {
        throw new Error(
            'The first click on #toggle-interests should hide #interests-content ' +
            'by adding the "hidden" class. ' +
            'Use classList.toggle("hidden") inside your click listener.'
        );
    }

    if (isHiddenAfterSecond) {
        throw new Error(
            'The second click on #toggle-interests should show #interests-content again ' +
            'by removing the "hidden" class. ' +
            'Make sure you are using classList.toggle("hidden") — not classList.add("hidden").'
        );
    }
});

test('Step 1d: the button label flips between "Show" and "Hide" when clicked', function() {
    const btn = document.querySelector('#toggle-interests');
    const content = document.querySelector('#interests-content');
    if (!btn || !content) {
        throw new Error(
            'Could not find #toggle-interests or #interests-content. ' +
            'Have you accidentally changed the HTML?'
        );
    }

    // Ensure known starting state
    content.classList.remove('hidden');

    btn.click();
    const labelWhenHidden = btn.textContent.trim();

    btn.click();
    const labelWhenVisible = btn.textContent.trim();

    if (labelWhenHidden !== 'Show') {
        throw new Error(
            'After clicking to hide the section, the button label should change to "Show". ' +
            'Use the ternary operator after classList.toggle to update the button\'s textContent: ' +
            'if the content is now hidden, show "Show"; otherwise show "Hide".'
        );
    }

    if (labelWhenVisible !== 'Hide') {
        throw new Error(
            'After clicking to show the section again, the button label should flip back to "Hide". ' +
            'Make sure your ternary checks classList.contains("hidden") after the toggle.'
        );
    }
});


// ── Step 2: input — character counter ────────────────────

test('Step 2a: #char-count element is in the HTML', function() {
    const charCount = document.querySelector('#char-count');
    if (!charCount) {
        throw new Error(
            '#char-count was not found. ' +
            'This element is already in the starter HTML — make sure you have not changed it.'
        );
    }
});

test('Step 2b: typing in the Personal Statement updates the character count', function() {
    const textarea = document.querySelector('#statement');
    const charCount = document.querySelector('#char-count');
    if (!textarea || !charCount) {
        throw new Error('#statement or #char-count not found. Have you changed the HTML?');
    }

    const saved = textarea.value;
    textarea.value = 'Hello world';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    const shows11 = charCount.textContent.includes('11');

    textarea.value = saved;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    if (!shows11) {
        throw new Error(
            'The character count should show the number of characters typed. ' +
            'Inside your input listener, read event.target.value.length and display it in #char-count.'
        );
    }
});

test('Step 2c: the message changes between short text and long text', function() {
    const textarea = document.querySelector('#statement');
    const charCount = document.querySelector('#char-count');
    if (!textarea || !charCount) {
        throw new Error('#statement or #char-count not found. Have you changed the HTML?');
    }

    const saved = textarea.value;

    textarea.value = 'Hi';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    const shortMsg = charCount.textContent;

    textarea.value = 'A'.repeat(120);
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    const longMsg = charCount.textContent;

    textarea.value = saved;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    if (shortMsg === longMsg) {
        throw new Error(
            'The message in #char-count should change depending on how much text is written. ' +
            'Use if/else if/else to show different messages for short, medium, and long entries ' +
            '(for example: "Keep writing...", "Getting there", "Looks great!").'
        );
    }
});


// ── Step 3: input — username validation ──────────────────

test('Step 3a: #username-hint element is in the HTML', function() {
    const hint = document.querySelector('#username-hint');
    if (!hint) {
        throw new Error(
            '#username-hint was not found. ' +
            'This element is already in the starter HTML — make sure you have not changed it.'
        );
    }
});

test('Step 3b: typing a short username shows an error hint', function() {
    const input = document.querySelector('#username');
    const hint = document.querySelector('#username-hint');
    if (!input || !hint) {
        throw new Error('#username or #username-hint not found. Have you changed the HTML?');
    }

    const saved = input.value;
    input.value = 'ab';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    const hintText = hint.textContent.trim();

    input.value = saved;
    input.dispatchEvent(new Event('input', { bubbles: true }));

    if (!hintText) {
        throw new Error(
            'When the username is too short, #username-hint should show an error message. ' +
            'Check your if/else if/else — one branch should handle values shorter than 4 characters.'
        );
    }
});

test('Step 3c: a valid username (4+ characters, no spaces) shows a positive hint', function() {
    const input = document.querySelector('#username');
    const hint = document.querySelector('#username-hint');
    if (!input || !hint) {
        throw new Error('#username or #username-hint not found. Have you changed the HTML?');
    }

    const saved = input.value;
    input.value = 'trailblazer';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    const hintText = hint.textContent.toLowerCase().trim();

    input.value = saved;
    input.dispatchEvent(new Event('input', { bubbles: true }));

    if (!hintText) {
        throw new Error(
            'When the username is valid (4 or more characters with no spaces), ' +
            '#username-hint should show a success message. ' +
            'Make sure your final else branch sets a message like "Username looks good!"'
        );
    }

    if (hintText.includes('too short') || hintText.includes('no space') || hintText.includes('spaces allowed')) {
        throw new Error(
            'The username "trailblazer" is valid — 11 characters, no spaces — but your code ' +
            'is still showing an error message. Check the order of your if/else if/else conditions. ' +
            'The empty check should come first, then the space check, then the length check, ' +
            'then the success message in the final else.'
        );
    }
});


// ── Step 4: change — major selection feedback ─────────────

test('Step 4a: #major-feedback element is in the HTML', function() {
    const feedback = document.querySelector('#major-feedback');
    if (!feedback) {
        throw new Error(
            '#major-feedback was not found. ' +
            'This element is already in the starter HTML — make sure you have not changed it.'
        );
    }
});

test('Step 4b: selecting a major updates the major feedback text', function() {
    const select = document.querySelector('#major');
    const feedback = document.querySelector('#major-feedback');
    if (!select || !feedback) {
        throw new Error('#major or #major-feedback not found. Have you changed the HTML?');
    }

    const saved = select.value;
    select.value = 'cs';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    const feedbackText = feedback.textContent.trim();

    select.value = saved;
    select.dispatchEvent(new Event('change', { bubbles: true }));

    if (!feedbackText) {
        throw new Error(
            'Selecting a major should update #major-feedback with information about that program. ' +
            'Use addEventListener("change") and if/else if/else to show different messages ' +
            'for different major values.'
        );
    }
});


// ── Step 5: submit — form validation ──────────────────────

test('Step 5a: #form-feedback element is in the HTML', function() {
    const feedback = document.querySelector('#form-feedback');
    if (!feedback) {
        throw new Error(
            '#form-feedback was not found. ' +
            'This element is already in the starter HTML — make sure you have not changed it.'
        );
    }
});

test('Step 5b: submitting with empty name and email shows an error message', function() {
    const firstNameInput = document.querySelector('#first-name');
    const emailInput = document.querySelector('#email');
    const feedback = document.querySelector('#form-feedback');
    const form = document.querySelector('#apply form');
    if (!form || !feedback || !firstNameInput || !emailInput) {
        throw new Error('Required elements not found. Have you changed the HTML?');
    }

    const savedFirst = firstNameInput.value;
    const savedEmail = emailInput.value;
    firstNameInput.value = '';
    emailInput.value = '';

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    const errorText = feedback.textContent.trim();

    firstNameInput.value = savedFirst;
    emailInput.value = savedEmail;

    if (!errorText) {
        throw new Error(
            'Submitting the form with an empty name and email should show an error message in #form-feedback. ' +
            'Inside your submit handler, set the textContent of #form-feedback to an error message ' +
            'when either the name or email field is empty.'
        );
    }
});

test('Step 5c: submitting with a name and email shows a personalized success message', function() {
    const firstNameInput = document.querySelector('#first-name');
    const emailInput = document.querySelector('#email');
    const feedback = document.querySelector('#form-feedback');
    const form = document.querySelector('#apply form');
    if (!form || !feedback || !firstNameInput || !emailInput) {
        throw new Error('Required elements not found. Have you changed the HTML?');
    }

    const savedFirst = firstNameInput.value;
    const savedEmail = emailInput.value;
    firstNameInput.value = 'Alex';
    emailInput.value = 'alex@example.com';

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    const text = feedback.textContent.toLowerCase();
    const includesName = text.includes('alex');

    firstNameInput.value = savedFirst;
    emailInput.value = savedEmail;

    if (!text) {
        throw new Error(
            'Submitting with a valid name and email should show a success message in #form-feedback. ' +
            'Make sure your else branch sets the textContent and makes the element visible.'
        );
    }

    if (!includesName) {
        throw new Error(
            'The success message should be personalized — include the user\'s first name in the message. ' +
            'You already have the name stored in a variable, so embed it using a template literal. ' +
            '(e.g. "Alex, your application has been received!")'
        );
    }
});

test('Step 5d: the error message has the "error" class and the success message has the "success" class', function() {
    const firstNameInput = document.querySelector('#first-name');
    const emailInput = document.querySelector('#email');
    const feedback = document.querySelector('#form-feedback');
    const form = document.querySelector('#apply form');
    if (!form || !feedback || !firstNameInput || !emailInput) {
        throw new Error('Required elements not found. Have you changed the HTML?');
    }

    // Test error class
    firstNameInput.value = '';
    emailInput.value = '';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const hasError = feedback.classList.contains('error');

    // Test success class
    firstNameInput.value = 'Alex';
    emailInput.value = 'alex@example.com';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const hasSuccess = feedback.classList.contains('success');

    // Reset
    firstNameInput.value = '';
    emailInput.value = '';

    if (!hasError || !hasSuccess) {
        throw new Error(
            'When showing an error, set the className of #form-feedback to "form-feedback error". ' +
            'When showing a success message, set it to "form-feedback success". ' +
            'This applies the correct color styling to the feedback box.'
        );
    }
});
