const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let data = [
  {
    id: 1,
    price: 50000,
    value: "Laptop",
  },
  {
    id: 2,
    price: 20000,
    value: "Mobile",
  },
  {
    id: 3,
    price: 5000,
    value: "Headphones",
  },
  {
    id: 4,
    price: 2500,
    value: "Watch",
  },
];

// Get all products
app.get("/product", (req, res) => {
  res.json(data);
});

// Add a new product
app.post("/product", (req, res) => {
  console.log(req.body); // Log request body
  const { value, price } = req.body;
  const newItem = { id: Date.now(), value, price };
  data.push(newItem);
  res.json(newItem);
});

// Update an existing product (replace whole item)
app.put("/product/:id", (req, res) => {
  const { id } = req.params;
  const { value, price } = req.body;

  const item = data.find((i) => i.id == id);

  if (item) {
    item.value = value;
    item.price = price;
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Update part of an existing product (either value or price)
app.patch("/product/:id", (req, res) => {
  const { id } = req.params;
  const { value, price } = req.body;

  const item = data.find((i) => i.id == id);

  if (item) {
    if (value !== undefined) item.value = value; // Update value if provided
    if (price !== undefined) item.price = price; // Update price if provided
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Delete a product by id
app.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  data = data.filter((i) => i.id != id);
  res.json({ message: "Item Deleted" });
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});