/**
 * Lab Loader
 * Fetches lab files from the labs folder structure
 */

/**
 * Load a lab by name
 * @param {string} labName - Name of the lab folder
 * @returns {Promise<Object>} Lab data object
 */
export async function loadLab(labName) {
    if (!labName) {
        throw new Error('Lab name is required');
    }

    const labPath = `labs/${labName}`;

    try {
        // Fetch all required files
        const [description, starterHTML, starterCSS, starterJS, tests] = await Promise.all([
            fetchFile(`${labPath}/description.md`),
            fetchFile(`${labPath}/starter.html`),
            fetchFile(`${labPath}/starter.css`),
            fetchFile(`${labPath}/starter.js`),
            fetchFile(`${labPath}/tests.js`)
        ]);

        // Extract title from markdown
        const title = extractTitle(description);

        return {
            name: labName,
            title,
            description,
            starterHTML,
            starterCSS,
            starterJS,
            tests
        };
    } catch (error) {
        console.error('Error loading lab:', error);

        // Provide more specific error messages
        if (error.message.includes('404')) {
            throw new Error(`Lab "${labName}" not found. Please check the URL.`);
        }

        throw new Error(`Failed to load lab "${labName}". ${error.message}`);
    }
}

/**
 * Fetch a file from the server
 * @param {string} path - File path
 * @returns {Promise<string>} File contents
 */
async function fetchFile(path) {
    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.text();
    } catch (error) {
        console.error(`Error fetching ${path}:`, error);
        throw error;
    }
}

/**
 * Extract title from markdown content
 * @param {string} markdown - Markdown content
 * @returns {string} Extracted title or default
 */
function extractTitle(markdown) {
    // Match first # heading
    const match = markdown.match(/^#\s+(.+)$/m);

    if (match && match[1]) {
        return match[1].trim();
    }

    return 'Untitled Lab';
}

/**
 * Get lab name from URL
 * @returns {string|null} Lab name or null
 */
export function getLabNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lab');
}

export default {
    loadLab,
    getLabNameFromURL
};
