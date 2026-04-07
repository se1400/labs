// Lab 19: JavaScript Events & Decisions — Answer Key
// ─────────────────────────────────────────────────────────


// ── Step 1: click — toggle Areas of Interest ─────────────

const toggleBtn = document.querySelector('#toggle-interests');

toggleBtn.addEventListener('click', function() {
    const content = document.querySelector('#interests-content');
    content.classList.toggle('hidden');
    toggleBtn.textContent = content.classList.contains('hidden') ? 'Show' : 'Hide';
});


// ── Step 2: input — character counter ────────────────────

const statement = document.querySelector('#statement');
const charCount = document.querySelector('#char-count');

statement.addEventListener('input', function(event) {
    const length = event.target.value.length;
    if (length >= 100) {
        charCount.textContent = `Looks great! (${length} characters)`;
    } else if (length >= 50) {
        charCount.textContent = `Getting there (${length} characters)`;
    } else {
        charCount.textContent = `Keep writing... (${length} characters)`;
    }
});


// ── Step 3: input — username validation ──────────────────

const usernameInput = document.querySelector('#username');
const usernameHint = document.querySelector('#username-hint');

usernameInput.addEventListener('input', function(event) {
    const value = event.target.value;
    if (!value) {
        usernameHint.textContent = '';
    } else if (value.includes(' ')) {
        usernameHint.textContent = 'No spaces allowed';
    } else if (value.length < 4) {
        usernameHint.textContent = 'Too short — at least 4 characters needed';
    } else {
        usernameHint.textContent = 'Username looks good!';
    }
});


// ── Step 4: change — major selection feedback ─────────────

const majorSelect = document.querySelector('#major');
const majorFeedback = document.querySelector('#major-feedback');

majorSelect.addEventListener('change', function(event) {
    const value = event.target.value;
    if (value === 'cs' || value === 'se' || value === 'cyber') {
        majorFeedback.textContent = 'Great choice! The School of Computing prepares students for in-demand tech careers.';
    } else if (value === 'nursing' || value === 'public-health') {
        majorFeedback.textContent = 'The College of Health Sciences has state-of-the-art simulation labs.';
    } else if (value === 'bio') {
        majorFeedback.textContent = "Biology students benefit from Utah Tech's unique desert research environment.";
    } else if (value === '') {
        majorFeedback.textContent = '';
    } else {
        majorFeedback.textContent = 'Great choice! Our faculty are dedicated to your success.';
    }
});


// ── Step 5: submit — form validation ──────────────────────

const form = document.querySelector('#apply form');
const formFeedback = document.querySelector('#form-feedback');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.querySelector('#first-name').value;
    const email = document.querySelector('#email').value;

    if (!firstName || !email) {
        formFeedback.textContent = 'Please fill in your name and email address before submitting.';
        formFeedback.className = 'form-feedback error';
        formFeedback.hidden = false;
    } else {
        formFeedback.textContent = firstName + ', your application has been received! We\'ll be in touch at ' + email + '.';
        formFeedback.className = 'form-feedback success';
        formFeedback.hidden = false;
    }
});
