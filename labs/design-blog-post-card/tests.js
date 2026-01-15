// Test 1: div with class blog-post-card
test('You should have a div with a class of blog-post-card', () => {
  const blogPostCard = document.querySelector('div.blog-post-card');
  expect(blogPostCard).toBeTruthy();
});

// Test 2: img with class post-img, alt and src
test('You should have an img element with a class of post-img. Make sure your image has an alt attribute with text and a src attribute with a value', () => {
  const img = document.querySelector('img.post-img');
  expect(img).toBeTruthy();
  const alt = img.getAttribute('alt');
  expect(alt).toBeTruthy();
  expect(alt.trim().length).toBeGreaterThan(0);
  const src = img.getAttribute('src');
  expect(src).toBeTruthy();
  expect(src.trim().length).toBeGreaterThan(0);
});

// Test 3: div with class post-content
test('You should have a div with class of post-content', () => {
  const postContent = document.querySelector('div.post-content');
  expect(postContent).toBeTruthy();
});

// Test 4: h2 with class post-title and text
test('You should have an h2 element with a class of post-title. Make sure it has some text content for the title of your blog post', () => {
  const postTitle = document.querySelector('h2.post-title');
  expect(postTitle).toBeTruthy();
  expect(postTitle.textContent.trim().length).toBeGreaterThan(0);
});

// Test 5: p with class post-excerpt and text
test('You should have a p with a class of post-excerpt. Make sure it has some text content to summarize your blog post', () => {
  const postExcerpt = document.querySelector('p.post-excerpt');
  expect(postExcerpt).toBeTruthy();
  expect(postExcerpt.textContent.trim().length).toBeGreaterThan(0);
});

// Test 6: a with class read-more
test('You should have an a element with a class of read-more', () => {
  const readMore = document.querySelector('a.read-more');
  expect(readMore).toBeTruthy();
});

// Test 7: read-more has text "Read More"
test('Your .read-more element should have the text Read More', () => {
  const readMore = document.querySelector('a.read-more');
  expect(readMore).toBeTruthy();
  expect(readMore.textContent).toMatch(/Read More/);
});

// Test 8: blog-post-card has border-radius
test('Your .blog-post-card element should have a border-radius property with a value (should not be 0 or a negative value)', () => {
  const blogPostCard = document.querySelector('.blog-post-card');
  expect(blogPostCard).toBeTruthy();

  let foundBorderRadius = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('blog-post-card')) {
          const borderRadius = rule.style.borderRadius;
          if (borderRadius && borderRadius !== '0' && borderRadius !== '0px' && !borderRadius.startsWith('-')) {
            foundBorderRadius = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundBorderRadius) break;
  }
  expect(foundBorderRadius).toBe(true);
});

// Test 9: blog-post-card has white background
test('Your .blog-post-card element should have a white background', () => {
  const blogPostCard = document.querySelector('.blog-post-card');
  expect(blogPostCard).toBeTruthy();
  const styles = window.getComputedStyle(blogPostCard);
  const bgColor = styles.backgroundColor;
  // white is rgb(255, 255, 255)
  expect(bgColor).toMatch(/rgb\(255,\s*255,\s*255\)|white/);
});

// Test 10: body has background color other than white
test('Your body element should have a background color other than white', () => {
  const body = document.querySelector('body');
  const styles = window.getComputedStyle(body);
  const bgColor = styles.backgroundColor;
  // Should NOT be white rgb(255, 255, 255) or transparent
  expect(bgColor).not.toMatch(/rgb\(255,\s*255,\s*255\)|rgba\(0,\s*0,\s*0,\s*0\)/);
});

// Test 11: blog-post-card has width property
test('You should target .blog-post-card and set its width property', () => {
  let foundWidth = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('blog-post-card')) {
          if (rule.style.width && rule.style.width.length > 0) {
            foundWidth = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundWidth) break;
  }
  expect(foundWidth).toBe(true);
});

// Test 12: blog-post-card has text-align property
test('You should target .blog-post-card and set its text-align property', () => {
  let foundTextAlign = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('blog-post-card')) {
          if (rule.style.textAlign && rule.style.textAlign.length > 0) {
            foundTextAlign = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundTextAlign) break;
  }
  expect(foundTextAlign).toBe(true);
});

// Test 13: post-content has padding property
test('You should target .post-content and set its padding property', () => {
  let foundPadding = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('post-content')) {
          if (rule.style.padding && rule.style.padding.length > 0) {
            foundPadding = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundPadding) break;
  }
  expect(foundPadding).toBe(true);
});

// Test 14: read-more has hover effect
test('Your .read-more element should have a hover effect', () => {
  let foundHover = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('read-more') && rule.selectorText.includes(':hover')) {
          if (rule.style.backgroundColor && rule.style.backgroundColor.length > 0) {
            foundHover = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundHover) break;
  }
  expect(foundHover).toBe(true);
});

// Test 15: read-more has color property
test('You should target .read-more and set its color property', () => {
  let foundColor = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('read-more') && !rule.selectorText.includes(':')) {
          if (rule.style.color && rule.style.color.length > 0) {
            foundColor = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundColor) break;
  }
  expect(foundColor).toBe(true);
});

// Test 16: read-more has background-color property
test('You should target .read-more and set its background-color property', () => {
  let foundBgColor = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('read-more') && !rule.selectorText.includes(':')) {
          if (rule.style.backgroundColor && rule.style.backgroundColor.length > 0) {
            foundBgColor = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundBgColor) break;
  }
  expect(foundBgColor).toBe(true);
});

// Test 17: read-more has margin property
test('You should target .read-more and set its margin property', () => {
  let foundMargin = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('read-more') && !rule.selectorText.includes(':')) {
          if (rule.style.margin && rule.style.margin.length > 0) {
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

// Test 18: read-more has display property
test('You should target .read-more and set its display property', () => {
  let foundDisplay = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('read-more') && !rule.selectorText.includes(':')) {
          if (rule.style.display && rule.style.display.length > 0) {
            foundDisplay = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundDisplay) break;
  }
  expect(foundDisplay).toBe(true);
});

// Test 19: read-more has border-radius property
test('You should target .read-more and set its border-radius property', () => {
  let foundBorderRadius = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('read-more') && !rule.selectorText.includes(':')) {
          if (rule.style.borderRadius && rule.style.borderRadius.length > 0) {
            foundBorderRadius = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundBorderRadius) break;
  }
  expect(foundBorderRadius).toBe(true);
});

// Test 20: read-more has padding property
test('You should target .read-more and set its padding property', () => {
  let foundPadding = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('read-more') && !rule.selectorText.includes(':')) {
          if (rule.style.padding && rule.style.padding.length > 0) {
            foundPadding = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundPadding) break;
  }
  expect(foundPadding).toBe(true);
});

// Test 21: post-img fills card width
test('Your .post-img element should fill the card\'s width', () => {
  let foundWidth = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('post-img')) {
          if (rule.style.width === '100%') {
            foundWidth = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundWidth) break;
  }
  expect(foundWidth).toBe(true);
});

// Test 22: post-img has border-bottom
test('Your .post-img element should have a border-bottom value', () => {
  let foundBorderBottom = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('post-img')) {
          if ((rule.style.borderBottom && rule.style.borderBottom.length > 0) ||
              (rule.style.borderBottomWidth && rule.style.borderBottomWidth.length > 0)) {
            foundBorderBottom = true;
            break;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundBorderBottom) break;
  }
  expect(foundBorderBottom).toBe(true);
});

// Test 23: post-title and post-excerpt have margins and non-default text colors
test('Your .post-title and .post-excerpt elements should have margins and non-default text colors', () => {
  let foundTitleStyles = false;
  let foundExcerptStyles = false;

  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('post-title')) {
          if (rule.style.margin && rule.style.margin.length > 0 &&
              rule.style.color && rule.style.color.length > 0) {
            foundTitleStyles = true;
          }
        }
        if (rule.selectorText && rule.selectorText.includes('post-excerpt')) {
          if (rule.style.margin && rule.style.margin.length > 0 &&
              rule.style.color && rule.style.color.length > 0) {
            foundExcerptStyles = true;
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
    if (foundTitleStyles && foundExcerptStyles) break;
  }
  expect(foundTitleStyles).toBe(true);
  expect(foundExcerptStyles).toBe(true);
});
