const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

//Unit Testing
test('should output name and age', () => {
  const text = generateText('Kurt', 29);
  expect(text).toBe('Kurt (29 years old)');
  const text2 = generateText('Anna', 28);
  expect(text2).toBe('Anna (28 years old)');
});

//Against false positives
test('should output dataless text', () => {
  const text = generateText('', null);
  expect(text).toBe(' (null years old)');
  const text2 = generateText();
  expect(text2).toBe('undefined (undefined years old)');
});

//Integrtion test
test('should generate a valid text output', () => {
  const text = checkAndGenerate('Max', 29);
  expect(text).toBe('Max (29 years old)');
});

//E2E Testing
test('should create an element', async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 80,
    args: ['--window-size=1720,800'],
  });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/index.html');

  await page.click('input#name');
  await page.type('input#name', 'Anna');
  await page.click('input#age');
  await page.type('input#age', '28');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', (el) => el.textContent);
  expect(finalText).toBe('Anna (28 years old)');
}, 10000);
