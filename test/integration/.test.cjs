const request = require('chai-http');
const app = require('../app'); // Her skal du tilpasse stien til din appfil

describe('En simpel integrationstest', () => {
  it('Skal returnere status 200 ved at tilgå startsiden', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Skal returnere en velkomstbesked ved at tilgå startsiden', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.include('Velkommen');
        done();
      });
  });
});
