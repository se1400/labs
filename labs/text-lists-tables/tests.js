// ============================================
// Part 1: Google Font Tests
// ============================================

// Test 1: Google Font preconnect link exists
test('Google Fonts preconnect link should exist', () => {
  const preconnect = document.querySelector('link[rel="preconnect"][href*="fonts.googleapis.com"]');
  expect(preconnect).toBeTruthy();
});

// Test 2: Google Font stylesheet link exists
test('Google Fonts stylesheet link for Montserrat should exist', () => {
  const fontLink = document.querySelector('link[href*="fonts.googleapis.com/css2"][href*="Montserrat"]');
  expect(fontLink).toBeTruthy();
});

// ============================================
// Part 2: Text Alignment Tests
// ============================================

// Test 3: h1 has text-align center
test('The h1 element should have text-align: center', () => {
  let found = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('h1')) {
          const textAlign = rule.style.getPropertyValue('text-align');
          if (textAlign === 'center') {
            found = true;
            break;
          }
        }
      }
    } catch (e) {}
    if (found) break;
  }
  expect(found).toBe(true);
});

// ============================================
// Part 3: Special Characters Tests
// ============================================

// Test 4: Footer contains copyright symbol
test('Footer should contain the copyright symbol ©', () => {
  const footer = document.querySelector('footer');
  expect(footer).toBeTruthy();
  expect(footer.textContent).toContain('©');
});

// Test 5: Content contains degree symbol
test('Page should contain the degree symbol °', () => {
  const body = document.body;
  expect(body.textContent).toContain('°');
});

// ============================================
// Part 4: Text Formatting Tags Tests
// ============================================

// Test 6: Strong tag exists
test('A <strong> tag should exist with text content', () => {
  const strong = document.querySelector('strong');
  expect(strong).toBeTruthy();
  expect(strong.textContent.length).toBeGreaterThan(0);
});

// Test 7: Em tag exists
test('An <em> tag should exist with text content', () => {
  const em = document.querySelector('em');
  expect(em).toBeTruthy();
  expect(em.textContent.length).toBeGreaterThan(0);
});

// Test 8: Sup tag exists
test('A <sup> tag should exist (for footnote reference)', () => {
  const sup = document.querySelector('sup');
  expect(sup).toBeTruthy();
});

// Test 9: Pre tag exists
test('A <pre> tag should exist (for address formatting)', () => {
  const pre = document.querySelector('pre');
  expect(pre).toBeTruthy();
});

// ============================================
// Part 5: Unordered List Tests
// ============================================

// Test 10: Unordered list exists
test('An unordered list <ul> should exist', () => {
  const ul = document.querySelector('ul');
  expect(ul).toBeTruthy();
});

// Test 11: Unordered list has list items
test('The unordered list should have at least 3 <li> items', () => {
  const ul = document.querySelector('ul');
  expect(ul).toBeTruthy();
  const items = ul.querySelectorAll(':scope > li');
  expect(items.length).toBeGreaterThanOrEqual(3);
});

// ============================================
// Part 6: Nested List Tests
// ============================================

// Test 12: Nested list exists (ul inside li)
test('A nested list should exist (ul inside an li)', () => {
  const nestedUl = document.querySelector('li > ul');
  expect(nestedUl).toBeTruthy();
});

// Test 13: Nested list has items
test('The nested list should have at least 2 <li> items', () => {
  const nestedUl = document.querySelector('li > ul');
  expect(nestedUl).toBeTruthy();
  const items = nestedUl.querySelectorAll('li');
  expect(items.length).toBeGreaterThanOrEqual(2);
});

// ============================================
// Part 7: Ordered List Tests
// ============================================

// Test 14: Ordered list exists
test('An ordered list <ol> should exist', () => {
  const ol = document.querySelector('ol');
  expect(ol).toBeTruthy();
});

// Test 15: Ordered list has at least 3 items
test('The ordered list should have at least 3 <li> items', () => {
  const ol = document.querySelector('ol');
  expect(ol).toBeTruthy();
  const items = ol.querySelectorAll('li');
  expect(items.length).toBeGreaterThanOrEqual(3);
});

// ============================================
// Part 8: Definition List Tests
// ============================================

// Test 16: Definition list exists
test('A definition list <dl> should exist', () => {
  const dl = document.querySelector('dl');
  expect(dl).toBeTruthy();
});

// Test 17: Definition list has dt elements
test('The definition list should have <dt> (term) elements', () => {
  const dl = document.querySelector('dl');
  expect(dl).toBeTruthy();
  const terms = dl.querySelectorAll('dt');
  expect(terms.length).toBeGreaterThanOrEqual(2);
});

// Test 18: Definition list has dd elements
test('The definition list should have <dd> (definition) elements', () => {
  const dl = document.querySelector('dl');
  expect(dl).toBeTruthy();
  const definitions = dl.querySelectorAll('dd');
  expect(definitions.length).toBeGreaterThanOrEqual(2);
});

// ============================================
// Part 9: Table Structure Tests
// ============================================

// Test 19: Table exists
test('A <table> element should exist', () => {
  const table = document.querySelector('table');
  expect(table).toBeTruthy();
});

// Test 20: Table has thead
test('The table should have a <thead> element', () => {
  const thead = document.querySelector('table thead');
  expect(thead).toBeTruthy();
});

// Test 21: Table has tbody
test('The table should have a <tbody> element', () => {
  const tbody = document.querySelector('table tbody');
  expect(tbody).toBeTruthy();
});

// Test 22: Table has th (header cells)
test('The table should have <th> (header) cells', () => {
  const th = document.querySelector('table th');
  expect(th).toBeTruthy();
});

// Test 23: Table has td (data cells)
test('The table should have <td> (data) cells', () => {
  const td = document.querySelector('table td');
  expect(td).toBeTruthy();
});

// ============================================
// Part 10: Table Spanning Tests
// ============================================

// Test 24: colspan attribute exists
test('A table cell should have a colspan attribute', () => {
  const colspan = document.querySelector('table [colspan]');
  expect(colspan).toBeTruthy();
});

// Test 25: rowspan attribute exists
test('A table cell should have a rowspan attribute', () => {
  const rowspan = document.querySelector('table [rowspan]');
  expect(rowspan).toBeTruthy();
});

// ============================================
// Bonus: Content Verification Tests
// ============================================

// Test 26: h1 uses Montserrat font family
test('The h1 should use Montserrat font-family', () => {
  let found = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('h1')) {
          const fontFamily = rule.style.getPropertyValue('font-family').toLowerCase();
          if (fontFamily.includes('montserrat')) {
            found = true;
            break;
          }
        }
      }
    } catch (e) {}
    if (found) break;
  }
  expect(found).toBe(true);
});

// Test 27: Table contains tuition information
test('The table should contain tuition-related content', () => {
  const table = document.querySelector('table');
  expect(table).toBeTruthy();
  const content = table.textContent.toLowerCase();
  // Should contain some tuition-related terms
  const hasTuitionContent = content.includes('$') ||
                            content.includes('credit') ||
                            content.includes('resident') ||
                            content.includes('undergraduate') ||
                            content.includes('graduate');
  expect(hasTuitionContent).toBe(true);
});
