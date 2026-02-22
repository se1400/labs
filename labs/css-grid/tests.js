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

// Helper: Find a CSS property on a selector that may appear in a grouped rule.
// e.g., findCSSProperty('header', 'grid-column') finds it even if the rule is
// "header, nav, #welcome, footer { grid-column: 1 / -1; }"
const findCSSProperty = (selector, property) => {
  const trimmed = selector.trim();
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (!rule.selectorText) continue;
        const ruleSelectors = rule.selectorText.split(',').map(s => s.trim());
        if (ruleSelectors.includes(trimmed)) {
          const value = rule.style.getPropertyValue(property).trim();
          if (value) return value;
        }
      }
    } catch (e) {}
  }
  return null;
};

// Helper: Get gap value (handles shorthand decomposition)
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
// Part 1: Body as Grid Container
// ============================================

test('The body should have display set to grid', () => {
  const display = getCSSPropertyValue('body', 'display');
  if (!display || display !== 'grid') {
    throw new Error(
      'The body rule should have display: grid;\n\n' +
      'In Step 1, add display: grid; to the body rule.\n' +
      'This makes body a grid container so all direct children\n' +
      '(header, nav, hero, main, aside, footer) become grid items.'
    );
  }
  expect(display).toBe('grid');
});

test('The body grid-template-columns should define a 4-column layout with minmax and a fixed sidebar', () => {
  const cols = getCSSPropertyValue('body', 'grid-template-columns');
  if (!cols) {
    throw new Error(
      'The body rule is missing a grid-template-columns property.\n\n' +
      'In Step 1, add grid-template-columns: 1fr minmax(0, 640px) 280px 1fr;\n' +
      'This creates 4 columns: two flexible gutters, a content area, and a sidebar.'
    );
  }
  const normalized = cols.replace(/\s/g, '').toLowerCase();
  if (!normalized.includes('minmax(0,640px)') && !normalized.includes('minmax(0px,640px)')) {
    throw new Error(
      `The body grid-template-columns is "${cols}" but should include minmax(0, 640px).\n\n` +
      'In Step 1, set grid-template-columns: 1fr minmax(0, 640px) 280px 1fr;\n' +
      'The minmax(0, 640px) column holds the main content, growing up to 640px wide.'
    );
  }
  if (!normalized.includes('280px')) {
    throw new Error(
      `The body grid-template-columns is "${cols}" but should include 280px.\n\n` +
      'In Step 1, set grid-template-columns: 1fr minmax(0, 640px) 280px 1fr;\n' +
      'The 280px column is the fixed-width sidebar.'
    );
  }
  const frCount = (cols.match(/\b1fr\b/gi) || []).length;
  if (frCount < 2) {
    throw new Error(
      `The body grid-template-columns is "${cols}" but should have two 1fr gutter columns.\n\n` +
      'In Step 1, use: grid-template-columns: 1fr minmax(0, 640px) 280px 1fr;\n' +
      'The two 1fr columns on either side create flexible gutters that center the content.'
    );
  }
  expect(true).toBe(true);
});

test('The body should have a column-gap set', () => {
  const gap = getCSSPropertyValue('body', 'column-gap');
  if (!gap) {
    throw new Error(
      'The body rule is missing a column-gap property.\n\n' +
      'In Step 1, add column-gap: 1.5rem; to the body rule.\n' +
      'This adds horizontal space between the grid columns.'
    );
  }
  expect(gap).toBeTruthy();
});

// ============================================
// Part 2: Full-Width Elements
// ============================================

test('header should span all four columns using a negative line number', () => {
  const value = findCSSProperty('header', 'grid-column');
  const valueNorm = (value || '').replace(/\s/g, '');
  if (!value || !valueNorm.startsWith('1') || !valueNorm.includes('-1')) {
    throw new Error(
      'The header should have grid-column: 1 / -1;\n\n' +
      'In Step 2, add a rule with selector "header, nav, #welcome, footer"\n' +
      'and set grid-column: 1 / -1;\n' +
      'The value must start at line 1 and end at the last line (-1) to span the full width.'
    );
  }
  expect(true).toBe(true);
});

test('nav should span all four columns using a negative line number', () => {
  const value = findCSSProperty('nav', 'grid-column');
  const valueNorm = (value || '').replace(/\s/g, '');
  if (!value || !valueNorm.startsWith('1') || !valueNorm.includes('-1')) {
    throw new Error(
      'The nav should have grid-column: 1 / -1;\n\n' +
      'In Step 2, include "nav" in the selector "header, nav, #welcome, footer"\n' +
      'and set grid-column: 1 / -1;\n' +
      'The value must start at line 1 and end at the last line (-1) to span the full width.'
    );
  }
  expect(true).toBe(true);
});

test('#welcome should span all four columns using a negative line number', () => {
  const value = findCSSProperty('#welcome', 'grid-column');
  const valueNorm = (value || '').replace(/\s/g, '');
  if (!value || !valueNorm.startsWith('1') || !valueNorm.includes('-1')) {
    throw new Error(
      'The #welcome section should have grid-column: 1 / -1;\n\n' +
      'In Step 2, include "#welcome" in the selector "header, nav, #welcome, footer"\n' +
      'and set grid-column: 1 / -1;\n' +
      'The value must start at line 1 and end at the last line (-1) so the background image fills the page.'
    );
  }
  expect(true).toBe(true);
});

test('footer should span all four columns using a negative line number', () => {
  const value = findCSSProperty('footer', 'grid-column');
  const valueNorm = (value || '').replace(/\s/g, '');
  if (!value || !valueNorm.startsWith('1') || !valueNorm.includes('-1')) {
    throw new Error(
      'The footer should have grid-column: 1 / -1;\n\n' +
      'In Step 2, include "footer" in the selector "header, nav, #welcome, footer"\n' +
      'and set grid-column: 1 / -1;\n' +
      'The value must start at line 1 and end at the last line (-1) to span the full width.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 3: Placing Main and Sidebar
// ============================================

test('main should have grid-column set to 2', () => {
  const value = findCSSProperty('main', 'grid-column') || findCSSProperty('main', 'grid-column-start');
  const valueNorm = (value || '').replace(/\s/g, '');
  if (!value || !valueNorm.startsWith('2') || valueNorm.includes('-1')) {
    throw new Error(
      'The main rule should have grid-column: 2;\n\n' +
      'In Step 3, find the main rule and add grid-column: 2;\n' +
      'This places main in the second column (the 640px content area).\n' +
      'Do not use -1 here — that would stretch main across columns it should not occupy.'
    );
  }
  expect(true).toBe(true);
});

test('main should have grid-row set to 4', () => {
  const value = findCSSProperty('main', 'grid-row') || findCSSProperty('main', 'grid-row-start');
  if (!value || !value.trim().startsWith('4')) {
    throw new Error(
      'The main rule should have grid-row: 4;\n\n' +
      'In Step 3, add grid-row: 4; to the main rule.\n' +
      'This explicitly anchors main to row 4 of the body grid,\n' +
      'the same row as the sidebar, so they sit side by side.'
    );
  }
  expect(true).toBe(true);
});

test('.sidebar should have grid-column set to 3', () => {
  const value = findCSSProperty('.sidebar', 'grid-column') || findCSSProperty('.sidebar', 'grid-column-start');
  const valueNorm = (value || '').replace(/\s/g, '');
  if (!value || !valueNorm.startsWith('3') || valueNorm.includes('-1')) {
    throw new Error(
      'The .sidebar rule should have grid-column: 3;\n\n' +
      'In Step 4, find the .sidebar rule and add grid-column: 3;\n' +
      'This places the sidebar in the third column.\n' +
      'Do not use -1 here — that would stretch the sidebar beyond its column.'
    );
  }
  expect(true).toBe(true);
});

test('.sidebar should have grid-row set to 4', () => {
  const value = findCSSProperty('.sidebar', 'grid-row') || findCSSProperty('.sidebar', 'grid-row-start');
  if (!value || !value.trim().startsWith('4')) {
    throw new Error(
      'The .sidebar rule should have grid-row: 4;\n\n' +
      'In Step 4, add grid-row: 4; to the .sidebar rule.\n' +
      'This places the sidebar in row 4, the same row as main,\n' +
      'so they appear side by side instead of stacking.'
    );
  }
  expect(true).toBe(true);
});

test('.sidebar should have align-self set to start', () => {
  const value = findCSSProperty('.sidebar', 'align-self');
  if (!value || value !== 'start') {
    throw new Error(
      'The .sidebar rule should have align-self: start;\n\n' +
      'In Step 4, add align-self: start; to the .sidebar rule.\n' +
      'Without this, the sidebar stretches to fill the full row height,\n' +
      'matching main\'s height even when the sidebar has less content.'
    );
  }
  expect(value).toBe('start');
});

// ============================================
// Part 4: Hero Section with Subgrid
// ============================================

test('#welcome should have display set to grid', () => {
  const display = getCSSPropertyValue('#welcome', 'display');
  if (!display || display !== 'grid') {
    throw new Error(
      'The #welcome rule should have display: grid;\n\n' +
      'In Step 5, find the #welcome rule and add display: grid;\n' +
      'This makes the hero section a grid container so it can use subgrid\n' +
      'to pass the body\'s columns down to its children.'
    );
  }
  expect(display).toBe('grid');
});

test('#welcome should use subgrid for its columns', () => {
  const cols = getCSSPropertyValue('#welcome', 'grid-template-columns');
  if (!cols || !cols.includes('subgrid')) {
    throw new Error(
      'The #welcome rule should have grid-template-columns: subgrid;\n\n' +
      'In Step 5, add grid-template-columns: subgrid; to the #welcome rule.\n' +
      'subgrid inherits the 4 column tracks from the body grid so that\n' +
      'nested elements can align to the same columns as the rest of the page.'
    );
  }
  expect(cols).toContain('subgrid');
});

test('.hero-overlay should span all columns (grid-column: 1 / -1)', () => {
  const value = getCSSPropertyValue('.hero-overlay', 'grid-column');
  const valueNorm = (value || '').replace(/\s/g, '');
  if (!value || !valueNorm.startsWith('1') || !valueNorm.includes('-1')) {
    throw new Error(
      'The .hero-overlay rule should have grid-column: 1 / -1;\n\n' +
      'In Step 6, add grid-column: 1 / -1; to the .hero-overlay rule.\n' +
      'The value must start at line 1 and end at -1 so the blue overlay covers the full width.'
    );
  }
  expect(true).toBe(true);
});

test('.hero-overlay should have display set to grid', () => {
  const display = getCSSPropertyValue('.hero-overlay', 'display');
  if (!display || display !== 'grid') {
    throw new Error(
      'The .hero-overlay rule should have display: grid;\n\n' +
      'In Step 6, add display: grid; to the .hero-overlay rule.\n' +
      'This makes the overlay a grid container so its child (.hero-content)\n' +
      'can be placed in specific columns using the inherited subgrid tracks.'
    );
  }
  expect(display).toBe('grid');
});

test('.hero-overlay should use subgrid for its columns', () => {
  const cols = getCSSPropertyValue('.hero-overlay', 'grid-template-columns');
  if (!cols || !cols.includes('subgrid')) {
    throw new Error(
      'The .hero-overlay rule should have grid-template-columns: subgrid;\n\n' +
      'In Step 6, add grid-template-columns: subgrid; to the .hero-overlay rule.\n' +
      'This passes the body\'s 4 column tracks through to .hero-content\n' +
      'so the text can be centered in the same columns as the main content.'
    );
  }
  expect(cols).toContain('subgrid');
});

test('.hero-content should span columns 2 through 4', () => {
  const value = getCSSPropertyValue('.hero-content', 'grid-column');
  const valueNorm = (value || '').replace(/\s/g, '');
  if (!value || !valueNorm.startsWith('2/') || !valueNorm.endsWith('4')) {
    throw new Error(
      'The .hero-content rule should have grid-column: 2 / 4;\n\n' +
      'In Step 7, add grid-column: 2 / 4; to the .hero-content rule.\n' +
      'This places the hero text in columns 2 and 3, centering it within\n' +
      'the full-width blue overlay.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 5: Programs Grid
// ============================================

test('A div with class "programs-grid" should exist inside #colleges', () => {
  const colleges = document.querySelector('#colleges');
  if (!colleges) {
    throw new Error('Could not find the section with id="colleges".');
  }
  const grid = colleges.querySelector('div.programs-grid');
  if (!grid) {
    throw new Error(
      'No <div> with class="programs-grid" found inside #colleges.\n\n' +
      'In Step 8, wrap the <figure> and all six <div class="program-card"> elements\n' +
      'inside a new <div class="programs-grid">.\n' +
      'The <h3>Our Colleges</h3> heading should stay outside the wrapper.'
    );
  }
  const hasFigure = grid.querySelector('figure');
  const cardCount = grid.querySelectorAll('.program-card').length;
  if (!hasFigure) {
    throw new Error(
      'The .programs-grid wrapper should contain the campus <figure>.\n\n' +
      'Make sure the <figure> (campus photo) is inside the <div class="programs-grid">.'
    );
  }
  if (cardCount === 0) {
    throw new Error(
      'The .programs-grid wrapper should contain the program-card divs.\n\n' +
      'Make sure all six <div class="program-card"> elements are inside <div class="programs-grid">.'
    );
  }
  expect(grid).toBeTruthy();
});

test('.programs-grid should have display set to grid', () => {
  const display = getCSSPropertyValue('.programs-grid', 'display');
  if (!display || display !== 'grid') {
    throw new Error(
      'The .programs-grid rule should have display: grid;\n\n' +
      'In Step 9, add a new .programs-grid CSS rule with display: grid;\n' +
      'This makes the programs area a grid container for the campus photo and college cards.'
    );
  }
  expect(display).toBe('grid');
});

test('.programs-grid should use repeat(auto-fit, minmax()) for its columns', () => {
  const cols = getCSSPropertyValue('.programs-grid', 'grid-template-columns');
  if (!cols) {
    throw new Error(
      'The .programs-grid rule is missing a grid-template-columns property.\n\n' +
      'In Step 9, add grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n' +
      'This creates a responsive grid that automatically adds or removes columns as space allows.'
    );
  }
  const normalized = cols.replace(/\s/g, '').toLowerCase();
  if (!normalized.includes('auto-fit')) {
    throw new Error(
      `The .programs-grid grid-template-columns is "${cols}" but should use auto-fit.\n\n` +
      'In Step 9, use: grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n' +
      'auto-fit creates as many columns as fit in the available space.'
    );
  }
  if (!normalized.includes('minmax')) {
    throw new Error(
      `The .programs-grid grid-template-columns is "${cols}" but should use minmax().\n\n` +
      'In Step 9, use: grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n' +
      'minmax(180px, 1fr) ensures each column is at least 180px wide.'
    );
  }
  expect(true).toBe(true);
});

test('.programs-grid should have a gap set', () => {
  const gap = getGapValue('.programs-grid');
  if (!gap) {
    throw new Error(
      'The .programs-grid rule should have a gap property.\n\n' +
      'In Step 9, add gap: 1rem; to the .programs-grid rule.\n' +
      'This adds consistent spacing between the campus photo and the college cards.'
    );
  }
  expect(gap).toBeTruthy();
});

// ============================================
// Part 6: Spanning Across the Grid
// ============================================

test('#colleges figure should span the full width of the programs grid (grid-column: 1 / -1)', () => {
  const value = getCSSPropertyValue('#colleges figure', 'grid-column');
  const valueNorm = (value || '').replace(/\s/g, '');
  if (!value || !valueNorm.startsWith('1') || !valueNorm.includes('-1')) {
    throw new Error(
      'The #colleges figure should have grid-column: 1 / -1;\n\n' +
      'In Step 10, add grid-column: 1 / -1; to the #colleges figure rule.\n' +
      'The value must start at line 1 and end at -1 so the campus photo spans\n' +
      'the full width of the programs grid as a banner above the college cards.'
    );
  }
  expect(true).toBe(true);
});

test('.featured should have grid-column set to span 2', () => {
  const value = getCSSPropertyValue('.featured', 'grid-column');
  const valueNorm = (value || '').replace(/\s/g, '').toLowerCase();
  if (!value || !valueNorm.includes('span2')) {
    throw new Error(
      'The .featured rule should have grid-column: span 2;\n\n' +
      'In Step 11, add a new .featured CSS rule with grid-column: span 2;\n' +
      'This makes the Science, Engineering & Technology card twice as wide as the others\n' +
      'without needing to know the exact column line numbers.'
    );
  }
  expect(true).toBe(true);
});
