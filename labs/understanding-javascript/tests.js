// ============================================
// Part 1: HTML Element Tests (Button & Paragraph)
// ============================================

// Test 1: Button element exists with correct id
test('A button element with id="toggle-hours" should exist', () => {
  const button = document.getElementById('toggle-hours');
  expect(button).toBeTruthy();
  expect(button.tagName.toLowerCase()).toBe('button');
});

// Test 2: Button has correct type attribute
test('The toggle-hours button should have type="button"', () => {
  const button = document.getElementById('toggle-hours');
  expect(button).toBeTruthy();
  expect(button.getAttribute('type')).toBe('button');
});

// Test 3: Button is inside the visit-campus aside
test('The toggle-hours button should be inside the aside with id="visit-campus"', () => {
  const aside = document.getElementById('visit-campus');
  expect(aside).toBeTruthy();
  const button = aside.querySelector('#toggle-hours');
  expect(button).toBeTruthy();
});

// Test 4: Paragraph element exists with correct id
test('A paragraph element with id="office-hours" should exist', () => {
  const paragraph = document.getElementById('office-hours');
  expect(paragraph).toBeTruthy();
  expect(paragraph.tagName.toLowerCase()).toBe('p');
});

// Test 5: Paragraph has hidden attribute
test('The office-hours paragraph should have the hidden attribute', () => {
  const paragraph = document.getElementById('office-hours');
  expect(paragraph).toBeTruthy();
  // Check if hidden attribute exists or hidden property is true
  expect(paragraph.hasAttribute('hidden') || paragraph.hidden).toBe(true);
});

// Test 6: Paragraph contains tour hours content
test('The office-hours paragraph should contain tour hours information', () => {
  const paragraph = document.getElementById('office-hours');
  expect(paragraph).toBeTruthy();
  const content = paragraph.textContent.toLowerCase();
  expect(content).toContain('monday');
  expect(content).toContain('friday');
});

// Test 7: Paragraph is inside the visit-campus aside
test('The office-hours paragraph should be inside the aside with id="visit-campus"', () => {
  const aside = document.getElementById('visit-campus');
  expect(aside).toBeTruthy();
  const paragraph = aside.querySelector('#office-hours');
  expect(paragraph).toBeTruthy();
});

// ============================================
// Part 2: Inline JavaScript Tests
// ============================================

// Test 8: Link with onclick exists for phone number
test('A link with an onclick attribute should wrap the phone number', () => {
  const aside = document.getElementById('visit-campus');
  expect(aside).toBeTruthy();
  const link = aside.querySelector('a[onclick]');
  expect(link).toBeTruthy();
});

// Test 9: The onclick contains an alert
test('The phone number link onclick should contain an alert()', () => {
  const aside = document.getElementById('visit-campus');
  expect(aside).toBeTruthy();
  const link = aside.querySelector('a[onclick]');
  expect(link).toBeTruthy();
  const onclick = link.getAttribute('onclick').toLowerCase();
  expect(onclick).toContain('alert');
});

// Test 10: The alert contains the phone number
test('The alert should display the phone number (435) 652-7500', () => {
  const aside = document.getElementById('visit-campus');
  expect(aside).toBeTruthy();
  const link = aside.querySelector('a[onclick]');
  expect(link).toBeTruthy();
  const onclick = link.getAttribute('onclick');
  expect(onclick).toContain('435');
  expect(onclick).toContain('652');
  expect(onclick).toContain('7500');
});

// ============================================
// Part 3: External JavaScript Tests
// ============================================

// Helper: Get the student's JavaScript code from the page
const getStudentJS = () => {
  // In LiveCodes, the JS panel code is injected as an inline script
  const scripts = document.querySelectorAll('script:not([src])');
  for (const script of scripts) {
    const content = script.textContent || '';
    // Look for student's code patterns (not test code)
    if (content.includes('toggle-hours') && content.includes('addEventListener')) {
      return content;
    }
  }
  // Fallback: check if there's a script with the toggle code
  return '';
};

// Test 11: JavaScript uses DOMContentLoaded
test('JavaScript should use DOMContentLoaded to wait for page load', () => {
  const jsCode = getStudentJS();
  expect(jsCode.toLowerCase()).toContain('domcontentloaded');
});

// Test 12: JavaScript selects the toggle button by ID
test('JavaScript should select the toggle-hours button using getElementById', () => {
  const jsCode = getStudentJS();
  expect(jsCode).toContain('getElementById');
  expect(jsCode).toContain('toggle-hours');
});

// Test 13: JavaScript selects the office-hours paragraph by ID
test('JavaScript should select the office-hours paragraph using getElementById', () => {
  const jsCode = getStudentJS();
  expect(jsCode).toContain('getElementById');
  expect(jsCode).toContain('office-hours');
});

// Test 14: JavaScript adds a click event listener
test('JavaScript should add a click event listener to the button', () => {
  const jsCode = getStudentJS();
  expect(jsCode).toContain('addEventListener');
  expect(jsCode.toLowerCase()).toContain('click');
});
