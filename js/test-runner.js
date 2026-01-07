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
    item.className = 'test-item';

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
    // Try to get test name from errors or use generic name
    const testName = extractTestName(result) || `Test ${index + 1}`;
    name.textContent = testName;

    item.appendChild(icon);
    item.appendChild(name);

    // If test failed, add error details
    if (result.status === 'fail' && result.errors && result.errors.length > 0) {
        const expand = document.createElement('span');
        expand.className = 'test-expand';
        expand.textContent = '▼';
        expand.style.cursor = 'pointer';

        const errorDiv = document.createElement('div');
        errorDiv.className = 'test-error';

        // Clean error messages - remove stack trace
        const cleanedErrors = result.errors.map(error => cleanErrorMessage(error));
        errorDiv.textContent = cleanedErrors.join('\n\n');

        // Toggle error visibility on click
        expand.addEventListener('click', () => {
            errorDiv.classList.toggle('visible');
            expand.textContent = errorDiv.classList.contains('visible') ? '▲' : '▼';
        });

        item.appendChild(expand);
        name.appendChild(errorDiv);
    }

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
    // Check if errors contain test name (common in Jest output)
    if (result.errors && result.errors.length > 0) {
        const firstError = result.errors[0];

        // Try to extract test name from error message
        // Jest format: "TestName › should do something"
        const match = firstError.match(/^(.+?)(?:\s+›|\s+\(|$)/);
        if (match && match[1]) {
            return match[1].trim();
        }
    }

    // If result has a title or name property
    if (result.title) {
        return result.title;
    }

    if (result.name) {
        return result.name;
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
