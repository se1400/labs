// Test 1: h1 with text "Checkout"
test('You should have an h1 element with the text Checkout', () => {
  const h1 = document.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent).toMatch(/Checkout/);
});

// Test 2: Only one h1
test('You should only have one h1 element on your page', () => {
  const h1Elements = document.querySelectorAll('h1');
  expect(h1Elements.length).toBe(1);
});

// Test 3: At least two section elements after h1
test('You should have at least two section elements after the h1 element', () => {
  const h1 = document.querySelector('h1');
  expect(h1).toBeTruthy();
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
});

// Test 4: h2 "Your Cart" in first section
test('You should have an h2 element with the text Your Cart within the first section', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(1);
  const firstSection = sections[0];
  const h2 = firstSection.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent).toMatch(/Your Cart/);
});

// Test 5: Image with alt text in first section
test('You should have at least one image with alternate text in your first section', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(1);
  const firstSection = sections[0];
  const img = firstSection.querySelector('img');
  expect(img).toBeTruthy();
  const alt = img.getAttribute('alt');
  expect(alt).toBeTruthy();
  expect(alt.trim().length).toBeGreaterThan(0);
});

// Test 6: h2 "Payment Information" in second section
test('You should have an h2 element with the text Payment Information within the second section', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const secondSection = sections[1];
  const h2 = secondSection.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent).toMatch(/Payment Information/);
});

// Test 7: form element in second section
test('You should have a form element within the second section element', () => {
  const sections = document.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const secondSection = sections[1];
  const form = secondSection.querySelector('form');
  expect(form).toBeTruthy();
});

// Test 8: input with id and name "card-name"
test('You should have an input element with an id and name of card-name within your form', () => {
  const form = document.querySelector('form');
  expect(form).toBeTruthy();
  const input = form.querySelector('input#card-name');
  expect(input).toBeTruthy();
  const name = input.getAttribute('name');
  expect(name).toBe('card-name');
});

// Test 9: card-name input has type="text"
test('Your card name input should have a type of text', () => {
  const input = document.querySelector('input#card-name');
  expect(input).toBeTruthy();
  const type = input.getAttribute('type');
  expect(type).toBe('text');
});

// Test 10: input with id and name "card-number"
test('You should have an input element with an id and name of card-number within your form', () => {
  const form = document.querySelector('form');
  expect(form).toBeTruthy();
  const input = form.querySelector('input#card-number');
  expect(input).toBeTruthy();
  const name = input.getAttribute('name');
  expect(name).toBe('card-number');
});

// Test 11: card-number input has type="text"
test('Your card number input should have a type of text', () => {
  const input = document.querySelector('input#card-number');
  expect(input).toBeTruthy();
  const type = input.getAttribute('type');
  expect(type).toBe('text');
});

// Test 12: All non-submit inputs have labels
test('All of your input elements that aren\'t a type of submit should have a label element associated with them', () => {
  const inputs = document.querySelectorAll('input:not([type="submit"])');
  expect(inputs.length).toBeGreaterThan(0);

  inputs.forEach(input => {
    const id = input.getAttribute('id');
    expect(id).toBeTruthy();

    // Check for label with for attribute
    const label = document.querySelector(`label[for="${id}"]`);
    expect(label).toBeTruthy();
  });
});

// Test 13: At least two required inputs
test('You should have at least two input elements with the required attribute', () => {
  const requiredInputs = document.querySelectorAll('input[required]');
  expect(requiredInputs.length).toBeGreaterThanOrEqual(2);
});

// Test 14: span with "*" inside label for required inputs
test('You should include a span element with the text * inside the label element for each required input', () => {
  const requiredInputs = document.querySelectorAll('input[required]');
  expect(requiredInputs.length).toBeGreaterThanOrEqual(2);

  requiredInputs.forEach(input => {
    const id = input.getAttribute('id');
    const label = document.querySelector(`label[for="${id}"]`);
    expect(label).toBeTruthy();

    const span = label.querySelector('span');
    expect(span).toBeTruthy();
    expect(span.textContent).toMatch(/\*/);
  });
});

// Test 15: span elements have aria-hidden="true"
test('Your span elements should have aria-hidden set to true', () => {
  const requiredInputs = document.querySelectorAll('input[required]');
  expect(requiredInputs.length).toBeGreaterThanOrEqual(2);

  requiredInputs.forEach(input => {
    const id = input.getAttribute('id');
    const label = document.querySelector(`label[for="${id}"]`);
    expect(label).toBeTruthy();

    const span = label.querySelector('span');
    expect(span).toBeTruthy();
    const ariaHidden = span.getAttribute('aria-hidden');
    expect(ariaHidden).toBe('true');
  });
});

// Test 16: p element with id="card-number-help" after card-number input
test('You should have a p element with an id of card-number-help immediately after the card number input', () => {
  const cardNumberInput = document.querySelector('input#card-number');
  expect(cardNumberInput).toBeTruthy();

  const helpText = document.querySelector('#card-number-help');
  expect(helpText).toBeTruthy();
  expect(helpText.tagName).toBe('P');

  const nextElement = cardNumberInput.nextElementSibling;
  expect(nextElement).toBeTruthy();
  expect(nextElement.tagName).toBe('P');
  expect(nextElement.getAttribute('id')).toBe('card-number-help');
});

// Test 17: card-number-help text is not empty
test('Your card number help text should not be empty', () => {
  const helpText = document.querySelector('#card-number-help');
  expect(helpText).toBeTruthy();
  expect(helpText.textContent.trim().length).toBeGreaterThan(0);
});

// Test 18: card-number input has aria-describedby
test('Your card number input should have aria-describedby set to card-number-help', () => {
  const cardNumberInput = document.querySelector('input#card-number');
  expect(cardNumberInput).toBeTruthy();

  const ariaDescribedby = cardNumberInput.getAttribute('aria-describedby');
  expect(ariaDescribedby).toBe('card-number-help');
});
