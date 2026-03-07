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

// Helper: Find a @keyframes rule by name
const findKeyframesRule = (name) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === name) {
          return rule;
        }
      }
    } catch (e) {}
  }
  return null;
};

// Helper: Find a media rule containing the given media text substring,
// then check if any rule inside it matches the property substring.
const findMediaRuleContaining = (mediaSubstring, propertySubstring) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.type === CSSRule.MEDIA_RULE &&
            rule.conditionText && rule.conditionText.includes(mediaSubstring)) {
          for (let innerRule of rule.cssRules) {
            if (innerRule.cssText && innerRule.cssText.includes(propertySubstring)) {
              return true;
            }
          }
        }
      }
    } catch (e) {}
  }
  return false;
};

// Helper: Check if an element has an animation applied (via computed style)
const elementHasAnimation = (selector, animationName) => {
  const el = document.querySelector(selector);
  if (!el) return false;
  const computed = window.getComputedStyle(el);
  const names = computed.getPropertyValue('animation-name');
  return names && names.includes(animationName);
};

// ============================================
// Step 1: Hero Entrance Animation
// ============================================

test('A @keyframes rule named "fadeSlideIn" should exist', () => {
  const kf = findKeyframesRule('fadeSlideIn');
  if (!kf) {
    throw new Error(
      'No @keyframes rule named "fadeSlideIn" found.\n\n' +
      'In Step 1, create a @keyframes rule called fadeSlideIn. Inside it, define a\n' +
      '"from" block and a "to" block. The from block should set the starting styles\n' +
      '(invisible and shifted down) and the to block should set the ending styles\n' +
      '(fully visible at the natural position).'
    );
  }
});

test('The .hero-content h2 should have the fadeSlideIn animation applied', () => {
  const hasAnimation = elementHasAnimation('.hero-content h2', 'fadeSlideIn');
  const hasRule = findRuleContainingCSSText('.hero-content h2', 'fadeSlideIn');
  if (!hasAnimation && !hasRule) {
    throw new Error(
      'The .hero-content h2 does not have the fadeSlideIn animation.\n\n' +
      'In Step 1, add a rule for .hero-content h2 and set its animation property\n' +
      'using the shorthand. The animation should use fadeSlideIn as the name,\n' +
      'with a duration, timing function, and fill mode of "both".'
    );
  }
});

test('The .hero-content p should have the fadeSlideIn animation with a delay', () => {
  const hasAnimation = elementHasAnimation('.hero-content p', 'fadeSlideIn');
  const hasRule = findRuleContainingCSSText('.hero-content p', 'fadeSlideIn');
  if (!hasAnimation && !hasRule) {
    throw new Error(
      'The .hero-content p does not have the fadeSlideIn animation.\n\n' +
      'In Step 1, add a rule for .hero-content p and apply the same fadeSlideIn\n' +
      'animation as the heading, but include a delay so the paragraphs appear\n' +
      'after the heading.'
    );
  }
});

// ============================================
// Step 2: Staggered Card & Figure Entrance
// ============================================

test('A @keyframes rule named "cardEntrance" should exist', () => {
  const kf = findKeyframesRule('cardEntrance');
  if (!kf) {
    throw new Error(
      'No @keyframes rule named "cardEntrance" found.\n\n' +
      'In Step 2, create a @keyframes rule called cardEntrance. Use percentage-based\n' +
      'stops (0% and 100%) to define the animation from invisible and shifted down\n' +
      'to fully visible at the natural position.'
    );
  }
});

test('The .programs-grid children should have the cardEntrance animation', () => {
  // Check if .programs-grid > * or a similar selector has the animation
  const hasWildcard = findRuleContainingCSSText('.programs-grid > *', 'cardEntrance') ||
                      findRuleContainingCSSText('.programs-grid >', 'cardEntrance');
  // Also check if the figure or program-card directly has it
  const figureHas = elementHasAnimation('.programs-grid > figure', 'cardEntrance') ||
                    elementHasAnimation('#colleges figure', 'cardEntrance');
  const cardHas = elementHasAnimation('.program-card', 'cardEntrance');

  if (!hasWildcard && !figureHas && !cardHas) {
    throw new Error(
      'The programs-grid children do not have the cardEntrance animation.\n\n' +
      'In Step 2, add a rule targeting .programs-grid > * (every direct child of the\n' +
      'programs grid). Set the animation property to use cardEntrance with an\n' +
      'appropriate duration, timing function, and fill mode of "both".'
    );
  }
});

test('The programs-grid children should have staggered animation-delay values', () => {
  // Check for at least 3 nth-child rules with animation-delay
  let nthChildCount = 0;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (!rule.selectorText) continue;
        if (rule.selectorText.includes('nth-child') &&
            rule.selectorText.includes('.programs-grid') &&
            rule.cssText.includes('animation-delay')) {
          nthChildCount++;
        }
      }
    } catch (e) {}
  }

  if (nthChildCount < 3) {
    throw new Error(
      'Not enough staggered animation-delay rules found for the programs-grid children.\n\n' +
      'In Step 2, add separate rules for .programs-grid > :nth-child(1) through\n' +
      ':nth-child(7), each with a slightly increasing animation-delay value.\n' +
      'The first child (the campus photo) should have no delay, and each subsequent\n' +
      'child should wait a little longer. Found ' + nthChildCount + ' rules, need at least 3.'
    );
  }
});

// ============================================
// Step 3: Pulsing Submit Button Glow
// ============================================

test('A @keyframes rule named "pulse" should exist', () => {
  const kf = findKeyframesRule('pulse');
  if (!kf) {
    throw new Error(
      'No @keyframes rule named "pulse" found.\n\n' +
      'In Step 3, create a @keyframes rule called pulse. Define a "from" block with\n' +
      'a small, subtle box-shadow glow and a "to" block with a larger, more\n' +
      'intense glow. Use the Utah Tech red color in the rgba values.'
    );
  }
});

test('The button[type="submit"] should have an infinite alternate animation', () => {
  const btn = document.querySelector('button[type="submit"]');
  if (!btn) {
    throw new Error('No submit button found on the page.');
  }
  const computed = window.getComputedStyle(btn);
  const animName = computed.getPropertyValue('animation-name');
  const iterCount = computed.getPropertyValue('animation-iteration-count');
  const direction = computed.getPropertyValue('animation-direction');

  const hasPulse = animName && animName.includes('pulse');
  const isInfinite = iterCount && iterCount.includes('infinite');
  const isAlternate = direction && direction.includes('alternate');

  if (!hasPulse || !isInfinite || !isAlternate) {
    const issues = [];
    if (!hasPulse) issues.push('animation-name should reference the pulse keyframes');
    if (!isInfinite) issues.push('animation-iteration-count should be infinite');
    if (!isAlternate) issues.push('animation-direction should be alternate');
    throw new Error(
      'The submit button animation is not set up correctly.\n\n' +
      'In Step 3, add an animation to button[type="submit"] that uses the pulse\n' +
      'keyframes. The animation should loop forever (infinite) and alternate\n' +
      'direction so the glow breathes in and out.\n\n' +
      'Issues found:\n- ' + issues.join('\n- ')
    );
  }
});

// ============================================
// Step 4: CSS Spinner
// ============================================

test('A <div> with class "spinner" should exist inside a .form-actions container', () => {
  const spinner = document.querySelector('.form-actions .spinner');
  if (!spinner) {
    const spinnerAnywhere = document.querySelector('.spinner');
    const formActions = document.querySelector('.form-actions');
    if (!formActions) {
      throw new Error(
        'No .form-actions container found.\n\n' +
        'In Step 4 Part A, wrap the submit button in a new div with the class\n' +
        '"form-actions". Then add the spinner div inside that same container,\n' +
        'after the button.'
      );
    }
    if (!spinnerAnywhere) {
      throw new Error(
        'No element with class "spinner" found.\n\n' +
        'In Step 4 Part A, add a div with the class "spinner" inside the\n' +
        '.form-actions container, after the submit button. The div should\n' +
        'also have role="status" and aria-label="Loading" for accessibility.'
      );
    }
    throw new Error(
      'A .spinner element exists but it is not inside a .form-actions container.\n\n' +
      'Make sure the spinner div is inside the .form-actions div, after the submit button.'
    );
  }
});

test('The spinner should have role="status" and aria-label for accessibility', () => {
  const spinner = document.querySelector('.spinner');
  if (!spinner) {
    throw new Error('No .spinner element found. Complete Step 4 Part A first.');
  }
  const role = spinner.getAttribute('role');
  const ariaLabel = spinner.getAttribute('aria-label');
  if (role !== 'status' || !ariaLabel) {
    throw new Error(
      'The spinner is missing accessibility attributes.\n\n' +
      'In Step 4 Part A, the spinner div needs role="status" and an aria-label\n' +
      'attribute (like "Loading") so screen readers can announce that loading\n' +
      'is in progress.'
    );
  }
});

test('A @keyframes rule named "spin" should exist', () => {
  const kf = findKeyframesRule('spin');
  if (!kf) {
    throw new Error(
      'No @keyframes rule named "spin" found.\n\n' +
      'In Step 4 Part B, create a @keyframes rule called spin. It only needs a "to"\n' +
      'block that rotates the element one full revolution (360 degrees). The browser\n' +
      'starts from 0 degrees by default.'
    );
  }
});

test('The .spinner should be styled as a spinning circle', () => {
  const spinner = document.querySelector('.spinner');
  if (!spinner) {
    throw new Error('No .spinner element found. Complete Step 4 Part A first.');
  }
  const computed = window.getComputedStyle(spinner);
  const borderRadius = computed.getPropertyValue('border-radius');
  const animName = computed.getPropertyValue('animation-name');

  const isCircle = borderRadius && borderRadius.includes('50%');
  const hasSpin = animName && animName.includes('spin');

  if (!isCircle || !hasSpin) {
    const issues = [];
    if (!isCircle) issues.push('border-radius should be 50% to make it circular');
    if (!hasSpin) issues.push('animation should use the spin keyframes');
    throw new Error(
      'The .spinner is not fully styled.\n\n' +
      'In Step 4 Part B, the .spinner rule needs border-radius: 50% to make it a\n' +
      'circle, and an animation property that uses the spin keyframes with linear\n' +
      'timing and infinite iteration count.\n\n' +
      'Issues found:\n- ' + issues.join('\n- ')
    );
  }
});

// ============================================
// Step 5: Animated Nav Underline with ::after
// ============================================

test('The nav a rule should have position: relative', () => {
  // Check computed style on an actual nav link
  const navLink = document.querySelector('nav a');
  if (!navLink) {
    throw new Error('No <a> elements found inside <nav>.');
  }
  const computed = window.getComputedStyle(navLink);
  const position = computed.getPropertyValue('position');
  if (position !== 'relative') {
    throw new Error(
      'The nav a element does not have position: relative.\n\n' +
      'In Step 5, add position: relative to a nav a rule. This is needed so the\n' +
      '::after pseudo-element (which uses position: absolute) positions itself\n' +
      'relative to the link rather than the page.'
    );
  }
});

test('The nav a::after rule should exist with content and transform: scaleX(0)', () => {
  // Check for the pseudo-element rule
  const hasAfterRule = findRuleContainingCSSText('nav a::after', 'content') ||
                       findRuleContainingCSSText('nav a::after', 'scaleX');
  if (!hasAfterRule) {
    throw new Error(
      'No nav a::after rule found with content and transform.\n\n' +
      'In Step 5, create a rule for nav a::after. It must include content set to\n' +
      'an empty string (this is required for pseudo-elements to render), along with\n' +
      'position: absolute, dimensions, a background color, and transform: scaleX(0)\n' +
      'to start the underline invisible.'
    );
  }
});

test('The nav a:hover::after rule should have transform: scaleX(1)', () => {
  const hasHoverRule = findRuleContainingCSSText('nav a:hover::after', 'scaleX(1)') ||
                       findRuleContainingCSSText('nav a:hover::after', 'scaleX');
  if (!hasHoverRule) {
    throw new Error(
      'No nav a:hover::after rule found with transform: scaleX(1).\n\n' +
      'In Step 5, create a rule for nav a:hover::after that sets transform to\n' +
      'scaleX(1) and changes the transform-origin. This makes the underline\n' +
      'grow to full width when the link is hovered.'
    );
  }
});

// ============================================
// Step 6: Typographic Polish with Pseudo-Elements
// ============================================

test('Part A: A ::first-letter rule should exist for the hero paragraph', () => {
  const hasRule = findRuleContainingCSSText('first-letter', 'float') ||
                  findRuleContainingCSSText('first-letter', 'font-size');
  if (!hasRule) {
    throw new Error(
      'No ::first-letter rule found for the hero paragraph.\n\n' +
      'In Step 6 Part A, add a rule targeting the first letter of the first\n' +
      'paragraph in .hero-content. Use the ::first-letter pseudo-element with\n' +
      'float: left, a large font-size, and bold font-weight to create a drop cap.'
    );
  }
});

test('Part B: A ::marker rule should exist for sidebar list items', () => {
  const hasRule = findRuleContainingCSSText('::marker', 'color') ||
                  findRuleContainingCSSText('::marker', 'font-size');
  if (!hasRule) {
    throw new Error(
      'No ::marker rule found.\n\n' +
      'In Step 6 Part B, add a rule for .sidebar li::marker and set its color\n' +
      'to the Utah Tech red and increase its font-size slightly.'
    );
  }
});

test('Part C: A ::placeholder rule should exist for form inputs', () => {
  const hasRule = findRuleContainingCSSText('::placeholder', 'color') ||
                  findRuleContainingCSSText('::placeholder', 'font-style');
  if (!hasRule) {
    throw new Error(
      'No ::placeholder rule found.\n\n' +
      'In Step 6 Part C, add a grouped rule for input::placeholder and\n' +
      'textarea::placeholder. Set a custom color and font-style to make\n' +
      'the placeholder text more distinctive.'
    );
  }
});

test('Part D: A ::selection rule should exist with custom colors', () => {
  const hasRule = findRuleContainingCSSText('::selection', 'background') ||
                  findRuleContainingCSSText('::selection', 'color');
  if (!hasRule) {
    throw new Error(
      'No ::selection rule found.\n\n' +
      'In Step 6 Part D, add a rule for ::selection and set a background-color\n' +
      'and color to match the Utah Tech brand. Try selecting text on the page\n' +
      'to see your custom highlight colors.'
    );
  }
});

// ============================================
// Step 7: Reduced Motion (Comprehensive)
// ============================================

test('The prefers-reduced-motion media query should include animation-iteration-count', () => {
  const hasRule = findMediaRuleContaining('prefers-reduced-motion', 'animation-iteration-count');
  if (!hasRule) {
    throw new Error(
      'The @media (prefers-reduced-motion: reduce) block is missing animation-iteration-count.\n\n' +
      'In Step 7, find the existing prefers-reduced-motion media query at the bottom\n' +
      'of the starter CSS. Inside the *, *::before, *::after rule, add\n' +
      'animation-iteration-count set to 1 with !important. This stops looping\n' +
      'animations (like the spinner and pulse) from repeating forever.'
    );
  }
});
