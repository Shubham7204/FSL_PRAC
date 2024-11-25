import React, { useState, useEffect } from "react";
import UsernamePage from "./components/UsernamePage";
import QuizPage from "./components/QuizPage";
import ResultsPage from "./components/ResultsPage";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState(null);
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      {!username ? (
        <UsernamePage setUsername={setUsername} />
      ) : score === 0 ? (
        <QuizPage username={username} setScore={setScore} />
      ) : (
        <ResultsPage username={username} score={score} />
      )}
    </div>
  );
};

export default App;
