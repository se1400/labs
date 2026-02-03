// ============================================
// Part 1: Google Font Tests
// ============================================

test('Step 1: Google Fonts preconnect link should exist in the <head>', () => {
  const preconnect = document.querySelector('link[rel="preconnect"][href*="fonts.googleapis.com"]');
  if (!preconnect) {
    throw new Error(
      'Missing Google Fonts preconnect link.\n\n' +
      'Add this line in your <head> section after the stylesheet link:\n' +
      '<link rel="preconnect" href="https://fonts.googleapis.com">'
    );
  }
  expect(preconnect).toBeTruthy();
});

test('Step 1: Google Fonts stylesheet link for Montserrat should exist', () => {
  const fontLink = document.querySelector('link[href*="fonts.googleapis.com/css2"][href*="Montserrat"]');
  if (!fontLink) {
    throw new Error(
      'Missing Google Fonts Montserrat stylesheet link.\n\n' +
      'Add this line in your <head> section:\n' +
      '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">'
    );
  }
  expect(fontLink).toBeTruthy();
});

test('Step 2: The h1 should use Montserrat font-family in CSS', () => {
  let found = false;
  let h1RuleExists = false;

  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        // Check for exact h1 selector (not h1, h2 or .h1-class)
        if (rule.selectorText && (rule.selectorText === 'h1' || rule.selectorText.match(/^h1\s*$/))) {
          h1RuleExists = true;
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

  if (!h1RuleExists) {
    throw new Error(
      'Could not find an h1 rule in your CSS.\n\n' +
      'Make sure you have a rule that starts with:\n' +
      'h1 {\n' +
      '    ...\n' +
      '}'
    );
  }

  if (!found) {
    throw new Error(
      'The h1 rule exists but is missing the Montserrat font-family.\n\n' +
      'Add this property to your h1 rule in CSS:\n' +
      "font-family: 'Montserrat', sans-serif;"
    );
  }

  expect(found).toBe(true);
});

// ============================================
// Part 2: Text Alignment Tests
// ============================================

test('Step 3: The header element should have text-align: center in CSS', () => {
  let found = false;
  let headerRuleExists = false;

  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        // Check for exact header selector
        if (rule.selectorText && (rule.selectorText === 'header' || rule.selectorText.match(/^header\s*$/))) {
          headerRuleExists = true;
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

  if (!headerRuleExists) {
    throw new Error(
      'Could not find a header rule in your CSS.\n\n' +
      'Look for the existing header rule and add text-align to it.'
    );
  }

  if (!found) {
    throw new Error(
      'The header rule exists but is missing text-align: center.\n\n' +
      'Add this property to your header rule in CSS:\n' +
      'text-align: center;'
    );
  }

  expect(found).toBe(true);
});

// ============================================
// Part 3: Special Characters & Year Tests
// ============================================

test('Step 4: Footer should contain the copyright symbol ©', () => {
  const footer = document.querySelector('footer');
  if (!footer) {
    throw new Error('Could not find a <footer> element on the page.');
  }

  if (!footer.textContent.includes('©')) {
    throw new Error(
      'The footer is missing the copyright symbol.\n\n' +
      'In the footer paragraph, change "Copyright" to the HTML entity: &copy;\n' +
      'This will display as: ©'
    );
  }

  expect(footer.textContent).toContain('©');
});

test('Step 4: Footer should have a <span> with id="year" for the copyright year', () => {
  const footer = document.querySelector('footer');
  if (!footer) {
    throw new Error('Could not find a <footer> element on the page.');
  }

  const yearSpan = footer.querySelector('span#year');
  if (!yearSpan) {
    throw new Error(
      'Missing the year span in the footer.\n\n' +
      'Add a <span> with id="year" after the copyright symbol:\n' +
      '<p>&copy; <span id="year"></span> Utah Tech University</p>'
    );
  }

  expect(yearSpan).toBeTruthy();
});

test('Step 5: The year span should display the current year (JavaScript working)', () => {
  const yearSpan = document.querySelector('footer span#year');
  if (!yearSpan) {
    throw new Error('First add the <span id="year"> element (see Step 4).');
  }

  const currentYear = new Date().getFullYear().toString();
  const spanContent = yearSpan.textContent.trim();

  if (spanContent === '') {
    throw new Error(
      'The year span is empty. The JavaScript is not working.\n\n' +
      'Add this script just before the closing </body> tag:\n' +
      '<script>\n' +
      "    document.getElementById('year').textContent = new Date().getFullYear();\n" +
      '</script>'
    );
  }

  if (spanContent !== currentYear) {
    throw new Error(
      `The year span shows "${spanContent}" but should show "${currentYear}".\n\n` +
      'Check your JavaScript code.'
    );
  }

  expect(spanContent).toBe(currentYear);
});

// ============================================
// Part 4: Text Formatting Tags Tests
// ============================================

test('Step 6: "active learning" should be wrapped in <strong> tags', () => {
  const strong = document.querySelector('strong');

  if (!strong) {
    throw new Error(
      'No <strong> tag found on the page.\n\n' +
      'In the Welcome section, wrap "active learning" in <strong> tags:\n' +
      '<strong>active learning</strong>'
    );
  }

  const strongText = strong.textContent.toLowerCase();
  if (!strongText.includes('active learning')) {
    throw new Error(
      `Found a <strong> tag, but it contains "${strong.textContent}" instead of "active learning".\n\n` +
      'Make sure to wrap exactly "active learning" in <strong> tags.'
    );
  }

  expect(strongText).toContain('active learning');
});

test('Step 7: "succeed" should be wrapped in <em> tags', () => {
  const em = document.querySelector('em');

  if (!em) {
    throw new Error(
      'No <em> tag found on the page.\n\n' +
      'In the Welcome section, wrap "succeed" in <em> tags:\n' +
      '<em>succeed</em>'
    );
  }

  const emText = em.textContent.toLowerCase();
  if (!emText.includes('succeed')) {
    throw new Error(
      `Found an <em> tag, but it contains "${em.textContent}" instead of "succeed".\n\n` +
      'Make sure to wrap exactly "succeed" in <em> tags.'
    );
  }

  expect(emText).toContain('succeed');
});

test('Step 8: A <sup> tag should exist with "1" for the footnote reference', () => {
  const sup = document.querySelector('sup');

  if (!sup) {
    throw new Error(
      'No <sup> tag found on the page.\n\n' +
      'Add a superscript "1" after "ratio":\n' +
      'student-faculty ratio<sup>1</sup>'
    );
  }

  if (!sup.textContent.includes('1')) {
    throw new Error(
      `Found a <sup> tag, but it contains "${sup.textContent}" instead of "1".\n\n` +
      'The superscript should contain "1" for the footnote reference.'
    );
  }

  expect(sup.textContent).toContain('1');
});

test('Step 9: A <pre> tag should exist inside the footer for the address', () => {
  const footer = document.querySelector('footer');
  if (!footer) {
    throw new Error('Could not find a <footer> element on the page.');
  }

  const pre = footer.querySelector('pre');
  if (!pre) {
    throw new Error(
      'No <pre> tag found in the footer.\n\n' +
      'Wrap the address content in <pre> tags inside the <address> element:\n' +
      '<address>\n' +
      '<pre>225 S 700 E\n' +
      'St. George, UT 84770</pre>\n' +
      '</address>'
    );
  }

  // Check that it contains address-like content
  const preText = pre.textContent.toLowerCase();
  if (!preText.includes('george') && !preText.includes('700')) {
    throw new Error(
      'Found a <pre> tag in the footer, but it doesn\'t seem to contain the address.\n\n' +
      'Make sure the address (225 S 700 E, St. George, UT 84770) is inside the <pre> tags.'
    );
  }

  expect(pre).toBeTruthy();
});

// ============================================
// Part 5: Unordered List Tests
// ============================================

test('Step 10: An unordered list <ul> should exist', () => {
  const ul = document.querySelector('ul');

  if (!ul) {
    throw new Error(
      'No <ul> (unordered list) found on the page.\n\n' +
      'Create an unordered list for the colleges:\n' +
      '<ul>\n' +
      '    <li>College of Science, Engineering & Technology</li>\n' +
      '    <!-- more list items -->\n' +
      '</ul>'
    );
  }

  expect(ul).toBeTruthy();
});

test('Step 10: The unordered list should have 5 colleges as list items', () => {
  const ul = document.querySelector('ul');
  if (!ul) {
    throw new Error('First create a <ul> element (see previous test).');
  }

  // Get direct children li elements only (not nested ones)
  const items = ul.querySelectorAll(':scope > li');

  if (items.length < 5) {
    throw new Error(
      `Found ${items.length} list items, but need 5 colleges.\n\n` +
      'Add all five colleges as <li> items:\n' +
      '- College of Science, Engineering & Technology\n' +
      '- College of Health Sciences\n' +
      '- College of Humanities & Social Sciences\n' +
      '- College of Education\n' +
      '- College of the Arts'
    );
  }

  expect(items.length).toBeGreaterThanOrEqual(5);
});

// ============================================
// Part 6: Nested List Tests
// ============================================

test('Step 11: A nested list should exist (ul inside an li)', () => {
  const nestedUl = document.querySelector('li > ul');

  if (!nestedUl) {
    throw new Error(
      'No nested list found.\n\n' +
      'Add a <ul> inside the first college\'s <li>:\n' +
      '<li>College of Science, Engineering & Technology\n' +
      '    <ul>\n' +
      '        <li>Computer Science</li>\n' +
      '        <li>Software Engineering</li>\n' +
      '        <li>Biology</li>\n' +
      '    </ul>\n' +
      '</li>'
    );
  }

  expect(nestedUl).toBeTruthy();
});

test('Step 11: The nested list should have 3 programs', () => {
  const nestedUl = document.querySelector('li > ul');
  if (!nestedUl) {
    throw new Error('First create a nested list (see previous test).');
  }

  const items = nestedUl.querySelectorAll('li');

  if (items.length < 3) {
    throw new Error(
      `Found ${items.length} items in the nested list, but need 3 programs.\n\n` +
      'Add these three programs:\n' +
      '- Computer Science\n' +
      '- Software Engineering\n' +
      '- Biology'
    );
  }

  expect(items.length).toBeGreaterThanOrEqual(3);
});

// ============================================
// Part 7: Ordered List Tests
// ============================================

test('Step 12: An ordered list <ol> should exist', () => {
  const ol = document.querySelector('ol');

  if (!ol) {
    throw new Error(
      'No <ol> (ordered list) found on the page.\n\n' +
      'Create an ordered list for "How to Apply":\n' +
      '<ol>\n' +
      '    <li>Submit your application online</li>\n' +
      '    <li>Send official transcripts</li>\n' +
      '    <li>Complete the FAFSA for financial aid</li>\n' +
      '</ol>'
    );
  }

  expect(ol).toBeTruthy();
});

test('Step 12: The ordered list should have 3 steps', () => {
  const ol = document.querySelector('ol');
  if (!ol) {
    throw new Error('First create an <ol> element (see previous test).');
  }

  const items = ol.querySelectorAll('li');

  if (items.length < 3) {
    throw new Error(
      `Found ${items.length} list items, but need 3 steps.\n\n` +
      'Add all three steps:\n' +
      '1. Submit your application online\n' +
      '2. Send official transcripts\n' +
      '3. Complete the FAFSA for financial aid'
    );
  }

  expect(items.length).toBeGreaterThanOrEqual(3);
});

// ============================================
// Part 8: Table Structure Tests
// ============================================

test('Step 13: A <table> element should exist', () => {
  const table = document.querySelector('table');

  if (!table) {
    throw new Error(
      'No <table> element found on the page.\n\n' +
      'Create a table in the "Tuition & Fees" section:\n' +
      '<table>\n' +
      '    <thead>...</thead>\n' +
      '    <tbody>...</tbody>\n' +
      '</table>'
    );
  }

  expect(table).toBeTruthy();
});

test('Step 13: The table should have a <thead> element', () => {
  const table = document.querySelector('table');
  if (!table) {
    throw new Error('First create a <table> element (see previous test).');
  }

  const thead = table.querySelector('thead');
  if (!thead) {
    throw new Error(
      'The table is missing a <thead> element.\n\n' +
      'Add a <thead> inside your table for the header row(s):\n' +
      '<table>\n' +
      '    <thead>\n' +
      '        <tr><th>...</th></tr>\n' +
      '    </thead>\n' +
      '    ...\n' +
      '</table>'
    );
  }

  expect(thead).toBeTruthy();
});

test('Step 13: The table should have a <tbody> element', () => {
  const table = document.querySelector('table');
  if (!table) {
    throw new Error('First create a <table> element.');
  }

  const tbody = table.querySelector('tbody');
  if (!tbody) {
    throw new Error(
      'The table is missing a <tbody> element.\n\n' +
      'Add a <tbody> inside your table for the data rows:\n' +
      '<table>\n' +
      '    <thead>...</thead>\n' +
      '    <tbody>\n' +
      '        <tr><td>...</td></tr>\n' +
      '    </tbody>\n' +
      '</table>'
    );
  }

  expect(tbody).toBeTruthy();
});

test('Step 13: The table should have <th> (header) cells', () => {
  const table = document.querySelector('table');
  if (!table) {
    throw new Error('First create a <table> element.');
  }

  const th = table.querySelector('th');
  if (!th) {
    throw new Error(
      'The table is missing <th> (header) cells.\n\n' +
      'Add header cells inside a <tr> in your <thead>:\n' +
      '<thead>\n' +
      '    <tr>\n' +
      '        <th>Program</th>\n' +
      '        <th>Resident</th>\n' +
      '        <th>Non-Resident</th>\n' +
      '    </tr>\n' +
      '</thead>'
    );
  }

  expect(th).toBeTruthy();
});

test('Step 14: The table should have <td> (data) cells with tuition information', () => {
  const table = document.querySelector('table');
  if (!table) {
    throw new Error('First create a <table> element.');
  }

  const tbody = table.querySelector('tbody');
  if (!tbody) {
    throw new Error('First add a <tbody> element to your table.');
  }

  const rows = tbody.querySelectorAll('tr');
  if (rows.length < 3) {
    throw new Error(
      `Found ${rows.length} data rows, but need at least 3.\n\n` +
      'Add rows for Undergraduate, Graduate, and Online tuition.'
    );
  }

  const td = table.querySelector('td');
  if (!td) {
    throw new Error(
      'The table is missing <td> (data) cells.\n\n' +
      'Add data rows inside your <tbody>:\n' +
      '<tbody>\n' +
      '    <tr>\n' +
      '        <td>Undergraduate</td>\n' +
      '        <td>$???</td>\n' +
      '        <td>$???</td>\n' +
      '    </tr>\n' +
      '    <!-- more rows -->\n' +
      '</tbody>'
    );
  }

  // Check for dollar amounts (tuition prices)
  const tableText = table.textContent;
  const dollarAmounts = tableText.match(/\$\d+/g);

  if (!dollarAmounts || dollarAmounts.length < 5) {
    throw new Error(
      'The table needs tuition prices with dollar amounts.\n\n' +
      'Look up current tuition rates at:\n' +
      'https://catalog.utahtech.edu/tuitionfees/\n\n' +
      'Make sure each price starts with $ (e.g., $227, $725)'
    );
  }

  expect(dollarAmounts.length).toBeGreaterThanOrEqual(5);
});

// ============================================
// Part 9: Table Spanning Tests
// ============================================

test('Step 15: A table header cell should have colspan="3"', () => {
  const table = document.querySelector('table');
  if (!table) {
    throw new Error('First create a <table> element.');
  }

  const colspanCell = table.querySelector('th[colspan="3"]');
  if (!colspanCell) {
    // Check if they have colspan but wrong value
    const anyColspan = table.querySelector('[colspan]');
    if (anyColspan) {
      const value = anyColspan.getAttribute('colspan');
      throw new Error(
        `Found colspan="${value}", but it should be colspan="3".\n\n` +
        'The title row should span all 3 columns.'
      );
    }

    throw new Error(
      'No cell with colspan="3" found.\n\n' +
      'Add a title row at the top of your <thead>:\n' +
      '<thead>\n' +
      '    <tr>\n' +
      '        <th colspan="3">Tuition Per Credit Hour</th>\n' +
      '    </tr>\n' +
      '    <tr>\n' +
      '        <th>Program</th>\n' +
      '        <!-- ... -->\n' +
      '    </tr>\n' +
      '</thead>'
    );
  }

  expect(colspanCell).toBeTruthy();
});

test('Step 16: A table data cell should have rowspan="2"', () => {
  const table = document.querySelector('table');
  if (!table) {
    throw new Error('First create a <table> element.');
  }

  const rowspanCell = table.querySelector('td[rowspan="2"]');
  if (!rowspanCell) {
    // Check if they have rowspan but wrong value
    const anyRowspan = table.querySelector('[rowspan]');
    if (anyRowspan) {
      const value = anyRowspan.getAttribute('rowspan');
      throw new Error(
        `Found rowspan="${value}", but it should be rowspan="2".\n\n` +
        'The "Campus" cell should span 2 rows (Undergraduate and Graduate).'
      );
    }

    throw new Error(
      'No cell with rowspan="2" found.\n\n' +
      'In your first data row, change the "Undergraduate" cell to "Campus" with rowspan="2":\n' +
      '<tr>\n' +
      '    <td rowspan="2">Campus</td>\n' +
      '    <td>Undergraduate: $227</td>\n' +
      '    <td>$725</td>\n' +
      '</tr>\n\n' +
      'Then remove the first <td> from the Graduate row since it\'s covered by the rowspan.'
    );
  }

  // Check that the rowspan cell contains "Campus"
  const cellText = rowspanCell.textContent.toLowerCase();
  if (!cellText.includes('campus')) {
    throw new Error(
      `Found a cell with rowspan="2", but it contains "${rowspanCell.textContent}" instead of "Campus".\n\n` +
      'The cell with rowspan="2" should contain the text "Campus".'
    );
  }

  expect(rowspanCell).toBeTruthy();
});
