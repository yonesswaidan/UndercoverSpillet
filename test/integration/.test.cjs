const http = require('http');

const url = 'http://localhost:3001/';
const maxRetries = 5;
let attempts = 0;

function testServer() {
  http.get(url, (res) => {
    if (res.statusCode === 200) {
      console.log('Integrationstesten lykkedes! Serveren returnerede statuskode 200.');
      process.exit(0);  // Succes
    } else {
      console.error(`Integrationstesten mislykkedes! Serveren returnerede statuskode ${res.statusCode}.`);
      process.exit(1);  // Fejl
    }
  }).on('error', (err) => {
    if (attempts < maxRetries) {
      attempts++;
      console.log(`Forsøger igen (${attempts}/${maxRetries})...`);
      setTimeout(testServer, 2000); // Prøv igen efter 2 sekunder
    } else {
      console.error('Der opstod en fejl under integrationstesten:', err.message);
      process.exit(1);  // Fejl
    }
  });
}

testServer();
