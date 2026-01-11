// Test 1: h1 exists
test('You should have an h1 element to present your travel destinations', () => {
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
test('You should have a p element below the h1 element', () => {
  const h1 = document.querySelector('h1');
  expect(h1).toBeTruthy();
  const nextElement = h1.nextElementSibling;
  expect(nextElement).toBeTruthy();
  expect(nextElement.tagName).toBe('P');
});

// Test 4: First p introduces travel opportunities
test('Your first p element should introduce the travel opportunities', () => {
  const h1 = document.querySelector('h1');
  const firstP = h1.nextElementSibling;
  expect(firstP).toBeTruthy();
  expect(firstP.textContent.trim().length).toBeGreaterThan(0);
});

// Test 5: First h2 has text "Packages"
test('Your first h2 element should have the text Packages', () => {
  const h2 = document.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent).toMatch(/Packages/);
});

// Test 6: p element below first h2
test('You should have a p element below your first h2 element', () => {
  const h2 = document.querySelector('h2');
  expect(h2).toBeTruthy();
  const nextElement = h2.nextElementSibling;
  expect(nextElement).toBeTruthy();
  expect(nextElement.tagName).toBe('P');
});

// Test 7: Second p introduces packages
test('Your second p element should introduce briefly the various packages', () => {
  const allP = document.querySelectorAll('p');
  expect(allP.length).toBeGreaterThanOrEqual(2);
  const secondP = allP[1];
  expect(secondP.textContent.trim().length).toBeGreaterThan(0);
});

// Test 8: ul element below second p
test('You should have an unordered list element below your second p element', () => {
  const allP = document.querySelectorAll('p');
  const secondP = allP[1];
  expect(secondP).toBeTruthy();
  const nextElement = secondP.nextElementSibling;
  expect(nextElement).toBeTruthy();
  expect(nextElement.tagName).toBe('UL');
});

// Test 9: ul has 2 items
test('You should have two items in your unordered list', () => {
  const ul = document.querySelector('ul');
  expect(ul).toBeTruthy();
  const liItems = ul.querySelectorAll('li');
  expect(liItems.length).toBe(2);
});

// Test 10: Both li contain anchors
test('Both your list items should contain an anchor element', () => {
  const ul = document.querySelector('ul');
  const liItems = ul.querySelectorAll('li');
  expect(liItems.length).toBe(2);
  liItems.forEach(li => {
    const anchor = li.querySelector('a');
    expect(anchor).toBeTruthy();
  });
});

// Test 11: First li anchor wraps "Group Travels"
test('The anchor element of your first list item should wrap the text Group Travels', () => {
  const ul = document.querySelector('ul');
  const firstLi = ul.querySelector('li:first-child');
  const anchor = firstLi.querySelector('a');
  expect(anchor).toBeTruthy();
  expect(anchor.textContent).toMatch(/Group Travels/);
});

// Test 12: Second li anchor wraps "Private Tours"
test('The anchor element of your second list item should wrap the text Private Tours', () => {
  const ul = document.querySelector('ul');
  const secondLi = ul.querySelector('li:nth-child(2)');
  const anchor = secondLi.querySelector('a');
  expect(anchor).toBeTruthy();
  expect(anchor.textContent).toMatch(/Private Tours/);
});

// Test 13: h2 after ul
test('You should have an h2 element after your unordered list', () => {
  const ul = document.querySelector('ul');
  expect(ul).toBeTruthy();
  const nextElement = ul.nextElementSibling;
  expect(nextElement).toBeTruthy();
  expect(nextElement.tagName).toBe('H2');
});

// Test 14: Second h2 has text "Top Itineraries"
test('Your second h2 element should have the text Top Itineraries', () => {
  const allH2 = document.querySelectorAll('h2');
  expect(allH2.length).toBeGreaterThanOrEqual(2);
  const secondH2 = allH2[1];
  expect(secondH2.textContent).toMatch(/Top Itineraries/);
});

// Test 15: At least 3 figure elements
test('You should have at least three figure elements', () => {
  const figures = document.querySelectorAll('figure');
  expect(figures.length).toBeGreaterThanOrEqual(3);
});

// Test 16: Each figure first child is anchor
test('Each figure element should contain an anchor element as its first child', () => {
  const figures = document.querySelectorAll('figure');
  expect(figures.length).toBeGreaterThanOrEqual(3);
  figures.forEach(figure => {
    const firstChild = figure.children[0];
    expect(firstChild).toBeTruthy();
    expect(firstChild.tagName).toBe('A');
  });
});

// Test 17: Each figure second child is figcaption
test('Each figure element should contain a figcaption element as its second child', () => {
  const figures = document.querySelectorAll('figure');
  expect(figures.length).toBeGreaterThanOrEqual(3);
  figures.forEach(figure => {
    const secondChild = figure.children[1];
    expect(secondChild).toBeTruthy();
    expect(secondChild.tagName).toBe('FIGCAPTION');
  });
});

// Test 18: Each figcaption has text
test('Each figcaption should contain some text', () => {
  const figcaptions = document.querySelectorAll('figcaption');
  expect(figcaptions.length).toBeGreaterThanOrEqual(3);
  figcaptions.forEach(figcaption => {
    expect(figcaption.textContent.trim().length).toBeGreaterThan(0);
  });
});

// Test 19: Each figure > a contains img
test('Each of the a elements that are children of your figure elements should contain an image', () => {
  const figures = document.querySelectorAll('figure');
  expect(figures.length).toBeGreaterThanOrEqual(3);
  figures.forEach(figure => {
    const anchor = figure.querySelector('a');
    expect(anchor).toBeTruthy();
    const img = anchor.querySelector('img');
    expect(img).toBeTruthy();
  });
});

// Test 20: Each img has valid src
test('Each img element should have a valid src attribute', () => {
  const images = document.querySelectorAll('img');
  expect(images.length).toBeGreaterThanOrEqual(3);
  images.forEach(img => {
    const src = img.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src.trim().length).toBeGreaterThan(0);
    // Valid URL should start with http/https or be relative
    const isValidUrl = src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/') || src.startsWith('./') || src.startsWith('../');
    expect(isValidUrl).toBe(true);
  });
});

// Test 21: Each img has non-empty alt
test('Each img element should have an alt attribute with an appropriate value', () => {
  const images = document.querySelectorAll('img');
  expect(images.length).toBeGreaterThanOrEqual(3);
  images.forEach(img => {
    const alt = img.getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt.trim().length).toBeGreaterThan(0);
  });
});

// Test 22: All anchors have correct href
test('Each a element should have an href attribute with the value of https://se1400.github.io/curriculum. Don\'t forget the links in the list items', () => {
  const anchors = document.querySelectorAll('a');
  expect(anchors.length).toBeGreaterThanOrEqual(5);
  anchors.forEach(anchor => {
    const href = anchor.getAttribute('href');
    // Accept with or without trailing slash
    const normalizedHref = href?.endsWith('/') ? href.slice(0, -1) : href;
    expect(normalizedHref).toBe('https://se1400.github.io/curriculum');
  });
});

// Test 23: All anchors have target="_blank"
test('Each a element should have a target attribute with the value of _blank. Don\'t forget the links in the list items', () => {
  const anchors = document.querySelectorAll('a');
  expect(anchors.length).toBeGreaterThanOrEqual(5);
  anchors.forEach(anchor => {
    const target = anchor.getAttribute('target');
    expect(target).toBe('_blank');
  });
});
