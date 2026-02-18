// Helper: Get a CSS property value from a rule matching the exact selector
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

// Helper: Check if a CSS rule's property value contains a substring
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
          const target = substring.replace(/\s/g, '').toLowerCase();
          if (propValue.includes(target)) return true;
        }
      }
    } catch (e) {}
  }
  return false;
};

// Helper: Check if a value represents zero
const isZeroValue = (v) => !v || v === '0' || v === '0px';

// Helper: Get the gap value (handles shorthand decomposition)
const getGapValue = (selector) => {
  const gap = getCSSPropertyValue(selector, 'gap');
  if (gap) return gap;
  const rowGap = getCSSPropertyValue(selector, 'row-gap');
  if (rowGap && rowGap !== 'normal') return rowGap;
  const columnGap = getCSSPropertyValue(selector, 'column-gap');
  if (columnGap && columnGap !== 'normal') return columnGap;
  return null;
};

// ============================================
// Part 1: Flexbox Navigation
// ============================================

test('The nav should not contain pipe "|" separator characters', () => {
  const nav = document.querySelector('nav');
  if (!nav) {
    throw new Error('Could not find a <nav> element on the page.');
  }
  // Check text nodes that are direct children of nav for pipe characters
  const textNodes = Array.from(nav.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
  const hasPipes = textNodes.some(n => n.textContent.includes('|'));
  if (hasPipes) {
    throw new Error(
      'The <nav> still contains pipe "|" separator characters.\n\n' +
      'In Step 1, remove all the | characters between the links.\n' +
      'Keep the <a> elements — just delete the " | " text between them.\n' +
      'Flexbox will handle the spacing with the gap property.'
    );
  }
  expect(hasPipes).toBe(false);
});

test('The nav should have display set to flex', () => {
  const display = getCSSPropertyValue('nav', 'display');
  if (!display || display !== 'flex') {
    throw new Error(
      'The nav rule should have display: flex;\n\n' +
      'In Step 2, add display: flex; to the nav rule.\n' +
      'This turns the nav into a flex container, laying the links out in a row.'
    );
  }
  expect(display).toBe('flex');
});

test('The nav should have justify-content set to center', () => {
  const jc = getCSSPropertyValue('nav', 'justify-content');
  if (!jc || jc !== 'center') {
    throw new Error(
      'The nav rule should have justify-content: center;\n\n' +
      'In Step 2, add justify-content: center; to the nav rule.\n' +
      'This centers the group of links horizontally within the nav bar.'
    );
  }
  expect(jc).toBe('center');
});

test('The nav should have a gap property set', () => {
  const gap = getGapValue('nav');
  if (!gap) {
    throw new Error(
      'The nav rule should have a gap property.\n\n' +
      'In Step 2, add gap: 2rem; to the nav rule.\n' +
      'The gap property creates even spacing between each flex item (link).'
    );
  }
  expect(gap).toBeTruthy();
});

test('The nav should not use text-align for centering', () => {
  const textAlign = getCSSPropertyValue('nav', 'text-align');
  if (textAlign === 'center') {
    throw new Error(
      'The nav rule still has text-align: center;\n\n' +
      'In Step 2, remove text-align: center from the nav rule.\n' +
      'Flexbox uses justify-content for horizontal alignment,\n' +
      'so text-align is no longer needed.'
    );
  }
  expect(textAlign).not.toBe('center');
});

// ============================================
// Part 2: Sticky Navigation
// ============================================

test('The nav should have position set to sticky', () => {
  const position = getCSSPropertyValue('nav', 'position');
  if (!position || position !== 'sticky') {
    throw new Error(
      'The nav rule should have position: sticky;\n\n' +
      'In Step 3, add position: sticky; to the nav rule.\n' +
      'This keeps the nav pinned to the top of the viewport when the user scrolls past it.'
    );
  }
  expect(position).toBe('sticky');
});

test('The nav should have top set to 0', () => {
  const top = getCSSPropertyValue('nav', 'top');
  if (!top && top !== '0') {
    throw new Error(
      'The nav rule should have top: 0;\n\n' +
      'In Step 3, add top: 0; to the nav rule.\n' +
      'This tells the browser to stick the nav at the very top of the viewport.'
    );
  }
  const normalized = top ? top.trim() : '';
  if (normalized !== '0' && normalized !== '0px') {
    throw new Error(
      `The nav top is "${top}" but should be "0".\n\n` +
      'Set top: 0; so the nav sticks at the very top of the viewport.'
    );
  }
  expect(true).toBe(true);
});

test('The nav should have a z-index greater than 0', () => {
  const zIndex = getCSSPropertyValue('nav', 'z-index');
  if (!zIndex) {
    throw new Error(
      'The nav rule should have a z-index property.\n\n' +
      'In Step 4, add z-index: 10; to the nav rule.\n' +
      'This ensures the sticky nav appears above other page content as it scrolls beneath.'
    );
  }
  const zVal = parseInt(zIndex, 10);
  if (isNaN(zVal) || zVal <= 0) {
    throw new Error(
      `The nav z-index is "${zIndex}" but should be a positive number (like 10).\n\n` +
      'A positive z-index ensures the nav stacks above other content.'
    );
  }
  expect(zVal).toBeGreaterThan(0);
});

// ============================================
// Part 3: From Float to Flexbox
// ============================================

test('A div with class "colleges-content" should exist inside the #colleges section', () => {
  const colleges = document.querySelector('#colleges');
  if (!colleges) {
    throw new Error('Could not find the section with id="colleges".');
  }
  const wrapper = colleges.querySelector('div.colleges-content');
  if (!wrapper) {
    throw new Error(
      'No <div> with class="colleges-content" found inside #colleges.\n\n' +
      'In Step 5, wrap the <ul> and <figure> together inside a new\n' +
      '<div class="colleges-content">. The <h3> should stay outside this wrapper.'
    );
  }
  // Verify the wrapper contains both ul and figure
  const hasUl = wrapper.querySelector('ul');
  const hasFigure = wrapper.querySelector('figure');
  if (!hasUl || !hasFigure) {
    throw new Error(
      'The .colleges-content div exists but should contain both the <ul> and <figure>.\n\n' +
      'Make sure both the college list (<ul>) and the campus photo (<figure>)\n' +
      'are inside the <div class="colleges-content"> wrapper.'
    );
  }
  expect(wrapper).toBeTruthy();
});

test('The ul should come before the figure inside .colleges-content', () => {
  const wrapper = document.querySelector('#colleges .colleges-content');
  if (!wrapper) {
    throw new Error('First add the .colleges-content wrapper div (see previous test).');
  }
  const ul = wrapper.querySelector('ul');
  const figure = wrapper.querySelector('figure');
  if (!ul || !figure) {
    throw new Error('The .colleges-content div should contain both a <ul> and a <figure>.');
  }
  // compareDocumentPosition: if ul comes before figure, bit 4 (FOLLOWING) is set
  const position = ul.compareDocumentPosition(figure);
  if (!(position & Node.DOCUMENT_POSITION_FOLLOWING)) {
    throw new Error(
      'The <ul> should come BEFORE the <figure> inside .colleges-content.\n\n' +
      'In Step 6, move the <figure> to after the </ul>.\n' +
      'With Flexbox, putting the list first makes more sense for accessibility —\n' +
      'screen readers and keyboard users read the college list before the decorative photo.'
    );
  }
  expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

test('The .colleges-content rule should have display set to flex', () => {
  const display = getCSSPropertyValue('.colleges-content', 'display');
  if (!display || display !== 'flex') {
    throw new Error(
      'The .colleges-content rule should have display: flex;\n\n' +
      'In Step 7, add a new .colleges-content CSS rule with display: flex;\n' +
      'This creates a flex container, placing the list and figure side by side.'
    );
  }
  expect(display).toBe('flex');
});

test('The .colleges-content rule should have a gap property set', () => {
  const gap = getGapValue('.colleges-content');
  if (!gap) {
    throw new Error(
      'The .colleges-content rule should have a gap property.\n\n' +
      'In Step 7, add gap: 1.5rem; to the .colleges-content rule.\n' +
      'This adds spacing between the college list and the campus photo.'
    );
  }
  expect(gap).toBeTruthy();
});

test('The .colleges-content rule should have align-items set to flex-start', () => {
  const ai = getCSSPropertyValue('.colleges-content', 'align-items');
  if (!ai || ai !== 'flex-start') {
    throw new Error(
      'The .colleges-content rule should have align-items: flex-start;\n\n' +
      'In Step 7, add align-items: flex-start; to the .colleges-content rule.\n' +
      'This aligns both items to the top. Without it, flex items stretch to\n' +
      'fill the full height by default, which can distort the image.'
    );
  }
  expect(ai).toBe('flex-start');
});

test('The #colleges figure should not have a float property', () => {
  const float = getCSSPropertyValue('#colleges figure', 'float');
  if (float && float !== 'none') {
    throw new Error(
      `The #colleges figure still has float: ${float};\n\n` +
      'In Step 8, remove float: right; from the #colleges figure rule.\n' +
      'Flexbox handles the positioning now — float is no longer needed.'
    );
  }
  expect(!float || float === 'none').toBe(true);
});

test('The #colleges figure should not have an explicit width percentage', () => {
  const width = getCSSPropertyValue('#colleges figure', 'width');
  if (width && width !== 'auto' && width.includes('%')) {
    throw new Error(
      `The #colleges figure still has width: ${width};\n\n` +
      'In Step 8, remove width: 50%; from the #colleges figure rule.\n' +
      'Flexbox controls sizing through the flex property instead.'
    );
  }
  expect(!width || width === 'auto' || !width.includes('%')).toBe(true);
});

test('The #colleges figure should use flex for sizing', () => {
  // flex: 1 decomposes to flex-grow: 1 in the CSSOM
  const flexGrow = getCSSPropertyValue('#colleges figure', 'flex-grow');
  const flex = getCSSPropertyValue('#colleges figure', 'flex');

  // Check flex-grow directly (works when flex: 1 is decomposed by the browser)
  let hasFlexSize = flexGrow === '1';

  // Also check flex shorthand (in case the browser keeps it as shorthand)
  if (!hasFlexSize && flex) {
    const firstValue = flex.trim().split(/\s+/)[0];
    hasFlexSize = firstValue === '1';
  }

  if (!hasFlexSize) {
    throw new Error(
      'The #colleges figure should have flex: 1;\n\n' +
      'In Step 8, add flex: 1; to the #colleges figure rule.\n' +
      'This tells the figure to grow and fill available space equally\n' +
      'with other flex items in the container.'
    );
  }
  expect(hasFlexSize).toBe(true);
});

test('The #colleges figure margin should be 0', () => {
  // The starter has margin: 0 0 1rem 1rem — student should change to margin: 0
  const mb = getCSSPropertyValue('#colleges figure', 'margin-bottom');
  const ml = getCSSPropertyValue('#colleges figure', 'margin-left');
  if (!isZeroValue(mb)) {
    throw new Error(
      `The #colleges figure still has a non-zero margin-bottom (${mb}).\n\n` +
      'In Step 8, change margin to 0.\n' +
      'The float needed margins for spacing, but Flexbox\'s gap handles that now.'
    );
  }
  if (!isZeroValue(ml)) {
    throw new Error(
      `The #colleges figure still has a non-zero margin-left (${ml}).\n\n` +
      'In Step 8, change margin to 0.\n' +
      'The float needed margins for spacing, but Flexbox\'s gap handles that now.'
    );
  }
  expect(isZeroValue(mb) && isZeroValue(ml)).toBe(true);
});

test('The #apply rule should not have a clear property', () => {
  const clear = getCSSPropertyValue('#apply', 'clear');
  if (clear && clear !== 'none') {
    throw new Error(
      `The #apply rule still has clear: ${clear};\n\n` +
      'In Step 9, delete the entire #apply rule that has clear: both;\n' +
      'The clear property was only needed because of the float.\n' +
      'Since you replaced float with Flexbox, there is nothing to clear.'
    );
  }
  expect(!clear || clear === 'none').toBe(true);
});

// ============================================
// Part 4: Positioned Figcaption Overlay
// ============================================

test('The #colleges figure should have position set to relative', () => {
  const position = getCSSPropertyValue('#colleges figure', 'position');
  if (!position || position !== 'relative') {
    throw new Error(
      'The #colleges figure should have position: relative;\n\n' +
      'In Step 10, add position: relative; to the #colleges figure rule.\n' +
      'This establishes the figure as the positioning context for the\n' +
      'absolutely-positioned figcaption overlay.'
    );
  }
  expect(position).toBe('relative');
});

test('The #colleges figcaption should have position set to absolute', () => {
  const position = getCSSPropertyValue('#colleges figcaption', 'position');
  if (!position || position !== 'absolute') {
    throw new Error(
      'The #colleges figcaption should have position: absolute;\n\n' +
      'In Step 11, set position: absolute; on the #colleges figcaption rule.\n' +
      'This removes the figcaption from normal flow and lets you\n' +
      'position it precisely within the figure.'
    );
  }
  expect(position).toBe('absolute');
});

test('The #colleges figcaption should be pinned to the bottom of the figure', () => {
  const bottom = getCSSPropertyValue('#colleges figcaption', 'bottom');
  const left = getCSSPropertyValue('#colleges figcaption', 'left');
  const right = getCSSPropertyValue('#colleges figcaption', 'right');

  if (!isZeroValue(bottom) && bottom !== '0') {
    throw new Error(
      'The #colleges figcaption should have bottom: 0;\n\n' +
      'In Step 11, add bottom: 0; to pin the figcaption to the bottom edge of the figure.'
    );
  }

  // Check bottom is explicitly 0 (not null/missing)
  if (bottom === null || bottom === undefined) {
    throw new Error(
      'The #colleges figcaption is missing the bottom property.\n\n' +
      'In Step 11, add bottom: 0; to pin the figcaption to the bottom of the figure.'
    );
  }

  if (left === null || left === undefined) {
    throw new Error(
      'The #colleges figcaption is missing the left property.\n\n' +
      'In Step 11, add left: 0; to stretch the figcaption to the left edge.'
    );
  }

  if (right === null || right === undefined) {
    throw new Error(
      'The #colleges figcaption is missing the right property.\n\n' +
      'In Step 11, add right: 0; to stretch the figcaption to the right edge.\n' +
      'Combined with left: 0, this makes the overlay span the full width.'
    );
  }

  expect(true).toBe(true);
});

test('The #colleges figcaption should have an rgba background-color', () => {
  const bgColor = getCSSPropertyValue('#colleges figcaption', 'background-color');
  const bg = getCSSPropertyValue('#colleges figcaption', 'background');
  const hasRgba = (bgColor && bgColor.includes('rgba')) || (bg && bg.includes('rgba'));
  if (!hasRgba) {
    throw new Error(
      'The #colleges figcaption should have a background-color using rgba().\n\n' +
      'In Step 11, set background-color: rgba(0, 0, 0, 0.6);\n' +
      'The rgba() function creates a semi-transparent black overlay\n' +
      '(60% opaque) so the photo shows through behind the text.'
    );
  }
  expect(hasRgba).toBe(true);
});

test('The #colleges figcaption should have white text color', () => {
  const color = getCSSPropertyValue('#colleges figcaption', 'color');
  if (!color) {
    throw new Error(
      'The #colleges figcaption is missing a color property.\n\n' +
      'In Step 11, set color: var(--ut-white); for white text\n' +
      'on the dark semi-transparent overlay.'
    );
  }
  // Accept var(--ut-white), white, #ffffff, #fff, rgb(255,255,255)
  const normalized = color.trim().toLowerCase();
  const isWhite =
    normalized.includes('--ut-white') ||
    normalized === 'white' ||
    normalized === '#ffffff' ||
    normalized === '#fff' ||
    normalized.includes('rgb(255');
  // Also check it's NOT the old gray color
  const isOldGray = normalized.includes('rgb(68') || normalized === '#444444' || normalized === '#444';

  if (isOldGray) {
    throw new Error(
      'The #colleges figcaption still has the old gray text color.\n\n' +
      'In Step 11, change color to var(--ut-white) so the text is readable\n' +
      'against the dark rgba overlay.'
    );
  }

  if (!isWhite) {
    throw new Error(
      `The #colleges figcaption color is "${color}" but should be white.\n\n` +
      'In Step 11, set color: var(--ut-white); for white text on the overlay.'
    );
  }
  expect(isWhite).toBe(true);
});
