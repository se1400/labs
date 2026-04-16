// Lab 22: Objects & Arrays of Objects — Tests
// ─────────────────────────────────────────────────────────
// These tests check that you are reading object properties,
// rendering cards from data (including an empty-state
// guard), wiring up the three control buttons, looking up
// programs by id from a click, and pushing new objects into
// the array.
// ─────────────────────────────────────────────────────────


// ── Step 1: Featured Program ────────────────────────────

test('Step 1: #featured-program shows the first program\'s name and department', function() {
    var banner = document.querySelector('#featured-program');
    if (!banner) {
        throw new Error(
            'Could not find #featured-program. ' +
            'This element is already in the HTML — make sure you have not changed it.'
        );
    }

    var text = banner.textContent.trim();

    if (!text) {
        throw new Error(
            '#featured-program is empty. Set its textContent using programs[0].name and programs[0].department. ' +
            'For example: `Featured program: ${programs[0].name} — ${programs[0].department} department`'
        );
    }

    if (text.indexOf(programs[0].name) === -1) {
        throw new Error(
            '#featured-program should contain the first program\'s name ("' + programs[0].name + '") ' +
            'but its text is "' + text + '". Read the name with programs[0].name.'
        );
    }

    if (text.indexOf(programs[0].department) === -1) {
        throw new Error(
            '#featured-program should contain the first program\'s department ("' + programs[0].department + '") ' +
            'but its text is "' + text + '". Read the department with programs[0].department.'
        );
    }
});


// ── Step 2: renderPrograms ──────────────────────────────

test('Step 2a: #programs-grid contains 8 .program-card elements', function() {
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
            '#programs-grid is empty. Write a renderPrograms function that uses .map() and .join("") ' +
            'to build a card for each program, then call renderPrograms(programs).'
        );
    }

    if (cards.length !== 8) {
        throw new Error(
            '#programs-grid should have 8 .program-card elements (one for each program), but it has ' + cards.length + '. ' +
            'Make sure renderPrograms loops over every item in its list parameter.'
        );
    }
});

test('Step 2b: each .program-card has a data-id attribute matching a program id', function() {
    var grid = document.querySelector('#programs-grid');
    if (!grid) {
        throw new Error('Could not find #programs-grid.');
    }

    var cards = grid.querySelectorAll('.program-card');

    if (cards.length === 0) {
        throw new Error('No .program-card elements found. Complete Step 2a first.');
    }

    for (var i = 0; i < cards.length; i++) {
        var idAttr = cards[i].getAttribute('data-id');
        if (!idAttr) {
            throw new Error(
                'Card at position ' + i + ' is missing a data-id attribute. ' +
                'Add data-id="${program.id}" to each card in your template literal.'
            );
        }

        var idNum = Number(idAttr);
        var match = programs.find(function(p) { return p.id === idNum; });
        if (!match) {
            throw new Error(
                'Card at position ' + i + ' has data-id="' + idAttr + '" but no program has that id. ' +
                'Use ${program.id} inside your template literal so each card carries its own id.'
            );
        }
    }
});

test('Step 2c: the first card shows the program\'s name, department, credits, and price with .toFixed(2)', function() {
    var grid = document.querySelector('#programs-grid');
    if (!grid) {
        throw new Error('Could not find #programs-grid.');
    }

    var cards = grid.querySelectorAll('.program-card');
    if (cards.length === 0) {
        throw new Error('No .program-card elements found. Complete Step 2a first.');
    }

    var firstCard = cards[0];
    var idAttr = firstCard.getAttribute('data-id');
    var idNum = Number(idAttr);
    var program = programs.find(function(p) { return p.id === idNum; });
    if (!program) {
        throw new Error('First card does not match any program in the programs array.');
    }

    var cardText = firstCard.textContent;

    if (cardText.indexOf(program.name) === -1) {
        throw new Error(
            'The first card should contain "' + program.name + '" but its text is "' + cardText.trim() + '". ' +
            'Include ${program.name} in your template literal.'
        );
    }

    if (cardText.indexOf(program.department) === -1) {
        throw new Error(
            'The first card should contain the department "' + program.department + '" but its text is "' + cardText.trim() + '". ' +
            'Include ${program.department} in your template literal.'
        );
    }

    if (cardText.indexOf(String(program.credits)) === -1) {
        throw new Error(
            'The first card should contain the credits number "' + program.credits + '" but its text is "' + cardText.trim() + '". ' +
            'Include ${program.credits} in your template literal.'
        );
    }

    var expectedPrice = program.costPerCredit.toFixed(2);
    if (cardText.indexOf(expectedPrice) === -1) {
        throw new Error(
            'The first card should show the price formatted with two decimals ("' + expectedPrice + '") but its text is "' + cardText.trim() + '". ' +
            'Use ${program.costPerCredit.toFixed(2)} to format the price.'
        );
    }
});

test('Step 2d: renderPrograms([]) shows an empty-state message in the grid', function() {
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

    // Snapshot — we'll restore after.
    var originalHTML = grid.innerHTML;

    renderPrograms([]);

    var cardsAfter = grid.querySelectorAll('.program-card');
    var gridText = grid.textContent.trim();

    // Restore the grid so later tests keep working.
    grid.innerHTML = originalHTML;

    if (cardsAfter.length > 0) {
        throw new Error(
            'renderPrograms([]) should produce an empty grid (no .program-card elements) but found ' + cardsAfter.length + '. ' +
            'At the top of renderPrograms, check if (list.length === 0) and set an empty-state message, then return.'
        );
    }

    if (!gridText) {
        throw new Error(
            'renderPrograms([]) should show an empty-state message when the list is empty, but the grid is completely blank. ' +
            'When list.length === 0, set grid.innerHTML to something like ' +
            '\'<p class="empty-state">No programs available. Add one below to get started.</p>\' and return.'
        );
    }
});


// ── Step 3: Control Buttons ─────────────────────────────

test('Step 3a: clicking #sort-price moves Psychology (cheapest) to the first card', function() {
    var btn = document.querySelector('#sort-price');
    if (!btn) {
        throw new Error(
            'Could not find #sort-price. This element is already in the HTML — make sure you have not changed it.'
        );
    }

    btn.click();

    var cards = document.querySelectorAll('#programs-grid .program-card');
    if (cards.length === 0) {
        throw new Error(
            'No .program-card elements found after clicking #sort-price. ' +
            'Your click handler should call renderPrograms with the sorted list.'
        );
    }

    var firstText = cards[0].textContent;
    if (firstText.indexOf('Psychology') === -1) {
        throw new Error(
            'After clicking #sort-price, the first card should be "Psychology" (the cheapest at $215 per credit) ' +
            'but it is "' + firstText.trim().substring(0, 40) + '...". ' +
            'Use [...programs].sort((a, b) => a.costPerCredit - b.costPerCredit) to sort by price ascending, ' +
            'then pass the result to renderPrograms.'
        );
    }
});

test('Step 3b: clicking #sort-name moves Biology (alphabetical first) to the first card', function() {
    var btn = document.querySelector('#sort-name');
    if (!btn) {
        throw new Error(
            'Could not find #sort-name. This element is already in the HTML — make sure you have not changed it.'
        );
    }

    btn.click();

    var cards = document.querySelectorAll('#programs-grid .program-card');
    if (cards.length === 0) {
        throw new Error(
            'No .program-card elements found after clicking #sort-name. ' +
            'Your click handler should call renderPrograms with the sorted list.'
        );
    }

    var firstText = cards[0].textContent;
    if (firstText.indexOf('Biology') === -1) {
        throw new Error(
            'After clicking #sort-name, the first card should be "Biology" (alphabetically first) ' +
            'but it is "' + firstText.trim().substring(0, 40) + '...". ' +
            'Use [...programs].sort((a, b) => a.name.localeCompare(b.name)) to sort alphabetically, ' +
            'then pass the result to renderPrograms.'
        );
    }
});

test('Step 3c: clicking #clear-programs empties the grid and shows the empty-state message', function() {
    var btn = document.querySelector('#clear-programs');
    if (!btn) {
        throw new Error(
            'Could not find #clear-programs. This element is already in the HTML — make sure you have not changed it.'
        );
    }

    var grid = document.querySelector('#programs-grid');
    if (!grid) {
        throw new Error('Could not find #programs-grid.');
    }

    btn.click();

    var cardsAfter = grid.querySelectorAll('.program-card');
    var gridText = grid.textContent.trim();

    // Restore for later tests.
    if (typeof renderPrograms === 'function') {
        renderPrograms(programs);
    }

    if (cardsAfter.length > 0) {
        throw new Error(
            'After clicking #clear-programs, the grid should have no .program-card elements, but ' + cardsAfter.length + ' are still there. ' +
            'Attach a click listener to #clear-programs that calls renderPrograms([]).'
        );
    }

    if (!gridText) {
        throw new Error(
            'After clicking #clear-programs, the grid should show an empty-state message, but it is blank. ' +
            'Make sure Step 2\'s empty-state guard sets grid.innerHTML to an empty-state paragraph when list.length === 0.'
        );
    }
});


// ── Step 4: Click a card to open the modal ──────────────

test('Step 4a: clicking a .program-card adds the "visible" class to #program-modal', function() {
    var modal = document.querySelector('#program-modal');
    if (!modal) {
        throw new Error(
            'Could not find #program-modal. This element is already in the HTML — make sure you have not changed it.'
        );
    }

    var cards = document.querySelectorAll('#programs-grid .program-card');
    if (cards.length === 0) {
        throw new Error('No .program-card elements found. Complete Step 2 first.');
    }

    modal.classList.remove('visible');
    cards[0].click();

    if (!modal.classList.contains('visible')) {
        throw new Error(
            'Clicking a .program-card should add the "visible" class to #program-modal but it did not. ' +
            'Attach a click listener to #programs-grid, find the clicked card with event.target.closest(".program-card"), ' +
            'then call modal.classList.add("visible").'
        );
    }
});

test('Step 4b: the modal shows the clicked program\'s name, department, credits, and price', function() {
    var modal = document.querySelector('#program-modal');
    var cards = document.querySelectorAll('#programs-grid .program-card');
    if (!modal || cards.length === 0) {
        throw new Error('Complete Steps 2 and 4a first.');
    }

    // Click the first card. Look up which program that card represents
    // by reading its data-id — that way this test works no matter what
    // order the cards are in.
    var firstCard = cards[0];
    var idNum = Number(firstCard.getAttribute('data-id'));
    var expected = programs.find(function(p) { return p.id === idNum; });
    if (!expected) {
        throw new Error('First card\'s data-id does not match any program. Complete Step 2b first.');
    }

    modal.classList.remove('visible');
    firstCard.click();

    var modalText = modal.textContent;

    if (modalText.indexOf(expected.name) === -1) {
        throw new Error(
            'After clicking a card, the modal should contain the program name ("' + expected.name + '") ' +
            'but the modal text is "' + modalText.trim().substring(0, 80) + '...". ' +
            'In your click handler, look up the program with programs.find(p => p.id === Number(card.dataset.id)), ' +
            'then set #modal-program-name.textContent to program.name.'
        );
    }

    if (modalText.indexOf(expected.department) === -1) {
        throw new Error(
            'The modal should contain the department ("' + expected.department + '") but it does not. ' +
            'Set #modal-department.textContent to program.department.'
        );
    }

    if (modalText.indexOf(String(expected.credits)) === -1) {
        throw new Error(
            'The modal should contain the credits number ("' + expected.credits + '") but it does not. ' +
            'Set #modal-credits.textContent using program.credits.'
        );
    }

    var expectedPrice = expected.costPerCredit.toFixed(2);
    if (modalText.indexOf(expectedPrice) === -1) {
        throw new Error(
            'The modal should contain the price formatted with two decimals ("' + expectedPrice + '") but it does not. ' +
            'Set #modal-price.textContent using program.costPerCredit.toFixed(2).'
        );
    }
});


// ── Step 5: Add Program form ────────────────────────────

test('Step 5: submitting the add-program form adds a new card to the grid', function() {
    var form = document.querySelector('#add-program-form');
    if (!form) {
        throw new Error(
            'Could not find #add-program-form. This element is already in the HTML — make sure you have not changed it.'
        );
    }

    var nameInput = document.querySelector('#new-name');
    var deptInput = document.querySelector('#new-department');
    var creditsInput = document.querySelector('#new-credits');
    var priceInput = document.querySelector('#new-price');

    if (!nameInput || !deptInput || !creditsInput || !priceInput) {
        throw new Error('Could not find one or more form inputs. Do not rename the form fields.');
    }

    // Make sure we're starting from a rendered grid.
    if (typeof renderPrograms === 'function') {
        renderPrograms(programs);
    }

    var testName = 'Test Program ' + Date.now();
    var initialLength = programs.length;

    nameInput.value = testName;
    deptInput.value = 'Test Department';
    creditsInput.value = '120';
    priceInput.value = '200';

    // Submit — some handlers use submit event, others a button click.
    if (typeof form.requestSubmit === 'function') {
        form.requestSubmit();
    } else {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }

    var grid = document.querySelector('#programs-grid');
    var cards = grid.querySelectorAll('.program-card');

    var found = false;
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].textContent.indexOf(testName) !== -1) {
            found = true;
            break;
        }
    }

    // Clean up: pop any items that got pushed and re-render.
    while (programs.length > initialLength) {
        programs.pop();
    }
    if (typeof renderPrograms === 'function') {
        renderPrograms(programs);
    }

    if (!found) {
        throw new Error(
            'After submitting the form, a new card containing "' + testName + '" should appear in the grid. ' +
            'In your submit handler: call event.preventDefault(), build a new program object from the input values ' +
            '(using Number() for credits and costPerCredit), push it into programs, and call renderPrograms(programs).'
        );
    }
});
