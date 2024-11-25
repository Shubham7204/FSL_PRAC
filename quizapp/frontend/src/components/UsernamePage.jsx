import React, { useState } from "react";

const UsernamePage = ({ setUsername }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setUsername(name.trim());
    }
  };

  return (
    <div className="container username-form">
      <h1>Welcome to the Quiz App!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          className="username-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default UsernamePage;
