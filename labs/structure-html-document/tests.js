// Test 1: Document starts with doctype declaration
test('Your document should start with a <!doctype html> declaration on the first line', () => {
  const doctype = document.doctype;
  expect(doctype).toBeTruthy();
  expect(doctype.name).toBe('html');
});

// Test 2: HTML element with lang attribute set to "en"
test('Your html element should have a lang attribute set to "en"', () => {
  const html = document.documentElement;
  expect(html).toBeTruthy();
  expect(html.getAttribute('lang')).toBe('en');
});

// Test 3: Head and body elements inside html
test('Your html element should contain a head element and a body element', () => {
  const head = document.querySelector('html > head');
  const body = document.querySelector('html > body');
  expect(head).toBeTruthy();
  expect(body).toBeTruthy();
});

// Test 4: Meta charset inside head
test('Your head element should contain a meta element with charset attribute set to "utf-8"', () => {
  const meta = document.querySelector('head > meta[charset]');
  expect(meta).toBeTruthy();
  expect(meta.getAttribute('charset').toLowerCase()).toBe('utf-8');
});

// Test 5: Meta viewport inside head
// Fixed: Accept both initial-scale=1 and initial-scale=1.0, and any order
test('Your head element should contain a meta element with name="viewport" and correct content', () => {
  const meta = document.querySelector('head > meta[name="viewport"]');
  expect(meta).toBeTruthy();
  const content = meta.getAttribute('content');
  expect(content).toBeTruthy();
  // Normalize: remove spaces, convert to lowercase
  const normalized = content.replace(/\s/g, '').toLowerCase();
  // Check for width=device-width
  expect(normalized).toContain('width=device-width');
  // Check for initial-scale=1 or initial-scale=1.0
  expect(/initial-scale=1(\.0)?/.test(normalized)).toBe(true);
});

// Test 6: Title element with correct text
// Fixed: Trim whitespace
test('Your head element should contain a title element with the text "Utah Tech University"', () => {
  const title = document.querySelector('head > title');
  expect(title).toBeTruthy();
  expect(title.textContent.trim()).toBe('Utah Tech University');
});

// Test 7: Header element as first element in body
test('Your body element should have a header element as its first child', () => {
  const body = document.querySelector('body');
  expect(body).toBeTruthy();
  const children = Array.from(body.children).filter(el =>
    el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE'
  );
  expect(children.length).toBeGreaterThan(0);
  expect(children[0].tagName).toBe('HEADER');
});

// Test 8: H1 inside header with correct text
// Fixed: Trim whitespace
test('Your header element should contain an h1 element with the text "Utah Tech University"', () => {
  const header = document.querySelector('body > header');
  expect(header).toBeTruthy();
  const h1 = header.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent.trim()).toBe('Utah Tech University');
});

// Test 9: Paragraph inside header with tagline
// Fixed: Trim whitespace and verify p comes after h1
test('Your header element should contain a p element with the text "Active Learning. Active Life." after the h1', () => {
  const header = document.querySelector('body > header');
  expect(header).toBeTruthy();
  const h1 = header.querySelector('h1');
  expect(h1).toBeTruthy();
  const p = header.querySelector('p');
  expect(p).toBeTruthy();
  expect(p.textContent.trim()).toBe('Active Learning. Active Life.');
  // Verify p comes after h1 in DOM order
  const children = Array.from(header.children);
  const h1Index = children.indexOf(h1);
  const pIndex = children.indexOf(p);
  expect(pIndex).toBeGreaterThan(h1Index);
});

// Test 10: Nav element after header with correct text
// Fixed: Normalize multiple spaces
test('Your body should have a nav element with the text "Home | Admissions | Academics | Campus Life"', () => {
  const nav = document.querySelector('body > nav');
  expect(nav).toBeTruthy();
  const text = nav.textContent.replace(/\s+/g, ' ').trim();
  expect(text).toBe('Home | Admissions | Academics | Campus Life');
});

// Test 11: Main element after nav
test('Your body should have a main element', () => {
  const main = document.querySelector('body > main');
  expect(main).toBeTruthy();
});

// Test 12: First section inside main
test('Your main element should contain at least one section element', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(1);
});

// Test 13: H2 inside first section with correct text
// Fixed: Trim whitespace
test('Your first section should contain an h2 element with the text "Welcome to Utah Tech"', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const firstSection = main.querySelector('section');
  expect(firstSection).toBeTruthy();
  const h2 = firstSection.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent.trim()).toBe('Welcome to Utah Tech');
});

// Test 14: First paragraph in first section
// Fixed: Trim whitespace
test('Your first section should contain a paragraph about Utah Tech being located in St. George', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const firstSection = main.querySelector('section');
  expect(firstSection).toBeTruthy();
  const paragraphs = firstSection.querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  expect(paragraphs[0].textContent.trim()).toBe('Utah Tech University is located in St. George, Utah. Our campus sits at the base of beautiful red rock cliffs in Southern Utah.');
});

// Test 15: Second paragraph in first section
// Fixed: Trim whitespace
test('Your first section should contain a second paragraph about active learning', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const firstSection = main.querySelector('section');
  expect(firstSection).toBeTruthy();
  const paragraphs = firstSection.querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  expect(paragraphs[1].textContent.trim()).toBe('We are committed to active learning and helping students succeed.');
});

// Test 16: Second section inside main
test('Your main element should contain two section elements', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
});

// Test 17: H3 inside second section
// Fixed: Trim whitespace
test('Your second section should contain an h3 element with the text "Why Choose Utah Tech?"', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const h3 = sections[1].querySelector('h3');
  expect(h3).toBeTruthy();
  expect(h3.textContent.trim()).toBe('Why Choose Utah Tech?');
});

// Test 18: First paragraph in second section
// Fixed: Trim whitespace
test('Your second section should have a paragraph with "Small class sizes with hands-on learning."', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const paragraphs = sections[1].querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  expect(paragraphs[0].textContent.trim()).toBe('Small class sizes with hands-on learning.');
});

// Test 19: Second paragraph in second section
// Fixed: Trim whitespace
test('Your second section should have a paragraph with "Over 200 programs to choose from."', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const paragraphs = sections[1].querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  expect(paragraphs[1].textContent.trim()).toBe('Over 200 programs to choose from.');
});

// Test 20: Third paragraph in second section
// Fixed: Trim whitespace
test('Your second section should have a paragraph with "Beautiful weather and outdoor adventures."', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const paragraphs = sections[1].querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(3);
  expect(paragraphs[2].textContent.trim()).toBe('Beautiful weather and outdoor adventures.');
});

// Test 21: Aside element inside main
test('Your main element should contain an aside element', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const aside = main.querySelector('aside');
  expect(aside).toBeTruthy();
});

// Test 22: H4 inside aside
// Fixed: Trim whitespace
test('Your aside element should contain an h4 element with the text "Visit Campus"', () => {
  const aside = document.querySelector('main > aside');
  expect(aside).toBeTruthy();
  const h4 = aside.querySelector('h4');
  expect(h4).toBeTruthy();
  expect(h4.textContent.trim()).toBe('Visit Campus');
});

// Test 23: Paragraph with br inside aside
// Fixed: Verify text order (Schedule before Call us)
test('Your aside should have a paragraph with "Schedule a tour today!", a br element, and "Call us at (435) 652-7500"', () => {
  const aside = document.querySelector('main > aside');
  expect(aside).toBeTruthy();
  const p = aside.querySelector('p');
  expect(p).toBeTruthy();
  const br = p.querySelector('br');
  expect(br).toBeTruthy();
  const text = p.textContent.replace(/\s+/g, ' ').trim();
  expect(text).toContain('Schedule a tour today!');
  expect(text).toContain('Call us at (435) 652-7500');
  // Verify correct order: Schedule comes before Call us
  const scheduleIndex = text.indexOf('Schedule a tour today!');
  const callIndex = text.indexOf('Call us at (435) 652-7500');
  expect(scheduleIndex).toBeLessThan(callIndex);
});

// Test 24: Footer element in body
test('Your body should have a footer element', () => {
  const footer = document.querySelector('body > footer');
  expect(footer).toBeTruthy();
});

// Test 25: Hr element inside footer
test('Your footer element should contain an hr element', () => {
  const footer = document.querySelector('body > footer');
  expect(footer).toBeTruthy();
  const hr = footer.querySelector('hr');
  expect(hr).toBeTruthy();
});

// Test 26: Copyright paragraph in footer
// Fixed: Validate year is reasonable (2020-2099), verify order
test('Your footer should contain a paragraph with "Copyright", the current year, and "Utah Tech University"', () => {
  const footer = document.querySelector('body > footer');
  expect(footer).toBeTruthy();
  const paragraphs = footer.querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  const copyrightP = paragraphs[0];
  const text = copyrightP.textContent;
  expect(text).toContain('Copyright');
  expect(text).toContain('Utah Tech University');
  // Check for a valid year (2020-2099)
  const yearMatch = text.match(/20[2-9]\d/);
  expect(yearMatch).toBeTruthy();
  // Verify order: Copyright, then year, then Utah Tech University
  const copyrightIndex = text.indexOf('Copyright');
  const yearIndex = text.indexOf(yearMatch[0]);
  const utahTechIndex = text.indexOf('Utah Tech University');
  expect(copyrightIndex).toBeLessThan(yearIndex);
  expect(yearIndex).toBeLessThan(utahTechIndex);
});

// Test 27: Address element in footer with br
// Fixed: Verify text order
test('Your footer should contain an address element with "225 S 700 E", a br element, and "St. George, UT 84770"', () => {
  const footer = document.querySelector('body > footer');
  expect(footer).toBeTruthy();
  const address = footer.querySelector('address');
  expect(address).toBeTruthy();
  const br = address.querySelector('br');
  expect(br).toBeTruthy();
  const text = address.textContent.replace(/\s+/g, ' ').trim();
  expect(text).toContain('225 S 700 E');
  expect(text).toContain('St. George, UT 84770');
  // Verify correct order: street address comes before city
  const streetIndex = text.indexOf('225 S 700 E');
  const cityIndex = text.indexOf('St. George, UT 84770');
  expect(streetIndex).toBeLessThan(cityIndex);
});
