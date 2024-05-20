const { expect } = require('chai');

describe('En simpel enhedstest', () => {
  it('Skal returnere sandt, hvis værdien er sand', () => {
    const result = true;
    expect(result).to.be.true;
  });

  it('Skal returnere falsk, hvis værdien er falsk', () => {
    const result = false;
    expect(result).to.be.false;
  });
});
