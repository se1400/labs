// Helper: Convert hex color to rgb format for comparison
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`;
  }
  return hex.toLowerCase();
};

// Helper: Check if a CSS rule exists with specific selector and property/value
const findCSSRule = (selector, property, value) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        // Handle comma-separated selectors (e.g., "nav a:link, nav a:visited")
        const ruleSelectors = rule.selectorText ? rule.selectorText.split(',').map(s => s.trim()) : [];
        const targetSelectors = selector.split(',').map(s => s.trim());
        const selectorMatch = targetSelectors.every(s => ruleSelectors.includes(s)) && ruleSelectors.every(s => targetSelectors.includes(s));
        if (rule.selectorText && selectorMatch) {
          const propValue = rule.style.getPropertyValue(property);
          if (value === undefined) {
            return propValue !== '';
          }
          const normalizedPropValue = propValue.replace(/\s/g, '').toLowerCase();
          const normalizedValue = String(value).replace(/\s/g, '').toLowerCase();
          if (normalizedPropValue === normalizedValue) {
            return true;
          }
          if (normalizedValue.startsWith('#')) {
            const rgbValue = hexToRgb(normalizedValue);
            if (normalizedPropValue === rgbValue) {
              return true;
            }
          }
          // Handle 0 vs 0px
          if ((normalizedValue === '0' || normalizedValue === '0px') &&
              (normalizedPropValue === '0' || normalizedPropValue === '0px')) {
            return true;
          }
        }
      }
    } catch (e) {}
  }
  return false;
};

// Helper: Check if a CSS rule's cssText or property value contains a substring
// Useful for values browsers may normalize (named colors, hsl, rgba, var(), etc.)
const findCSSRuleContains = (selector, property, substring) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        const ruleSelectors = rule.selectorText ? rule.selectorText.split(',').map(s => s.trim()) : [];
        const targetSelectors = selector.split(',').map(s => s.trim());
        const selectorMatch = targetSelectors.every(s => ruleSelectors.includes(s)) && ruleSelectors.every(s => targetSelectors.includes(s));
        if (rule.selectorText && selectorMatch) {
          const propValue = rule.style.getPropertyValue(property).toLowerCase();
          const cssText = rule.cssText.toLowerCase();
          const target = substring.toLowerCase();
          if (propValue.includes(target) || cssText.includes(target)) {
            return true;
          }
        }
      }
    } catch (e) {}
  }
  return false;
};

// Helper: Get a CSS custom property value from :root
const getCSSVariable = (varName) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText === ':root') {
          const value = rule.style.getPropertyValue(varName).trim();
          if (value) return value;
        }
      }
    } catch (e) {}
  }
  return null;
};

// ============================================
// Part 1: CSS Custom Properties
// ============================================

test('Step 1: The :root rule should define --ut-navy as #003058', () => {
  const value = getCSSVariable('--ut-navy');
  if (!value) {
    throw new Error(
      'Missing CSS custom property --ut-navy.\n\n' +
      'Add a :root rule at the top of your CSS file and define:\n' +
      ':root { --ut-navy: #003058; }\n\n' +
      'CSS custom properties (variables) always start with two dashes (--).'
    );
  }

  const normalized = value.replace(/\s/g, '').toLowerCase();
  if (normalized !== '#003058' && normalized !== hexToRgb('#003058')) {
    throw new Error(
      `Found --ut-navy with value "${value}", but it should be #003058.\n\n` +
      'Make sure the value is exactly: #003058'
    );
  }

  expect(true).toBe(true);
});

test('Step 1: The :root rule should define --ut-red as #BA1C21', () => {
  const value = getCSSVariable('--ut-red');
  if (!value) {
    throw new Error(
      'Missing CSS custom property --ut-red.\n\n' +
      'Add --ut-red: #BA1C21; inside your :root rule.'
    );
  }

  const normalized = value.replace(/\s/g, '').toLowerCase();
  if (normalized !== '#ba1c21' && normalized !== hexToRgb('#BA1C21')) {
    throw new Error(
      `Found --ut-red with value "${value}", but it should be #BA1C21.\n\n` +
      'Make sure the value is exactly: #BA1C21'
    );
  }

  expect(true).toBe(true);
});

test('Step 1: The :root rule should define --ut-white as #ffffff', () => {
  const value = getCSSVariable('--ut-white');
  if (!value) {
    throw new Error(
      'Missing CSS custom property --ut-white.\n\n' +
      'Add --ut-white: #ffffff; inside your :root rule.\n\n' +
      'You should have 5 variables total: --ut-navy, --ut-red, --ut-white, --ut-light-gray, --ut-panel-gray'
    );
  }

  const normalized = value.replace(/\s/g, '').toLowerCase();
  if (normalized !== '#ffffff' && normalized !== hexToRgb('#ffffff')) {
    throw new Error(
      `Found --ut-white with value "${value}", but it should be #ffffff.`
    );
  }

  expect(true).toBe(true);
});

test('Step 1: The :root rule should define --ut-panel-gray as #f7f7f7', () => {
  const value = getCSSVariable('--ut-panel-gray');
  if (!value) {
    throw new Error(
      'Missing CSS custom property --ut-panel-gray.\n\n' +
      'Add --ut-panel-gray: #f7f7f7; inside your :root rule.\n\n' +
      'You should have 5 variables total: --ut-navy, --ut-red, --ut-white, --ut-light-gray, --ut-panel-gray'
    );
  }

  const normalized = value.replace(/\s/g, '').toLowerCase();
  if (normalized !== '#f7f7f7' && normalized !== hexToRgb('#f7f7f7')) {
    throw new Error(
      `Found --ut-panel-gray with value "${value}", but it should be #f7f7f7.`
    );
  }

  expect(true).toBe(true);
});

test('Step 2: The body color should use var(--ut-navy) instead of a hardcoded value', () => {
  if (!findCSSRuleContains('body', 'color', 'var(--ut-navy)')) {
    throw new Error(
      'The body rule still has a hardcoded color value.\n\n' +
      'Replace the color value #003058 with var(--ut-navy).\n' +
      'This references the CSS variable you defined in :root.\n\n' +
      'Before: color: #003058;\n' +
      'After:  color: var(--ut-navy);'
    );
  }

  expect(true).toBe(true);
});

test('Step 2: The nav background-color should use var(--ut-navy) instead of a hardcoded value', () => {
  if (!findCSSRuleContains('nav', 'background-color', 'var(--ut-navy)')) {
    throw new Error(
      'The nav rule still has a hardcoded background-color value.\n\n' +
      'Replace the background-color value #003058 with var(--ut-navy).\n\n' +
      'Before: background-color: #003058;\n' +
      'After:  background-color: var(--ut-navy);'
    );
  }

  expect(true).toBe(true);
});

// ============================================
// Part 2: Color Formats
// ============================================

test('Step 3: The header background-color should use the named color whitesmoke', () => {
  if (!findCSSRuleContains('header', 'background-color', 'whitesmoke')) {
    // Check if they might have the rgb equivalent (browsers may normalize)
    const hasWhitesmoke = findCSSRuleContains('header', 'background-color', 'rgb(245,245,245)') ||
                          findCSSRuleContains('header', 'background-color', 'rgb(245, 245, 245)');
    if (hasWhitesmoke) {
      // They used whitesmoke but browser normalized it — that's fine
      expect(true).toBe(true);
      return;
    }

    throw new Error(
      'The header background-color should use the named color "whitesmoke".\n\n' +
      'Named colors are plain English words that CSS recognizes as colors.\n' +
      'Replace the current header background-color value with: whitesmoke\n\n' +
      'Before: background-color: #f2f2f2;  (or var(--ut-light-gray))\n' +
      'After:  background-color: whitesmoke;'
    );
  }

  expect(true).toBe(true);
});

test('Step 4: The footer color should use rgb(68, 68, 68)', () => {
  const hasRgb = findCSSRuleContains('footer', 'color', 'rgb(68,68,68)') ||
                 findCSSRuleContains('footer', 'color', 'rgb(68, 68, 68)');
  if (!hasRgb) {
    throw new Error(
      'The footer color should use the rgb() format.\n\n' +
      'RGB lets you specify colors using Red, Green, and Blue values (0-255).\n' +
      'Replace the footer color value with: rgb(68, 68, 68)\n\n' +
      'Before: color: #444444;\n' +
      'After:  color: rgb(68, 68, 68);'
    );
  }

  expect(true).toBe(true);
});

test('Step 5: The a:hover color should use hsl(0, 65%, 51%)', () => {
  if (!findCSSRuleContains('a:hover', 'color', 'hsl')) {
    // Check if browser normalized to rgb equivalent
    // hsl(0, 65%, 51%) = approximately rgb(214, 46, 46) but exact values vary
    throw new Error(
      'The a:hover color should use the hsl() format.\n\n' +
      'HSL stands for Hue (0-360), Saturation (0%-100%), and Lightness (0%-100%).\n' +
      'Replace the a:hover color value with: hsl(0, 65%, 51%)\n\n' +
      'Before: color: #D32F2F;\n' +
      'After:  color: hsl(0, 65%, 51%);'
    );
  }

  expect(true).toBe(true);
});

// ============================================
// Part 3: Transparency & Borders
// ============================================

test('Step 6: The #visit rule should have a background-color using rgba()', () => {
  if (!findCSSRuleContains('#visit', 'background-color', 'rgba')) {
    throw new Error(
      'Missing rgba() background-color on the #visit rule.\n\n' +
      'RGBA is like RGB but with a fourth value for transparency (0 = fully transparent, 1 = fully opaque).\n' +
      'Add a #visit rule (or modify the existing one) with:\n' +
      'background-color: rgba(0, 48, 88, 0.1);\n\n' +
      'This creates a very light transparent navy tint over the aside.'
    );
  }

  expect(true).toBe(true);
});

test('Step 7: The .panel rule should have a border using var(--ut-red)', () => {
  let hasBorder = false;
  let usesVariable = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText === '.panel') {
          const cssText = rule.cssText.toLowerCase();
          // Check for border in cssText (shorthand may decompose)
          if (cssText.includes('border')) {
            hasBorder = true;
            // Check that they used the CSS variable
            if (cssText.includes('var(--ut-red)') || cssText.includes('#ba1c21') || cssText.includes('rgb(186,28,33)') || cssText.includes('rgb(186, 28, 33)')) {
              usesVariable = true;
            }
          }
        }
      }
    } catch (e) {}
    if (hasBorder) break;
  }

  if (!hasBorder) {
    throw new Error(
      'Missing border on the .panel rule.\n\n' +
      'Add a border property to your .panel rule:\n' +
      'border: 2px solid var(--ut-red);\n\n' +
      'This uses the CSS variable you defined earlier to keep colors consistent.'
    );
  }

  if (!usesVariable) {
    throw new Error(
      'The .panel border should use var(--ut-red) for the color.\n\n' +
      'Use your CSS variable instead of a hardcoded color:\n' +
      'border: 2px solid var(--ut-red);'
    );
  }

  expect(hasBorder).toBe(true);
  expect(usesVariable).toBe(true);
});

// ============================================
// Part 4: SVG Logo
// ============================================

test('Step 8: The header should contain an img element for the logo', () => {
  const header = document.querySelector('header');
  if (!header) {
    throw new Error('Could not find a <header> element on the page.');
  }

  const img = header.querySelector('img');
  if (!img) {
    throw new Error(
      'No <img> element found inside the header.\n\n' +
      'Add an <img> element inside the <header>, before the <h1>, to display the Utah Tech logo.\n' +
      'SVG images are added using the same <img> tag as any other image format.'
    );
  }

  expect(img).toBeTruthy();
});

test('Step 8: The header logo should use the SVG logo file', () => {
  const header = document.querySelector('header');
  if (!header) {
    throw new Error('Could not find a <header> element on the page.');
  }

  const img = header.querySelector('img');
  if (!img) {
    throw new Error('First add an <img> element to the header (see previous test).');
  }

  const src = (img.getAttribute('src') || '').toLowerCase();
  if (!src.includes('logo.svg')) {
    throw new Error(
      `The header image src is "${img.getAttribute('src')}" but should point to the SVG logo file.\n\n` +
      'Set the src to: https://se1400.github.io/labs/assets/logo.svg\n\n' +
      'SVG (Scalable Vector Graphics) is ideal for logos because it scales perfectly at any size.'
    );
  }

  expect(src).toContain('logo.svg');
});

test('Step 8: The header logo should have an alt attribute', () => {
  const header = document.querySelector('header');
  if (!header) {
    throw new Error('Could not find a <header> element on the page.');
  }

  const img = header.querySelector('img');
  if (!img) {
    throw new Error('First add an <img> element to the header (see previous test).');
  }

  const alt = img.getAttribute('alt');
  if (!alt || alt.trim().length === 0) {
    throw new Error(
      'The logo image is missing an alt attribute.\n\n' +
      'Every image needs alt text for accessibility. Screen readers use this to describe the image.\n' +
      'Add: alt="Utah Tech University Logo"'
    );
  }

  expect(alt.trim().length).toBeGreaterThan(0);
});

// ============================================
// Part 5: Campus Photo with Figure & Picture
// ============================================

test('Step 9: The #welcome section should contain a campus photo', () => {
  const welcome = document.querySelector('#welcome');
  if (!welcome) {
    throw new Error('Could not find the section with id="welcome".');
  }

  const img = welcome.querySelector('img[src*="campus.jpg"], img[src*="campus"]');
  if (!img) {
    throw new Error(
      'No campus photo found in the #welcome section.\n\n' +
      'Add an <img> element after the last paragraph in the #welcome section.\n' +
      'Set src to: https://se1400.github.io/labs/assets/campus.jpg\n' +
      'Also add alt, width, and height attributes.'
    );
  }

  expect(img).toBeTruthy();
});

test('Step 10: The campus photo should be wrapped in a figure with a figcaption', () => {
  const welcome = document.querySelector('#welcome');
  if (!welcome) {
    throw new Error('Could not find the section with id="welcome".');
  }

  const figure = welcome.querySelector('figure');
  if (!figure) {
    throw new Error(
      'No <figure> element found in the #welcome section.\n\n' +
      'Wrap the campus <img> in a <figure> element.\n' +
      '<figure> is a semantic container for images, diagrams, and other visual content.'
    );
  }

  const figcaption = figure.querySelector('figcaption');
  if (!figcaption) {
    throw new Error(
      'The <figure> is missing a <figcaption>.\n\n' +
      'Add a <figcaption> element after the image inside the <figure>.\n' +
      '<figcaption> provides a caption or description for the figure\'s content.'
    );
  }

  if (!figcaption.textContent || figcaption.textContent.trim().length === 0) {
    throw new Error(
      'The <figcaption> needs text describing the image.\n\n' +
      'Add a caption like: "Utah Tech University campus in St. George, Utah"'
    );
  }

  expect(figure).toBeTruthy();
  expect(figcaption.textContent.trim().length).toBeGreaterThan(0);
});

test('Step 11: The figure should contain a picture element', () => {
  const welcome = document.querySelector('#welcome');
  if (!welcome) {
    throw new Error('Could not find the section with id="welcome".');
  }

  const figure = welcome.querySelector('figure');
  if (!figure) {
    throw new Error('First add a <figure> element (see Step 10 test).');
  }

  const picture = figure.querySelector('picture');
  if (!picture) {
    throw new Error(
      'No <picture> element found inside the <figure>.\n\n' +
      'Wrap the <img> inside a <picture> element.\n' +
      '<picture> lets browsers choose the best image format. Modern browsers will use the WebP source, while older ones fall back to the JPEG <img>.'
    );
  }

  expect(picture).toBeTruthy();
});

test('Step 11: The picture element should have a WebP source', () => {
  const welcome = document.querySelector('#welcome');
  if (!welcome) {
    throw new Error('Could not find the section with id="welcome".');
  }

  const picture = welcome.querySelector('picture');
  if (!picture) {
    throw new Error('First add a <picture> element (see previous test).');
  }

  const source = picture.querySelector('source[type="image/webp"]');
  if (!source) {
    throw new Error(
      'The <picture> is missing a <source> with type="image/webp".\n\n' +
      'Add a <source> element before the <img> inside <picture>:\n' +
      '<source srcset="https://se1400.github.io/labs/assets/campus.webp" type="image/webp">\n\n' +
      'WebP is a modern image format that provides better compression than JPEG.'
    );
  }

  expect(source).toBeTruthy();
});

test('Step 11: The WebP source should have a srcset pointing to the WebP file', () => {
  const welcome = document.querySelector('#welcome');
  if (!welcome) {
    throw new Error('Could not find the section with id="welcome".');
  }

  const source = welcome.querySelector('picture source[type="image/webp"]');
  if (!source) {
    throw new Error('First add a WebP <source> element (see previous test).');
  }

  const srcset = (source.getAttribute('srcset') || '').toLowerCase();
  if (!srcset.includes('campus.webp')) {
    throw new Error(
      `The WebP source srcset is "${source.getAttribute('srcset')}" but should point to the WebP file.\n\n` +
      'Set srcset to: https://se1400.github.io/labs/assets/campus.webp'
    );
  }

  expect(srcset).toContain('campus.webp');
});

// ============================================
// Part 6: Footer Seal
// ============================================

test('Step 12: The footer should contain an img element for the university seal', () => {
  const footer = document.querySelector('footer');
  if (!footer) {
    throw new Error('Could not find a <footer> element on the page.');
  }

  const img = footer.querySelector('img');
  if (!img) {
    throw new Error(
      'No <img> element found in the footer.\n\n' +
      'Add an <img> element in the footer, before the <address>, to display the university seal.\n' +
      'PNG format is ideal here because the seal has a transparent background.'
    );
  }

  expect(img).toBeTruthy();
});

test('Step 12: The footer image should use the PNG seal file', () => {
  const footer = document.querySelector('footer');
  if (!footer) {
    throw new Error('Could not find a <footer> element on the page.');
  }

  const img = footer.querySelector('img');
  if (!img) {
    throw new Error('First add an <img> element to the footer (see previous test).');
  }

  const src = (img.getAttribute('src') || '').toLowerCase();
  if (!src.includes('seal.png')) {
    throw new Error(
      `The footer image src is "${img.getAttribute('src')}" but should point to the PNG seal file.\n\n` +
      'Set the src to: https://se1400.github.io/labs/assets/seal.png\n\n' +
      'PNG (Portable Network Graphics) supports transparency, making it perfect for logos and seals.'
    );
  }

  expect(src).toContain('seal.png');
});

// ============================================
// Part 7: CSS Filter
// ============================================

test('Step 13: CSS should have a "footer img" rule with a grayscale filter', () => {
  let found = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.trim() === 'footer img') {
          const filter = rule.style.getPropertyValue('filter').toLowerCase();
          const cssText = rule.cssText.toLowerCase();
          if (filter.includes('grayscale') || cssText.includes('grayscale')) {
            found = true;
            break;
          }
        }
      }
    } catch (e) {}
    if (found) break;
  }

  if (!found) {
    throw new Error(
      'Missing CSS rule for footer img with a grayscale filter.\n\n' +
      'Add a rule: footer img { filter: grayscale(100%); }\n\n' +
      'CSS filters let you apply visual effects to elements.\n' +
      'grayscale(100%) makes the image completely black and white.'
    );
  }

  expect(found).toBe(true);
});

test('Step 13: CSS should have a "footer img:hover" rule that removes the grayscale filter', () => {
  let found = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.trim() === 'footer img:hover') {
          const filter = rule.style.getPropertyValue('filter').toLowerCase();
          const cssText = rule.cssText.toLowerCase();
          if (filter.includes('grayscale(0') || cssText.includes('grayscale(0')) {
            found = true;
            break;
          }
        }
      }
    } catch (e) {}
    if (found) break;
  }

  if (!found) {
    throw new Error(
      'Missing CSS rule for footer img:hover to remove the grayscale filter.\n\n' +
      'Add a rule: footer img:hover { filter: grayscale(0%); }\n\n' +
      'This makes the seal show its full color when hovered, creating a nice reveal effect.'
    );
  }

  expect(found).toBe(true);
});

// ============================================
// Part 8: Video
// ============================================

test('Step 14: The #visit aside should contain a video element with controls', () => {
  const visit = document.querySelector('#visit');
  if (!visit) {
    throw new Error('Could not find the aside with id="visit".');
  }

  const video = visit.querySelector('video');
  if (!video) {
    throw new Error(
      'No <video> element found in the #visit aside.\n\n' +
      'Add a <video> element after the existing paragraph in the #visit aside.\n' +
      'Include the controls attribute so users can play, pause, and adjust the video.'
    );
  }

  if (!video.hasAttribute('controls')) {
    throw new Error(
      'The <video> element is missing the controls attribute.\n\n' +
      'Add controls to the <video> tag: <video controls width="400">\n' +
      'Without controls, users have no way to play or pause the video.'
    );
  }

  expect(video.hasAttribute('controls')).toBe(true);
});

test('Step 14: The video should have a source with type="video/mp4"', () => {
  const video = document.querySelector('#visit video');
  if (!video) {
    throw new Error('First add a <video> element to the #visit aside (see previous test).');
  }

  const source = video.querySelector('source');
  if (!source) {
    throw new Error(
      'The <video> is missing a <source> element.\n\n' +
      'Add a <source> inside the <video> with:\n' +
      'src="https://se1400.github.io/labs/assets/video.mp4" type="video/mp4"'
    );
  }

  const type = (source.getAttribute('type') || '').toLowerCase();
  if (type !== 'video/mp4') {
    throw new Error(
      `The video source has type="${source.getAttribute('type')}" but should be "video/mp4".\n\n` +
      'The type attribute tells the browser what format the video is in.'
    );
  }

  expect(type).toBe('video/mp4');
});

test('Step 14: The video should have a track element with kind="captions"', () => {
  const video = document.querySelector('#visit video');
  if (!video) {
    throw new Error('First add a <video> element to the #visit aside.');
  }

  const track = video.querySelector('track');
  if (!track) {
    throw new Error(
      'The <video> is missing a <track> element.\n\n' +
      'Add a <track> element inside the <video> for captions:\n' +
      '<track src="https://se1400.github.io/labs/assets/video.vtt" kind="captions" srclang="en" label="English">\n\n' +
      'The <track> element provides text tracks for video (captions, subtitles, etc.).'
    );
  }

  const kind = (track.getAttribute('kind') || '').toLowerCase();
  if (kind !== 'captions') {
    throw new Error(
      `The track has kind="${track.getAttribute('kind')}" but should be "captions".\n\n` +
      'Set kind="captions" to indicate this track provides closed captions.'
    );
  }

  expect(kind).toBe('captions');
});

test('Step 14: The track element should have srclang and label attributes', () => {
  const video = document.querySelector('#visit video');
  if (!video) {
    throw new Error('First add a <video> element to the #visit aside.');
  }

  const track = video.querySelector('track');
  if (!track) {
    throw new Error('First add a <track> element to the video (see previous test).');
  }

  const srclang = track.getAttribute('srclang');
  if (!srclang || srclang.trim().length === 0) {
    throw new Error(
      'The <track> is missing the srclang attribute.\n\n' +
      'Add srclang="en" to specify the language of the captions (en = English).'
    );
  }

  const label = track.getAttribute('label');
  if (!label || label.trim().length === 0) {
    throw new Error(
      'The <track> is missing the label attribute.\n\n' +
      'Add label="English" so users can see the name of this caption track in the video player.'
    );
  }

  expect(srclang.trim().length).toBeGreaterThan(0);
  expect(label.trim().length).toBeGreaterThan(0);
});

// ============================================
// Part 9: Background Image
// ============================================

test('Step 15: The #visit rule should have a background-image using url()', () => {
  if (!findCSSRuleContains('#visit', 'background-image', 'url(')) {
    throw new Error(
      'Missing background-image on the #visit rule.\n\n' +
      'Add background-image to your #visit CSS rule:\n' +
      'background-image: url("https://se1400.github.io/labs/assets/campus.jpg");\n\n' +
      'The url() function tells CSS where to find the image file.'
    );
  }

  expect(true).toBe(true);
});

test('Step 15: The #visit rule should have background-size set to cover', () => {
  if (!findCSSRule('#visit', 'background-size', 'cover')) {
    throw new Error(
      'Missing background-size: cover on the #visit rule.\n\n' +
      'Add background-size: cover to your #visit CSS rule.\n' +
      'This makes the background image scale to fill the entire element while maintaining its aspect ratio.'
    );
  }

  expect(true).toBe(true);
});
