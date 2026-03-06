# HTML Forms

In this lab you'll build a student admissions application form for the Utah Tech University website. Forms are the primary way users send data to a server — job applications, login pages, checkout flows, and sign-up sheets all rely on the same core HTML form elements you'll learn here.

**<a href="https://se1400.github.io/labs/labs/html-forms/example.jpg" target="_blank">View completed example</a>** — This is what your page should look like when you're done.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Note:** The starter file includes all the Utah Tech page structure from the previous lab — the header, navigation, hero section, and sidebar are already built and styled. You'll add a complete admissions form inside the existing `#apply` section, then style it with CSS.

## Instructions

### Part 1: The Form Element

A `<form>` is a container element that wraps all the input controls that belong together. Two attributes tell the browser what to do when the form is submitted:

- `action` — the URL or path where the form data gets sent when the user clicks Submit.
- `method` — how the data travels: `get` appends it to the URL (visible, good for searches); `post` sends it in the request body (private, good for sensitive data like applications).

1. In your **HTML file**, find the `#apply` section. Inside it, below the `<h3>Apply to Utah Tech</h3>` heading, replace the placeholder comment with a `<form>` element — both an opening tag and a closing tag. Give the opening tag an `action` attribute set to `/apply` and a `method` attribute set to `post`. All the form controls in the steps below go between these two tags.

### Part 2: Personal Information

A `<fieldset>` groups related controls together and draws a visible border around them. The `<legend>` element is always the first thing inside a `<fieldset>` — it becomes the visible label for that group, like a heading.

The `<label>` element identifies what an input is for. Pairing a label with its input is essential for accessibility: screen readers announce the label when a user focuses the input, and clicking the label text moves focus directly to the input.

The most reliable way to pair a label and input is the `for`/`id` technique:
- Add a `for` attribute to the `<label>`. Its value should match...
- ...the `id` attribute on the `<input>`.

When the `for` and `id` values are identical, the browser knows they belong together.

Every input also needs a `name` attribute — that's the label the browser uses to identify the data when it sends it to the server.

2. Inside your `<form>`, add a `<fieldset>`. The very first thing inside the fieldset should be a `<legend>` with the text `Personal Information`. After the legend, add two `<div>` elements with `class="form-group"` — one for the first name field and one for the last name field. Inside each div, add a `<label>` and an `<input>`.

   For the **First Name** field:
   - Label text: `First Name`, and a `for` attribute set to `first-name`
   - Input `type`: `text`
   - Input `id`: `first-name`
   - Input `name`: `first-name`
   - `autocomplete`: `given-name`
   - `required` attribute (just the word `required` — no value is needed; its presence alone makes the field required)
   - `aria-describedby`: `name-hint`

   After the first name input (still inside the first `.form-group` div, below the input), add a `<p>` element with `id="name-hint"` and `class="field-hint"`. Its text should be: `Enter your name as it appears on your government-issued ID.`

   For the **Last Name** field (in the second `.form-group` div):
   - Label text: `Last Name`, and a `for` attribute set to `last-name`
   - Input `type`: `text`
   - Input `id`: `last-name`
   - Input `name`: `last-name`
   - `autocomplete`: `family-name`
   - `required` attribute

   > **What is `autocomplete`?** The `autocomplete` attribute tells the browser what kind of data this field collects. Using standardized tokens like `given-name` and `family-name` lets the browser auto-fill saved information accurately. Custom or made-up values won't match saved data reliably.

   > **What is `aria-describedby`?** This attribute links an input to a hint paragraph elsewhere on the page. When a screen reader user focuses the input, the screen reader reads that linked paragraph aloud — giving extra context without cluttering the label itself.

3. Still inside the same `<fieldset>` — after the last name `.form-group` div, before the closing `</fieldset>` tag — add two more `.form-group` divs, one for email and one for phone.

   For the **Email Address** field:
   - Label text: `Email Address`, and a `for` attribute set to `email`
   - Input `type`: `email` (the browser automatically checks that the value contains an `@` symbol and a domain — no extra validation code needed)
   - Input `id`: `email`
   - Input `name`: `email`
   - `autocomplete`: `email`
   - `placeholder`: `you@example.com`
   - `required` attribute

   For the **Phone Number** field:
   - Label text: `Phone Number`, and a `for` attribute set to `phone`
   - Input `type`: `tel`
   - Input `id`: `phone`
   - Input `name`: `phone`
   - `autocomplete`: `tel`
   - `placeholder`: `555-555-5555`
   - `pattern`: `[0-9]{3}-[0-9]{3}-[0-9]{4}`
   - `title`: `Format: 555-555-5555`
   - `required` attribute

   > **Why `type="tel"` instead of `type="text"`?** Using `type="tel"` tells mobile browsers to open a number keypad instead of a full keyboard, making phone numbers much easier to type on a phone. The `pattern` attribute adds a format requirement — if the user's entry doesn't match, the form won't submit and the browser displays the `title` text as an error hint.

   > **What does the pattern `[0-9]{3}-[0-9]{3}-[0-9]{4}` mean?** This is a regular expression — a compact way to describe a required format. `[0-9]` means "any digit from 0 through 9." `{3}` means "exactly three of those." The `-` is a literal hyphen. So the full pattern requires: three digits, a hyphen, three digits, a hyphen, four digits — matching a format like `555-555-5555`.

### Part 3: Academic Background

A `<select>` creates a dropdown menu. Each choice inside it is an `<option>` element. The `<optgroup>` element lets you group related options under a non-selectable heading label, which makes long lists much easier to scan.

4. After the closing `</fieldset>` tag from Part 2, add a second `<fieldset>`. Its `<legend>` should say `Academic Background`. Inside this fieldset, add a `.form-group` div for the student's intended major. Inside that div, add a label and a `<select>` element.

   The label should say `Intended Major` with a `for` attribute set to `major`. The select element needs `id="major"`, `name="major"`, and the `required` attribute.

   Inside the `<select>`, the very first option should be a blank placeholder that prompts the user to make a choice. Give this first option an empty `value` attribute (set it to nothing — two quotation marks with nothing between them) and display the text `-- Select a major --` as its visible label.

   After the placeholder option, add four `<optgroup>` elements. Each optgroup uses a `label` attribute (not text content) for its heading, and contains `<option>` elements inside it. Each option has a `value` attribute and visible text:
   - Optgroup `label="Science, Engineering &amp; Technology"`: Computer Science (value `cs`), Software Engineering (value `se`), Biology (value `bio`), Cybersecurity (value `cyber`)
   - Optgroup `label="Health Sciences"`: Nursing (value `nursing`), Public Health (value `public-health`)
   - Optgroup `label="Humanities &amp; Social Sciences"`: English (value `english`), Psychology (value `psych`), Communication (value `comm`)
   - Optgroup `label="Business &amp; Communication"`: Accounting (value `accounting`), Marketing (value `marketing`)

   > **Why `&amp;` instead of `&`?** The `&` character has special meaning in HTML — it marks the start of a character reference like `&amp;` or `&copy;`. Using a bare `&` directly in text or attribute values can confuse the browser's parser. `&amp;` is the correct, safe way to write a literal ampersand in HTML.

   > **Why does `<optgroup>` use a `label` attribute instead of text content?** Unlike `<legend>`, which puts its text between opening and closing tags, `<optgroup>` takes its heading from a `label` attribute on the opening tag. The options go between the `<optgroup>` opening and closing tags, not the heading text.

5. Still inside the same fieldset — after the major `.form-group` div — add two more `.form-group` divs.

   For the **High School GPA** field:
   - Label text: `High School GPA`, and a `for` attribute set to `gpa`
   - Input `type`: `number`
   - Input `id`: `gpa`
   - Input `name`: `gpa`
   - `min`: `0`
   - `max`: `4.0`
   - `step`: `0.1`
   - `placeholder`: `3.5`

   For the **Expected Start Date** field:
   - Label text: `Expected Start Date`, and a `for` attribute set to `start-date`
   - Input `type`: `date` (most browsers display a calendar picker for this type)
   - Input `id`: `start-date`
   - Input `name`: `start-date`
   - `min`: `2025-08-01`
   - `max`: `2027-12-31`

   > **Why `step="0.1"` on the GPA field?** The `step` attribute controls how much the number changes when the user clicks the browser's increment arrows, and also which decimal values pass validation. Without `step="0.1"`, the browser only accepts whole numbers — so entering `3.5` would be treated as invalid. A step of `0.1` allows values like 3.5, 3.6, 3.7 and makes them all valid.

6. Add one more `.form-group` div inside the same fieldset, for a referral field that uses a `<datalist>`.

   A `<datalist>` provides autocomplete suggestions — as the user types, a dropdown of matching options appears. Unlike a `<select>`, the user is not limited to the suggestions; they can type freely and ignore them entirely.

   Inside the `.form-group` div, add:
   - A label with the text `How did you hear about Utah Tech?` and a `for` attribute set to `referral`
   - A text input with `id="referral"`, `name="referral"`, `placeholder="Start typing or choose an option..."`, and a `list` attribute set to `referral-options`
   - A `<datalist>` element with `id="referral-options"`

   Inside the datalist, add six `<option>` elements. Each option only needs a `value` attribute — no text between the tags is needed. The six values are: `High School Counselor`, `Social Media`, `Friend or Family`, `College Fair`, `Online Search`, and `Campus Visit`.

   > **How does `<datalist>` connect to the input?** The browser uses matching `id` and `list` attributes to link them. The input's `list` attribute value must exactly match the datalist's `id`. Get one character wrong and the browser treats them as unrelated — no suggestions will appear.

### Part 4: Attendance Preference & Areas of Interest

Radio buttons and checkboxes are both selection controls, but they behave differently:
- **Radio buttons** (`type="radio"`) allow only one selection from a group. All the buttons in a group share the same `name` attribute — when one is selected, the browser automatically deselects the others.
- **Checkboxes** (`type="checkbox"`) allow any number of selections. Each checkbox is completely independent of the others.

Both types use the **wrapping technique** for labels instead of the `for`/`id` technique: the `<label>` element wraps around both the input and the label text together. You write the input first, then add the label text directly after it, all inside the same `<label>`. Clicking anywhere on the label text then toggles the input — no `for`/`id` pairing is needed.

7. After the closing `</fieldset>` of the Academic Background group, add a third `<fieldset>`. Its `<legend>` should say `Attendance Preference`. Inside it, add three `<label>` elements. Each label should contain a radio input followed immediately by the option text (with a space between the input and the text so they don't run together).

   All three radio inputs must share `name="attendance"` so the browser knows they belong to the same group. Their `value` attributes and visible text are:
   - `value="on-campus"` with text `On Campus`
   - `value="online"` with text `Online`
   - `value="hybrid"` with text `Hybrid`

   Add the `checked` attribute to the first radio input so that `On Campus` is already selected when the page loads. Like `required`, the `checked` attribute needs no value — just the word `checked` in the tag.

   > **Why must radio buttons share the same `name`?** The browser uses `name` to identify which inputs belong to the same group. When all three share `name="attendance"`, the browser knows that selecting one means deselecting the others. If each had a different name, they'd behave like independent checkboxes — you could select all three at once, which defeats the purpose.

8. After the closing `</fieldset>` of the Attendance Preference group, add a fourth `<fieldset>`. Its `<legend>` should say `Areas of Interest`. Inside it, add five `<label>` elements. Each label should contain a checkbox input followed by a space and the option text, the same wrapping structure as the radio buttons in Step 7.

   All five checkboxes use `name="interests"`. Their `value` attributes and visible text are:
   - `value="research"` with text `Research Opportunities`
   - `value="internships"` with text `Internships`
   - `value="athletics"` with text `Athletics`
   - `value="study-abroad"` with text `Study Abroad`
   - `value="clubs"` with text `Student Clubs`

### Part 5: Personal Statement & Submit Button

9. After the closing `</fieldset>` of the Areas of Interest group — still inside the `<form>` — add a `<div class="form-group">`. Inside this div, add three things in this order:

   First, a `<label>` with `for="statement"` and the visible text `Personal Statement`.

   Second, a `<textarea>` element. Unlike `<input>`, a `<textarea>` has both an opening and a closing tag. Add these attributes to the opening tag: `id="statement"`, `name="statement"`, `rows="6"`, `minlength="100"`, `aria-describedby="statement-hint"`, and a `placeholder` attribute with the text: `Tell us about yourself, your goals, and why you want to attend Utah Tech University...`

   Third, a `<p>` element with `id="statement-hint"` and `class="field-hint"`. Its text should be: `Minimum 100 characters. Tell us what makes you a great fit for Utah Tech.`

   > **Why a `<textarea>` instead of an `<input>`?** A `<textarea>` is a multi-line text field — it gives users enough room to write a meaningful response. A regular `<input>` is a single-line field, which would be far too cramped for a personal statement. The `rows` attribute controls the visible height (measured in lines of text), and `minlength` prevents the form from submitting if the response is too short.

10. As the very last element inside the `<form>` — after the personal statement `.form-group` div and directly before the closing `</form>` tag — add a `<button>` element with `type="submit"`. The visible text of the button should be `Submit Application`.

    > **Why include `type="submit"` explicitly?** A `<button>` inside a form submits it by default even without the `type` attribute. Writing `type="submit"` makes your intention clear to anyone reading the code and prevents unexpected behavior if the button is ever moved or the context changes.

### Part 6: CSS

Now that your form HTML is complete, open your **CSS file**. Find the comment near the bottom that marks the start of Lab 13 and add all new rules below it.

11. Create a CSS rule targeting `form`. Give it `display: flex`, `flex-direction: column`, and `gap: 1.5rem`. This switches the form to a flexbox column layout, which stacks each direct child — the fieldsets and the personal statement group — vertically with consistent spacing between them.

    Create a second rule targeting `.form-group`. Give it `display: flex`, `flex-direction: column`, and `gap: 0.25rem`. This stacks each label directly above its input with a small gap between them.

12. Create a rule targeting `fieldset`. Give it `border: 1px solid var(--ut-light-gray)`, `border-radius: 0.25rem`, and `padding: 1rem 1.5rem`. Also add `display: flex`, `flex-direction: column`, and `gap: 1rem` to stack the form groups inside each fieldset vertically.

    Create a rule targeting `legend`. Give it `font-weight: bold`, `color: var(--ut-navy)`, and `padding: 0 0.5rem`. The padding nudges the legend text slightly away from the fieldset border so it doesn't feel cramped.

    Create a rule targeting `form label`. Give it `font-weight: 600` and `font-size: 0.9rem`. Making labels slightly smaller and bolder helps users quickly scan the form and find each field.

13. Create a rule whose selector covers three things separated by commas: `input:not([type="radio"]):not([type="checkbox"])`, `select`, and `textarea`. Inside that rule, add:
    - `padding: 0.5rem 0.75rem`
    - `border: 2px solid var(--ut-light-gray)`
    - `border-radius: 0.25rem`
    - `font-family: inherit`
    - `font-size: 1rem`
    - `width: 100%`

    Create a separate rule targeting just `textarea` and set `resize: vertical`. This lets users drag the textarea taller if they need more room, but prevents them from dragging it wider, which would break the page layout.

    Create a rule targeting `button[type="submit"]`. Give it `background-color: var(--ut-red)`, `color: var(--ut-white)`, `border: none`, `padding: 0.75rem 2rem`, `font-size: 1rem`, `font-weight: bold`, `border-radius: 0.25rem`, and `cursor: pointer`. Then create a second rule targeting `button[type="submit"]:hover` and give it a slightly darker background color to signal to users that the button is clickable.

    > **Why `:not([type="radio"]):not([type="checkbox"])`?** Radio buttons and checkboxes are small clickable targets that work best at their natural browser size. Adding `width: 100%` or extra padding to them would stretch them awkwardly across the page and make them harder to use.

    > **Why `font-family: inherit` on inputs?** Browsers apply their own default system font to form controls, which is often different from the font used on the rest of the page. Setting `font-family: inherit` tells each input to use the same font as its parent, keeping the typography consistent throughout.

14. Add three rules using CSS pseudo-classes to give users real-time visual feedback as they fill out the form.

    **Required field indicator:** Create a rule whose selector covers `input:required:not([type="radio"]):not([type="checkbox"])`, `select:required`, and `textarea:required` (comma-separated). Give it `border-left: 3px solid var(--ut-navy)`. This adds a slightly thicker navy left border to every required field — a subtle visual cue that the field must be filled in.

    **Error state:** Create a rule whose selector covers `input:user-invalid` and `textarea:user-invalid` (comma-separated). Give it `border-color: var(--ut-red)` and `background-color: #fff5f5`. This turns the border red and adds a faint red tint to the background when a field has been touched and left in an invalid state. Unlike `:invalid`, which fires the moment the page loads, `:user-invalid` waits until the user has actually interacted with the field — so students don't see a form full of red borders before they've typed anything.

    **Success state:** Create a rule targeting `input:valid:not(:placeholder-shown):not([type="radio"]):not([type="checkbox"])`. Give it `border-color: #2d8a4e`. The green border appears only when an input has a value (`:not(:placeholder-shown)` — the placeholder is hidden because content is there) and that value passes validation (`:valid`). Together, these conditions mean: "the user filled in this field and did it correctly."

    > **Reading complex selectors from left to right:** `input:valid` — the input is valid. `:not(:placeholder-shown)` — and the placeholder is not showing (meaning the field has a value). `:not([type="radio"]):not([type="checkbox"])` — and it's not a radio or checkbox. All three conditions must be true at the same time for the green border to appear.

## Summary

| Element / Concept | Where used |
|---|---|
| `<form action method>` | Wraps the entire admissions application |
| `<fieldset>` + `<legend>` | Groups Personal Info, Academic Background, Attendance, and Interests |
| `<label for>` + `<input id>` | All text, email, tel, number, and date fields |
| `type="email"` / `type="tel"` / `type="number"` / `type="date"` | Semantic input types |
| `required`, `pattern`, `min`, `max`, `step`, `minlength` | HTML5 validation attributes |
| `autocomplete` | `given-name`, `family-name`, `email`, `tel` tokens |
| `aria-describedby` | Links first name and personal statement to hint text |
| `<select>` + `<optgroup>` | Intended major dropdown with grouped options |
| `<datalist>` | Referral source autocomplete suggestions |
| `type="radio"` | Attendance preference (one choice only) |
| `type="checkbox"` | Areas of interest (multiple choices allowed) |
| `<textarea>` | Personal statement multi-line text field |
| `<button type="submit">` | Form submit button |
| `:user-invalid` | Error state after user interaction |
| `:valid:not(:placeholder-shown)` | Success state when field has a valid value |
| `:required` | Visual indicator for required fields |
