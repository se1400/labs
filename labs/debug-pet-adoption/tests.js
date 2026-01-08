// Test 1: img should have src attribute instead of href
test('Your img element should have a src attribute instead of the href attribute', () => {
  const img = document.querySelector('img');
  expect(img).toBeTruthy();
  expect(img.hasAttribute('src')).toBe(true);
  expect(img.hasAttribute('href')).toBe(false);
});

// Test 2: img should have alt attribute instead of att
test('Your img element should have an alt attribute instead of the non-existent att attribute', () => {
  const img = document.querySelector('img');
  expect(img).toBeTruthy();
  expect(img.hasAttribute('alt')).toBe(true);
  expect(img.hasAttribute('att')).toBe(false);
});

// Test 3: img should not have closing tag
test('Your img element should not have a </img> closing tag', async () => {
  // Try to find the playground instance at different window levels
  let playground;
  try {
    // Try parent.parent first (most likely)
    if (window.parent?.parent?.__livecodes__) {
      playground = window.parent.parent.__livecodes__;
    }
    // Try parent
    else if (window.parent?.__livecodes__) {
      playground = window.parent.__livecodes__;
    }
    // Try top window
    else if (window.top?.__livecodes__) {
      playground = window.top.__livecodes__;
    }
    // Try current window
    else if (window.__livecodes__) {
      playground = window.__livecodes__;
    }

    if (!playground) {
      throw new Error('Playground instance not found');
    }

    // Get the raw HTML source code from the editor
    const code = await playground.getCode();
    const htmlSource = code.markup.content;

    // Check if the source contains the invalid closing tag
    const hasClosingTag = htmlSource.includes('</img>') || htmlSource.includes('</IMG>');
    expect(hasClosingTag).toBe(false);
  } catch (error) {
    // If we can't access the playground, skip this test
    // This allows the other tests to still work
    throw new Error(`Cannot verify closing tag: ${error.message}`);
  }
});

// Test 4: First a element should have href instead of src
test('Your a element with the text Visit cats page needs to have an href attribute instead of a src attribute', () => {
  const links = document.querySelectorAll('a');
  const catsLink = Array.from(links).find(a => a.textContent.includes('Visit cats page'));
  expect(catsLink).toBeTruthy();
  expect(catsLink.hasAttribute('href')).toBe(true);
  expect(catsLink.hasAttribute('src')).toBe(false);
});

// Test 5: Second a element should have href instead of src
test('Your a element with the text Visit dogs page needs to have an href attribute instead of a src attribute', () => {
  const links = document.querySelectorAll('a');
  const dogsLink = Array.from(links).find(a => a.textContent.includes('Visit dogs page'));
  expect(dogsLink).toBeTruthy();
  expect(dogsLink.hasAttribute('href')).toBe(true);
  expect(dogsLink.hasAttribute('src')).toBe(false);
});
