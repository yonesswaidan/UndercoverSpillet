const mongoose = require('mongoose');
const { expect } = require('chai');

describe('Database Connection', () => {
  before((done) => {
    mongoose.connect('mongodb+srv://yonesswaidan:sgg59mcd@game-database.x2asuuz.mongodb.net/game-database', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', done);
    db.once('open', () => done());
  });

  it('should be connected to the database', () => {
    expect(mongoose.connection.readyState).to.equal(1);
  });

  after((done) => {
    mongoose.disconnect(done);
  });
});
