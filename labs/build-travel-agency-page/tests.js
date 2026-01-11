// Helper function to get raw editor code (not rendered HTML)
async function getRawHTML() {
  try {
    // Debug: Check different window levels
    console.log('window.__livecodes__:', window.__livecodes__);
    console.log('window.parent.__livecodes__:', window.parent.__livecodes__);
    console.log('window.parent.parent.__livecodes__:', window.parent.parent.__livecodes__);
    console.log('window.top.__livecodes__:', window.top.__livecodes__);

    // Try multiple levels
    let playground = window.__livecodes__
                  || window.parent.__livecodes__
                  || window.parent.parent.__livecodes__
                  || window.top.__livecodes__;

    if (!playground) {
      console.error('Playground instance not found at any window level');
      return '';
    }

    console.log('Found playground:', playground);
    const code = await playground.getCode();
    console.log('Raw code length:', code.markup.content.length);
    console.log('Raw code preview:', code.markup.content.substring(0, 100));
    return code.markup.content;
  } catch (error) {
    console.error('Error accessing raw code:', error);
    return '';
  }
}

// Helper to check if element exists in raw HTML
function hasElementInRaw(rawHTML, elementName) {
  const regex = new RegExp(`<${elementName}[\\s>]`, 'i');
  return regex.test(rawHTML);
}

// Helper to get attribute value from raw HTML
function getAttributeFromRaw(rawHTML, elementName, attrName) {
  const regex = new RegExp(`<${elementName}[^>]*${attrName}=["']([^"']*)["']`, 'i');
  const match = rawHTML.match(regex);
  return match ? match[1] : null;
}

// Helper to count elements in raw HTML
function countElementsInRaw(rawHTML, elementName) {
  const regex = new RegExp(`<${elementName}[\\s>]`, 'gi');
  const matches = rawHTML.match(regex);
  return matches ? matches.length : 0;
}

// Test 1: DOCTYPE declaration
test('Your travel agency page should have a <!DOCTYPE html> declaration', async () => {
  const rawHTML = await getRawHTML();
  expect(rawHTML.trim().toLowerCase().startsWith('<!doctype html>')).toBe(true);
});

// Test 2: html element with lang="en"
test('You should have an html element with lang set to en', async () => {
  const rawHTML = await getRawHTML();
  expect(hasElementInRaw(rawHTML, 'html')).toBe(true);
  const lang = getAttributeFromRaw(rawHTML, 'html', 'lang');
  expect(lang).toBe('en');
});

// Test 3: head element exists
test('You should have a head element within the html element', async () => {
  const rawHTML = await getRawHTML();
  expect(hasElementInRaw(rawHTML, 'head')).toBe(true);
});

// Test 4: Two meta elements in head
test('You should have two meta elements within your head element', async () => {
  const rawHTML = await getRawHTML();
  const metaCount = countElementsInRaw(rawHTML, 'meta');
  expect(metaCount).toBe(2);
});

// Test 5: Meta description with content
test('One meta element should have a name attribute with value of description and a non-empty content attribute', async () => {
  const rawHTML = await getRawHTML();
  const content = getAttributeFromRaw(rawHTML, 'meta[^>]*name="description"[^>]*', 'content');
  expect(content).toBeTruthy();
  expect(content.trim().length).toBeGreaterThan(0);
});

// Test 6: Meta charset UTF-8
test('One meta element should have its charset attribute set to UTF-8', async () => {
  const rawHTML = await getRawHTML();
  const charset = getAttributeFromRaw(rawHTML, 'meta', 'charset');
  expect(charset).toBeTruthy();
  expect(charset.toUpperCase()).toBe('UTF-8');
});

// Test 7: title element exists
test('You should have title element within your head element', async () => {
  const rawHTML = await getRawHTML();
  expect(hasElementInRaw(rawHTML, 'title')).toBe(true);
});

// Test 8: title has text
test('Your title element should have your travel agency name', async () => {
  const rawHTML = await getRawHTML();
  const titleMatch = rawHTML.match(/<title>([^<]+)<\/title>/i);
  expect(titleMatch).toBeTruthy();
  expect(titleMatch[1].trim().length).toBeGreaterThan(0);
});

// Test 9: body element exists
test('You should have a body element within your html element', async () => {
  const rawHTML = await getRawHTML();
  expect(hasElementInRaw(rawHTML, 'body')).toBe(true);
});

// Test 10: h1 exists
test('You should have an h1 element to present your travel destinations', async () => {
  const rawHTML = await getRawHTML();
  expect(hasElementInRaw(rawHTML, 'h1')).toBe(true);
  const h1Match = rawHTML.match(/<h1>([^<]+)<\/h1>/i);
  expect(h1Match).toBeTruthy();
  expect(h1Match[1].trim().length).toBeGreaterThan(0);
});

// Test 11: Only one h1
test('You should only have one h1 element', async () => {
  const rawHTML = await getRawHTML();
  const h1Count = countElementsInRaw(rawHTML, 'h1');
  expect(h1Count).toBe(1);
});

// Test 12: p element below h1
test('You should have a p element below the h1 element', async () => {
  const rawHTML = await getRawHTML();
  const h1Index = rawHTML.search(/<h1[\s>]/i);
  const h1EndIndex = rawHTML.indexOf('</h1>', h1Index);
  const afterH1 = rawHTML.substring(h1EndIndex + 5);
  const nextTagMatch = afterH1.match(/<(\w+)[\s>]/);
  expect(nextTagMatch).toBeTruthy();
  expect(nextTagMatch[1].toUpperCase()).toBe('P');
});

// Test 13: First p introduces travel opportunities
test('Your first p element should introduce the travel opportunities', async () => {
  const rawHTML = await getRawHTML();
  const firstPMatch = rawHTML.match(/<p>([^<]+)<\/p>/i);
  expect(firstPMatch).toBeTruthy();
  expect(firstPMatch[1].trim().length).toBeGreaterThan(0);
});

// Test 14: First h2 has text "Packages"
test('Your first h2 element should have the text Packages', async () => {
  const rawHTML = await getRawHTML();
  const h2Match = rawHTML.match(/<h2>([^<]+)<\/h2>/i);
  expect(h2Match).toBeTruthy();
  expect(h2Match[1]).toMatch(/Packages/);
});

// Test 15: p element below first h2
test('You should have a p element below your first h2 element', async () => {
  const rawHTML = await getRawHTML();
  const h2Index = rawHTML.search(/<h2[\s>]/i);
  const h2EndIndex = rawHTML.indexOf('</h2>', h2Index);
  const afterH2 = rawHTML.substring(h2EndIndex + 5);
  const nextTagMatch = afterH2.match(/<(\w+)[\s>]/);
  expect(nextTagMatch).toBeTruthy();
  expect(nextTagMatch[1].toUpperCase()).toBe('P');
});

// Test 16: Second p introduces packages
test('Your second p element should introduce briefly the various packages', async () => {
  const rawHTML = await getRawHTML();
  const pMatches = rawHTML.match(/<p>([^<]+)<\/p>/gi);
  expect(pMatches).toBeTruthy();
  expect(pMatches.length).toBeGreaterThanOrEqual(2);
  const secondPContent = pMatches[1].match(/<p>([^<]+)<\/p>/i)[1];
  expect(secondPContent.trim().length).toBeGreaterThan(0);
});

// Test 17: ul element below second p
test('You should have an unordered list element below your second p element', async () => {
  const rawHTML = await getRawHTML();
  const pMatches = [...rawHTML.matchAll(/<p[\s>]/gi)];
  expect(pMatches.length).toBeGreaterThanOrEqual(2);
  const secondPIndex = pMatches[1].index;
  const pEndIndex = rawHTML.indexOf('</p>', secondPIndex);
  const afterSecondP = rawHTML.substring(pEndIndex + 4);
  const nextTagMatch = afterSecondP.match(/<(\w+)[\s>]/);
  expect(nextTagMatch).toBeTruthy();
  expect(nextTagMatch[1].toUpperCase()).toBe('UL');
});

// Test 18: ul has 2 items
test('You should have two items in your unordered list', async () => {
  const rawHTML = await getRawHTML();
  const liCount = countElementsInRaw(rawHTML, 'li');
  expect(liCount).toBe(2);
});

// Test 19: Both li contain anchors
test('Both your list items should contain an anchor element', async () => {
  const rawHTML = await getRawHTML();
  const ulMatch = rawHTML.match(/<ul[\s>]([\s\S]*?)<\/ul>/i);
  expect(ulMatch).toBeTruthy();
  const ulContent = ulMatch[1];
  const liMatches = ulContent.match(/<li[\s>]([\s\S]*?)<\/li>/gi);
  expect(liMatches).toBeTruthy();
  expect(liMatches.length).toBe(2);
  liMatches.forEach(li => {
    expect(li).toMatch(/<a[\s>]/i);
  });
});

// Test 20: First li anchor wraps "Group Travels"
test('The anchor element of your first list item should wrap the text Group Travels', async () => {
  const rawHTML = await getRawHTML();
  const ulMatch = rawHTML.match(/<ul[\s>]([\s\S]*?)<\/ul>/i);
  const liMatches = ulMatch[1].match(/<li[\s>]([\s\S]*?)<\/li>/gi);
  const firstLi = liMatches[0];
  const aMatch = firstLi.match(/<a[^>]*>([^<]+)<\/a>/i);
  expect(aMatch).toBeTruthy();
  expect(aMatch[1]).toMatch(/Group Travels/);
});

// Test 21: Second li anchor wraps "Private Tours"
test('The anchor element of your second list item should wrap the text Private Tours', async () => {
  const rawHTML = await getRawHTML();
  const ulMatch = rawHTML.match(/<ul[\s>]([\s\S]*?)<\/ul>/i);
  const liMatches = ulMatch[1].match(/<li[\s>]([\s\S]*?)<\/li>/gi);
  const secondLi = liMatches[1];
  const aMatch = secondLi.match(/<a[^>]*>([^<]+)<\/a>/i);
  expect(aMatch).toBeTruthy();
  expect(aMatch[1]).toMatch(/Private Tours/);
});

// Test 22: h2 after ul
test('You should have an h2 element after your unordered list', async () => {
  const rawHTML = await getRawHTML();
  const ulEndIndex = rawHTML.indexOf('</ul>');
  expect(ulEndIndex).toBeGreaterThan(-1);
  const afterUl = rawHTML.substring(ulEndIndex + 5);
  const nextTagMatch = afterUl.match(/<(\w+)[\s>]/);
  expect(nextTagMatch).toBeTruthy();
  expect(nextTagMatch[1].toUpperCase()).toBe('H2');
});

// Test 23: Second h2 has text "Top Itineraries"
test('Your second h2 element should have the text Top Itineraries', async () => {
  const rawHTML = await getRawHTML();
  const h2Matches = rawHTML.match(/<h2>([^<]+)<\/h2>/gi);
  expect(h2Matches).toBeTruthy();
  expect(h2Matches.length).toBeGreaterThanOrEqual(2);
  const secondH2Content = h2Matches[1].match(/<h2>([^<]+)<\/h2>/i)[1];
  expect(secondH2Content).toMatch(/Top Itineraries/);
});

// Test 24: At least 3 figure elements
test('You should have at least three figure elements', async () => {
  const rawHTML = await getRawHTML();
  const figureCount = countElementsInRaw(rawHTML, 'figure');
  expect(figureCount).toBeGreaterThanOrEqual(3);
});

// Test 25: Each figure first child is anchor
test('Each figure element should contain an anchor element as its first child', async () => {
  const rawHTML = await getRawHTML();
  const figureMatches = rawHTML.match(/<figure[\s>]([\s\S]*?)<\/figure>/gi);
  expect(figureMatches).toBeTruthy();
  expect(figureMatches.length).toBeGreaterThanOrEqual(3);
  figureMatches.forEach(figure => {
    const firstChildMatch = figure.match(/<figure[\s>][^>]*>\s*<(\w+)[\s>]/i);
    expect(firstChildMatch).toBeTruthy();
    expect(firstChildMatch[1].toUpperCase()).toBe('A');
  });
});

// Test 26: Each figure second child is figcaption
test('Each figure element should contain a figcaption element as its second child', async () => {
  const rawHTML = await getRawHTML();
  const figureMatches = rawHTML.match(/<figure[\s>]([\s\S]*?)<\/figure>/gi);
  expect(figureMatches.length).toBeGreaterThanOrEqual(3);
  figureMatches.forEach(figure => {
    const figcaptionMatch = figure.match(/<figcaption[\s>]/i);
    expect(figcaptionMatch).toBeTruthy();
  });
});

// Test 27: Each figcaption has text
test('Each figcaption should contain some text', async () => {
  const rawHTML = await getRawHTML();
  const figcaptionMatches = rawHTML.match(/<figcaption>([^<]+)<\/figcaption>/gi);
  expect(figcaptionMatches).toBeTruthy();
  expect(figcaptionMatches.length).toBeGreaterThanOrEqual(3);
  figcaptionMatches.forEach(figcaption => {
    const content = figcaption.match(/<figcaption>([^<]+)<\/figcaption>/i)[1];
    expect(content.trim().length).toBeGreaterThan(0);
  });
});

// Test 28: Each figure > a contains img
test('Each of the a elements that are children of your figure elements should contain an image', async () => {
  const rawHTML = await getRawHTML();
  const figureMatches = rawHTML.match(/<figure[\s>]([\s\S]*?)<\/figure>/gi);
  expect(figureMatches.length).toBeGreaterThanOrEqual(3);
  figureMatches.forEach(figure => {
    const aMatch = figure.match(/<a[^>]*>([\s\S]*?)<\/a>/i);
    expect(aMatch).toBeTruthy();
    const aContent = aMatch[1];
    expect(aContent).toMatch(/<img[\s>]/i);
  });
});

// Test 29: Each img has valid src
test('Each img element should have a valid src attribute', async () => {
  const rawHTML = await getRawHTML();
  const imgMatches = rawHTML.match(/<img[^>]*>/gi);
  expect(imgMatches).toBeTruthy();
  expect(imgMatches.length).toBeGreaterThanOrEqual(3);
  imgMatches.forEach(img => {
    const srcMatch = img.match(/src=["']([^"']+)["']/i);
    expect(srcMatch).toBeTruthy();
    const src = srcMatch[1];
    expect(src.trim().length).toBeGreaterThan(0);
    const isValidUrl = src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/') || src.startsWith('./') || src.startsWith('../');
    expect(isValidUrl).toBe(true);
  });
});

// Test 30: Each img has non-empty alt
test('Each img element should have an alt attribute with an appropriate value', async () => {
  const rawHTML = await getRawHTML();
  const imgMatches = rawHTML.match(/<img[^>]*>/gi);
  expect(imgMatches.length).toBeGreaterThanOrEqual(3);
  imgMatches.forEach(img => {
    const altMatch = img.match(/alt=["']([^"']*)["']/i);
    expect(altMatch).toBeTruthy();
    expect(altMatch[1].trim().length).toBeGreaterThan(0);
  });
});

// Test 31: All anchors have correct href
test('Each a element should have an href attribute with the value of https://se1400.github.io/curriculum . Don\'t forget the links in the list items', async () => {
  const rawHTML = await getRawHTML();
  const aMatches = rawHTML.match(/<a[^>]*>/gi);
  expect(aMatches).toBeTruthy();
  expect(aMatches.length).toBeGreaterThanOrEqual(5);
  aMatches.forEach(anchor => {
    const hrefMatch = anchor.match(/href=["']([^"']+)["']/i);
    expect(hrefMatch).toBeTruthy();
    expect(hrefMatch[1]).toBe('https://se1400.github.io/curriculum');
  });
});

// Test 32: All anchors have target="_blank"
test('Each a element should have a target attribute with the value of _blank. Don\'t forget the links in the list items', async () => {
  const rawHTML = await getRawHTML();
  const aMatches = rawHTML.match(/<a[^>]*>/gi);
  expect(aMatches.length).toBeGreaterThanOrEqual(5);
  aMatches.forEach(anchor => {
    const targetMatch = anchor.match(/target=["']([^"']+)["']/i);
    expect(targetMatch).toBeTruthy();
    expect(targetMatch[1]).toBe('_blank');
  });
});
