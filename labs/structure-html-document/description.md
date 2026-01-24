# Structure an HTML Document

In this lab, you'll practice structuring an HTML document using semantic elements. You will build a Utah Tech University page that demonstrates proper HTML5 document structure.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** Most HTML elements require both an opening tag and a closing tag. For example, <code>&lt;p&gt;</code> is the opening tag and <code>&lt;/p&gt;</code> is the closing tag. Some elements like <code>&lt;meta&gt;</code>, <code>&lt;br&gt;</code>, and <code>&lt;hr&gt;</code> are self-closing and do not need a closing tag.

## Instructions:

### Document Foundation

1. Your document should start with a <code>&lt;!doctype html&gt;</code> declaration on the first line. This tells the browser you are using HTML5.

2. Below the doctype, add an opening <code>&lt;html&gt;</code> tag with a <code>lang</code> attribute set to <code>en</code>. All of your other HTML content will go inside this element. Don't forget to add the closing <code>&lt;/html&gt;</code> tag at the very end of your document.

3. Inside your <code>&lt;html&gt;</code> element, add a <code>&lt;head&gt;</code> element with its closing <code>&lt;/head&gt;</code> tag. After the closing <code>&lt;/head&gt;</code> tag, add a <code>&lt;body&gt;</code> element with its closing <code>&lt;/body&gt;</code> tag.

4. Inside your <code>&lt;head&gt;</code> element, add a <code>&lt;meta&gt;</code> element with a <code>charset</code> attribute set to <code>utf-8</code>. The <code>&lt;meta&gt;</code> element is self-closing and does not need a closing tag.

5. Inside your <code>&lt;head&gt;</code> element, add another <code>&lt;meta&gt;</code> element with a <code>name</code> attribute set to <code>viewport</code> and a <code>content</code> attribute set to <code>width=device-width, initial-scale=1.0</code>.

6. Inside your <code>&lt;head&gt;</code> element, add a <code>&lt;title&gt;</code> element with the text <code>Utah Tech University</code> between the opening and closing tags.

### Header Section

7. Inside your <code>&lt;body&gt;</code> element, add a <code>&lt;header&gt;</code> element with its closing <code>&lt;/header&gt;</code> tag. This should be the first element inside the body.

8. Inside your <code>&lt;header&gt;</code> element, add an <code>&lt;h1&gt;</code> element with the text <code>Utah Tech University</code> between the opening and closing tags.

9. After the closing <code>&lt;/h1&gt;</code> tag but still inside the <code>&lt;header&gt;</code>, add a <code>&lt;p&gt;</code> element with the text <code>Active Learning. Active Life.</code> between the opening and closing tags.

### Navigation Section

10. After the closing <code>&lt;/header&gt;</code> tag, add a <code>&lt;nav&gt;</code> element with the text <code>Home | Admissions | Academics | Campus Life</code> between the opening and closing tags.

### Main Content

11. After the closing <code>&lt;/nav&gt;</code> tag, add a <code>&lt;main&gt;</code> element with its closing <code>&lt;/main&gt;</code> tag.

12. Inside your <code>&lt;main&gt;</code> element, add a <code>&lt;section&gt;</code> element with its closing <code>&lt;/section&gt;</code> tag. This is your first section.

13. Inside your first <code>&lt;section&gt;</code>, add an <code>&lt;h2&gt;</code> element with the text <code>Welcome to Utah Tech</code> between the opening and closing tags.

14. After the closing <code>&lt;/h2&gt;</code> tag but still inside the first <code>&lt;section&gt;</code>, add one or more <code>&lt;p&gt;</code> elements describing Utah Tech University. Write about the school's location in St. George, Utah, and anything else you'd like to share about the campus.

15. After the closing <code>&lt;/section&gt;</code> tag of your first section but still inside <code>&lt;main&gt;</code>, add a second <code>&lt;section&gt;</code> element with its closing <code>&lt;/section&gt;</code> tag.

16. Inside your second <code>&lt;section&gt;</code>, add an <code>&lt;h3&gt;</code> element with the text <code>Why Choose Utah Tech?</code> between the opening and closing tags.

17. After the closing <code>&lt;/h3&gt;</code> tag but still inside the second <code>&lt;section&gt;</code>, add one or more <code>&lt;p&gt;</code> elements describing reasons to choose Utah Tech. You might mention class sizes, available programs, the weather, outdoor activities, or other benefits.

18. After the closing <code>&lt;/section&gt;</code> tag of your second section but still inside <code>&lt;main&gt;</code>, add an <code>&lt;aside&gt;</code> element with its closing <code>&lt;/aside&gt;</code> tag.

19. Inside your <code>&lt;aside&gt;</code>, add an <code>&lt;h4&gt;</code> element with the text <code>Visit Campus</code> between the opening and closing tags.

20. After the closing <code>&lt;/h4&gt;</code> tag but still inside the <code>&lt;aside&gt;</code>, add a <code>&lt;p&gt;</code> element with a call to action. Include a <code>&lt;br&gt;</code> element (which is self-closing) somewhere in the paragraph to create a line break. For example, you might write something like "Schedule a tour today!" followed by a phone number.

### Footer Section

21. After the closing <code>&lt;/main&gt;</code> tag but still inside the <code>&lt;body&gt;</code>, add a <code>&lt;footer&gt;</code> element with its closing <code>&lt;/footer&gt;</code> tag.

22. Inside your <code>&lt;footer&gt;</code>, add an <code>&lt;hr&gt;</code> element. This creates a horizontal line and is self-closing (no closing tag needed).

23. After the <code>&lt;hr&gt;</code> but still inside the <code>&lt;footer&gt;</code>, add a <code>&lt;p&gt;</code> element with copyright information. Include the word "Copyright", the current year, and the university name.

24. After that <code>&lt;p&gt;</code> element but still inside the <code>&lt;footer&gt;</code>, add an <code>&lt;address&gt;</code> element with the school's address. Include a <code>&lt;br&gt;</code> element to separate the street address from the city, state, and zip code.

**Note:** This lab focuses on HTML structure only. No CSS is required.
