const http = require('http');

// Definer URL'en til din server
const url = 'http://localhost:3000/';

// Foretag en HTTP-anmodning til serveren
http.get(url, (res) => {
  // Tjek om statuskoden er 200 (OK)
  if (res.statusCode === 200) {
    console.log('Integrationstesten lykkedes! Serveren returnerede statuskode 200.');
  } else {
    console.error(`Integrationstesten mislykkedes! Serveren returnerede statuskode ${res.statusCode}.`);
  }
}).on('error', (err) => {
  console.error('Der opstod en fejl under integrationstesten:', err.message);
});
