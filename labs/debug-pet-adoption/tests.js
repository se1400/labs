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

// Test 3: First a element should have href instead of src
test('Your a element with the text Visit cats page needs to have an href attribute instead of a src attribute', () => {
  const links = document.querySelectorAll('a');
  const catsLink = Array.from(links).find(a => a.textContent.includes('Visit cats page'));
  expect(catsLink).toBeTruthy();
  expect(catsLink.hasAttribute('href')).toBe(true);
  expect(catsLink.hasAttribute('src')).toBe(false);
});

// Test 4: Second a element should have href instead of src
test('Your a element with the text Visit dogs page needs to have an href attribute instead of a src attribute', () => {
  const links = document.querySelectorAll('a');
  const dogsLink = Array.from(links).find(a => a.textContent.includes('Visit dogs page'));
  expect(dogsLink).toBeTruthy();
  expect(dogsLink.hasAttribute('href')).toBe(true);
  expect(dogsLink.hasAttribute('src')).toBe(false);
});
