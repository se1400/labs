/**
 * Utility Functions for Student Coding Labs
 * Provides helper functions for URL parsing, notifications, and UI updates
 */

/**
 * Parse URL query parameters
 * @returns {Object} Object containing all query parameters
 */
export function parseURLParams() {
    const params = {};
    const queryString = window.location.search.substring(1);

    if (!queryString) {
        return params;
    }

    const pairs = queryString.split('&');
    for (const pair of pairs) {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }

    return params;
}

/**
 * Show a notification toast message
 * @param {string} message - The message to display
 * @param {string} type - Type of notification: 'success', 'error', or 'info'
 * @param {number} duration - Duration in ms (default: 3000)
 */
export function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.getElementById('notification');
    const icon = document.getElementById('notification-icon');
    const messageEl = document.getElementById('notification-message');

    // Set icon based on type
    const icons = {
        success: '✓',
        error: '✗',
        info: 'ℹ'
    };

    icon.textContent = icons[type] || icons.info;
    messageEl.textContent = message;

    // Remove existing type classes
    notification.classList.remove('success', 'error', 'info');
    // Add new type class
    notification.classList.add(type);

    // Show notification
    notification.style.display = 'flex';

    // Auto-hide after duration
    setTimeout(() => {
        hideNotification();
    }, duration);
}

/**
 * Hide the notification toast
 */
export function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
}

/**
 * Show loading overlay
 * @param {string} message - Optional loading message
 */
export function showLoading(message = 'Loading lab...') {
    const overlay = document.getElementById('loading-overlay');
    const text = overlay.querySelector('.loading-text');

    if (text) {
        text.textContent = message;
    }

    overlay.classList.remove('hidden');
}

/**
 * Hide loading overlay
 */
export function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.add('hidden');
}

/**
 * Parse markdown to HTML using marked.js
 * @param {string} markdown - Markdown text
 * @returns {string} HTML string
 */
export function markdownToHTML(markdown) {
    if (typeof marked === 'undefined') {
        console.error('Marked.js is not loaded');
        return markdown;
    }

    try {
        return marked.parse(markdown);
    } catch (error) {
        console.error('Error parsing markdown:', error);
        return markdown;
    }
}

/**
 * Show validation results modal
 * @param {Object} results - Validation results object
 */
export function showValidationModal(results) {
    const modal = document.getElementById('validation-modal');
    const resultsContainer = document.getElementById('validation-results');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // HTML validation results
    if (results.html) {
        const htmlSection = createValidationSection('HTML', results.html);
        resultsContainer.appendChild(htmlSection);
    }

    // CSS validation results
    if (results.css) {
        const cssSection = createValidationSection('CSS', results.css);
        resultsContainer.appendChild(cssSection);
    }

    // JavaScript validation results
    if (results.js) {
        const jsSection = createValidationSection('JavaScript', results.js);
        resultsContainer.appendChild(jsSection);
    }

    modal.style.display = 'flex';
}

/**
 * Create a validation section element
 * @param {string} language - Language name
 * @param {Object} validation - Validation data
 * @returns {HTMLElement} Section element
 */
function createValidationSection(language, validation) {
    const section = document.createElement('div');
    section.className = 'validation-section';

    const title = document.createElement('h3');

    if (validation.valid && validation.errors.length === 0) {
        title.innerHTML = `<span class="validation-success">✓</span> ${language} - No Issues Found`;
    } else {
        title.innerHTML = `<span class="validation-error">✗</span> ${language} - ${validation.errors.length} Issue(s) Found`;
    }

    section.appendChild(title);

    // Display errors
    if (validation.errors && validation.errors.length > 0) {
        validation.errors.forEach(error => {
            const issueEl = document.createElement('div');
            issueEl.className = 'validation-issue';

            if (error.type === 'warning') {
                issueEl.classList.add('warning');
            }

            const typeEl = document.createElement('div');
            typeEl.className = `validation-issue-type ${error.type || 'error'}`;
            typeEl.textContent = error.type || 'ERROR';

            const messageEl = document.createElement('div');
            messageEl.className = 'validation-issue-message';
            messageEl.textContent = error.message;

            issueEl.appendChild(typeEl);
            issueEl.appendChild(messageEl);

            if (error.line) {
                const lineEl = document.createElement('div');
                lineEl.className = 'validation-issue-line';
                lineEl.textContent = `Line: ${error.line}`;
                issueEl.appendChild(lineEl);
            }

            section.appendChild(issueEl);
        });
    }

    return section;
}

/**
 * Hide validation modal
 */
export function hideValidationModal() {
    const modal = document.getElementById('validation-modal');
    modal.style.display = 'none';
}

/**
 * Enable/disable buttons
 * @param {boolean} enabled - Whether to enable or disable
 */
export function setButtonsEnabled(enabled) {
    const buttons = ['run-tests-btn', 'validate-btn', 'share-btn', 'reset-btn'];

    buttons.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.disabled = !enabled;
        }
    });
}

/**
 * Show error message in the description area
 * @param {string} message - Error message
 */
export function showError(message) {
    const descriptionEl = document.getElementById('lab-description');
    descriptionEl.innerHTML = `
        <div style="color: var(--test-fail); padding: 20px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px;">✗</div>
            <h2 style="color: var(--test-fail);">Error Loading Lab</h2>
            <p>${message}</p>
        </div>
    `;
}

// Add modal close button event listener
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideValidationModal);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('validation-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideValidationModal();
            }
        });
    }
});

export default {
    parseURLParams,
    showNotification,
    hideNotification,
    showLoading,
    hideLoading,
    markdownToHTML,
    showValidationModal,
    hideValidationModal,
    setButtonsEnabled,
    showError
};
