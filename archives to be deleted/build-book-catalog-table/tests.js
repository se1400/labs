// Test 1: One table element
test('You should have one table element', () => {
  const tables = document.querySelectorAll('table');
  expect(tables.length).toBe(1);
});

// Test 2: thead element within table
test('You should have one thead element within your table element', () => {
  const table = document.querySelector('table');
  expect(table).toBeTruthy();
  const thead = table.querySelector('thead');
  expect(thead).toBeTruthy();
});

// Test 3: One tr element within thead
test('You should have one tr element within your thead element', () => {
  const thead = document.querySelector('thead');
  expect(thead).toBeTruthy();
  const rows = thead.querySelectorAll('tr');
  expect(rows.length).toBe(1);
});

// Test 4: Four th elements within thead row
test('You should have four th elements within your thead element\'s row', () => {
  const thead = document.querySelector('thead');
  expect(thead).toBeTruthy();
  const row = thead.querySelector('tr');
  expect(row).toBeTruthy();
  const headers = row.querySelectorAll('th');
  expect(headers.length).toBe(4);
});

// Test 5: th elements have correct text
test('Your four th elements should have the text Title, Author, Genre, and Publication Year, in that order', () => {
  const thead = document.querySelector('thead');
  expect(thead).toBeTruthy();
  const headers = thead.querySelectorAll('th');
  expect(headers.length).toBe(4);
  expect(headers[0].textContent).toMatch(/Title/);
  expect(headers[1].textContent).toMatch(/Author/);
  expect(headers[2].textContent).toMatch(/Genre/);
  expect(headers[3].textContent).toMatch(/Publication Year/);
});

// Test 6: tbody element within table
test('You should have one tbody element within your table element', () => {
  const table = document.querySelector('table');
  expect(table).toBeTruthy();
  const tbody = table.querySelector('tbody');
  expect(tbody).toBeTruthy();
});

// Test 7: tbody has at least five rows
test('Your tbody element should have at least five rows', () => {
  const tbody = document.querySelector('tbody');
  expect(tbody).toBeTruthy();
  const rows = tbody.querySelectorAll('tr');
  expect(rows.length).toBeGreaterThanOrEqual(5);
});

// Test 8: Each tbody row has exactly four td elements
test('Each row in your tbody element should have exactly four td elements as children', () => {
  const tbody = document.querySelector('tbody');
  expect(tbody).toBeTruthy();
  const rows = tbody.querySelectorAll('tr');
  expect(rows.length).toBeGreaterThanOrEqual(5);
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    expect(cells.length).toBe(4);
  });
});

// Test 9: Each td element has text
test('Each td element in your table body should have text with book information', () => {
  const tbody = document.querySelector('tbody');
  expect(tbody).toBeTruthy();
  const cells = tbody.querySelectorAll('td');
  expect(cells.length).toBeGreaterThanOrEqual(20); // 5 rows * 4 cells
  cells.forEach(cell => {
    expect(cell.textContent.trim().length).toBeGreaterThan(0);
  });
});

// Test 10: tfoot element within table
test('You should have one tfoot element within your table element', () => {
  const table = document.querySelector('table');
  expect(table).toBeTruthy();
  const tfoot = table.querySelector('tfoot');
  expect(tfoot).toBeTruthy();
});

// Test 11: One tr element in tfoot
test('You should have exactly one tr element in your tfoot element', () => {
  const tfoot = document.querySelector('tfoot');
  expect(tfoot).toBeTruthy();
  const rows = tfoot.querySelectorAll('tr');
  expect(rows.length).toBe(1);
});

// Test 12: td in tfoot has colspan of 4
test('The td element in your tfoot element\'s row should have it\'s colspan attribute set to 4', () => {
  const tfoot = document.querySelector('tfoot');
  expect(tfoot).toBeTruthy();
  const row = tfoot.querySelector('tr');
  expect(row).toBeTruthy();
  const cell = row.querySelector('td');
  expect(cell).toBeTruthy();
  const colspan = cell.getAttribute('colspan');
  expect(colspan).toBe('4');
});

// Test 13: tfoot td has correct text
test('The td element in your tfoot element\'s row should have the text Total Books: N where N is the number of books in your table', () => {
  const tbody = document.querySelector('tbody');
  expect(tbody).toBeTruthy();
  const bodyRows = tbody.querySelectorAll('tr');
  const bookCount = bodyRows.length;

  const tfoot = document.querySelector('tfoot');
  expect(tfoot).toBeTruthy();
  const footerCell = tfoot.querySelector('td');
  expect(footerCell).toBeTruthy();
  expect(footerCell.textContent).toMatch(/Total Books:/);
  expect(footerCell.textContent).toMatch(new RegExp(bookCount.toString()));
});
