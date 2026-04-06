// Lab 18: JavaScript DOM Foundations — Answer Key
// ─────────────────────────────────────────────────────────────────


// ── Step 1: querySelector + textContent + console.log ────────────

const heading = document.querySelector('h1');
heading.textContent = 'Utah Tech — Trailblazers';
console.log(heading);

const heroHeading = document.querySelector('#welcome h2');
heroHeading.textContent = 'Your Future Starts Here';
console.log(heroHeading);


// ── Step 2: style.setProperty() — change a CSS custom property ───

document.documentElement.style.setProperty('--color-accent', '#2d8a4e');


// ── Step 3: classList.add() — apply a class to an element ────────

const collegesPanel = document.querySelector('#colleges');
collegesPanel.classList.add('highlighted');


// ── Step 4: createElement + appendChild + remove() ───────────────

const banner = document.createElement('div');
banner.classList.add('announcement');
banner.textContent = 'New student applications are now open!';

const header = document.querySelector('header');
header.appendChild(banner);

document.querySelector('#info-banner').remove();


// ── Step 5: dataset + template literals + innerHTML ──────────────

const swatch = document.querySelector('.color-swatch');
const color = swatch.dataset.color;
const swatchName = swatch.dataset.name;
const label = `${swatchName}: ${color}`;

const labelContainer = document.querySelector('#swatch-label');
labelContainer.innerHTML = `<p class="swatch-label">${label}</p>`;

document.documentElement.style.setProperty('--color-accent', color);
