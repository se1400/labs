/**
 * LiveCodes Manager
 * Handles initialization and communication with the LiveCodes playground
 */

let playgroundInstance = null;

/**
 * Initialize the LiveCodes playground
 * @param {string} container - Container selector or element
 * @param {Object} labData - Lab data object containing starter code and tests
 * @returns {Promise<Object>} Playground instance
 */
export async function initPlayground(container, labData) {
    if (!window.livecodes || !window.livecodes.createPlayground) {
        throw new Error('LiveCodes SDK is not loaded');
    }

    try {
        // Get the container element
        let containerElement;
        if (typeof container === 'string') {
            containerElement = document.querySelector(container);
            if (!containerElement) {
                throw new Error(`Container element not found: ${container}`);
            }
        } else {
            containerElement = container;
        }

        // Clear any existing content in the container
        containerElement.innerHTML = '';

        const config = {
            markup: {
                language: 'html',
                content: labData.starterHTML || '<!-- Add your HTML here -->'
            },
            style: {
                language: 'css',
                content: labData.starterCSS || '/* Add your CSS here */'
            },
            script: {
                language: 'javascript',
                content: labData.starterJS || '// Add your JavaScript here'
            },
            tests: {
                language: 'javascript',
                content: labData.tests || '// No tests provided'
            },
            tools: {
                enabled: ['console', 'tests'],
                active: 'console',
                status: 'open'
            }
        };

        const params = {
            activeEditor: 'markup',
            mode: 'full',
            theme: 'dark',
            readonly: false
        };

        console.log('Creating LiveCodes playground with config:', { config, params });

        // Create the playground - pass the element directly
        playgroundInstance = await window.livecodes.createPlayground(containerElement, {
            config,
            params
        });

        console.log('LiveCodes playground initialized successfully');

        return playgroundInstance;
    } catch (error) {
        console.error('Error initializing LiveCodes:', error);
        throw new Error(`Failed to initialize code editor: ${error.message}`);
    }
}

/**
 * Get the current playground instance
 * @returns {Object|null} Playground instance or null
 */
export function getPlayground() {
    return playgroundInstance;
}

/**
 * Run the code in the playground
 * @returns {Promise<void>}
 */
export async function runCode() {
    if (!playgroundInstance) {
        throw new Error('Playground not initialized');
    }

    try {
        await playgroundInstance.run();
    } catch (error) {
        console.error('Error running code:', error);
        throw error;
    }
}

/**
 * Get the current code from the playground
 * @returns {Promise<Object>} Code object with markup, style, script
 */
export async function getCode() {
    if (!playgroundInstance) {
        throw new Error('Playground not initialized');
    }

    try {
        return await playgroundInstance.getCode();
    } catch (error) {
        console.error('Error getting code:', error);
        throw error;
    }
}

/**
 * Reset code to starter template
 * @param {Object} labData - Lab data with starter code
 * @returns {Promise<void>}
 */
export async function resetCode(labData) {
    if (!playgroundInstance) {
        throw new Error('Playground not initialized');
    }

    try {
        await playgroundInstance.setConfig({
            markup: {
                language: 'html',
                content: labData.starterHTML || '<!-- Add your HTML here -->'
            },
            style: {
                language: 'css',
                content: labData.starterCSS || '/* Add your CSS here */'
            },
            script: {
                language: 'javascript',
                content: labData.starterJS || '// Add your JavaScript here'
            }
        });

        console.log('Code reset to starter template');
    } catch (error) {
        console.error('Error resetting code:', error);
        throw error;
    }
}

/**
 * Generate a share URL for the current code
 * @param {boolean} shortUrl - Whether to generate a short URL
 * @returns {Promise<string>} Share URL
 */
export async function getShareUrl(shortUrl = true) {
    if (!playgroundInstance) {
        throw new Error('Playground not initialized');
    }

    try {
        return await playgroundInstance.getShareUrl(shortUrl);
    } catch (error) {
        console.error('Error generating share URL:', error);

        // Try fallback to long URL
        if (shortUrl) {
            try {
                return await playgroundInstance.getShareUrl(false);
            } catch (fallbackError) {
                throw new Error('Failed to generate share URL');
            }
        }

        throw error;
    }
}

/**
 * Run tests in the playground
 * @returns {Promise<Object>} Test results
 */
export async function runTests() {
    if (!playgroundInstance) {
        throw new Error('Playground not initialized');
    }

    try {
        // First run the code to update the result page
        await playgroundInstance.run();

        // Then run tests
        const { results } = await playgroundInstance.runTests();

        return results;
    } catch (error) {
        console.error('Error running tests:', error);
        throw error;
    }
}

/**
 * Watch for events in the playground
 * @param {string} event - Event name ('code', 'tests', 'console', etc.)
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function watch(event, callback) {
    if (!playgroundInstance) {
        throw new Error('Playground not initialized');
    }

    try {
        return playgroundInstance.watch(event, callback);
    } catch (error) {
        console.error(`Error watching ${event}:`, error);
        throw error;
    }
}

export default {
    initPlayground,
    getPlayground,
    runCode,
    getCode,
    resetCode,
    getShareUrl,
    runTests,
    watch
};
