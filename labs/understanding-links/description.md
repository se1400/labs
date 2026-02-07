# Understanding Links

In this lab, you'll add hyperlinks and navigation to your Utah Tech University page. You'll practice using anchor links for in-page navigation, external links to other websites, email and telephone links, and CSS styling for link states.

**Objective:** Follow the instructions below and get all the tests to pass to complete the lab.

**Important:** Links are created with the <code>&lt;a&gt;</code> (anchor) element. Every link needs an <code>href</code> attribute that tells the browser where to go. The basic format is: <code>&lt;a href="destination"&gt;click text&lt;/a&gt;</code>

## Instructions:

### Part 1: Navigation Anchor Links

Anchor links let users jump to different sections on the same page. The <code>href</code> uses a <code>#</code> followed by the <code>id</code> of the target element. For example, <code>&lt;a href="#about"&gt;About&lt;/a&gt;</code> would jump to whichever element has <code>id="about"</code>.

Your starter page already has <code>id</code> attributes on each section: <code>welcome</code>, <code>colleges</code>, <code>apply</code>, <code>tuition</code>, and <code>visit</code>. You just need to create the links that point to them.

1. In the <code>&lt;nav&gt;</code> element, the navigation items are currently plain text. Replace each text item with an <code>&lt;a&gt;</code> element that points to the matching section. Here's how the nav items should map to section ids:

   - "Home" → <code>#welcome</code>
   - "Admissions" → <code>#apply</code>
   - "Academics" → <code>#colleges</code>
   - "Tuition" → <code>#tuition</code>
   - "Campus Life" → <code>#visit</code>

   After this step, clicking each nav item should scroll the page to that section.

### Part 2: External Links

External links point to other websites using a full URL that starts with <code>https://</code>. When linking to an external site, you should add two attributes for security and usability:
- <code>target="_blank"</code> opens the link in a new tab (so the user doesn't leave your page)
- <code>rel="noopener noreferrer"</code> prevents the new tab from being able to access or manipulate your page — this is a security best practice any time you use <code>target="_blank"</code>

2. In the "How to Apply" ordered list, find the text "Submit your application online". Wrap just the word "online" in a link to <code>https://utahtech.edu/admissions/</code>. Since this is an external site, make sure it opens in a new tab and includes the security attribute.

3. In the same list, find "Complete the FAFSA for financial aid". Wrap just the word "FAFSA" in a link to <code>https://studentaid.gov/</code>. Use the same new-tab and security attributes as the previous link.

### Part 3: Telephone Link

Telephone links use <code>tel:</code> instead of <code>https://</code> in the <code>href</code>. On mobile devices, tapping a <code>tel:</code> link will open the phone dialer. The phone number in the <code>href</code> must use international format with no spaces, dashes, or parentheses: <code>+1</code> followed by the 10-digit number.

For example, if the number were (801) 555-1234, the href would be <code>tel:+18015551234</code>.

4. In the "Visit Campus" aside, find the phone number <code>(435) 652-7500</code>. Wrap just the phone number text in an <code>&lt;a&gt;</code> element with the appropriate <code>tel:</code> href. The display text should still show the number in its readable format with parentheses and dash.

### Part 4: Email Link

Email links use <code>mailto:</code> in the <code>href</code>. Clicking one opens the user's default email client with a new message. You can pre-fill the subject line by adding <code>?subject=Your Subject Here</code> after the email address (spaces in the subject are OK).

For example: <code>href="mailto:info@example.com?subject=Hello There"</code>

5. In the same "Visit Campus" aside, add a new line after the phone number. You'll need a <code>&lt;br&gt;</code> after the phone number link to create the line break (you've used <code>&lt;br&gt;</code> in previous labs). On the new line, write "Email us at " followed by a link. The link's <code>href</code> should use <code>mailto:</code> pointing to <code>admissions@utahtech.edu</code> with the subject "Campus Tour Question". The visible link text should show the email address.

### Part 5: Back to Top Link

A "Back to Top" link is another anchor link — it works the same way as the nav links from Part 1, except it points to the top of the page.

6. You need something at the top of the page for the link to point to. Add an <code>id</code> attribute with the value <code>top</code> to the <code>&lt;header&gt;</code> element. You've added <code>id</code> attributes to elements in previous labs, so this should be familiar.

7. In the <code>&lt;footer&gt;</code>, after the <code>&lt;address&gt;</code> element, add a link with the text "Back to Top" that points to the <code>id</code> you just added. Think about how you wrote the anchor links in Part 1 — this works the same way.

### Part 6: CSS Link Styling

Links have four visual states that you can style with CSS pseudo-classes. A pseudo-class is a keyword added to a selector with a colon, like <code>a:hover</code>. The order you write these rules matters because of how the CSS cascade works. Use the mnemonic **LoVe HAte** to remember the order:

- <code>a:link</code> — an unvisited link (the **L** in **L**o**V**e)
- <code>a:visited</code> — a link the user has already clicked (the **V** in Lo**V**e)
- <code>a:hover</code> — when the mouse cursor is over the link (the **H** in **H****A**te)
- <code>a:active</code> — the moment a link is being clicked (the **A** in H**A**te)

8. In your CSS file, add the <code>a:link</code> rule first. This one sets up the look for all links — white text on a colored background, creating a badge-like appearance. Set these properties:
   - <code>color</code> to <code>#ffffff</code> (white text — always stays white for readability)
   - <code>background-color</code> to <code>#BA1C21</code> (Utah Tech red background)
   - <code>padding</code> to <code>2px 6px</code> (a little space around the text so the background isn't cramped)
   - <code>border-radius</code> to <code>3px</code> (slightly rounds the corners)
   - <code>text-decoration</code> to <code>none</code> (removes the default underline since the background color already makes links obvious)

   Now add the remaining three rules. These only need to set <code>color</code> to <code>#ffffff</code> and a <code>background-color</code> — they inherit the padding, border-radius, and text-decoration from the <code>a:link</code> rule:

   - <code>a:visited</code> — <code>background-color: #6A1039</code> (plum — shows which links have been clicked)
   - <code>a:hover</code> — <code>background-color: #D32F2F</code> (bright red — gives clear feedback when hovering)
   - <code>a:active</code> — <code>background-color: #003058</code> (dark blue flash when clicking)

   After saving, notice how your links now look like colored badges. Hover over them and watch the background shift. Click one and see the visited color change.

### Part 7: Nav Link Styling

After adding the link colors above, you'll notice the nav bar links also changed — they now have the red badge background instead of fitting into the dark blue nav bar! That's because the <code>a:link</code> rule applies to *all* links on the page. You need to override those styles for links inside the nav.

You can target links inside a specific parent using a **descendant selector**. For example, <code>nav a</code> selects all <code>&lt;a&gt;</code> elements that are inside a <code>&lt;nav&gt;</code>. This is more specific than just <code>a:link</code>, so it will override the general link colors.

The starter CSS already has <code>display: flex</code> on the nav, which lays the links out in a row. You just need to style the links themselves so they look like proper nav buttons that fill the full height of the bar.

**Important:** The link rules from Part 6 use pseudo-class selectors like <code>a:link</code>, which have higher specificity than a plain <code>nav a</code> selector. That means <code>nav a</code> alone won't override them! To win the specificity battle, your nav rules also need to use pseudo-classes: <code>nav a:link</code> and <code>nav a:visited</code>.

9. In your CSS file, add a <code>nav a:link, nav a:visited</code> rule that overrides the badge styling and makes the links look like nav buttons. By listing both selectors separated by a comma, this rule applies to both unvisited and visited nav links. Set:
   - <code>color</code> to <code>#ffffff</code> (white text to match the nav bar)
   - <code>background-color</code> to <code>transparent</code> (removes the red background — the nav's own dark blue shows through instead)
   - <code>padding</code> to <code>20px 16px</code> (gives each link a tall clickable area that fills the full height of the nav bar — great for touch screens)
   - <code>border-radius</code> to <code>0</code> (removes the rounded corners from the badge styling)
   - <code>text-decoration</code> to <code>none</code> (removes any underline)

10. Add a <code>nav a:hover</code> rule that sets <code>color</code> to <code>#ffffff</code>, <code>background-color</code> to <code>#003058</code> (the same dark blue as the nav bar), <code>padding</code> to <code>20px 16px</code>, and <code>text-decoration</code> to <code>none</code>. This ensures the nav links don't pick up the bright red hover color from Part 6 — they stay clean and consistent with the nav bar. The padding is repeated here so the hover state keeps the same height as the normal state.

### Part 8: Skip Link (Accessibility)

A skip link is a hidden link that lets keyboard users jump past the navigation straight to the main content. It stays invisible until a user presses the Tab key, then it appears at the top of the page. This is an important accessibility feature — screen reader and keyboard-only users shouldn't have to tab through every nav link on every page.

11. Add <code>id="main-content"</code> to the <code>&lt;main&gt;</code> element. This gives the skip link a target to jump to.

12. As the very first element inside <code>&lt;body&gt;</code> (before the <code>&lt;header&gt;</code>), add a link with the text "Skip to main content" that points to <code>#main-content</code>. Give this link <code>class="skip-link"</code> so you can style it in the next steps.

13. In your CSS file, add a <code>.skip-link</code> rule that hides the link off-screen. Set <code>position</code> to <code>absolute</code> and <code>left</code> to <code>-9999px</code>. This moves the link far off the left side of the screen — it's still in the HTML (so keyboard users can Tab to it), but it's not visible.

14. Add a <code>.skip-link:focus</code> rule that brings the link back on screen when it receives keyboard focus. Set:
    - <code>left</code> to <code>0</code> and <code>top</code> to <code>0</code> (moves it to the top-left corner)
    - <code>background</code> to <code>#003058</code> and <code>color</code> to <code>#ffffff</code> (dark background with white text so it's clearly visible)
    - <code>padding</code> to <code>8px</code> (gives it some breathing room)
    - <code>z-index</code> to <code>100</code> (ensures it appears on top of everything else)

    Try pressing Tab on your page — the skip link should appear at the top!

### Part 9: Smooth Scrolling

By default, clicking an anchor link instantly jumps to the target section. You can make it scroll smoothly with one CSS property.

15. In your CSS file, add an <code>html</code> selector and set <code>scroll-behavior</code> to <code>smooth</code>. After saving, click the nav links and watch the page glide to each section instead of jumping.

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
