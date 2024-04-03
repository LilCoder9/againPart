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
    console.log("polo!!")
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
        // Alert the user that the link has been copied
        alert("Link copied to clipboard!");
  
        // Optional: If you want to keep the custom alert that appears on the screen for 2 seconds,
        // you can keep the following code. Otherwise, you can remove it and just use the alert() above.
        // Create and style the alert element
        const alertElement = document.createElement("div");
        alertElement.textContent = "Link copied to clipboard!";
        alertElement.style.position = 'fixed';
        alertElement.style.bottom = '20px';
        alertElement.style.left = '50%';
        alertElement.style.transform = 'translateX(-50%)';
        alertElement.style.backgroundColor = 'rgba(0,0,0,0.7)';
        alertElement.style.color = 'white';
        alertElement.style.padding = '10px';
        alertElement.style.borderRadius = '5px';
        alertElement.style.zIndex = '1000';
  
        // Append the alert to the body
        document.body.appendChild(alertElement);
        // Remove the alert after 2 seconds
        setTimeout(() => {
          alertElement.remove();
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to copy: ", error);
        // Optionally, you can alert the user that copying failed
        alert("Failed to copy the link.");
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
