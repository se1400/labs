# Test Helper Functions

Reusable helper functions for Jest tests in LiveCodes environment.

## Table of Contents

1. [LiveCodes Detection](#livecodes-detection)
2. [CSS Testing Helpers](#css-testing-helpers)
3. [Color Conversion](#color-conversion)
4. [HTML Testing Patterns](#html-testing-patterns)

---

## LiveCodes Detection

### `isLiveCodes()`

Detects if the tests are running in LiveCodes environment.

**Why:** LiveCodes moves student-written `<head>` content into `<body>`, so we need to check both locations.

```javascript
const isLiveCodes = () => {
  return document.querySelector('head > script#message-script') !== null ||
         document.querySelector('head > title')?.textContent === 'Untitled Project';
};
```

**Usage:**
```javascript
test('Check for link element', () => {
  if (isLiveCodes()) {
    const link = document.querySelector('body > link[rel="stylesheet"]');
    expect(link).toBeTruthy();
  } else {
    const link = document.querySelector('head > link[rel="stylesheet"]');
    expect(link).toBeTruthy();
  }
});
```

---

## CSS Testing Helpers

### `findCSSRule(selector, property, value)`

Finds a CSS rule by selector and optionally checks if a property has a specific value.

**Features:**
- Normalizes values (removes spaces)
- Handles hex to rgb conversion (browsers convert hex to rgb)
- Handles `0` vs `0px` equivalence
- Case-insensitive matching

```javascript
const findCSSRule = (selector, property, value) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText === selector) {
          const propValue = rule.style.getPropertyValue(property);
          if (value === undefined) {
            return propValue !== '';
          }
          // Normalize values for comparison (remove spaces)
          const normalizedPropValue = propValue.replace(/\s/g, '').toLowerCase();
          const normalizedValue = String(value).replace(/\s/g, '').toLowerCase();
          if (normalizedPropValue === normalizedValue) {
            return true;
          }
          // Handle hex colors (browser converts to rgb)
          if (normalizedValue.startsWith('#')) {
            const rgbValue = hexToRgb(normalizedValue);
            if (normalizedPropValue === rgbValue) {
              return true;
            }
          }
          // Handle 0 vs 0px
          if ((normalizedValue === '0' || normalizedValue === '0px') &&
              (normalizedPropValue === '0' || normalizedPropValue === '0px')) {
            return true;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
  }
  return false;
};
```

**Usage:**
```javascript
// Check if property exists
test('Body has color property', () => {
  expect(findCSSRule('body', 'color')).toBe(true);
});

// Check specific value
test('Body color is #003058', () => {
  expect(findCSSRule('body', 'color', '#003058')).toBe(true);
});
```

### `findGroupedSelector(selectors, property, value)`

Finds grouped selectors (like `h2, h3, h4`) and checks properties.

**Features:**
- Handles any order of selectors in the group
- Trims whitespace
- Sorts selectors for comparison
- Same value normalization as `findCSSRule`

```javascript
const findGroupedSelector = (selectors, property, value) => {
  const selectorArray = selectors.split(',').map(s => s.trim()).sort();
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText) {
          const ruleSelectors = rule.selectorText.split(',').map(s => s.trim()).sort();
          // Check if arrays match
          if (ruleSelectors.length === selectorArray.length &&
              ruleSelectors.every((s, i) => s === selectorArray[i])) {
            const propValue = rule.style.getPropertyValue(property);
            if (value === undefined) {
              return propValue !== '';
            }
            const normalizedPropValue = propValue.replace(/\s/g, '').toLowerCase();
            const normalizedValue = String(value).replace(/\s/g, '').toLowerCase();
            if (normalizedPropValue === normalizedValue) {
              return true;
            }
            // Handle hex colors (browser converts to rgb)
            if (normalizedValue.startsWith('#')) {
              const rgbValue = hexToRgb(normalizedValue);
              if (normalizedPropValue === rgbValue) {
                return true;
              }
            }
            if ((normalizedValue === '0' || normalizedValue === '0px') &&
                (normalizedPropValue === '0' || normalizedPropValue === '0px')) {
              return true;
            }
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
  }
  return false;
};
```

**Usage:**
```javascript
test('Grouped selector h2, h3, h4 has red color', () => {
  expect(findGroupedSelector('h2, h3, h4', 'color', '#BA1C21')).toBe(true);
});

// Order doesn't matter - these are equivalent:
// h2, h3, h4
// h4, h2, h3
// h3, h4, h2
```

---

## Color Conversion

### `hexToRgb(hex)`

Converts hex color to rgb format for comparison.

**Why:** Browsers convert hex colors to rgb in computed styles, so we need to compare in the same format.

```javascript
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`;
  }
  return hex.toLowerCase();
};
```

**Usage:**
```javascript
hexToRgb('#003058')  // Returns: "rgb(0,48,88)"
hexToRgb('#BA1C21')  // Returns: "rgb(186,28,33)"
hexToRgb('#ffffff')  // Returns: "rgb(255,255,255)"
```

**Note:** This is typically used internally by `findCSSRule()` and `findGroupedSelector()`, not called directly.

---

## HTML Testing Patterns

### Check Element Exists

```javascript
test('Element exists', () => {
  const element = document.querySelector('selector');
  expect(element).toBeTruthy();
});
```

### Check Class

```javascript
test('Element has class', () => {
  const element = document.querySelector('selector');
  expect(element.classList.contains('class-name')).toBe(true);
});
```

### Check ID

```javascript
test('Element has id', () => {
  const element = document.querySelector('selector');
  expect(element.id).toBe('id-value');
});
```

### Check Attribute

```javascript
test('Element has attribute', () => {
  const element = document.querySelector('selector');
  expect(element.getAttribute('attr')).toBe('value');
});
```

### Check Text Content

```javascript
test('Element contains text', () => {
  const element = document.querySelector('selector');
  expect(element.textContent).toContain('expected text');
});
```

### Check Multiple Elements

```javascript
test('Multiple elements have class', () => {
  const elements = document.querySelectorAll('selector');
  expect(elements.length).toBeGreaterThanOrEqual(2);
  for (const element of elements) {
    expect(element.classList.contains('class-name')).toBe(true);
  }
});
```

### Check Inline Styles

```javascript
test('Element has inline style', () => {
  const element = document.querySelector('selector');
  const style = element.getAttribute('style').toLowerCase();
  expect(style).toContain('color');
  expect(style).toContain('#ba1c21');
});
```

### Check Content in Head vs Body (LiveCodes)

```javascript
test('Style element exists', () => {
  if (isLiveCodes()) {
    const styleInBody = document.querySelector('body > style');
    expect(styleInBody).toBeTruthy();
  } else {
    const styleInHead = document.querySelector('head > style');
    expect(styleInHead).toBeTruthy();
  }
});
```

### Check Style Element Content

```javascript
test('Style element contains CSS rule', () => {
  let styles;
  if (isLiveCodes()) {
    styles = document.querySelectorAll('body > style');
  } else {
    styles = document.querySelectorAll('head > style');
  }
  let found = false;
  for (const style of styles) {
    const content = style.textContent || '';
    if (content.includes('.selector') && content.includes('property') && content.includes('value')) {
      found = true;
      break;
    }
  }
  expect(found).toBe(true);
});
```

---

## Font Family Testing

Font families require special handling because browsers may format them differently.

```javascript
test('Body has correct font-family', () => {
  let found = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText === 'body') {
          const fontFamily = rule.style.fontFamily.toLowerCase();
          // Check for key parts of the font stack
          if (fontFamily.includes('arial') && fontFamily.includes('sans-serif')) {
            found = true;
            break;
          }
        }
      }
    } catch (e) {}
    if (found) break;
  }
  expect(found).toBe(true);
});
```

---

## Best Practices

1. **Always use `isLiveCodes()`** when testing `<head>` content
2. **Use `findCSSRule()`** instead of computed styles when possible (more accurate)
3. **Be forgiving** - Accept valid variations:
   - `styles.css` and `./styles.css`
   - `0` and `0px`
   - `#BA1C21` and `rgb(186,28,33)`
   - Spacing variations in values
4. **Test what matters** - Don't test HTML attributes that have no effect
5. **One assertion per concept** - Keep tests focused
6. **Clear error messages** - Test descriptions should match instructions

---

## Common Gotchas

### ❌ Wrong: Testing Computed Styles Directly

```javascript
// BAD - computed styles can vary
const computed = window.getComputedStyle(element);
expect(computed.color).toBe('#003058');
```

### ✅ Right: Using findCSSRule

```javascript
// GOOD - checks actual CSS rules
expect(findCSSRule('body', 'color', '#003058')).toBe(true);
```

### ❌ Wrong: Assuming Head Location

```javascript
// BAD - only checks head
const style = document.querySelector('head > style');
```

### ✅ Right: Checking Both Locations

```javascript
// GOOD - works in LiveCodes and regular environments
if (isLiveCodes()) {
  const style = document.querySelector('body > style');
} else {
  const style = document.querySelector('head > style');
}
```

### ❌ Wrong: Strict Value Matching

```javascript
// BAD - fails if student uses 0px instead of 0
expect(element.style.margin).toBe('0');
```

### ✅ Right: Flexible Value Matching

```javascript
// GOOD - accepts both 0 and 0px
expect(findCSSRule('h1', 'margin', '0')).toBe(true);
```
