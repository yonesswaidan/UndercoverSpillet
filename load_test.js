import http from 'k6/http';

export let options = {
    stages: [
        { duration: '10s', target: 100 }, // Ramp up to 100 users over 30 seconds
        { duration: '20s', target: 100 }, // Stay at 100 users for 50 seconds
        { duration: '10s', target: 0 },   // Ramp down to 0 users over 30 seconds
    ],
    thresholds: {
        http_req_duration: ['p(99)<15000'], // 99% of requests must complete below 15 seconds
    },
};

export default function () {
    http.get('http://192.168.87.167:3000');
}
