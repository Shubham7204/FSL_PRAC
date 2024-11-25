import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CustomerServiceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
    topic: "General Inquiry",
  });

  const navigate = useNavigate();
  const nameInputRef = useRef(null);

  const topics = [
    "General Inquiry",
    "Order Status",
    "Product Inquiry",
    "Feedback",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/thank-you", { state: { ...formData } });
    nameInputRef.current.focus();
  };

  return (
    <div className="form-container">
      <h2>Customer Service Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            ref={nameInputRef}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Question:</label>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Topic:</label>
          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
          >
            {topics.map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomerServiceForm;