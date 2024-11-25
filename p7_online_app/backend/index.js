const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/onlineLearning', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Course Schema and Model
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  imageUrl: { type: String }, // Store image URL
});

const Course = mongoose.model('Course', courseSchema);

// Setup Multer for image uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Store images in the 'uploads' directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
  }),
});

// Routes
// Get all courses
app.get('/api/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Add a new course with an image
app.post('/api/courses', upload.single('image'), async (req, res) => {
  const newCourse = new Course({
    ...req.body,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null, // Store image URL in DB
  });
  await newCourse.save();
  res.status(201).json(newCourse);
});

// Update a course with an image
app.put('/api/courses/:id', upload.single('image'), async (req, res) => {
  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    },
    { new: true }
  );
  res.json(updatedCourse);
});

// Delete a course
app.delete('/api/courses/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Serve uploaded images as static files
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
