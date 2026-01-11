// Helper function to get raw editor code (not rendered HTML)
async function getRawDocument() {
  const playground = window.parent.__livecodes__;
  const code = await playground.getCode();
  const rawHTML = code.markup.content;

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHTML, 'text/html');

  return { doc, rawHTML };
}

// Test 1: DOCTYPE declaration
test('Your travel agency page should have a <!DOCTYPE html> declaration', async () => {
  const { rawHTML } = await getRawDocument();
  expect(rawHTML.trim().toLowerCase().startsWith('<!doctype html>')).toBe(true);
});

// Test 2: html element with lang="en"
test('You should have an html element with lang set to en', async () => {
  const { doc } = await getRawDocument();
  const html = doc.querySelector('html');
  expect(html).toBeTruthy();
  expect(html.getAttribute('lang')).toBe('en');
});

// Test 3: head element exists
test('You should have a head element within the html element', async () => {
  const { doc } = await getRawDocument();
  const html = doc.querySelector('html');
  const head = doc.querySelector('head');
  expect(head).toBeTruthy();
  expect(html.contains(head)).toBe(true);
});

// Test 4: Two meta elements in head
test('You should have two meta elements within your head element', async () => {
  const { doc } = await getRawDocument();
  const head = doc.querySelector('head');
  const metaTags = head.querySelectorAll('meta');
  expect(metaTags.length).toBe(2);
});

// Test 5: Meta description with content
test('One meta element should have a name attribute with value of description and a non-empty content attribute', async () => {
  const { doc } = await getRawDocument();
  const metaDescription = doc.querySelector('meta[name="description"]');
  expect(metaDescription).toBeTruthy();
  const content = metaDescription.getAttribute('content');
  expect(content).toBeTruthy();
  expect(content.trim().length).toBeGreaterThan(0);
});

// Test 6: Meta charset UTF-8
test('One meta element should have its charset attribute set to UTF-8', async () => {
  const { doc } = await getRawDocument();
  const metaCharset = doc.querySelector('meta[charset]');
  expect(metaCharset).toBeTruthy();
  expect(metaCharset.getAttribute('charset').toUpperCase()).toBe('UTF-8');
});

// Test 7: title element exists
test('You should have title element within your head element', async () => {
  const { doc } = await getRawDocument();
  const head = doc.querySelector('head');
  const title = doc.querySelector('title');
  expect(title).toBeTruthy();
  expect(head.contains(title)).toBe(true);
});

// Test 8: title has text
test('Your title element should have your travel agency name', async () => {
  const { doc } = await getRawDocument();
  const title = doc.querySelector('title');
  expect(title).toBeTruthy();
  expect(title.textContent.trim().length).toBeGreaterThan(0);
});

// Test 9: body element exists
test('You should have a body element within your html element', async () => {
  const { doc } = await getRawDocument();
  const html = doc.querySelector('html');
  const body = doc.querySelector('body');
  expect(body).toBeTruthy();
  expect(html.contains(body)).toBe(true);
});

// Test 10: h1 exists
test('You should have an h1 element to present your travel destinations', async () => {
  const { doc } = await getRawDocument();
  const h1 = doc.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent.trim().length).toBeGreaterThan(0);
});

// Test 11: Only one h1
test('You should only have one h1 element', async () => {
  const { doc } = await getRawDocument();
  const h1Elements = doc.querySelectorAll('h1');
  expect(h1Elements.length).toBe(1);
});

// Test 12: p element below h1
test('You should have a p element below the h1 element', async () => {
  const { doc } = await getRawDocument();
  const h1 = doc.querySelector('h1');
  expect(h1).toBeTruthy();
  const nextElement = h1.nextElementSibling;
  expect(nextElement).toBeTruthy();
  expect(nextElement.tagName).toBe('P');
});

// Test 13: First p introduces travel opportunities
test('Your first p element should introduce the travel opportunities', async () => {
  const { doc } = await getRawDocument();
  const h1 = doc.querySelector('h1');
  const firstP = h1.nextElementSibling;
  expect(firstP).toBeTruthy();
  expect(firstP.textContent.trim().length).toBeGreaterThan(0);
});

// Test 14: First h2 has text "Packages"
test('Your first h2 element should have the text Packages', async () => {
  const { doc } = await getRawDocument();
  const h2 = doc.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent).toMatch(/Packages/);
});

// Test 15: p element below first h2
test('You should have a p element below your first h2 element', async () => {
  const { doc } = await getRawDocument();
  const h2 = doc.querySelector('h2');
  expect(h2).toBeTruthy();
  const nextElement = h2.nextElementSibling;
  expect(nextElement).toBeTruthy();
  expect(nextElement.tagName).toBe('P');
});

// Test 16: Second p introduces packages
test('Your second p element should introduce briefly the various packages', async () => {
  const { doc } = await getRawDocument();
  const allP = doc.querySelectorAll('p');
  expect(allP.length).toBeGreaterThanOrEqual(2);
  const secondP = allP[1];
  expect(secondP.textContent.trim().length).toBeGreaterThan(0);
});

// Test 17: ul element below second p
test('You should have an unordered list element below your second p element', async () => {
  const { doc } = await getRawDocument();
  const allP = doc.querySelectorAll('p');
  const secondP = allP[1];
  expect(secondP).toBeTruthy();
  const nextElement = secondP.nextElementSibling;
  expect(nextElement).toBeTruthy();
  expect(nextElement.tagName).toBe('UL');
});

// Test 18: ul has 2 items
test('You should have two items in your unordered list', async () => {
  const { doc } = await getRawDocument();
  const ul = doc.querySelector('ul');
  expect(ul).toBeTruthy();
  const liItems = ul.querySelectorAll('li');
  expect(liItems.length).toBe(2);
});

// Test 19: Both li contain anchors
test('Both your list items should contain an anchor element', async () => {
  const { doc } = await getRawDocument();
  const ul = doc.querySelector('ul');
  const liItems = ul.querySelectorAll('li');
  expect(liItems.length).toBe(2);
  liItems.forEach(li => {
    const anchor = li.querySelector('a');
    expect(anchor).toBeTruthy();
  });
});

// Test 20: First li anchor wraps "Group Travels"
test('The anchor element of your first list item should wrap the text Group Travels', async () => {
  const { doc } = await getRawDocument();
  const ul = doc.querySelector('ul');
  const firstLi = ul.querySelector('li:first-child');
  const anchor = firstLi.querySelector('a');
  expect(anchor).toBeTruthy();
  expect(anchor.textContent).toMatch(/Group Travels/);
});

// Test 21: Second li anchor wraps "Private Tours"
test('The anchor element of your second list item should wrap the text Private Tours', async () => {
  const { doc } = await getRawDocument();
  const ul = doc.querySelector('ul');
  const secondLi = ul.querySelector('li:nth-child(2)');
  const anchor = secondLi.querySelector('a');
  expect(anchor).toBeTruthy();
  expect(anchor.textContent).toMatch(/Private Tours/);
});

// Test 22: h2 after ul
test('You should have an h2 element after your unordered list', async () => {
  const { doc } = await getRawDocument();
  const ul = doc.querySelector('ul');
  expect(ul).toBeTruthy();
  const nextElement = ul.nextElementSibling;
  expect(nextElement).toBeTruthy();
  expect(nextElement.tagName).toBe('H2');
});

// Test 23: Second h2 has text "Top Itineraries"
test('Your second h2 element should have the text Top Itineraries', async () => {
  const { doc } = await getRawDocument();
  const allH2 = doc.querySelectorAll('h2');
  expect(allH2.length).toBeGreaterThanOrEqual(2);
  const secondH2 = allH2[1];
  expect(secondH2.textContent).toMatch(/Top Itineraries/);
});

// Test 24: At least 3 figure elements
test('You should have at least three figure elements', async () => {
  const { doc } = await getRawDocument();
  const figures = doc.querySelectorAll('figure');
  expect(figures.length).toBeGreaterThanOrEqual(3);
});

// Test 25: Each figure first child is anchor
test('Each figure element should contain an anchor element as its first child', async () => {
  const { doc } = await getRawDocument();
  const figures = doc.querySelectorAll('figure');
  expect(figures.length).toBeGreaterThanOrEqual(3);
  figures.forEach(figure => {
    const firstChild = figure.children[0];
    expect(firstChild).toBeTruthy();
    expect(firstChild.tagName).toBe('A');
  });
});

// Test 26: Each figure second child is figcaption
test('Each figure element should contain a figcaption element as its second child', async () => {
  const { doc } = await getRawDocument();
  const figures = doc.querySelectorAll('figure');
  expect(figures.length).toBeGreaterThanOrEqual(3);
  figures.forEach(figure => {
    const secondChild = figure.children[1];
    expect(secondChild).toBeTruthy();
    expect(secondChild.tagName).toBe('FIGCAPTION');
  });
});

// Test 27: Each figcaption has text
test('Each figcaption should contain some text', async () => {
  const { doc } = await getRawDocument();
  const figcaptions = doc.querySelectorAll('figcaption');
  expect(figcaptions.length).toBeGreaterThanOrEqual(3);
  figcaptions.forEach(figcaption => {
    expect(figcaption.textContent.trim().length).toBeGreaterThan(0);
  });
});

// Test 28: Each figure > a contains img
test('Each of the a elements that are children of your figure elements should contain an image', async () => {
  const { doc } = await getRawDocument();
  const figures = doc.querySelectorAll('figure');
  expect(figures.length).toBeGreaterThanOrEqual(3);
  figures.forEach(figure => {
    const anchor = figure.querySelector('a');
    expect(anchor).toBeTruthy();
    const img = anchor.querySelector('img');
    expect(img).toBeTruthy();
  });
});

// Test 29: Each img has valid src
test('Each img element should have a valid src attribute', async () => {
  const { doc } = await getRawDocument();
  const images = doc.querySelectorAll('img');
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

// Test 30: Each img has non-empty alt
test('Each img element should have an alt attribute with an appropriate value', async () => {
  const { doc } = await getRawDocument();
  const images = doc.querySelectorAll('img');
  expect(images.length).toBeGreaterThanOrEqual(3);
  images.forEach(img => {
    const alt = img.getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt.trim().length).toBeGreaterThan(0);
  });
});

// Test 31: All anchors have correct href
test('Each a element should have an href attribute with the value of https://se1400.github.io/curriculum . Don\'t forget the links in the list items', async () => {
  const { doc } = await getRawDocument();
  const anchors = doc.querySelectorAll('a');
  expect(anchors.length).toBeGreaterThanOrEqual(5);
  anchors.forEach(anchor => {
    const href = anchor.getAttribute('href');
    expect(href).toBe('https://se1400.github.io/curriculum');
  });
});

// Test 32: All anchors have target="_blank"
test('Each a element should have a target attribute with the value of _blank. Don\'t forget the links in the list items', async () => {
  const { doc } = await getRawDocument();
  const anchors = doc.querySelectorAll('a');
  expect(anchors.length).toBeGreaterThanOrEqual(5);
  anchors.forEach(anchor => {
    const target = anchor.getAttribute('target');
    expect(target).toBe('_blank');
  });
});
