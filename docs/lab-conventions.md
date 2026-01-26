# Lab Conventions & Patterns

This document outlines the standard patterns and conventions used across all labs in this project.

## File Structure

Every lab should have these 4 core files:

```
labs/<lab-name>/
├── description.md    # Student-facing instructions
├── starter.html      # Starting HTML file for students
├── starter.css       # Starting CSS file (may be empty or minimal)
├── starter.js        # Starting JavaScript file (may be empty or minimal)
└── tests.js          # Jest tests that validate student work
```

## Description Format (`description.md`)

### Structure

```markdown
# [Lab Title]

[Brief introduction explaining what students will learn]

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** [Any critical information about syntax, format, or concepts]

## Instructions:

### Part 1: [Section Name]

[Optional: Explanation of the concept being taught]

1. [First instruction with specific requirements]
2. [Second instruction with specific requirements]
   - Sub-requirements as bullet points
   - Include exact values (colors, sizes, etc.)

### Part 2: [Next Section Name]

[Continue with numbered steps...]

**Note:** [Optional contextual notes about concepts, best practices, or "aha" moments]
```

### Best Practices

- **Use numbered steps** starting from 1 and continuing across all parts
- **Be explicit** - Include exact selectors, property names, and values
- **Show examples** when syntax is unfamiliar (grouped selectors, specific formats)
- **Use `<code>` tags** for all HTML elements, CSS selectors, and property names
- **Anticipate mistakes** - Add clarifications where students commonly err
- **Add educational notes** explaining the "why" behind requirements

### Example Instructions

Good:
```markdown
1. In the <code>&lt;head&gt;</code> element, add a <code>&lt;link&gt;</code> element
   with a <code>rel</code> attribute set to <code>stylesheet</code> and an
   <code>href</code> attribute set to <code>styles.css</code>.
```

Better (prevents common mistakes):
```markdown
1. In the <code>&lt;head&gt;</code> element, add a <code>&lt;link&gt;</code> element
   with a <code>rel</code> attribute set to <code>stylesheet</code> and an
   <code>href</code> attribute set to <code>styles.css</code>. This connects your
   HTML to your external CSS file.
```

## Starter Files

### `starter.html`

- Include proper DOCTYPE and HTML structure
- Use semantic HTML elements
- Include meta charset and viewport
- Keep content minimal but realistic
- Include all HTML elements that tests will target

Example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Lab Title]</title>
</head>
<body>
    <!-- Minimal starter content -->
</body>
</html>
```

### `starter.css`

- Usually starts empty with a comment: `/* Write your CSS styles here */`
- OR includes minimal base styles if that's the starting point

### `starter.js`

- Usually starts empty with a comment: `// No JavaScript is required for this lab.`
- OR includes starter code if students are modifying/completing it

## Test File (`tests.js`)

### Structure

```javascript
// 1. Helper Functions (at top)
// 2. Test Cases (one per requirement)
```

### Helper Functions

Always include at top:

```javascript
// Helper: Detect if running in LiveCodes (where head content gets moved to body)
const isLiveCodes = () => {
  return document.querySelector('head > script#message-script') !== null ||
         document.querySelector('head > title')?.textContent === 'Untitled Project';
};
```

Add other helpers as needed (see `docs/test-helpers.md`).

### Test Cases

Each test should:
1. Have a clear, descriptive message matching the instruction
2. Test exactly one requirement
3. Handle LiveCodes environment quirks
4. Be forgiving of valid variations (spacing, quotes, case-insensitive where appropriate)

Example:
```javascript
// Test 1: Link element in head
test('Your head element should contain a link element with rel="stylesheet" and href="styles.css"', () => {
  const validHrefs = ['styles.css', './styles.css'];
  if (isLiveCodes()) {
    const linkInBody = document.querySelector('body > link[rel="stylesheet"]');
    expect(linkInBody).toBeTruthy();
    expect(validHrefs).toContain(linkInBody.getAttribute('href'));
  } else {
    const linkInHead = document.querySelector('head > link[rel="stylesheet"]');
    expect(linkInHead).toBeTruthy();
    expect(validHrefs).toContain(linkInHead.getAttribute('href'));
  }
});
```

### Test Numbering

- Number tests sequentially: `// Test 1:`, `// Test 2:`, etc.
- Match test order to instruction order
- Include descriptive comments before each test

### Common Patterns

**Check HTML elements exist:**
```javascript
const element = document.querySelector('selector');
expect(element).toBeTruthy();
```

**Check HTML attributes:**
```javascript
expect(element.getAttribute('attr')).toBe('value');
expect(element.classList.contains('class-name')).toBe(true);
expect(element.id).toBe('id-value');
```

**Check CSS properties:**
```javascript
expect(findCSSRule('selector', 'property', 'value')).toBe(true);
```

**Check text content:**
```javascript
expect(element.textContent).toContain('text');
```

## Utah Tech Branding

When using Utah Tech University in examples:

**Colors:**
- Primary Dark Blue: `#003058`
- Utah Tech Red: `#BA1C21`
- Light Gray: `#f2f2f2`
- Dark Gray: `#444444`

**Common Values:**
- Font family: `Arial, Helvetica, sans-serif`
- Line height: `1.6` (body), `1.4` (address)
- Spacing: Typically `10px`, `12px`, or `16px`

## Quality Checklist

Before considering a lab complete:

- [ ] All starter files created
- [ ] Description has clear numbered steps starting from 1
- [ ] All instructions are explicit with exact values
- [ ] Examples provided for unfamiliar syntax
- [ ] All tests written and numbered
- [ ] Tests handle LiveCodes environment (head content in body)
- [ ] Tests are forgiving of valid variations
- [ ] No "useless" tests (every test validates meaningful CSS/HTML/JS)
- [ ] Common student mistakes addressed in descriptions
- [ ] Educational notes explain the "why" behind concepts

## Things to Avoid

❌ **Don't add HTML attributes without corresponding CSS rules**
- Bad: Adding `id="main-menu"` but never using `#main-menu` selector
- Good: Only add classes/IDs that are actually styled

❌ **Don't be ambiguous in instructions**
- Bad: "Add some padding to the header"
- Good: "Set <code>padding</code> to <code>12px</code>"

❌ **Don't forget LiveCodes quirks**
- Head content moves to body in LiveCodes
- Always check both locations in tests

❌ **Don't make tests too strict**
- Accept both `styles.css` and `./styles.css`
- Accept both `0` and `0px`
- Accept both hex and rgb color formats (browsers convert)
- Handle spacing variations in values

❌ **Don't skip educational context**
- Explain what grouped selectors are, don't just tell students to use them
- Show examples of syntax when introducing new concepts
- Add notes about why something works the way it does

## File Naming

- Lab folders: `kebab-case` (e.g., `understanding-css`, `html-basics`)
- Starter files: Always `starter.html`, `starter.css`, `starter.js`
- Test file: Always `tests.js`
- Description: Always `description.md`
