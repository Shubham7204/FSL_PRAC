import React from "react";

const ResultsPage = ({ username, score, totalQuestions = 3 }) => {
  return (
    <div className="container results">
      <h1>Quiz Completed!</h1>
      <p>
        Thank you, <strong>{username}</strong>, for completing the quiz.
      </p>
      <p>
        Your score: <strong>{score}</strong> out of {totalQuestions}
      </p>
    </div>
  );
};

export default ResultsPage;
