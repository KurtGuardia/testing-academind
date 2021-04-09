const { generateText } = require('./util');

test('should output name and age', () => {
  const text = generateText('Kurt', 29);
  expect(text).toBe('Kurt (29 years old)');
  const text2 = generateText('Anna', 28);
  expect(text2).toBe('Anna (28 years old)');
});

test('should output dataless text', () => {
  const text = generateText('', null);
  expect(text).toBe(' (null years old)');
  const text2 = generateText();
  expect(text2).toBe('undefined (undefined years old)');
});
