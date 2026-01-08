// Test 1: Exactly one h1 element
test('You should have exactly one h1 element on the page', () => {
  const h1Elements = document.querySelectorAll('h1');
  expect(h1Elements).toHaveLength(1);
});

// Test 2: Don't remove the h1
test('You should not remove the <h1>Hello from Camperbot!</h1> element from the page', () => {
  const h1 = document.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent).toMatch(/Hello from Camperbot!/);
});

// Test 3: Exactly one h2 element
test('You should have exactly one h2 element on the page', () => {
  const h2Elements = document.querySelectorAll('h2');
  expect(h2Elements).toHaveLength(1);
});

// Test 4: h2 with "About" text
test("You should have an h2 element with the text About. Here's an example: <h2>Text here</h2>", () => {
  const h2 = document.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent).toMatch(/About/);
});

// Test 5: First paragraph text
test("You should have a paragraph element with the text My name is Camperbot and I love learning new things. Here's an example: <p>Text here</p>", () => {
  const paragraphs = document.querySelectorAll('p');
  const texts = Array.from(paragraphs).map(p => p.textContent);
  expect(texts).toContain(expect.stringContaining('My name is Camperbot and I love learning new things'));
});

// Test 6: Second paragraph text
test("You should have a paragraph element with the text I enjoy solving puzzles. Here's an example: <p>Text here</p>", () => {
  const paragraphs = document.querySelectorAll('p');
  const texts = Array.from(paragraphs).map(p => p.textContent);
  expect(texts).toContain(expect.stringContaining('I enjoy solving puzzles'));
});

// Test 7: Exactly two paragraphs
test('You should have exactly two paragraph elements on the page', () => {
  const pElements = document.querySelectorAll('p');
  expect(pElements).toHaveLength(2);
});

// Test 8: Exactly one h3 element
test('You should have exactly one h3 element on the page', () => {
  const h3Elements = document.querySelectorAll('h3');
  expect(h3Elements).toHaveLength(1);
});

// Test 9: h3 with correct text
test("You should have an h3 element with the text Background and Interests. Here's an example: <h3>Text here</h3>", () => {
  const h3 = document.querySelector('h3');
  expect(h3).toBeTruthy();
  expect(h3.textContent).toMatch(/Background and Interests/);
});
