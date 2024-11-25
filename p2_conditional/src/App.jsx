import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [inputValue, setInputValue] = useState("");

  const adminUser = "Shubham";

  const handleLogin = () => {
    if (inputValue.trim() !== "") {
      setUserName(inputValue);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setInputValue("");
  };

  return (
    <div className="center-container">
      {isLoggedIn ? (
        <div>
          <h1>
            {userName === adminUser
              ? `Welcome Admin, ${userName}`
              : `Welcome, ${userName}`}
          </h1>
          <button onClick={handleLogout} className="action-button">
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h1>Please Login</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input-box"
          />
          <button onClick={handleLogin} className="action-button">
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
