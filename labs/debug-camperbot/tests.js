// Helper function to get raw editor code (not rendered HTML)
async function getRawDocument() {
  const playground = window.parent.__livecodes__;
  const code = await playground.getCode();
  const rawHTML = code.markup.content;

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHTML, 'text/html');

  return { doc, rawHTML };
}

// Test 1: Exactly one h1 element
test('You should have exactly one h1 element on the page', async () => {
  const { doc } = await getRawDocument();
  const h1Elements = doc.querySelectorAll('h1');
  expect(h1Elements).toHaveLength(1);
});

// Test 2: Don't remove the h1
test('You should not remove the <h1>Hello from Camperbot!</h1> element from the page', async () => {
  const { doc } = await getRawDocument();
  const h1 = doc.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent).toMatch(/Hello from Camperbot!/);
});

// Test 3: Exactly one h2 element
test('You should have exactly one h2 element on the page', async () => {
  const { doc } = await getRawDocument();
  const h2Elements = doc.querySelectorAll('h2');
  expect(h2Elements).toHaveLength(1);
});

// Test 4: h2 with "About" text
test("You should have an h2 element with the text About. Here's an example: <h2>Text here</h2>", async () => {
  const { doc } = await getRawDocument();
  const h2 = doc.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent).toMatch(/About/);
});

// Test 5: First paragraph text
test("You should have a paragraph element with the text My name is Camperbot and I love learning new things. Here's an example: <p>Text here</p>", async () => {
  const { doc } = await getRawDocument();
  const paragraphs = doc.querySelectorAll('p');
  const hasText = Array.from(paragraphs).some(p => p.textContent.includes('My name is Camperbot and I love learning new things'));
  expect(hasText).toBe(true);
});

// Test 6: Second paragraph text
test("You should have a paragraph element with the text I enjoy solving puzzles. Here's an example: <p>Text here</p>", async () => {
  const { doc } = await getRawDocument();
  const paragraphs = doc.querySelectorAll('p');
  const hasText = Array.from(paragraphs).some(p => p.textContent.includes('I enjoy solving puzzles'));
  expect(hasText).toBe(true);
});

// Test 7: Exactly two paragraphs
test('You should have exactly two paragraph elements on the page', async () => {
  const { doc } = await getRawDocument();
  const pElements = doc.querySelectorAll('p');
  expect(pElements).toHaveLength(2);
});

// Test 8: Exactly one h3 element
test('You should have exactly one h3 element on the page', async () => {
  const { doc } = await getRawDocument();
  const h3Elements = doc.querySelectorAll('h3');
  expect(h3Elements).toHaveLength(1);
});

// Test 9: h3 with correct text
test("You should have an h3 element with the text Background and Interests. Here's an example: <h3>Text here</h3>", async () => {
  const { doc } = await getRawDocument();
  const h3 = doc.querySelector('h3');
  expect(h3).toBeTruthy();
  expect(h3.textContent).toMatch(/Background and Interests/);
});
