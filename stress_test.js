import http from 'k6/http';

export let options = {
    stages: [
        { duration: '10s', target: 100 }, // below normal load
        { duration: '25s', target: 100 },
        { duration: '10s', target: 1400 }, // spike to a high load
        { duration: '30s', target: 1400 },
        { duration: '10s', target: 100 }, // scale down. Recovery stage.
        { duration: '30s', target: 100 },
        { duration: '10s', target: 0 },
    ],
};

export default function () {
    http.get('http://localhost:3000');
}
