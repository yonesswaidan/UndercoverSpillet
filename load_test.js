import http from "k6/http";
import { sleep } from "k6";

export const options = {
    stages: [
        { duration: "5m", target: 50 },  // ramp-up to 50 users over 5 minutes
        { duration: "10m", target: 50 }, // stay at 50 users for 10 minutes
        { duration: "5m", target: 0 },   // ramp-down to 0 users over 5 minutes
    ],
    thresholds: {
        http_req_duration: ['p(99)<150'],  // 99% of requests must complete below 150ms
    },
};

export default function () {
    const url = "http://localhost:3000/api/users";
    const payload = JSON.stringify({ playerName: `player${Math.random()}` });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    http.post(url, payload, params);
    sleep(1);
}
