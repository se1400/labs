// Lab 19: JavaScript Events & Decisions — Tests
// ─────────────────────────────────────────────────────────
// These tests inspect the live DOM after your JS runs.
// For event-driven steps, each test triggers the event
// programmatically, checks the result, then resets state.
// ─────────────────────────────────────────────────────────


// ── Getting Started ───────────────────────────────────────

test('Getting Started: script tag with defer attribute exists', function() {
    const script = document.querySelector('script[src="starter.js"]');
    if (!script) {
        throw new Error(
            'The <script defer src="starter.js"> tag was not found in the HTML. ' +
            'It should already be there — make sure you have not accidentally deleted it.'
        );
    }
    if (!script.hasAttribute('defer')) {
        throw new Error(
            'The script tag exists but is missing the defer attribute. ' +
            'Make sure it reads: <script defer src="starter.js">'
        );
    }
});


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

    btn.click();
    const isHidden = content.classList.contains('hidden');
    btn.click(); // restore

    if (!isHidden) {
        throw new Error(
            'Clicking #toggle-interests should toggle the "hidden" class on #interests-content. ' +
            'Use addEventListener("click") and classList.toggle("hidden") to make this work.'
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
    const hintText = hint.textContent.toLowerCase();

    input.value = saved;
    input.dispatchEvent(new Event('input', { bubbles: true }));

    const isPositive =
        hintText.includes('good') ||
        hintText.includes('great') ||
        hintText.includes('valid') ||
        hintText.includes('looks') ||
        hintText.includes('nice');

    if (!isPositive) {
        throw new Error(
            'When the username is valid (4 or more characters with no spaces), ' +
            '#username-hint should show a positive message like "Username looks good!"'
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

    const showsError = !feedback.hidden || feedback.textContent.trim().length > 0;

    firstNameInput.value = savedFirst;
    emailInput.value = savedEmail;

    if (!showsError) {
        throw new Error(
            'Submitting the form with an empty name and email should show an error message in #form-feedback. ' +
            'Check your truthy/falsy condition: if (!firstName || !email)'
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
    const isPersonalized = text.includes('alex') || text.includes('received') || text.includes('thank');

    firstNameInput.value = savedFirst;
    emailInput.value = savedEmail;

    if (!isPersonalized) {
        throw new Error(
            'Submitting with a valid name and email should show a personalized success message in #form-feedback. ' +
            'Try including the first name (e.g. "Alex, your application has been received!").'
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
            'When showing an error, set formFeedback.className = "form-feedback error". ' +
            'When showing a success message, set formFeedback.className = "form-feedback success". ' +
            'This applies the correct color styling to the feedback box.'
        );
    }
});
