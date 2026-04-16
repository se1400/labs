// Lab 22: Objects & Arrays of Objects — Answer Key
// ─────────────────────────────────────────────────────────


// ── Step 1: Featured Program ────────────────────────────

document.querySelector('#featured-program').textContent =
    `Featured program: ${programs[0].name} — ${programs[0].department} department`;


// ── Step 2: renderPrograms ──────────────────────────────

const grid = document.querySelector('#programs-grid');

function renderPrograms(list) {
    if (list.length === 0) {
        grid.innerHTML = '<p class="empty-state">No programs available. Add one below to get started.</p>';
        return;
    }
    grid.innerHTML = list.map(program => `
        <div class="program-card" data-id="${program.id}">
            <span class="badge">${program.department}</span>
            <h4>${program.name}</h4>
            <p class="card-meta">${program.credits} credits</p>
            <p class="card-price">$${program.costPerCredit.toFixed(2)}/credit</p>
        </div>
    `).join('');
}

renderPrograms(programs);


// ── Step 3: Control Buttons (Sort Price, Sort Name, Clear All) ──

document.querySelector('#sort-price').addEventListener('click', function() {
    const sorted = [...programs].sort((a, b) => a.costPerCredit - b.costPerCredit);
    renderPrograms(sorted);
});

document.querySelector('#sort-name').addEventListener('click', function() {
    const sorted = [...programs].sort((a, b) => a.name.localeCompare(b.name));
    renderPrograms(sorted);
});

document.querySelector('#clear-programs').addEventListener('click', function() {
    renderPrograms([]);
});


// ── Step 4: Click a card to open the modal ──────────────

grid.addEventListener('click', function(event) {
    const card = event.target.closest('.program-card');
    if (!card) return;

    const id = Number(card.dataset.id);
    const program = programs.find(p => p.id === id);
    if (!program) return;

    document.querySelector('#modal-department').textContent = program.department;
    document.querySelector('#modal-program-name').textContent = program.name;
    document.querySelector('#modal-credits').textContent = program.credits + ' credits';
    document.querySelector('#modal-price').textContent = '$' + program.costPerCredit.toFixed(2);
    document.querySelector('#modal-total').textContent = '$' + (program.credits * program.costPerCredit).toFixed(2);
    document.querySelector('#program-modal').classList.add('visible');
});

document.querySelector('#program-modal-close').addEventListener('click', function() {
    document.querySelector('#program-modal').classList.remove('visible');
});


// ── Step 5: Add Program form ────────────────────────────

document.querySelector('#add-program-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const newProgram = {
        id: programs.length + 1,
        name: document.querySelector('#new-name').value,
        department: document.querySelector('#new-department').value,
        credits: Number(document.querySelector('#new-credits').value),
        costPerCredit: Number(document.querySelector('#new-price').value)
    };

    programs.push(newProgram);
    renderPrograms(programs);
    event.target.reset();
});
