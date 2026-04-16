// Lab 20: Toggle Everything — Answer Key
// ─────────────────────────────────────────────────────────


// ── Step 1: Dark Mode Toggle ────────────────────────────

const darkBtn = document.querySelector('#dark-toggle');

darkBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    darkBtn.textContent = document.body.classList.contains('dark-mode')
        ? 'Switch to Light Mode'
        : 'Switch to Dark Mode';
});


// ── Step 2: FAQ Accordion ───────────────────────────────

const faqBtn = document.querySelector('#faq-toggle');

faqBtn.addEventListener('click', function() {
    const answer = document.querySelector('#faq-answer');
    answer.classList.toggle('open');
});


// ── Step 3: Tour Modal ──────────────────────────────────

const tourBtn = document.querySelector('#tour-btn');

tourBtn.addEventListener('click', function() {
    const modal = document.querySelector('#tour-modal');
    modal.classList.add('visible');
});

const closeBtn = document.querySelector('#modal-close');

closeBtn.addEventListener('click', function() {
    const modal = document.querySelector('#tour-modal');
    modal.classList.remove('visible');
});


// ── Step 4: Toast Notification ──────────────────────────

const form = document.querySelector('#apply form');
const toast = document.querySelector('#toast');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.querySelector('#first-name').value;
    const email = document.querySelector('#email').value;

    if (firstName && email) {
        toast.textContent = 'Application submitted successfully!';
        toast.hidden = false;
        toast.classList.add('show');

        setTimeout(function() {
            toast.classList.remove('show');
            toast.hidden = true;
        }, 3000);
    }
});
