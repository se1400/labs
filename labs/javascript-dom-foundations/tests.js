// ─────────────────────────────────────────────────────────────────
// Lab 18: JavaScript DOM Foundations — Test Suite
// ─────────────────────────────────────────────────────────────────
// Tests check DOM state after your JavaScript runs.
// Each test corresponds to one step in the lab.
// ─────────────────────────────────────────────────────────────────


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
    if (h1.textContent !== 'Utah Tech — Trailblazers') {
        throw new Error(
            'The h1 text has not been updated.\n\n' +
            'Current text: "' + h1.textContent + '"\n' +
            'Expected:     "Utah Tech — Trailblazers"\n\n' +
            'Use querySelector and textContent:\n\n' +
            '  const heading = document.querySelector(\'h1\');\n' +
            '  heading.textContent = \'Utah Tech — Trailblazers\';\n\n' +
            'Note: The dash is an em dash (—), not a regular hyphen (-).'
        );
    }
});

test('Step 1c: Change the header tagline to "Where curiosity meets red rock country."', () => {
    const tagline = document.querySelector('header > p');
    if (!tagline) {
        throw new Error(
            'No <p> found as a direct child of <header>.\n\n' +
            'The selector "header > p" targets the tagline paragraph. ' +
            'Make sure you have not deleted or moved it.'
        );
    }
    if (tagline.textContent !== 'Where curiosity meets red rock country.') {
        throw new Error(
            'The header tagline has not been updated.\n\n' +
            'Current text: "' + tagline.textContent + '"\n' +
            'Expected:     "Where curiosity meets red rock country."\n\n' +
            'The child combinator (>) selects a direct child:\n\n' +
            '  const tagline = document.querySelector(\'header > p\');\n' +
            '  tagline.textContent = \'Where curiosity meets red rock country.\';\n\n' +
            'Copy the expected text exactly — punctuation matters.'
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
            'Use querySelector and classList.add():\n\n' +
            '  const collegesPanel = document.querySelector(\'#colleges\');\n' +
            '  collegesPanel.classList.add(\'highlighted\');\n\n' +
            'The .highlighted class is already written in the CSS — ' +
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
            '  banner.textContent = \'Applications for Fall 2025 are now open!\';\n\n' +
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
    const expected = 'Applications for Fall 2025 are now open!';
    if (announcement.textContent !== expected) {
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

test('Step 5a: The first .color-swatch must have the correct data-color attribute', () => {
    const swatch = document.querySelector('.color-swatch');
    if (!swatch) {
        throw new Error(
            'No element with class "color-swatch" found.\n\n' +
            'Do not remove the color swatches from the HTML — ' +
            'your JavaScript will read data from them.'
        );
    }
    if (swatch.dataset.color !== '#BA1C21') {
        throw new Error(
            'The first .color-swatch data-color value is wrong.\n\n' +
            'Expected dataset.color to be "#BA1C21".\n' +
            'Got: "' + swatch.dataset.color + '"\n\n' +
            'Do not change the HTML — just read from it in JavaScript.'
        );
    }
});

test('Step 5b: The #swatch-row must contain an injected <p> element', () => {
    const p = document.querySelector('#swatch-row p');
    if (!p) {
        throw new Error(
            'No <p> element found inside #swatch-row.\n\n' +
            'Use innerHTML with a template literal to inject it:\n\n' +
            '  const swatchRow = document.querySelector(\'#swatch-row\');\n' +
            '  swatchRow.innerHTML = `<p class="swatch-label">${name}: ${color}</p>`;\n\n' +
            'innerHTML parses the string as HTML, so the <p> tag becomes a real element.'
        );
    }
});

test('Step 5c: The injected label must include the swatch name and color value', () => {
    const p = document.querySelector('#swatch-row p');
    if (!p) {
        throw new Error('No <p> found in #swatch-row. Complete Step 5b first.');
    }
    const text = p.textContent;
    if (!text.includes('Rock Red') || !text.includes('#BA1C21')) {
        throw new Error(
            'The swatch label does not contain the expected name and color.\n\n' +
            'Current label text: "' + text + '"\n' +
            'Expected to include: "Rock Red" and "#BA1C21"\n\n' +
            'Read the first swatch\'s dataset values and use a template literal:\n\n' +
            '  const swatch = document.querySelector(\'.color-swatch\');\n' +
            '  const color = swatch.dataset.color;  // "#BA1C21"\n' +
            '  const name  = swatch.dataset.name;   // "Rock Red"\n' +
            '  swatchRow.innerHTML = `<p class="swatch-label">${name}: ${color}</p>`;\n\n' +
            'Template literals use backticks (`) and ${} to embed variables.'
        );
    }
});

test('Step 5d: --color-accent must be set to the first swatch color (#BA1C21)', () => {
    const value = document.documentElement.style.getPropertyValue('--color-accent').trim();
    if (value !== '#BA1C21') {
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
