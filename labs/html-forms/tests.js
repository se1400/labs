// Helper: Get a CSS property value from a rule matching the exact selector
const getCSSPropertyValue = (selector, property) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        const ruleSelectors = rule.selectorText ? rule.selectorText.split(',').map(s => s.trim()) : [];
        const targetSelectors = selector.split(',').map(s => s.trim());
        const selectorMatch = targetSelectors.length === ruleSelectors.length &&
          targetSelectors.every(s => ruleSelectors.includes(s)) &&
          ruleSelectors.every(s => targetSelectors.includes(s));
        if (rule.selectorText && selectorMatch) {
          const value = rule.style.getPropertyValue(property).trim();
          if (value) return value;
        }
      }
    } catch (e) {}
  }
  return null;
};

// Helper: Find a CSS property on a selector that may appear in a grouped rule.
// e.g., findCSSProperty('input:not([type="radio"])', 'width') finds it even if
// the rule groups multiple selectors together (input, select, textarea { ... })
const findCSSProperty = (selector, property) => {
  const trimmed = selector.trim();
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (!rule.selectorText) continue;
        const ruleSelectors = rule.selectorText.split(',').map(s => s.trim());
        if (ruleSelectors.includes(trimmed)) {
          const value = rule.style.getPropertyValue(property).trim();
          if (value) return value;
        }
      }
    } catch (e) {}
  }
  return null;
};

// Helper: Search all stylesheet rules for any rule whose selectorText contains
// a given substring. Used to detect pseudo-class rules like :user-invalid
// without requiring an exact selector match.
const findRuleContaining = (selectorSubstring, property) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (!rule.selectorText) continue;
        if (rule.selectorText.includes(selectorSubstring)) {
          const value = rule.style.getPropertyValue(property).trim();
          if (value) return value;
        }
      }
    } catch (e) {}
  }
  return null;
};

// Helper: Search all stylesheet rules for any rule whose selectorText contains
// a given substring AND whose raw cssText contains a given property string.
// Used as a fallback for properties whose values use var() — getPropertyValue()
// returns '' for shorthand properties with var() (pending-substitution), but
// cssText always contains the raw text as written by the student.
const findRuleContainingCSSText = (selectorSubstring, propertySubstring) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (!rule.selectorText) continue;
        if (rule.selectorText.includes(selectorSubstring) &&
            rule.cssText && rule.cssText.includes(propertySubstring)) {
          return true;
        }
      }
    } catch (e) {}
  }
  return false;
};

// ============================================
// Part 1: The Form Element
// ============================================

test('A <form> element should exist inside #apply with action="/apply" and method="post"', () => {
  const form = document.querySelector('#apply form');
  if (!form) {
    throw new Error(
      'No <form> element found inside the #apply section.\n\n' +
      'In Step 1, add a <form> element inside the #apply section, below the <h3> heading:\n' +
      '<form action="/apply" method="post">\n' +
      '  <!-- form controls go here -->\n' +
      '</form>\n' +
      'All the fieldsets, inputs, and the submit button in later steps go between these tags.'
    );
  }
  const action = form.getAttribute('action');
  const method = form.getAttribute('method');
  if (action !== '/apply') {
    throw new Error(
      `The form's action attribute is "${action || 'missing'}" but should be "/apply".\n\n` +
      'In Step 1, make sure your opening <form> tag includes action="/apply".'
    );
  }
  if (!method || method.toLowerCase() !== 'post') {
    throw new Error(
      `The form's method attribute is "${method || 'missing'}" but should be "post".\n\n` +
      'In Step 1, make sure your opening <form> tag includes method="post".\n' +
      'POST sends data in the request body — appropriate for a private application form.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 2: Personal Information
// ============================================

test('The first <fieldset> should have a <legend> with text "Personal Information"', () => {
  const fieldsets = document.querySelectorAll('#apply form fieldset');
  if (fieldsets.length === 0) {
    throw new Error(
      'No <fieldset> element found inside the form.\n\n' +
      'In Step 2, add a <fieldset> as the first element inside your <form>.\n' +
      'Inside the fieldset, add <legend>Personal Information</legend> as its first child.'
    );
  }
  const firstLegend = fieldsets[0].querySelector('legend');
  if (!firstLegend || firstLegend.textContent.trim() !== 'Personal Information') {
    throw new Error(
      `The first fieldset's legend text is "${firstLegend ? firstLegend.textContent.trim() : 'missing'}" ` +
      'but should be "Personal Information".\n\n' +
      'In Step 2, add a <legend> as the first child of your first <fieldset>:\n' +
      '<legend>Personal Information</legend>'
    );
  }
  expect(true).toBe(true);
});

test('The first name input should have type="text", id="first-name", required, and autocomplete="given-name"', () => {
  const input = document.querySelector('#first-name');
  if (!input) {
    throw new Error(
      'No element found with id="first-name".\n\n' +
      'In Step 2, add an <input> with id="first-name" inside the first fieldset.\n' +
      'The full input tag should look like:\n' +
      '<input type="text" id="first-name" name="first-name" autocomplete="given-name" required aria-describedby="name-hint">'
    );
  }
  if (input.getAttribute('type') !== 'text') {
    throw new Error(
      `The first-name input has type="${input.getAttribute('type')}" but should be type="text".\n\n` +
      'In Step 2, set type="text" on the first name input.'
    );
  }
  if (!input.hasAttribute('required')) {
    throw new Error(
      'The first-name input is missing the required attribute.\n\n' +
      'In Step 2, add the required attribute to the first name input.\n' +
      'The required attribute has no value — just the word "required" in the opening tag.'
    );
  }
  if (input.getAttribute('autocomplete') !== 'given-name') {
    throw new Error(
      `The first-name input has autocomplete="${input.getAttribute('autocomplete') || 'missing'}" ` +
      'but should be autocomplete="given-name".\n\n' +
      'In Step 2, add autocomplete="given-name" to the first name input.\n' +
      'This standardized token tells browsers which saved data to auto-fill.'
    );
  }
  expect(true).toBe(true);
});

test('A hint paragraph with id="name-hint" should exist and be linked via aria-describedby', () => {
  const hint = document.querySelector('#name-hint');
  if (!hint) {
    throw new Error(
      'No element found with id="name-hint".\n\n' +
      'In Step 2, after the first name <input>, add:\n' +
      '<p id="name-hint" class="field-hint">Enter your name as it appears on your government-issued ID.</p>\n' +
      'This hint paragraph is linked to the input via the aria-describedby attribute,\n' +
      'so screen readers read it aloud when the user focuses that input.'
    );
  }
  const input = document.querySelector('#first-name');
  if (!input || input.getAttribute('aria-describedby') !== 'name-hint') {
    throw new Error(
      'The first-name input should have aria-describedby="name-hint".\n\n' +
      'In Step 2, add aria-describedby="name-hint" to the first name <input>.\n' +
      'This attribute connects the input to its hint paragraph for screen readers.'
    );
  }
  expect(true).toBe(true);
});

test('The email input should have type="email", be required, and have a placeholder', () => {
  const input = document.querySelector('#email');
  if (!input) {
    throw new Error(
      'No element found with id="email".\n\n' +
      'In Step 3, add an email input inside the first fieldset:\n' +
      '<input type="email" id="email" name="email" autocomplete="email" placeholder="you@example.com" required>'
    );
  }
  if (input.getAttribute('type') !== 'email') {
    throw new Error(
      `The email input has type="${input.getAttribute('type')}" but should be type="email".\n\n` +
      'In Step 3, set type="email" on the email input.\n' +
      'The browser automatically validates the email format when type="email" is used.'
    );
  }
  if (!input.hasAttribute('required')) {
    throw new Error(
      'The email input is missing the required attribute.\n\n' +
      'In Step 3, add the required attribute to the email input.'
    );
  }
  if (!input.getAttribute('placeholder')) {
    throw new Error(
      'The email input is missing a placeholder attribute.\n\n' +
      'In Step 3, add placeholder="you@example.com" to the email input.\n' +
      'Placeholder text shows inside the field as a hint while it is empty.'
    );
  }
  expect(true).toBe(true);
});

test('The phone input should have type="tel" and a pattern attribute', () => {
  const input = document.querySelector('#phone');
  if (!input) {
    throw new Error(
      'No element found with id="phone".\n\n' +
      'In Step 3, add a phone input inside the first fieldset:\n' +
      '<input type="tel" id="phone" name="phone" autocomplete="tel"\n' +
      '       placeholder="555-555-5555" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"\n' +
      '       title="Format: 555-555-5555" required>'
    );
  }
  if (input.getAttribute('type') !== 'tel') {
    throw new Error(
      `The phone input has type="${input.getAttribute('type')}" but should be type="tel".\n\n` +
      'In Step 3, set type="tel" on the phone input.\n' +
      'This tells mobile browsers to show a number keypad instead of a full keyboard.'
    );
  }
  if (!input.getAttribute('pattern')) {
    throw new Error(
      'The phone input is missing a pattern attribute.\n\n' +
      'In Step 3, add pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" to the phone input.\n' +
      'This regular expression requires the format 555-555-5555.\n' +
      'The browser validates against this pattern when the form is submitted.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 3: Academic Background
// ============================================

test('The second <fieldset> should have a <legend> with text "Academic Background"', () => {
  const fieldsets = document.querySelectorAll('#apply form fieldset');
  if (fieldsets.length < 2) {
    throw new Error(
      'Only one <fieldset> found. A second fieldset is needed for Academic Background.\n\n' +
      'In Step 4, after the closing </fieldset> of the Personal Information group,\n' +
      'add another <fieldset> with <legend>Academic Background</legend> inside it.'
    );
  }
  const secondLegend = fieldsets[1].querySelector('legend');
  if (!secondLegend || secondLegend.textContent.trim() !== 'Academic Background') {
    throw new Error(
      `The second fieldset's legend is "${secondLegend ? secondLegend.textContent.trim() : 'missing'}" ` +
      'but should be "Academic Background".\n\n' +
      'In Step 4, add <legend>Academic Background</legend> as the first child of the second fieldset.'
    );
  }
  expect(true).toBe(true);
});

test('The major <select> should be required and contain <optgroup> elements', () => {
  const select = document.querySelector('select#major');
  if (!select) {
    throw new Error(
      'No <select> found with id="major".\n\n' +
      'In Step 4, add a <select id="major" name="major" required> inside the second fieldset.\n' +
      'Inside the select, add a blank option followed by <optgroup> elements for each major category.'
    );
  }
  if (!select.hasAttribute('required')) {
    throw new Error(
      'The major <select> is missing the required attribute.\n\n' +
      'In Step 4, add required to the opening <select> tag.\n' +
      'This means the user must choose a major before the form can be submitted.'
    );
  }
  const optgroups = select.querySelectorAll('optgroup');
  if (optgroups.length < 2) {
    throw new Error(
      `The major <select> has ${optgroups.length} <optgroup> element(s) but should have at least 2.\n\n` +
      'In Step 4, wrap related options in <optgroup label="..."> elements:\n' +
      '<optgroup label="Science, Engineering &amp; Technology">\n' +
      '  <option value="cs">Computer Science</option>\n' +
      '  ...\n' +
      '</optgroup>\n' +
      'Each optgroup creates a labeled group in the dropdown, making long lists easier to navigate.'
    );
  }
  expect(true).toBe(true);
});

test('The GPA input should have type="number" with min, max, and step attributes', () => {
  const input = document.querySelector('input#gpa');
  if (!input) {
    throw new Error(
      'No <input> found with id="gpa".\n\n' +
      'In Step 5, add a number input for GPA inside the second fieldset:\n' +
      '<input type="number" id="gpa" name="gpa" min="0" max="4.0" step="0.1" placeholder="3.5">'
    );
  }
  if (input.getAttribute('type') !== 'number') {
    throw new Error(
      `The GPA input has type="${input.getAttribute('type')}" but should be type="number".\n\n` +
      'In Step 5, set type="number" on the GPA input.'
    );
  }
  if (!input.getAttribute('min') || !input.getAttribute('max')) {
    throw new Error(
      'The GPA input is missing min and/or max attributes.\n\n' +
      'In Step 5, add min="0" and max="4.0" to the GPA input.\n' +
      'These attributes restrict the valid range of values the browser will accept.'
    );
  }
  if (!input.getAttribute('step')) {
    throw new Error(
      'The GPA input is missing a step attribute.\n\n' +
      'In Step 5, add step="0.1" to the GPA input.\n' +
      'Without step="0.1", the browser only accepts whole numbers — so 3.5 would be invalid.'
    );
  }
  expect(true).toBe(true);
});

test('The start date input should have type="date" with min and max attributes', () => {
  const input = document.querySelector('input#start-date');
  if (!input) {
    throw new Error(
      'No <input> found with id="start-date".\n\n' +
      'In Step 5, add a date input inside the second fieldset:\n' +
      '<input type="date" id="start-date" name="start-date" min="2025-08-01" max="2027-12-31">'
    );
  }
  if (input.getAttribute('type') !== 'date') {
    throw new Error(
      `The start-date input has type="${input.getAttribute('type')}" but should be type="date".\n\n` +
      'In Step 5, set type="date" on the start date input.\n' +
      'This displays a calendar picker in most browsers.'
    );
  }
  if (!input.getAttribute('min') || !input.getAttribute('max')) {
    throw new Error(
      'The start-date input is missing min and/or max attributes.\n\n' +
      'In Step 5, add min="2025-08-01" and max="2027-12-31" to the start date input.\n' +
      'Date inputs use YYYY-MM-DD format for min and max values.'
    );
  }
  expect(true).toBe(true);
});

test('A <datalist> should exist and be linked to an input via the list attribute', () => {
  const datalist = document.querySelector('datalist');
  if (!datalist) {
    throw new Error(
      'No <datalist> element found.\n\n' +
      'In Step 6, add a <datalist id="referral-options"> element inside the second fieldset.\n' +
      'Inside it, add <option> elements for each suggestion:\n' +
      '<option value="High School Counselor">\n' +
      '<option value="Social Media">\n' +
      '...'
    );
  }
  const datalistId = datalist.id;
  if (!datalistId) {
    throw new Error(
      'The <datalist> element is missing an id attribute.\n\n' +
      'In Step 6, add id="referral-options" to the datalist:\n' +
      '<datalist id="referral-options">...\n' +
      'The id must match the list attribute on the referral input so the browser\n' +
      'knows which datalist to show.'
    );
  }
  const linkedInput = document.querySelector(`input[list="${datalistId}"]`);
  if (!linkedInput) {
    throw new Error(
      `A <datalist id="${datalistId}"> exists but no input has list="${datalistId}".\n\n` +
      'In Step 6, add list="referral-options" to the referral input:\n' +
      '<input type="text" id="referral" name="referral" list="referral-options" ...>\n' +
      'The input\'s list attribute must exactly match the datalist\'s id.'
    );
  }
  const options = datalist.querySelectorAll('option');
  if (options.length < 3) {
    throw new Error(
      `The <datalist> has ${options.length} option(s) but should have at least 3.\n\n` +
      'In Step 6, add at least 3 <option> elements inside the datalist:\n' +
      '<option value="High School Counselor">\n' +
      '<option value="Social Media">\n' +
      '<option value="Friend or Family">\n' +
      '...'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 4: Attendance Preference & Areas of Interest
// ============================================

test('Radio buttons with name="attendance" should exist, with at least one checked', () => {
  const radios = document.querySelectorAll('input[type="radio"][name="attendance"]');
  if (radios.length < 2) {
    throw new Error(
      `Found ${radios.length} radio button(s) with name="attendance" but need at least 2.\n\n` +
      'In Step 7, add a third <fieldset> with <legend>Attendance Preference</legend>.\n' +
      'Inside it, add three <label> elements, each wrapping a radio input:\n' +
      '<label><input type="radio" name="attendance" value="on-campus" checked> On Campus</label>\n' +
      '<label><input type="radio" name="attendance" value="online"> Online</label>\n' +
      '<label><input type="radio" name="attendance" value="hybrid"> Hybrid</label>'
    );
  }
  const checked = document.querySelector('input[type="radio"][name="attendance"][checked], input[type="radio"][name="attendance"]:checked');
  if (!checked) {
    throw new Error(
      'None of the attendance radio buttons have the checked attribute.\n\n' +
      'In Step 7, add the checked attribute to the first radio button so "On Campus"\n' +
      'is selected by default when the page loads:\n' +
      '<input type="radio" name="attendance" value="on-campus" checked>'
    );
  }
  expect(true).toBe(true);
});

test('Checkboxes with name="interests" should exist (at least 3)', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"][name="interests"]');
  if (checkboxes.length < 3) {
    throw new Error(
      `Found ${checkboxes.length} checkbox(es) with name="interests" but need at least 3.\n\n` +
      'In Step 8, add a fourth <fieldset> with <legend>Areas of Interest</legend>.\n' +
      'Inside it, add five <label> elements, each wrapping a checkbox:\n' +
      '<label><input type="checkbox" name="interests" value="research"> Research Opportunities</label>\n' +
      '<label><input type="checkbox" name="interests" value="internships"> Internships</label>\n' +
      '...'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 5: Personal Statement & Submit Button
// ============================================

test('A <textarea> should exist with rows and minlength attributes', () => {
  const textarea = document.querySelector('textarea');
  if (!textarea) {
    throw new Error(
      'No <textarea> element found in the form.\n\n' +
      'In Step 9, add a .form-group div containing a <textarea>:\n' +
      '<textarea id="statement" name="statement" rows="6" minlength="100"\n' +
      '          aria-describedby="statement-hint"\n' +
      '          placeholder="Tell us about yourself..."></textarea>'
    );
  }
  if (!textarea.getAttribute('rows')) {
    throw new Error(
      'The <textarea> is missing a rows attribute.\n\n' +
      'In Step 9, add rows="6" to the textarea.\n' +
      'The rows attribute sets the visible height of the textarea in lines of text.'
    );
  }
  if (!textarea.getAttribute('minlength')) {
    throw new Error(
      'The <textarea> is missing a minlength attribute.\n\n' +
      'In Step 9, add minlength="100" to the textarea.\n' +
      'This prevents the form from submitting if the personal statement is too short.'
    );
  }
  expect(true).toBe(true);
});

test('A <button type="submit"> should exist inside the form', () => {
  const button = document.querySelector('#apply form button[type="submit"]');
  if (!button) {
    throw new Error(
      'No <button type="submit"> found inside the form.\n\n' +
      'In Step 10, add a submit button as the last element inside your <form>,\n' +
      'after the personal statement .form-group and before the closing </form> tag:\n' +
      '<button type="submit">Submit Application</button>'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 6: CSS
// ============================================

test('The form rule should have display: flex and flex-direction: column', () => {
  // Check via getComputedStyle on the actual form element — more reliable than
  // stylesheet inspection, and works regardless of how the student writes the selector.
  const form = document.querySelector('#apply form');
  if (!form) {
    throw new Error('No form found — complete the HTML steps first before testing CSS.');
  }
  const computed = window.getComputedStyle(form);
  const display = computed.getPropertyValue('display');
  const direction = computed.getPropertyValue('flex-direction');
  if (display !== 'flex') {
    throw new Error(
      `The form has display: "${display}" but should be display: flex.\n\n` +
      'In Step 11, add a CSS rule for form with display: flex.\n' +
      'This enables flexbox layout so the form controls can be stacked vertically.'
    );
  }
  if (direction !== 'column') {
    throw new Error(
      `The form has flex-direction: "${direction}" but should be flex-direction: column.\n\n` +
      'In Step 11, add flex-direction: column to the form rule.\n' +
      'This stacks the fieldsets and form groups on top of each other.'
    );
  }
  expect(true).toBe(true);
});

test('Text inputs, select, and textarea should have width: 100%', () => {
  // Check via stylesheet inspection. We check several selectors because students
  // may write the rule differently. We require an exact '100%' value to avoid
  // false positives — width.includes('100') would also match '100px' or '1000px'.
  const inputSelector = 'input:not([type="radio"]):not([type="checkbox"])';
  const width = findCSSProperty(inputSelector, 'width') ||
                findCSSProperty('input', 'width');
  const selectWidth = findCSSProperty('select', 'width');
  const textareaWidth = findCSSProperty('textarea', 'width');
  const hasWidth = (width === '100%') ||
                   (selectWidth === '100%') ||
                   (textareaWidth === '100%');
  if (!hasWidth) {
    throw new Error(
      'No width: 100% found on text inputs, select, or textarea.\n\n' +
      'In Step 13, add width: 100% to the rule that targets inputs, select, and textarea:\n' +
      'input:not([type="radio"]):not([type="checkbox"]), select, textarea {\n' +
      '    width: 100%;\n' +
      '    ...\n' +
      '}\n' +
      'This makes form controls stretch to fill their parent container.'
    );
  }
  expect(true).toBe(true);
});

test('button[type="submit"] should have a background-color set', () => {
  // Check via stylesheet inspection rather than getComputedStyle. Browsers apply
  // UA/system styles to <button> elements (e.g. system appearance colors) which
  // would cause getComputedStyle to return a non-transparent value even before the
  // student adds any CSS, producing a false positive.
  // We look for any rule whose selector targets the submit button and whose
  // cssText includes 'background-color'. The cssText check handles both plain
  // values and var() references (which cause pending-substitution in getPropertyValue).
  let buttonHasBg = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (!rule.selectorText) continue;
        const selectors = rule.selectorText.split(',').map(s => s.trim());
        // Accept both quoted and unquoted attribute selector forms:
        // button[type="submit"] or button[type=submit]
        const targetsButton = selectors.some(s =>
          s === 'button[type="submit"]' || s === 'button[type=submit]' || s === 'button'
        );
        if (targetsButton) {
          const val = rule.style.getPropertyValue('background-color').trim();
          if (val || (rule.cssText && rule.cssText.includes('background-color'))) {
            buttonHasBg = true;
          }
        }
      }
    } catch (e) {}
  }
  if (!buttonHasBg) {
    throw new Error(
      'No background-color found on button[type="submit"] in your stylesheet.\n\n' +
      'In Step 13, add a CSS rule for button[type="submit"] and set:\n' +
      'background-color: var(--ut-red);\n' +
      'This gives the submit button Utah Tech\'s red color so it stands out on the form.'
    );
  }
  expect(true).toBe(true);
});

test('A :user-invalid rule should exist with border-color or background-color', () => {
  // Scan all stylesheet rules for any rule whose selectorText contains :user-invalid.
  // We use a substring search because the rule may group selectors:
  // "input:user-invalid, textarea:user-invalid { ... }"
  // getPropertyValue() fallback handles values without var(); cssText fallback handles
  // values like `border-color: var(--ut-red)` where var() causes pending-substitution
  // and getPropertyValue() returns '' for shorthand properties.
  const borderColor = findRuleContaining(':user-invalid', 'border-color') ||
                      findRuleContainingCSSText(':user-invalid', 'border-color');
  const bgColor = findRuleContaining(':user-invalid', 'background-color') ||
                  findRuleContainingCSSText(':user-invalid', 'background-color');
  if (!borderColor && !bgColor) {
    throw new Error(
      'No CSS rule with :user-invalid found in your stylesheet.\n\n' +
      'In Step 14, add a rule for input:user-invalid and textarea:user-invalid:\n' +
      'input:user-invalid, textarea:user-invalid {\n' +
      '    border-color: var(--ut-red);\n' +
      '    background-color: #fff5f5;\n' +
      '}\n' +
      ':user-invalid fires only after the user has interacted with a field and left it\n' +
      'invalid — unlike :invalid, which fires immediately on page load.'
    );
  }
  expect(true).toBe(true);
});
