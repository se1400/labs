// Test 1: Unordered list with class todo-list
test('You should have one unordered list with the class todo-list', () => {
  const todoList = document.querySelector('ul.todo-list');
  expect(todoList).toBeTruthy();
});

// Test 2: Four list items inside unordered list
test('You should have four list items inside the unordered list', () => {
  const todoList = document.querySelector('ul.todo-list');
  expect(todoList).toBeTruthy();
  const listItems = todoList.querySelectorAll(':scope > li');
  expect(listItems.length).toBe(4);
});

// Test 3: Each li contains input with type checkbox
test('The li inside the ul with the class todo-list should contain an input element with the type of checkbox', () => {
  const todoList = document.querySelector('ul.todo-list');
  expect(todoList).toBeTruthy();
  const listItems = todoList.querySelectorAll(':scope > li');
  expect(listItems.length).toBe(4);
  listItems.forEach(li => {
    const input = li.querySelector('input[type="checkbox"]');
    expect(input).toBeTruthy();
  });
});

// Test 4: Each li contains a label element
test('The li inside the ul with the class todo-list should contain a label element', () => {
  const todoList = document.querySelector('ul.todo-list');
  expect(todoList).toBeTruthy();
  const listItems = todoList.querySelectorAll(':scope > li');
  expect(listItems.length).toBe(4);
  listItems.forEach(li => {
    const label = li.querySelector('label');
    expect(label).toBeTruthy();
  });
});

// Test 5: All input elements have an id
test('All input elements should have an id', () => {
  const inputs = document.querySelectorAll('ul.todo-list input[type="checkbox"]');
  expect(inputs.length).toBeGreaterThanOrEqual(4);
  inputs.forEach(input => {
    const id = input.getAttribute('id');
    expect(id).toBeTruthy();
    expect(id.trim().length).toBeGreaterThan(0);
  });
});

// Test 6: All label elements have a for attribute
test('All label elements should have a for attribute', () => {
  const labels = document.querySelectorAll('ul.todo-list label');
  expect(labels.length).toBeGreaterThanOrEqual(4);
  labels.forEach(label => {
    const forAttr = label.getAttribute('for');
    expect(forAttr).toBeTruthy();
    expect(forAttr.trim().length).toBeGreaterThan(0);
  });
});

// Test 7: All label elements have some text
test('All label elements should have some text', () => {
  const labels = document.querySelectorAll('ul.todo-list label');
  expect(labels.length).toBeGreaterThanOrEqual(4);
  labels.forEach(label => {
    expect(label.textContent.trim().length).toBeGreaterThan(0);
  });
});

// Test 8: id and for attributes have corresponding values
test('The id and for attributes of the input and label elements pairs, should have corresponding values', () => {
  const todoList = document.querySelector('ul.todo-list');
  expect(todoList).toBeTruthy();
  const listItems = todoList.querySelectorAll(':scope > li');
  expect(listItems.length).toBe(4);
  listItems.forEach(li => {
    const input = li.querySelector('input[type="checkbox"]');
    const label = li.querySelector('label');
    expect(input).toBeTruthy();
    expect(label).toBeTruthy();
    const inputId = input.getAttribute('id');
    const labelFor = label.getAttribute('for');
    expect(inputId).toBe(labelFor);
  });
});

// Test 9: After label, there should be ul with class sub-item
test('After the label elements, there should be an unordered list with the class sub-item', () => {
  const todoList = document.querySelector('ul.todo-list');
  expect(todoList).toBeTruthy();
  const listItems = todoList.querySelectorAll(':scope > li');
  expect(listItems.length).toBe(4);
  listItems.forEach(li => {
    const subItem = li.querySelector('ul.sub-item');
    expect(subItem).toBeTruthy();
  });
});

// Test 10: li inside ul.sub-item has anchor with class sub-item-link
test('The li inside the ul with the class sub-item should have an anchor element with the class sub-item-link', () => {
  const subItems = document.querySelectorAll('ul.sub-item');
  expect(subItems.length).toBeGreaterThanOrEqual(4);
  subItems.forEach(subItem => {
    const anchor = subItem.querySelector('li a.sub-item-link');
    expect(anchor).toBeTruthy();
  });
});

// Test 11: All anchor elements have valid href
test('All anchor elements should have a valid href attribute', () => {
  const anchors = document.querySelectorAll('a.sub-item-link');
  expect(anchors.length).toBeGreaterThanOrEqual(4);
  anchors.forEach(anchor => {
    const href = anchor.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href.trim().length).toBeGreaterThan(0);
  });
});

// Test 12: All anchor elements have text
test('All anchor elements should have text', () => {
  const anchors = document.querySelectorAll('a.sub-item-link');
  expect(anchors.length).toBeGreaterThanOrEqual(4);
  anchors.forEach(anchor => {
    expect(anchor.textContent.trim().length).toBeGreaterThan(0);
  });
});

// Test 13: Each anchor has target="_blank"
test('Each a element should have a target attribute with the value of _blank', () => {
  const anchors = document.querySelectorAll('a.sub-item-link');
  expect(anchors.length).toBeGreaterThanOrEqual(4);
  anchors.forEach(anchor => {
    const target = anchor.getAttribute('target');
    expect(target).toBe('_blank');
  });
});

// Test 14: a elements should not have text decorations
test('Your a elements should not have any text decorations', () => {
  let foundNoTextDecoration = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('a')) {
          if (rule.style.textDecoration === 'none' || rule.style.textDecorationLine === 'none') {
            foundNoTextDecoration = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundNoTextDecoration) break;
  }
  expect(foundNoTextDecoration).toBe(true);
});

// Test 15: Unvisited links should have a text color
test('Unvisited links should have a text color set to a color of your choice', () => {
  let foundLinkColor = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && (rule.selectorText.includes('a:link') ||
            (rule.selectorText === 'a' || rule.selectorText.includes('.sub-item-link')))) {
          if (rule.style.color && rule.style.color.length > 0) {
            foundLinkColor = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundLinkColor) break;
  }
  expect(foundLinkColor).toBe(true);
});

// Test 16: Links should change color when hovered
test('The links should change color when hovered over', () => {
  let foundHoverColor = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes(':hover')) {
          if (rule.style.color && rule.style.color.length > 0) {
            foundHoverColor = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundHoverColor) break;
  }
  expect(foundHoverColor).toBe(true);
});

// Test 17: Links should change color when clicked (active)
test('The links should change color when they are being clicked', () => {
  let foundActiveColor = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes(':active')) {
          if (rule.style.color && rule.style.color.length > 0) {
            foundActiveColor = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundActiveColor) break;
  }
  expect(foundActiveColor).toBe(true);
});

// Test 18: Links should have outline when focused
test('The links should have an outline when focused', () => {
  let foundFocusOutline = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes(':focus')) {
          if ((rule.style.outline && rule.style.outline.length > 0) ||
              (rule.style.outlineColor && rule.style.outlineColor.length > 0) ||
              (rule.style.outlineWidth && rule.style.outlineWidth.length > 0)) {
            foundFocusOutline = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundFocusOutline) break;
  }
  expect(foundFocusOutline).toBe(true);
});

// Test 19: Links should change color once visited
test('The links should change color once visited', () => {
  let foundVisitedColor = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes(':visited')) {
          if (rule.style.color && rule.style.color.length > 0) {
            foundVisitedColor = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundVisitedColor) break;
  }
  expect(foundVisitedColor).toBe(true);
});
