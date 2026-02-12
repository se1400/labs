// Test 1: h1 element exists
test('You should have an h1 element with the name of your recipe', () => {
  const h1 = document.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent.trim().length).toBeGreaterThan(0);
});

// Test 2: Only one h1
test('You should only have one h1 element', () => {
  const h1Elements = document.querySelectorAll('h1');
  expect(h1Elements.length).toBe(1);
});

// Test 3: p element below h1
test('You should have a p element below your h1 element', () => {
  const h1 = document.querySelector('h1');
  expect(h1).toBeTruthy();
  const nextElement = h1.nextElementSibling;
  expect(nextElement).toBeTruthy();
  expect(nextElement.tagName).toBe('P');
});

// Test 4: First p describes recipe
test('Your first p element should describe your recipe', () => {
  const firstP = document.querySelector('p');
  expect(firstP).toBeTruthy();
  expect(firstP.textContent.trim().length).toBeGreaterThan(0);
});

// Test 5: First h2 has text "Ingredients"
test('Your first h2 element should have the text Ingredients', () => {
  const h2 = document.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent).toMatch(/Ingredients/);
});

// Test 6: ul below first h2
test('You should have an unordered list element below your first h2 element', () => {
  const h2 = document.querySelector('h2');
  expect(h2).toBeTruthy();
  const nextElement = h2.nextElementSibling;
  expect(nextElement).toBeTruthy();
  expect(nextElement.tagName).toBe('UL');
});

// Test 7: At least 4 li in ul
test('You should have at least four list item elements in your unordered list with the ingredients', () => {
  const ul = document.querySelector('ul');
  expect(ul).toBeTruthy();
  const liItems = ul.querySelectorAll('li');
  expect(liItems.length).toBeGreaterThanOrEqual(4);
});

// Test 8: Each li in ul has content
test('Each ingredient list item should have text content', () => {
  const ul = document.querySelector('ul');
  expect(ul).toBeTruthy();
  const liItems = ul.querySelectorAll('li');
  liItems.forEach(li => {
    expect(li.textContent.trim().length).toBeGreaterThan(0);
  });
});

// Test 9: Second h2 has text "Instructions"
test('Your second h2 element should have the text Instructions', () => {
  const allH2 = document.querySelectorAll('h2');
  expect(allH2.length).toBeGreaterThanOrEqual(2);
  const secondH2 = allH2[1];
  expect(secondH2.textContent).toMatch(/Instructions/);
});

// Test 10: ol below second h2
test('You should have an ordered list element below your second h2 element', () => {
  const allH2 = document.querySelectorAll('h2');
  expect(allH2.length).toBeGreaterThanOrEqual(2);
  const secondH2 = allH2[1];
  const nextElement = secondH2.nextElementSibling;
  expect(nextElement).toBeTruthy();
  expect(nextElement.tagName).toBe('OL');
});

// Test 11: At least 4 li in ol
test('You should have at least four list item elements in your ordered list with the instructions', () => {
  const ol = document.querySelector('ol');
  expect(ol).toBeTruthy();
  const liItems = ol.querySelectorAll('li');
  expect(liItems.length).toBeGreaterThanOrEqual(4);
});

// Test 12: Each li in ol has content
test('Each instruction list item should have text content', () => {
  const ol = document.querySelector('ol');
  expect(ol).toBeTruthy();
  const liItems = ol.querySelectorAll('li');
  liItems.forEach(li => {
    expect(li.textContent.trim().length).toBeGreaterThan(0);
  });
});

// Test 13: At least one img
test('You should have at least one img element', () => {
  const images = document.querySelectorAll('img');
  expect(images.length).toBeGreaterThanOrEqual(1);
});

// Test 14: All img have valid src
test('All your img elements should have a valid src attribute and value', () => {
  const images = document.querySelectorAll('img');
  expect(images.length).toBeGreaterThanOrEqual(1);
  images.forEach(img => {
    const src = img.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src.trim().length).toBeGreaterThan(0);
    // Valid URL: absolute (http/https), protocol-relative (//), or relative path
    const isValidUrl = /^(https?:\/\/|\/\/|\/|\.\/|\.\.\/|[a-zA-Z0-9])/.test(src.trim());
    expect(isValidUrl).toBe(true);
  });
});

// Test 15: All img have alt
test('All your img elements should have an alt attribute to describe the image', () => {
  const images = document.querySelectorAll('img');
  expect(images.length).toBeGreaterThanOrEqual(1);
  images.forEach(img => {
    const alt = img.getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt.trim().length).toBeGreaterThan(0);
  });
});
