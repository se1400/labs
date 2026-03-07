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
      'In Step 1, add a "nav a" rule with:\n' +
      '  transition: color 0.2s ease-out;\n\n' +
      'This animates the color change smoothly when users hover over nav links.'
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
      'In Step 2, add a transition to the existing .program-card rule:\n' +
      '  transition: transform 0.2s ease, box-shadow 0.2s ease;\n\n' +
      'This enables smooth animation when the card lifts on hover.'
    );
  }
});

test('The .program-card:hover rule should have transform: translateY(-6px)', () => {
  const transform = getCSSPropertyValue('.program-card:hover', 'transform');
  if (!transform || !transform.includes('translateY')) {
    throw new Error(
      'No transform found on the ".program-card:hover" rule.\n\n' +
      'In Step 2, add a new .program-card:hover rule with:\n' +
      '  transform: translateY(-6px);\n' +
      '  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n\n' +
      'translateY(-6px) lifts the card up 6 pixels on hover.'
    );
  }
});

test('The .program-card:hover rule should have an enhanced box-shadow', () => {
  const shadow = getCSSPropertyValue('.program-card:hover', 'box-shadow');
  if (!shadow) {
    throw new Error(
      'No box-shadow found on the ".program-card:hover" rule.\n\n' +
      'In Step 2, add box-shadow to the .program-card:hover rule:\n' +
      '  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n\n' +
      'This deeper shadow makes the card look like it\'s floating above the page.'
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
      'In Step 3, add to the existing #colleges figure rule:\n' +
      '  overflow: hidden;\n\n' +
      'This clips the zoomed image so it doesn\'t spill outside the frame.'
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
      'In Step 3, add to the existing #colleges figure img rule:\n' +
      '  transition: transform 0.4s ease;\n\n' +
      'This animates the zoom effect smoothly.'
    );
  }
});

test('The #colleges figure:hover img rule should have transform: scale(1.05)', () => {
  const transform = getCSSPropertyValue('#colleges figure:hover img', 'transform');
  if (!transform || !transform.includes('scale')) {
    throw new Error(
      'No transform: scale() found on "#colleges figure:hover img".\n\n' +
      'In Step 3, add a new rule:\n' +
      '#colleges figure:hover img {\n' +
      '    transform: scale(1.05);\n' +
      '}\n\n' +
      'scale(1.05) enlarges the image to 105% on hover.'
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
      'No transition found on the "button[type=\\"submit\\"]" rule.\n\n' +
      'In Step 4, add a transition to the existing button[type="submit"] rule:\n' +
      '  transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;\n\n' +
      'This transitions the background color, lift, and shadow smoothly.'
    );
  }
});

test('The button[type="submit"]:hover rule should have a transform with translateY', () => {
  const transform = getCSSPropertyValue('button[type="submit"]:hover', 'transform');
  if (!transform || !transform.includes('translateY')) {
    throw new Error(
      'No transform: translateY() found on "button[type=\\"submit\\"]:hover".\n\n' +
      'In Step 4, add to the existing button[type="submit"]:hover rule:\n' +
      '  transform: translateY(-3px);\n' +
      '  box-shadow: 0 4px 12px rgba(186, 28, 33, 0.4);\n\n' +
      'This lifts the button up 3 pixels on hover.'
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
      'In Step 5, add to the existing footer img rule:\n' +
      '  transition: transform 0.6s ease-in-out, filter 0.3s ease;\n\n' +
      'This animates both the spin and the grayscale-to-color effect.'
    );
  }
});

test('The footer img:hover rule should have transform: rotate(360deg)', () => {
  const transform = getCSSPropertyValue('footer img:hover', 'transform');
  if (!transform || !transform.includes('rotate')) {
    throw new Error(
      'No transform: rotate() found on "footer img:hover".\n\n' +
      'In Step 5, add to the existing footer img:hover rule:\n' +
      '  transform: rotate(360deg);\n\n' +
      'This spins the university seal one full revolution on hover.'
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
      'In Step 6, add the class "flip-card" to the featured program card div:\n' +
      '<div class="program-card flip-card featured">'
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
      'In Step 6, wrap the card content in this structure:\n' +
      '<div class="flip-card-inner">\n' +
      '    <div class="flip-card-front"><!-- front content --></div>\n' +
      '    <div class="flip-card-back"><!-- back content --></div>\n' +
      '</div>'
    );
  }
});

test('The .flip-card rule should have perspective set', () => {
  const perspective = getCSSPropertyValue('.flip-card', 'perspective');
  if (!perspective) {
    throw new Error(
      'No perspective found on the ".flip-card" rule.\n\n' +
      'In Step 6, add a .flip-card rule with:\n' +
      '  perspective: 800px;\n\n' +
      'This sets up the 3D viewing angle for the card flip.'
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
      'In Step 6, add to the .flip-card-inner rule:\n' +
      '  transform-style: preserve-3d;\n\n' +
      'Without this, the front and back faces are flattened into 2D and the flip won\'t work.'
    );
  }
});

test('The .flip-card-inner rule should have a transition on transform', () => {
  const hasTransition = findRuleContainingCSSText('.flip-card-inner', 'transition');
  if (!hasTransition) {
    throw new Error(
      'No transition found on the ".flip-card-inner" rule.\n\n' +
      'In Step 6, add to the .flip-card-inner rule:\n' +
      '  transition: transform 0.6s ease-in-out;\n\n' +
      'This animates the flip rotation smoothly.'
    );
  }
});

test('The .flip-card:hover .flip-card-inner rule should have transform: rotateY(180deg)', () => {
  const transform = getCSSPropertyValue('.flip-card:hover .flip-card-inner', 'transform');
  if (!transform || !transform.includes('rotateY')) {
    throw new Error(
      'No transform: rotateY(180deg) found on ".flip-card:hover .flip-card-inner".\n\n' +
      'In Step 6, add a hover rule:\n' +
      '.flip-card:hover .flip-card-inner {\n' +
      '    transform: rotateY(180deg);\n' +
      '}'
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
      'In Step 6, add to the .flip-card-front, .flip-card-back rule:\n' +
      '  backface-visibility: hidden;\n\n' +
      'This hides each face when it\'s rotated away from the viewer.'
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
      'In Step 6, add to the .flip-card-back rule:\n' +
      '  transform: rotateY(180deg);\n\n' +
      'This pre-rotates the back face so it appears correctly when the card flips.'
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
      'In Step 7, add at the end of your CSS:\n' +
      '@media (prefers-reduced-motion: reduce) {\n' +
      '    *, *::before, *::after {\n' +
      '        transition-duration: 0.01ms !important;\n' +
      '        animation-duration: 0.01ms !important;\n' +
      '    }\n' +
      '}\n\n' +
      'This disables animations for users who prefer reduced motion.'
    );
  }
});
