/**
 * Code Validator
 * Validates HTML, CSS, and JavaScript code using W3C validators and syntax checking
 */

import * as livecodes from './livecodes-manager.js';
import { showValidationModal, showNotification } from './utils.js';

/**
 * Validate all code (HTML, CSS, JS)
 * @returns {Promise<Object>} Validation results
 */
export async function validateCode() {
    try {
        // Get current code from playground
        const code = await livecodes.getCode();

        const results = {
            html: null,
            css: null,
            js: null
        };

        // Validate HTML
        if (code.markup && code.markup.content) {
            try {
                results.html = await validateHTML(code.markup.content);
            } catch (error) {
                console.error('HTML validation error:', error);
                results.html = {
                    valid: false,
                    errors: [{ message: 'Failed to validate HTML: ' + error.message }]
                };
            }
        }

        // Validate CSS
        if (code.style && code.style.content) {
            try {
                results.css = await validateCSS(code.style.content);
            } catch (error) {
                console.error('CSS validation error:', error);
                results.css = {
                    valid: false,
                    errors: [{ message: 'Failed to validate CSS: ' + error.message }]
                };
            }
        }

        // Validate JavaScript
        if (code.script && code.script.content) {
            results.js = validateJS(code.script.content);
        }

        // Show results in modal
        showValidationModal(results);

        return results;
    } catch (error) {
        console.error('Validation error:', error);
        showNotification('Failed to validate code: ' + error.message, 'error');
        throw error;
    }
}

/**
 * Validate HTML using W3C validator
 * @param {string} htmlCode - HTML code to validate
 * @returns {Promise<Object>} Validation result
 */
async function validateHTML(htmlCode) {
    try {
        // Use validator.nu with text/html content type instead of FormData
        // This approach may have better CORS support
        const response = await fetch('https://validator.nu/?out=json', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/html; charset=utf-8'
            },
            body: htmlCode
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Parse W3C validator response
        const errors = [];

        if (data.messages && Array.isArray(data.messages)) {
            data.messages.forEach(msg => {
                if (msg.type === 'error' || msg.type === 'warning') {
                    errors.push({
                        type: msg.type,
                        message: msg.message,
                        line: msg.lastLine || msg.firstLine
                    });
                }
            });
        }

        return {
            valid: errors.filter(e => e.type === 'error').length === 0,
            errors
        };
    } catch (error) {
        console.error('HTML validation request failed:', error);
        throw new Error('W3C HTML validator is not available. Please check your internet connection.');
    }
}

/**
 * Validate CSS using W3C CSS validator
 * @param {string} cssCode - CSS code to validate
 * @returns {Promise<Object>} Validation result
 */
async function validateCSS(cssCode) {
    try {
        // W3C CSS validator expects form data
        const formData = new FormData();
        formData.append('text', cssCode);
        formData.append('profile', 'css3');
        formData.append('output', 'json');

        const response = await fetch('https://jigsaw.w3.org/css-validator/validator', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Parse W3C CSS validator response
        const errors = [];

        // Add errors
        if (data.cssvalidation && data.cssvalidation.errors) {
            data.cssvalidation.errors.forEach(err => {
                errors.push({
                    type: 'error',
                    message: err.message,
                    line: err.line
                });
            });
        }

        // Add warnings
        if (data.cssvalidation && data.cssvalidation.warnings) {
            data.cssvalidation.warnings.forEach(warn => {
                errors.push({
                    type: 'warning',
                    message: warn.message,
                    line: warn.line
                });
            });
        }

        return {
            valid: errors.filter(e => e.type === 'error').length === 0,
            errors
        };
    } catch (error) {
        console.error('CSS validation request failed:', error);
        throw new Error('W3C CSS validator is not available. Please check your internet connection.');
    }
}

/**
 * Validate JavaScript syntax
 * @param {string} jsCode - JavaScript code to validate
 * @returns {Object} Validation result
 */
function validateJS(jsCode) {
    const errors = [];

    // Skip validation if code is empty
    if (!jsCode || jsCode.trim() === '') {
        return {
            valid: true,
            errors: []
        };
    }

    try {
        // Wrap code in try-catch to handle various syntax patterns
        // This handles most common JavaScript syntax
        const wrappedCode = `(function() { ${jsCode} })();`;
        new Function(wrappedCode);

        return {
            valid: true,
            errors: []
        };
    } catch (error) {
        // Try alternative validation for module syntax (import/export)
        if (error.message.includes('import') || error.message.includes('export')) {
            try {
                // Use eval in a safer way for module-like code
                new Function(`"use strict"; ${jsCode}`);
                return {
                    valid: true,
                    errors: []
                };
            } catch (innerError) {
                // If it still fails, report the error
                errors.push({
                    type: 'error',
                    message: innerError.message,
                    line: undefined
                });
            }
        } else {
            // Extract line number if available
            const lineMatch = error.message.match(/line (\d+)/i);
            const line = lineMatch ? parseInt(lineMatch[1]) : undefined;

            errors.push({
                type: 'error',
                message: error.message,
                line
            });
        }

        return {
            valid: false,
            errors
        };
    }
}

export default {
    validateCode,
    validateHTML,
    validateCSS,
    validateJS
};
