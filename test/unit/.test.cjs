const assert = require('assert');

// En simpel enhedstest
it('Skal returnere sandt, hvis værdien er sand', () => {
  const result = true;
  assert.strictEqual(result, true);
});

it('Skal returnere falsk, hvis værdien er falsk', () => {
  const result = false;
  assert.strictEqual(result, false);
});
