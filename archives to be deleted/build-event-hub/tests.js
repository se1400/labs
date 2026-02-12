// Test 1: header element exists
test('You should have a header element', () => {
  const header = document.querySelector('header');
  expect(header).toBeTruthy();
});

// Test 2: header comes after body opening tag
test('Your header element should come after the opening body tag', () => {
  const body = document.querySelector('body');
  expect(body).toBeTruthy();
  const firstChild = body.children[0];
  expect(firstChild).toBeTruthy();
  expect(firstChild.tagName).toBe('HEADER');
});

// Test 3: h1 with "Event Hub" inside header
test('Inside the header element, you should have an h1 element that contains the text Event Hub', () => {
  const header = document.querySelector('header');
  expect(header).toBeTruthy();
  const h1 = header.querySelector('h1');
  expect(h1).toBeTruthy();
  expect(h1.textContent).toMatch(/Event Hub/);
});

// Test 4: nav after h1 inside header
test('Inside the header element, after the h1 element, you should have a nav element', () => {
  const header = document.querySelector('header');
  expect(header).toBeTruthy();
  const h1 = header.querySelector('h1');
  expect(h1).toBeTruthy();
  const nav = header.querySelector('nav');
  expect(nav).toBeTruthy();
  // Check that nav comes after h1
  const headerChildren = Array.from(header.children);
  const h1Index = headerChildren.indexOf(h1);
  const navIndex = headerChildren.indexOf(nav);
  expect(navIndex).toBeGreaterThan(h1Index);
});

// Test 5: ul with 2 items in nav
test('Your nav element should contain an unordered list of two items', () => {
  const nav = document.querySelector('nav');
  expect(nav).toBeTruthy();
  const ul = nav.querySelector('ul');
  expect(ul).toBeTruthy();
  const liItems = ul.querySelectorAll('li');
  expect(liItems.length).toBe(2);
});

// Test 6: First li has a link
test('The first item in the unordered list should be a link', () => {
  const nav = document.querySelector('nav');
  expect(nav).toBeTruthy();
  const liItems = nav.querySelectorAll('li');
  expect(liItems.length).toBeGreaterThanOrEqual(1);
  const firstLi = liItems[0];
  const link = firstLi.querySelector('a');
  expect(link).toBeTruthy();
});

// Test 7: Second li has a link
test('The second item in the unordered list should be a link', () => {
  const nav = document.querySelector('nav');
  expect(nav).toBeTruthy();
  const liItems = nav.querySelectorAll('li');
  expect(liItems.length).toBeGreaterThanOrEqual(2);
  const secondLi = liItems[1];
  const link = secondLi.querySelector('a');
  expect(link).toBeTruthy();
});

// Test 8: First li text is "Upcoming Events"
test('The text of the first item in the unordered list should be Upcoming Events', () => {
  const nav = document.querySelector('nav');
  expect(nav).toBeTruthy();
  const liItems = nav.querySelectorAll('li');
  expect(liItems.length).toBeGreaterThanOrEqual(1);
  const firstLink = liItems[0].querySelector('a');
  expect(firstLink).toBeTruthy();
  expect(firstLink.textContent).toMatch(/Upcoming Events/);
});

// Test 9: First li href is #upcoming-events
test('The first item in the unordered list should have the href set to #upcoming-events', () => {
  const nav = document.querySelector('nav');
  expect(nav).toBeTruthy();
  const liItems = nav.querySelectorAll('li');
  expect(liItems.length).toBeGreaterThanOrEqual(1);
  const firstLink = liItems[0].querySelector('a');
  expect(firstLink).toBeTruthy();
  const href = firstLink.getAttribute('href');
  expect(href).toBe('#upcoming-events');
});

// Test 10: Second li text is "Past Events"
test('The text of the second item in the unordered list should be Past Events', () => {
  const nav = document.querySelector('nav');
  expect(nav).toBeTruthy();
  const liItems = nav.querySelectorAll('li');
  expect(liItems.length).toBeGreaterThanOrEqual(2);
  const secondLink = liItems[1].querySelector('a');
  expect(secondLink).toBeTruthy();
  expect(secondLink.textContent).toMatch(/Past Events/);
});

// Test 11: Second li href is #past-events
test('The second item in the unordered list should have the href set to #past-events', () => {
  const nav = document.querySelector('nav');
  expect(nav).toBeTruthy();
  const liItems = nav.querySelectorAll('li');
  expect(liItems.length).toBeGreaterThanOrEqual(2);
  const secondLink = liItems[1].querySelector('a');
  expect(secondLink).toBeTruthy();
  const href = secondLink.getAttribute('href');
  expect(href).toBe('#past-events');
});

// Test 12: main after header
test('You should have a main element after the header element closing tag', () => {
  const header = document.querySelector('header');
  expect(header).toBeTruthy();
  const nextSibling = header.nextElementSibling;
  expect(nextSibling).toBeTruthy();
  expect(nextSibling.tagName).toBe('MAIN');
});

// Test 13: Two sections inside main
test('Inside the main element, you should have two section elements', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBe(2);
});

// Test 14: First section has id="upcoming-events"
test('Your first section element should have an id attribute with the value upcoming-events', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(1);
  const firstSection = sections[0];
  const id = firstSection.getAttribute('id');
  expect(id).toBe('upcoming-events');
});

// Test 15: Second section has id="past-events"
test('Your second section element should have an id attribute with the value past-events', () => {
  const main = document.querySelector('main');
  expect(main).toBeTruthy();
  const sections = main.querySelectorAll('section');
  expect(sections.length).toBeGreaterThanOrEqual(2);
  const secondSection = sections[1];
  const id = secondSection.getAttribute('id');
  expect(id).toBe('past-events');
});

// Test 16: h2 "Upcoming Events" in #upcoming-events
test('Inside the #upcoming-events section, you should have an h2 element with the text Upcoming Events', () => {
  const upcomingSection = document.querySelector('#upcoming-events');
  expect(upcomingSection).toBeTruthy();
  const h2 = upcomingSection.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent).toMatch(/Upcoming Events/);
});

// Test 17: Two articles in #upcoming-events below h2
test('Inside the #upcoming-events section, you should have two article elements below the h2 element', () => {
  const upcomingSection = document.querySelector('#upcoming-events');
  expect(upcomingSection).toBeTruthy();
  const articles = upcomingSection.querySelectorAll('article');
  expect(articles.length).toBe(2);
});

// Test 18: Both articles in #upcoming-events have h3
test('Both of the article elements inside the #upcoming-events section should have an h3 element for the event title', () => {
  const upcomingSection = document.querySelector('#upcoming-events');
  expect(upcomingSection).toBeTruthy();
  const articles = upcomingSection.querySelectorAll('article');
  expect(articles.length).toBe(2);
  articles.forEach(article => {
    const h3 = article.querySelector('h3');
    expect(h3).toBeTruthy();
  });
});

// Test 19: Both articles in #upcoming-events have p
test('Both of the article elements inside the #upcoming-events section should have a paragraph element for the event description', () => {
  const upcomingSection = document.querySelector('#upcoming-events');
  expect(upcomingSection).toBeTruthy();
  const articles = upcomingSection.querySelectorAll('article');
  expect(articles.length).toBe(2);
  articles.forEach(article => {
    const p = article.querySelector('p');
    expect(p).toBeTruthy();
  });
});

// Test 20: h2 "Past Events" in #past-events
test('Inside the #past-events section, you should have an h2 element with the text Past Events', () => {
  const pastSection = document.querySelector('#past-events');
  expect(pastSection).toBeTruthy();
  const h2 = pastSection.querySelector('h2');
  expect(h2).toBeTruthy();
  expect(h2.textContent).toMatch(/Past Events/);
});

// Test 21: Two articles in #past-events below h2
test('Inside the #past-events section, you should have two article elements below the h2 element', () => {
  const pastSection = document.querySelector('#past-events');
  expect(pastSection).toBeTruthy();
  const articles = pastSection.querySelectorAll('article');
  expect(articles.length).toBe(2);
});

// Test 22: Both articles in #past-events have h3
test('Both of the article elements inside the #past-events section should have an h3 element for the event title', () => {
  const pastSection = document.querySelector('#past-events');
  expect(pastSection).toBeTruthy();
  const articles = pastSection.querySelectorAll('article');
  expect(articles.length).toBe(2);
  articles.forEach(article => {
    const h3 = article.querySelector('h3');
    expect(h3).toBeTruthy();
  });
});

// Test 23: Both articles in #past-events have p
test('Both of the article elements inside the #past-events section should have a paragraph element for the event description', () => {
  const pastSection = document.querySelector('#past-events');
  expect(pastSection).toBeTruthy();
  const articles = pastSection.querySelectorAll('article');
  expect(articles.length).toBe(2);
  articles.forEach(article => {
    const p = article.querySelector('p');
    expect(p).toBeTruthy();
  });
});

// Test 24: Both articles in #past-events have img
test('Both of the article elements inside the #past-events section should have an image element', () => {
  const pastSection = document.querySelector('#past-events');
  expect(pastSection).toBeTruthy();
  const articles = pastSection.querySelectorAll('article');
  expect(articles.length).toBe(2);
  articles.forEach(article => {
    const img = article.querySelector('img');
    expect(img).toBeTruthy();
  });
});

// Test 25: Both images in #past-events have src
test('Both of the image elements inside the #past-events section should have the src attribute pointing to an image file', () => {
  const pastSection = document.querySelector('#past-events');
  expect(pastSection).toBeTruthy();
  const articles = pastSection.querySelectorAll('article');
  expect(articles.length).toBe(2);
  articles.forEach(article => {
    const img = article.querySelector('img');
    expect(img).toBeTruthy();
    const src = img.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src.trim().length).toBeGreaterThan(0);
  });
});

// Test 26: Both images in #past-events have alt
test('Both of the image elements inside the #past-events section should have the alt attribute with a description of the image', () => {
  const pastSection = document.querySelector('#past-events');
  expect(pastSection).toBeTruthy();
  const articles = pastSection.querySelectorAll('article');
  expect(articles.length).toBe(2);
  articles.forEach(article => {
    const img = article.querySelector('img');
    expect(img).toBeTruthy();
    const alt = img.getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt.trim().length).toBeGreaterThan(0);
  });
});

// Test 27: Each h3 has event title
test('Each h3 element should have the event title', () => {
  const h3Elements = document.querySelectorAll('h3');
  expect(h3Elements.length).toBeGreaterThanOrEqual(4);
  h3Elements.forEach(h3 => {
    expect(h3.textContent.trim().length).toBeGreaterThan(0);
  });
});

// Test 28: Each p has event description
test('Each p element should have the event description', () => {
  const pElements = document.querySelectorAll('article p');
  expect(pElements.length).toBeGreaterThanOrEqual(4);
  pElements.forEach(p => {
    expect(p.textContent.trim().length).toBeGreaterThan(0);
  });
});
