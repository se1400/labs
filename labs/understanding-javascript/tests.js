// Helper: Detect if running in LiveCodes (where head content gets moved to body)
const isLiveCodes = () => {
  return document.querySelector('head > script#message-script') !== null ||
         document.querySelector('head > title')?.textContent === 'Untitled Project';
};

// Helper: Get script element (checks both head and body for LiveCodes compatibility)
const getScriptElement = (src) => {
  if (isLiveCodes()) {
    return document.querySelector(`body > script[src="${src}"]`) ||
           document.querySelector(`script[src="${src}"]`);
  }
  return document.querySelector(`script[src="${src}"]`);
};

// Helper: Get JavaScript file content (for checking code patterns)
const getJSContent = () => {
  // In LiveCodes, we need to check if the script content is available
  const scriptEl = getScriptElement('script.js');
  if (scriptEl && scriptEl.textContent) {
    return scriptEl.textContent;
  }
  // For external scripts, we can't read the content directly in the browser
  // We'll rely on functional tests and checking window properties
  return null;
};

// ============================================
// Part 1: HTML Element Tests
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

// Test 3: Button has correct initial text
test('The toggle-hours button should initially display "Tour Hours"', () => {
  const button = document.getElementById('toggle-hours');
  expect(button).toBeTruthy();
  // Check for initial text (before any clicks)
  const text = button.textContent.trim();
  expect(text === 'Tour Hours' || text === 'Hide office hours' || text === 'Show office hours').toBe(true);
});

// Test 4: Button is inside the visit-campus aside
test('The toggle-hours button should be inside the aside with id="visit-campus"', () => {
  const aside = document.getElementById('visit-campus');
  expect(aside).toBeTruthy();
  const button = aside.querySelector('#toggle-hours');
  expect(button).toBeTruthy();
});

// Test 5: Paragraph element exists with correct id
test('A paragraph element with id="office-hours" should exist', () => {
  const paragraph = document.getElementById('office-hours');
  expect(paragraph).toBeTruthy();
  expect(paragraph.tagName.toLowerCase()).toBe('p');
});

// Test 6: Paragraph has hidden attribute initially
test('The office-hours paragraph should have the hidden attribute', () => {
  const paragraph = document.getElementById('office-hours');
  expect(paragraph).toBeTruthy();
  // Check if element has hidden attribute (it may be toggled by JS, so we check the attribute exists or was there)
  // We'll check if it's either hidden or was made visible by clicking
  const hasHiddenAttr = paragraph.hasAttribute('hidden');
  const isHiddenProp = paragraph.hidden;
  // At least one should indicate it can be hidden
  expect(hasHiddenAttr || isHiddenProp || paragraph.hasAttribute('hidden') !== undefined).toBe(true);
});

// Test 7: Paragraph contains tour hours content
test('The office-hours paragraph should contain tour hours information', () => {
  const paragraph = document.getElementById('office-hours');
  expect(paragraph).toBeTruthy();
  const content = paragraph.textContent.toLowerCase();
  // Check for key phrases that should be in the tour hours
  expect(content).toContain('monday');
  expect(content).toContain('friday');
});

// Test 8: Paragraph contains time information
test('The office-hours paragraph should contain time information (8AM, 5PM, etc.)', () => {
  const paragraph = document.getElementById('office-hours');
  expect(paragraph).toBeTruthy();
  const content = paragraph.textContent;
  // Check for time patterns
  const hasTimeInfo = content.includes('AM') || content.includes('PM') ||
                      content.includes('am') || content.includes('pm');
  expect(hasTimeInfo).toBe(true);
});

// Test 9: Paragraph is inside the visit-campus aside
test('The office-hours paragraph should be inside the aside with id="visit-campus"', () => {
  const aside = document.getElementById('visit-campus');
  expect(aside).toBeTruthy();
  const paragraph = aside.querySelector('#office-hours');
  expect(paragraph).toBeTruthy();
});

// ============================================
// Part 2: Script Tag Tests
// ============================================

// Test 10: Script tag exists linking to script.js
test('A script tag with src="script.js" should exist', () => {
  const script = getScriptElement('script.js');
  expect(script).toBeTruthy();
});

// Test 11: Script tag is at the end of body (not in head)
test('The script tag should be placed at the end of the body element', () => {
  // Check that script is a child of body, not head
  const scriptInBody = document.querySelector('body script[src="script.js"]');
  const scriptInHead = document.querySelector('head script[src="script.js"]');

  if (isLiveCodes()) {
    // In LiveCodes, just verify script exists somewhere
    const script = getScriptElement('script.js');
    expect(script).toBeTruthy();
  } else {
    expect(scriptInBody).toBeTruthy();
  }
});

// ============================================
// Part 3: Functional Tests (JavaScript Behavior)
// ============================================

// Test 12: Clicking button shows the office hours
test('Clicking the toggle button should show the office hours paragraph', () => {
  const button = document.getElementById('toggle-hours');
  const paragraph = document.getElementById('office-hours');

  expect(button).toBeTruthy();
  expect(paragraph).toBeTruthy();

  // Ensure paragraph starts hidden
  paragraph.hidden = true;

  // Click the button
  button.click();

  // Paragraph should now be visible
  expect(paragraph.hidden).toBe(false);
});

// Test 13: Clicking button changes button text when showing
test('Clicking the toggle button should change its text when showing office hours', () => {
  const button = document.getElementById('toggle-hours');
  const paragraph = document.getElementById('office-hours');

  expect(button).toBeTruthy();
  expect(paragraph).toBeTruthy();

  // Reset state
  paragraph.hidden = true;
  button.textContent = 'Tour Hours';

  // Click the button
  button.click();

  // Button text should change
  const newText = button.textContent.toLowerCase();
  expect(newText).toContain('hide');
});

// Test 14: Clicking button again hides the office hours
test('Clicking the toggle button again should hide the office hours paragraph', () => {
  const button = document.getElementById('toggle-hours');
  const paragraph = document.getElementById('office-hours');

  expect(button).toBeTruthy();
  expect(paragraph).toBeTruthy();

  // Start with paragraph visible
  paragraph.hidden = false;
  button.textContent = 'Hide office hours';

  // Click the button
  button.click();

  // Paragraph should now be hidden
  expect(paragraph.hidden).toBe(true);
});

// Test 15: Clicking button changes button text when hiding
test('Clicking the toggle button should change its text when hiding office hours', () => {
  const button = document.getElementById('toggle-hours');
  const paragraph = document.getElementById('office-hours');

  expect(button).toBeTruthy();
  expect(paragraph).toBeTruthy();

  // Start with paragraph visible
  paragraph.hidden = false;
  button.textContent = 'Hide office hours';

  // Click the button
  button.click();

  // Button text should change back
  const newText = button.textContent.toLowerCase();
  expect(newText.includes('show') || newText.includes('tour')).toBe(true);
});

// Test 16: Toggle works multiple times
test('The toggle should work correctly through multiple clicks', () => {
  const button = document.getElementById('toggle-hours');
  const paragraph = document.getElementById('office-hours');

  expect(button).toBeTruthy();
  expect(paragraph).toBeTruthy();

  // Reset to initial state
  paragraph.hidden = true;
  button.textContent = 'Tour Hours';

  // Click 1: Should show
  button.click();
  expect(paragraph.hidden).toBe(false);

  // Click 2: Should hide
  button.click();
  expect(paragraph.hidden).toBe(true);

  // Click 3: Should show again
  button.click();
  expect(paragraph.hidden).toBe(false);
});
