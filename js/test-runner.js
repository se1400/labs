/**
 * Test Runner
 * Executes tests and displays results in the sidebar
 */

import * as livecodes from './livecodes-manager.js';

/**
 * Run tests and display results
 * @returns {Promise<Array>} Test results
 */
export async function runTests() {
    try {
        // Run tests via LiveCodes manager
        const results = await livecodes.runTests();

        // Display results in UI
        displayTestResults(results);

        return results;
    } catch (error) {
        console.error('Error running tests:', error);
        throw error;
    }
}

/**
 * Display test results in the sidebar
 * @param {Array} results - Array of test result objects
 */
export function displayTestResults(results) {
    if (!results || !Array.isArray(results)) {
        console.error('Invalid test results:', results);
        return;
    }

    // Show test results container
    const testResults = document.getElementById('test-results');
    testResults.style.display = 'block';

    // Calculate statistics
    const totalTests = results.length;
    const passedTests = results.filter(r => r.status === 'pass').length;
    const failedTests = results.filter(r => r.status === 'fail').length;
    const skippedTests = results.filter(r => r.status === 'skip').length;
    const percentage = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

    // Update summary
    const testCount = document.getElementById('test-count');
    const testPercentage = document.getElementById('test-percentage');
    const progressFill = document.getElementById('progress-fill');

    testCount.textContent = `Tests: ${passedTests}/${totalTests} passed`;
    testPercentage.textContent = `${percentage}%`;
    progressFill.style.width = `${percentage}%`;

    // Update test list
    const testList = document.getElementById('test-list');
    testList.innerHTML = ''; // Clear previous results

    results.forEach((result, index) => {
        const testItem = createTestItem(result, index);
        testList.appendChild(testItem);
    });

    // Ensure test list is visible by default
    const testListContainer = document.getElementById('test-list');
    if (testListContainer) {
        testListContainer.style.display = 'flex';
    }
}

/**
 * Create a test item element
 * @param {Object} result - Test result object
 * @param {number} index - Test index
 * @returns {HTMLElement} Test item element
 */
function createTestItem(result, index) {
    const item = document.createElement('div');
    item.className = `test-item ${result.status}`;

    // Create header (always visible)
    const header = document.createElement('div');
    header.className = 'test-item-header';

    // Icon
    const icon = document.createElement('span');
    icon.className = `test-icon ${result.status}`;
    const icons = {
        pass: '✓',
        fail: '✗',
        skip: '⊙'
    };
    icon.textContent = icons[result.status] || '⊙';

    // Test name/description
    const name = document.createElement('div');
    name.className = 'test-name';
    const testName = extractTestName(result) || `Test ${index + 1}`;
    name.textContent = testName;

    // Expand/collapse arrow (for all tests)
    const expand = document.createElement('span');
    expand.className = 'test-expand';
    expand.textContent = '▼';

    header.appendChild(icon);
    header.appendChild(name);
    header.appendChild(expand);

    // Create details section (collapsible)
    const details = document.createElement('div');
    details.className = `test-details ${result.status}`;

    // Build details content
    let detailsContent = testName; // Start with test name

    if (result.status === 'fail' && result.errors && result.errors.length > 0) {
        // Add error details for failed tests
        const cleanedErrors = result.errors.map(error => cleanErrorMessage(error));
        detailsContent += '\n' + cleanedErrors.join('\n\n');
    } else if (result.status === 'pass') {
        // Add success message for passed tests
        detailsContent += '\n✓ Test passed';
    }

    details.textContent = detailsContent;

    // Toggle details visibility on header click
    header.addEventListener('click', () => {
        details.classList.toggle('visible');
        expand.classList.toggle('expanded');
    });

    item.appendChild(header);
    item.appendChild(details);

    return item;
}

/**
 * Clean error message by removing stack trace
 * @param {string} errorMessage - Raw error message with stack trace
 * @returns {string} Cleaned error message
 */
function cleanErrorMessage(errorMessage) {
    if (!errorMessage) return '';

    // Split by lines
    const lines = errorMessage.split('\n');
    const cleanedLines = [];

    for (const line of lines) {
        // Stop at stack trace markers
        if (line.trim().startsWith('at ') ||
            line.includes('https://') ||
            line.includes('http://')) {
            break;
        }
        cleanedLines.push(line);
    }

    return cleanedLines.join('\n').trim();
}

/**
 * Extract test name from result object
 * @param {Object} result - Test result object
 * @returns {string|null} Test name or null
 */
function extractTestName(result) {
    // First, check if result has a title property (most common)
    if (result.title) {
        return result.title;
    }

    // Check for name property
    if (result.name) {
        return result.name;
    }

    // Try to extract from errors if present
    if (result.errors && result.errors.length > 0) {
        const firstError = result.errors[0];

        // Look for lines before "Error:" that might contain the test name
        const lines = firstError.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            // Skip empty lines and error lines
            if (trimmed &&
                !trimmed.startsWith('Error:') &&
                !trimmed.startsWith('Expected') &&
                !trimmed.startsWith('Received') &&
                !trimmed.startsWith('at ')) {
                return trimmed;
            }
        }
    }

    return null;
}

/**
 * Clear test results display
 */
export function clearTestResults() {
    const testResults = document.getElementById('test-results');
    testResults.style.display = 'none';

    const testList = document.getElementById('test-list');
    testList.innerHTML = '';

    const testCount = document.getElementById('test-count');
    const testPercentage = document.getElementById('test-percentage');
    const progressFill = document.getElementById('progress-fill');

    testCount.textContent = 'Tests: 0/0';
    testPercentage.textContent = '0%';
    progressFill.style.width = '0%';
}

export default {
    runTests,
    displayTestResults,
    clearTestResults
};
