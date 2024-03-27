import React, { useState } from "react";
import "./styleComponents.css";
import Key from "./Key";
import axios from "axios";

const NumPad = () => {
  const keys1 = ["1", "2", "3", "4", "5"];
  const keys2 = ["6", "7", "8", "9", "10"];
  const [erroruser, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [finishLink, setFinishLink] = useState("");

  const callPopup = (mes, finish) => {
    setShowPopup(true);
    setError(mes);
    if (finish !== "") {
      setFinishLink(finish);
    }
  };

  const handleClosePopup = () => {
    // Set showPopup to false when the popup is closed
    setShowPopup(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(finishLink)
      .then(() => {
        // Create and style the alert element
        const alertElement = document.createElement("div");
        alertElement.textContent = "Link copied to clipboard!";

        // Append the alert to the body
        document.body.appendChild(alertElement);
        // Hide overflow to prevent scroll bar
        document.body.style.overflow = "hidden";
        // Remove the alert after 2 seconds
        setTimeout(() => {
          alertElement.remove();
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to copy: ", error);
      });
  };

  return (
    <div className="keyboard">
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span
              className="close"
              onClick={handleClosePopup}
              errorFunction={callPopup}
            >
              &times;
            </span>
            <div className="instructions">{erroruser}</div>
            {finishLink !== "" && (
              <button className="share-button" onClick={handleCopyToClipboard}>
                Share!
              </button>
            )}
          </div>
        </div>
      )}
      <div className="line">
        {keys1.map((key) => (
          <Key key={key} keyVal={key} errorFunction={callPopup} />
        ))}
      </div>
      <div className="line">
        {keys2.map((key) => (
          <Key key={key} keyVal={key} errorFunction={callPopup} />
        ))}
      </div>
    </div>
  );
};

export default NumPad;
