const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/quiz", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define the Question Schema
const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
});

// Define the UserResponse Schema (For storing username and score)
const UserResponseSchema = new mongoose.Schema({
  username: String,
  score: Number,
});

// Models
const Question = mongoose.model("Question", QuestionSchema);
const UserResponse = mongoose.model("UserResponse", UserResponseSchema);

// Endpoint to get all questions
app.get("/quiz", async (req, res) => {
  const questions = await Question.find({});
  res.json(questions);
});

// Endpoint to submit the quiz answers and store the score
app.post("/quiz/submit", async (req, res) => {
  const { username, answers } = req.body; // Extract username and answers from the body
  let score = 0;

  // Calculate score
  for (let userAnswer of answers) {
    const question = await Question.findById(userAnswer.id);
    if (question && question.answer === userAnswer.answer) {
      score++;
    }
  }

  // Create a new UserResponse document with the username and score
  const userResponse = new UserResponse({ username, score });
  await userResponse.save();

  // Send response back with the score
  res.json({ username, score });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Quiz App backend running on http://localhost:${PORT}`);
});
