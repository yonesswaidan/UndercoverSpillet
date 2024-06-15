import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 50 }, // Ramp-up to 50 users over 1 minute
        { duration: '1m', target: 50 }, // Stay at 50 users for 1 minute
        { duration: '1m', target: 0 },  // Ramp-down to 0 users over 1 minute
    ],
    thresholds: {
        http_req_duration: ['p(95)<200'], // 95% of requests must complete below 200ms
        http_req_failed: ['rate<0.01'],   // Less than 1% of requests must fail
    },
};

export default function () {
    const url = 'http://localhost:3000/api/users';
    const payload = JSON.stringify({ playerName: 'John Doe' });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'is status 201': (r) => r.status === 201,
        'request duration < 200ms': (r) => r.timings.duration < 200,
    });

    sleep(1);
}
