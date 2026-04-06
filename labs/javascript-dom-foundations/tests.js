// ─────────────────────────────────────────────────────────────────
// Lab 18: JavaScript DOM Foundations — Test Suite
// ─────────────────────────────────────────────────────────────────
// Tests check DOM state after your JavaScript runs.
// Each test corresponds to one step in the lab.
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
            'The script tag should already be there — make sure you have not\n' +
            'accidentally deleted it.\n\n' +
            'It should look like this:\n\n' +
            '  <script defer src="starter.js"></script>\n\n' +
            'If it is missing, add it back on the line just before </head>.\n' +
            'This tag is what connects your JavaScript file to the HTML page.'
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
// STEP 1: querySelector + textContent
// ══════════════════════════════════════════════════════════════════

test('Step 1a: The h1 element must exist on the page', () => {
    const h1 = document.querySelector('h1');
    if (!h1) {
        throw new Error(
            'No <h1> element found on the page.\n\n' +
            'This test should always pass — check that you have not accidentally deleted the h1 from your HTML.'
        );
    }
});

test('Step 1b: Change the h1 textContent to "Utah Tech — Trailblazers"', () => {
    const h1 = document.querySelector('h1');
    if (!h1) {
        throw new Error('No <h1> element found on the page.');
    }
    if (h1.textContent.trim() !== 'Utah Tech — Trailblazers') {
        throw new Error(
            'The h1 text has not been updated.\n\n' +
            'Current text: "' + h1.textContent + '"\n' +
            'Expected:     "Utah Tech — Trailblazers"\n\n' +
            'Use document.querySelector(\'h1\') to find the heading, then set\n' +
            'its textContent property to the expected string.\n\n' +
            'Note: The dash is an em dash (—), not a regular hyphen (-).\n' +
            'Copy it directly from the description to avoid a mismatch.'
        );
    }
});

test('Step 1c: Change the hero heading to "Your Future Starts Here"', () => {
    const heroHeading = document.querySelector('#welcome h2');
    if (!heroHeading) {
        throw new Error(
            'No <h2> found inside #welcome.\n\n' +
            'The selector "#welcome h2" uses a descendant combinator (a space)\n' +
            'to find any h2 anywhere inside the #welcome element.\n\n' +
            'Make sure you have not removed the hero section from the HTML.'
        );
    }
    if (heroHeading.textContent.trim() !== 'Your Future Starts Here') {
        throw new Error(
            'The hero heading has not been updated.\n\n' +
            'Current text: "' + heroHeading.textContent + '"\n' +
            'Expected:     "Your Future Starts Here"\n\n' +
            'Use document.querySelector(\'#welcome h2\') to find the heading\n' +
            'inside the hero section, then set its textContent property.\n\n' +
            'Copy the expected text exactly — capitalisation matters.'
        );
    }
});


// ══════════════════════════════════════════════════════════════════
// STEP 2: style.setProperty()
// ══════════════════════════════════════════════════════════════════

test('Step 2: Set --color-accent using style.setProperty()', () => {
    const value = document.documentElement.style.getPropertyValue('--color-accent').trim();
    if (!value) {
        throw new Error(
            '--color-accent has not been set as an inline style.\n\n' +
            'Use setProperty() on document.documentElement (the <html> element):\n\n' +
            '  document.documentElement.style.setProperty(\'--color-accent\', \'#2d8a4e\');\n\n' +
            'Because every accent-colored element in this CSS uses var(--color-accent),\n' +
            'this single line recolors headings, buttons, panel borders, and more.\n\n' +
            'You can use any valid CSS color value.'
        );
    }
});


// ══════════════════════════════════════════════════════════════════
// STEP 3: classList.add()
// ══════════════════════════════════════════════════════════════════

test('Step 3a: Add the "highlighted" class to the #colleges panel', () => {
    const colleges = document.querySelector('#colleges');
    if (!colleges) {
        throw new Error('No element with id="colleges" found. Do not remove it from the HTML.');
    }
    if (!colleges.classList.contains('highlighted')) {
        throw new Error(
            'The #colleges element does not have the "highlighted" class.\n\n' +
            'Use document.querySelector(\'#colleges\') to find the panel,\n' +
            'then call .classList.add(\'highlighted\') on it.\n\n' +
            'The .highlighted class is already written in the CSS —\n' +
            'your job is to apply it with JavaScript.'
        );
    }
});

test('Step 3b: The highlighted class must be on an element that also has class "panel"', () => {
    const el = document.querySelector('.panel.highlighted');
    if (!el) {
        throw new Error(
            'No element found with both class "panel" and class "highlighted".\n\n' +
            'The #colleges element already has class="panel" in the HTML. ' +
            'classList.add(\'highlighted\') adds the second class to that same element.\n\n' +
            'Make sure you are selecting #colleges (not a child element inside it).'
        );
    }
});


// ══════════════════════════════════════════════════════════════════
// STEP 4: createElement + appendChild + remove()
// ══════════════════════════════════════════════════════════════════

test('Step 4a: An element with class "announcement" must exist', () => {
    const announcement = document.querySelector('.announcement');
    if (!announcement) {
        throw new Error(
            'No element with class "announcement" found on the page.\n\n' +
            'Create it with JavaScript:\n\n' +
            '  const banner = document.createElement(\'div\');\n' +
            '  banner.classList.add(\'announcement\');\n' +
            '  banner.textContent = \'New student applications are now open!\';\n\n' +
            'Then append it to the header:\n\n' +
            '  const header = document.querySelector(\'header\');\n' +
            '  header.appendChild(banner);'
        );
    }
});

test('Step 4b: The announcement element must be inside the <header>', () => {
    const announcement = document.querySelector('header .announcement');
    if (!announcement) {
        throw new Error(
            'The .announcement element was not found inside the <header>.\n\n' +
            'Use appendChild() to add it to the header:\n\n' +
            '  const header = document.querySelector(\'header\');\n' +
            '  header.appendChild(banner);\n\n' +
            'appendChild() adds the element as the last child of the target.'
        );
    }
});

test('Step 4c: The announcement must contain the correct text', () => {
    const announcement = document.querySelector('.announcement');
    if (!announcement) {
        throw new Error('No .announcement element found. Complete Step 4a first.');
    }
    const expected = 'New student applications are now open!';
    if (announcement.textContent.trim() !== expected) {
        throw new Error(
            'The announcement text does not match.\n\n' +
            'Current:  "' + announcement.textContent + '"\n' +
            'Expected: "' + expected + '"\n\n' +
            'Set the text before appending:\n\n' +
            '  banner.textContent = \'' + expected + '\';'
        );
    }
});

test('Step 4d: The #info-banner placeholder must be removed', () => {
    const banner = document.querySelector('#info-banner');
    if (banner) {
        throw new Error(
            'The #info-banner placeholder is still on the page.\n\n' +
            'Use .remove() to delete it:\n\n' +
            '  document.querySelector(\'#info-banner\').remove();\n\n' +
            '.remove() deletes the element from the DOM immediately. ' +
            'No parent or container needed.'
        );
    }
});


// ══════════════════════════════════════════════════════════════════
// STEP 5: dataset + template literals + innerHTML
// ══════════════════════════════════════════════════════════════════

test('Step 5a: The color swatch HTML must be intact (data-color="#BA1C21")', () => {
    const swatch = document.querySelector('.color-swatch');
    if (!swatch) {
        throw new Error(
            'No element with class "color-swatch" found in the HTML.\n\n' +
            'This test checks that the starter HTML is intact — it is not\n' +
            'testing your JavaScript code.\n\n' +
            'Click the HTML tab and make sure the three color swatch elements\n' +
            'inside the header are still there. They should look like:\n\n' +
            '  <div class="color-swatch" data-color="#BA1C21" data-name="Rock Red"></div>\n\n' +
            'Do not delete or modify these elements — your JavaScript reads data from them.'
        );
    }
    if (swatch.dataset.color !== '#BA1C21') {
        throw new Error(
            'The first color swatch\'s data-color attribute has been changed.\n\n' +
            'This test checks that the starter HTML is intact — it is not\n' +
            'testing your JavaScript code.\n\n' +
            'Expected: data-color="#BA1C21"\n' +
            'Found:    data-color="' + swatch.dataset.color + '"\n\n' +
            'Click the HTML tab and restore the first swatch to its original value.\n' +
            'Your JavaScript should only read this value, never change it.'
        );
    }
});

test('Step 5b: The #swatch-label container in the footer must contain an injected <p> element', () => {
    const p = document.querySelector('#swatch-label p');
    if (!p) {
        throw new Error(
            'No <p> element found inside #swatch-label.\n\n' +
            'Use innerHTML with a template literal to inject it:\n\n' +
            '  const label = `${swatchName}: ${color}`;\n' +
            '  const labelContainer = document.querySelector(\'#swatch-label\');\n' +
            '  labelContainer.innerHTML = `<p class="swatch-label">${label}</p>`;\n\n' +
            'innerHTML parses the string as HTML, so the <p> tag becomes a real element.\n\n' +
            'Note: #swatch-label is in the footer — the swatch circles stay in the header.'
        );
    }
});

test('Step 5c: The injected label must include the swatch name and color value', () => {
    const p = document.querySelector('#swatch-label p');
    if (!p) {
        throw new Error('No <p> found in #swatch-label. Complete Step 5b first.');
    }
    const text = p.textContent;
    if (!text.includes('Rock Red') || !text.includes('#BA1C21')) {
        throw new Error(
            'The swatch label does not contain the expected name and color.\n\n' +
            'Current label text: "' + text + '"\n' +
            'Expected to include: "Rock Red" and "#BA1C21"\n\n' +
            'Read the first swatch\'s dataset values and build a label with a template literal:\n\n' +
            '  const swatch     = document.querySelector(\'.color-swatch\');\n' +
            '  const color      = swatch.dataset.color;       // "#BA1C21"\n' +
            '  const swatchName = swatch.dataset.name;        // "Rock Red"\n' +
            '  const label      = `${swatchName}: ${color}`;  // "Rock Red: #BA1C21"\n' +
            '  labelContainer.innerHTML = `<p class="swatch-label">${label}</p>`;\n\n' +
            'Template literals use backticks (`) and ${} to embed variables.\n\n' +
            'Tip: Avoid using "name" as a variable — it conflicts with a browser built-in.\n' +
            'Use "swatchName" instead.'
        );
    }
});

test('Step 5d: --color-accent must be set to the first swatch color (#BA1C21)', () => {
    const value = document.documentElement.style.getPropertyValue('--color-accent').trim();
    if (value.toLowerCase() !== '#ba1c21') {
        throw new Error(
            '--color-accent should be "#BA1C21" (Rock Red — the first swatch color).\n\n' +
            'Current value: "' + value + '"\n\n' +
            'Use the color value you read from dataset.color:\n\n' +
            '  const color = swatch.dataset.color;\n' +
            '  document.documentElement.style.setProperty(\'--color-accent\', color);\n\n' +
            'This applies the swatch\'s data-color value as the new accent color.'
        );
    }
});
