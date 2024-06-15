import http from 'k6/http';
import { sleep, check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

const baseUrl = 'http://192.168.87.167:3000/api/users'; // Erstat 'your-api-url' med det rigtige domænenavn eller IP-adresse

const playerNames = ['John Doe', 'Jane Smith', 'Michael Brown', 'Emily Johnson', 'David Davis'];

export const options = {
    stages: [
        { duration: '30s', target: 5 }, // Ramp-up to 25 users over 30 seconds
        { duration: '30s', target: 5 }, // Stay at 25 users for 30 seconds
        { duration: '30s', target: 0 },  // Ramp-down to 0 users over 30 seconds
    ],
    thresholds: {
        http_req_duration: ['p(95)<200'], // 95% of requests should complete below 200ms
        http_req_failed: ['rate<0.01'],   // Less than 1% of requests should fail
    },
};

export default function () {
    const playerName = randomItem(playerNames);
    const payload = JSON.stringify({ playerName });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(baseUrl, payload, params);
    check(res, {
        'is status 201': (r) => r.status === 201,
    });

    sleep(1);
}
