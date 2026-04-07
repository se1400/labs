// ─────────────────────────────────────────────────────────────────
// Events & Decisions — Test Suite
// ─────────────────────────────────────────────────────────────────
// Tests simulate user interactions by dispatching events, then
// check the resulting DOM state. Each test corresponds to one step.
// ─────────────────────────────────────────────────────────────────


// ══════════════════════════════════════════════════════════════════
// GETTING STARTED: Script tag in HTML
// ══════════════════════════════════════════════════════════════════

test('Getting Started: The HTML must contain <script defer src="starter.js">', () => {
    const scriptTag = document.querySelector('script[src="starter.js"]');
    if (!scriptTag) {
        throw new Error(
            'No <script src="starter.js"> tag found in the HTML.\n\n' +
            'Click the HTML tab and look just before the closing </head> tag.\n' +
            'It should look like this:\n\n' +
            '  <script defer src="starter.js"></script>\n\n' +
            'If it is missing, add it back. This tag connects your JavaScript to the HTML page.'
        );
    }
    if (!scriptTag.hasAttribute('defer')) {
        throw new Error(
            'The <script> tag is missing the "defer" attribute.\n\n' +
            'Update it to:\n\n' +
            '  <script defer src="starter.js"></script>\n\n' +
            '"defer" tells the browser to wait until the full page has loaded\n' +
            'before running the script — so your code can always find every element.'
        );
    }
});


// ══════════════════════════════════════════════════════════════════
// STEP 1: addEventListener + click — Dark Mode Toggle
// ══════════════════════════════════════════════════════════════════

test('Step 1a: A button with id="theme-toggle" must exist', () => {
    const btn = document.querySelector('#theme-toggle');
    if (!btn) {
        throw new Error(
            'No element with id="theme-toggle" found.\n\n' +
            'Check the HTML tab — the button should already be in the header\n' +
            'inside the .a11y-bar div. Make sure you have not deleted it.'
        );
    }
});

test('Step 1b: Clicking the button adds class "dark-mode" to <body>', () => {
    const btn = document.querySelector('#theme-toggle');
    if (!btn) throw new Error('No #theme-toggle button found. Complete Step 1a first.');

    // Ensure clean state
    document.body.classList.remove('dark-mode');
    btn.click();

    if (!document.body.classList.contains('dark-mode')) {
        throw new Error(
            'Clicking the button did not add "dark-mode" to <body>.\n\n' +
            'In your Step 1 handler, use:\n\n' +
            '  document.body.classList.toggle(\'dark-mode\');\n\n' +
            'classList.toggle() adds the class if it is missing, removes it if it is there.\n' +
            'This is the switch that activates all the dark-mode CSS rules in the stylesheet.'
        );
    }
});

test('Step 1c: Clicking the button again removes class "dark-mode" from <body>', () => {
    const btn = document.querySelector('#theme-toggle');
    if (!btn) throw new Error('No #theme-toggle button found. Complete Step 1a first.');

    // Ensure dark-mode is ON, then click to toggle it off
    document.body.classList.add('dark-mode');
    btn.click();

    if (document.body.classList.contains('dark-mode')) {
        throw new Error(
            'Clicking the button a second time did not remove "dark-mode" from <body>.\n\n' +
            'classList.toggle() handles both directions automatically:\n' +
            '  - First click: class is missing → it gets added\n' +
            '  - Second click: class is present → it gets removed\n\n' +
            'Make sure you are using .toggle() and not .add().'
        );
    }

    // Reset to light mode for subsequent tests
    document.body.classList.remove('dark-mode');
});


// ══════════════════════════════════════════════════════════════════
// STEP 2: addEventListener + input + setProperty — Font Size Slider
// ══════════════════════════════════════════════════════════════════

test('Step 2a: A range input with id="font-slider" must exist', () => {
    const slider = document.querySelector('#font-slider');
    if (!slider) {
        throw new Error(
            'No element with id="font-slider" found.\n\n' +
            'Check the HTML tab — the slider should already be inside\n' +
            'the .a11y-bar in the header. Make sure you have not deleted it.'
        );
    }
    if (slider.type !== 'range') {
        throw new Error(
            'The #font-slider element is not a range input.\n\n' +
            'It should be: <input type="range" id="font-slider" ...>\n' +
            'Check that you have not changed the type attribute.'
        );
    }
});

test('Step 2b: Moving the slider updates --base-font-size on the <html> element', () => {
    const slider = document.querySelector('#font-slider');
    if (!slider) throw new Error('No #font-slider found. Complete Step 2a first.');

    slider.value = '20';
    slider.dispatchEvent(new Event('input', { bubbles: true }));

    const val = document.documentElement.style.getPropertyValue('--base-font-size').trim();
    if (val !== '20px') {
        throw new Error(
            '--base-font-size was not updated when the slider moved.\n\n' +
            'Current value: "' + val + '"\n' +
            'Expected:      "20px"\n\n' +
            'In your Step 2 handler, use:\n\n' +
            '  document.documentElement.style.setProperty(\'--base-font-size\', event.target.value + \'px\');\n\n' +
            'document.documentElement refers to the <html> element — where\n' +
            'CSS custom properties live. The + \'px\' adds the unit.\n\n' +
            'The CSS already sets body { font-size: var(--base-font-size); }\n' +
            'so updating this property changes all text on the page at once.'
        );
    }
});

test('Step 2c: The font size label (#font-size-value) updates to match the slider', () => {
    const slider = document.querySelector('#font-slider');
    const label  = document.querySelector('#font-size-value');

    if (!label) {
        throw new Error(
            'No element with id="font-size-value" found.\n\n' +
            'Check the HTML tab — it should be a <span> next to the slider\n' +
            'inside the .font-control div. Make sure you have not deleted it.'
        );
    }

    slider.value = '18';
    slider.dispatchEvent(new Event('input', { bubbles: true }));

    if (!label.textContent.includes('18')) {
        throw new Error(
            'The font size label was not updated when the slider moved.\n\n' +
            'Current label text: "' + label.textContent + '"\n' +
            'Expected to include: "18"\n\n' +
            'In your Step 2 handler, also update the label:\n\n' +
            '  document.querySelector(\'#font-size-value\').textContent = event.target.value + \'px\';\n\n' +
            'This gives the user visual feedback about the current font size.'
        );
    }

    // Reset slider for subsequent tests
    slider.value = '16';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
});


// ══════════════════════════════════════════════════════════════════
// STEP 3: addEventListener + change + dataset — Department Filter
// ══════════════════════════════════════════════════════════════════

test('Step 3a: A select with id="dept-filter" must exist', () => {
    const sel = document.querySelector('#dept-filter');
    if (!sel) {
        throw new Error(
            'No element with id="dept-filter" found.\n\n' +
            'Check the HTML tab — the dropdown should be inside\n' +
            'the .search-controls div in the Programs section.'
        );
    }
});

test('Step 3b: Selecting "technology" hides all non-technology cards', () => {
    const sel = document.querySelector('#dept-filter');
    if (!sel) throw new Error('No #dept-filter found. Complete Step 3a first.');

    // Reset to 'all' first
    sel.value = 'all';
    sel.dispatchEvent(new Event('change', { bubbles: true }));

    sel.value = 'technology';
    sel.dispatchEvent(new Event('change', { bubbles: true }));

    const wrongCards = [...document.querySelectorAll('.program-card')]
        .filter(c => c.dataset.department !== 'technology' && c.style.display !== 'none');

    if (wrongCards.length > 0) {
        throw new Error(
            wrongCards.length + ' non-technology card(s) are still visible.\n\n' +
            'In your Step 3 handler, loop through all .program-card elements\n' +
            'and hide the ones that do not match the selected department:\n\n' +
            '  const cards = document.querySelectorAll(\'.program-card\');\n' +
            '  for (let i = 0; i < cards.length; i++) {\n' +
            '    if (cards[i].dataset.department === selected) {\n' +
            '      cards[i].style.display = \'\';\n' +
            '    } else {\n' +
            '      cards[i].style.display = \'none\';\n' +
            '    }\n' +
            '  }\n\n' +
            'Each card has a data-department attribute in the HTML.\n' +
            'Access it in JavaScript with card.dataset.department.'
        );
    }
});

test('Step 3c: Selecting "all" makes every card visible again', () => {
    const sel = document.querySelector('#dept-filter');
    if (!sel) throw new Error('No #dept-filter found. Complete Step 3a first.');

    sel.value = 'all';
    sel.dispatchEvent(new Event('change', { bubbles: true }));

    const hiddenCards = [...document.querySelectorAll('.program-card')]
        .filter(c => c.style.display === 'none');

    if (hiddenCards.length > 0) {
        throw new Error(
            hiddenCards.length + ' card(s) are still hidden after selecting "All Departments".\n\n' +
            'When selected === \'all\', your loop should show every card:\n\n' +
            '  if (selected === \'all\' || cards[i].dataset.department === selected) {\n' +
            '    cards[i].style.display = \'\';\n' +
            '  } else {\n' +
            '    cards[i].style.display = \'none\';\n' +
            '  }\n\n' +
            'Setting style.display to \'\' (an empty string) removes the inline\n' +
            'style you set earlier, so the card goes back to its default display.'
        );
    }
});


// ══════════════════════════════════════════════════════════════════
// STEP 4: addEventListener + input + if/else — Live Search
// ══════════════════════════════════════════════════════════════════

test('Step 4a: A text input with id="program-search" must exist', () => {
    const input = document.querySelector('#program-search');
    if (!input) {
        throw new Error(
            'No element with id="program-search" found.\n\n' +
            'Check the HTML tab — the search input should be inside\n' +
            'the .search-controls div in the Programs section.'
        );
    }
});

test('Step 4b: Typing filters cards — only name-matching cards are visible', () => {
    // Reset dropdown first
    const sel = document.querySelector('#dept-filter');
    if (sel) {
        sel.value = 'all';
        sel.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const input = document.querySelector('#program-search');
    if (!input) throw new Error('No #program-search found. Complete Step 4a first.');

    input.value = 'nursing';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    const visibleCards = [...document.querySelectorAll('.program-card')]
        .filter(c => c.style.display !== 'none');
    const allMatch = visibleCards.length > 0 &&
        visibleCards.every(c => c.dataset.name.toLowerCase().includes('nursing'));

    if (!allMatch) {
        throw new Error(
            'Typing "nursing" did not correctly filter the program cards.\n\n' +
            'Visible cards: ' + visibleCards.map(c => c.dataset.name).join(', ') + '\n\n' +
            'In your Step 4 handler:\n\n' +
            '  const searchTerm = event.target.value.toLowerCase();\n' +
            '  const cards = document.querySelectorAll(\'.program-card\');\n' +
            '  for (let i = 0; i < cards.length; i++) {\n' +
            '    const name = cards[i].dataset.name.toLowerCase();\n' +
            '    if (name.includes(searchTerm)) {\n' +
            '      cards[i].style.display = \'\';\n' +
            '    } else {\n' +
            '      cards[i].style.display = \'none\';\n' +
            '    }\n' +
            '  }\n\n' +
            '.toLowerCase() makes the search case-insensitive so "Nursing" matches "nursing".\n' +
            '.includes(searchTerm) checks if the card name contains the typed text.'
        );
    }
});

test('Step 4c: Clearing the search field shows all cards again', () => {
    const input = document.querySelector('#program-search');
    if (!input) throw new Error('No #program-search found. Complete Step 4a first.');

    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    const hiddenCards = [...document.querySelectorAll('.program-card')]
        .filter(c => c.style.display === 'none');

    if (hiddenCards.length > 0) {
        throw new Error(
            hiddenCards.length + ' card(s) are still hidden after clearing the search.\n\n' +
            'An empty string ("") is falsy in JavaScript. Use that to show all cards:\n\n' +
            '  const searchTerm = event.target.value.toLowerCase();\n' +
            '  if (!searchTerm || name.includes(searchTerm)) {\n' +
            '    cards[i].style.display = \'\';\n' +
            '  } else {\n' +
            '    cards[i].style.display = \'none\';\n' +
            '  }\n\n' +
            '!searchTerm is true when the field is empty — the OR (||) means\n' +
            '"if the field is blank, always show the card."'
        );
    }
});


// ══════════════════════════════════════════════════════════════════
// STEP 5: addEventListener + submit + preventDefault — Inquiry Form
// ══════════════════════════════════════════════════════════════════

test('Step 5a: A form with id="inquiry-form" must exist', () => {
    const form = document.querySelector('#inquiry-form');
    if (!form) {
        throw new Error(
            'No element with id="inquiry-form" found.\n\n' +
            'Check the HTML tab — the form should be in the Inquiry section.\n' +
            'Make sure you have not deleted or renamed it.'
        );
    }
});

test('Step 5b: A div with id="form-message" must exist inside the form', () => {
    const msg = document.querySelector('#form-message');
    if (!msg) {
        throw new Error(
            'No element with id="form-message" found.\n\n' +
            'Check the HTML tab — there should be an empty <div id="form-message">\n' +
            'at the bottom of #inquiry-form. Make sure you have not deleted it.\n\n' +
            'Your JavaScript will set its textContent and className to show\n' +
            'success or error messages without a page reload.'
        );
    }
});

test('Step 5c: Submitting with an empty name shows an error message', () => {
    const form    = document.querySelector('#inquiry-form');
    const nameIn  = document.querySelector('#inq-name');
    const emailIn = document.querySelector('#inq-email');
    const progSel = document.querySelector('#inq-program');
    const msg     = document.querySelector('#form-message');

    if (!form || !nameIn || !emailIn || !progSel || !msg) {
        throw new Error('Required form elements are missing. Check the HTML tab.');
    }

    // Leave name empty, fill others
    nameIn.value  = '';
    emailIn.value = 'test@example.com';
    progSel.value = 'Nursing';

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    if (msg.className !== 'error') {
        throw new Error(
            'Expected an error message when name is empty, but class is: "' + msg.className + '".\n\n' +
            'In your Step 5 handler:\n\n' +
            '  const name = document.getElementById(\'inq-name\').value.trim();\n' +
            '  if (!name) {\n' +
            '    msg.textContent = \'Please enter your full name.\';\n' +
            '    msg.className = \'error\';\n' +
            '  }\n\n' +
            '!name is true when the field is empty or contains only spaces\n' +
            '(.trim() removes leading/trailing whitespace before the check).\n\n' +
            'The CSS already shows/hides #form-message based on its class name.'
        );
    }
});

test('Step 5d: Submitting with an empty email shows an error message', () => {
    const form    = document.querySelector('#inquiry-form');
    const nameIn  = document.querySelector('#inq-name');
    const emailIn = document.querySelector('#inq-email');
    const progSel = document.querySelector('#inq-program');
    const msg     = document.querySelector('#form-message');

    // Fill name, leave email empty
    nameIn.value  = 'Jane Smith';
    emailIn.value = '';
    progSel.value = 'Nursing';

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    if (msg.className !== 'error') {
        throw new Error(
            'Expected an error message when email is empty, but class is: "' + msg.className + '".\n\n' +
            'Add an else if for the email check:\n\n' +
            '  } else if (!email) {\n' +
            '    msg.textContent = \'Please enter your email address.\';\n' +
            '    msg.className = \'error\';\n' +
            '  }\n\n' +
            'The else if only runs when the name check passed but email is empty.'
        );
    }
});

test('Step 5e: Submitting with no program selected shows an error message', () => {
    const form    = document.querySelector('#inquiry-form');
    const nameIn  = document.querySelector('#inq-name');
    const emailIn = document.querySelector('#inq-email');
    const progSel = document.querySelector('#inq-program');
    const msg     = document.querySelector('#form-message');

    // Fill name and email, leave program empty
    nameIn.value  = 'Jane Smith';
    emailIn.value = 'jane@example.com';
    progSel.value = '';

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    if (msg.className !== 'error') {
        throw new Error(
            'Expected an error message when no program is selected, but class is: "' + msg.className + '".\n\n' +
            'Add an else if for the program check:\n\n' +
            '  } else if (!program) {\n' +
            '    msg.textContent = \'Please select a program of interest.\';\n' +
            '    msg.className = \'error\';\n' +
            '  }\n\n' +
            'The default <option value=""> at the top of the select is falsy,\n' +
            'so !program is true when nothing is selected.'
        );
    }
});

test('Step 5f: Submitting valid data shows a success message', () => {
    const form    = document.querySelector('#inquiry-form');
    const nameIn  = document.querySelector('#inq-name');
    const emailIn = document.querySelector('#inq-email');
    const progSel = document.querySelector('#inq-program');
    const msg     = document.querySelector('#form-message');

    // Fill all fields with valid data
    nameIn.value  = 'Jane Smith';
    emailIn.value = 'jane@example.com';
    progSel.value = 'Nursing';

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    if (msg.className !== 'success') {
        throw new Error(
            'Expected a success message when all fields are valid, but class is: "' + msg.className + '".\n\n' +
            'Add the else branch:\n\n' +
            '  } else {\n' +
            '    msg.textContent = \'Thank you, \' + name + \'! We will be in touch soon.\';\n' +
            '    msg.className = \'success\';\n' +
            '  }\n\n' +
            'The else block only runs when all the if/else if checks above it failed —\n' +
            'meaning the name, email, and program are all valid.'
        );
    }
});

test('Step 5g: The success message includes the student\'s name', () => {
    const msg = document.querySelector('#form-message');
    if (!msg || !msg.textContent.includes('Jane Smith')) {
        throw new Error(
            'The success message does not include the student\'s name.\n\n' +
            'Current message: "' + (msg ? msg.textContent : 'none') + '"\n\n' +
            'Include the name variable in your success message:\n\n' +
            '  msg.textContent = \'Thank you, \' + name + \'! We will be in touch soon.\';\n\n' +
            'Personalizing the message makes it clear the form actually worked.'
        );
    }
});
