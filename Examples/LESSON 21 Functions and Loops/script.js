// Lab 21: Functions & Loops — Answer Key
// ─────────────────────────────────────────────────────────


// ── Step 1: formatPrice ────────────────────────────────

function formatPrice(amount) {
    return '$' + amount.toFixed(2);
}

document.querySelector('#price-resident').textContent = formatPrice(227);
document.querySelector('#price-nonresident').textContent = formatPrice(725);


// ── Step 2: buildGreeting ──────────────────────────────

function buildGreeting(name = 'Trailblazer') {
    return 'Welcome, ' + name + '!';
}

document.querySelector('#greeting').textContent = buildGreeting();


// ── Step 3: Quick Facts (arrow function + for loop) ────

const formatFact = (index, text) => (index + 1) + '. ' + text;

const factsList = document.querySelector('#facts-list');
let factsHTML = '';

for (let i = 0; i < facts.length; i++) {
    factsHTML += '<li>' + formatFact(i, facts[i]) + '</li>';
}

factsList.innerHTML = factsHTML;


// ── Step 4: Program Cards (for...of + template literals)

const grid = document.querySelector('#programs-grid');


// ── Step 5: renderPrograms ─────────────────────────────

function renderPrograms(list) {
    let html = '';
    for (const item of list) {
        html += `<div class="program-card"><h4>${item}</h4></div>`;
    }
    grid.innerHTML = html;
}

renderPrograms(programs);

document.querySelector('#shuffle-btn').addEventListener('click', function() {
    renderPrograms([...programs].reverse());
});
