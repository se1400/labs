// Test 1: div with class container
test('You should have a div element with the class container', () => {
  const container = document.querySelector('div.container');
  expect(container).toBeTruthy();
});

// Test 2: form inside container
test('Inside the div element, you should have a form element', () => {
  const form = document.querySelector('div.container form');
  expect(form).toBeTruthy();
});

// Test 3: input with type text and id name
test('The form should contain an input element with the type text and the id name for entering the user\'s full name', () => {
  const input = document.querySelector('form input[type="text"]#name');
  expect(input).toBeTruthy();
});

// Test 4: input with type email and id email
test('You should have another input element with the type email and the id email for entering the user\'s email address', () => {
  const input = document.querySelector('form input[type="email"]#email');
  expect(input).toBeTruthy();
});

// Test 5: select with id position and option elements
test('The form should include a select element with the id position with some option elements', () => {
  const select = document.querySelector('form select#position');
  expect(select).toBeTruthy();
  const options = select.querySelectorAll('option');
  expect(options.length).toBeGreaterThanOrEqual(1);
});

// Test 6: fieldset or section with class radio-group
test('You should have a fieldset or section element with the class .radio-group', () => {
  const radioGroup = document.querySelector('fieldset.radio-group, section.radio-group');
  expect(radioGroup).toBeTruthy();
});

// Test 7: radio inputs with name availability inside radio-group
test('Inside .radio-group you should have a group of input elements with the type radio for selecting availability options. The group name should be availability', () => {
  const radioInputs = document.querySelectorAll('.radio-group input[type="radio"][name="availability"]');
  expect(radioInputs.length).toBeGreaterThanOrEqual(2);
});

// Test 8: textarea with id message
test('You should have a textarea element with the id message for entering a message', () => {
  const textarea = document.querySelector('form textarea#message');
  expect(textarea).toBeTruthy();
});

// Test 9: every input has associated label
test('You should associate every input element with a label element', () => {
  const inputs = document.querySelectorAll('form input');
  expect(inputs.length).toBeGreaterThan(0);
  inputs.forEach(input => {
    const id = input.getAttribute('id');
    expect(id).toBeTruthy();
    const label = document.querySelector(`label[for="${id}"]`);
    expect(label).toBeTruthy();
  });
});

// Test 10: button with type submit
test('You should have a button element with the type submit for submitting the form', () => {
  const button = document.querySelector('form button[type="submit"]');
  expect(button).toBeTruthy();
});

// Test 11: :focus pseudo-class on input and textarea with border color
test('You should add a :focus pseudo-class to the input and textarea elements to change their border color when focused. Use a list selector in the given order', () => {
  let foundFocus = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('input') && rule.selectorText.includes('textarea') && rule.selectorText.includes(':focus')) {
          const borderColor = rule.style.getPropertyValue('border-color');
          const border = rule.style.getPropertyValue('border');
          if ((borderColor && borderColor.length > 0) || (border && border.length > 0)) {
            foundFocus = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundFocus) break;
  }
  expect(foundFocus).toBe(true);
});

// Test 12: :invalid pseudo-class with red border
test('The input, select and textarea elements should have an :invalid pseudo-class that changes the border color to red when invalid input is detected. Use a list selector in the given order', () => {
  let foundInvalid = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('input') && rule.selectorText.includes('select') && rule.selectorText.includes('textarea') && rule.selectorText.includes(':invalid')) {
          const borderColor = rule.style.getPropertyValue('border-color');
          const border = rule.style.getPropertyValue('border');
          if ((borderColor && borderColor.includes('red')) || (border && border.includes('red'))) {
            foundInvalid = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundInvalid) break;
  }
  expect(foundInvalid).toBe(true);
});

// Test 13: :valid pseudo-class with green border
test('The input, select and textarea elements should have a :valid pseudo-class that changes the border color to green when valid input is entered. Use a list selector in the given order', () => {
  let foundValid = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('input') && rule.selectorText.includes('select') && rule.selectorText.includes('textarea') && rule.selectorText.includes(':valid')) {
          const borderColor = rule.style.getPropertyValue('border-color');
          const border = rule.style.getPropertyValue('border');
          if ((borderColor && borderColor.includes('green')) || (border && border.includes('green'))) {
            foundValid = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundValid) break;
  }
  expect(foundValid).toBe(true);
});

// Test 14: button :hover pseudo-class with background color
test('The button element should have a :hover pseudo-class that changes the background color when hovered over', () => {
  let foundHover = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('button') && rule.selectorText.includes(':hover')) {
          const bgColor = rule.style.getPropertyValue('background-color');
          const bg = rule.style.getPropertyValue('background');
          if ((bgColor && bgColor.length > 0) || (bg && bg.length > 0)) {
            foundHover = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundHover) break;
  }
  expect(foundHover).toBe(true);
});

// Test 15: :checked pseudo-class on .radio-group input[type="radio"] with border color
test('You should use the :checked pseudo-class on .radio-group input[type="radio"] to add a border color when the radio button is selected', () => {
  let foundCheckedBorder = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('.radio-group') && rule.selectorText.includes('input') && rule.selectorText.includes('radio') && rule.selectorText.includes(':checked')) {
          const borderColor = rule.style.getPropertyValue('border-color');
          const border = rule.style.getPropertyValue('border');
          if ((borderColor && borderColor.length > 0) || (border && border.length > 0)) {
            foundCheckedBorder = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundCheckedBorder) break;
  }
  expect(foundCheckedBorder).toBe(true);
});

// Test 16: :checked pseudo-class on .radio-group input[type="radio"] with background color
test('You should use the :checked pseudo-class on .radio-group input[type="radio"] to add a background color when the radio button is selected', () => {
  let foundCheckedBg = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('.radio-group') && rule.selectorText.includes('input') && rule.selectorText.includes('radio') && rule.selectorText.includes(':checked')) {
          const bgColor = rule.style.getPropertyValue('background-color');
          const bg = rule.style.getPropertyValue('background');
          if ((bgColor && bgColor.length > 0) || (bg && bg.length > 0)) {
            foundCheckedBg = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundCheckedBg) break;
  }
  expect(foundCheckedBg).toBe(true);
});

// Test 17: :checked pseudo-class on .radio-group input[type="radio"] with box shadow
test('You should use the :checked pseudo-class on .radio-group input[type="radio"] to add a box shadow when the radio button is selected', () => {
  let foundCheckedShadow = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('.radio-group') && rule.selectorText.includes('input') && rule.selectorText.includes('radio') && rule.selectorText.includes(':checked')) {
          const boxShadow = rule.style.getPropertyValue('box-shadow');
          if (boxShadow && boxShadow.length > 0) {
            foundCheckedShadow = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundCheckedShadow) break;
  }
  expect(foundCheckedShadow).toBe(true);
});

// Test 18: :checked pseudo-class to change label text color
test('You should use the :checked pseudo-class on radio buttons to change the text color of the associated label when the option is selected', () => {
  let foundCheckedLabel = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes(':checked') && rule.selectorText.includes('label')) {
          const color = rule.style.getPropertyValue('color');
          if (color && color.length > 0) {
            foundCheckedLabel = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundCheckedLabel) break;
  }
  expect(foundCheckedLabel).toBe(true);
});

// Test 19: :first-of-type pseudo-class on input
test('Add a :first-of-type pseudo-class to the input elements to style the first input field differently', () => {
  let foundFirstOfType = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('input') && rule.selectorText.includes(':first-of-type')) {
          // Check if any style property is set
          if (rule.style.length > 0) {
            foundFirstOfType = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundFirstOfType) break;
  }
  expect(foundFirstOfType).toBe(true);
});
