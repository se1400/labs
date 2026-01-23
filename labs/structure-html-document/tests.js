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

// Test 3: Head and body elements inside html (head before body)
test('Your html element should contain a head element followed by a body element', () => {
  const head = document.querySelector('html > head');
  const body = document.querySelector('html > body');
  expect(head).toBeTruthy();
  expect(body).toBeTruthy();
  // Verify head comes before body
  const htmlChildren = Array.from(document.documentElement.children);
  const headIndex = htmlChildren.indexOf(head);
  const bodyIndex = htmlChildren.indexOf(body);
  expect(headIndex).toBeLessThan(bodyIndex);
});

// Test 4: Meta charset inside head
test('Your head element should contain a meta element with charset attribute set to "utf-8"', () => {
  const meta = document.querySelector('head > meta[charset]');
  expect(meta).toBeTruthy();
  expect(meta.getAttribute('charset').toLowerCase()).toBe('utf-8');
});

// Test 5: Meta viewport inside head
// Accept both initial-scale=1 and initial-scale=1.0, and any order
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
test('Your header element should contain an h1 element with the text "Utah Tech University"', () => {
  const header = document.querySelector('body > header');
  expect(header).toBeTruthy();
  const h1 = header.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent.trim()).toBe('Utah Tech University');
});

// Test 9: Paragraph inside header with tagline, after h1
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
test('Your body should have a nav element after the header with the text "Home | Admissions | Academics | Campus Life"', () => {
  const body = document.querySelector('body');
  expect(body).toBeTruthy();
  const header = body.querySelector('header');
  const nav = body.querySelector('nav');
  expect(header).toBeTruthy();
  expect(nav).toBeTruthy();
  const text = nav.textContent.replace(/\s+/g, ' ').trim();
  expect(text).toBe('Home | Admissions | Academics | Campus Life');
  // Verify nav comes after header
  const children = Array.from(body.children).filter(el =>
    el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE'
  );
  const headerIndex = children.indexOf(header);
  const navIndex = children.indexOf(nav);
  expect(navIndex).toBeGreaterThan(headerIndex);
});

// Test 11: Main element after nav
test('Your body should have a main element after the nav', () => {
  const body = document.querySelector('body');
  expect(body).toBeTruthy();
  const nav = body.querySelector('nav');
  const main = body.querySelector('main');
  expect(nav).toBeTruthy();
  expect(main).toBeTruthy();
  // Verify main comes after nav
  const children = Array.from(body.children).filter(el =>
    el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE'
  );
  const navIndex = children.indexOf(nav);
  const mainIndex = children.indexOf(main);
  expect(mainIndex).toBeGreaterThan(navIndex);
});

// Test 12: First section inside main
test('Your main element should contain at least one section element', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(1);
});

// Test 13: H2 inside first section with correct text
test('Your first section should contain an h2 element with the text "Welcome to Utah Tech"', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const firstSection = main.querySelector('section');
  expect(firstSection).toBeTruthy();
  const h2 = firstSection.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent.trim()).toBe('Welcome to Utah Tech');
});

// Test 14: First paragraph in first section, after h2
test('Your first section should contain a paragraph about Utah Tech being located in St. George, after the h2', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const firstSection = main.querySelector('section');
  expect(firstSection).toBeTruthy();
  const h2 = firstSection.querySelector('h2');
  expect(h2).toBeTruthy();
  const paragraphs = firstSection.querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  expect(paragraphs[0].textContent.trim()).toBe('Utah Tech University is located in St. George, Utah. Our campus sits at the base of beautiful red rock cliffs in Southern Utah.');
  // Verify first paragraph comes after h2
  const children = Array.from(firstSection.children);
  const h2Index = children.indexOf(h2);
  const pIndex = children.indexOf(paragraphs[0]);
  expect(pIndex).toBeGreaterThan(h2Index);
});

// Test 15: Second paragraph in first section
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
test('Your second section should have a paragraph with "Beautiful weather and outdoor adventures."', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const paragraphs = sections[1].querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(3);
  expect(paragraphs[2].textContent.trim()).toBe('Beautiful weather and outdoor adventures.');
});

// Test 21: Aside element inside main, after sections
test('Your main element should contain an aside element after the sections', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  const aside = main.querySelector('aside');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  expect(aside).toBeTruthy();
  // Verify aside comes after the last section
  const children = Array.from(main.children);
  const lastSectionIndex = children.indexOf(sections[sections.length - 1]);
  const asideIndex = children.indexOf(aside);
  expect(asideIndex).toBeGreaterThan(lastSectionIndex);
});

// Test 22: H4 inside aside
test('Your aside element should contain an h4 element with the text "Visit Campus"', () => {
  const aside = document.querySelector('main > aside');
  expect(aside).toBeTruthy();
  const h4 = aside.querySelector('h4');
  expect(h4).toBeTruthy();
  expect(h4.textContent.trim()).toBe('Visit Campus');
});

// Test 23: Paragraph with br inside aside, after h4
test('Your aside should have a paragraph after the h4 with "Schedule a tour today!", a br element, and "Call us at (435) 652-7500"', () => {
  const aside = document.querySelector('main > aside');
  expect(aside).toBeTruthy();
  const h4 = aside.querySelector('h4');
  const p = aside.querySelector('p');
  expect(h4).toBeTruthy();
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
  // Verify p comes after h4
  const children = Array.from(aside.children);
  const h4Index = children.indexOf(h4);
  const pIndex = children.indexOf(p);
  expect(pIndex).toBeGreaterThan(h4Index);
});

// Test 24: Footer element in body, after main
test('Your body should have a footer element after the main', () => {
  const body = document.querySelector('body');
  expect(body).toBeTruthy();
  const main = body.querySelector('main');
  const footer = body.querySelector('footer');
  expect(main).toBeTruthy();
  expect(footer).toBeTruthy();
  // Verify footer comes after main
  const children = Array.from(body.children).filter(el =>
    el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE'
  );
  const mainIndex = children.indexOf(main);
  const footerIndex = children.indexOf(footer);
  expect(footerIndex).toBeGreaterThan(mainIndex);
});

// Test 25: Hr element inside footer (first element)
test('Your footer element should start with an hr element', () => {
  const footer = document.querySelector('body > footer');
  expect(footer).toBeTruthy();
  const hr = footer.querySelector('hr');
  expect(hr).toBeTruthy();
  // Verify hr is first element in footer
  const firstChild = footer.children[0];
  expect(firstChild.tagName).toBe('HR');
});

// Test 26: Copyright paragraph in footer, after hr
test('Your footer should contain a paragraph after the hr with "Copyright", the current year, and "Utah Tech University"', () => {
  const footer = document.querySelector('body > footer');
  expect(footer).toBeTruthy();
  const hr = footer.querySelector('hr');
  const paragraphs = footer.querySelectorAll('p');
  expect(hr).toBeTruthy();
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
  // Verify p comes after hr
  const children = Array.from(footer.children);
  const hrIndex = children.indexOf(hr);
  const pIndex = children.indexOf(copyrightP);
  expect(pIndex).toBeGreaterThan(hrIndex);
});

// Test 27: Address element in footer with br, after copyright p
test('Your footer should contain an address element after the copyright paragraph with "225 S 700 E", a br element, and "St. George, UT 84770"', () => {
  const footer = document.querySelector('body > footer');
  expect(footer).toBeTruthy();
  const paragraphs = footer.querySelectorAll('p');
  const address = footer.querySelector('address');
  expect(paragraphs.length).toBeGreaterThanOrEqual(1);
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
  // Verify address comes after the copyright paragraph
  const children = Array.from(footer.children);
  const pIndex = children.indexOf(paragraphs[0]);
  const addressIndex = children.indexOf(address);
  expect(addressIndex).toBeGreaterThan(pIndex);
});
