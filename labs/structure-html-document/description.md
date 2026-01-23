# Structure an HTML Document

In this lab, you'll practice structuring an HTML document using semantic elements. You will build a simple organization page (school, business, club, etc.) that demonstrates proper HTML5 document structure.

**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

## User Stories:

### Document Foundation

1. Your document should start with a <code>&lt;!doctype html&gt;</code> declaration to indicate it's an HTML5 document.

2. You should have an <code>&lt;html&gt;</code> element with a <code>lang</code> attribute set to <code>en</code> that wraps all your content.

3. Inside the <code>&lt;html&gt;</code> element, you should have a <code>&lt;head&gt;</code> element followed by a <code>&lt;body&gt;</code> element.

4. Your <code>&lt;head&gt;</code> element should contain a <code>&lt;meta&gt;</code> element with a <code>charset</code> attribute set to <code>utf-8</code>.

5. Your <code>&lt;head&gt;</code> element should contain a <code>&lt;meta&gt;</code> element with a <code>name</code> attribute set to <code>viewport</code> and a <code>content</code> attribute set to <code>width=device-width, initial-scale=1.0</code>.

6. Your <code>&lt;head&gt;</code> element should contain a <code>&lt;title&gt;</code> element with text describing your page.

### Header Section

7. Inside your <code>&lt;body&gt;</code>, you should have a <code>&lt;header&gt;</code> element as the first child.

8. Your <code>&lt;header&gt;</code> element should contain an <code>&lt;h1&gt;</code> element with the name of your organization.

9. Your <code>&lt;header&gt;</code> element should contain a <code>&lt;p&gt;</code> element with a tagline or slogan after the <code>&lt;h1&gt;</code>.

### Navigation Section

10. After your <code>&lt;header&gt;</code>, you should have a <code>&lt;nav&gt;</code> element with text representing navigation links (e.g., "Home | About | Contact").

### Main Content

11. After your <code>&lt;nav&gt;</code>, you should have a <code>&lt;main&gt;</code> element that contains the primary content of your page.

12. Inside your <code>&lt;main&gt;</code> element, you should have at least two <code>&lt;section&gt;</code> elements.

13. Your first <code>&lt;section&gt;</code> should contain an <code>&lt;h2&gt;</code> heading and at least two <code>&lt;p&gt;</code> elements with content about your organization.

14. Your second <code>&lt;section&gt;</code> should contain an <code>&lt;h3&gt;</code> heading and at least three <code>&lt;p&gt;</code> elements with additional details (features, benefits, etc.).

15. Inside your <code>&lt;main&gt;</code> element, you should have an <code>&lt;aside&gt;</code> element after your sections.

16. Your <code>&lt;aside&gt;</code> element should contain an <code>&lt;h4&gt;</code> heading and a <code>&lt;p&gt;</code> element with secondary information.

17. Your <code>&lt;aside&gt;</code> should use at least one <code>&lt;br&gt;</code> tag to create a line break within the content.

### Footer Section

18. After your <code>&lt;main&gt;</code>, you should have a <code>&lt;footer&gt;</code> element as the last child of the <code>&lt;body&gt;</code>.

19. Your <code>&lt;footer&gt;</code> should start with an <code>&lt;hr&gt;</code> element to create a horizontal rule.

20. Your <code>&lt;footer&gt;</code> should contain a <code>&lt;p&gt;</code> element with copyright information.

21. Your <code>&lt;footer&gt;</code> should contain an <code>&lt;address&gt;</code> element with contact information (like a street address).

22. Your <code>&lt;address&gt;</code> element should use at least one <code>&lt;br&gt;</code> tag to format the address on multiple lines.

**Note:** This lab focuses on HTML structure only. No CSS is required.
