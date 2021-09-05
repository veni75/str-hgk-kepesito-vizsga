const { exec } = require('child_process');
const fs = require('fs');

let run = false;
let running = false;

setTimeout(() => {
    fs.watch('./src', { recursive: true }, (eventType, filename) => {
        console.log('Files changed: ', eventType, filename);
        if (running) {
            return;
        }

        running = true;
        exec('docker restart api_final_exam', (error, stdout, stderr) => {
            running = false;
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
        });
    });
}, 10000);