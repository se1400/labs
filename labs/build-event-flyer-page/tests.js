// Test 1: header element within body
test('You should have a header element within the body element', () => {
  const header = document.querySelector('body > header');
  expect(header).toBeTruthy();
});

// Test 2: img as first child in header
test('You should have an img element as the first child in the header', () => {
  const header = document.querySelector('header');
  expect(header).toBeTruthy();
  const firstChild = header.firstElementChild;
  expect(firstChild).toBeTruthy();
  expect(firstChild.tagName.toLowerCase()).toBe('img');
});

// Test 3: h1 as second child in header
test('You should have an h1 element as the second child in the header', () => {
  const header = document.querySelector('header');
  expect(header).toBeTruthy();
  const children = header.children;
  expect(children.length).toBeGreaterThanOrEqual(2);
  expect(children[1].tagName.toLowerCase()).toBe('h1');
});

// Test 4: only one h1 element
test('You should only have one h1 element', () => {
  const h1Elements = document.querySelectorAll('h1');
  expect(h1Elements.length).toBe(1);
});

// Test 5: h1 should have title text
test('Your h1 should have the title of your event', () => {
  const h1 = document.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent.trim().length).toBeGreaterThan(0);
});

// Test 6: main element within body
test('You should have a main element within the body element', () => {
  const main = document.querySelector('body > main');
  expect(main).toBeTruthy();
});

// Test 7: at least two section elements within main
test('You should have at least two section elements within your main element', () => {
  const sections = document.querySelectorAll('main > section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
});

// Test 8: each section has an h2
test('Your section elements should each have an h2 within them', () => {
  const sections = document.querySelectorAll('main > section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  sections.forEach(section => {
    const h2 = section.querySelector('h2');
    expect(h2).toBeTruthy();
  });
});

// Test 9: h2 elements should not be empty
test('Your h2 elements should not be empty', () => {
  const h2Elements = document.querySelectorAll('section h2');
  expect(h2Elements.length).toBeGreaterThanOrEqual(2);
  h2Elements.forEach(h2 => {
    expect(h2.textContent.trim().length).toBeGreaterThan(0);
  });
});

// Test 10: body has top and bottom padding of 50px
test('Your body element should have a top and bottom padding of 50px', () => {
  let foundPaddingTop = false;
  let foundPaddingBottom = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText === 'body') {
          if (rule.style.paddingTop === '50px') {
            foundPaddingTop = true;
          }
          if (rule.style.paddingBottom === '50px') {
            foundPaddingBottom = true;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
  }
  expect(foundPaddingTop).toBe(true);
  expect(foundPaddingBottom).toBe(true);
});

// Test 11: body has top and bottom margin of 0
test('Your body element should have a top and bottom margin of 0', () => {
  let foundMarginTop = false;
  let foundMarginBottom = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText === 'body') {
          if (rule.style.marginTop === '0px' || rule.style.marginTop === '0') {
            foundMarginTop = true;
          }
          if (rule.style.marginBottom === '0px' || rule.style.marginBottom === '0') {
            foundMarginBottom = true;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
  }
  expect(foundMarginTop).toBe(true);
  expect(foundMarginBottom).toBe(true);
});

// Test 12: body has left and right margin of auto
test('Your body element should have a left and right margin of auto', () => {
  let foundMarginLeft = false;
  let foundMarginRight = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText === 'body') {
          if (rule.style.marginLeft === 'auto') {
            foundMarginLeft = true;
          }
          if (rule.style.marginRight === 'auto') {
            foundMarginRight = true;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
  }
  expect(foundMarginLeft).toBe(true);
  expect(foundMarginRight).toBe(true);
});

// Test 13: body width uses vw
test('Your body element should set its width using vw', () => {
  let foundVwWidth = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText === 'body') {
          if (rule.style.width && rule.style.width.includes('vw')) {
            foundVwWidth = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundVwWidth) break;
  }
  expect(foundVwWidth).toBe(true);
});

// Test 14: body uses calc for min-height of 100vh - 100px
test('Your body should use calc to set its min-height to 100vh - 100px', () => {
  let foundCalcMinHeight = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText === 'body') {
          const minHeight = rule.style.minHeight;
          if (minHeight && minHeight.includes('calc') && minHeight.includes('100vh') && minHeight.includes('100px')) {
            foundCalcMinHeight = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundCalcMinHeight) break;
  }
  expect(foundCalcMinHeight).toBe(true);
});

// Test 15: at least one hr element
test('You should have at least one hr element', () => {
  const hrElements = document.querySelectorAll('hr');
  expect(hrElements.length).toBeGreaterThanOrEqual(1);
});

// Test 16: hr width uses percent value
test('The width of your hr elements should be set using a percent value', () => {
  let foundPercentWidth = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText === 'hr') {
          if (rule.style.width && rule.style.width.includes('%')) {
            foundPercentWidth = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundPercentWidth) break;
  }
  expect(foundPercentWidth).toBe(true);
});

// Test 17: section width uses percent value
test('The width of your section elements should be set using a percent value', () => {
  let foundPercentWidth = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText === 'section') {
          if (rule.style.width && rule.style.width.includes('%')) {
            foundPercentWidth = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundPercentWidth) break;
  }
  expect(foundPercentWidth).toBe(true);
});
