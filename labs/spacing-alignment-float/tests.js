// Helper: Check if a CSS rule exists with specific selector and property/value
// Supports comma-separated selectors and handles hex-to-rgb normalization
const findCSSRule = (selector, property, value) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        const ruleSelectors = rule.selectorText ? rule.selectorText.split(',').map(s => s.trim()) : [];
        const targetSelectors = selector.split(',').map(s => s.trim());
        const selectorMatch = targetSelectors.length === ruleSelectors.length &&
          targetSelectors.every(s => ruleSelectors.includes(s)) &&
          ruleSelectors.every(s => targetSelectors.includes(s));
        if (rule.selectorText && selectorMatch) {
          const propValue = rule.style.getPropertyValue(property);
          if (value === undefined) {
            return propValue !== '';
          }
          const normalizedPropValue = propValue.replace(/\s/g, '').toLowerCase();
          const normalizedValue = String(value).replace(/\s/g, '').toLowerCase();
          if (normalizedPropValue === normalizedValue) return true;
          if ((normalizedValue === '0' || normalizedValue === '0px') &&
              (normalizedPropValue === '0' || normalizedPropValue === '0px')) return true;
        }
      }
    } catch (e) {}
  }
  return false;
};

// Helper: Check if a CSS rule's property value or cssText contains a substring
const findCSSRuleContains = (selector, property, substring) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        const ruleSelectors = rule.selectorText ? rule.selectorText.split(',').map(s => s.trim()) : [];
        const targetSelectors = selector.split(',').map(s => s.trim());
        const selectorMatch = targetSelectors.length === ruleSelectors.length &&
          targetSelectors.every(s => ruleSelectors.includes(s)) &&
          ruleSelectors.every(s => targetSelectors.includes(s));
        if (rule.selectorText && selectorMatch) {
          const propValue = rule.style.getPropertyValue(property).replace(/\s/g, '').toLowerCase();
          const cssText = rule.cssText.replace(/\s/g, '').toLowerCase();
          const target = substring.replace(/\s/g, '').toLowerCase();
          if (propValue.includes(target) || cssText.includes(target)) return true;
        }
      }
    } catch (e) {}
  }
  return false;
};

// Helper: Get a CSS property value for a selector (returns raw value)
const getCSSPropertyValue = (selector, property) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        const ruleSelectors = rule.selectorText ? rule.selectorText.split(',').map(s => s.trim()) : [];
        const targetSelectors = selector.split(',').map(s => s.trim());
        const selectorMatch = targetSelectors.length === ruleSelectors.length &&
          targetSelectors.every(s => ruleSelectors.includes(s)) &&
          ruleSelectors.every(s => targetSelectors.includes(s));
        if (rule.selectorText && selectorMatch) {
          const value = rule.style.getPropertyValue(property).trim();
          if (value) return value;
        }
      }
    } catch (e) {}
  }
  return null;
};

// Helper: Check if a selector exists in any CSS rule that contains a specific
// selector fragment (for *, *::before, *::after combined selectors)
const findCSSRuleByFragment = (fragment, property, value) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes(fragment)) {
          const propValue = rule.style.getPropertyValue(property).replace(/\s/g, '').toLowerCase();
          const normalizedValue = String(value).replace(/\s/g, '').toLowerCase();
          if (propValue === normalizedValue) return rule.selectorText;
        }
      }
    } catch (e) {}
  }
  return null;
};

// ============================================
// Part 1: The Box Model & box-sizing
// ============================================

test('A universal rule should set box-sizing to border-box', () => {
  const matched = findCSSRuleByFragment('*', 'box-sizing', 'border-box');
  if (!matched) {
    throw new Error(
      'Missing universal box-sizing rule.\n\n' +
      'Add a rule that targets *, *::before, *::after and sets\n' +
      'box-sizing: border-box;\n\n' +
      'This makes padding and border included in element widths\n' +
      'instead of being added on top.'
    );
  }
  expect(matched).toBeTruthy();
});

test('The box-sizing rule should also target ::before and ::after pseudo-elements', () => {
  const matched = findCSSRuleByFragment('*', 'box-sizing', 'border-box');
  if (!matched) {
    throw new Error(
      'First add the universal box-sizing rule (see previous test).'
    );
  }
  const selector = matched.toLowerCase().replace(/\s/g, '');
  if (!selector.includes('::before') || !selector.includes('::after')) {
    throw new Error(
      `Your box-sizing rule targets "${matched}" but should also include *::before and *::after.\n\n` +
      'The full selector should be: *, *::before, *::after\n' +
      'This ensures pseudo-elements also use border-box sizing.'
    );
  }
  expect(selector).toContain('::before');
  expect(selector).toContain('::after');
});

// ============================================
// Part 2: Centering with Auto Margins
// ============================================

test('The main element should contain a div with class "container"', () => {
  const main = document.querySelector('main');
  if (!main) {
    throw new Error('Could not find a <main> element on the page.');
  }
  const container = main.querySelector('div.container');
  if (!container) {
    throw new Error(
      'No <div> with class="container" found inside <main>.\n\n' +
      'After the #welcome section\'s closing </section> tag, wrap the remaining\n' +
      'content (colleges, apply, tuition, visit) in a <div class="container">.\n' +
      'The hero section stays outside so its background spans full width.'
    );
  }
  expect(container).toBeTruthy();
});

test('The .hero-overlay should contain a div with class "container"', () => {
  const heroOverlay = document.querySelector('.hero-overlay');
  if (!heroOverlay) {
    throw new Error('Could not find a <div> with class="hero-overlay" on the page.');
  }
  const container = heroOverlay.querySelector('div.container');
  if (!container) {
    throw new Error(
      'No <div> with class="container" found inside .hero-overlay.\n\n' +
      'Inside the .hero-overlay div, wrap all existing content\n' +
      '(h2, paragraphs, video) in a <div class="container">.\n' +
      'This centers the hero text while the background spans full width.'
    );
  }
  expect(container).toBeTruthy();
});

test('The .container rule should have a max-width set', () => {
  const value = getCSSPropertyValue('.container', 'max-width');
  if (!value) {
    throw new Error(
      'Missing max-width on the .container rule.\n\n' +
      'Add a .container rule with max-width: 960px;\n' +
      'This limits how wide the content can get on large screens.'
    );
  }
  expect(value).toBeTruthy();
});

test('The .container rule should use margin auto for centering', () => {
  if (!findCSSRuleContains('.container', 'margin', 'auto')) {
    // Also check margin-left and margin-right individually
    const ml = getCSSPropertyValue('.container', 'margin-left');
    const mr = getCSSPropertyValue('.container', 'margin-right');
    if (!(ml === 'auto' && mr === 'auto')) {
      throw new Error(
        'Missing auto margins on the .container rule.\n\n' +
        'Add margin: 0 auto; to the .container rule.\n' +
        'When left and right margins are both "auto", the browser centers\n' +
        'the element by splitting the remaining space equally on both sides.'
      );
    }
  }
  expect(true).toBe(true);
});

// ============================================
// Part 3: Margin Shorthand
// ============================================

test('The .panel rule should have margin-bottom set', () => {
  // Check for margin-bottom directly or in the margin shorthand
  const mb = getCSSPropertyValue('.panel', 'margin-bottom');
  if (!mb || mb === '0' || mb === '0px') {
    throw new Error(
      'Missing margin-bottom on the .panel rule.\n\n' +
      'Add margin-bottom: 1.5rem; to the .panel rule.\n' +
      'This creates consistent vertical spacing between each section.'
    );
  }
  expect(mb).toBeTruthy();
});

test('The .panel margin-bottom should use rem units', () => {
  const mb = getCSSPropertyValue('.panel', 'margin-bottom');
  if (!mb || !mb.includes('rem')) {
    throw new Error(
      'The .panel margin-bottom should use rem units.\n\n' +
      'Set margin-bottom to 1.5rem instead of a pixel value.\n' +
      'rem units scale with the user\'s font size for better accessibility.'
    );
  }
  expect(mb).toContain('rem');
});

test('The #colleges figure margin should use shorthand (not 4 separate values of the old style)', () => {
  const margin = getCSSPropertyValue('#colleges figure', 'margin');
  // The old value was "16px 0 0 0" or "16px 0px 0px 0px"
  // New value should be different — either 3-value shorthand or changed values
  if (!margin) {
    throw new Error(
      'Could not find a margin on the #colleges figure rule.\n\n' +
      'Change the margin from 16px 0 0 0 to the 3-value shorthand: 1rem 0 0'
    );
  }
  const normalized = margin.replace(/\s+/g, ' ').trim().toLowerCase();
  // Check it's not the old 4-value "16px 0 0 0" or "16px 0px 0px 0px"
  if (normalized === '16px 0 0 0' || normalized === '16px 0px 0px 0px' || normalized === '16px 0px 0px') {
    throw new Error(
      'The #colleges figure still has the old margin value.\n\n' +
      'Change margin from 16px 0 0 0 to 1rem 0 0 (3-value shorthand with rem).\n' +
      '3-value shorthand: top, left/right, bottom.'
    );
  }
  expect(true).toBe(true);
});

test('The #colleges figure margin should use rem units', () => {
  const margin = getCSSPropertyValue('#colleges figure', 'margin');
  if (!margin) {
    throw new Error('Could not find a margin on the #colleges figure rule.');
  }
  if (!margin.includes('rem')) {
    throw new Error(
      'The #colleges figure margin should use rem units.\n\n' +
      'Convert the margin values from px to rem.\n' +
      'Quick reference: 16px = 1rem, 8px = 0.5rem'
    );
  }
  expect(margin).toContain('rem');
});

// ============================================
// Part 4: Padding Shorthand
// ============================================

test('The nav padding should use 2-value shorthand', () => {
  const padding = getCSSPropertyValue('nav', 'padding');
  if (!padding) {
    throw new Error(
      'Could not find padding on the nav rule.\n\n' +
      'Change the nav padding from 10px to 0.75rem 1.5rem (2-value shorthand).'
    );
  }
  // 2-value shorthand should have a space (two distinct values)
  const parts = padding.trim().split(/\s+/);
  if (parts.length < 2) {
    throw new Error(
      'The nav padding should use 2-value shorthand.\n\n' +
      'Change padding from a single value to two values: 0.75rem 1.5rem\n' +
      'The first value sets top/bottom, the second sets left/right.'
    );
  }
  expect(parts.length).toBeGreaterThanOrEqual(2);
});

test('The nav padding should use rem units', () => {
  const padding = getCSSPropertyValue('nav', 'padding');
  if (!padding || !padding.includes('rem')) {
    throw new Error(
      'The nav padding should use rem units.\n\n' +
      'Set padding to 0.75rem 1.5rem instead of pixel values.'
    );
  }
  expect(padding).toContain('rem');
});

test('The th, td padding should use rem units', () => {
  const padding = getCSSPropertyValue('th, td', 'padding') ||
                  getCSSPropertyValue('th,td', 'padding') ||
                  getCSSPropertyValue('td, th', 'padding');
  if (!padding || !padding.includes('rem')) {
    throw new Error(
      'The th, td padding should use rem units.\n\n' +
      'Change the th, td padding from 8px to 0.5rem 0.75rem.\n' +
      'This gives table cells more horizontal breathing room.'
    );
  }
  expect(padding).toContain('rem');
});

// ============================================
// Part 5: Converting to rem Units
// ============================================

test('The header padding should use rem units', () => {
  const padding = getCSSPropertyValue('header', 'padding');
  if (!padding || !padding.includes('rem')) {
    throw new Error(
      'The header padding should use rem units.\n\n' +
      'Change the header padding from 16px to 1rem.\n' +
      'Quick reference: 16px = 1rem (at the default font size).'
    );
  }
  expect(padding).toContain('rem');
});

test('The footer padding should use rem units', () => {
  const padding = getCSSPropertyValue('footer', 'padding');
  if (!padding || !padding.includes('rem')) {
    throw new Error(
      'The footer padding should use rem units.\n\n' +
      'Change the footer padding from 16px to 1rem.'
    );
  }
  expect(padding).toContain('rem');
});

test('The .panel padding should use rem units', () => {
  const padding = getCSSPropertyValue('.panel', 'padding');
  if (!padding || !padding.includes('rem')) {
    throw new Error(
      'The .panel padding should use rem units.\n\n' +
      'Change the .panel padding from 16px 24px to 1rem 1.5rem.'
    );
  }
  expect(padding).toContain('rem');
});

test('The .hero-overlay padding should use rem units', () => {
  const padding = getCSSPropertyValue('.hero-overlay', 'padding');
  if (!padding || !padding.includes('rem')) {
    throw new Error(
      'The .hero-overlay padding should use rem units.\n\n' +
      'Change the .hero-overlay padding from 32px 24px to 2rem 0.\n' +
      'The horizontal padding is 0 because the .container inside handles it.'
    );
  }
  expect(padding).toContain('rem');
});

// ============================================
// Part 6: Float & Clear
// ============================================

test('The #colleges figure should appear before the #colleges ul in the HTML', () => {
  const colleges = document.querySelector('#colleges');
  if (!colleges) {
    throw new Error('Could not find the section with id="colleges".');
  }
  const figure = colleges.querySelector('figure');
  const ul = colleges.querySelector('ul');
  if (!figure) {
    throw new Error('No <figure> element found in the #colleges section.');
  }
  if (!ul) {
    throw new Error('No <ul> element found in the #colleges section.');
  }
  // compareDocumentPosition: if figure comes before ul, bit 4 (FOLLOWING) is set
  const position = figure.compareDocumentPosition(ul);
  if (!(position & Node.DOCUMENT_POSITION_FOLLOWING)) {
    throw new Error(
      'The <figure> should come BEFORE the <ul> in the #colleges section.\n\n' +
      'Move the entire <figure> element (with its <picture> and <figcaption>)\n' +
      'to between the <h3> and the <ul>.\n\n' +
      'Float elements must come before the content that wraps around them.'
    );
  }
  expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

test('The #colleges figure should be floated right', () => {
  const float = getCSSPropertyValue('#colleges figure', 'float');
  if (!float || float === 'none') {
    throw new Error(
      'The #colleges figure should be floated right.\n\n' +
      'Add float: right; to the #colleges figure rule.\n' +
      'This pushes the figure to the right side so the college list wraps around it.'
    );
  }
  if (float !== 'right') {
    throw new Error(
      `The #colleges figure float is "${float}" but should be "right".\n\n` +
      'Set float: right; so the image appears on the right with text wrapping on the left.'
    );
  }
  expect(float).toBe('right');
});

test('The #colleges figure should have width set to 50%', () => {
  const width = getCSSPropertyValue('#colleges figure', 'width');
  if (!width) {
    throw new Error(
      'The #colleges figure should have a width set.\n\n' +
      'Add width: 50%; to the #colleges figure rule.\n' +
      'This constrains the figure to half the section width so text has room to wrap.'
    );
  }
  if (!width.includes('50')) {
    throw new Error(
      `The #colleges figure width is "${width}" but should be "50%".\n\n` +
      'Set width: 50%; so the college list has room to wrap beside the image.'
    );
  }
  expect(width).toContain('50');
});

test('The #colleges figure img should have width set to 100%', () => {
  const width = getCSSPropertyValue('#colleges figure img', 'width');
  if (!width || !width.includes('100')) {
    throw new Error(
      'The #colleges figure img should have width: 100%.\n\n' +
      'Add a #colleges figure img rule with width: 100%;\n' +
      'This ensures the image scales to fit within the floated figure.'
    );
  }
  expect(width).toContain('100');
});

test('The #colleges figure img should have height set to auto', () => {
  const height = getCSSPropertyValue('#colleges figure img', 'height');
  if (!height || height === '0' || height === '0px') {
    throw new Error(
      'The #colleges figure img should have height: auto.\n\n' +
      'Add height: auto; to the #colleges figure img rule.\n' +
      'This maintains the image\'s aspect ratio when the width scales.'
    );
  }
  if (height !== 'auto') {
    throw new Error(
      `The #colleges figure img height is "${height}" but should be "auto".`
    );
  }
  expect(height).toBe('auto');
});

test('The #colleges figure margin should use 4-value shorthand with rem', () => {
  const margin = getCSSPropertyValue('#colleges figure', 'margin');
  if (!margin) {
    throw new Error('Could not find a margin on the #colleges figure rule.');
  }
  // After float is added, margin should change to 4-value: 0 0 1rem 1rem
  if (!margin.includes('rem')) {
    throw new Error(
      'The #colleges figure margin should use rem units.\n\n' +
      'Set margin to 0 0 1rem 1rem (4-value shorthand):\n' +
      'top: 0, right: 0, bottom: 1rem (space below), left: 1rem (gap from text).'
    );
  }
  expect(margin).toContain('rem');
});

test('The #apply section should have a clear property', () => {
  const clear = getCSSPropertyValue('#apply', 'clear');
  if (!clear || clear === 'none') {
    throw new Error(
      'The #apply section should have a clear property.\n\n' +
      'Add a #apply rule with clear: both;\n' +
      'This prevents the apply section from wrapping up beside the floated image.'
    );
  }
  expect(clear).toBeTruthy();
});

test('The #apply clear value should be "both" or "right"', () => {
  const clear = getCSSPropertyValue('#apply', 'clear');
  if (!clear) {
    throw new Error('First add a clear property to #apply (see previous test).');
  }
  if (clear !== 'both' && clear !== 'right') {
    throw new Error(
      `The #apply clear is "${clear}" but should be "both" or "right".\n\n` +
      'Set clear: both; to prevent content from wrapping beside floated elements on either side.'
    );
  }
  expect(['both', 'right']).toContain(clear);
});
