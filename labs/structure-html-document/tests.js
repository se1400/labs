// Helper: Detect if running in LiveCodes (where head content gets moved to body)
const isLiveCodes = () => {
  return document.querySelector('head > script#message-script') !== null ||
         document.querySelector('head > title')?.textContent === 'Untitled Project';
};

// Test 1: Meta charset inside head
// Note: In LiveCodes, student's head content ends up in body, so we check there
// to verify the student actually wrote it (not just LiveCodes's injected meta)
test('Your head element should contain a meta element with charset attribute set to "utf-8"', () => {
  if (isLiveCodes()) {
    // In LiveCodes, student's meta must be in body (proves they wrote it)
    const metaInBody = document.querySelector('body > meta[charset]');
    expect(metaInBody).toBeTruthy();
    expect(metaInBody.getAttribute('charset').toLowerCase()).toBe('utf-8');
  } else {
    // Non-LiveCodes: check head normally
    const metaInHead = document.querySelector('head > meta[charset]');
    expect(metaInHead).toBeTruthy();
    expect(metaInHead.getAttribute('charset').toLowerCase()).toBe('utf-8');
  }
});

// Test 2: Meta viewport inside head
// Accept both initial-scale=1 and initial-scale=1.0, and any order
test('Your head element should contain a meta element with name="viewport" and correct content', () => {
  let meta;
  if (isLiveCodes()) {
    // In LiveCodes, student's meta must be in body (proves they wrote it)
    meta = document.querySelector('body > meta[name="viewport"]');
  } else {
    // Non-LiveCodes: check head normally
    meta = document.querySelector('head > meta[name="viewport"]');
  }
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

// Test 3: Title element with correct text
// Note: In LiveCodes, title may end up in body, so we search anywhere
test('Your head element should contain a title element with the text "Utah Tech University"', () => {
  const titles = document.querySelectorAll('title');
  let found = false;
  for (const title of titles) {
    if (title.textContent.trim() === 'Utah Tech University') {
      found = true;
      break;
    }
  }
  expect(found).toBe(true);
});

// Helper: Filter out elements that don't belong in body (injected by LiveCodes or moved from head)
const HEAD_ELEMENTS = ['SCRIPT', 'STYLE', 'META', 'TITLE', 'LINK', 'BASE'];
const filterBodyChildren = (body) => {
  return Array.from(body.children).filter(el => !HEAD_ELEMENTS.includes(el.tagName));
};

// Test 4: Header element as first element in body
test('Your body should have a header element as its first child', () => {
  const body = document.querySelector('body');
  expect(body).toBeTruthy();
  const children = filterBodyChildren(body);
  expect(children.length).toBeGreaterThan(0);
  expect(children[0].tagName).toBe('HEADER');
});

// Test 5: H1 inside header with correct text
test('Your header element should contain an h1 element with the text "Utah Tech University"', () => {
  const header = document.querySelector('body header');
  expect(header).toBeTruthy();
  const h1 = header.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent.trim()).toBe('Utah Tech University');
});

// Test 6: Paragraph inside header with tagline, after h1
test('Your header element should contain a p element with the text "Active Learning. Active Life." after the h1', () => {
  const header = document.querySelector('body header');
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

// Test 7: Nav element after header with correct text
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
  const children = filterBodyChildren(body);
  const headerIndex = children.indexOf(header);
  const navIndex = children.indexOf(nav);
  expect(navIndex).toBeGreaterThan(headerIndex);
});

// Test 8: Main element after nav
test('Your body should have a main element after the nav', () => {
  const body = document.querySelector('body');
  expect(body).toBeTruthy();
  const nav = body.querySelector('nav');
  const main = body.querySelector('main');
  expect(nav).toBeTruthy();
  expect(main).toBeTruthy();
  // Verify main comes after nav
  const children = filterBodyChildren(body);
  const navIndex = children.indexOf(nav);
  const mainIndex = children.indexOf(main);
  expect(mainIndex).toBeGreaterThan(navIndex);
});

// Test 9: First section inside main
test('Your main element should contain at least one section element', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(1);
});

// Test 10: H2 inside first section with correct text
test('Your first section should contain an h2 element with the text "Welcome to Utah Tech"', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const firstSection = main.querySelector('section');
  expect(firstSection).toBeTruthy();
  const h2 = firstSection.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent.trim()).toBe('Welcome to Utah Tech');
});

// Test 11: At least one paragraph in first section with content
test('Your first section should contain at least one paragraph describing Utah Tech', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const firstSection = main.querySelector('section');
  expect(firstSection).toBeTruthy();
  const paragraphs = firstSection.querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  // Check that at least one paragraph has content
  let hasContent = false;
  for (const p of paragraphs) {
    if (p.textContent.trim().length > 0) {
      hasContent = true;
      break;
    }
  }
  expect(hasContent).toBe(true);
});

// Test 12: Second section inside main
test('Your main element should contain two section elements', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
});

// Test 13: H3 inside second section
test('Your second section should contain an h3 element with the text "Why Choose Utah Tech?"', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const h3 = sections[1].querySelector('h3');
  expect(h3).toBeTruthy();
  expect(h3.textContent.trim()).toBe('Why Choose Utah Tech?');
});

// Test 14: At least one paragraph in second section with content
test('Your second section should contain at least one paragraph about reasons to choose Utah Tech', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const paragraphs = sections[1].querySelectorAll('p');
  expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  // Check that at least one paragraph has content
  let hasContent = false;
  for (const p of paragraphs) {
    if (p.textContent.trim().length > 0) {
      hasContent = true;
      break;
    }
  }
  expect(hasContent).toBe(true);
});

// Test 15: Aside element inside main, after sections
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

// Test 16: H4 inside aside
test('Your aside element should contain an h4 element with the text "Visit Campus"', () => {
  const aside = document.querySelector('main aside');
  expect(aside).toBeTruthy();
  const h4 = aside.querySelector('h4');
  expect(h4).toBeTruthy();
  expect(h4.textContent.trim()).toBe('Visit Campus');
});

// Test 17: Paragraph with br inside aside, after h4
test('Your aside should have a paragraph with a call to action and a br element after the h4', () => {
  const aside = document.querySelector('main aside');
  expect(aside).toBeTruthy();
  const h4 = aside.querySelector('h4');
  const p = aside.querySelector('p');
  expect(h4).toBeTruthy();
  expect(p).toBeTruthy();
  const br = p.querySelector('br');
  expect(br).toBeTruthy();
  // Check that paragraph has content
  const text = p.textContent.trim();
  expect(text.length).toBeGreaterThan(0);
  // Verify p comes after h4
  const children = Array.from(aside.children);
  const h4Index = children.indexOf(h4);
  const pIndex = children.indexOf(p);
  expect(pIndex).toBeGreaterThan(h4Index);
});

// Test 18: Footer element in body, after main
test('Your body should have a footer element after the main', () => {
  const body = document.querySelector('body');
  expect(body).toBeTruthy();
  const main = body.querySelector('main');
  const footer = body.querySelector('footer');
  expect(main).toBeTruthy();
  expect(footer).toBeTruthy();
  // Verify footer comes after main
  const children = filterBodyChildren(body);
  const mainIndex = children.indexOf(main);
  const footerIndex = children.indexOf(footer);
  expect(footerIndex).toBeGreaterThan(mainIndex);
});

// Test 19: Hr element inside footer (first element)
test('Your footer element should start with an hr element', () => {
  const footer = document.querySelector('body footer');
  expect(footer).toBeTruthy();
  const hr = footer.querySelector('hr');
  expect(hr).toBeTruthy();
  // Verify hr is first element in footer
  const firstChild = footer.children[0];
  expect(firstChild.tagName).toBe('HR');
});

// Test 20: Copyright paragraph in footer, after hr
test('Your footer should contain a paragraph with copyright information after the hr', () => {
  const footer = document.querySelector('body footer');
  expect(footer).toBeTruthy();
  const hr = footer.querySelector('hr');
  const paragraphs = footer.querySelectorAll('p');
  expect(hr).toBeTruthy();
  expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  const copyrightP = paragraphs[0];
  // Check that paragraph has content
  const text = copyrightP.textContent.trim();
  expect(text.length).toBeGreaterThan(0);
  // Verify p comes after hr
  const children = Array.from(footer.children);
  const hrIndex = children.indexOf(hr);
  const pIndex = children.indexOf(copyrightP);
  expect(pIndex).toBeGreaterThan(hrIndex);
});

// Test 21: Address element in footer with br, after copyright p
test('Your footer should contain an address element with the school address and a br element after the copyright paragraph', () => {
  const footer = document.querySelector('body footer');
  expect(footer).toBeTruthy();
  const paragraphs = footer.querySelectorAll('p');
  const address = footer.querySelector('address');
  expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  expect(address).toBeTruthy();
  const br = address.querySelector('br');
  expect(br).toBeTruthy();
  // Check that address has content
  const text = address.textContent.trim();
  expect(text.length).toBeGreaterThan(0);
  // Verify address comes after the copyright paragraph
  const children = Array.from(footer.children);
  const pIndex = children.indexOf(paragraphs[0]);
  const addressIndex = children.indexOf(address);
  expect(addressIndex).toBeGreaterThan(pIndex);
});
