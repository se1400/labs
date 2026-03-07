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

// Helper: Check if any rule matching a selector contains a substring in its cssText.
// Useful for shorthand properties like `transition` which may not be split into longhands.
const ruleContainsCSSText = (selector, substring) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (!rule.selectorText) continue;
        const ruleSelectors = rule.selectorText.split(',').map(s => s.trim());
        const targetSelectors = selector.split(',').map(s => s.trim());
        const selectorMatch = targetSelectors.length === ruleSelectors.length &&
          targetSelectors.every(s => ruleSelectors.includes(s)) &&
          ruleSelectors.every(s => targetSelectors.includes(s));
        if (selectorMatch && rule.cssText && rule.cssText.includes(substring)) {
          return true;
        }
      }
    } catch (e) {}
  }
  return false;
};

// ============================================
// Step 1: Nav Link Transition
// ============================================

test('The nav a rule should have a transition property that includes "color"', () => {
  // Check longhand transition-property for "color" or "all"
  const transitionProp = getCSSPropertyValue('nav a', 'transition-property');
  const hasLonghand = transitionProp && (transitionProp.includes('color') || transitionProp === 'all');

  // Fallback: check cssText for transition shorthand containing "color" or "all"
  let hasShorthand = false;
  if (ruleContainsCSSText('nav a', 'transition')) {
    // Accept transition: color ... or transition: all ...
    hasShorthand = ruleContainsCSSText('nav a', 'color') || ruleContainsCSSText('nav a', 'all');
  }

  if (!hasLonghand && !hasShorthand) {
    throw new Error(
      'No transition found on the "nav a" rule.\n\n' +
      'In Step 1, create a rule that targets nav a and add a transition property.\n' +
      'The transition should animate the color property over 0.2s using ease-out timing.\n\n' +
      'Format: transition: property duration timing-function;'
    );
  }
});

// ============================================
// Step 2: Program Card Lift
// ============================================

test('The .program-card rule should have a transition property', () => {
  const hasTransition = ruleContainsCSSText('.program-card', 'transition');
  if (!hasTransition) {
    throw new Error(
      'No transition found on the ".program-card" rule.\n\n' +
      'In Step 2, add a transition property to the .program-card rule that animates\n' +
      'both transform and box-shadow (each over 0.2s with ease timing).\n' +
      'Separate multiple transitions with a comma.'
    );
  }
});

test('The .program-card:hover rule should have transform: translateY(-6px)', () => {
  const transform = getCSSPropertyValue('.program-card:hover', 'transform');
  if (!transform || !transform.includes('translateY')) {
    throw new Error(
      'No transform found on the ".program-card:hover" rule.\n\n' +
      'In Step 2, add a .program-card:hover rule with a transform property.\n' +
      'Use translateY() with a negative value to move the card up on hover.\n' +
      'Check the description for the exact value.'
    );
  }
});

test('The .program-card:hover rule should have an enhanced box-shadow', () => {
  const shadow = getCSSPropertyValue('.program-card:hover', 'box-shadow');
  if (!shadow) {
    throw new Error(
      'No box-shadow found on the ".program-card:hover" rule.\n\n' +
      'In Step 2, add a box-shadow to the .program-card:hover rule.\n' +
      'This larger shadow makes the card look like it\'s floating higher above the page.\n' +
      'Check the description for the exact value.'
    );
  }
});

// ============================================
// Step 3: Campus Photo Zoom
// ============================================

test('The #colleges figure rule should have overflow: hidden', () => {
  const figure = document.querySelector('#colleges figure');
  if (!figure) {
    throw new Error('No <figure> element found inside #colleges.');
  }
  const computed = window.getComputedStyle(figure);
  const overflow = computed.getPropertyValue('overflow');
  if (!overflow.includes('hidden')) {
    throw new Error(
      'The #colleges figure does not have overflow: hidden.\n\n' +
      'In Step 3, find the #colleges figure rule and add overflow: hidden.\n' +
      'This clips the zoomed image so it stays inside the frame when it scales up.'
    );
  }
});

test('The #colleges figure img rule should have a transition on transform', () => {
  const hasTransitionKeyword = findRuleContainingCSSText('#colleges figure img', 'transition');
  // Accept transition: transform ... or transition: all ...
  const hasTransformOrAll = findRuleContainingCSSText('#colleges figure img', 'transform') ||
                            findRuleContainingCSSText('#colleges figure img', 'all');
  if (!hasTransitionKeyword || !hasTransformOrAll) {
    throw new Error(
      'No transition on transform found for "#colleges figure img".\n\n' +
      'In Step 3, find the #colleges figure img rule and add a transition property\n' +
      'that animates transform over 0.4s with ease timing.\n' +
      'This makes the zoom effect animate smoothly instead of snapping.'
    );
  }
});

test('The #colleges figure:hover img rule should have transform: scale(1.05)', () => {
  const transform = getCSSPropertyValue('#colleges figure:hover img', 'transform');
  if (!transform || !transform.includes('scale')) {
    throw new Error(
      'No transform: scale() found on "#colleges figure:hover img".\n\n' +
      'In Step 3, create a new rule targeting #colleges figure:hover img.\n' +
      'Inside it, add a transform property using scale() to enlarge the image\n' +
      'slightly (e.g., 105%) when the figure is hovered.'
    );
  }
});

// ============================================
// Step 4: Submit Button Lift
// ============================================

test('The button[type="submit"] rule should have a transition property', () => {
  let foundOnBase = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (!rule.selectorText) continue;
        if (rule.selectorText.trim() === 'button[type="submit"]' &&
            rule.cssText.includes('transition')) {
          foundOnBase = true;
        }
      }
    } catch (e) {}
  }
  if (!foundOnBase) {
    throw new Error(
      'No transition found on the button[type="submit"] rule.\n\n' +
      'In Step 4, find the button[type="submit"] rule and add a transition property\n' +
      'that animates background-color, transform, and box-shadow (each over 0.2s\n' +
      'with ease timing). Separate them with commas.'
    );
  }
});

test('The button[type="submit"]:hover rule should have a transform with translateY', () => {
  const transform = getCSSPropertyValue('button[type="submit"]:hover', 'transform');
  if (!transform || !transform.includes('translateY')) {
    throw new Error(
      'No transform: translateY() found on button[type="submit"]:hover.\n\n' +
      'In Step 4, find the existing button[type="submit"]:hover rule and add a\n' +
      'transform property using translateY() with a small negative value to lift\n' +
      'the button up. Check the description for the exact values.'
    );
  }
});

// ============================================
// Step 5: Footer Seal Spin
// ============================================

test('The footer img rule should have a transition that includes transform', () => {
  let foundOnBase = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (!rule.selectorText) continue;
        if (rule.selectorText.trim() === 'footer img' &&
            rule.cssText.includes('transition')) {
          foundOnBase = true;
        }
      }
    } catch (e) {}
  }
  if (!foundOnBase) {
    throw new Error(
      'No transition found on the "footer img" rule.\n\n' +
      'In Step 5, find the existing footer img rule and add a transition property\n' +
      'that animates both transform and filter. Check the description for the\n' +
      'exact durations and timing functions for each.'
    );
  }
});

test('The footer img:hover rule should have transform: rotate(360deg)', () => {
  const transform = getCSSPropertyValue('footer img:hover', 'transform');
  if (!transform || !transform.includes('rotate')) {
    throw new Error(
      'No transform: rotate() found on "footer img:hover".\n\n' +
      'In Step 5, find the existing footer img:hover rule and add a transform\n' +
      'property using rotate() to spin the seal one full revolution (360 degrees).'
    );
  }
});

// ============================================
// Step 6: 3D Flip Card
// ============================================

test('The featured card should have the flip-card class', () => {
  const card = document.querySelector('.program-card.flip-card.featured');
  if (!card) {
    throw new Error(
      'No element found with classes "program-card flip-card featured".\n\n' +
      'In Step 6 Part A, find the featured program card in your HTML and add\n' +
      'the class "flip-card" to it. The div should have all three classes:\n' +
      'program-card, flip-card, and featured.'
    );
  }
});

test('The flip card should contain .flip-card-inner, .flip-card-front, and .flip-card-back elements', () => {
  const card = document.querySelector('.flip-card');
  if (!card) {
    throw new Error('No .flip-card element found. Complete the HTML changes in Step 6 first.');
  }
  const inner = card.querySelector('.flip-card-inner');
  const front = card.querySelector('.flip-card-front');
  const back = card.querySelector('.flip-card-back');

  const missing = [];
  if (!inner) missing.push('.flip-card-inner');
  if (!front) missing.push('.flip-card-front');
  if (!back) missing.push('.flip-card-back');

  if (missing.length > 0) {
    throw new Error(
      `Missing element(s) inside the flip card: ${missing.join(', ')}\n\n` +
      'In Step 6 Part A, the flip card needs three nested divs inside it:\n' +
      '1. A div with class "flip-card-inner" (wraps everything)\n' +
      '2. Inside that, a div with class "flip-card-front" (the visible side)\n' +
      '3. Also inside flip-card-inner, a div with class "flip-card-back" (the hidden side)\n\n' +
      'The front and back should be siblings inside flip-card-inner, not nested in each other.'
    );
  }
});

test('The .flip-card rule should have perspective set', () => {
  const perspective = getCSSPropertyValue('.flip-card', 'perspective');
  if (!perspective) {
    throw new Error(
      'No perspective found on the ".flip-card" rule.\n\n' +
      'In Step 6 Part B item 1, create a .flip-card rule and add the perspective\n' +
      'property. This sets up the 3D viewing distance for the card flip.\n' +
      'Check the description for the value.'
    );
  }
});

test('The .flip-card-inner rule should have transform-style: preserve-3d', () => {
  const inner = document.querySelector('.flip-card-inner');
  if (!inner) {
    throw new Error('No .flip-card-inner element found. Complete the HTML changes in Step 6 first.');
  }
  const computed = window.getComputedStyle(inner);
  const transformStyle = computed.getPropertyValue('transform-style');
  if (transformStyle !== 'preserve-3d') {
    throw new Error(
      'The .flip-card-inner does not have transform-style: preserve-3d.\n\n' +
      'In Step 6 Part B item 2, add transform-style: preserve-3d to the\n' +
      '.flip-card-inner rule. Without this, the browser flattens everything\n' +
      'into 2D and the flip effect breaks completely.'
    );
  }
});

test('The .flip-card-inner rule should have a transition on transform', () => {
  const hasTransition = findRuleContainingCSSText('.flip-card-inner', 'transition');
  if (!hasTransition) {
    throw new Error(
      'No transition found on the ".flip-card-inner" rule.\n\n' +
      'In Step 6 Part B item 2, add a transition property to .flip-card-inner\n' +
      'that animates transform. This is what makes the flip animate smoothly\n' +
      'instead of snapping instantly. Check the description for the duration\n' +
      'and timing function.'
    );
  }
});

test('The .flip-card:hover .flip-card-inner rule should have transform: rotateY(180deg)', () => {
  const transform = getCSSPropertyValue('.flip-card:hover .flip-card-inner', 'transform');
  if (!transform || !transform.includes('rotateY')) {
    throw new Error(
      'No transform: rotateY(180deg) found on ".flip-card:hover .flip-card-inner".\n\n' +
      'In Step 6 Part B item 3, create a rule for .flip-card:hover .flip-card-inner\n' +
      'and add a transform using rotateY() to rotate it 180 degrees.\n' +
      'This is the hover trigger that flips the card around.'
    );
  }
});

test('The .flip-card-front and .flip-card-back should have backface-visibility: hidden', () => {
  const front = document.querySelector('.flip-card-front');
  const back = document.querySelector('.flip-card-back');
  if (!front || !back) {
    throw new Error('Missing .flip-card-front or .flip-card-back elements. Complete the HTML changes in Step 6 first.');
  }
  const frontBfv = window.getComputedStyle(front).getPropertyValue('backface-visibility');
  const backBfv = window.getComputedStyle(back).getPropertyValue('backface-visibility');

  if (frontBfv !== 'hidden' || backBfv !== 'hidden') {
    throw new Error(
      'The flip card faces do not have backface-visibility: hidden.\n\n' +
      'In Step 6 Part B item 4, create a grouped rule for both .flip-card-front\n' +
      'and .flip-card-back. Add backface-visibility: hidden to it.\n' +
      'This hides each face when it\'s rotated away from the viewer — without it,\n' +
      'you\'d see a backwards mirror image bleeding through.'
    );
  }
});

test('The .flip-card-back should have transform: rotateY(180deg)', () => {
  const back = document.querySelector('.flip-card-back');
  if (!back) {
    throw new Error('No .flip-card-back element found. Complete the HTML changes in Step 6 first.');
  }
  // Check the CSS rule directly (computed transform would be a matrix, not readable)
  const ruleTransform = getCSSPropertyValue('.flip-card-back', 'transform');
  const hasRotate = (ruleTransform && ruleTransform.includes('rotateY')) ||
                    findRuleContainingCSSText('.flip-card-back', 'rotateY');
  if (!hasRotate) {
    throw new Error(
      'The .flip-card-back does not have transform: rotateY(180deg).\n\n' +
      'In Step 6 Part B item 6, add a transform to the .flip-card-back rule\n' +
      'using rotateY() to pre-rotate it 180 degrees. The back face needs to\n' +
      'start flipped so it faces the right way when the card rotates on hover.'
    );
  }
});

// ============================================
// Step 7: Reduced Motion
// ============================================

test('A @media (prefers-reduced-motion: reduce) rule should exist with transition-duration', () => {
  const hasRule = findMediaRuleContaining('prefers-reduced-motion', 'transition-duration');
  if (!hasRule) {
    throw new Error(
      'No @media (prefers-reduced-motion: reduce) rule found with transition-duration.\n\n' +
      'In Step 7, add a @media (prefers-reduced-motion: reduce) block at the end\n' +
      'of your CSS. Inside it, target all elements (*, *::before, *::after) and set\n' +
      'transition-duration and animation-duration to nearly zero with !important.\n' +
      'This disables animations for users who prefer reduced motion.'
    );
  }
});
