import React, { useState } from "react";
import "./styleComponents.css";

const QuestionMarkButton = ({ onClick }) => {
  const [showPopup, setShowPopup] = useState(false);

  const callPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <div className="instructions">
              <h2>How to Play:</h2>
              <p>
                Guess the sequence of 10 random numbers in the correct order.
              </p>
              <p>Each number will be between 1 and 100.</p>
              <p>Input your guesses into the corresponding input fields.</p>
              <p>Good Luck!!</p>
            </div>
          </div>
        </div>
      )}

      <button  className="question-mark-button"
        onClick={() => {
          onClick();
          callPopup();
        }}
        style={{ cursor: "pointer" }}
      >
        ?
      </button>
    </div>
  );
};

export default QuestionMarkButton;
