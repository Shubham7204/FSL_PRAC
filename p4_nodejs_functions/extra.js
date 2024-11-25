const express = require('express');
const path = require('path');
const cors = require('cors'); // Import cors
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON requests

// Serve the HTML file on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware Functions

// Request Logging Middleware (Regular Function)
function logRequest(req, res, next) {
    console.log(`${req.method} request to ${req.url}`);
    next();
}
app.use(logRequest);

// Error Handling Middleware (Arrow Function)
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An error occurred', message: err.message });
};

// Utility Functions

// Formatting Response (Regular Function)
function formatResponse(data) {
    return { success: true, timestamp: new Date(), data };
}

// Generating Random Data (Arrow Function)
const generateRandomId = () => Math.floor(Math.random() * 1000);

// Route Handling Functions

// Sample "database" (array)
let items = [];

// Create Item (POST) - Regular Function
app.post('/items', (req, res) => {
    const newItem = { id: generateRandomId(), ...req.body };
    items.push(newItem);
    res.json(formatResponse(newItem));
});

// Read All Items (GET) - Anonymous Function
app.get('/items', function (req, res) {
    res.json(formatResponse(items));
});

// Read Single Item (GET by ID) - Arrow Function
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    if (item) {
        res.json(formatResponse(item));
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// Update Item (PUT) - Asynchronous Function with Try-Catch
app.put('/items/:id', async (req, res) => {
    try {
        const index = items.findIndex(i => i.id == req.params.id);
        if (index === -1) throw new Error('Item not found');
        
        items[index] = { ...items[index], ...req.body };
        res.json(formatResponse(items[index]));
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Delete Item (DELETE) - Callback with Promise
app.delete('/items/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        const index = items.findIndex(i => i.id == req.params.id);
        if (index !== -1) {
            const deletedItem = items.splice(index, 1);
            resolve(formatResponse(deletedItem[0]));
        } else {
            reject(new Error('Item not found'));
        }
    })
    .then(response => res.json(response))
    .catch(error => res.status(404).json({ error: error.message }));
});

// Simulating Asynchronous Operations (Database call simulation)
app.get('/async-data', async (req, res, next) => {
    try {
        const data = await simulateAsyncDataFetch(); // Mock async function
        res.json(formatResponse(data));
    } catch (error) {
        next(error);
    }
});

// Simulate async data fetch (returns data after 2 seconds)
function simulateAsyncDataFetch() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ message: 'Simulated database data', timestamp: new Date() });
        }, 2000);
    });
}

// Use error handling middleware
app.use(errorHandler);

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));