import http from 'k6/http';

export let options = {
    stages: [
        { duration: '30s', target: 100 }, 
        { duration: '50s', target: 100 }, 
        { duration: '30s', target: 0 }, 
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

export default function () {
    http.get('http://192.168.87.167:3000/api/Users');
}

