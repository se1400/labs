// Lab 21: Functions & Loops — Tests
// ─────────────────────────────────────────────────────────
// These tests check your functions (by calling them directly)
// and your DOM output (by inspecting the live page).
// ─────────────────────────────────────────────────────────


// ── Step 1: formatPrice ─────────────────────────────────

test('Step 1a: formatPrice(10) returns "$10.00"', function() {
    if (typeof formatPrice !== 'function') {
        throw new Error(
            'formatPrice is not defined as a function. ' +
            'Declare it with: function formatPrice(amount) { ... }'
        );
    }

    var result = formatPrice(10);

    if (typeof result !== 'string') {
        throw new Error(
            'formatPrice should return a string, but it returned ' + typeof result + '. ' +
            'Make sure you use the return keyword.'
        );
    }

    if (result !== '$10.00') {
        throw new Error(
            'formatPrice(10) should return "$10.00" but got "' + result + '". ' +
            'Use return "$" + amount.toFixed(2) to format the number with two decimal places.'
        );
    }
});

test('Step 1b: the tuition prices are displayed on the page', function() {
    var resident = document.querySelector('#price-resident');
    var nonResident = document.querySelector('#price-nonresident');

    if (!resident || !nonResident) {
        throw new Error(
            'Could not find #price-resident or #price-nonresident. ' +
            'These elements are already in the HTML — make sure you have not changed them.'
        );
    }

    var residentText = resident.textContent.trim();
    var nonResidentText = nonResident.textContent.trim();

    if (!residentText || !nonResidentText) {
        throw new Error(
            'The tuition price elements are empty. After defining formatPrice, ' +
            'call it to set the textContent of #price-resident and #price-nonresident. ' +
            'For example: document.querySelector("#price-resident").textContent = formatPrice(227);'
        );
    }

    if (residentText.charAt(0) !== '$' || nonResidentText.charAt(0) !== '$') {
        throw new Error(
            'The tuition prices should start with a "$" sign. ' +
            'Make sure formatPrice returns a string that starts with "$".'
        );
    }
});


// ── Step 2: buildGreeting ───────────────────────────────

test('Step 2a: buildGreeting("Ada") returns "Welcome, Ada!"', function() {
    if (typeof buildGreeting !== 'function') {
        throw new Error(
            'buildGreeting is not defined as a function. ' +
            'Declare it with: function buildGreeting(name) { ... }'
        );
    }

    var result = buildGreeting('Ada');

    if (typeof result !== 'string') {
        throw new Error(
            'buildGreeting should return a string, but it returned ' + typeof result + '. ' +
            'Make sure you use the return keyword.'
        );
    }

    if (result !== 'Welcome, Ada!') {
        throw new Error(
            'buildGreeting("Ada") should return "Welcome, Ada!" but got "' + result + '". ' +
            'Use return "Welcome, " + name + "!" to build the greeting.'
        );
    }
});

test('Step 2b: buildGreeting() with no argument returns "Welcome, Trailblazer!"', function() {
    if (typeof buildGreeting !== 'function') {
        throw new Error(
            'buildGreeting is not defined. Complete Step 2a first.'
        );
    }

    var result = buildGreeting();

    if (result !== 'Welcome, Trailblazer!') {
        throw new Error(
            'buildGreeting() with no argument should return "Welcome, Trailblazer!" but got "' + result + '". ' +
            'Set a default parameter: function buildGreeting(name = "Trailblazer") { ... }'
        );
    }
});


// ── Step 3: Quick Facts (arrow function + for loop) ─────

test('Step 3a: #facts-list contains 5 <li> elements', function() {
    var factsList = document.querySelector('#facts-list');
    if (!factsList) {
        throw new Error(
            'Could not find #facts-list. ' +
            'This element is already in the HTML — make sure you have not changed it.'
        );
    }

    var items = factsList.querySelectorAll('li');

    if (items.length === 0) {
        throw new Error(
            '#facts-list is empty. Use a for loop to build <li> elements from the facts array ' +
            'and set factsList.innerHTML to the result.'
        );
    }

    if (items.length !== 5) {
        throw new Error(
            '#facts-list should have 5 <li> elements (one for each fact), but it has ' + items.length + '. ' +
            'Make sure your loop runs from 0 to facts.length.'
        );
    }
});

test('Step 3b: each fact is numbered (first starts with "1.", second with "2.")', function() {
    var factsList = document.querySelector('#facts-list');
    if (!factsList) {
        throw new Error('Could not find #facts-list.');
    }

    var items = factsList.querySelectorAll('li');

    if (items.length < 2) {
        throw new Error(
            'Not enough <li> elements to check numbering. Complete Step 3a first.'
        );
    }

    var firstText = items[0].textContent.trim();
    var secondText = items[1].textContent.trim();

    if (!firstText.match(/^1\.\s/)) {
        throw new Error(
            'The first fact should start with "1. " but got "' + firstText.substring(0, 10) + '...". ' +
            'Use your arrow function to format each fact with its number: (index + 1) + ". " + text'
        );
    }

    if (!secondText.match(/^2\.\s/)) {
        throw new Error(
            'The second fact should start with "2. " but got "' + secondText.substring(0, 10) + '...". ' +
            'Make sure the arrow function uses (index + 1) so numbering starts at 1, not 0.'
        );
    }
});


// ── Step 4: Program Cards (for...of + template literals) ─

test('Step 4a: #programs-grid contains 8 .program-card elements', function() {
    var grid = document.querySelector('#programs-grid');
    if (!grid) {
        throw new Error(
            'Could not find #programs-grid. ' +
            'This element is already in the HTML — make sure you have not changed it.'
        );
    }

    var cards = grid.querySelectorAll('.program-card');

    if (cards.length === 0) {
        throw new Error(
            '#programs-grid is empty. Use a for...of loop to build program cards from the programs array ' +
            'and set grid.innerHTML to the result.'
        );
    }

    if (cards.length !== 8) {
        throw new Error(
            '#programs-grid should have 8 .program-card elements (one for each program), but it has ' + cards.length + '. ' +
            'Make sure your loop goes through every item in the programs array.'
        );
    }
});

test('Step 4b: the first card contains the first program name', function() {
    var grid = document.querySelector('#programs-grid');
    if (!grid) {
        throw new Error('Could not find #programs-grid.');
    }

    var cards = grid.querySelectorAll('.program-card');

    if (cards.length === 0) {
        throw new Error(
            'No .program-card elements found. Complete Step 4a first.'
        );
    }

    var firstCardText = cards[0].textContent.trim();

    if (firstCardText.indexOf(programs[0]) === -1) {
        throw new Error(
            'The first program card should contain "' + programs[0] + '" but its text is "' + firstCardText + '". ' +
            'Use template literals to put the program name inside each card: `<div class="program-card"><h4>${program}</h4></div>`'
        );
    }
});


// ── Step 5: renderPrograms ──────────────────────────────

test('Step 5a: renderPrograms is a function that renders cards from its parameter', function() {
    if (typeof renderPrograms !== 'function') {
        throw new Error(
            'renderPrograms is not defined as a function. ' +
            'Declare it with: function renderPrograms(list) { ... }'
        );
    }

    var grid = document.querySelector('#programs-grid');
    if (!grid) {
        throw new Error('Could not find #programs-grid.');
    }

    // Save original content
    var originalHTML = grid.innerHTML;

    // Call with a test array — if it uses the parameter, we get 2 cards
    renderPrograms(['Test A', 'Test B']);
    var testCards = grid.querySelectorAll('.program-card');
    var testCount = testCards.length;

    // Restore original content
    grid.innerHTML = originalHTML;

    if (testCount !== 2) {
        throw new Error(
            'renderPrograms(["Test A", "Test B"]) should render exactly 2 cards, but it rendered ' + testCount + '. ' +
            'Make sure the function loops over its parameter (the list argument), ' +
            'not the global programs array.'
        );
    }
});

test('Step 5b: clicking #shuffle-btn changes the card order', function() {
    var grid = document.querySelector('#programs-grid');
    var btn = document.querySelector('#shuffle-btn');
    if (!grid || !btn) {
        throw new Error(
            'Could not find #programs-grid or #shuffle-btn. ' +
            'These elements are already in the HTML — make sure you have not changed them.'
        );
    }

    // First make sure there are cards to compare
    var cardsBefore = grid.querySelectorAll('.program-card');
    if (cardsBefore.length === 0) {
        throw new Error(
            'No program cards found. Complete Steps 4 and 5a first.'
        );
    }

    var firstBefore = cardsBefore[0].textContent.trim();

    // Click shuffle
    btn.click();

    var cardsAfter = grid.querySelectorAll('.program-card');
    var firstAfter = cardsAfter[0].textContent.trim();

    // Restore original order
    if (typeof renderPrograms === 'function') {
        renderPrograms(programs);
    }

    if (firstBefore === firstAfter) {
        throw new Error(
            'After clicking #shuffle-btn, the first card should be different. ' +
            'In your click listener, call renderPrograms([...programs].reverse()) ' +
            'to reverse the array and re-render the cards.'
        );
    }
});
