import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizPage = ({ username, setScore }) => {
  const [questions, setQuestions] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/quiz");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setCurrentAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmit = async () => {
    try {
      const answers = Object.entries(currentAnswers).map(([id, answer]) => ({
        id,
        answer,
      }));

      const response = await axios.post("http://localhost:5000/quiz/submit", {
        username,
        answers,
      });

      setScore(response.data.score);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="container">
      <h1>Quiz for {username}</h1>
      {questions.map((question) => (
        <div key={question._id} className="quiz-question">
          <h3>{question.question}</h3>
          <div className="quiz-options">
            {question.options.map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    name={question._id}
                    value={option}
                    checked={currentAnswers[question._id] === option}
                    onChange={() => handleAnswerChange(question._id, option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="submit-btn"
        disabled={Object.keys(currentAnswers).length !== questions.length}
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizPage;
