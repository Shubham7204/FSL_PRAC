import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bgColor, setBgColor] = useState('white'); // State for background color

  useEffect(() => {
    // Change the document background color whenever bgColor changes
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange'];

  return (
    <div className="app-container">
      {/* Display the current background color */}
      <h1 className="bg-display">
        Background color is <span className="bg-color-name">{bgColor}</span>
      </h1>

      {/* Render color buttons */}
      <div className="button-container">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setBgColor(color)}
            className="color-button"
            style={{ backgroundColor: color }}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;