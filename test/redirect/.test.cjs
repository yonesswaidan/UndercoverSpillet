const http = require('http');
const { expect } = require('chai');

describe('Redirect Test', () => {
  it('should redirect to /spillet/index.html', (done) => {
    http.get('http://localhost:3000', (res) => {
      expect(res.statusCode).to.equal(200);
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        expect(rawData).to.include('url=/spillet/index.html');
        done();
      });
    }).on('error', done);
  });
});
