import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
    // Adjust timeout if needed
    let url = 'http://192.168.87.167:3000/api/users';
    let payload = JSON.stringify({ playerName: 'TestUser' });
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Send a POST request to create a user
    let response = http.post(url, payload, params);

    // Example check
    if (response.status !== 201) {
        console.error(`Request failed for ${url}: ${response.status} ${response.body}`);
    } else {
        console.log(`User created successfully: ${response.json().user.playerName}`);
    }

    // Add a sleep to simulate user pacing
    sleep(1);
}
