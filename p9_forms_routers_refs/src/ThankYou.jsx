import React from "react";
import { useLocation } from "react-router-dom";

const ThankYou = () => {
  const { state } = useLocation();

  return (
    <div className="thank-you-container">
      <h2>Thank You!</h2>
      <p>We have received your message. Here are the details you provided:</p>
      <div className="details">
        <p><strong>Name:</strong> {state.name}</p>
        <p><strong>Email:</strong> {state.email}</p>
        <p><strong>Question:</strong> {state.question}</p>
        <p><strong>Topic:</strong> {state.topic}</p>
      </div>
      <p>We will get back to you shortly.</p>
    </div>
  );
};

export default ThankYou;