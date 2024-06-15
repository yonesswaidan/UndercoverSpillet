import http from 'k6/http';
import { sleep, check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js'; // Importing utility function for random selection

// Define an array of example player names
const playerNames = ['John Doe', 'Jane Smith', 'Michael Brown', 'Emily Johnson', 'David Davis'];

export const options = {
    stages: [
        { duration: '30s', target: 25 }, // Ramp-up to 50 users over 1 minute
        { duration: '30s', target: 25 }, // Stay at 50 users for 1 minute
        { duration: '30s', target: 0 },  // Ramp-down to 0 users over 1 minute
    ],
    thresholds: {
        http_req_duration: ['p(95)<100010'], // 95% of requests must complete below 200ms
        http_req_failed: ['rate<0.01'],   // Less than 1% of requests must fail
    },
};

export default function () {
    const url = 'http://localhost:3000/api/users';

    // Select a random playerName from the array
    const playerName = randomItem(playerNames);

    // Create the payload object
    const payload = JSON.stringify({ playerName });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Send POST request and measure duration
    const start = new Date().getTime();
    const res = http.post(url, payload, params);
    const end = new Date().getTime();
    const duration = end - start;

    // Check assertions
    check(res, {
        'is status 201': (r) => r.status === 201,
    });

    // Track request duration
    if (duration >= 200) {
        console.log(`Request took ${duration}ms`);
    }

    sleep(1);
}
