// Helper: Get a CSS property value from the last rule matching the exact selector
const getCSSPropertyValue = (selector, property) => {
  let result = null;
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
          if (value) result = value;
        }
      }
    } catch (e) {}
  }
  return result;
};

// Helper: Search all stylesheet rules for any rule whose selectorText contains
// a given substring AND whose raw cssText contains a given property string.
const findRuleContainingCSSText = (selectorSubstring, propertySubstring) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (!rule.selectorText) continue;
        if (rule.selectorText.includes(selectorSubstring) &&
            rule.cssText && rule.cssText.includes(propertySubstring)) {
          return true;
        }
      }
    } catch (e) {}
  }
  return false;
};

// Helper: Find a @media rule containing the given media text substring,
// then optionally check if any rule inside it matches the selector and property.
const findMediaRule = (mediaSubstring, selectorSubstring, propertySubstring) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.type === CSSRule.MEDIA_RULE &&
            rule.conditionText && rule.conditionText.includes(mediaSubstring)) {
          if (!selectorSubstring && !propertySubstring) return true;
          for (let innerRule of rule.cssRules) {
            const selectorMatch = !selectorSubstring || (innerRule.selectorText && innerRule.selectorText.includes(selectorSubstring));
            const propertyMatch = !propertySubstring || (innerRule.cssText && innerRule.cssText.includes(propertySubstring));
            if (selectorMatch && propertyMatch) return true;
          }
        }
      }
    } catch (e) {}
  }
  return false;
};

// Helper: Find a @container rule containing the given condition substring,
// then optionally check if any rule inside it matches the selector and property.
const findContainerRule = (conditionSubstring, selectorSubstring, propertySubstring) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        // CSSContainerRule type number is 17 in Chrome
        if ((rule instanceof CSSContainerRule || rule.type === 17) &&
            rule.conditionText && rule.conditionText.includes(conditionSubstring)) {
          if (!selectorSubstring && !propertySubstring) return true;
          for (let innerRule of rule.cssRules) {
            const selectorMatch = !selectorSubstring || (innerRule.selectorText && innerRule.selectorText.includes(selectorSubstring));
            const propertyMatch = !propertySubstring || (innerRule.cssText && innerRule.cssText.includes(propertySubstring));
            if (selectorMatch && propertyMatch) return true;
          }
        }
      }
    } catch (e) {}
  }
  return false;
};

// Helper: Check if a CSS property contains clamp()
const propertyUsesClamp = (selector, property) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (!rule.selectorText) continue;
        if (rule.selectorText.includes(selector)) {
          const value = rule.style.getPropertyValue(property);
          if (value && value.includes('clamp')) return true;
        }
        // Also check inside media rules
        if (rule.type === CSSRule.MEDIA_RULE) {
          for (let innerRule of rule.cssRules) {
            if (innerRule.selectorText && innerRule.selectorText.includes(selector)) {
              const value = innerRule.style.getPropertyValue(property);
              if (value && value.includes('clamp')) return true;
            }
          }
        }
      }
    } catch (e) {}
  }
  return false;
};

// Helper: Check if a custom property (CSS variable) is defined in :root
const getRootCustomProperty = (propertyName) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText === ':root') {
          const value = rule.style.getPropertyValue(propertyName).trim();
          if (value) return value;
        }
      }
    } catch (e) {}
  }
  return null;
};

// ============================================
// Step 1: Mobile-First Body Grid
// ============================================

test('The body grid-template-columns should be 1fr (single column) by default', () => {
  const value = getCSSPropertyValue('body', 'grid-template-columns');
  if (!value || value.includes('640px') || value.includes('280px')) {
    throw new Error(
      'The body still uses the fixed 4-column grid.\n\n' +
      'In Step 1, edit the existing body rule and change grid-template-columns\n' +
      'to 1fr. This makes the default layout a single column for mobile devices.\n' +
      'The multi-column layout will be restored via a media query.'
    );
  }
});

test('A @media (min-width: 768px) query should restore the multi-column body grid', () => {
  const found = findMediaRule('min-width: 768px', 'body', 'grid-template-columns');
  if (!found) {
    throw new Error(
      'No @media (min-width: 768px) rule found with a body grid-template-columns.\n\n' +
      'Below the comment line, add:\n' +
      '@media (min-width: 768px) { body { grid-template-columns: ... } }\n' +
      'This restores the multi-column layout for tablet and desktop screens.'
    );
  }
});

test('A @media (min-width: 768px) query should place main and sidebar in their grid columns', () => {
  const mainFound = findMediaRule('min-width: 768px', 'main', 'grid-column');
  const sidebarFound = findMediaRule('min-width: 768px', '.sidebar', 'grid-column');
  if (!mainFound || !sidebarFound) {
    throw new Error(
      'Inside your @media (min-width: 768px) query, add rules for main and .sidebar\n' +
      'that assign them to specific grid columns. On mobile (single column), they\n' +
      'flow naturally. On tablet+, they need explicit grid-column assignments to\n' +
      'sit side by side.'
    );
  }
});

test('A @media (min-width: 1024px) query should exist for large desktop', () => {
  const found = findMediaRule('min-width: 1024px', 'body', 'grid-template-columns');
  if (!found) {
    throw new Error(
      'No @media (min-width: 1024px) rule found for the body grid.\n\n' +
      'Add a second media query for large screens that increases the main column\n' +
      'minimum width: grid-template-columns: minmax(0, 1fr) minmax(640px, 1fr) 280px minmax(0, 1fr)'
    );
  }
});

// ============================================
// Step 2: Responsive Navigation
// ============================================

test('The .menu-toggle button should be visible on mobile (not display: none by default)', () => {
  const value = getCSSPropertyValue('.menu-toggle', 'display');
  if (value === 'none') {
    throw new Error(
      'The .menu-toggle is set to display: none in the starter CSS.\n\n' +
      'In Step 2, change the .menu-toggle rule so it is visible on mobile.\n' +
      'Use display: flex to show the hamburger button. It will be hidden on\n' +
      'desktop via a media query.'
    );
  }
});

test('The nav should be hidden on mobile by default', () => {
  const value = getCSSPropertyValue('nav', 'display');
  if (!value || value !== 'none') {
    throw new Error(
      'The nav should be hidden on mobile (display: none) by default.\n\n' +
      'In Step 2, change the nav rule so it starts hidden. When the hamburger\n' +
      'button is clicked, JavaScript will add a .nav-open class to show it.'
    );
  }
});

test('The nav.nav-open rule should display the nav as a flex column', () => {
  const value = getCSSPropertyValue('nav.nav-open', 'display');
  if (!value || value !== 'flex') {
    throw new Error(
      'No nav.nav-open rule found with display: flex.\n\n' +
      'Add a rule for nav.nav-open that sets display to flex and\n' +
      'flex-direction to column. This shows the nav links in a\n' +
      'vertical stack when the hamburger button is toggled.'
    );
  }
});

test('The nav should be visible and horizontal on desktop (inside a media query)', () => {
  const navFound = findMediaRule('min-width: 768px', 'nav', 'display');
  const toggleFound = findMediaRule('min-width: 768px', '.menu-toggle', 'display');
  if (!navFound) {
    throw new Error(
      'Inside your @media (min-width: 768px) query, add a rule for nav\n' +
      'that sets display to flex (always visible) and flex-direction to row.\n' +
      'This overrides the mobile hidden state.'
    );
  }
  if (!toggleFound) {
    throw new Error(
      'Inside your @media (min-width: 768px) query, add a rule for\n' +
      '.menu-toggle that sets display to none. The hamburger button\n' +
      'should only be visible on mobile.'
    );
  }
});

test('The hamburger toggle JS should be connected (starter.js)', () => {
  const script = document.querySelector('script[src="starter.js"]');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  if (!menuToggle) {
    throw new Error(
      'No .menu-toggle button found in the HTML. Make sure the hamburger\n' +
      'button element exists with class="menu-toggle".'
    );
  }
  if (!nav) {
    throw new Error(
      'No #main-nav element found. Make sure the nav has id="main-nav".'
    );
  }
  // Simulate a click to test the toggle
  menuToggle.click();
  const expanded = menuToggle.getAttribute('aria-expanded');
  const hasOpenClass = nav.classList.contains('nav-open');
  // Reset the state
  menuToggle.click();
  if (expanded !== 'true' || !hasOpenClass) {
    throw new Error(
      'The hamburger toggle JavaScript is not working.\n\n' +
      'In starter.js, add an event listener on the .menu-toggle button that:\n' +
      '1. Toggles the aria-expanded attribute between "true" and "false"\n' +
      '2. Toggles the "nav-open" class on the #main-nav element\n\n' +
      'Example:\n' +
      'const toggle = document.querySelector(\'.menu-toggle\');\n' +
      'const nav = document.querySelector(\'#main-nav\');\n' +
      'toggle.addEventListener(\'click\', () => { ... });'
    );
  }
});

// ============================================
// Step 3: Fluid Typography with clamp()
// ============================================

test('The h1 should use clamp() for font-size', () => {
  if (!propertyUsesClamp('h1', 'font-size')) {
    throw new Error(
      'The h1 does not use clamp() for font-size.\n\n' +
      'In Step 3, find the h1 rule and set font-size to a clamp() value like:\n' +
      'font-size: clamp(1.5rem, 4vw + 1rem, 3rem)\n\n' +
      'clamp(minimum, preferred, maximum) scales the font smoothly between\n' +
      'the minimum and maximum based on the viewport width.'
    );
  }
});

test('The h2 should use clamp() for font-size', () => {
  if (!propertyUsesClamp('h2', 'font-size')) {
    throw new Error(
      'The h2 does not use clamp() for font-size.\n\n' +
      'Add a rule for h2 with font-size set to a clamp() value like:\n' +
      'font-size: clamp(1.25rem, 3vw + 0.5rem, 2rem)'
    );
  }
});

test('The h3 or h4 should use clamp() for font-size', () => {
  const h3Uses = propertyUsesClamp('h3', 'font-size');
  const h4Uses = propertyUsesClamp('h4', 'font-size');
  const combinedUses = propertyUsesClamp('h3, h4', 'font-size');
  if (!h3Uses && !h4Uses && !combinedUses) {
    throw new Error(
      'Neither h3 nor h4 uses clamp() for font-size.\n\n' +
      'Add a rule for h3, h4 (or separate rules) with a clamp() font-size like:\n' +
      'font-size: clamp(1rem, 2vw + 0.5rem, 1.5rem)'
    );
  }
});

test('The --space-fluid custom property should be defined with clamp()', () => {
  const value = getRootCustomProperty('--space-fluid');
  if (!value || !value.includes('clamp')) {
    throw new Error(
      'No --space-fluid custom property found in :root with a clamp() value.\n\n' +
      'In Step 3, add a custom property to the :root rule:\n' +
      '--space-fluid: clamp(1rem, 3vw, 2rem)\n\n' +
      'This creates a reusable fluid spacing value you can use throughout\n' +
      'the stylesheet with var(--space-fluid).'
    );
  }
});

test('The .panel should use clamp() for padding', () => {
  const usesClampPadding = propertyUsesClamp('.panel', 'padding') ||
    propertyUsesClamp('.panel', 'padding-block') ||
    propertyUsesClamp('.panel', 'padding-inline');
  if (!usesClampPadding) {
    throw new Error(
      'The .panel does not use clamp() for padding.\n\n' +
      'In Step 3, update the .panel rule to use fluid padding with clamp().\n' +
      'For example: padding: clamp(0.75rem, 3vw, 1.5rem)\n' +
      'This makes the panel padding scale with the viewport width.'
    );
  }
});

// ============================================
// Step 4: Intrinsic Programs Grid
// ============================================

test('The .programs-grid should use auto-fill in grid-template-columns', () => {
  const value = getCSSPropertyValue('.programs-grid', 'grid-template-columns');
  if (!value || !value.includes('auto-fill')) {
    throw new Error(
      'The .programs-grid does not use auto-fill in grid-template-columns.\n\n' +
      'In Step 4, change the existing .programs-grid rule from auto-fit to auto-fill\n' +
      'and increase the minimum from 180px to 250px:\n' +
      'grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr))\n\n' +
      'The min(250px, 100%) ensures cards never overflow on narrow screens.'
    );
  }
});

test('The .programs-grid should use a minimum of at least 220px in minmax()', () => {
  const value = getCSSPropertyValue('.programs-grid', 'grid-template-columns');
  if (!value) {
    throw new Error('No grid-template-columns found on .programs-grid.');
  }
  // Extract the pixel value from minmax(...)
  const minmaxMatch = value.match(/minmax\(\s*(?:min\()?\s*(\d+)px/);
  if (!minmaxMatch || parseInt(minmaxMatch[1]) < 220) {
    throw new Error(
      'The .programs-grid minmax() minimum is too small.\n\n' +
      'Increase the minimum column width to at least 250px so cards are readable\n' +
      'on mobile. For example:\n' +
      'grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr))'
    );
  }
});

test('The .programs-grid should use var(--space-fluid) for gap', () => {
  const value = getCSSPropertyValue('.programs-grid', 'gap');
  if (!value || !value.includes('--space-fluid')) {
    throw new Error(
      'The .programs-grid gap should use var(--space-fluid).\n\n' +
      'In Step 4, change the gap from a fixed value to var(--space-fluid)\n' +
      'so the grid spacing scales fluidly with the viewport.'
    );
  }
});

// ============================================
// Step 5: Hero & Responsive Images
// ============================================

test('The #welcome hero should use dvh for min-height', () => {
  const value = getCSSPropertyValue('#welcome', 'min-height');
  if (!value || !value.includes('dvh')) {
    throw new Error(
      'The #welcome section does not use dvh for min-height.\n\n' +
      'In Step 5, add min-height: 100dvh to the #welcome rule (with 100vh\n' +
      'as a fallback above it). Dynamic viewport height (dvh) adjusts when\n' +
      'mobile browser chrome appears and disappears.'
    );
  }
});

test('An img rule should set max-width: 100% as a global reset', () => {
  const value = getCSSPropertyValue('img', 'max-width');
  if (!value || value !== '100%') {
    throw new Error(
      'No global img rule found with max-width: 100%.\n\n' +
      'In Step 5, add a rule for img that sets max-width to 100% and\n' +
      'height to auto. This prevents all images from overflowing their\n' +
      'containers — a fundamental responsive design reset.'
    );
  }
});

test('The video element should be responsive (max-width: 100%)', () => {
  const value = getCSSPropertyValue('video', 'max-width');
  if (!value || value !== '100%') {
    throw new Error(
      'No video rule found with max-width: 100%.\n\n' +
      'In Step 5, add a rule for video that sets max-width to 100% and\n' +
      'height to auto. The hero video currently has a fixed width="320"\n' +
      'attribute — max-width: 100% ensures it shrinks on narrow screens.'
    );
  }
});

test('The campus figure image should use object-fit: cover', () => {
  const value = getCSSPropertyValue('#colleges figure img', 'object-fit');
  if (!value || value !== 'cover') {
    throw new Error(
      'The #colleges figure img does not have object-fit: cover.\n\n' +
      'In Step 5, add object-fit: cover to the campus image rule.\n' +
      'Combined with aspect-ratio: 16/9, this makes the image fill\n' +
      'a consistent area without stretching or distortion.'
    );
  }
});

// ============================================
// Step 6: Container Queries
// ============================================

test('The .programs-grid should have container-type: inline-size', () => {
  const value = getCSSPropertyValue('.programs-grid', 'container-type');
  if (!value || value !== 'inline-size') {
    throw new Error(
      'The .programs-grid does not have container-type: inline-size.\n\n' +
      'In Step 6, add container-type: inline-size to the .programs-grid rule.\n' +
      'This declares it as a containment context, allowing child elements to\n' +
      'respond to the grid\'s width instead of the viewport width.'
    );
  }
});

test('A @container query should exist that targets program cards', () => {
  const found = findContainerRule('min-width', '.program-card', null) ||
    findContainerRule('min-width', '.featured', null);
  if (!found) {
    throw new Error(
      'No @container query found targeting .program-card or .featured.\n\n' +
      'In Step 6, add a @container query that changes card layout when\n' +
      'the container is wide enough. For example:\n' +
      '@container (min-width: 500px) {\n' +
      '  .program-card { aspect-ratio: auto; }\n' +
      '  .featured { grid-column: span 2; }\n' +
      '}\n\n' +
      'The cards will adapt based on the programs-grid width, not the viewport.'
    );
  }
});

// ============================================
// Step 7: Polish & Table Wrapper
// ============================================

test('The table should be wrapped in a .table-wrapper div with overflow-x: auto', () => {
  const wrapper = document.querySelector('.table-wrapper');
  if (!wrapper) {
    throw new Error(
      'No .table-wrapper element found around the table.\n\n' +
      'In Step 7, wrap the <table> in the HTML with a <div class="table-wrapper">.\n' +
      'This allows the table to scroll horizontally on narrow screens.'
    );
  }
  const value = getCSSPropertyValue('.table-wrapper', 'overflow-x');
  if (!value || value !== 'auto') {
    throw new Error(
      'The .table-wrapper does not have overflow-x: auto.\n\n' +
      'Add a CSS rule for .table-wrapper with overflow-x set to auto.\n' +
      'This allows the table to scroll horizontally when it overflows\n' +
      'its container on narrow screens.'
    );
  }
});

test('The .featured card should not use grid-column: span 2 at mobile (base rule)', () => {
  const value = getCSSPropertyValue('.featured', 'grid-column');
  if (value && value.includes('span 2')) {
    throw new Error(
      'The .featured card has grid-column: span 2 in the base (non-media-query) rule.\n\n' +
      'On a single-column mobile grid, span 2 causes the card to overflow.\n' +
      'In Step 7, remove grid-column: span 2 from the base .featured rule and\n' +
      'move it inside your @container query so it only spans 2 columns when\n' +
      'the grid is wide enough.'
    );
  }
});
