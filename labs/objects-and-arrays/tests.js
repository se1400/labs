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
            '#featured-program is empty. Select it and set its textContent to a template literal ' +
            'that reads programs[0].name and programs[0].department using dot notation. ' +
            'See Step 1 in the description for the exact sentence shape.'
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

test('Step 2c: every card shows its own program\'s name, department, total credits, and major credits', function() {
    var grid = document.querySelector('#programs-grid');
    if (!grid) {
        throw new Error('Could not find #programs-grid.');
    }

    var cards = grid.querySelectorAll('.program-card');
    if (cards.length === 0) {
        throw new Error('No .program-card elements found. Complete Step 2a first.');
    }

    // Check every card — not just the first — so hardcoded values like
    // "42" or "Computer Science" can't slip through.
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var idAttr = card.getAttribute('data-id');
        var idNum = Number(idAttr);
        var program = programs.find(function(p) { return p.id === idNum; });
        if (!program) {
            throw new Error('Card at position ' + i + ' does not match any program in the programs array.');
        }

        var cardText = card.textContent;

        if (cardText.indexOf(program.name) === -1) {
            throw new Error(
                'The card for id=' + program.id + ' should contain "' + program.name + '" but its text is "' + cardText.trim() + '". ' +
                'Include ${program.name} in your template literal so each card uses its OWN program\'s data.'
            );
        }

        if (cardText.indexOf(program.department) === -1) {
            throw new Error(
                'The card for "' + program.name + '" should contain the department "' + program.department + '" but its text is "' + cardText.trim() + '". ' +
                'Include ${program.department} in your template literal.'
            );
        }

        if (cardText.indexOf(String(program.credits)) === -1) {
            throw new Error(
                'The card for "' + program.name + '" should contain the total credits number "' + program.credits + '" but its text is "' + cardText.trim() + '". ' +
                'Include ${program.credits} in your template literal.'
            );
        }

        if (cardText.indexOf(String(program.majorCredits)) === -1) {
            throw new Error(
                'The card for "' + program.name + '" should contain its major credits number "' + program.majorCredits + '" but its text is "' + cardText.trim() + '". ' +
                'Include ${program.majorCredits} in your template literal — do not hardcode one number for every card.'
            );
        }
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
            'Before the normal rendering, add a guard clause: when list.length === 0, set grid.innerHTML to a ' +
            '<p> with class "empty-state" containing a friendly message, then return. ' +
            'See Step 2 in the description for the exact message text.'
        );
    }
});


// ── Step 3: Control Buttons ─────────────────────────────

test('Step 3a: clicking #sort-major moves Computer Science (fewest major credits) to the first card', function() {
    var btn = document.querySelector('#sort-major');
    if (!btn) {
        throw new Error(
            'Could not find #sort-major. This element is already in the HTML — make sure you have not changed it.'
        );
    }

    btn.click();

    var cards = document.querySelectorAll('#programs-grid .program-card');
    if (cards.length === 0) {
        throw new Error(
            'No .program-card elements found after clicking #sort-major. ' +
            'Your click handler should call renderPrograms with the sorted list.'
        );
    }

    var firstText = cards[0].textContent;
    if (firstText.indexOf('Computer Science') === -1) {
        throw new Error(
            'After clicking #sort-major, the first card should be "Computer Science" (fewest major credits at 42) ' +
            'but it is "' + firstText.trim().substring(0, 40) + '...". ' +
            'In the click handler, make a COPY of programs with the spread operator, sort the copy by majorCredits ' +
            'ascending using a comparator function, then pass the sorted copy to renderPrograms. ' +
            'For numbers, the comparator subtracts a from b (or the other way) to decide order.'
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
            'Make a copy of programs with the spread operator and sort by name — strings cannot be subtracted, ' +
            'so use the .localeCompare() string method inside your comparator. ' +
            'Then pass the sorted copy to renderPrograms.'
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

test('Step 4b: the modal shows the clicked program\'s name, department, total credits, major credits, and remaining credits', function() {
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

    // Check specific modal elements (not the whole modal text) so that
    // swapping #modal-major and #modal-remaining values is caught, and
    // so that a backwards subtraction like (majorCredits - credits)
    // returning a negative number can't slip past a substring match.
    var nameEl = modal.querySelector('#modal-program-name');
    var deptEl = modal.querySelector('#modal-department');
    var creditsEl = modal.querySelector('#modal-credits');
    var majorEl = modal.querySelector('#modal-major');
    var remainingEl = modal.querySelector('#modal-remaining');

    if (!nameEl || !deptEl || !creditsEl || !majorEl || !remainingEl) {
        throw new Error(
            'Could not find one of the modal fields (#modal-program-name, #modal-department, #modal-credits, #modal-major, #modal-remaining). ' +
            'These are already in the HTML — do not rename them.'
        );
    }

    if (nameEl.textContent.indexOf(expected.name) === -1) {
        throw new Error(
            'After clicking a card, #modal-program-name should show "' + expected.name + '" but it shows "' + nameEl.textContent + '". ' +
            'In your click handler, read the card\'s data-id with card.dataset.id and convert it with Number(). ' +
            'Then use the .find() array method on programs to look up the matching object by id, ' +
            'and set #modal-program-name.textContent to that program\'s name.'
        );
    }

    if (deptEl.textContent.indexOf(expected.department) === -1) {
        throw new Error(
            '#modal-department should show "' + expected.department + '" but it shows "' + deptEl.textContent + '". ' +
            'Set #modal-department.textContent to program.department.'
        );
    }

    // Use parseInt for numeric comparison so "-78" does not match "78"
    // and so swapped fields are detected.
    var creditsNum = parseInt(creditsEl.textContent, 10);
    if (creditsNum !== expected.credits) {
        throw new Error(
            '#modal-credits should show ' + expected.credits + ' but it shows "' + creditsEl.textContent + '". ' +
            'Set #modal-credits.textContent using program.credits.'
        );
    }

    var majorNum = parseInt(majorEl.textContent, 10);
    if (majorNum !== expected.majorCredits) {
        throw new Error(
            '#modal-major should show ' + expected.majorCredits + ' but it shows "' + majorEl.textContent + '". ' +
            'Set #modal-major.textContent using program.majorCredits — check that you are not swapping it with another field.'
        );
    }

    var expectedRemaining = expected.credits - expected.majorCredits;
    var remainingNum = parseInt(remainingEl.textContent, 10);
    if (remainingNum !== expectedRemaining) {
        throw new Error(
            '#modal-remaining should show ' + expectedRemaining + ' (total credits minus major credits) but it shows "' + remainingEl.textContent + '". ' +
            'Set #modal-remaining.textContent using (program.credits - program.majorCredits) — order matters, and do not swap this with another field.'
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
    var majorInput = document.querySelector('#new-major');

    if (!nameInput || !deptInput || !creditsInput || !majorInput) {
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
    majorInput.value = '60';

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

    var lengthAfter = programs.length;

    // Capture the types of the newly pushed program's numeric fields
    // BEFORE cleanup, so we can verify Number() conversion after.
    var newCreditsType = null;
    var newMajorType = null;
    if (lengthAfter > initialLength) {
        var added = programs[initialLength];
        if (added) {
            newCreditsType = typeof added.credits;
            newMajorType = typeof added.majorCredits;
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
            '(using Number() for credits and majorCredits), push it into programs, and call renderPrograms(programs).'
        );
    }

    // Catch students who bypass the data model by writing straight to
    // grid.innerHTML instead of pushing into the programs array.
    if (lengthAfter <= initialLength) {
        throw new Error(
            'The new card appeared in the grid, but the programs array did not grow. ' +
            'You must push the new program OBJECT into the programs array (programs.push(newProgram)) ' +
            'and then call renderPrograms(programs) — do not append HTML to the grid directly. ' +
            'Otherwise, sorting and re-rendering will lose the new program.'
        );
    }

    // Catch students who forget Number() on the input .values — the
    // new card shows fine, but sorting by major credits will break
    // because strings sort differently than numbers.
    if (newCreditsType !== null && newCreditsType !== 'number') {
        throw new Error(
            'The new program was added, but its credits property is a ' + newCreditsType + ' instead of a number. ' +
            'Input .value is always a string — wrap the value from #new-credits with Number() ' +
            'when building the new program object. Otherwise, Sort by Major Credits will break for new programs.'
        );
    }
    if (newMajorType !== null && newMajorType !== 'number') {
        throw new Error(
            'The new program was added, but its majorCredits property is a ' + newMajorType + ' instead of a number. ' +
            'Input .value is always a string — wrap the value from #new-major with Number() ' +
            'when building the new program object. Otherwise, Sort by Major Credits will break for new programs.'
        );
    }
});
