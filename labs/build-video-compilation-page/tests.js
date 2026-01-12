// Test 1: Main element inside body
test('You should have a main element inside your body element', () => {
  const main = document.querySelector('body > main');
  expect(main).toBeTruthy();
});

// Test 2: Main is only child of body
test('Your main element should be the only child of the body element', () => {
  const bodyChildren = document.querySelectorAll('body > *');
  expect(bodyChildren.length).toBe(1);
  expect(bodyChildren[0].tagName).toBe('MAIN');
});

// Test 3: h1 inside main
test('You should have an h1 element with the topic of your page inside the main element', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const h1 = main.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent.trim().length).toBeGreaterThan(0);
});

// Test 4: p below h1
test('You should have a paragraph introducing the topic of your page below your h1 element', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const h1 = main.querySelector('h1');
  expect(h1).toBeTruthy();
  const nextElement = h1.nextElementSibling;
  expect(nextElement).toBeTruthy();
  expect(nextElement.tagName).toBe('P');
  expect(nextElement.textContent.trim().length).toBeGreaterThan(0);
});

// Test 5: Three sections below first p
test('You should have three section elements below your first p element', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBe(3);
});

// Test 6: Each section starts with h2
test('Each section element should start with an h2 element that serves as the title for that section', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBe(3);
  sections.forEach(section => {
    const firstChild = section.children[0];
    expect(firstChild).toBeTruthy();
    expect(firstChild.tagName).toBe('H2');
    expect(firstChild.textContent.trim().length).toBeGreaterThan(0);
  });
});

// Test 7: Each section has p as second child
test('Each section element should contain a p element to introduce the video content as its second child', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBe(3);
  sections.forEach(section => {
    const secondChild = section.children[1];
    expect(secondChild).toBeTruthy();
    expect(secondChild.tagName).toBe('P');
    expect(secondChild.textContent.trim().length).toBeGreaterThan(0);
  });
});

// Test 8: Each section has iframe as third child
test('Each section element should contain an iframe element as its third child', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBe(3);
  sections.forEach(section => {
    const thirdChild = section.children[2];
    expect(thirdChild).toBeTruthy();
    expect(thirdChild.tagName).toBe('IFRAME');
  });
});

// Test 9: First iframe has src
test('Your first iframe element should have a src attribute set to a valid video', () => {
  const iframes = document.querySelectorAll('iframe');
  expect(iframes.length).toBeGreaterThanOrEqual(1);
  const firstIframe = iframes[0];
  const src = firstIframe.getAttribute('src');
  expect(src).toBeTruthy();
  expect(src.trim().length).toBeGreaterThan(0);
});

// Test 10: First iframe has title
test('Your first iframe element should have a title attribute to describe the embedded content', () => {
  const iframes = document.querySelectorAll('iframe');
  expect(iframes.length).toBeGreaterThanOrEqual(1);
  const firstIframe = iframes[0];
  const title = firstIframe.getAttribute('title');
  expect(title).toBeTruthy();
  expect(title.trim().length).toBeGreaterThan(0);
});

// Test 11: First iframe has height
test('Your first iframe element should have a height attribute', () => {
  const iframes = document.querySelectorAll('iframe');
  expect(iframes.length).toBeGreaterThanOrEqual(1);
  const firstIframe = iframes[0];
  const height = firstIframe.getAttribute('height');
  expect(height).toBeTruthy();
  expect(height.trim().length).toBeGreaterThan(0);
});

// Test 12: First iframe has width
test('Your first iframe element should have a width attribute', () => {
  const iframes = document.querySelectorAll('iframe');
  expect(iframes.length).toBeGreaterThanOrEqual(1);
  const firstIframe = iframes[0];
  const width = firstIframe.getAttribute('width');
  expect(width).toBeTruthy();
  expect(width.trim().length).toBeGreaterThan(0);
});

// Test 13: Second iframe has src
test('Your second iframe element should have a src attribute set to a valid video', () => {
  const iframes = document.querySelectorAll('iframe');
  expect(iframes.length).toBeGreaterThanOrEqual(2);
  const secondIframe = iframes[1];
  const src = secondIframe.getAttribute('src');
  expect(src).toBeTruthy();
  expect(src.trim().length).toBeGreaterThan(0);
});

// Test 14: Second iframe has title
test('Your second iframe element should have a title attribute to describe the embedded content', () => {
  const iframes = document.querySelectorAll('iframe');
  expect(iframes.length).toBeGreaterThanOrEqual(2);
  const secondIframe = iframes[1];
  const title = secondIframe.getAttribute('title');
  expect(title).toBeTruthy();
  expect(title.trim().length).toBeGreaterThan(0);
});

// Test 15: Second iframe has height
test('Your second iframe element should have a height attribute', () => {
  const iframes = document.querySelectorAll('iframe');
  expect(iframes.length).toBeGreaterThanOrEqual(2);
  const secondIframe = iframes[1];
  const height = secondIframe.getAttribute('height');
  expect(height).toBeTruthy();
  expect(height.trim().length).toBeGreaterThan(0);
});

// Test 16: Second iframe has width
test('Your second iframe element should have a width attribute', () => {
  const iframes = document.querySelectorAll('iframe');
  expect(iframes.length).toBeGreaterThanOrEqual(2);
  const secondIframe = iframes[1];
  const width = secondIframe.getAttribute('width');
  expect(width).toBeTruthy();
  expect(width.trim().length).toBeGreaterThan(0);
});

// Test 17: Third iframe has src
test('Your third iframe element should have a src attribute set to a valid video', () => {
  const iframes = document.querySelectorAll('iframe');
  expect(iframes.length).toBeGreaterThanOrEqual(3);
  const thirdIframe = iframes[2];
  const src = thirdIframe.getAttribute('src');
  expect(src).toBeTruthy();
  expect(src.trim().length).toBeGreaterThan(0);
});

// Test 18: Third iframe has title
test('Your third iframe element should have a title attribute to describe the embedded content', () => {
  const iframes = document.querySelectorAll('iframe');
  expect(iframes.length).toBeGreaterThanOrEqual(3);
  const thirdIframe = iframes[2];
  const title = thirdIframe.getAttribute('title');
  expect(title).toBeTruthy();
  expect(title.trim().length).toBeGreaterThan(0);
});

// Test 19: Third iframe has height
test('Your third iframe element should have a height attribute', () => {
  const iframes = document.querySelectorAll('iframe');
  expect(iframes.length).toBeGreaterThanOrEqual(3);
  const thirdIframe = iframes[2];
  const height = thirdIframe.getAttribute('height');
  expect(height).toBeTruthy();
  expect(height.trim().length).toBeGreaterThan(0);
});

// Test 20: Third iframe has width
test('Your third iframe element should have a width attribute', () => {
  const iframes = document.querySelectorAll('iframe');
  expect(iframes.length).toBeGreaterThanOrEqual(3);
  const thirdIframe = iframes[2];
  const width = thirdIframe.getAttribute('width');
  expect(width).toBeTruthy();
  expect(width.trim().length).toBeGreaterThan(0);
});
