// Test 1: main element exists
test('You should have a main element', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
});

// Test 2: h1 inside main
test('Inside the main element, you should have an h1 element containing the movie title', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const h1 = main.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent.trim().length).toBeGreaterThan(0);
});

// Test 3: img below h1 with alt
test('Below the h1 element, you should have an img element with a descriptive alt attribute', () => {
  const h1 = document.querySelector('h1');
  expect(h1).toBeTruthy();
  const img = document.querySelector('img');
  expect(img).toBeTruthy();
  const alt = img.getAttribute('alt');
  expect(alt).toBeTruthy();
  expect(alt.trim().length).toBeGreaterThan(0);
});

// Test 4: p element after image with description
test('You should have a p element after the image that contains the movie description', () => {
  const img = document.querySelector('img');
  expect(img).toBeTruthy();
  const paragraphs = document.querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  const firstP = paragraphs[0];
  expect(firstP.textContent.trim().length).toBeGreaterThan(0);
});

// Test 5: Another p element for rating
test('You should have another p element that contains the rating', () => {
  const paragraphs = document.querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  const secondP = paragraphs[1];
  expect(secondP).toBeTruthy();
  expect(secondP.textContent.trim().length).toBeGreaterThan(0);
});

// Test 6: strong element with "Movie Rating:" inside second p
test('Inside the second p element, you should have a strong element with the text Movie Rating:', () => {
  const paragraphs = document.querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  const secondP = paragraphs[1];
  const strong = secondP.querySelector('strong');
  expect(strong).toBeTruthy();
  expect(strong.textContent).toMatch(/Movie Rating:/);
});

// Test 7: span element inside rating paragraph
test('There should be a span element inside the rating paragraph', () => {
  const paragraphs = document.querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  const secondP = paragraphs[1];
  const span = secondP.querySelector('span');
  expect(span).toBeTruthy();
});

// Test 8: span has ten stars and numerical value after
test('The span element inside the rating paragraph should have ten stars, either filled in (⭐) or empty (☆), followed by a numerical value in parentheses after the span', () => {
  const paragraphs = document.querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  const secondP = paragraphs[1];
  const span = secondP.querySelector('span');
  expect(span).toBeTruthy();

  // Check for ten stars (⭐ or ☆)
  const spanText = span.textContent;
  const starCount = (spanText.match(/⭐/g) || []).length + (spanText.match(/☆/g) || []).length;
  expect(starCount).toBe(10);

  // Check for numerical value in parentheses after span
  const textAfterSpan = secondP.textContent.substring(secondP.textContent.indexOf(spanText) + spanText.length);
  expect(textAfterSpan).toMatch(/\([0-9.]+\/10\)/);
});

// Test 9: span has aria-hidden="true"
test('The span element inside the rating paragraph should have an aria-hidden attribute set to true', () => {
  const paragraphs = document.querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  const secondP = paragraphs[1];
  const span = secondP.querySelector('span');
  expect(span).toBeTruthy();
  const ariaHidden = span.getAttribute('aria-hidden');
  expect(ariaHidden).toBe('true');
});

// Test 10: h2 element exists
test('You should have an h2 element', () => {
  const h2 = document.querySelector('h2');
  expect(h2).toBeTruthy();
});

// Test 11: h2 comes after second p
test('Your h2 should come after your second p element', () => {
  const paragraphs = document.querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  const secondP = paragraphs[1];
  const h2 = document.querySelector('h2');
  expect(h2).toBeTruthy();

  // Check that h2 comes after the second paragraph in document order
  const allElements = Array.from(document.body.querySelectorAll('*'));
  const secondPIndex = allElements.indexOf(secondP);
  const h2Index = allElements.indexOf(h2);
  expect(h2Index).toBeGreaterThan(secondPIndex);
});

// Test 12: h2 has text "Cast Members"
test('Your h2 should have the text Cast Members', () => {
  const h2 = document.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent).toMatch(/Cast Members/);
});

// Test 13: ul element after h2
test('You should have a ul element after the h2', () => {
  const h2 = document.querySelector('h2');
  expect(h2).toBeTruthy();
  const ul = document.querySelector('ul');
  expect(ul).toBeTruthy();

  // Verify ul comes after h2
  const allElements = Array.from(document.body.querySelectorAll('*'));
  const h2Index = allElements.indexOf(h2);
  const ulIndex = allElements.indexOf(ul);
  expect(ulIndex).toBeGreaterThan(h2Index);
});

// Test 14: ul contains multiple li elements
test('The ul should contain multiple li elements', () => {
  const ul = document.querySelector('ul');
  expect(ul).toBeTruthy();
  const liElements = ul.querySelectorAll('li');
  expect(liElements.length).toBeGreaterThanOrEqual(2);
});

// Test 15: Each li has strong for actor name followed by "as" and character
test('Each li should contain a strong element for the actor name followed by the corresponding character name preceded by the text as. (e.g., James Holloway as Ethan Carter)', () => {
  const ul = document.querySelector('ul');
  expect(ul).toBeTruthy();
  const liElements = ul.querySelectorAll('li');
  expect(liElements.length).toBeGreaterThanOrEqual(2);

  liElements.forEach(li => {
    const strong = li.querySelector('strong');
    expect(strong).toBeTruthy();
    expect(strong.textContent.trim().length).toBeGreaterThan(0);

    // Check that "as" appears in the li text
    expect(li.textContent).toMatch(/\sas\s/);
  });
});
