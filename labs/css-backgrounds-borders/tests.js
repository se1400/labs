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

// Helper: Returns true if a CSS value string contains a comma at the top level
// (i.e., not inside any parentheses). Used to detect multi-layer backgrounds:
//   "linear-gradient(to bottom, #000, #fff), url(...)"  →  true  (top-level comma between layers)
//   "linear-gradient(to bottom, #000, #fff)"            →  false (commas only inside function)
const hasTopLevelComma = (str) => {
  let depth = 0;
  for (const ch of str) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ',' && depth === 0) return true;
  }
  return false;
};

// Helper: Find a CSS property on a selector that may appear in a grouped rule.
// e.g., findCSSProperty('header', 'background') finds it even if the rule is
// "header, nav { ... }"
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

// ============================================
// Part 1: Linear Gradient & Layered Backgrounds
// ============================================

test('The #welcome background shorthand should contain a linear-gradient', () => {
  // Only check the background shorthand — not background-image — so that the test
  // requires students to use the shorthand syntax as the instructions describe.
  const bg = getCSSPropertyValue('#welcome', 'background');
  if (!bg || !bg.includes('linear-gradient')) {
    throw new Error(
      'The #welcome rule should have a background shorthand containing linear-gradient(...).\n\n' +
      'In Step 1, replace the three separate background properties (background-image,\n' +
      'background-size, background-position) with a single background shorthand:\n' +
      'background: linear-gradient(to bottom, rgba(0, 48, 88, 0.3) 0%, rgba(0, 20, 60, 0.78) 100%),\n' +
      '            url("campus.jpg") center / cover no-repeat;\n' +
      'The gradient is the top layer — it goes first in the comma-separated list.'
    );
  }
  expect(true).toBe(true);
});

test('The #welcome background shorthand should include the campus photo URL', () => {
  // Only check the background shorthand — the starter already has campus.jpg in
  // background-image, so checking background-image as a fallback would pass before
  // the student writes anything.
  const bg = getCSSPropertyValue('#welcome', 'background');
  if (!bg || !bg.includes('campus.jpg')) {
    throw new Error(
      'The #welcome background shorthand should include the campus.jpg photo as a layer.\n\n' +
      'In Step 1, the background shorthand should include:\n' +
      'url("https://se1400.github.io/labs/assets/campus.jpg") center / cover no-repeat\n' +
      'as the second item in the comma-separated list (the bottom layer).'
    );
  }
  expect(true).toBe(true);
});

test('The #welcome background should use a comma to separate the gradient layer from the photo layer', () => {
  // Use hasTopLevelComma rather than bg.includes(',') — linear-gradient color stops
  // already contain commas inside the function, so any gradient value would pass
  // a naive includes(',') check even without a second layer.
  const bg = getCSSPropertyValue('#welcome', 'background');
  if (!bg || !hasTopLevelComma(bg)) {
    throw new Error(
      'The #welcome background should use two comma-separated layers.\n\n' +
      'In Step 1, the background shorthand should contain a top-level comma between\n' +
      'the gradient and the photo:\n' +
      'background: linear-gradient(...), url("campus.jpg") center / cover no-repeat;\n' +
      'The first item (before the comma) is the gradient overlay. The second is the photo.\n' +
      'CSS paints backgrounds in order — first listed means on top.'
    );
  }
  expect(true).toBe(true);
});

test('The .hero-overlay should not have a background-color (the gradient on #welcome handles the overlay)', () => {
  const bg = getCSSPropertyValue('.hero-overlay', 'background-color');
  if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
    throw new Error(
      `The .hero-overlay has background-color: ${bg}\n\n` +
      'In Step 2, remove the background-color from the .hero-overlay rule.\n' +
      'The linear-gradient on #welcome now provides the dark cinematic overlay.\n' +
      '.hero-overlay should be fully transparent so backdrop-filter can blur the\n' +
      'campus photo and gradient showing through from behind.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 2: backdrop-filter
// ============================================

test('The .hero-overlay should have a backdrop-filter with blur()', () => {
  const filter = getCSSPropertyValue('.hero-overlay', 'backdrop-filter') ||
                 getCSSPropertyValue('.hero-overlay', '-webkit-backdrop-filter');
  if (!filter || !filter.includes('blur')) {
    throw new Error(
      'The .hero-overlay rule should have backdrop-filter: blur(...);\n\n' +
      'In Step 3, add backdrop-filter: blur(3px); to the .hero-overlay rule.\n' +
      'Because .hero-overlay is now transparent, the campus photo shows through it.\n' +
      'backdrop-filter: blur() softens that photo while the text in .hero-content stays sharp.\n' +
      'Note: backdrop-filter only works when the element has a transparent or semi-transparent background.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 3: Gradient Text
// ============================================

test('The h1 rule should have a background with a linear-gradient', () => {
  // When background shorthand uses var() AND background-clip: text is also set,
  // Chrome stores the shorthand as a "pending-substitution value" — both
  // getPropertyValue('background') and getPropertyValue('background-image') return ''.
  // Using getComputedStyle on the actual element bypasses this entirely: vars are
  // resolved and background-image always reflects the correct computed value.
  const h1 = document.querySelector('h1');
  const bg = h1 ? window.getComputedStyle(h1).getPropertyValue('background-image') : '';
  if (!bg || bg === 'none' || !bg.includes('linear-gradient')) {
    throw new Error(
      'The h1 rule should have a background property containing linear-gradient(...).\n\n' +
      'In Step 4, add to the h1 rule:\n' +
      'background: linear-gradient(to right, var(--ut-navy), var(--ut-red));\n' +
      'This gradient will fill the text letterforms — but only after you also add\n' +
      'background-clip: text and color: transparent.'
    );
  }
  expect(true).toBe(true);
});

test('The h1 rule should have background-clip set to text', () => {
  const clip = getCSSPropertyValue('h1', 'background-clip');
  const webkitClip = getCSSPropertyValue('h1', '-webkit-background-clip');
  if ((!clip || clip !== 'text') && (!webkitClip || webkitClip !== 'text')) {
    throw new Error(
      'The h1 rule should have background-clip: text; and -webkit-background-clip: text;\n\n' +
      'In Step 4, add both lines to the h1 rule:\n' +
      '-webkit-background-clip: text;\n' +
      'background-clip: text;\n' +
      'These clip the gradient background to the exact shape of the text letterforms.\n' +
      'Without both, the gradient fills the element box rather than the letters.'
    );
  }
  expect(true).toBe(true);
});

test('The h1 rule should have color set to transparent', () => {
  const color = getCSSPropertyValue('h1', 'color');
  // Some browsers serialize `transparent` as `rgba(0, 0, 0, 0)` in the CSSOM.
  const isTransparent = color === 'transparent' || color === 'rgba(0, 0, 0, 0)';
  if (!isTransparent) {
    throw new Error(
      `The h1 color is "${color || 'not set'}" but should be transparent.\n\n` +
      'In Step 4, add color: transparent; to the h1 rule.\n' +
      'This hides the solid text color so the gradient background shows through\n' +
      'the clipped letterforms.\n' +
      'Without transparent, the solid color covers the gradient and the effect disappears.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 4: Radial & Conic Gradients
// ============================================

test('The header rule should use a radial-gradient for its background', () => {
  const bg = findCSSProperty('header', 'background');
  if (!bg || !bg.includes('radial-gradient')) {
    throw new Error(
      'The header rule should have a background containing radial-gradient(...).\n\n' +
      'In Step 5, replace background-color: whitesmoke in the header rule with:\n' +
      'background: radial-gradient(circle at 50% 50%, #fff 0%, #eee 70%);\n' +
      'The circle keyword creates a circular shape (default without it is an ellipse).\n' +
      'This produces a centered white spotlight that fades to light gray at the edges.'
    );
  }
  expect(true).toBe(true);
});

test('The .featured rule should use a conic-gradient for its background', () => {
  const bg = getCSSPropertyValue('.featured', 'background');
  if (!bg || !bg.includes('conic-gradient')) {
    throw new Error(
      'The .featured rule should have a background containing conic-gradient(...).\n\n' +
      'In Step 6, add a background property using conic-gradient() to the .featured rule.\n' +
      'Example: conic-gradient(from 200deg at 0% 100%, #dce8f0, white 40%, #f5e8e8 80%, white)\n' +
      'Colors sweep around a center point — like a clock face — giving the featured card\n' +
      'a distinctive look that sets it apart from the regular cards.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 5: Border Radius, Box Shadow & Aspect Ratio
// ============================================

test('The .program-card rule should have border-radius set', () => {
  const radius = getCSSPropertyValue('.program-card', 'border-radius');
  const bl = getCSSPropertyValue('.program-card', 'border-bottom-left-radius');
  const br = getCSSPropertyValue('.program-card', 'border-bottom-right-radius');
  if (!radius && !bl && !br) {
    throw new Error(
      'The .program-card rule should have border-radius set.\n\n' +
      'In Step 7, add border-radius: 0 0 0.5rem 0.5rem; to the .program-card rule.\n' +
      'The four values go clockwise: top-left, top-right, bottom-right, bottom-left.\n' +
      'So 0 0 0.5rem 0.5rem keeps the top flat (where the red accent line sits)\n' +
      'and rounds only the bottom corners.'
    );
  }
  expect(true).toBe(true);
});

test('The .panel rule should have border-radius set', () => {
  const radius = getCSSPropertyValue('.panel', 'border-radius');
  const bl = getCSSPropertyValue('.panel', 'border-bottom-left-radius');
  const br = getCSSPropertyValue('.panel', 'border-bottom-right-radius');
  if (!radius && !bl && !br) {
    throw new Error(
      'The .panel rule should have border-radius set.\n\n' +
      'In Step 7, add border-radius: 0 0 0.5rem 0.5rem; to the .panel rule.\n' +
      'This rounds only the bottom corners, matching the .program-card style.\n' +
      'The top stays flat where the red border-top accent line sits.'
    );
  }
  expect(true).toBe(true);
});

test('The .program-card rule should have box-shadow set', () => {
  const shadow = getCSSPropertyValue('.program-card', 'box-shadow');
  // box-shadow: none is a truthy string but means no shadow — treat it as missing.
  if (!shadow || shadow === 'none') {
    throw new Error(
      'The .program-card rule should have box-shadow set.\n\n' +
      'In Step 8, add box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); to the .program-card rule.\n' +
      'The four values are: x-offset y-offset blur-radius color.\n' +
      '0 2px 8px creates a slight downward shadow with soft edges,\n' +
      'making the cards appear gently elevated above the page.'
    );
  }
  expect(shadow).toBeTruthy();
});

test('The .program-card rule should have aspect-ratio set to 1', () => {
  const ratio = getCSSPropertyValue('.program-card', 'aspect-ratio');
  // Accept both '1' and '1/1' — they are identical values. Some students write
  // the explicit fraction form; browsers may also serialize '1' as '1 / 1'.
  const normalized = ratio ? ratio.replace(/\s/g, '') : '';
  if (normalized !== '1' && normalized !== '1/1') {
    throw new Error(
      `The .program-card aspect-ratio is "${ratio || 'not set'}" but should be 1.\n\n` +
      'In Step 9, add aspect-ratio: 1; to the .program-card rule.\n' +
      'This forces every card to be a perfect square, regardless of content length.\n' +
      'The .featured rule already has aspect-ratio: auto which overrides this,\n' +
      'so only the regular cards become square.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 6: :nth-child & :focus-visible
// ============================================

test('tbody tr:nth-child(odd) should have a background-color set', () => {
  // Chrome normalizes :nth-child(odd) to :nth-child(2n+1) in selectorText,
  // so check both forms to avoid a false failure.
  const color = getCSSPropertyValue('tbody tr:nth-child(odd)', 'background-color') ||
                getCSSPropertyValue('tbody tr:nth-child(2n+1)', 'background-color');
  if (!color) {
    throw new Error(
      'No background-color found on tbody tr:nth-child(odd).\n\n' +
      'In Step 10, find the tbody tr:nth-child(even) rule and change "even" to "odd".\n' +
      'This shifts the striping to highlight rows 1, 3, 5... instead of 2, 4, 6...\n' +
      'Even is shorthand for 2n, and odd is shorthand for 2n+1.\n' +
      'A single keyword change shifts the entire striping pattern.'
    );
  }
  expect(color).toBeTruthy();
});

test('nav a:focus-visible should have an outline set', () => {
  // Some browsers decompose the `outline` shorthand into outline-width / outline-style /
  // outline-color longhands in the CSSOM, causing getPropertyValue('outline') to return
  // empty string even when the shorthand was written. Check longhands as fallback.
  // Also reject 'none' — it's a truthy string but explicitly removes the outline.
  const outline = getCSSPropertyValue('nav a:focus-visible', 'outline');
  const outlineStyle = getCSSPropertyValue('nav a:focus-visible', 'outline-style');
  const outlineWidth = getCSSPropertyValue('nav a:focus-visible', 'outline-width');
  const hasOutline = (outline && outline !== 'none') ||
                     (outlineStyle && outlineStyle !== 'none') ||
                     (outlineWidth && outlineWidth !== '0' && outlineWidth !== '0px');
  if (!hasOutline) {
    throw new Error(
      'No outline found on nav a:focus-visible.\n\n' +
      'In Step 11, add a new CSS rule:\n' +
      'nav a:focus-visible {\n' +
      '    outline: 2px solid var(--ut-white);\n' +
      '    outline-offset: 4px;\n' +
      '}\n' +
      ':focus-visible fires only for keyboard navigation, not mouse clicks.\n' +
      'Keyboard users see a clear indicator; mouse users see nothing cluttering the nav.'
    );
  }
  expect(true).toBe(true);
});

test('.skip-link:focus-visible should have styles that make it visible', () => {
  const left = getCSSPropertyValue('.skip-link:focus-visible', 'left');
  if (!left || left === '-9999px') {
    throw new Error(
      'No styles found on .skip-link:focus-visible.\n\n' +
      'In Step 12, find the .skip-link:focus rule and rename the selector\n' +
      'from .skip-link:focus to .skip-link:focus-visible.\n' +
      'Do not change any of the property values inside the rule — just update the selector.\n' +
      ':focus-visible ensures the skip link appears only for keyboard users,\n' +
      'preventing a visible outline flash when the page is clicked.'
    );
  }
  expect(true).toBe(true);
});
