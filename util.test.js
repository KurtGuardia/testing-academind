const { generateText } = require('./util');

test('should output name and age', () => {
  const text = generateText('Kurt', 29);
  expect(text).toBe('Kurt (29 years old)');
});
