const mongoose = require('mongoose');
const { expect } = require('chai');

describe('Database Connection', function() {
  // Forøg timeout til 20 sekunder
  this.timeout(20000);

  before((done) => {
    console.log('Connecting to database...');
    mongoose.set('strictQuery', false);  // Håndter strictQuery advarsel
    mongoose.connect('mongodb+srv://yonesswaidan:sgg59mcd@game-database.x2asuuz.mongodb.net/game-database', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', (error) => {
      console.error('Connection error:', error);
      done(error);
    });
    db.once('open', () => {
      console.log('Connected to database');
      done();
    });
  });

  it('should be connected to the database', () => {
    expect(mongoose.connection.readyState).to.equal(1);
  });

  after((done) => {
    console.log('Disconnecting from database...');
    mongoose.disconnect(done);
  });
});
