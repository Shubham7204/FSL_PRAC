const http = require('http');

const requestHandler = async (req, res) => {
    const { default: fetch } = await import('node-fetch'); // Dynamic import of node-fetch

    const url = req.url;

    res.setHeader('Content-Type', 'text/html');

    if (url === '/') {
        res.write('<h1>Hello Node JS!</h1>');
        res.write('<p>Home page.</p>');
    } else if (url === '/about') {
        res.write('<h1>About Us</h1>');
        res.write('<p>Learn about Node.js functions.</p>');
    } else if (url === '/contact') {
        res.write('<h1>Contact Us</h1>');
        res.write('<p>Email us at: test@gmail.com</p>');
    } else if (url === '/data') {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            res.write(`<h1>Fetched Data</h1><pre>${JSON.stringify(data, null, 2)}</pre>`);
        } catch (error) {
            res.statusCode = 500;
            res.write('<h1>Internal Server Error</h1>');
            res.write('<p>Unable to fetch data.</p>');
        }
    } else {
        res.statusCode = 404;
        res.write('<h1>404 Not Found</h1>');
        res.write('<p>Page does not exist.</p>');
    }

    res.end();
};

const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});

// Arrow Functions
const func1 = () => {
    console.log("This is an Arrow Function");
};

const func2 = () => console.log("Single Line Arrow Function");

function func3() {
    console.log("This is a Regular Function");
}

// Async Function
const asyncFunction = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('Error fetching posts:', error);
    }
};

// Higher-Order Function
const users = ["Test1", "Test2", "Test3", "Test4", "Test5"];
users.map(user => console.log(user));

const filteredUsers = users.filter(user => user === "Test1");
console.log(filteredUsers);
