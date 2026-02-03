# Text, Lists & Tables

In this lab, you'll enhance your Utah Tech University page with text formatting, lists, and tables. You'll practice using HTML tags for emphasis, special characters, three types of lists, and building data tables.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

## Instructions:

### Part 1: Add a Google Font

Google Fonts lets you use custom typefaces on your web pages. You'll add the Montserrat font.

1. In the `<head>` section, after the existing `<link>` tag, add these three lines to load Montserrat from Google Fonts:

   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">
   ```

2. In your CSS file, update the `h1` rule to use Montserrat as the font-family with a fallback of sans-serif.

### Part 2: Text Alignment

The `text-align` property controls horizontal text alignment.

3. In your CSS file, add `text-align: center` to the `h1` rule so the university name is centered.

### Part 3: Special Characters

HTML character entities display special symbols. They start with `&` and end with `;`.

4. In the footer, change the word "Copyright" to use the copyright symbol `&copy;`.

5. In the Welcome section, find "300+ days of sunshine" and add the degree symbol `&deg;` after "300" to make it read "300°+ days of sunshine".

### Part 4: Text Formatting Tags

HTML provides tags for emphasizing text with semantic meaning.

6. In the Welcome section, find the sentence "We are committed to active learning and helping students succeed." Wrap "active learning" in `<strong>` tags to make it bold.

7. In the same sentence, wrap "succeed" in `<em>` tags to make it italic.

8. Find "20:1 student-faculty ratio" and add a superscript `<sup>` tag containing "1" immediately after "ratio" to create a footnote reference.

9. In the footer, wrap the address content in `<pre>` tags to preserve its formatting. You can remove the `<br>` tags since `<pre>` preserves line breaks automatically.

### Part 5: Unordered Lists

Unordered lists display items with bullet points using `<ul>` and `<li>` tags.

10. Replace the entire "Why Choose Utah Tech?" section with a new section titled "Our Colleges". Inside, create an unordered list with these five colleges:
    - College of Science, Engineering & Technology
    - College of Health Sciences
    - College of Humanities & Social Sciences
    - College of Education
    - College of the Arts

### Part 6: Nested Lists

You can nest lists inside list items to show hierarchy.

11. Under the first college (College of Science, Engineering & Technology), add a nested unordered list containing three programs: Computer Science, Software Engineering, and Biology.

### Part 7: Ordered Lists

Ordered lists display numbered items using `<ol>` and `<li>` tags.

12. After the "Our Colleges" section, add a new section titled "How to Apply" with an ordered list containing three steps:
    - Submit your application online
    - Send official transcripts
    - Complete the FAFSA for financial aid

### Part 8: Definition Lists

Definition lists pair terms with their definitions using `<dl>`, `<dt>`, and `<dd>` tags.

13. After the "How to Apply" section, add a new section titled "Degree Types" with a definition list containing these four degree abbreviations and their meanings:
    - BS: Bachelor of Science
    - BA: Bachelor of Arts
    - AS: Associate of Science
    - AAS: Associate of Applied Science

### Part 9: HTML Tables

Tables organize data in rows and columns using `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` tags.

14. After the "Degree Types" section, add a new section titled "Tuition & Fees" with a table. The table should have:
    - A `<thead>` section with header cells (`<th>`) for: Program, Resident, Non-Resident
    - A `<tbody>` section with three rows of data (`<td>`) for Undergraduate, Graduate, and Online tuition rates

    Use these tuition rates per credit hour:
    - Undergraduate: $227 (resident), $725 (non-resident)
    - Graduate: $445 (resident), $662 (non-resident)
    - Online: $260 (both resident and non-resident)

### Part 10: Table Spanning

Use `colspan` to make a cell span multiple columns and `rowspan` to span multiple rows.

15. Add a new header row at the top of your table's `<thead>` with a single `<th>` cell that spans all three columns using `colspan="3"`. This cell should contain "Tuition Per Credit Hour".

16. Modify your table body to group the Undergraduate and Graduate rows together. Change the first cell of the Undergraduate row to say "Campus" and add `rowspan="2"` so it spans both the Undergraduate and Graduate rows. Then remove the first cell from the Graduate row since it's now covered by the rowspan.

## Summary

In this lab, you learned:

- **Google Fonts** - Loading custom fonts with `<link>` tags
- **Text Alignment** - Using `text-align` CSS property
- **Special Characters** - Using character entities like `&copy;` and `&deg;`
- **Text Formatting** - Using `<strong>`, `<em>`, `<sup>`, and `<pre>` tags
- **Unordered Lists** - Creating bulleted lists with `<ul>` and `<li>`
- **Nested Lists** - Placing lists inside list items
- **Ordered Lists** - Creating numbered lists with `<ol>` and `<li>`
- **Definition Lists** - Pairing terms and definitions with `<dl>`, `<dt>`, `<dd>`
- **Tables** - Structuring data with `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
- **Table Spanning** - Using `colspan` and `rowspan` to merge cells
