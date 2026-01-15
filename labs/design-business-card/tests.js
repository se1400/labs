// Test 1: Main div with class="business-card"
test('You should have one main div with a class attribute with a value of business-card', () => {
  const businessCard = document.querySelector('div.business-card');
  expect(businessCard).toBeTruthy();
});

// Test 2: img with class="profile-image" inside .business-card
test('Inside the .business-card element, there should be an img element with a class attribute with a value of profile-image', () => {
  const businessCard = document.querySelector('.business-card');
  expect(businessCard).toBeTruthy();
  const img = businessCard.querySelector('img.profile-image');
  expect(img).toBeTruthy();
});

// Test 3: Image has valid src
test('The image source should be set to a valid image', () => {
  const img = document.querySelector('.profile-image');
  expect(img).toBeTruthy();
  const src = img.getAttribute('src');
  expect(src).toBeTruthy();
  expect(src.trim().length).toBeGreaterThan(0);
});

// Test 4: Image has meaningful alt
test('The alt attribute of the image should be set to a meaningful description', () => {
  const img = document.querySelector('.profile-image');
  expect(img).toBeTruthy();
  const alt = img.getAttribute('alt');
  expect(alt).toBeTruthy();
  expect(alt.trim().length).toBeGreaterThan(0);
});

// Test 5: p.full-name after img
test('Inside the .business-card element, after the img element, there should be a p element with a class attribute with a value of full-name', () => {
  const businessCard = document.querySelector('.business-card');
  expect(businessCard).toBeTruthy();
  const fullName = businessCard.querySelector('p.full-name');
  expect(fullName).toBeTruthy();
});

// Test 6: p.designation after p.full-name
test('After the .full-name element, there should be a p element with a class attribute with a value of designation', () => {
  const designation = document.querySelector('p.designation');
  expect(designation).toBeTruthy();
});

// Test 7: p.company after p.designation
test('After the .designation element, there should be a p element with a class attribute with a value of company', () => {
  const company = document.querySelector('p.company');
  expect(company).toBeTruthy();
});

// Test 8: p.full-name has name text
test('The first p element, the one with class of full-name, should contain your name', () => {
  const fullName = document.querySelector('p.full-name');
  expect(fullName).toBeTruthy();
  expect(fullName.textContent.trim().length).toBeGreaterThan(0);
});

// Test 9: p.designation has designation text
test('The second p element, the one with a class attribute of designation, should contain your designation', () => {
  const designation = document.querySelector('p.designation');
  expect(designation).toBeTruthy();
  expect(designation.textContent.trim().length).toBeGreaterThan(0);
});

// Test 10: p.company has company name
test('The third p element, the one with the class attribute with a value of company, should contain your company name', () => {
  const company = document.querySelector('p.company');
  expect(company).toBeTruthy();
  expect(company.textContent.trim().length).toBeGreaterThan(0);
});

// Test 11: hr after p.company
test('After the third p element, the one with the class attribute with a value of company, there should be an hr element', () => {
  const company = document.querySelector('p.company');
  expect(company).toBeTruthy();
  const businessCard = document.querySelector('.business-card');
  const hrs = businessCard.querySelectorAll('hr');
  expect(hrs.length).toBeGreaterThanOrEqual(1);
});

// Test 12: p with email after first hr
test('After the first hr element, there should be a p element with an email address as your text', () => {
  const businessCard = document.querySelector('.business-card');
  expect(businessCard).toBeTruthy();
  const hrs = businessCard.querySelectorAll('hr');
  expect(hrs.length).toBeGreaterThanOrEqual(1);

  // Find p elements that come after the first hr
  const allElements = Array.from(businessCard.children);
  const firstHrIndex = allElements.indexOf(hrs[0]);
  const elementsAfterHr = allElements.slice(firstHrIndex + 1);
  const pAfterHr = elementsAfterHr.find(el => el.tagName === 'P');
  expect(pAfterHr).toBeTruthy();
  expect(pAfterHr.textContent).toMatch(/@/);
});

// Test 13: p with phone after email p
test('After the email p element, there should be another p element with a phone number as your text', () => {
  const businessCard = document.querySelector('.business-card');
  expect(businessCard).toBeTruthy();
  const allP = businessCard.querySelectorAll('p');
  // Should have at least 5 p elements (name, designation, company, email, phone)
  expect(allP.length).toBeGreaterThanOrEqual(5);
});

// Test 14: a.portfolio-link exists
test('After the phone number p element, there should be an a element with the class portfolio-link', () => {
  const portfolioLink = document.querySelector('a.portfolio-link');
  expect(portfolioLink).toBeTruthy();
});

// Test 15: portfolio-link has text "Portfolio"
test('The .portfolio-link element should have text of Portfolio', () => {
  const portfolioLink = document.querySelector('a.portfolio-link');
  expect(portfolioLink).toBeTruthy();
  expect(portfolioLink.textContent).toMatch(/Portfolio/);
});

// Test 16: portfolio-link has valid href
test('Your .portfolio-link element should have a valid href', () => {
  const portfolioLink = document.querySelector('a.portfolio-link');
  expect(portfolioLink).toBeTruthy();
  const href = portfolioLink.getAttribute('href');
  expect(href).toBeTruthy();
  expect(href.trim().length).toBeGreaterThan(0);
});

// Test 17: Second hr after portfolio-link
test('After the a element containing your portfolio, there should be another hr element as a divider', () => {
  const businessCard = document.querySelector('.business-card');
  expect(businessCard).toBeTruthy();
  const hrs = businessCard.querySelectorAll('hr');
  expect(hrs.length).toBeGreaterThanOrEqual(2);
});

// Test 18: div.social-media exists
test('After the second hr element, there should be a div element with a class attribute with a value of social-media', () => {
  const socialMedia = document.querySelector('div.social-media');
  expect(socialMedia).toBeTruthy();
});

// Test 19: h2 "Connect with me" in social-media
test('Inside the .social-media element, there should be an h2 element with the text Connect with me', () => {
  const socialMedia = document.querySelector('.social-media');
  expect(socialMedia).toBeTruthy();
  const h2 = socialMedia.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent).toMatch(/Connect with me/);
});

// Test 20: Three a elements in social-media
test('Inside the .social-media element there should be three a elements', () => {
  const socialMedia = document.querySelector('.social-media');
  expect(socialMedia).toBeTruthy();
  const links = socialMedia.querySelectorAll('a');
  expect(links.length).toBe(3);
});

// Test 21: First a has text "Twitter"
test('The first a element should have the text Twitter', () => {
  const socialMedia = document.querySelector('.social-media');
  expect(socialMedia).toBeTruthy();
  const links = socialMedia.querySelectorAll('a');
  expect(links.length).toBeGreaterThanOrEqual(1);
  expect(links[0].textContent).toMatch(/Twitter/);
});

// Test 22: First a has valid href
test('The href of the first a element should point to a valid link', () => {
  const socialMedia = document.querySelector('.social-media');
  expect(socialMedia).toBeTruthy();
  const links = socialMedia.querySelectorAll('a');
  expect(links.length).toBeGreaterThanOrEqual(1);
  const href = links[0].getAttribute('href');
  expect(href).toBeTruthy();
  expect(href.trim().length).toBeGreaterThan(0);
});

// Test 23: Second a has text "LinkedIn"
test('The second a element should have the text LinkedIn', () => {
  const socialMedia = document.querySelector('.social-media');
  expect(socialMedia).toBeTruthy();
  const links = socialMedia.querySelectorAll('a');
  expect(links.length).toBeGreaterThanOrEqual(2);
  expect(links[1].textContent).toMatch(/LinkedIn/);
});

// Test 24: Second a has valid href
test('The href of the second a element should point to a valid link', () => {
  const socialMedia = document.querySelector('.social-media');
  expect(socialMedia).toBeTruthy();
  const links = socialMedia.querySelectorAll('a');
  expect(links.length).toBeGreaterThanOrEqual(2);
  const href = links[1].getAttribute('href');
  expect(href).toBeTruthy();
  expect(href.trim().length).toBeGreaterThan(0);
});

// Test 25: Third a has text "GitHub"
test('The third a element should have the text GitHub', () => {
  const socialMedia = document.querySelector('.social-media');
  expect(socialMedia).toBeTruthy();
  const links = socialMedia.querySelectorAll('a');
  expect(links.length).toBeGreaterThanOrEqual(3);
  expect(links[2].textContent).toMatch(/GitHub/);
});

// Test 26: Third a has valid href
test('The href of the third a element should point to a valid link', () => {
  const socialMedia = document.querySelector('.social-media');
  expect(socialMedia).toBeTruthy();
  const links = socialMedia.querySelectorAll('a');
  expect(links.length).toBeGreaterThanOrEqual(3);
  const href = links[2].getAttribute('href');
  expect(href).toBeTruthy();
  expect(href.trim().length).toBeGreaterThan(0);
});

// Test 27: body background-color is rosybrown
test('You should set the page background color in the body selector to rosybrown', () => {
  const body = document.querySelector('body');
  const styles = window.getComputedStyle(body);
  const bgColor = styles.backgroundColor;
  // rosybrown is rgb(188, 143, 143)
  expect(bgColor).toMatch(/rgb\(188,\s*143,\s*143\)|rosybrown/);
});

// Test 28: body font-family includes Arial with sans-serif fallback
test('You should set the page font to Arial in the body element with a fallback of sans-serif', () => {
  // Check the CSS rules directly to ensure both Arial and sans-serif are specified
  let foundArialWithFallback = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText === 'body') {
          const fontFamily = rule.style.fontFamily.toLowerCase();
          if (fontFamily.includes('arial') && fontFamily.includes('sans-serif')) {
            foundArialWithFallback = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundArialWithFallback) break;
  }
  expect(foundArialWithFallback).toBe(true);
});

// Test 29: .business-card width is 300px
test('Your .business-card selector should have a width property with a value of 300px', () => {
  const businessCard = document.querySelector('.business-card');
  expect(businessCard).toBeTruthy();
  const styles = window.getComputedStyle(businessCard);
  expect(styles.width).toBe('300px');
});

// Test 30: .business-card has background-color
test('Your .business-card selector should have a background-color property with a valid color value', () => {
  const businessCard = document.querySelector('.business-card');
  expect(businessCard).toBeTruthy();
  const styles = window.getComputedStyle(businessCard);
  const bgColor = styles.backgroundColor;
  expect(bgColor).toBeTruthy();
  // Should not be transparent or same as body
  expect(bgColor).not.toMatch(/rgba\(0,\s*0,\s*0,\s*0\)|transparent/);
});

// Test 31: .business-card padding is 20px
test('Your .business-card selector should have a padding property with a value of 20px', () => {
  const businessCard = document.querySelector('.business-card');
  expect(businessCard).toBeTruthy();
  const styles = window.getComputedStyle(businessCard);
  expect(styles.paddingTop).toBe('20px');
  expect(styles.paddingRight).toBe('20px');
  expect(styles.paddingBottom).toBe('20px');
  expect(styles.paddingLeft).toBe('20px');
});

// Test 32: .business-card margin-top is 100px
test('Your .business-card selector should have a top margin of 100px', () => {
  const businessCard = document.querySelector('.business-card');
  expect(businessCard).toBeTruthy();
  const styles = window.getComputedStyle(businessCard);
  expect(styles.marginTop).toBe('100px');
});

// Test 33: .business-card text-align is center
test('The text inside the .business-card element should be center-aligned', () => {
  const businessCard = document.querySelector('.business-card');
  expect(businessCard).toBeTruthy();
  const styles = window.getComputedStyle(businessCard);
  expect(styles.textAlign).toBe('center');
});

// Test 34: .business-card font-size is 16px
test('The font size of the text inside the .business-card element should be 16px', () => {
  const businessCard = document.querySelector('.business-card');
  expect(businessCard).toBeTruthy();

  // Check if .business-card selector has font-size: 16px in CSS
  let foundFontSize = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('business-card')) {
          if (rule.style.fontSize === '16px') {
            foundFontSize = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundFontSize) break;
  }
  expect(foundFontSize).toBe(true);
});

// Test 35: .business-card margin-left and margin-right are auto
test('The left and right margins of the .business-card element should be set to auto', () => {
  const businessCard = document.querySelector('.business-card');
  expect(businessCard).toBeTruthy();
  // Computed styles for auto margins will show as pixel values,
  // so we need to check the stylesheet or inline styles
  const inlineStyle = businessCard.style;
  const hasAutoMargins = inlineStyle.marginLeft === 'auto' || inlineStyle.marginRight === 'auto';

  // If not inline, check stylesheets
  if (!hasAutoMargins) {
    let foundAutoMargin = false;
    for (let sheet of document.styleSheets) {
      try {
        for (let rule of sheet.cssRules) {
          if (rule.selectorText && rule.selectorText.includes('business-card')) {
            if (rule.style.marginLeft === 'auto' || rule.style.marginRight === 'auto' ||
                rule.style.margin?.includes('auto')) {
              foundAutoMargin = true;
              break;
            }
          }
        }
      } catch (e) {
        // Cross-origin stylesheet, skip
      }
      if (foundAutoMargin) break;
    }
    expect(foundAutoMargin).toBe(true);
  } else {
    expect(hasAutoMargins).toBe(true);
  }
});

// Test 36: .profile-image max-width is 100%
test('Your .profile-image selector should have a max-width property with a value of 100%', () => {
  const profileImage = document.querySelector('.profile-image');
  expect(profileImage).toBeTruthy();
  // max-width: 100% may compute differently, check CSS rules
  let foundMaxWidth = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('profile-image')) {
          if (rule.style.maxWidth === '100%') {
            foundMaxWidth = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundMaxWidth) break;
  }
  expect(foundMaxWidth).toBe(true);
});

// Test 37: p elements have margin-top and margin-bottom of 5px
test('Your p elements should have a top and bottom margin of 5px', () => {
  const pElements = document.querySelectorAll('p');
  expect(pElements.length).toBeGreaterThan(0);

  // Check if p selector has margin styles in CSS
  let foundMargin = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText === 'p') {
          const marginTop = rule.style.marginTop;
          const marginBottom = rule.style.marginBottom;
          if (marginTop === '5px' && marginBottom === '5px') {
            foundMargin = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundMargin) break;
  }
  expect(foundMargin).toBe(true);
});

// Test 38: Links have no underline
test('The links of the page should have no underline', () => {
  const links = document.querySelectorAll('a');
  expect(links.length).toBeGreaterThan(0);

  // Check if a selector has text-decoration: none in CSS
  let foundNoUnderline = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText === 'a') {
          if (rule.style.textDecoration === 'none') {
            foundNoUnderline = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundNoUnderline) break;
  }
  expect(foundNoUnderline).toBe(true);
});
