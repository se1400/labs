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

2. In your CSS file, update the `h1` rule to use Montserrat:

   ```css
   h1 {
       margin: 0;
       font-family: 'Montserrat', sans-serif;
   }
   ```

### Part 2: Text Alignment

The `text-align` property controls horizontal text alignment.

3. In your CSS file, add `text-align: center;` to the `h1` rule so the university name is centered:

   ```css
   h1 {
       margin: 0;
       font-family: 'Montserrat', sans-serif;
       text-align: center;
   }
   ```

### Part 3: Special Characters

HTML character entities display special symbols. They start with `&` and end with `;`.

4. In the footer, change `Copyright 2027` to use the copyright symbol:

   **Change this:**
   ```html
   <p>Copyright 2027 Utah Tech University</p>
   ```

   **To this:**
   ```html
   <p>&copy; 2027 Utah Tech University</p>
   ```

5. In the Welcome section, find "300+ days of sunshine" and add the degree symbol after "300+":

   **Change this:**
   ```html
   With 300+ days of sunshine per year
   ```

   **To this:**
   ```html
   With 300&deg;+ days of sunshine per year
   ```

### Part 4: Text Formatting Tags

HTML provides tags for emphasizing text with semantic meaning.

6. In the Welcome section, wrap "active learning" in `<strong>` tags to make it bold:

   ```html
   We are committed to <strong>active learning</strong> and helping students succeed.
   ```

7. In the same paragraph, wrap "succeed" in `<em>` tags to make it italic:

   ```html
   We are committed to <strong>active learning</strong> and helping students <em>succeed</em>.
   ```

8. Add a superscript footnote reference after "20:1 student-faculty ratio":

   ```html
   a 20:1 student-faculty ratio<sup>1</sup>
   ```

9. In the footer, wrap the address in `<pre>` tags to preserve its formatting. Remove the `<br>` tags since `<pre>` preserves line breaks:

   **Change this:**
   ```html
   <address>
       225 S 700 E<br>
       St. George, UT 84770
   </address>
   ```

   **To this:**
   ```html
   <address>
   <pre>225 S 700 E
   St. George, UT 84770</pre>
   </address>
   ```

### Part 5: Unordered Lists

Unordered lists display items with bullet points using `<ul>` and `<li>` tags.

10. Replace the entire "Why Choose Utah Tech?" section with a new "Our Colleges" section containing an unordered list:

    **Replace this entire section:**
    ```html
    <section class="panel">
        <h3>Why Choose Utah Tech?</h3>
        <p>Small class sizes with hands-on learning.</p>
        <p>Over 200 programs to choose from.</p>
        <p>Beautiful weather and outdoor adventures.</p>
    </section>
    ```

    **With this:**
    ```html
    <section class="panel">
        <h3>Our Colleges</h3>
        <ul>
            <li>College of Science, Engineering & Technology</li>
            <li>College of Health Sciences</li>
            <li>College of Humanities & Social Sciences</li>
            <li>College of Education</li>
            <li>College of the Arts</li>
        </ul>
    </section>
    ```

### Part 6: Nested Lists

You can nest lists inside list items to show hierarchy.

11. Under "College of Science, Engineering & Technology", add a nested unordered list with some programs:

    ```html
    <li>College of Science, Engineering & Technology
        <ul>
            <li>Computer Science</li>
            <li>Software Engineering</li>
            <li>Biology</li>
        </ul>
    </li>
    ```

### Part 7: Ordered Lists

Ordered lists display numbered items using `<ol>` and `<li>` tags.

12. After the "Our Colleges" section, add a new section with an ordered list for application steps:

    ```html
    <section class="panel">
        <h3>How to Apply</h3>
        <ol>
            <li>Submit your application online</li>
            <li>Send official transcripts</li>
            <li>Complete the FAFSA for financial aid</li>
        </ol>
    </section>
    ```

### Part 8: Definition Lists

Definition lists pair terms with their definitions using `<dl>`, `<dt>`, and `<dd>` tags.

13. After the "How to Apply" section, add a definition list for degree types:

    ```html
    <section class="panel">
        <h3>Degree Types</h3>
        <dl>
            <dt>BS</dt>
            <dd>Bachelor of Science</dd>
            <dt>BA</dt>
            <dd>Bachelor of Arts</dd>
            <dt>AS</dt>
            <dd>Associate of Science</dd>
            <dt>AAS</dt>
            <dd>Associate of Applied Science</dd>
        </dl>
    </section>
    ```

### Part 9: HTML Tables

Tables organize data in rows and columns using `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` tags.

14. After the "Degree Types" section, add a tuition table:

    ```html
    <section class="panel">
        <h3>Tuition & Fees (2024-2025)</h3>
        <table>
            <thead>
                <tr>
                    <th>Program</th>
                    <th>Resident</th>
                    <th>Non-Resident</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Undergraduate</td>
                    <td>$227/credit</td>
                    <td>$725/credit</td>
                </tr>
                <tr>
                    <td>Graduate</td>
                    <td>$445/credit</td>
                    <td>$662/credit</td>
                </tr>
                <tr>
                    <td>Online</td>
                    <td>$260/credit</td>
                    <td>$260/credit</td>
                </tr>
            </tbody>
        </table>
    </section>
    ```

### Part 10: Table Spanning

Use `colspan` to make a cell span multiple columns and `rowspan` to span multiple rows.

15. Add `colspan="3"` to make the header span all three columns. Update the table header:

    **Change this:**
    ```html
    <thead>
        <tr>
            <th>Program</th>
            <th>Resident</th>
            <th>Non-Resident</th>
        </tr>
    </thead>
    ```

    **To this:**
    ```html
    <thead>
        <tr>
            <th colspan="3">Tuition Per Credit Hour</th>
        </tr>
        <tr>
            <th>Program</th>
            <th>Resident</th>
            <th>Non-Resident</th>
        </tr>
    </thead>
    ```

16. Use `rowspan="2"` to group the first two rows under "Campus". Update the tbody:

    **Change this:**
    ```html
    <tbody>
        <tr>
            <td>Undergraduate</td>
            <td>$227/credit</td>
            <td>$725/credit</td>
        </tr>
        <tr>
            <td>Graduate</td>
    ```

    **To this:**
    ```html
    <tbody>
        <tr>
            <td rowspan="2">Campus</td>
            <td>Undergraduate: $227</td>
            <td>$725</td>
        </tr>
        <tr>
            <td>Graduate: $445</td>
            <td>$662</td>
        </tr>
    ```

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
