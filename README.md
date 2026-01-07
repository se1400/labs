# Student Coding Labs

An interactive HTML/CSS/JavaScript learning platform powered by [LiveCodes](https://livecodes.io). Students complete coding exercises with automated testing, code validation, and easy sharing capabilities.

## Features

- **Interactive Code Editor** - Powered by LiveCodes with HTML, CSS, and JavaScript support
- **Automated Testing** - Jest-based tests with visual pass/fail indicators
- **Code Validation** - W3C HTML/CSS validation + JavaScript syntax checking
- **Easy Sharing** - Generate shareable URLs for submitting assignments
- **Dark Theme** - Matches LiveCodes dark mode for a cohesive experience
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **No Backend Required** - Fully static site perfect for GitHub Pages

## Quick Start

### For Students

1. Navigate to the lab URL: `https://se1400.github.io/labs?lab=debug-camperbot`
2. Read the assignment description in the left sidebar
3. Edit the code in the LiveCodes editor
4. Click "Run Tests" to check your work
5. Click "Share" to generate a submission URL
6. Submit the share URL to your instructor

### For Instructors

#### Accessing the Site

Deploy to GitHub Pages:
1. Push this repository to GitHub
2. Go to Settings → Pages
3. Set source to `main` branch, root directory
4. Access at `https://[username].github.io/[repo-name]`

#### Adding New Labs

1. Create a new folder in `labs/[lab-name]/`
2. Add 5 required files:
   - `description.md` - Lab instructions (Markdown format)
   - `starter.html` - Initial HTML code
   - `starter.css` - Initial CSS code
   - `starter.js` - Initial JavaScript code
   - `tests.js` - Jest test cases

3. Students access the lab at: `?lab=[lab-name]`

#### Example Lab Structure

```
labs/
└── my-new-lab/
    ├── description.md    # Assignment description
    ├── starter.html      # Starting HTML code
    ├── starter.css       # Starting CSS code
    ├── starter.js        # Starting JavaScript code
    └── tests.js          # Jest tests
```

## Writing Tests

Tests use the Jest framework and run in the browser. They can query the DOM to validate student work.

### Test Template

```javascript
test('description of what to test', () => {
  // Query the DOM
  const element = document.querySelector('selector');

  // Make assertions
  expect(element).toBeTruthy();
  expect(element.textContent).toMatch(/expected text/);
});
```

### Common Test Patterns

**Check element count:**
```javascript
test('should have exactly 3 paragraphs', () => {
  const paragraphs = document.querySelectorAll('p');
  expect(paragraphs).toHaveLength(3);
});
```

**Check element exists:**
```javascript
test('should have a header element', () => {
  const header = document.querySelector('header');
  expect(header).toBeTruthy();
});
```

**Check text content:**
```javascript
test('h1 should contain Welcome', () => {
  const h1 = document.querySelector('h1');
  expect(h1.textContent).toMatch(/Welcome/);
});
```

**Check attribute:**
```javascript
test('image should have alt text', () => {
  const img = document.querySelector('img');
  expect(img.getAttribute('alt')).toBeTruthy();
});
```

**Check class:**
```javascript
test('div should have class container', () => {
  const div = document.querySelector('div');
  expect(div.classList.contains('container')).toBe(true);
});
```

## Description File Format

The `description.md` file uses Markdown format:

```markdown
# Lab Title

Brief description of what the student will build.

## User Stories:

- First requirement
- Second requirement
- Third requirement

## Helpful Tips:

- Optional hints
- Resources
```

## Viewing Student Submissions

When students click "Share", they get a LiveCodes URL like: `https://livecodes.io/?x=id/abc123`

To view submissions:
1. Open the share URL in your browser
2. View the student's code in LiveCodes
3. Run tests directly in LiveCodes to verify
4. Assign a grade based on test results and code quality

## Project Structure

```
labs/
├── index.html              # Main application page
├── style.css               # Dark theme styles
├── js/
│   ├── app.js              # Main application logic
│   ├── lab-loader.js       # Loads lab files
│   ├── livecodes-manager.js # LiveCodes SDK integration
│   ├── test-runner.js      # Test execution and display
│   ├── validator.js        # W3C validation
│   └── utils.js            # Helper functions
└── labs/
    ├── debug-camperbot/    # Example lab
    └── [your-lab-here]/    # Add more labs
```

## Technologies Used

- **[LiveCodes](https://livecodes.io)** v0.7.1 - Code playground SDK
- **[Jest](https://jestjs.io/)** - Testing framework (runs in browser via LiveCodes)
- **[Marked.js](https://marked.js.org/)** - Markdown parser
- **[W3C Validators](https://validator.w3.org/)** - HTML/CSS validation

## Features Overview

### Run Tests Button
- Executes all Jest tests
- Displays pass/fail count with percentage
- Shows individual test results with colored icons (✓ ✗ ⊙)
- Expandable error details for failed tests

### Validate Button
- Validates HTML with W3C HTML validator
- Validates CSS with W3C CSS validator
- Checks JavaScript syntax
- Shows results in a modal with line numbers

### Share Button
- Generates a LiveCodes short URL
- Copies URL to clipboard automatically
- Students submit this URL for grading

### Reset Code Button
- Restores starter code
- Clears test results
- Confirms with user before resetting

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (responsive design)

## Troubleshooting

### Lab won't load
- Check that the lab folder name matches the URL parameter
- Verify all 5 required files exist in the lab folder
- Check browser console for errors

### Tests won't run
- Ensure tests.js has valid Jest test syntax
- Check that LiveCodes playground loaded successfully
- Verify tests target the correct DOM elements

### Validation fails
- W3C validators require internet connection
- Some validators may have rate limits
- Check browser console for CORS or network errors

## Example Labs

### Included Labs

- **debug-camperbot** - Fix HTML syntax errors (beginner level)

### Creating More Labs

Consider these lab topics:
- HTML: Forms, semantic HTML, tables, lists
- CSS: Flexbox, Grid, positioning, responsive design
- JavaScript: DOM manipulation, events, functions, arrays

## Contributing

To add new labs:
1. Create a lab folder with all 5 required files
2. Test locally by opening `index.html?lab=your-lab-name`
3. Commit and push to GitHub
4. Labs are immediately available on GitHub Pages

## License

MIT License - Feel free to use and modify for educational purposes.

## Support

For issues or questions:
- Check the [LiveCodes documentation](https://livecodes.io/docs/)
- Review the example lab (debug-camperbot)
- Check browser console for error messages

---

**Built for SE1400 students** | Powered by [LiveCodes](https://livecodes.io)
