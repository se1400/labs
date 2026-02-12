// Test 1: h1 element exists
test('You should have an h1 element', () => {
  const h1 = document.querySelector('h1');
  expect(h1).toBeTruthy();
});

// Test 2: h1 has text
test('Your h1 should have some text representing the main title of the page', () => {
  const h1 = document.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent.trim().length).toBeGreaterThan(0);
});

// Test 3: Three section elements
test('You should have three section elements', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBe(3);
});

// Test 4: First section has h2
test('The first section should contain an h2 element', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(1);
  const firstSection = sections[0];
  const h2 = firstSection.querySelector('h2');
  expect(h2).toBeTruthy();
});

// Test 5: h2 has text for song title
test('Your h2 should have some text representing the title of the song playing', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(1);
  const firstSection = sections[0];
  const h2 = firstSection.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent.trim().length).toBeGreaterThan(0);
});

// Test 6: First section has audio element
test('The first section should contain an audio element', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(1);
  const firstSection = sections[0];
  const audio = firstSection.querySelector('audio');
  expect(audio).toBeTruthy();
});

// Test 7: audio has controls attribute
test('Your audio element should have a controls attribute', () => {
  const audio = document.querySelector('audio');
  expect(audio).toBeTruthy();
  expect(audio.hasAttribute('controls')).toBe(true);
});

// Test 8: audio has aria-label
test('Your audio element should have an aria-label attribute with text describing the audio', () => {
  const audio = document.querySelector('audio');
  expect(audio).toBeTruthy();
  const ariaLabel = audio.getAttribute('aria-label');
  expect(ariaLabel).toBeTruthy();
  expect(ariaLabel.trim().length).toBeGreaterThan(0);
});

// Test 9: audio has source element
test('Your audio element should have a source element', () => {
  const audio = document.querySelector('audio');
  expect(audio).toBeTruthy();
  const source = audio.querySelector('source');
  expect(source).toBeTruthy();
});

// Test 10: audio source has src attribute
test('Your source element should have a src attribute pointing to an audio file', () => {
  const audio = document.querySelector('audio');
  expect(audio).toBeTruthy();
  const source = audio.querySelector('source');
  expect(source).toBeTruthy();
  const src = source.getAttribute('src');
  expect(src).toBeTruthy();
  expect(src.trim().length).toBeGreaterThan(0);
});

// Test 11: audio source has type attribute
test('Your source element should have a type attribute with a value specifying the type of the audio', () => {
  const audio = document.querySelector('audio');
  expect(audio).toBeTruthy();
  const source = audio.querySelector('source');
  expect(source).toBeTruthy();
  const type = source.getAttribute('type');
  expect(type).toBeTruthy();
  expect(type.trim().length).toBeGreaterThan(0);
});

// Test 12: Second section has h2
test('The second section should contain an h2 element', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const secondSection = sections[1];
  const h2 = secondSection.querySelector('h2');
  expect(h2).toBeTruthy();
});

// Test 13: h2 has text for video title
test('Your h2 should have some text representing the title of the video playing', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const secondSection = sections[1];
  const h2 = secondSection.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent.trim().length).toBeGreaterThan(0);
});

// Test 14: Second section has video element
test('The second section should contain a video element', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const secondSection = sections[1];
  const video = secondSection.querySelector('video');
  expect(video).toBeTruthy();
});

// Test 15: video has controls attribute
test('Your video element should have a controls attribute', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  expect(video.hasAttribute('controls')).toBe(true);
});

// Test 16: video has width attribute
test('Your video element should have a width attribute with a value specifying the width of the video', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const width = video.getAttribute('width');
  expect(width).toBeTruthy();
  expect(width.trim().length).toBeGreaterThan(0);
});

// Test 17: video has source element
test('The video element should have a source element', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const source = video.querySelector('source');
  expect(source).toBeTruthy();
});

// Test 18: video source has src attribute
test('The source element should have a src attribute pointing to a video file', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const source = video.querySelector('source');
  expect(source).toBeTruthy();
  const src = source.getAttribute('src');
  expect(src).toBeTruthy();
  expect(src.trim().length).toBeGreaterThan(0);
});

// Test 19: video source has type attribute
test('The source element should have a type attribute with a value specifying the type of video', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const source = video.querySelector('source');
  expect(source).toBeTruthy();
  const type = source.getAttribute('type');
  expect(type).toBeTruthy();
  expect(type.trim().length).toBeGreaterThan(0);
});

// Test 20: video has track element
test('Your video element should have a track element', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const track = video.querySelector('track');
  expect(track).toBeTruthy();
});

// Test 21: track has src attribute
test('Your track element should have a src attribute pointing to a subtitles file', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const track = video.querySelector('track');
  expect(track).toBeTruthy();
  const src = track.getAttribute('src');
  expect(src).toBeTruthy();
  expect(src.trim().length).toBeGreaterThan(0);
});

// Test 22: track has kind attribute
test('Your track element should have a kind attribute with text describing the kind of file', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const track = video.querySelector('track');
  expect(track).toBeTruthy();
  const kind = track.getAttribute('kind');
  expect(kind).toBeTruthy();
  expect(kind.trim().length).toBeGreaterThan(0);
});

// Test 23: track has srclang attribute
test('Your track element should have a srclang attribute with text describing the language of the subtitles', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const track = video.querySelector('track');
  expect(track).toBeTruthy();
  const srclang = track.getAttribute('srclang');
  expect(srclang).toBeTruthy();
  expect(srclang.trim().length).toBeGreaterThan(0);
});

// Test 24: track has label attribute
test('Your track element should have a label attribute with text describing the language of the subtitles', () => {
  const video = document.querySelector('video');
  expect(video).toBeTruthy();
  const track = video.querySelector('track');
  expect(track).toBeTruthy();
  const label = track.getAttribute('label');
  expect(label).toBeTruthy();
  expect(label.trim().length).toBeGreaterThan(0);
});

// Test 25: Third section has h2
test('The third section should contain an h2 element', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(3);
  const thirdSection = sections[2];
  const h2 = thirdSection.querySelector('h2');
  expect(h2).toBeTruthy();
});

// Test 26: h2 has text for section title
test('Your h2 should have some text representing the title of the section', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(3);
  const thirdSection = sections[2];
  const h2 = thirdSection.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent.trim().length).toBeGreaterThan(0);
});

// Test 27: Third section has p element
test('The third section should contain a p element for the transcript', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(3);
  const thirdSection = sections[2];
  const p = thirdSection.querySelector('p');
  expect(p).toBeTruthy();
  expect(p.textContent.trim().length).toBeGreaterThan(0);
});
