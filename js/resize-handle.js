/**
 * Resize Handle
 * Draggable sidebar resizing between description sidebar and playground
 */

const STORAGE_KEY = 'labs-sidebar-width';
const MIN_SIDEBAR_WIDTH = 280;
const MAX_SIDEBAR_RATIO = 0.6;
const DEFAULT_WIDTH = 400;

let isResizing = false;
let startX = 0;
let startWidth = 0;

let sidebar = null;
let handle = null;

export function init() {
    sidebar = document.getElementById('sidebar');
    handle = document.getElementById('resize-handle');

    if (!sidebar || !handle) return;

    // Restore saved width
    restoreWidth();

    // Mouse events
    handle.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Touch events
    handle.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);

    // Keyboard accessibility
    handle.addEventListener('keydown', onKeyDown);

    // Double-click to reset
    handle.addEventListener('dblclick', onDoubleClick);

    // Clamp on window resize
    window.addEventListener('resize', onWindowResize);
}

// --- Mouse ---

function onMouseDown(e) {
    e.preventDefault();
    startResize(e.clientX);
}

function onMouseMove(e) {
    if (!isResizing) return;
    e.preventDefault();
    updateWidth(e.clientX);
}

function onMouseUp() {
    if (!isResizing) return;
    stopResize();
}

// --- Touch ---

function onTouchStart(e) {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    startResize(e.touches[0].clientX);
}

function onTouchMove(e) {
    if (!isResizing || e.touches.length !== 1) return;
    e.preventDefault();
    updateWidth(e.touches[0].clientX);
}

function onTouchEnd() {
    if (!isResizing) return;
    stopResize();
}

// --- Core resize logic ---

function startResize(clientX) {
    isResizing = true;
    startX = clientX;
    startWidth = sidebar.getBoundingClientRect().width;

    sidebar.classList.add('resizing');
    document.body.classList.add('resizing');
    handle.classList.add('active');
}

function updateWidth(clientX) {
    const delta = clientX - startX;
    const clamped = clampWidth(startWidth + delta);
    sidebar.style.width = clamped + 'px';
}

function stopResize() {
    isResizing = false;

    sidebar.classList.remove('resizing');
    document.body.classList.remove('resizing');
    handle.classList.remove('active');

    saveWidth();
}

function clampWidth(width) {
    const maxWidth = window.innerWidth * MAX_SIDEBAR_RATIO;
    return Math.max(MIN_SIDEBAR_WIDTH, Math.min(width, maxWidth));
}

// --- Keyboard ---

function onKeyDown(e) {
    const step = e.shiftKey ? 50 : 10;
    let current = sidebar.getBoundingClientRect().width;

    if (e.key === 'ArrowRight') {
        e.preventDefault();
        sidebar.style.width = clampWidth(current + step) + 'px';
        saveWidth();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        sidebar.style.width = clampWidth(current - step) + 'px';
        saveWidth();
    }
}

// --- Double-click to reset ---

function onDoubleClick() {
    sidebar.style.width = DEFAULT_WIDTH + 'px';
    saveWidth();
}

// --- Persistence ---

function saveWidth() {
    try {
        const width = Math.round(sidebar.getBoundingClientRect().width);
        localStorage.setItem(STORAGE_KEY, width.toString());
    } catch (e) { /* localStorage unavailable */ }
}

function restoreWidth() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const width = parseInt(saved, 10);
            if (!isNaN(width) && width >= MIN_SIDEBAR_WIDTH) {
                sidebar.style.width = clampWidth(width) + 'px';
            }
        }
    } catch (e) { /* localStorage unavailable */ }
}

// --- Window resize ---

function onWindowResize() {
    if (isResizing) return;
    const current = sidebar.getBoundingClientRect().width;
    const clamped = clampWidth(current);
    if (Math.round(clamped) !== Math.round(current)) {
        sidebar.style.width = clamped + 'px';
        saveWidth();
    }
}
