// Test 1: h1 exists
test('You should have an h1 element for the main title of the page', () => {
  const h1 = document.querySelector('h1');
  expect(h1).toBeTruthy();
});

// Test 2: h1 not empty
test('Your h1 should not be empty', () => {
  const h1 = document.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent.trim().length).toBeGreaterThan(0);
});

// Test 3: Only one h1
test('You should have only one h1 element', () => {
  const h1Elements = document.querySelectorAll('h1');
  expect(h1Elements.length).toBe(1);
});

// Test 4: Two section elements
test('You should have two section elements', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBe(2);
});

// Test 5: First section has h2
test('Inside the first section element, you should have an h2 element for the title of the video playing', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(1);
  const firstSection = sections[0];
  const h2 = firstSection.querySelector('h2');
  expect(h2).toBeTruthy();
});

// Test 6: Video element below h2
test('Below the h2 element, you should have a video element', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(1);
  const firstSection = sections[0];
  const video = firstSection.querySelector('video');
  expect(video).toBeTruthy();
});

// Test 7: Video has controls
test('The video element should have a controls attribute', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  expect(video.hasAttribute('controls')).toBe(true);
});

// Test 8: Video has width=640
test('The video element should have a width attribute set to 640', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const width = video.getAttribute('width');
  expect(width).toBe('640');
});

// Test 9: Video has source element
test('Inside the video element, you should have a source element', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const source = video.querySelector('source');
  expect(source).toBeTruthy();
});

// Test 10: Source has src
test('The source element should have a src attribute pointing to a video file', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const source = video.querySelector('source');
  expect(source).toBeTruthy();
  const src = source.getAttribute('src');
  expect(src).toBeTruthy();
  expect(src.trim().length).toBeGreaterThan(0);
});

// Test 11: Source has type
test('The source element should have a type attribute', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const source = video.querySelector('source');
  expect(source).toBeTruthy();
  const type = source.getAttribute('type');
  expect(type).toBeTruthy();
  expect(type.trim().length).toBeGreaterThan(0);
});

// Test 12: Type matches media type
test('The type attribute should match the media type of the file extension of the src attribute', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const source = video.querySelector('source');
  expect(source).toBeTruthy();
  const src = source.getAttribute('src');
  const type = source.getAttribute('type');
  expect(src).toBeTruthy();
  expect(type).toBeTruthy();

  // Extract file extension from src
  const extension = src.split('.').pop().toLowerCase().split('?')[0];

  // Check if type matches common video formats
  const typeMap = {
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'ogv': 'video/ogg'
  };

  const expectedType = typeMap[extension];
  if (expectedType) {
    expect(type.toLowerCase()).toBe(expectedType);
  } else {
    // If not a standard format, just check that type starts with 'video/'
    expect(type.toLowerCase()).toMatch(/^video\//);
  }
});

// Test 13: Second section has h2
test('Inside the second section element, you should have an h2 element for the title of the song playing', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const secondSection = sections[1];
  const h2 = secondSection.querySelector('h2');
  expect(h2).toBeTruthy();
});

// Test 14: All h2s have text
test('All your h2 elements should contain some text', () => {
  const h2Elements = document.querySelectorAll('h2');
  expect(h2Elements.length).toBeGreaterThanOrEqual(2);
  h2Elements.forEach(h2 => {
    expect(h2.textContent.trim().length).toBeGreaterThan(0);
  });
});

// Test 15: Audio element below h2
test('Below the h2 element, you should have an audio element', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const secondSection = sections[1];
  const audio = secondSection.querySelector('audio');
  expect(audio).toBeTruthy();
});

// Test 16: Audio has controls
test('The audio element should have a controls attribute', () => {
  const audio = document.querySelector('audio');
  expect(audio).toBeTruthy();
  expect(audio.hasAttribute('controls')).toBe(true);
});

// Test 17: Audio has loop
test('The audio element should have a loop attribute', () => {
  const audio = document.querySelector('audio');
  expect(audio).toBeTruthy();
  expect(audio.hasAttribute('loop')).toBe(true);
});

// Test 18: Audio has src
test('The audio element should have a src attribute pointing to an audio file', () => {
  const audio = document.querySelector('audio');
  expect(audio).toBeTruthy();
  const src = audio.getAttribute('src');
  expect(src).toBeTruthy();
  expect(src.trim().length).toBeGreaterThan(0);
});
