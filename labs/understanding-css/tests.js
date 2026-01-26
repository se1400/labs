// Helper: Detect if running in LiveCodes (where head content gets moved to body)
const isLiveCodes = () => {
  return document.querySelector('head > script#message-script') !== null ||
         document.querySelector('head > title')?.textContent === 'Untitled Project';
};

// Helper: Convert hex color to rgb format for comparison
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`;
  }
  return hex.toLowerCase();
};

// Helper: Check if a CSS rule exists with specific selector and property/value
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

// Helper: Check if a grouped selector exists (like "h2, h3, h4")
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

// Test 1: Link element in head
// Note: In LiveCodes, student's head content ends up in body, so we check there
test('Your head element should contain a link element with rel="stylesheet" and href="styles.css"', () => {
  if (isLiveCodes()) {
    // In LiveCodes, student's link must be in body (proves they wrote it)
    const linkInBody = document.querySelector('body > link[rel="stylesheet"]');
    expect(linkInBody).toBeTruthy();
    expect(linkInBody.getAttribute('href')).toBe('styles.css');
  } else {
    // Non-LiveCodes: check head normally
    const linkInHead = document.querySelector('head > link[rel="stylesheet"]');
    expect(linkInHead).toBeTruthy();
    expect(linkInHead.getAttribute('href')).toBe('styles.css');
  }
});

// Test 2: body font-family
test('Your body selector should have a font-family property set to Arial, Helvetica, sans-serif', () => {
  let found = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText === 'body') {
          const fontFamily = rule.style.fontFamily.toLowerCase();
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

// Test 3: body color
test('Your body selector should have a color property set to #003058', () => {
  expect(findCSSRule('body', 'color', '#003058')).toBe(true);
});

// Test 4: body background-color
test('Your body selector should have a background-color property set to #ffffff', () => {
  expect(findCSSRule('body', 'background-color', '#ffffff')).toBe(true);
});

// Test 5: body line-height
test('Your body selector should have a line-height property set to 1.6', () => {
  expect(findCSSRule('body', 'line-height', '1.6')).toBe(true);
});

// Test 6: body margin
test('Your body selector should have a margin property set to 0', () => {
  expect(findCSSRule('body', 'margin', '0')).toBe(true);
});

// Test 7: body padding
test('Your body selector should have a padding property set to 16px', () => {
  expect(findCSSRule('body', 'padding', '16px')).toBe(true);
});

// Test 8: header padding
test('Your header selector should have a padding property set to 12px', () => {
  expect(findCSSRule('header', 'padding', '12px')).toBe(true);
});

// Test 9: header background-color
test('Your header selector should have a background-color property set to #f2f2f2', () => {
  expect(findCSSRule('header', 'background-color', '#f2f2f2')).toBe(true);
});

// Test 10: nav margin-top
test('Your nav selector should have a margin-top property set to 12px', () => {
  expect(findCSSRule('nav', 'margin-top', '12px')).toBe(true);
});

// Test 11: nav padding
test('Your nav selector should have a padding property set to 10px', () => {
  expect(findCSSRule('nav', 'padding', '10px')).toBe(true);
});

// Test 12: nav background-color
test('Your nav selector should have a background-color property set to #003058', () => {
  expect(findCSSRule('nav', 'background-color', '#003058')).toBe(true);
});

// Test 13: nav color
test('Your nav selector should have a color property set to #ffffff', () => {
  expect(findCSSRule('nav', 'color', '#ffffff')).toBe(true);
});

// Test 14: h1 margin
test('Your h1 selector should have a margin property set to 0', () => {
  expect(findCSSRule('h1', 'margin', '0')).toBe(true);
});

// Test 15: grouped h2, h3, h4 color
test('You should have a grouped selector for h2, h3, h4 with a color property set to #BA1C21', () => {
  expect(findGroupedSelector('h2, h3, h4', 'color', '#BA1C21')).toBe(true);
});

// Test 16: grouped h2, h3, h4 margin-top
test('Your grouped h2, h3, h4 selector should have a margin-top property set to 0', () => {
  expect(findGroupedSelector('h2, h3, h4', 'margin-top', '0')).toBe(true);
});

// Test 17: footer margin-top
test('Your footer selector should have a margin-top property set to 16px', () => {
  expect(findCSSRule('footer', 'margin-top', '16px')).toBe(true);
});

// Test 18: footer padding-top
test('Your footer selector should have a padding-top property set to 10px', () => {
  expect(findCSSRule('footer', 'padding-top', '10px')).toBe(true);
});

// Test 19: footer color
test('Your footer selector should have a color property set to #444444', () => {
  expect(findCSSRule('footer', 'color', '#444444')).toBe(true);
});

// Test 20: footer text-align
test('Your footer selector should have a text-align property set to center', () => {
  expect(findCSSRule('footer', 'text-align', 'center')).toBe(true);
});

// Test 21: address font-style
test('Your address selector should have a font-style property set to normal', () => {
  expect(findCSSRule('address', 'font-style', 'normal')).toBe(true);
});

// Test 22: address line-height
test('Your address selector should have a line-height property set to 1.4', () => {
  expect(findCSSRule('address', 'line-height', '1.4')).toBe(true);
});

// Test 23: sections and aside have class="panel"
test('Both section elements and the aside element should have class="panel"', () => {
  const sections = document.querySelectorAll('section');
  const aside = document.querySelector('aside');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  expect(aside).toBeTruthy();
  for (const section of sections) {
    expect(section.classList.contains('panel')).toBe(true);
  }
  expect(aside.classList.contains('panel')).toBe(true);
});

// Test 24: .panel background-color
test('Your .panel selector should have a background-color property set to #f7f7f7', () => {
  expect(findCSSRule('.panel', 'background-color', '#f7f7f7')).toBe(true);
});

// Test 25: .panel padding
test('Your .panel selector should have a padding property set to 12px', () => {
  expect(findCSSRule('.panel', 'padding', '12px')).toBe(true);
});

// Test 26: .panel margin-top
test('Your .panel selector should have a margin-top property set to 12px', () => {
  expect(findCSSRule('.panel', 'margin-top', '12px')).toBe(true);
});

// Test 27: aside has id="visit-campus"
test('The aside element should have id="visit-campus"', () => {
  const aside = document.querySelector('aside');
  expect(aside).toBeTruthy();
  expect(aside.id).toBe('visit-campus');
});

// Test 28: #visit-campus background-color
test('Your #visit-campus selector should have a background-color property set to #eef3f7', () => {
  expect(findCSSRule('#visit-campus', 'background-color', '#eef3f7')).toBe(true);
});

// Test 29: style element exists
test('Your HTML head element should contain a style element', () => {
  const style = document.querySelector('style');
  expect(style).toBeTruthy();
});

// Test 30: .tagline selector in style element
test('Inside your style element, you should have a .tagline selector with font-style set to italic', () => {
  const styles = document.querySelectorAll('style');
  let found = false;
  for (const style of styles) {
    const content = style.textContent || '';
    if (content.includes('.tagline') && content.includes('font-style') && content.includes('italic')) {
      found = true;
      break;
    }
  }
  expect(found).toBe(true);
});

// Test 31: p.tagline in header
test('The p element inside the header should have class="tagline"', () => {
  const header = document.querySelector('header');
  expect(header).toBeTruthy();
  const tagline = header.querySelector('p.tagline');
  expect(tagline).toBeTruthy();
});

// Test 32: span with inline style in tagline
test('Inside the tagline paragraph, the text "Active Life." should be wrapped in a span element with an inline style that sets color to #BA1C21', () => {
  const tagline = document.querySelector('header p.tagline');
  expect(tagline).toBeTruthy();
  const span = tagline.querySelector('span[style]');
  expect(span).toBeTruthy();
  expect(span.textContent).toContain('Active Life');
  const style = span.getAttribute('style').toLowerCase();
  expect(style).toContain('color');
  expect(style).toContain('#ba1c21');
});

// Test 33: header has id="page-header"
test('The header element should have id="page-header"', () => {
  const header = document.querySelector('header');
  expect(header).toBeTruthy();
  expect(header.id).toBe('page-header');
});

// Test 34: h1 has class="site-name"
test('The h1 element inside the header should have class="site-name"', () => {
  const h1 = document.querySelector('header h1');
  expect(h1).toBeTruthy();
  expect(h1.classList.contains('site-name')).toBe(true);
});

// Test 35: nav has id="main-menu"
test('The nav element should have id="main-menu"', () => {
  const nav = document.querySelector('nav');
  expect(nav).toBeTruthy();
  expect(nav.id).toBe('main-menu');
});
