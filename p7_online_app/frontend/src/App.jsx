import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseForm from "./CourseForm";
import CourseList from "./CourseList";
import './App.css';  // Importing the App.css file

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/add-course" element={<CourseForm />} />
          <Route path="/edit-course/:id" element={<CourseForm isEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;