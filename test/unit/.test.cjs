const assert = require('assert');

// En simpel enhedstest
console.log('Kører en simpel enhedstest...');

const result1 = true;
assert.strictEqual(result1, true);

const result2 = false;
assert.strictEqual(result2, false);

console.log('Enhedstesten blev kørt succesfuldt.');
