import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerServiceForm from "./CustomerServiceForm";
import ThankYou from "./ThankYou";
import "./App.css";

function App() {
  return (
    <Router> {/* Use Router as an alias for BrowserRouter */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<CustomerServiceForm />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
