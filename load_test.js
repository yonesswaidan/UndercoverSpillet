import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100 }, 
        { duration: '50s', target: 100 }, 
        { duration: '30s', target: 0 }, 
    ],
    thresholds: {
        http_req_duration: ['p(99)<15000'], // 99% of requests must complete below 15s
    },
};

export default function () {
    let res = http.get('http://192.168.87.167:3000');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
