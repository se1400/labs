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
// Part 3: Functional Tests (Toggle Behavior)
// ============================================

// Test 11: Clicking button shows the office hours
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

// Test 12: Clicking button changes button text when showing
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

// Test 13: Clicking button again hides the office hours
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

// Test 14: Toggle works multiple times
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
