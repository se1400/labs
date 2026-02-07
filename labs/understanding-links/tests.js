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
          const normalizedPropValue = propValue.replace(/\s/g, '').toLowerCase();
          const normalizedValue = String(value).replace(/\s/g, '').toLowerCase();
          if (normalizedPropValue === normalizedValue) {
            return true;
          }
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
          // Handle text-decoration shorthand expansion
          if (property === 'text-decoration' && normalizedValue === 'none') {
            const lineValue = rule.style.getPropertyValue('text-decoration-line').replace(/\s/g, '').toLowerCase();
            if (lineValue === 'none') {
              return true;
            }
          }
          if (property === 'text-decoration' && normalizedValue === 'underline') {
            const lineValue = rule.style.getPropertyValue('text-decoration-line').replace(/\s/g, '').toLowerCase();
            if (lineValue === 'underline') {
              return true;
            }
          }
        }
      }
    } catch (e) {}
  }
  return false;
};

// ============================================
// Part 1: Navigation Anchor Links
// ============================================

test('Step 1: The nav should contain anchor links', () => {
  const nav = document.querySelector('nav');
  if (!nav) {
    throw new Error('Could not find a <nav> element on the page.');
  }

  const links = nav.querySelectorAll('a');
  if (links.length === 0) {
    throw new Error(
      'The nav has no links yet.\n\n' +
      'Replace each plain text item (Home, Admissions, etc.) with an <a> element.\n' +
      'Remember: anchor links use href="#id" to point to a section on the page.'
    );
  }

  if (links.length < 5) {
    throw new Error(
      `Found ${links.length} links in the nav, but there should be 5 (one for each section).\n\n` +
      'Make sure each nav item (Home, Admissions, Academics, Tuition, Campus Life) is wrapped in its own <a> element.'
    );
  }

  expect(links.length).toBeGreaterThanOrEqual(5);
});

test('Step 1: The nav links should use anchor hrefs (#) pointing to section ids', () => {
  const nav = document.querySelector('nav');
  if (!nav) {
    throw new Error('Could not find a <nav> element on the page.');
  }

  const links = nav.querySelectorAll('a');
  if (links.length === 0) {
    throw new Error('First add links to the nav (see previous test).');
  }

  const hrefs = Array.from(links).map(link => link.getAttribute('href'));
  const expectedIds = ['#welcome', '#apply', '#colleges', '#tuition', '#visit'];
  const missing = expectedIds.filter(id => !hrefs.includes(id));

  if (missing.length > 0) {
    throw new Error(
      `Missing anchor links: ${missing.join(', ')}\n\n` +
      'Found these hrefs: ' + hrefs.join(', ') + '\n\n' +
      'Check the mapping:\n' +
      '- Home → #welcome\n' +
      '- Admissions → #apply\n' +
      '- Academics → #colleges\n' +
      '- Tuition → #tuition\n' +
      '- Campus Life → #visit'
    );
  }

  expect(missing.length).toBe(0);
});

// ============================================
// Part 2: External Links
// ============================================

test('Step 2: The word "online" in "How to Apply" should be a link to utahtech.edu/admissions/', () => {
  const applySection = document.querySelector('#apply');
  if (!applySection) {
    throw new Error('Could not find the section with id="apply".');
  }

  const link = applySection.querySelector('a[href*="utahtech.edu/admissions"]');
  if (!link) {
    throw new Error(
      'No link to utahtech.edu/admissions found in the "How to Apply" section.\n\n' +
      'Find "Submit your application online" and wrap the word "online" in an <a> element.\n' +
      'The href should be: https://utahtech.edu/admissions/'
    );
  }

  // Check that only the word "online" is wrapped, not the whole sentence
  const linkText = link.textContent.trim().toLowerCase();
  if (linkText.includes('submit') || linkText.includes('application')) {
    throw new Error(
      'It looks like you wrapped more than just the word "online" in the link.\n\n' +
      'Only the word "online" should be inside the <a> element. The rest of the sentence stays as plain text.'
    );
  }

  expect(link).toBeTruthy();
});

test('Step 2: The admissions link should open in a new tab with target="_blank"', () => {
  const applySection = document.querySelector('#apply');
  if (!applySection) {
    throw new Error('Could not find the section with id="apply".');
  }

  const link = applySection.querySelector('a[href*="utahtech.edu/admissions"]');
  if (!link) {
    throw new Error('First add the admissions link (see previous test).');
  }

  const target = link.getAttribute('target');
  if (target !== '_blank') {
    throw new Error(
      'The admissions link is missing target="_blank".\n\n' +
      'Since this links to an external site, add target="_blank" so it opens in a new tab.'
    );
  }

  expect(target).toBe('_blank');
});

test('Step 2: The admissions link should have rel="noopener noreferrer" for security', () => {
  const applySection = document.querySelector('#apply');
  if (!applySection) {
    throw new Error('Could not find the section with id="apply".');
  }

  const link = applySection.querySelector('a[href*="utahtech.edu/admissions"]');
  if (!link) {
    throw new Error('First add the admissions link (see previous test).');
  }

  const rel = (link.getAttribute('rel') || '').toLowerCase();
  if (!rel.includes('noopener') || !rel.includes('noreferrer')) {
    throw new Error(
      'The admissions link is missing rel="noopener noreferrer".\n\n' +
      'Any time you use target="_blank", you should also add rel="noopener noreferrer" for security.\n' +
      'This prevents the new tab from accessing your page.'
    );
  }

  expect(rel).toContain('noopener');
  expect(rel).toContain('noreferrer');
});

test('Step 3: The word "FAFSA" should be a link to studentaid.gov', () => {
  const applySection = document.querySelector('#apply');
  if (!applySection) {
    throw new Error('Could not find the section with id="apply".');
  }

  const link = applySection.querySelector('a[href*="studentaid.gov"]');
  if (!link) {
    throw new Error(
      'No link to studentaid.gov found in the "How to Apply" section.\n\n' +
      'Find "Complete the FAFSA for financial aid" and wrap just the word "FAFSA" in an <a> element.\n' +
      'The href should be: https://studentaid.gov/'
    );
  }

  // Check that only "FAFSA" is wrapped, not the whole sentence
  const linkText = link.textContent.trim().toLowerCase();
  if (linkText.includes('complete') || linkText.includes('financial')) {
    throw new Error(
      'It looks like you wrapped more than just the word "FAFSA" in the link.\n\n' +
      'Only the word "FAFSA" should be inside the <a> element. The rest of the sentence stays as plain text.'
    );
  }

  expect(link).toBeTruthy();
});

test('Step 3: The FAFSA link should open in a new tab with proper attributes', () => {
  const applySection = document.querySelector('#apply');
  if (!applySection) {
    throw new Error('Could not find the section with id="apply".');
  }

  const link = applySection.querySelector('a[href*="studentaid.gov"]');
  if (!link) {
    throw new Error('First add the FAFSA link (see previous test).');
  }

  const target = link.getAttribute('target');
  const rel = (link.getAttribute('rel') || '').toLowerCase();

  if (target !== '_blank') {
    throw new Error(
      'The FAFSA link is missing target="_blank".\n\n' +
      'This is an external link, so add target="_blank" just like you did for the admissions link.'
    );
  }

  if (!rel.includes('noopener') || !rel.includes('noreferrer')) {
    throw new Error(
      'The FAFSA link is missing rel="noopener noreferrer".\n\n' +
      'Remember: always add rel="noopener noreferrer" when using target="_blank".'
    );
  }

  expect(target).toBe('_blank');
  expect(rel).toContain('noopener');
});

// ============================================
// Part 3: Telephone Link
// ============================================

test('Step 4: The phone number should be wrapped in a tel: link', () => {
  const aside = document.querySelector('#visit');
  if (!aside) {
    throw new Error('Could not find the aside with id="visit".');
  }

  const link = aside.querySelector('a[href^="tel:"]');
  if (!link) {
    throw new Error(
      'No telephone link found in the "Visit Campus" aside.\n\n' +
      'Wrap the phone number (435) 652-7500 in an <a> element.\n' +
      'The href should use tel: followed by the number in international format (no spaces, dashes, or parentheses).'
    );
  }

  // Strip non-digit characters from the href to compare the number
  const href = link.getAttribute('href');
  const digitsOnly = href.replace(/\D/g, '');
  if (!digitsOnly.includes('4356527500')) {
    throw new Error(
      `The tel: link has href="${href}" but doesn't contain the correct phone number.\n\n` +
      'The phone number in the href should be: +14356527500\n' +
      'Use international format: +1 followed by the 10-digit number, with no spaces, dashes, or parentheses.'
    );
  }

  expect(link).toBeTruthy();
});

// ============================================
// Part 4: Email Link
// ============================================

test('Step 5: The "Visit Campus" aside should have a mailto link', () => {
  const aside = document.querySelector('#visit');
  if (!aside) {
    throw new Error('Could not find the aside with id="visit".');
  }

  const link = aside.querySelector('a[href^="mailto:"]');
  if (!link) {
    throw new Error(
      'No email link found in the "Visit Campus" aside.\n\n' +
      'Add a new line after the phone number with an email link.\n' +
      'Use mailto: in the href, followed by the email address and a ?subject= parameter.'
    );
  }

  expect(link).toBeTruthy();
});

test('Step 5: The email link should point to admissions@utahtech.edu with a subject', () => {
  const aside = document.querySelector('#visit');
  if (!aside) {
    throw new Error('Could not find the aside with id="visit".');
  }

  const link = aside.querySelector('a[href^="mailto:"]');
  if (!link) {
    throw new Error('First add a mailto link (see previous test).');
  }

  const href = link.getAttribute('href').toLowerCase();
  if (!href.includes('admissions@utahtech.edu')) {
    throw new Error(
      'The email link should point to admissions@utahtech.edu.\n\n' +
      'Make sure the href starts with mailto: followed by the email address:\n' +
      'mailto:admissions@utahtech.edu'
    );
  }

  if (!href.includes('subject=')) {
    throw new Error(
      'The email link is missing a subject parameter.\n\n' +
      'Add ?subject= after the email address to pre-fill the subject line.\n' +
      'For example: mailto:admissions@utahtech.edu?subject=Campus Tour Question'
    );
  }

  expect(href).toContain('admissions@utahtech.edu');
  expect(href).toContain('subject=');
});

// ============================================
// Part 5: Back to Top Link
// ============================================

test('Step 6: The header should have id="top"', () => {
  const header = document.querySelector('header');
  if (!header) {
    throw new Error('Could not find a <header> element on the page.');
  }

  if (header.id !== 'top') {
    throw new Error(
      'The header is missing id="top".\n\n' +
      'Add an id attribute to the <header> element so the "Back to Top" link has something to point to.'
    );
  }

  expect(header.id).toBe('top');
});

test('Step 7: The footer should have a "Back to Top" link pointing to #top', () => {
  const footer = document.querySelector('footer');
  if (!footer) {
    throw new Error('Could not find a <footer> element on the page.');
  }

  const link = footer.querySelector('a[href="#top"]');
  if (!link) {
    // Check if they have a link but wrong href
    const anyLink = footer.querySelector('a');
    if (anyLink) {
      throw new Error(
        `Found a link in the footer with href="${anyLink.getAttribute('href')}", but it should point to #top.\n\n` +
        'This is an anchor link, just like the nav links from Part 1. Use href="#top" to point to the header.'
      );
    }

    throw new Error(
      'No "Back to Top" link found in the footer.\n\n' +
      'Add an anchor link after the <address> element with the text "Back to Top".\n' +
      'It should point to the id you added to the header in Step 6.'
    );
  }

  expect(link).toBeTruthy();
});

// ============================================
// Part 6: CSS Link Styling
// ============================================

test('Step 8: CSS should have an a:link rule with color #BA1C21', () => {
  if (!findCSSRule('a:link', 'color', '#BA1C21')) {
    throw new Error(
      'Missing CSS rule for a:link.\n\n' +
      'This is the first rule in the LoVe HAte order.\n' +
      'Add a:link { color: #BA1C21; } to your CSS file.'
    );
  }

  expect(findCSSRule('a:link', 'color', '#BA1C21')).toBe(true);
});

test('Step 8: CSS should have an a:visited rule with color #8B1518', () => {
  if (!findCSSRule('a:visited', 'color', '#8B1518')) {
    throw new Error(
      'Missing CSS rule for a:visited.\n\n' +
      'This is the second rule in the LoVe HAte order (after a:link).\n' +
      'Add a:visited { color: #8B1518; } to your CSS file.'
    );
  }

  expect(findCSSRule('a:visited', 'color', '#8B1518')).toBe(true);
});

test('Step 8: CSS should have an a:hover rule with color #D32F2F', () => {
  if (!findCSSRule('a:hover', 'color', '#D32F2F')) {
    throw new Error(
      'Missing CSS rule for a:hover.\n\n' +
      'This is the third rule in the LoVe HAte order (after a:visited).\n' +
      'Add a:hover { color: #D32F2F; } to your CSS file.'
    );
  }

  expect(findCSSRule('a:hover', 'color', '#D32F2F')).toBe(true);
});

test('Step 8: CSS should have an a:active rule with color #003058', () => {
  if (!findCSSRule('a:active', 'color', '#003058')) {
    throw new Error(
      'Missing CSS rule for a:active.\n\n' +
      'This is the fourth and last rule in the LoVe HAte order (after a:hover).\n' +
      'Add a:active { color: #003058; } to your CSS file.'
    );
  }

  expect(findCSSRule('a:active', 'color', '#003058')).toBe(true);
});

// ============================================
// Part 7: Nav Link Styling
// ============================================

test('Step 9: CSS should have a "nav a" rule with color #ffffff', () => {
  if (!findCSSRule('nav a', 'color', '#ffffff')) {
    throw new Error(
      'Missing CSS rule for nav a.\n\n' +
      'The nav links need to be white so they are visible on the dark background.\n' +
      'Use the descendant selector "nav a" to target only links inside the nav.'
    );
  }

  expect(findCSSRule('nav a', 'color', '#ffffff')).toBe(true);
});

test('Step 9: CSS should have a "nav a" rule with text-decoration none', () => {
  if (!findCSSRule('nav a', 'text-decoration', 'none')) {
    throw new Error(
      'The nav a rule is missing text-decoration: none.\n\n' +
      'Add text-decoration: none to your nav a rule to remove the default underline from nav links.'
    );
  }

  expect(findCSSRule('nav a', 'text-decoration', 'none')).toBe(true);
});

test('Step 10: CSS should have a "nav a:hover" rule with text-decoration underline', () => {
  if (!findCSSRule('nav a:hover', 'text-decoration', 'underline')) {
    throw new Error(
      'Missing CSS rule for nav a:hover.\n\n' +
      'Add a nav a:hover rule that sets text-decoration to underline.\n' +
      'This shows an underline only when hovering over a nav link.'
    );
  }

  expect(findCSSRule('nav a:hover', 'text-decoration', 'underline')).toBe(true);
});

// ============================================
// Part 8: Skip Link (Accessibility)
// ============================================

test('Step 11: The main element should have id="main-content"', () => {
  const main = document.querySelector('main');
  if (!main) {
    throw new Error('Could not find a <main> element on the page.');
  }

  if (main.id !== 'main-content') {
    throw new Error(
      'The main element is missing id="main-content".\n\n' +
      'Add an id attribute to the <main> element so the skip link has a target to jump to.'
    );
  }

  expect(main.id).toBe('main-content');
});

test('Step 12: A skip link should exist with class "skip-link" pointing to #main-content', () => {
  const skipLink = document.querySelector('a.skip-link');
  if (!skipLink) {
    throw new Error(
      'No skip link found.\n\n' +
      'Add an <a> element as the very first thing inside <body> (before the header).\n' +
      'Give it class="skip-link" and point its href to #main-content.\n' +
      'The link text should be "Skip to main content".'
    );
  }

  const href = skipLink.getAttribute('href');
  if (href !== '#main-content') {
    throw new Error(
      `The skip link has href="${href}" but should point to #main-content.\n\n` +
      'The skip link needs to jump to the <main> element you gave id="main-content" in Step 11.'
    );
  }

  expect(skipLink).toBeTruthy();
});

test('Step 13: CSS should have a .skip-link rule with position absolute', () => {
  if (!findCSSRule('.skip-link', 'position', 'absolute')) {
    throw new Error(
      'Missing CSS rule for .skip-link.\n\n' +
      'Add a .skip-link rule with position: absolute so you can move it off-screen.'
    );
  }

  expect(findCSSRule('.skip-link', 'position', 'absolute')).toBe(true);
});

test('Step 13: CSS .skip-link should have left: -9999px to hide it off-screen', () => {
  if (!findCSSRule('.skip-link', 'left', '-9999px')) {
    throw new Error(
      'The .skip-link rule is missing left: -9999px.\n\n' +
      'This moves the link far off the left side of the screen so it is hidden.\n' +
      'It will still be in the HTML for keyboard users to Tab to.'
    );
  }

  expect(findCSSRule('.skip-link', 'left', '-9999px')).toBe(true);
});

test('Step 14: CSS should have a .skip-link:focus rule that brings it on screen', () => {
  let hasLeft = false;
  let hasBackground = false;

  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText === '.skip-link:focus') {
          const left = rule.style.getPropertyValue('left');
          if (left === '0' || left === '0px') {
            hasLeft = true;
          }
          const bg = rule.style.getPropertyValue('background');
          const bgColor = rule.style.getPropertyValue('background-color');
          if (bg || bgColor) {
            hasBackground = true;
          }
        }
      }
    } catch (e) {}
  }

  if (!hasLeft) {
    throw new Error(
      'Missing or incomplete .skip-link:focus rule.\n\n' +
      'Add a .skip-link:focus rule that sets left: 0 to bring the link back on screen when focused.\n' +
      'Also set top: 0, a background color, text color, padding, and z-index as described in the instructions.'
    );
  }

  if (!hasBackground) {
    throw new Error(
      'The .skip-link:focus rule needs a background color so it is visible when it appears.\n\n' +
      'Add a background property (e.g., background: #003058) to the .skip-link:focus rule.'
    );
  }

  expect(hasLeft).toBe(true);
  expect(hasBackground).toBe(true);
});

// ============================================
// Part 9: Smooth Scrolling
// ============================================

test('Step 15: CSS should have an html rule with scroll-behavior: smooth', () => {
  if (!findCSSRule('html', 'scroll-behavior', 'smooth')) {
    throw new Error(
      'Missing smooth scrolling CSS.\n\n' +
      'Add an html selector to your CSS file and set the scroll-behavior property to smooth.'
    );
  }

  expect(findCSSRule('html', 'scroll-behavior', 'smooth')).toBe(true);
});
