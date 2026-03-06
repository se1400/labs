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

1. In your **HTML file**, find the `#apply` section. Inside it, below the `<h3>Apply to Utah Tech</h3>` heading, add a `<form>` element. Give it an `action` attribute set to `/apply` and a `method` attribute set to `post`. Replace the placeholder comment with your opening and closing `<form>` tags. All the form controls in the steps below go inside these tags.

### Part 2: Personal Information

A `<fieldset>` groups related controls together and draws a visible border around them. The `<legend>` element goes directly inside the `<fieldset>` — it becomes its visible label, like a heading for that group.

The `<label>` element identifies what an input is for. Pairing a label with its input is essential for accessibility: screen readers announce the label when a user focuses the input, and clicking the label moves focus directly to the input.

The most reliable way to pair a label and input is the `for`/`id` technique:
- Add a `for` attribute to the `<label>` with a value that matches...
- ...the `id` attribute on the `<input>`.

Every input also needs a `name` attribute — that's how the browser labels the data when it sends it to the server.

2. Inside your `<form>`, add a `<fieldset>`. Inside the fieldset, add a `<legend>` with the text `Personal Information`. Then add two `<div>` elements with `class="form-group"`, one for first name and one for last name. Inside each div, add a `<label>` and an `<input>`.

   For the **First Name** field:
   - Label text: `First Name`, with `for="first-name"`
   - Input `type`: `text`
   - Input `id` and `name`: both `first-name`
   - `autocomplete`: `given-name`
   - `required` attribute (no value needed — its presence alone makes the field required)
   - `aria-describedby="name-hint"`

   After the first name input (still inside the first `.form-group` div), add a `<p>` element with `id="name-hint"` and `class="field-hint"`. Its text: `Enter your name as it appears on your government-issued ID.`

   For the **Last Name** field:
   - Label text: `Last Name`, with `for="last-name"`
   - Input `type`: `text`
   - Input `id` and `name`: both `last-name`
   - `autocomplete`: `family-name`
   - `required` attribute

   > **What is `autocomplete`?** The `autocomplete` attribute tells the browser what kind of data this field collects. Using standardized tokens like `given-name` and `family-name` lets the browser auto-fill saved information accurately. Custom or made-up values won't match saved data reliably.

   > **What is `aria-describedby`?** This attribute links an input to a hint paragraph. Screen readers read the linked paragraph aloud when the user focuses that input, giving extra context without cluttering the label.

3. Still inside the same `<fieldset>` (after the last name `.form-group`), add two more `.form-group` divs — one for email and one for phone.

   For the **Email Address** field:
   - Label text: `Email Address`, with `for="email"`
   - Input `type`: `email` (the browser validates the format automatically — it checks for an `@` symbol and a domain)
   - Input `id` and `name`: both `email`
   - `autocomplete`: `email`
   - `placeholder`: `you@example.com`
   - `required` attribute

   For the **Phone Number** field:
   - Label text: `Phone Number`, with `for="phone"`
   - Input `type`: `tel`
   - Input `id` and `name`: both `phone`
   - `autocomplete`: `tel`
   - `placeholder`: `555-555-5555`
   - `pattern`: `[0-9]{3}-[0-9]{3}-[0-9]{4}`
   - `title`: `Format: 555-555-5555`
   - `required` attribute

   > **Why `type="tel"` instead of `type="text"`?** Using `type="tel"` tells mobile browsers to open a number keypad instead of a full keyboard, making phone numbers easier to type. The `pattern` attribute adds a format requirement — if the user's input doesn't match, the form won't submit and the browser shows the `title` text as an error hint.

   > **What does the pattern `[0-9]{3}-[0-9]{3}-[0-9]{4}` mean?** This is a regular expression describing the expected format. `[0-9]` means "any digit 0 through 9." `{3}` means "exactly three of those." The literal `-` is a hyphen. So the full pattern requires: three digits, hyphen, three digits, hyphen, four digits — for example `555-555-5555`.

### Part 3: Academic Background

A `<select>` creates a dropdown menu. Each choice is an `<option>` element inside it. The `<optgroup>` element groups related options under a non-selectable heading, making long lists easier to scan.

4. After the first `</fieldset>` closing tag, add a second `<fieldset>`. Give it a `<legend>` with the text `Academic Background`. Inside it, add a `.form-group` div containing a dropdown for the student's intended major:

   - A `<label>` with text `Intended Major` and `for="major"`
   - A `<select>` with `id="major"`, `name="major"`, and `required`
   - The first child of the select is a blank placeholder: `<option value="">-- Select a major --</option>`
   - Then four `<optgroup>` elements. Each optgroup has a `label` attribute for the group heading, and `<option>` elements inside it. Each option has a `value` attribute and visible text:
     - Optgroup `label="Science, Engineering &amp; Technology"`: Computer Science (value `cs`), Software Engineering (value `se`), Biology (value `bio`), Cybersecurity (value `cyber`)
     - Optgroup `label="Health Sciences"`: Nursing (value `nursing`), Public Health (value `public-health`)
     - Optgroup `label="Humanities &amp; Social Sciences"`: English (value `english`), Psychology (value `psych`), Communication (value `comm`)
     - Optgroup `label="Business &amp; Communication"`: Accounting (value `accounting`), Marketing (value `marketing`)

   > **Why `&amp;` instead of `&`?** The `&` character has special meaning in HTML — it signals the start of a character reference like `&amp;` or `&copy;`. Using a bare `&` directly in text or attribute values can confuse the parser. `&amp;` is the safe, correct way to write a literal ampersand.

5. Still inside the same fieldset, add two more `.form-group` divs.

   For the **High School GPA** field:
   - Label text: `High School GPA`, with `for="gpa"`
   - Input `type`: `number`
   - Input `id` and `name`: both `gpa`
   - `min`: `0`
   - `max`: `4.0`
   - `step`: `0.1`
   - `placeholder`: `3.5`

   For the **Expected Start Date** field:
   - Label text: `Expected Start Date`, with `for="start-date"`
   - Input `type`: `date` (displays a calendar picker in most browsers)
   - Input `id` and `name`: both `start-date`
   - `min`: `2025-08-01`
   - `max`: `2027-12-31`

   > **Why `step="0.1"` on the GPA field?** The `step` attribute controls how much the value changes when the user uses the browser's increment arrows. A step of `0.1` allows values like 3.5, 3.6, 3.7. Without it, the browser only allows whole numbers, and entering 3.5 would fail validation.

6. Add one more `.form-group` div inside the same fieldset, for a field that uses a `<datalist>`.

   A `<datalist>` provides autocomplete suggestions — as the user types, a dropdown of matching options appears. Unlike a `<select>`, the user can also type freely and ignore the suggestions entirely.

   - A `<label>` with text `How did you hear about Utah Tech?` and `for="referral"`
   - An `<input>` with `type="text"`, `id="referral"`, `name="referral"`, `list="referral-options"`, and `placeholder="Start typing or choose an option..."`
   - A `<datalist>` element with `id="referral-options"` containing six `<option>` elements with these values: `High School Counselor`, `Social Media`, `Friend or Family`, `College Fair`, `Online Search`, `Campus Visit`

   > **How does `<datalist>` work?** The browser connects an input to a datalist through matching `list` and `id` attributes — the input's `list` value must exactly match the datalist's `id`. The options inside a datalist have a `value` attribute but no separate visible text, unlike a `<select>`.

### Part 4: Attendance Preference & Areas of Interest

Radio buttons and checkboxes are both selection controls, but they behave differently:
- **Radio buttons** (`type="radio"`) allow only one selection from a group. Inputs in the same group share the same `name` attribute — when one is selected, the browser automatically deselects the others.
- **Checkboxes** (`type="checkbox"`) allow any number of selections. Each checkbox is independent.

Both types commonly use the **wrapping technique** for labels: the `<label>` wraps around both the `<input>` and the label text together. Clicking anywhere on the label text toggles the input — no `for`/`id` pairing needed.

7. After the second `</fieldset>`, add a third `<fieldset>` with a `<legend>` containing `Attendance Preference`. Inside it, add three `<label>` elements. Each label wraps an `<input type="radio">` followed by space and the visible option text.

   All three radio inputs share `name="attendance"`. Their `value` attributes and visible text are:
   - `value="on-campus"` → `On Campus`
   - `value="online"` → `Online`
   - `value="hybrid"` → `Hybrid`

   The first radio input should also have the `checked` attribute so that `On Campus` is selected by default when the page loads.

   > **Why must radio buttons share the same `name`?** The browser uses `name` to know which inputs belong to the same group. All three sharing `name="attendance"` means selecting one automatically deselects the others. With different names, they'd behave like independent checkboxes — you could select all three at once.

8. After the third `</fieldset>`, add a fourth `<fieldset>` with a `<legend>` containing `Areas of Interest`. Inside it, add five `<label>` elements, each wrapping a `<input type="checkbox">` followed by the visible label text.

   All five checkboxes use `name="interests"`. Their `value` attributes and visible text are:
   - `value="research"` → `Research Opportunities`
   - `value="internships"` → `Internships`
   - `value="athletics"` → `Athletics`
   - `value="study-abroad"` → `Study Abroad`
   - `value="clubs"` → `Student Clubs`

### Part 5: Personal Statement & Submit Button

9. After the fourth `</fieldset>`, and still inside the `<form>`, add a `<div class="form-group">` containing:

   - A `<label>` with `for="statement"` and text `Personal Statement`
   - A `<textarea>` with `id="statement"`, `name="statement"`, `rows="6"`, `minlength="100"`, and `aria-describedby="statement-hint"`, plus a `placeholder` attribute with this text: `Tell us about yourself, your goals, and why you want to attend Utah Tech University...`
   - A `<p>` element with `id="statement-hint"` and `class="field-hint"` containing: `Minimum 100 characters. Tell us what makes you a great fit for Utah Tech.`

   > **`<textarea>` vs `<input>`:** A `<textarea>` is a multi-line text field. Unlike `<input>`, which is self-closing, `<textarea>` has opening and closing tags — the default content goes between them. The `rows` attribute sets the visible height in lines. The `minlength` attribute enforces a minimum character count on submission.

10. Directly inside the `<form>`, after the textarea `.form-group` div and before the closing `</form>` tag, add a `<button>` with `type="submit"`. Its visible text should be `Submit Application`.

    > **`type="submit"` vs no type:** A `<button>` inside a form defaults to submit behavior even without a `type` attribute — but being explicit makes your intent clear and prevents unexpected behavior if the button moves or the context changes.

### Part 6: CSS

Now that your form HTML is complete, open your **CSS file**. Add all new rules below the comment that marks the start of Lab 13.

11. Add a rule for `form`. Set `display` to `flex`, `flex-direction` to `column`, and `gap` to `1.5rem`. This stacks each direct child — the fieldsets and standalone form groups — vertically with even spacing between them.

    Add a separate rule for `.form-group`. Set `display` to `flex`, `flex-direction` to `column`, and `gap` to `0.25rem`. This stacks each label directly above its input with a small gap.

12. Add a rule for `fieldset`. Set `border` to a thin border in a light gray color (such as `1px solid` and a light hex or rgba value), `border-radius` to `0.25rem`, and `padding` to `1rem 1.5rem`. Also add `display: flex`, `flex-direction: column`, and `gap: 1rem` so the form groups inside each fieldset stack vertically.

    Add a rule for `legend`. Set `font-weight: bold`, `color: var(--ut-navy)`, and `padding: 0 0.5rem`.

    Add a rule for `form label`. Set `font-weight: 600` and `font-size: 0.9rem` to make labels visually distinct from surrounding text.

13. Style text-based controls together in one rule. The selector should cover `input:not([type="radio"]):not([type="checkbox"])`, `select`, and `textarea` — write these three selectors separated by commas. Inside the rule, add:
    - `padding: 0.5rem 0.75rem`
    - `border` set to a 2-pixel border in a light color
    - `border-radius: 0.25rem`
    - `font-family: inherit`
    - `font-size: 1rem`
    - `width: 100%`

    Add a separate rule just for `textarea` and set `resize: vertical`. This lets users drag the textarea taller but not wider, protecting the page layout.

    Add a rule for `button[type="submit"]`. Give it a background color of `var(--ut-red)`, text color of `var(--ut-white)`, `border: none`, padding, font size, font weight, `border-radius: 0.25rem`, and `cursor: pointer`. Then add a second rule `button[type="submit"]:hover` with a slightly darker background color to give feedback on hover.

    > **Why `:not([type="radio"]):not([type="checkbox"])`?** These exclusions prevent radio buttons and checkboxes from getting the `width: 100%` and padding styles. Those controls are small clickable targets that should stay their natural size — stretching them would break how they look and work.

    > **Why `font-family: inherit` on inputs?** Browsers apply their own system font to form controls by default. Setting `font-family: inherit` makes inputs use the same font as the rest of your page, so everything looks consistent.

14. Add three rules using form pseudo-classes to give users visual feedback while they fill out the form.

    **Required field indicator:** Add a rule for `input:required:not([type="radio"]):not([type="checkbox"])`, `select:required`, and `textarea:required` (comma-separated). Set `border-left` to a slightly thicker value in the navy color — for example `3px solid var(--ut-navy)`. This marks required fields with a subtle left-edge accent.

    **Error state:** Add a rule for `input:user-invalid` and `textarea:user-invalid` (comma-separated). Set `border-color` to `var(--ut-red)` and `background-color` to a very light red such as `#fff5f5`. The `:user-invalid` pseudo-class fires only after the user has interacted with a field and left it in an invalid state — not on page load before the user has done anything.

    **Success state:** Add a rule for `input:valid:not(:placeholder-shown):not([type="radio"]):not([type="checkbox"])`. Set `border-color` to a green color such as `#2d8a4e`. `:placeholder-shown` is true when the placeholder is still visible, meaning the field is empty. `:not(:placeholder-shown)` means the field has a value. Together with `:valid`, this rule only applies the green border when a field has been filled in correctly.

    > **Why `:user-invalid` instead of `:invalid`?** `:invalid` fires the moment the page loads — before the user types anything. A form covered in red borders before anyone does anything feels broken and discouraging. `:user-invalid` waits until the user has interacted with the field, so errors appear at a natural moment in the workflow.

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
