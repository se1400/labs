/**
 * Main Application Entry Point
 * Coordinates all modules and handles user interactions
 */

import * as utils from './utils.js';
import * as labLoader from './lab-loader.js';
import * as livecodes from './livecodes-manager.js';
import * as testRunner from './test-runner.js';
import * as validator from './validator.js';

// Store current lab data globally
let currentLabData = null;

/**
 * Initialize the application
 */
async function init() {
    try {
        utils.showLoading('Loading lab...');

        // Get lab name from URL
        const labName = labLoader.getLabNameFromURL();

        if (!labName) {
            utils.hideLoading();
            utils.showError('No lab specified. Please add ?lab=lab-name to the URL.');
            return;
        }

        // Load lab data
        currentLabData = await labLoader.loadLab(labName);

        // Update UI with lab info
        updateLabInfo(currentLabData);

        // Initialize LiveCodes playground
        await livecodes.initPlayground('#playground', currentLabData);

        // Enable buttons
        utils.setButtonsEnabled(true);

        // Setup event listeners
        setupEventListeners();

        // Hide loading overlay
        utils.hideLoading();

        utils.showNotification(`Lab "${currentLabData.title}" loaded successfully!`, 'success');
    } catch (error) {
        console.error('Initialization error:', error);
        utils.hideLoading();
        utils.showError(error.message);
        utils.showNotification('Failed to load lab: ' + error.message, 'error', 5000);
    }
}

/**
 * Update lab information in the UI
 * @param {Object} labData - Lab data object
 */
function updateLabInfo(labData) {
    // Update title
    const titleElement = document.getElementById('lab-title');
    if (titleElement) {
        titleElement.textContent = labData.title;
    }

    // Update page title
    document.title = `${labData.title} - Student Coding Labs`;

    // Render description from markdown
    const descriptionElement = document.getElementById('lab-description');
    if (descriptionElement && labData.description) {
        const html = utils.markdownToHTML(labData.description);
        descriptionElement.innerHTML = html;
    }
}

/**
 * Setup event listeners for buttons
 */
function setupEventListeners() {
    // Run Tests button
    const runTestsBtn = document.getElementById('run-tests-btn');
    if (runTestsBtn) {
        runTestsBtn.addEventListener('click', handleRunTests);
    }

    // Validate button
    const validateBtn = document.getElementById('validate-btn');
    if (validateBtn) {
        validateBtn.addEventListener('click', handleValidate);
    }

    // Share button
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', handleShare);
    }

    // Reset Code button
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', handleReset);
    }

    // Sidebar toggle button
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', handleSidebarToggle);
    }

    // Test results collapse/expand toggle
    const testResultsHeader = document.getElementById('test-results-header');
    if (testResultsHeader) {
        testResultsHeader.addEventListener('click', handleTestResultsToggle);
    }
}

/**
 * Handle Run Tests button click
 */
async function handleRunTests() {
    const btn = document.getElementById('run-tests-btn');
    const originalText = btn.innerHTML;

    try {
        // Disable button and show loading
        btn.disabled = true;
        btn.innerHTML = '<span class="btn-icon loading">⟳</span> Running...';

        // Run tests
        const results = await testRunner.runTests();

        // Calculate pass/fail
        const passed = results.filter(r => r.status === 'pass').length;
        const total = results.length;

        if (passed === total) {
            utils.showNotification(`All tests passed! (${passed}/${total})`, 'success');
        } else {
            utils.showNotification(`Tests: ${passed}/${total} passed`, 'info');
        }
    } catch (error) {
        console.error('Error running tests:', error);
        utils.showNotification('Failed to run tests: ' + error.message, 'error');
    } finally {
        // Re-enable button
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

/**
 * Handle Validate button click
 */
async function handleValidate() {
    const btn = document.getElementById('validate-btn');
    const originalText = btn.innerHTML;

    try {
        // Disable button and show loading
        btn.disabled = true;
        btn.innerHTML = '<span class="btn-icon loading">⟳</span> Validating...';

        // Validate code
        await validator.validateCode();
    } catch (error) {
        console.error('Error validating code:', error);
        utils.showNotification('Validation failed: ' + error.message, 'error');
    } finally {
        // Re-enable button
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

/**
 * Handle Share button click
 */
async function handleShare() {
    const btn = document.getElementById('share-btn');
    const originalText = btn.innerHTML;

    try {
        // Disable button and show loading
        btn.disabled = true;
        btn.innerHTML = '<span class="btn-icon loading">⟳</span> Generating...';

        // Get share URL
        const shareUrl = await livecodes.getShareUrl(true);

        // Copy to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shareUrl);
            utils.showNotification('Share URL copied to clipboard!', 'success');
        } else {
            // Fallback: show URL in a prompt
            prompt('Share URL (copy this):', shareUrl);
            utils.showNotification('Share URL generated', 'info');
        }
    } catch (error) {
        console.error('Error generating share URL:', error);
        utils.showNotification('Failed to generate share URL: ' + error.message, 'error');
    } finally {
        // Re-enable button
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

/**
 * Handle Reset Code button click
 */
async function handleReset() {
    if (!currentLabData) {
        utils.showNotification('No lab data available', 'error');
        return;
    }

    // Confirm with user
    const confirmed = confirm(
        'Are you sure you want to reset to starter code? All changes will be lost.'
    );

    if (!confirmed) {
        return;
    }

    const btn = document.getElementById('reset-btn');
    const originalText = btn.innerHTML;

    try {
        // Disable button and show loading
        btn.disabled = true;
        btn.innerHTML = '<span class="btn-icon loading">⟳</span> Resetting...';

        // Reset code
        await livecodes.resetCode(currentLabData);

        // Clear test results
        testRunner.clearTestResults();

        utils.showNotification('Code reset to starter template', 'info');
    } catch (error) {
        console.error('Error resetting code:', error);
        utils.showNotification('Failed to reset code: ' + error.message, 'error');
    } finally {
        // Re-enable button
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

/**
 * Handle sidebar toggle button click
 */
function handleSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.querySelector('.toggle-icon');

    if (sidebar) {
        sidebar.classList.toggle('collapsed');

        // Update icon
        if (toggleIcon) {
            toggleIcon.textContent = sidebar.classList.contains('collapsed') ? '▶' : '◀';
        }
    }
}

/**
 * Handle test results section collapse/expand
 */
function handleTestResultsToggle() {
    const content = document.getElementById('test-results-content');
    const toggle = document.getElementById('test-results-toggle');

    if (content && toggle) {
        content.classList.toggle('collapsed');
        toggle.classList.toggle('collapsed');
    }
}

// Wait for both DOM and LiveCodes SDK to be ready
function waitForReady() {
    return new Promise((resolve, reject) => {
        // Check if SDK is already loaded
        if (window.livecodes && window.livecodes.createPlayground) {
            resolve();
            return;
        }

        // Set a timeout in case SDK fails to load
        const timeout = setTimeout(() => {
            reject(new Error('LiveCodes SDK failed to load. Please check your internet connection and try refreshing the page.'));
        }, 10000); // 10 second timeout

        // Wait for SDK to load
        window.addEventListener('livecodes-ready', () => {
            clearTimeout(timeout);
            resolve();
        }, { once: true });
    });
}

// Initialize app when both DOM and SDK are ready
async function startApp() {
    try {
        // Wait for DOM
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve, { once: true });
            });
        }

        // Wait for SDK
        await waitForReady();

        // Now initialize
        init();
    } catch (error) {
        console.error('Failed to start app:', error);
        utils.hideLoading();
        utils.showError(error.message);
        utils.showNotification(error.message, 'error', 10000);
    }
}

// Start the app
startApp();

// Export for debugging
window.app = {
    currentLabData,
    utils,
    labLoader,
    livecodes,
    testRunner,
    validator
};
