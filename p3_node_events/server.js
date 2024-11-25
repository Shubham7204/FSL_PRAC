const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const http = require('http');

// Create a new EventEmitter instance
const e = new EventEmitter();

// Create sample.txt file if it doesn't exist
const filePath = path.join(__dirname, 'sample.txt');
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'Initial content');
    console.log('sample.txt file created');
}

// Creating Events
e.on('greet', (name) => {
    console.log(`Hello ${name}, Good Morning.`);
});

e.on('calculate', (num1, num2, op) => {
    let result;
    switch (op) {
        case 'add':
            result = num1 + num2;
            break;
        case 'sub':
            result = num1 - num2;
            break;
        case 'mul':
            result = num1 * num2;
            break;
        case 'div':
            result = num1 / num2;
            break;
        default:
            break;
    }
    console.log(`Result is ${result}`);
});

e.on('farewell', (name) => {
    console.log(`Goodbye ${name}, see you soon.`);
});

e.on('error', (err) => {
    console.error(`Error: ${err.message}`);
});

// Example function triggers
console.log('Triggering "greet" event');
e.emit('greet', "User");

console.log('Triggering "calculate" event');
e.emit('calculate', 5, 10, 'add');

console.log('Triggering "calculate" event');
e.emit('calculate', 5, 10, 'mul');

console.log('Triggering "farewell" event');
e.emit('farewell', "User");

console.log('Triggering "error" event');
e.emit('error', new Error('Some Error occurred!'));

console.log('--- fs.watch Example ---');

// Watch for changes in the sample.txt file
fs.watch(filePath, (eventType, filename) => {
    if (filename) {
        console.log(`File ${filename} has been modified. Event type: ${eventType}`);
        // Read and display file content when modified
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            console.log('Current file content:', content);
        } catch (err) {
            console.error('Error reading file:', err);
        }
    } else {
        console.log('No filename provided');
    }
});

// Create HTTP server
const server = http.createServer((req, res) => {
    const url = req.url;

    res.setHeader('Content-Type', 'text/html');

    if (url === '/') {
        res.write('<h1>Hello Node JS!</h1>');
        res.write('<p>Home page.</p>');
    } else if (url === '/about') {
        res.write('<h1>About Us</h1>');
        res.write('<p>Node.js functions.</p>');
    } else if (url === '/contact') {
        res.write('<h1>Contact Us</h1>');
        res.write('<p>Email us at: test@gmail.com</p>');
    } else {
        res.statusCode = 404;
        res.write('<h1>404 Not Found</h1>');
        res.write('<p>Page does not exist.</p>');
    }

    res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`HTTP server is listening on port ${PORT}`);
});

// Example of modifying the file after 2 seconds
setTimeout(() => {
    try {
        fs.appendFileSync(filePath, '\nNew content added');
        console.log('File modified');
    } catch (err) {
        console.error('Error modifying file:', err);
    }
}, 2000);

// Handle uncaught exceptions properly
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Perform any cleanup here
    process.exit(1);
});

// Simulate an uncaught exception after 5 seconds
setTimeout(() => {
    throw new Error('This is an uncaught exception!');
}, 5000);