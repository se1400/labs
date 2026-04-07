// ============================================
// Helper Functions
// ============================================

// Recursively walk all CSS rules, descending into @layer blocks, @media, etc.
const walkAllRules = (callback) => {
  const recurse = (rules) => {
    for (let rule of rules) {
      callback(rule);
      if (rule.cssRules && rule.cssRules.length > 0) {
        recurse(rule.cssRules);
      }
    }
  };
  for (let sheet of document.styleSheets) {
    try {
      recurse(sheet.cssRules);
    } catch (e) {}
  }
};

// Find a @layer block rule by name (e.g., "base", "components")
const findLayerRule = (layerName) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        // CSSLayerBlockRule has a name property in modern browsers
        if (rule.cssText && rule.cssText.startsWith(`@layer ${layerName}`) &&
            rule.cssText.includes('{')) {
          return true;
        }
      }
    } catch (e) {}
  }
  return false;
};

// Find the @layer statement declaration (e.g., @layer base, components, forms, utilities;)
const findLayerStatement = (...expectedNames) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        const ct = rule.cssText || '';
        // Layer statement: starts with @layer but has no { (it's a declaration, not a block)
        if (ct.startsWith('@layer') && !ct.includes('{')) {
          if (expectedNames.every(name => ct.includes(name))) {
            return true;
          }
        }
      }
    } catch (e) {}
  }
  return false;
};

// Check if a parent rule (matched by selectorText substring) has nested child cssRules
// matching a nested selector substring. Searches recursively into @layer blocks.
const findNestedRule = (parentSelectorSubstring, nestedSelectorSubstring) => {
  let found = false;
  walkAllRules((rule) => {
    if (found) return;
    if (rule.selectorText && rule.selectorText.includes(parentSelectorSubstring)) {
      if (rule.cssRules && rule.cssRules.length > 0) {
        for (let child of rule.cssRules) {
          const sel = child.selectorText || '';
          const ct = child.cssText || '';
          if (sel.includes(nestedSelectorSubstring) || ct.includes(nestedSelectorSubstring)) {
            found = true;
            return;
          }
        }
      }
    }
  });
  return found;
};

// Check if a parent rule has ANY nested cssRules (child style rules)
const hasNestedRules = (parentSelectorSubstring) => {
  let found = false;
  walkAllRules((rule) => {
    if (found) return;
    if (rule.selectorText && rule.selectorText.includes(parentSelectorSubstring)) {
      if (rule.cssRules && rule.cssRules.length > 0) {
        // Check if any child is a style rule (not just @media, @layer, etc.)
        for (let child of rule.cssRules) {
          if (child.selectorText || (child.cssText && child.cssText.includes('{'))) {
            found = true;
            return;
          }
        }
      }
    }
  });
  return found;
};

// Find any rule whose selectorText contains the given substring (recursive)
const findSelectorContaining = (substring) => {
  let found = false;
  walkAllRules((rule) => {
    if (found) return;
    if (rule.selectorText && rule.selectorText.includes(substring)) {
      found = true;
    }
  });
  return found;
};

// Count how many distinct rules have selectorText containing the substring
const countSelectorsContaining = (substring) => {
  let count = 0;
  walkAllRules((rule) => {
    if (rule.selectorText && rule.selectorText.includes(substring)) {
      count++;
    }
  });
  return count;
};

// Find a @media rule matching the media substring, with recursive @layer descent.
// Optionally checks for inner rules matching selector and property substrings.
const normalizeConditionText = (ct) =>
  ct.replace(/\(width\s*>=\s*/g, '(min-width: ')
    .replace(/\(width\s*<=\s*/g, '(max-width: ');

const findMediaRule = (mediaSubstring, selectorSubstring, propertySubstring) => {
  let found = false;
  walkAllRules((rule) => {
    if (found) return;
    if (rule.type === CSSRule.MEDIA_RULE && rule.conditionText) {
      const normalized = normalizeConditionText(rule.conditionText);
      if (normalized.includes(mediaSubstring) || rule.conditionText.includes(mediaSubstring)) {
        if (!selectorSubstring && !propertySubstring) {
          found = true;
          return;
        }
        for (let innerRule of rule.cssRules) {
          const selectorMatch = !selectorSubstring ||
            (innerRule.selectorText && innerRule.selectorText.includes(selectorSubstring));
          if (!selectorMatch) continue;
          if (!propertySubstring) { found = true; return; }
          if (innerRule.cssText && innerRule.cssText.includes(propertySubstring)) {
            found = true; return;
          }
          if (innerRule.style) {
            const val = innerRule.style.getPropertyValue(propertySubstring);
            if (val && val.trim()) { found = true; return; }
          }
        }
      }
    }
  });
  return found;
};

// Get a CSS property value from any rule matching selectorText (recursive into @layer)
const getCSSPropertyValue = (selector, property) => {
  let result = null;
  walkAllRules((rule) => {
    if (rule.selectorText && rule.selectorText === selector) {
      const value = rule.style.getPropertyValue(property).trim();
      if (value) result = value;
    }
  });
  return result;
};

// Find any rule whose selectorText matches and whose cssText or style contains the property
const findRuleWithProperty = (selectorSubstring, propertySubstring) => {
  let found = false;
  walkAllRules((rule) => {
    if (found) return;
    if (rule.selectorText && rule.selectorText.includes(selectorSubstring)) {
      if (rule.cssText && rule.cssText.includes(propertySubstring)) {
        found = true;
      } else if (rule.style) {
        const val = rule.style.getPropertyValue(propertySubstring);
        if (val && val.trim()) found = true;
      }
    }
  });
  return found;
};


// ============================================
// Step 1: Cascade Layers (@layer)
// ============================================

test('Step 1a: Add a @layer declaration listing all four layers', () => {
  if (!findLayerStatement('base', 'components', 'forms', 'utilities')) {
    throw new Error(
      'No @layer declaration found listing all four layers.\n\n' +
      'At the very top of your CSS (before :root), add a layer order declaration:\n' +
      '@layer base, components, forms, utilities;\n\n' +
      'This tells the browser: base has the lowest priority, utilities the highest.\n' +
      'Any rule in a later layer beats a rule in an earlier layer, regardless of specificity.'
    );
  }
});

test('Step 1b: Wrap reset/typography/link styles in @layer base', () => {
  if (!findLayerRule('base')) {
    throw new Error(
      'No @layer base { ... } block found.\n\n' +
      'Wrap your reset, typography, and link styles in @layer base { ... }.\n' +
      'This includes: *, html, img, body, headings, link styles (a:link etc.),\n' +
      'skip-link, pre, address, video, ::selection, and the :root custom properties.'
    );
  }
});

test('Step 1c: Wrap card/nav/hero/footer styles in @layer components', () => {
  if (!findLayerRule('components')) {
    throw new Error(
      'No @layer components { ... } block found.\n\n' +
      'Wrap your component styles in @layer components { ... }.\n' +
      'This includes: header, menu-toggle, nav, hero, panels, programs-grid,\n' +
      'figure, program-card, flip-card, key-dates, footer, table, sidebar,\n' +
      'and placeholder styles.'
    );
  }
});

test('Step 1d: Wrap form styles in @layer forms', () => {
  if (!findLayerRule('forms')) {
    throw new Error(
      'No @layer forms { ... } block found.\n\n' +
      'Wrap your form-related styles in @layer forms { ... }.\n' +
      'This includes: form, .form-group, fieldset, legend, labels,\n' +
      'input/select/textarea styles, validation states, and the submit button.'
    );
  }
});


// ============================================
// Step 2: CSS Nesting
// ============================================

test('Step 2a: .program-card should have a nested &:hover rule', () => {
  // Check for nested :hover inside .program-card
  if (!findNestedRule('.program-card', ':hover') &&
      !findNestedRule('.program-card', '&:hover')) {
    throw new Error(
      'No nested :hover rule found inside .program-card.\n\n' +
      'Move the .program-card:hover styles inside the .program-card block:\n\n' +
      '.program-card {\n' +
      '    /* existing styles */\n\n' +
      '    &:hover {\n' +
      '        transform: translateY(-6px);\n' +
      '        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n' +
      '    }\n' +
      '}\n\n' +
      'The & represents the parent selector (.program-card), so &:hover\n' +
      'compiles to .program-card:hover.'
    );
  }
});

test('Step 2b: nav should have nested child rules', () => {
  if (!hasNestedRules('nav')) {
    throw new Error(
      'No nested rules found inside the nav block.\n\n' +
      'Move nav-related rules inside the nav block using & syntax:\n\n' +
      'nav {\n' +
      '    /* existing styles */\n\n' +
      '    &.nav-open { display: flex; }\n\n' +
      '    & a {\n' +
      '        position: relative;\n' +
      '        /* ... */\n\n' +
      '        &::after { /* underline styles */ }\n' +
      '        &:hover::after { /* hover underline */ }\n' +
      '    }\n' +
      '}\n\n' +
      'This keeps all nav styles co-located in one block.'
    );
  }
  // Verify the nested rule actually targets anchor elements correctly.
  // &:a is a common mistake — it creates an invalid pseudo-class instead of a descendant selector.
  const navLink = document.querySelector('nav a, #main-nav a');
  if (navLink) {
    const color = getComputedStyle(navLink).color;
    if (!color.includes('255, 255, 255')) {
      throw new Error(
        'Nav links exist but are not white — your nested selector is probably wrong.\n\n' +
        'Inside nav { }, use "& a" (ampersand, space, then a) to target links:\n\n' +
        'nav {\n' +
        '    & a { color: var(--ut-white); text-decoration: none; }\n' +
        '}\n\n' +
        '"&:a" is a common mistake — it creates an invalid pseudo-class (:a) instead\n' +
        'of a descendant selector. The browser drops the rule silently.'
      );
    }
  }
});

test('Step 2c: #colleges figure should have nested child rules', () => {
  if (!hasNestedRules('#colleges figure')) {
    throw new Error(
      'No nested rules found inside #colleges figure.\n\n' +
      'Move the image and hover styles inside the figure block:\n\n' +
      '#colleges figure {\n' +
      '    /* existing styles */\n\n' +
      '    & img {\n' +
      '        width: 100%;\n' +
      '        aspect-ratio: 16 / 9;\n' +
      '        /* ... */\n' +
      '    }\n\n' +
      '    &:hover img {\n' +
      '        transform: scale(1.05);\n' +
      '    }\n' +
      '}'
    );
  }
  // Verify the nested rule actually targets img correctly.
  // &:img is a common mistake — it creates an invalid pseudo-class instead of a descendant selector.
  const figImg = document.querySelector('#colleges figure img');
  if (figImg) {
    const ratio = getComputedStyle(figImg).aspectRatio;
    if (!ratio || ratio === 'auto') {
      throw new Error(
        'The img inside #colleges figure is missing its styles — your nested selector is probably wrong.\n\n' +
        'Inside #colleges figure { }, use "& img" (ampersand, space, then img):\n\n' +
        '#colleges figure {\n' +
        '    & img { width: 100%; aspect-ratio: 16 / 9; }\n' +
        '}\n\n' +
        '"&:img" is a common mistake — it creates an invalid pseudo-class (:img) instead\n' +
        'of a descendant selector. The browser drops the rule silently.'
      );
    }
  }
});

test('Step 2d: footer should have nested child rules', () => {
  if (!hasNestedRules('footer')) {
    throw new Error(
      'No nested rules found inside footer.\n\n' +
      'Move footer link and image styles inside the footer block:\n\n' +
      'footer {\n' +
      '    /* existing styles */\n\n' +
      '    & a:link, & a:visited { color: var(--ut-white); }\n' +
      '    & a:hover { color: hsl(0, 65%, 51%); }\n\n' +
      '    & img {\n' +
      '        filter: grayscale(100%);\n' +
      '        /* ... */\n\n' +
      '        &:hover {\n' +
      '            filter: grayscale(0%);\n' +
      '            transform: rotate(360deg);\n' +
      '        }\n' +
      '    }\n' +
      '}'
    );
  }
  // Verify the nested rule actually targets img correctly.
  // &img (no space) compiles to "footerimg" — an invalid element — instead of "footer img".
  const footerImg = document.querySelector('footer img');
  if (footerImg) {
    const filter = getComputedStyle(footerImg).filter;
    if (!filter || !filter.includes('grayscale')) {
      throw new Error(
        'The img inside footer is missing its filter style — your nested selector is probably wrong.\n\n' +
        'Inside footer { }, use "& img" (ampersand, space, then img):\n\n' +
        'footer {\n' +
        '    & img { filter: grayscale(100%); }\n' +
        '}\n\n' +
        '"&img" (no space) is a common mistake — it compiles to "footerimg", which is not\n' +
        'a valid element. The browser drops the rule silently.'
      );
    }
  }
});


// ============================================
// Step 3: :is() and :where()
// ============================================

test('Step 3a: :is() should be used in at least 2 selectors', () => {
  const count = countSelectorsContaining(':is(');
  if (count < 2) {
    throw new Error(
      `Found ${count} selector(s) using :is(), but at least 2 are expected.\n\n` +
      'Look for repetitive comma-separated selectors and consolidate with :is().\n\n' +
      'Examples:\n' +
      '  h2, h3, h4 { ... }  →  :is(h2, h3, h4) { ... }\n' +
      '  footer a:link, footer a:visited { ... }  →  footer :is(a:link, a:visited) { ... }\n' +
      '  .flip-card-front, .flip-card-back { ... }  →  :is(.flip-card-front, .flip-card-back) { ... }'
    );
  }
});

test('Step 3b: Use :is() for the heading color rule — :is(h2, h3, h4)', () => {
  // Check for a selector using :is() that contains all three heading levels.
  // The student may list them in any order, so check each one individually.
  let found = false;
  walkAllRules((rule) => {
    if (found) return;
    if (rule.selectorText &&
        rule.selectorText.includes(':is(') &&
        rule.selectorText.includes('h2') &&
        rule.selectorText.includes('h3') &&
        rule.selectorText.includes('h4')) {
      found = true;
    }
  });
  if (!found) {
    throw new Error(
      'No :is(h2, h3, h4) selector found.\n\n' +
      'Change the heading color rule from:\n' +
      '  h2, h3, h4 { ... }\n\n' +
      'To:\n' +
      '  :is(h2, h3, h4) { ... }\n\n' +
      ':is() matches any element in its list — same result, shorter selector.'
    );
  }
});

test('Step 3c: Use :is() to group placeholder selectors', () => {
  // Check for :is(input or :is(textarea combined with ::placeholder
  let found = false;
  walkAllRules((rule) => {
    if (found) return;
    if (rule.selectorText &&
        rule.selectorText.includes(':is(') &&
        rule.selectorText.includes('::placeholder')) {
      found = true;
    }
  });
  if (!found) {
    throw new Error(
      'No :is() grouping found for placeholder selectors.\n\n' +
      'Change:\n' +
      '  input::placeholder, textarea::placeholder { ... }\n\n' +
      'To:\n' +
      '  :is(input, textarea)::placeholder { ... }\n\n' +
      ':is() lets you apply the same pseudo-element to multiple selectors at once.'
    );
  }
});

test('Step 3d: :where() should be used in at least one selector', () => {
  if (!findSelectorContaining(':where(')) {
    throw new Error(
      'No :where() selector found.\n\n' +
      ':where() works exactly like :is() but has zero specificity — any other\n' +
      'selector can override it. This makes it perfect for base/reset styles.\n\n' +
      'Try converting your base link styles to use :where():\n' +
      '  :where(a:link) { color: var(--ut-red); }\n' +
      '  :where(a:visited) { color: #8B1518; }\n\n' +
      'Now any component (nav, footer) can override link colors without\n' +
      'specificity battles.'
    );
  }
});


// ============================================
// Step 4: :has() Relational Pseudo-class
// ============================================

test('Step 4a: Add a figure:has(figcaption) rule', () => {
  if (!findSelectorContaining('figure:has(figcaption')) {
    throw new Error(
      'No figure:has(figcaption) rule found.\n\n' +
      'Add a rule that styles figures differently when they contain a caption:\n\n' +
      'figure:has(figcaption) {\n' +
      '    border-bottom: 2px solid var(--ut-red);\n' +
      '    padding-bottom: 0;\n' +
      '}\n\n' +
      ':has() lets you style a parent based on whether it contains specific children.\n' +
      'Before :has(), this required JavaScript.'
    );
  }
});

test('Step 4b: Add a .form-group:has(:focus) rule', () => {
  // Check for both standalone .form-group:has(:focus) and nested &:has(:focus) inside .form-group
  const standaloneFound = findSelectorContaining('.form-group:has(');
  const nestedFound = findNestedRule('.form-group', ':has(');
  if (!standaloneFound && !nestedFound) {
    throw new Error(
      'No .form-group:has() rule found.\n\n' +
      'Add a rule that highlights the entire form group when any input is focused:\n\n' +
      '.form-group:has(:focus) {\n' +
      '    background-color: var(--ut-panel-gray);\n' +
      '    border-radius: 0.25rem;\n' +
      '    padding: 0.5rem;\n' +
      '}\n\n' +
      'This provides visual feedback showing which field the user is editing.\n' +
      'Tip: If using CSS nesting, put this inside the .form-group block with &:has(:focus).'
    );
  }
});

test('Step 4c: Add a form:has(:invalid) rule', () => {
  // Check for both standalone form:has(:invalid) and nested &:has(:invalid) inside form
  const standaloneFound = findSelectorContaining('form:has(:invalid');
  const nestedFound = findNestedRule('form', ':has(:invalid');
  if (!standaloneFound && !nestedFound) {
    throw new Error(
      'No form:has(:invalid) rule found.\n\n' +
      'Add a rule that marks the form when it contains invalid inputs:\n\n' +
      'form:has(:invalid) {\n' +
      '    border-left: 3px solid var(--ut-red);\n' +
      '    padding-left: 1rem;\n' +
      '}\n\n' +
      'This gives users a visual cue that the form has validation errors.\n' +
      'Tip: If using CSS nesting, you can put this inside the form block with &:has(:invalid).'
    );
  }
});

test('Step 4d: At least 3 rules should use :has()', () => {
  const count = countSelectorsContaining(':has(');
  if (count < 3) {
    throw new Error(
      `Found ${count} selector(s) using :has(), but at least 3 are expected.\n\n` +
      'The three required :has() rules are:\n' +
      '  1. figure:has(figcaption) — style figures with captions\n' +
      '  2. .form-group:has(:focus) — highlight focused form groups\n' +
      '  3. form:has(:invalid) — mark forms with validation errors\n\n' +
      'You can also add more :has() rules for bonus practice!'
    );
  }
});


// ============================================
// Step 5: Dark Mode
// ============================================

test('Step 5a: Define semantic custom properties on :root (--color-bg)', () => {
  const value = getCSSPropertyValue(':root', '--color-bg');
  if (!value) {
    throw new Error(
      'No --color-bg custom property found on :root.\n\n' +
      'Add semantic color tokens to your :root rule:\n\n' +
      ':root {\n' +
      '    /* ...existing brand tokens... */\n\n' +
      '    /* Semantic tokens (light mode defaults) */\n' +
      '    --color-bg: #ffffff;\n' +
      '    --color-surface: #f7f7f7;\n' +
      '    --color-text: #003058;\n' +
      '    --color-text-muted: #555;\n' +
      '    --color-border: #f2f2f2;\n' +
      '    --color-accent: #BA1C21;\n' +
      '    --color-accent-hover: #8B1518;\n' +
      '}\n\n' +
      'These tokens are the colors your components use. Dark mode will override them.'
    );
  }
});

test('Step 5b: Add a @media (prefers-color-scheme: dark) query', () => {
  if (!findMediaRule('prefers-color-scheme')) {
    throw new Error(
      'No @media (prefers-color-scheme: dark) query found.\n\n' +
      'Add a media query that activates when the user has dark mode enabled:\n\n' +
      '@media (prefers-color-scheme: dark) {\n' +
      '    :root {\n' +
      '        --color-bg: #0f172a;\n' +
      '        --color-surface: #1e293b;\n' +
      '        --color-text: #f1f5f9;\n' +
      '        /* ...other dark values... */\n' +
      '    }\n' +
      '}\n\n' +
      'Place this outside any @layer block — custom properties on :root\n' +
      'cascade naturally regardless of layers.'
    );
  }
});

test('Step 5c: The dark mode query should redefine --color-bg and --color-text on :root', () => {
  let bgFound = false;
  let textFound = false;
  let textValue = '';
  walkAllRules((rule) => {
    if (rule.type === CSSRule.MEDIA_RULE && rule.conditionText &&
        rule.conditionText.includes('prefers-color-scheme')) {
      for (let inner of rule.cssRules) {
        if (inner.selectorText === ':root' && inner.style) {
          const bg = inner.style.getPropertyValue('--color-bg').trim();
          if (bg) bgFound = true;
          const text = inner.style.getPropertyValue('--color-text').trim();
          if (text) { textFound = true; textValue = text; }
        }
      }
    }
  });
  if (!bgFound) {
    throw new Error(
      'The dark mode media query does not redefine --color-bg on :root.\n\n' +
      'Inside your @media (prefers-color-scheme: dark) block,\n' +
      'add a :root rule that overrides your semantic tokens:\n\n' +
      '@media (prefers-color-scheme: dark) {\n' +
      '    :root {\n' +
      '        --color-bg: #0f172a;        /* dark background */\n' +
      '        --color-surface: #1e293b;   /* dark surface */\n' +
      '        --color-text: #f1f5f9;      /* light text */\n' +
      '        --color-text-muted: #94a3b8;\n' +
      '        --color-border: #334155;\n' +
      '        --color-accent: #e2434b;    /* brighter red for dark */\n' +
      '        --color-accent-hover: #c7363d;\n' +
      '    }\n' +
      '}'
    );
  }
  if (!textFound) {
    throw new Error(
      'The dark mode media query does not redefine --color-text on :root.\n\n' +
      'Make sure your dark mode :root block includes --color-text:\n\n' +
      '@media (prefers-color-scheme: dark) {\n' +
      '    :root {\n' +
      '        --color-text: #f1f5f9;  /* light text for dark background */\n' +
      '    }\n' +
      '}'
    );
  }
  // Validate hex length — catches typos like #f1f5ff9 (7 digits instead of 6)
  if (textValue.startsWith('#')) {
    const hex = textValue.slice(1);
    if (![3, 4, 6, 8].includes(hex.length) || !/^[0-9a-fA-F]+$/.test(hex)) {
      throw new Error(
        `--color-text value "${textValue}" is not a valid hex color.\n\n` +
        'A hex color needs exactly 3 or 6 hex digits after the #:\n' +
        '  #f1f5f9   \u2190 6 digits, correct\n' +
        '  #f1f5ff9  \u2190 7 digits, invalid \u2014 check for a typo\n\n' +
        'Fix: --color-text: #f1f5f9;'
      );
    }
  }
});

test('Step 5d: Dark mode header background override', () => {
  let found = false;
  walkAllRules((rule) => {
    if (found) return;
    if (rule.type === CSSRule.MEDIA_RULE && rule.conditionText &&
        rule.conditionText.includes('prefers-color-scheme')) {
      for (let inner of rule.cssRules) {
        if (inner.selectorText === 'header' && inner.cssText &&
            inner.cssText.includes('gradient')) {
          found = true;
        }
      }
    }
  });
  if (!found) {
    throw new Error(
      'No dark mode header background override found.\n\n' +
      'The header\'s light gradient (#fff to #eee) looks wrong on a dark page.\n' +
      'Inside your @media (prefers-color-scheme: dark) block, add:\n\n' +
      'header {\n' +
      '    background: radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 70%);\n' +
      '}\n\n' +
      'This gives the header a dark gradient that matches the page background.'
    );
  }
});

test('Step 5e: Dark mode logo filter (white logo)', () => {
  let found = false;
  walkAllRules((rule) => {
    if (found) return;
    if (rule.type === CSSRule.MEDIA_RULE && rule.conditionText &&
        rule.conditionText.includes('prefers-color-scheme')) {
      for (let inner of rule.cssRules) {
        if (inner.selectorText && inner.selectorText.includes('header') &&
            inner.selectorText.includes('img') && inner.cssText &&
            inner.cssText.includes('filter')) {
          found = true;
        }
      }
    }
  });
  if (!found) {
    throw new Error(
      'No dark mode logo filter found.\n\n' +
      'The logo has dark blue (#003058) that is invisible on dark backgrounds.\n' +
      'The Utah Tech brand guide approves white logos on dark backgrounds.\n' +
      'Inside your dark mode media query, add:\n\n' +
      'header img {\n' +
      '    filter: brightness(0) invert(1);\n' +
      '}\n\n' +
      'This turns the logo white, making it visible on the dark header.'
    );
  }
});

test('Step 5f: Dark mode h1 gradient override', () => {
  let found = false;
  walkAllRules((rule) => {
    if (found) return;
    if (rule.type === CSSRule.MEDIA_RULE && rule.conditionText &&
        rule.conditionText.includes('prefers-color-scheme')) {
      for (let inner of rule.cssRules) {
        if (inner.selectorText === 'h1' && inner.cssText &&
            inner.cssText.includes('gradient') &&
            (inner.cssText.includes('background-clip') || inner.cssText.includes('transparent'))) {
          found = true;
        }
      }
    }
  });
  if (!found) {
    throw new Error(
      'No dark mode h1 gradient override found (or missing background-clip).\n\n' +
      'The h1 gradient uses --ut-navy (dark blue) which is invisible on dark backgrounds.\n' +
      'Inside your dark mode media query, add:\n\n' +
      'h1 {\n' +
      '    background: linear-gradient(to right, #94b8d8, var(--color-accent));\n' +
      '    -webkit-background-clip: text;\n' +
      '    background-clip: text;\n' +
      '    color: transparent;\n' +
      '}\n\n' +
      'The background shorthand resets background-clip, so you must repeat it.\n' +
      'The light blue to red gradient keeps the brand blue/red feel.'
    );
  }
});

test('Step 5g: Dark mode form input background', () => {
  let found = false;
  walkAllRules((rule) => {
    if (found) return;
    if (rule.type === CSSRule.MEDIA_RULE && rule.conditionText &&
        rule.conditionText.includes('prefers-color-scheme')) {
      for (let inner of rule.cssRules) {
        if (inner.selectorText && inner.cssText &&
            (inner.selectorText.includes('input') || inner.selectorText.includes('textarea') || inner.selectorText.includes('select')) &&
            (inner.cssText.includes('background-color') || inner.cssText.includes('background:'))) {
          found = true;
        }
      }
    }
  });
  if (!found) {
    throw new Error(
      'No dark mode form input background found.\n\n' +
      'Browser defaults make form inputs white, which is jarring in dark mode.\n' +
      'Inside your dark mode media query (NOT inside a @layer), add:\n\n' +
      'input:not([type="radio"]):not([type="checkbox"]),\n' +
      'select,\n' +
      'textarea {\n' +
      '    background-color: var(--color-surface);\n' +
      '    color: var(--color-text);\n' +
      '}\n\n' +
      'This rule must be in the unlayered dark mode block to override browser defaults.'
    );
  }
});

test('Step 5h: The body background should use a semantic custom property', () => {
  let found = false;
  walkAllRules((rule) => {
    if (found) return;
    if (rule.selectorText === 'body' && rule.cssText) {
      if (rule.cssText.includes('var(--color-')) {
        found = true;
      }
    }
  });
  if (!found) {
    throw new Error(
      'The body does not use a semantic custom property for its background.\n\n' +
      'Replace hardcoded color values in the body rule with your semantic tokens:\n\n' +
      'body {\n' +
      '    color: var(--color-text);\n' +
      '    background-color: var(--color-bg);\n' +
      '    /* ...other properties... */\n' +
      '}\n\n' +
      'When dark mode activates, --color-bg and --color-text automatically switch\n' +
      'to their dark values — no extra CSS needed for each component.'
    );
  }
});
