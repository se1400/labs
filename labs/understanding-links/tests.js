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
      'The nav has no links. Replace the plain text with <a> elements.\n\n' +
      'Change this:\n' +
      'Home | Admissions | Academics | Tuition | Campus Life\n\n' +
      'To this:\n' +
      '<a href="#welcome">Home</a> | <a href="#apply">Admissions</a> | <a href="#colleges">Academics</a> | <a href="#tuition">Tuition</a> | <a href="#visit">Campus Life</a>'
    );
  }

  if (links.length < 5) {
    throw new Error(
      `Found ${links.length} links in the nav, but need 5.\n\n` +
      'Each nav item should be an <a> element:\n' +
      '<a href="#welcome">Home</a> | <a href="#apply">Admissions</a> | <a href="#colleges">Academics</a> | <a href="#tuition">Tuition</a> | <a href="#visit">Campus Life</a>'
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
      'Each link should point to a section id. Found hrefs: ' + hrefs.join(', ') + '\n\n' +
      'Expected:\n' +
      '<a href="#welcome">Home</a> | <a href="#apply">Admissions</a> | <a href="#colleges">Academics</a> | <a href="#tuition">Tuition</a> | <a href="#visit">Campus Life</a>'
    );
  }

  expect(missing.length).toBe(0);
});

// ============================================
// Part 2: External Links
// ============================================

test('Step 2: The "online" text in "How to Apply" should be a link to utahtech.edu/admissions/', () => {
  const applySection = document.querySelector('#apply');
  if (!applySection) {
    throw new Error('Could not find the section with id="apply".');
  }

  const link = applySection.querySelector('a[href*="utahtech.edu/admissions"]');
  if (!link) {
    throw new Error(
      'No link to utahtech.edu/admissions found in the "How to Apply" section.\n\n' +
      'Wrap "online" in a link:\n' +
      '<a href="https://utahtech.edu/admissions/" target="_blank" rel="noopener noreferrer">online</a>'
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
      'Add target="_blank" to open the link in a new tab:\n' +
      '<a href="https://utahtech.edu/admissions/" target="_blank" rel="noopener noreferrer">online</a>'
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
      'This attribute prevents the new tab from accessing your page (a security best practice):\n' +
      '<a href="https://utahtech.edu/admissions/" target="_blank" rel="noopener noreferrer">online</a>'
    );
  }

  expect(rel).toContain('noopener');
  expect(rel).toContain('noreferrer');
});

test('Step 3: The "FAFSA" text should be a link to studentaid.gov', () => {
  const applySection = document.querySelector('#apply');
  if (!applySection) {
    throw new Error('Could not find the section with id="apply".');
  }

  const link = applySection.querySelector('a[href*="studentaid.gov"]');
  if (!link) {
    throw new Error(
      'No link to studentaid.gov found in the "How to Apply" section.\n\n' +
      'Wrap "FAFSA" in a link:\n' +
      '<a href="https://studentaid.gov/" target="_blank" rel="noopener noreferrer">FAFSA</a>'
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
      'Add target="_blank" to open external links in a new tab.'
    );
  }

  if (!rel.includes('noopener') || !rel.includes('noreferrer')) {
    throw new Error(
      'The FAFSA link is missing rel="noopener noreferrer".\n\n' +
      'Always add rel="noopener noreferrer" when using target="_blank".'
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
      'Wrap the phone number in a tel: link:\n' +
      '<a href="tel:+14356527500">(435) 652-7500</a>'
    );
  }

  const href = link.getAttribute('href');
  if (!href.includes('4356527500')) {
    throw new Error(
      `The tel: link has href="${href}" but should contain the phone number.\n\n` +
      'Use international format with no spaces or parentheses:\n' +
      '<a href="tel:+14356527500">(435) 652-7500</a>'
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
      'Add an email link after the phone number:\n' +
      'Email us at <a href="mailto:admissions@utahtech.edu?subject=Campus Tour Question">admissions@utahtech.edu</a>'
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

  const href = link.getAttribute('href');
  if (!href.includes('admissions@utahtech.edu')) {
    throw new Error(
      `The email link points to "${href}" but should include admissions@utahtech.edu.\n\n` +
      'Use this href:\n' +
      'mailto:admissions@utahtech.edu?subject=Campus Tour Question'
    );
  }

  if (!href.includes('subject=')) {
    throw new Error(
      'The email link is missing a subject parameter.\n\n' +
      'Add ?subject= after the email address:\n' +
      'mailto:admissions@utahtech.edu?subject=Campus Tour Question'
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
      'Add the id to the opening tag:\n' +
      '<header id="top">'
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
        `Found a link in the footer with href="${anyLink.getAttribute('href')}", but it should be href="#top".\n\n` +
        'The "Back to Top" link should point to the header:\n' +
        '<a href="#top">Back to Top</a>'
      );
    }

    throw new Error(
      'No "Back to Top" link found in the footer.\n\n' +
      'Add this link after the <address> element:\n' +
      '<a href="#top">Back to Top</a>'
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
      'Add this rule to your CSS file:\n' +
      'a:link { color: #BA1C21; }'
    );
  }

  expect(findCSSRule('a:link', 'color', '#BA1C21')).toBe(true);
});

test('Step 8: CSS should have an a:visited rule with color #6B0F13', () => {
  if (!findCSSRule('a:visited', 'color', '#6B0F13')) {
    throw new Error(
      'Missing CSS rule for a:visited.\n\n' +
      'Add this rule to your CSS file (after a:link):\n' +
      'a:visited { color: #6B0F13; }'
    );
  }

  expect(findCSSRule('a:visited', 'color', '#6B0F13')).toBe(true);
});

test('Step 8: CSS should have an a:hover rule with color #003058', () => {
  if (!findCSSRule('a:hover', 'color', '#003058')) {
    throw new Error(
      'Missing CSS rule for a:hover.\n\n' +
      'Add this rule to your CSS file (after a:visited):\n' +
      'a:hover { color: #003058; }'
    );
  }

  expect(findCSSRule('a:hover', 'color', '#003058')).toBe(true);
});

test('Step 8: CSS should have an a:active rule with color #FF6B35', () => {
  if (!findCSSRule('a:active', 'color', '#FF6B35')) {
    throw new Error(
      'Missing CSS rule for a:active.\n\n' +
      'Add this rule to your CSS file (after a:hover):\n' +
      'a:active { color: #FF6B35; }'
    );
  }

  expect(findCSSRule('a:active', 'color', '#FF6B35')).toBe(true);
});

// ============================================
// Part 7: Nav Link Styling
// ============================================

test('Step 9: CSS should have a "nav a" rule with color #ffffff', () => {
  if (!findCSSRule('nav a', 'color', '#ffffff')) {
    throw new Error(
      'Missing CSS rule for nav a.\n\n' +
      'Add this rule to style links inside the nav:\n' +
      'nav a { color: #ffffff; text-decoration: none; }'
    );
  }

  expect(findCSSRule('nav a', 'color', '#ffffff')).toBe(true);
});

test('Step 9: CSS should have a "nav a" rule with text-decoration none', () => {
  if (!findCSSRule('nav a', 'text-decoration', 'none')) {
    throw new Error(
      'The nav a rule is missing text-decoration: none.\n\n' +
      'Add text-decoration: none to remove the underline from nav links:\n' +
      'nav a { color: #ffffff; text-decoration: none; }'
    );
  }

  expect(findCSSRule('nav a', 'text-decoration', 'none')).toBe(true);
});

test('Step 10: CSS should have a "nav a:hover" rule with text-decoration underline', () => {
  if (!findCSSRule('nav a:hover', 'text-decoration', 'underline')) {
    throw new Error(
      'Missing CSS rule for nav a:hover.\n\n' +
      'Add this rule so nav links show an underline on hover:\n' +
      'nav a:hover { text-decoration: underline; }'
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
      'Add the id to the opening tag:\n' +
      '<main id="main-content">'
    );
  }

  expect(main.id).toBe('main-content');
});

test('Step 12: A skip link should exist as the first element in body', () => {
  const skipLink = document.querySelector('a.skip-link');
  if (!skipLink) {
    throw new Error(
      'No skip link found.\n\n' +
      'Add this as the very first element inside <body>:\n' +
      '<a href="#main-content" class="skip-link">Skip to main content</a>'
    );
  }

  const href = skipLink.getAttribute('href');
  if (href !== '#main-content') {
    throw new Error(
      `The skip link has href="${href}" but should be href="#main-content".\n\n` +
      '<a href="#main-content" class="skip-link">Skip to main content</a>'
    );
  }

  expect(skipLink).toBeTruthy();
});

test('Step 13: CSS should have a .skip-link rule with position absolute', () => {
  if (!findCSSRule('.skip-link', 'position', 'absolute')) {
    throw new Error(
      'Missing CSS rule for .skip-link.\n\n' +
      'Add this rule to hide the skip link off-screen:\n' +
      '.skip-link {\n' +
      '    position: absolute;\n' +
      '    left: -9999px;\n' +
      '}'
    );
  }

  expect(findCSSRule('.skip-link', 'position', 'absolute')).toBe(true);
});

test('Step 13: CSS .skip-link should have left: -9999px to hide it off-screen', () => {
  if (!findCSSRule('.skip-link', 'left', '-9999px')) {
    throw new Error(
      'The .skip-link rule is missing left: -9999px.\n\n' +
      'This hides the link off-screen until it receives focus:\n' +
      '.skip-link {\n' +
      '    position: absolute;\n' +
      '    left: -9999px;\n' +
      '}'
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
      'Add this rule so the skip link appears when focused:\n' +
      '.skip-link:focus {\n' +
      '    left: 0;\n' +
      '    top: 0;\n' +
      '    background: #003058;\n' +
      '    color: #ffffff;\n' +
      '    padding: 8px;\n' +
      '    z-index: 100;\n' +
      '}'
    );
  }

  if (!hasBackground) {
    throw new Error(
      'The .skip-link:focus rule needs a background color so it is visible.\n\n' +
      'Add background: #003058 to the .skip-link:focus rule.'
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
      'Add this rule to your CSS file:\n' +
      'html { scroll-behavior: smooth; }'
    );
  }

  expect(findCSSRule('html', 'scroll-behavior', 'smooth')).toBe(true);
});
