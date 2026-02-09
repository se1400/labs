// Helper: Convert hex color to rgb format for comparison
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`;
  }
  return hex.toLowerCase();
};

// Helper: Check if a CSS rule exists with specific selector and property/value
// Supports comma-separated selectors and handles hex-to-rgb normalization
const findCSSRule = (selector, property, value) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        const ruleSelectors = rule.selectorText ? rule.selectorText.split(',').map(s => s.trim()) : [];
        const targetSelectors = selector.split(',').map(s => s.trim());
        const selectorMatch = targetSelectors.length === ruleSelectors.length &&
          targetSelectors.every(s => ruleSelectors.includes(s)) &&
          ruleSelectors.every(s => targetSelectors.includes(s));
        if (rule.selectorText && selectorMatch) {
          const propValue = rule.style.getPropertyValue(property);
          if (value === undefined) {
            return propValue !== '';
          }
          const normalizedPropValue = propValue.replace(/\s/g, '').toLowerCase();
          const normalizedValue = String(value).replace(/\s/g, '').toLowerCase();
          if (normalizedPropValue === normalizedValue) return true;
          // Handle hex -> rgb normalization
          if (normalizedValue.startsWith('#')) {
            if (normalizedPropValue === hexToRgb(normalizedValue)) return true;
          }
          // Handle 0 vs 0px
          if ((normalizedValue === '0' || normalizedValue === '0px') &&
              (normalizedPropValue === '0' || normalizedPropValue === '0px')) return true;
        }
      }
    } catch (e) {}
  }
  return false;
};

// Helper: Check if a CSS rule's property value or cssText contains a substring
// Used for values browsers may normalize (named colors, hsl, rgba, var(), url(), etc.)
const findCSSRuleContains = (selector, property, substring) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        const ruleSelectors = rule.selectorText ? rule.selectorText.split(',').map(s => s.trim()) : [];
        const targetSelectors = selector.split(',').map(s => s.trim());
        const selectorMatch = targetSelectors.length === ruleSelectors.length &&
          targetSelectors.every(s => ruleSelectors.includes(s)) &&
          ruleSelectors.every(s => targetSelectors.includes(s));
        if (rule.selectorText && selectorMatch) {
          const propValue = rule.style.getPropertyValue(property).replace(/\s/g, '').toLowerCase();
          const cssText = rule.cssText.replace(/\s/g, '').toLowerCase();
          const target = substring.replace(/\s/g, '').toLowerCase();
          if (propValue.includes(target) || cssText.includes(target)) return true;
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

// Helper: Check if a CSS property does NOT exist (or has empty value) on a selector
const propertyNotSet = (selector, property) => {
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.trim() === selector) {
          const value = rule.style.getPropertyValue(property);
          if (value && value.trim() !== '') {
            return false; // Property exists with a value
          }
        }
      }
    } catch (e) {}
  }
  return true; // Property not found or empty
};

// ============================================
// Part 1: CSS Custom Properties
// ============================================

test('The :root rule should define --ut-navy as #003058', () => {
  const value = getCSSVariable('--ut-navy');
  if (!value) {
    throw new Error(
      'Missing CSS custom property --ut-navy.\n\n' +
      'Add a :root rule at the very top of your CSS file with custom properties inside it.\n' +
      'Custom properties always start with two dashes: --ut-navy: #003058;'
    );
  }
  const normalized = value.replace(/\s/g, '').toLowerCase();
  if (normalized !== '#003058' && normalized !== hexToRgb('#003058')) {
    throw new Error(
      `Found --ut-navy with value "${value}", but expected #003058.`
    );
  }
  expect(true).toBe(true);
});

test('The :root rule should define --ut-red as #BA1C21', () => {
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
      `Found --ut-red with value "${value}", but expected #BA1C21.`
    );
  }
  expect(true).toBe(true);
});

test('The body color should use var(--ut-navy)', () => {
  if (!findCSSRuleContains('body', 'color', 'var(--ut-navy)')) {
    throw new Error(
      'The body rule still has a hardcoded color value.\n\n' +
      'Find the color property in your body rule and replace #003058 with var(--ut-navy).\n' +
      'The var() function references the custom property you defined in :root.'
    );
  }
  expect(true).toBe(true);
});

test('The nav background-color should use var(--ut-navy)', () => {
  if (!findCSSRuleContains('nav', 'background-color', 'var(--ut-navy)')) {
    throw new Error(
      'The nav rule still has a hardcoded background-color value.\n\n' +
      'Replace #003058 with var(--ut-navy) in the nav background-color.'
    );
  }
  expect(true).toBe(true);
});

test('The nav rule should not have margin-top', () => {
  if (!propertyNotSet('nav', 'margin-top')) {
    throw new Error(
      'The nav rule still has a margin-top property.\n\n' +
      'Remove the margin-top property from the nav rule as instructed in Step 3.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 2: Page Layout & Border
// ============================================

test('The .panel rule should have a border-top using var(--ut-red)', () => {
  // Border shorthand may decompose into longhand properties in the CSSOM.
  // Check both cssText (preserves original) and individual longhand properties.
  let found = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText === '.panel') {
          const cssText = rule.cssText.replace(/\s/g, '').toLowerCase();
          // Check cssText for border-top (catches shorthand and longhand)
          if (cssText.includes('border-top') || cssText.includes('border:')) {
            // Verify they used the CSS variable or its resolved color
            if (cssText.includes('var(--ut-red)') ||
                cssText.includes('#ba1c21') ||
                cssText.includes('rgb(186,28,33)') ||
                cssText.includes('rgb(186, 28, 33)')) {
              found = true;
            }
          }
        }
      }
    } catch (e) {}
    if (found) break;
  }

  if (!found) {
    throw new Error(
      'Missing border on the .panel rule.\n\n' +
      'Add border-top: 3px solid var(--ut-red); to your .panel rule.\n' +
      'This creates a red accent line at the top of each panel using your CSS variable.'
    );
  }
  expect(found).toBe(true);
});

test('The .panel rule should not have margin-top', () => {
  if (!propertyNotSet('.panel', 'margin-top')) {
    throw new Error(
      'The .panel rule still has a margin-top property.\n\n' +
      'Remove the margin-top property from the .panel rule as instructed in Step 3.'
    );
  }
  expect(true).toBe(true);
});

test('The .panel rule should not have min-height', () => {
  if (!propertyNotSet('.panel', 'min-height')) {
    throw new Error(
      'The .panel rule still has a min-height property.\n\n' +
      'Remove the min-height property from the .panel rule as instructed in Step 3.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 3: Color Formats
// ============================================

test('The header background-color should use the named color whitesmoke', () => {
  // Browsers may normalize 'whitesmoke' to rgb(245, 245, 245) in getPropertyValue
  // but typically preserve it in cssText. Check both.
  const hasWhitesmoke = findCSSRuleContains('header', 'background-color', 'whitesmoke');
  const hasRgbEquivalent = findCSSRuleContains('header', 'background-color', 'rgb(245,245,245)') ||
                           findCSSRuleContains('header', 'background-color', 'rgb(245, 245, 245)');

  if (!hasWhitesmoke && !hasRgbEquivalent) {
    throw new Error(
      'The header background-color should be the named color "whitesmoke".\n\n' +
      'Named colors are plain English words CSS recognizes. Replace the current\n' +
      'header background-color value with just: whitesmoke\n' +
      'No quotes, no hash symbol — just the word.'
    );
  }
  expect(true).toBe(true);
});

test('The a:hover color should use hsl()', () => {
  // Check for hsl in cssText (most modern browsers preserve it)
  const hasHsl = findCSSRuleContains('a:hover', 'color', 'hsl');

  if (hasHsl) {
    expect(true).toBe(true);
    return;
  }

  // Fallback: Some browsers normalize hsl() to rgb() in both getPropertyValue and cssText.
  // hsl(0, 65%, 51%) converts to approximately rgb(211, 49, 49).
  // The original value was #D32F2F which is rgb(211, 47, 47) — a different value.
  // Check that the color has changed from the original hex.
  let colorChanged = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.trim() === 'a:hover') {
          const color = rule.style.getPropertyValue('color').replace(/\s/g, '').toLowerCase();
          // Original was #D32F2F which normalizes to rgb(211,47,47)
          if (color && color !== '#d32f2f' && color !== 'rgb(211,47,47)') {
            colorChanged = true;
          }
        }
      }
    } catch (e) {}
  }

  if (!colorChanged) {
    throw new Error(
      'The a:hover color should use the hsl() format.\n\n' +
      'HSL uses three values: Hue (0-360), Saturation (0%-100%), Lightness (0%-100%).\n' +
      'Replace the current a:hover color with: hsl(0, 65%, 51%)\n' +
      'A hue of 0 is red, which matches Utah Tech\'s color scheme.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 4: SVG Logo
// ============================================

test('The header should contain an img element', () => {
  const header = document.querySelector('header');
  if (!header) {
    throw new Error('Could not find a <header> element on the page.');
  }
  const img = header.querySelector('img');
  if (!img) {
    throw new Error(
      'No <img> element found inside the header.\n\n' +
      'Add an <img> element inside the <header>, before the <h1>.\n' +
      'The <img> tag needs src, alt, and width attributes.'
    );
  }
  expect(img).toBeTruthy();
});

test('The header logo should point to the SVG file', () => {
  const img = document.querySelector('header img');
  if (!img) {
    throw new Error('First add an <img> to the header (see previous test).');
  }
  const src = (img.getAttribute('src') || '').toLowerCase();
  if (!src.includes('logo.svg')) {
    throw new Error(
      'The header image src should point to the SVG logo file.\n\n' +
      'Set src to: https://se1400.github.io/labs/assets/logo.svg\n' +
      'SVG is ideal for logos because it stays sharp at any size.'
    );
  }
  expect(src).toContain('logo.svg');
});

test('The header logo should have a descriptive alt attribute', () => {
  const img = document.querySelector('header img');
  if (!img) {
    throw new Error('First add an <img> to the header (see previous test).');
  }
  const alt = img.getAttribute('alt');
  if (!alt || alt.trim().length === 0) {
    throw new Error(
      'The logo image is missing an alt attribute.\n\n' +
      'Every image needs alt text for accessibility — screen readers use it\n' +
      'to describe the image to users who cannot see it.\n' +
      'Example: alt="Utah Tech University Logo"'
    );
  }
  expect(alt.trim().length).toBeGreaterThan(0);
});

// ============================================
// Part 5: Hero Background Image
// ============================================

test('The #welcome section should not have class="panel"', () => {
  const welcome = document.querySelector('#welcome');
  if (!welcome) {
    throw new Error('Could not find the section with id="welcome".');
  }
  if (welcome.classList.contains('panel')) {
    throw new Error(
      'The #welcome section still has class="panel".\n\n' +
      'Remove the class="panel" from the #welcome section.\n' +
      'This section will have its own unique hero styling.'
    );
  }
  expect(welcome.classList.contains('panel')).toBe(false);
});

test('The #welcome section should contain a div with class="hero-overlay"', () => {
  const welcome = document.querySelector('#welcome');
  if (!welcome) {
    throw new Error('Could not find the section with id="welcome".');
  }
  const overlay = welcome.querySelector('.hero-overlay');
  if (!overlay) {
    throw new Error(
      'No element with class="hero-overlay" found inside #welcome.\n\n' +
      'Wrap the existing content (the h2 and all paragraphs) inside a <div>\n' +
      'and give that div class="hero-overlay".'
    );
  }
  // Verify it's actually wrapping content, not empty
  if (!overlay.querySelector('h2')) {
    throw new Error(
      'The .hero-overlay div should wrap the existing content.\n\n' +
      'Move the <h2> and all <p> elements inside the <div class="hero-overlay">.'
    );
  }
  expect(overlay).toBeTruthy();
});

test('CSS #welcome should have a background-image with url()', () => {
  if (!findCSSRuleContains('#welcome', 'background-image', 'url(')) {
    throw new Error(
      'Missing background-image on the #welcome rule.\n\n' +
      'Add a #welcome rule with:\n' +
      'background-image: url("https://se1400.github.io/labs/assets/campus.jpg");\n\n' +
      'The url() function tells CSS where to find the image file.'
    );
  }
  expect(true).toBe(true);
});

test('CSS #welcome should have background-size set to cover', () => {
  if (!findCSSRule('#welcome', 'background-size', 'cover')) {
    throw new Error(
      'Missing background-size: cover on the #welcome rule.\n\n' +
      'This makes the image scale to fill the entire section.\n' +
      'Add: background-size: cover;'
    );
  }
  expect(true).toBe(true);
});

test('CSS .hero-overlay should have a background-color using rgba()', () => {
  // Browsers preserve rgba() when alpha < 1. Check both propValue and cssText.
  if (!findCSSRuleContains('.hero-overlay', 'background-color', 'rgba')) {
    throw new Error(
      'Missing rgba() background-color on the .hero-overlay rule.\n\n' +
      'RGBA adds transparency — the fourth value (0-1) controls how see-through the color is.\n' +
      'Add: background-color: rgba(0, 48, 88, 0.8);\n' +
      'This creates a dark overlay that lets the campus photo subtly show through.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 6: Campus Photo with Figure & Picture
// ============================================

test('The #colleges section should contain a figure element', () => {
  const colleges = document.querySelector('#colleges');
  if (!colleges) {
    throw new Error('Could not find the section with id="colleges".');
  }
  const figure = colleges.querySelector('figure');
  if (!figure) {
    throw new Error(
      'No <figure> element found in the #colleges section.\n\n' +
      'Add a <figure> element after the closing </ul> tag.\n' +
      '<figure> is a semantic container that groups an image with its caption.'
    );
  }
  expect(figure).toBeTruthy();
});

test('The figure should contain a figcaption with text', () => {
  const figure = document.querySelector('#colleges figure');
  if (!figure) {
    throw new Error('First add a <figure> element (see previous test).');
  }
  const figcaption = figure.querySelector('figcaption');
  if (!figcaption || !figcaption.textContent || figcaption.textContent.trim().length === 0) {
    throw new Error(
      'The <figure> needs a <figcaption> with descriptive text.\n\n' +
      'Add a <figcaption> after the </picture> tag (but still inside <figure>).\n' +
      'Example text: "Utah Tech University campus in St. George, Utah"'
    );
  }
  expect(figcaption.textContent.trim().length).toBeGreaterThan(0);
});

test('The figure should contain a picture element', () => {
  const figure = document.querySelector('#colleges figure');
  if (!figure) {
    throw new Error('First add a <figure> element (see previous test).');
  }
  const picture = figure.querySelector('picture');
  if (!picture) {
    throw new Error(
      'No <picture> element found inside the <figure>.\n\n' +
      'Add a <picture> element inside <figure>.\n' +
      '<picture> lets the browser choose the best image based on screen size.'
    );
  }
  expect(picture).toBeTruthy();
});

test('The picture should have source elements with media attributes', () => {
  const picture = document.querySelector('#colleges figure picture');
  if (!picture) {
    throw new Error('First add a <picture> element (see previous test).');
  }
  const sources = picture.querySelectorAll('source[media]');
  if (sources.length < 2) {
    throw new Error(
      `Found ${sources.length} <source> element(s) with media attributes, but need at least 2.\n\n` +
      'Add two <source> elements inside <picture>, each with srcset and media attributes.\n' +
      'The media attribute tells the browser when to use that image based on screen width.'
    );
  }
  // Verify they have srcset attributes (not src)
  for (const source of sources) {
    if (!source.getAttribute('srcset')) {
      throw new Error(
        'A <source> inside <picture> should use srcset (not src) to specify the image.\n\n' +
        'Use srcset="..." instead of src="..." on your <source> elements.'
      );
    }
  }
  expect(sources.length).toBeGreaterThanOrEqual(2);
});

test('The picture should have an img fallback', () => {
  const picture = document.querySelector('#colleges figure picture');
  if (!picture) {
    throw new Error('First add a <picture> element (see previous test).');
  }
  const img = picture.querySelector('img');
  if (!img) {
    throw new Error(
      'The <picture> is missing a fallback <img> element.\n\n' +
      'Add an <img> as the last element inside <picture>.\n' +
      'This is what browsers use if no <source> media condition matches.\n' +
      'Set src to the small campus image with alt and width attributes.'
    );
  }
  const src = (img.getAttribute('src') || '').toLowerCase();
  if (!src.includes('campus')) {
    throw new Error(
      'The fallback <img> src should point to a campus image.\n\n' +
      'Set src to: https://se1400.github.io/labs/assets/campus-small.jpg'
    );
  }
  const alt = img.getAttribute('alt');
  if (!alt || alt.trim().length === 0) {
    throw new Error(
      'The fallback <img> needs an alt attribute describing the image.\n\n' +
      'The alt text on the <img> inside <picture> serves as the description\n' +
      'for all the image sources, not just the fallback.'
    );
  }
  expect(img).toBeTruthy();
});

test('The #colleges figcaption should use rgb() for its color', () => {
  // rgb(68, 68, 68) — browsers store rgb natively, so getPropertyValue returns it directly.
  // Check both the helper and a direct rule scan for robustness.
  let found = false;

  // Check via findCSSRuleContains (handles selector matching and cssText fallback)
  if (findCSSRuleContains('#colleges figcaption', 'color', 'rgb(68')) {
    found = true;
  }

  // Also check via direct rule scan as a fallback
  if (!found) {
    for (let sheet of document.styleSheets) {
      try {
        for (let rule of sheet.cssRules) {
          if (rule.selectorText && rule.selectorText.trim() === '#colleges figcaption') {
            const color = rule.style.getPropertyValue('color').replace(/\s/g, '').toLowerCase();
            if (color.includes('rgb(68')) {
              found = true;
            }
          }
        }
      } catch (e) {}
      if (found) break;
    }
  }

  if (!found) {
    throw new Error(
      'The #colleges figcaption should have a color using the rgb() format.\n\n' +
      'Add a #colleges figcaption rule with: color: rgb(68, 68, 68);\n' +
      'RGB specifies colors using Red, Green, Blue values from 0 to 255.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 7: Video with Captions
// ============================================

test('The hero overlay should contain a video element with controls', () => {
  // Video should be inside #welcome (in the hero overlay)
  const welcome = document.querySelector('#welcome');
  if (!welcome) {
    throw new Error('Could not find the section with id="welcome".');
  }
  const video = welcome.querySelector('video');
  if (!video) {
    throw new Error(
      'No <video> element found in the #welcome section.\n\n' +
      'Add a <video> element inside the .hero-overlay div, after the last paragraph.\n' +
      'Include the controls attribute and set width="320".'
    );
  }
  if (!video.hasAttribute('controls')) {
    throw new Error(
      'The <video> element is missing the controls attribute.\n\n' +
      'Add the word "controls" to the <video> tag (no value needed).\n' +
      'Without it, users have no way to play or pause the video.'
    );
  }
  expect(video.hasAttribute('controls')).toBe(true);
});

test('The video should have a source with type="video/mp4"', () => {
  const video = document.querySelector('#welcome video');
  if (!video) {
    throw new Error('First add a <video> element (see previous test).');
  }
  const source = video.querySelector('source');
  if (!source) {
    throw new Error(
      'The <video> is missing a <source> element.\n\n' +
      'Add a <source> inside the <video> with src and type attributes.'
    );
  }
  const type = (source.getAttribute('type') || '').toLowerCase();
  if (type !== 'video/mp4') {
    throw new Error(
      `The video source type is "${source.getAttribute('type')}" but should be "video/mp4".\n\n` +
      'Set type="video/mp4" to tell the browser what format the video is in.'
    );
  }
  expect(type).toBe('video/mp4');
});

test('The video should have a track element with kind="captions"', () => {
  const video = document.querySelector('#welcome video');
  if (!video) {
    throw new Error('First add a <video> element.');
  }
  const track = video.querySelector('track');
  if (!track) {
    throw new Error(
      'The <video> is missing a <track> element.\n\n' +
      'Add a <track> inside the <video> with src, kind, srclang, and label attributes.\n' +
      'The <track> element provides captions for accessibility.'
    );
  }
  const kind = (track.getAttribute('kind') || '').toLowerCase();
  if (kind !== 'captions') {
    throw new Error(
      `The track kind is "${track.getAttribute('kind')}" but should be "captions".\n\n` +
      'Set kind="captions" to indicate this track provides closed captions.'
    );
  }
  expect(kind).toBe('captions');
});

test('The track should have srclang and label attributes', () => {
  const track = document.querySelector('#welcome video track');
  if (!track) {
    throw new Error('First add a <track> element to the video.');
  }
  const srclang = track.getAttribute('srclang');
  const label = track.getAttribute('label');
  if (!srclang || srclang.trim().length === 0) {
    throw new Error(
      'The <track> is missing the srclang attribute.\n\n' +
      'Add srclang="en" to specify the language of the captions.'
    );
  }
  if (!label || label.trim().length === 0) {
    throw new Error(
      'The <track> is missing the label attribute.\n\n' +
      'Add label="English" — this is what users see in the video player\'s caption menu.'
    );
  }
  expect(srclang.trim().length).toBeGreaterThan(0);
  expect(label.trim().length).toBeGreaterThan(0);
});

// ============================================
// Part 8: Footer with PNG Image
// ============================================

test('The footer should contain an img element for the seal', () => {
  const footer = document.querySelector('footer');
  if (!footer) {
    throw new Error('Could not find a <footer> element on the page.');
  }
  const img = footer.querySelector('img');
  if (!img) {
    throw new Error(
      'No <img> element found in the footer.\n\n' +
      'Add an <img> for the university seal after the <hr> and before the copyright paragraph.\n' +
      'PNG is the right format here because the seal needs a transparent background.'
    );
  }
  const src = (img.getAttribute('src') || '').toLowerCase();
  if (!src.includes('seal.png')) {
    throw new Error(
      'The footer image should point to the PNG seal file.\n\n' +
      'Set src to: https://se1400.github.io/labs/assets/seal.png'
    );
  }
  expect(src).toContain('seal.png');
});

test('The footer should have a dark background using var(--ut-navy)', () => {
  // Check if footer has a navy background — could be via var() or resolved hex/rgb
  const hasVar = findCSSRuleContains('footer', 'background-color', 'var(--ut-navy)');
  const hasHex = findCSSRule('footer', 'background-color', '#003058');

  if (!hasVar && !hasHex) {
    throw new Error(
      'The footer should have a navy background.\n\n' +
      'Add background-color: var(--ut-navy) to your footer rule.\n' +
      'This gives the footer a dark background that matches the nav bar.'
    );
  }
  expect(true).toBe(true);
});

test('The footer rule should not have margin-top', () => {
  if (!propertyNotSet('footer', 'margin-top')) {
    throw new Error(
      'The footer rule still has a margin-top property.\n\n' +
      'In Step 20, you should replace margin-top and padding-top with just padding: 16px.'
    );
  }
  expect(true).toBe(true);
});

test('The footer rule should not have padding-top', () => {
  if (!propertyNotSet('footer', 'padding-top')) {
    throw new Error(
      'The footer rule still has a padding-top property.\n\n' +
      'In Step 20, you should replace margin-top and padding-top with just padding: 16px.'
    );
  }
  expect(true).toBe(true);
});

// ============================================
// Part 9: CSS Filter
// ============================================

test('CSS "footer img" should have a grayscale filter', () => {
  let found = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.trim() === 'footer img') {
          const filter = rule.style.getPropertyValue('filter').toLowerCase();
          const cssText = rule.cssText.toLowerCase();
          if (filter.includes('grayscale') || cssText.includes('grayscale')) {
            // Verify it's 100% (not 0% or some partial value)
            if (filter.includes('grayscale(100') || filter.includes('grayscale(1)') ||
                cssText.includes('grayscale(100') || cssText.includes('grayscale(1)')) {
              found = true;
            }
          }
        }
      }
    } catch (e) {}
    if (found) break;
  }

  if (!found) {
    throw new Error(
      'Missing CSS rule: footer img { filter: grayscale(100%); }\n\n' +
      'CSS filters apply visual effects to elements.\n' +
      'grayscale(100%) makes the image completely black and white.'
    );
  }
  expect(found).toBe(true);
});

test('CSS "footer img:hover" should remove the grayscale filter', () => {
  let found = false;
  for (let sheet of document.styleSheets) {
    try {
      for (let rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.trim() === 'footer img:hover') {
          const filter = rule.style.getPropertyValue('filter').toLowerCase();
          const cssText = rule.cssText.toLowerCase();
          if (filter.includes('grayscale(0') || cssText.includes('grayscale(0')) {
            found = true;
          }
        }
      }
    } catch (e) {}
    if (found) break;
  }

  if (!found) {
    throw new Error(
      'Missing CSS rule: footer img:hover { filter: grayscale(0%); }\n\n' +
      'This removes the grayscale effect on hover, revealing the seal\'s full color.'
    );
  }
  expect(found).toBe(true);
});
