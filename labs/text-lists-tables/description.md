# Text, Lists & Tables

In this lab, you'll enhance your Utah Tech University page with text formatting, lists, and tables. You'll practice using HTML tags for emphasis, special characters, different types of lists, and building data tables.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** HTML character entities display special symbols. They start with <code>&amp;</code> and end with <code>;</code>. For example, <code>&amp;copy;</code> displays as ©.

## Instructions:

### Part 1: Add a Google Font

Google Fonts lets you use custom typefaces on your web pages. You'll add the Montserrat font to make the main heading stand out.

1. In the <code>&lt;head&gt;</code> section, after the existing <code>&lt;link&gt;</code> tag, add these three lines to load Montserrat from Google Fonts:

   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">
   ```

2. In your CSS file, find the <code>h1</code> rule and add a <code>font-family</code> property set to <code>'Montserrat', sans-serif</code>. The sans-serif is a fallback in case the font doesn't load.

### Part 2: Text Alignment

The <code>text-align</code> property controls horizontal text alignment. You can use values like <code>left</code>, <code>center</code>, <code>right</code>, or <code>justify</code>.

3. In your CSS file, find the <code>header</code> rule and add <code>text-align: center</code> so the university name and tagline are centered.

### Part 3: Special Characters & Dynamic Year

You'll use a character entity for the copyright symbol and JavaScript to automatically display the current year.

4. In the footer, find the paragraph that says "Copyright Utah Tech University". Change it to show the copyright symbol with a dynamic year:
   - Change the word "Copyright" to <code>&amp;copy;</code>
   - After the copyright symbol, add a space and then <code>&lt;span id="year"&gt;&lt;/span&gt;</code>
   - Keep "Utah Tech University" after the span

   Your paragraph should look like: <code>&lt;p&gt;&amp;copy; &lt;span id="year"&gt;&lt;/span&gt; Utah Tech University&lt;/p&gt;</code>

5. Just before the closing <code>&lt;/body&gt;</code> tag, add this JavaScript to fill in the current year:

   ```html
   <script>
       document.getElementById('year').textContent = new Date().getFullYear();
   </script>
   ```

### Part 4: Text Formatting Tags

HTML provides tags for emphasizing text with semantic meaning:
- <code>&lt;strong&gt;</code> makes text bold and indicates importance
- <code>&lt;em&gt;</code> makes text italic and indicates emphasis
- <code>&lt;sup&gt;</code> creates superscript text (like footnotes)
- <code>&lt;pre&gt;</code> preserves whitespace and line breaks exactly as written

6. In the Welcome section, find the sentence "We are committed to active learning and helping students succeed." Wrap the words "active learning" in <code>&lt;strong&gt;</code> tags so it reads: <code>committed to &lt;strong&gt;active learning&lt;/strong&gt; and</code>

7. In that same sentence, wrap the word "succeed" in <code>&lt;em&gt;</code> tags so it reads: <code>helping students &lt;em&gt;succeed&lt;/em&gt;.</code>

8. Find "20:1 student-faculty ratio" and add a superscript footnote reference. Immediately after the word "ratio", add <code>&lt;sup&gt;1&lt;/sup&gt;</code> to create a small raised "1".

9. In the footer, find the <code>&lt;address&gt;</code> element and wrap its contents in <code>&lt;pre&gt;</code> tags. Remove the <code>&lt;br&gt;</code> tag since <code>&lt;pre&gt;</code> preserves line breaks automatically. The text inside <code>&lt;pre&gt;</code> must start on the same line as the opening tag:

   ```html
   <address>
   <pre>225 S 700 E
   St. George, UT 84770</pre>
   </address>
   ```

### Part 5: Unordered Lists

Unordered lists display items with bullet points. They use <code>&lt;ul&gt;</code> to wrap the entire list and <code>&lt;li&gt;</code> to wrap each list item.

10. Find the "Why Choose Utah Tech?" section and replace it entirely with a new section. Create a section with the class <code>panel</code>, the heading "Our Colleges", and an unordered list containing these five colleges:
    - College of Science, Engineering & Technology
    - College of Health Sciences
    - College of Humanities & Social Sciences
    - College of Education
    - College of the Arts

### Part 6: Nested Lists

You can nest lists inside list items to show hierarchy. This is useful for showing subcategories or details.

11. Under the first college (College of Science, Engineering & Technology), add a nested unordered list. Place a new <code>&lt;ul&gt;</code> inside that <code>&lt;li&gt;</code>, after the college name, containing three programs: Computer Science, Software Engineering, and Biology.

    ```html
    <li>College of Science, Engineering &amp; Technology
        <ul>
            <li>Computer Science</li>
            <li>Software Engineering</li>
            <li>Biology</li>
        </ul>
    </li>
    ```

### Part 7: Ordered Lists

Ordered lists display numbered items automatically. They use <code>&lt;ol&gt;</code> to wrap the entire list and <code>&lt;li&gt;</code> to wrap each list item.

12. After the "Our Colleges" section, add a new section with the class <code>panel</code>, the heading "How to Apply", and an ordered list containing these three steps:
    - Submit your application online
    - Send official transcripts
    - Complete the FAFSA for financial aid

### Part 8: HTML Tables

Tables organize data in rows and columns using these tags:
- <code>&lt;table&gt;</code> wraps the entire table
- <code>&lt;thead&gt;</code> contains the header row(s)
- <code>&lt;tbody&gt;</code> contains the data rows
- <code>&lt;tr&gt;</code> creates a table row
- <code>&lt;th&gt;</code> creates a header cell (bold and centered by default)
- <code>&lt;td&gt;</code> creates a data cell

13. After the "How to Apply" section, add a new section with the class <code>panel</code>, the heading "Tuition & Fees", and a table with this structure:

    ```html
    <table>
        <thead>
            <tr>
                <th>Program</th>
                <th>Resident</th>
                <th>Non-Resident</th>
            </tr>
        </thead>
        <tbody>
            <!-- Data rows will go here -->
        </tbody>
    </table>
    ```

14. Inside the <code>&lt;tbody&gt;</code>, add three rows with tuition data. Each row needs three cells (<code>&lt;td&gt;</code>). Look up the current tuition rates at Utah Tech's official tuition page: <a href="https://catalog.utahtech.edu/tuitionfees/" target="_blank">https://catalog.utahtech.edu/tuitionfees/</a>

    Find the per-credit-hour rates for Undergraduate (resident and non-resident), Graduate (resident and non-resident), and Online. Make sure to include the dollar sign ($) before each amount.

### Part 9: Table Spanning

Sometimes you need cells that span multiple columns or rows:
- <code>colspan="n"</code> makes a cell span n columns horizontally
- <code>rowspan="n"</code> makes a cell span n rows vertically

15. Add a title row that spans the entire table. In your <code>&lt;thead&gt;</code>, add a new <code>&lt;tr&gt;</code> before the existing header row. This new row should have one <code>&lt;th&gt;</code> cell with <code>colspan="3"</code> containing the text "Tuition Per Credit Hour".

16. Group the Undergraduate and Graduate rows together using <code>rowspan</code>. These are both "Campus" programs:
    - In the Undergraduate row, change the first cell from "Undergraduate" to "Campus" and add <code>rowspan="2"</code>
    - In the Undergraduate row's Resident cell, add the label before the price (e.g., "Undergraduate: $___")
    - In the Graduate row, remove the first <code>&lt;td&gt;</code> cell entirely (it's now covered by the rowspan)
    - In the Graduate row's first remaining cell, add the label before the price (e.g., "Graduate: $___")

## Summary

In this lab, you learned:

- **Google Fonts** - Loading custom fonts with <code>&lt;link&gt;</code> tags and applying them with <code>font-family</code>
- **Text Alignment** - Using the <code>text-align</code> CSS property to center content
- **Special Characters** - Using character entities like <code>&amp;copy;</code> for symbols
- **Text Formatting** - Using <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>, <code>&lt;sup&gt;</code>, and <code>&lt;pre&gt;</code> tags for semantic emphasis
- **Unordered Lists** - Creating bulleted lists with <code>&lt;ul&gt;</code> and <code>&lt;li&gt;</code>
- **Nested Lists** - Placing lists inside list items for hierarchy
- **Ordered Lists** - Creating numbered lists with <code>&lt;ol&gt;</code> and <code>&lt;li&gt;</code>
- **Tables** - Structuring data with <code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tr&gt;</code>, <code>&lt;th&gt;</code>, <code>&lt;td&gt;</code>
- **Table Spanning** - Using <code>colspan</code> and <code>rowspan</code> to merge cells
