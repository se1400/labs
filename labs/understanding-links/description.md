# Understanding Links

In this lab, you'll add hyperlinks and navigation to your Utah Tech University page. You'll practice using anchor links for in-page navigation, external links to other websites, email and telephone links, and CSS styling for link states.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** The <code>href</code> attribute is required on every <code>&lt;a&gt;</code> element. Without it, the link won't work. Pay close attention to the <code>#</code> symbol for anchor links and the <code>://</code> in external URLs.

## Instructions:

### Part 1: Navigation Anchor Links

Anchor links let users jump to different sections on the same page. The <code>href</code> uses a <code>#</code> followed by the <code>id</code> of the target element.

Your starter page already has <code>id</code> attributes on each section (<code>id="welcome"</code>, <code>id="colleges"</code>, <code>id="apply"</code>, <code>id="tuition"</code>, <code>id="visit"</code>). You just need to create the links.

1. In the <code>&lt;nav&gt;</code> element, replace the plain text with anchor links. Each word should become an <code>&lt;a&gt;</code> element that points to a section on the page. Keep the <code>|</code> separators between the links.

   **Change this:**
   ```html
   Home | Admissions | Academics | Tuition | Campus Life
   ```

   **To this:**
   ```html
   <a href="#welcome">Home</a> | <a href="#apply">Admissions</a> | <a href="#colleges">Academics</a> | <a href="#tuition">Tuition</a> | <a href="#visit">Campus Life</a>
   ```

### Part 2: External Links

External links point to other websites using a full URL that starts with <code>https://</code>. When linking to external sites, use <code>target="_blank"</code> to open the link in a new tab and <code>rel="noopener noreferrer"</code> for security.

2. In the "How to Apply" ordered list, find "Submit your application online" and wrap the word "online" in a link to the Utah Tech admissions page:

   **Change this:**
   ```html
   <li>Submit your application online</li>
   ```

   **To this:**
   ```html
   <li>Submit your application <a href="https://utahtech.edu/admissions/" target="_blank" rel="noopener noreferrer">online</a></li>
   ```

3. In the same list, find "Complete the FAFSA for financial aid" and wrap "FAFSA" in a link to the federal student aid website:

   **Change this:**
   ```html
   <li>Complete the FAFSA for financial aid</li>
   ```

   **To this:**
   ```html
   <li>Complete the <a href="https://studentaid.gov/" target="_blank" rel="noopener noreferrer">FAFSA</a> for financial aid</li>
   ```

### Part 3: Telephone Link

Telephone links use <code>tel:</code> instead of <code>https://</code>. The phone number in the <code>href</code> should use the international format with no spaces or parentheses: <code>+1</code> followed by the 10-digit number.

4. In the "Visit Campus" aside, wrap the phone number <code>(435) 652-7500</code> in a telephone link:

   **Change this:**
   ```html
   Call us at (435) 652-7500
   ```

   **To this:**
   ```html
   Call us at <a href="tel:+14356527500">(435) 652-7500</a>
   ```

### Part 4: Email Link

Email links use <code>mailto:</code> instead of <code>https://</code>. You can add a pre-filled subject line using <code>?subject=</code> after the email address.

5. In the same aside, add a new line after the phone number with an email link. Add a <code>&lt;br&gt;</code> after the phone number link, then add the email link:

   ```html
   Email us at <a href="mailto:admissions@utahtech.edu?subject=Campus Tour Question">admissions@utahtech.edu</a>
   ```

   Your paragraph should now look like this:
   ```html
   <p>Schedule a tour today!<br>
   Call us at <a href="tel:+14356527500">(435) 652-7500</a><br>
   Email us at <a href="mailto:admissions@utahtech.edu?subject=Campus Tour Question">admissions@utahtech.edu</a></p>
   ```

### Part 5: Back to Top Link

A "Back to Top" link is another anchor link that takes the user back to the top of the page.

6. Add <code>id="top"</code> to the <code>&lt;header&gt;</code> element:

   **Change this:**
   ```html
   <header>
   ```

   **To this:**
   ```html
   <header id="top">
   ```

7. In the <code>&lt;footer&gt;</code>, after the <code>&lt;address&gt;</code> element, add a "Back to Top" link:

   ```html
   <a href="#top">Back to Top</a>
   ```

### Part 6: CSS Link Styling

Links have five states that you can style with CSS pseudo-classes. The order matters and follows the mnemonic **LoVe HAte**:
- <code>a:link</code> — unvisited links (the **L** in LoVe)
- <code>a:visited</code> — links already clicked (the **V** in LoVe)
- <code>a:hover</code> — when the mouse is over the link (the **H** in HAte)
- <code>a:active</code> — the moment a link is being clicked (the **A** in HAte)

8. In your CSS file, add these four rules in this exact order. The order matters because of how CSS cascading works:

   ```css
   a:link { color: #BA1C21; }
   a:visited { color: #6B0F13; }
   a:hover { color: #003058; }
   a:active { color: #FF6B35; }
   ```

### Part 7: Nav Link Styling

The nav bar has a dark background, so the links inside it need different colors than the rest of the page. You can target links inside the nav using the descendant selector <code>nav a</code>.

9. In your CSS file, add a <code>nav a</code> selector and set:
   - <code>color</code> to <code>#ffffff</code>
   - <code>text-decoration</code> to <code>none</code>

10. Add a <code>nav a:hover</code> selector and set <code>text-decoration</code> to <code>underline</code>.

### Part 8: Skip Link (Accessibility)

A skip link lets keyboard users jump past the navigation straight to the main content. It is hidden off-screen and only becomes visible when a user presses the Tab key.

11. Add <code>id="main-content"</code> to the <code>&lt;main&gt;</code> element:

    **Change this:**
    ```html
    <main>
    ```

    **To this:**
    ```html
    <main id="main-content">
    ```

12. As the very first element inside <code>&lt;body&gt;</code> (before <code>&lt;header&gt;</code>), add a skip link:

    ```html
    <a href="#main-content" class="skip-link">Skip to main content</a>
    ```

13. In your CSS file, add a <code>.skip-link</code> selector to hide the link off-screen:

    ```css
    .skip-link {
        position: absolute;
        left: -9999px;
    }
    ```

14. Add a <code>.skip-link:focus</code> selector to show it when focused with the keyboard:

    ```css
    .skip-link:focus {
        left: 0;
        top: 0;
        background: #003058;
        color: #ffffff;
        padding: 8px;
        z-index: 100;
    }
    ```

### Part 9: Smooth Scrolling

By default, clicking an anchor link instantly jumps to the target section. You can make it scroll smoothly with one CSS property.

15. In your CSS file, add an <code>html</code> selector and set <code>scroll-behavior</code> to <code>smooth</code>.

    ```css
    html { scroll-behavior: smooth; }
    ```

## Summary

In this lab, you learned:

- **Anchor Links** — Using <code>href="#id"</code> to jump to sections on the same page
- **External Links** — Using full URLs with <code>target="_blank"</code> and <code>rel="noopener noreferrer"</code>
- **Telephone Links** — Using <code>tel:</code> with international format phone numbers
- **Email Links** — Using <code>mailto:</code> with optional <code>?subject=</code> parameters
- **Back to Top** — Combining an <code>id</code> on the header with an anchor link in the footer
- **Link Pseudo-classes** — Styling <code>a:link</code>, <code>a:visited</code>, <code>a:hover</code>, and <code>a:active</code> in LoVe HAte order
- **Nav Link Styling** — Using descendant selectors to style links differently in the nav
- **Skip Links** — Adding accessible navigation for keyboard users
- **Smooth Scrolling** — Using <code>scroll-behavior: smooth</code> for animated navigation
