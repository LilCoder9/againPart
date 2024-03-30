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

  // Updated callPopup function to be more generic
  const callPopup = (mes, finish = '') => {
    setShowPopup(true);
    setError(mes);
    setFinishLink(finish);
  };
  const handleClosePopup = () => {
    // Set showPopup to false when the popup is closed
    setShowPopup(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(finishLink)
      .then(() => {
        // Call the popup with a success message
        callPopup("Link copied to clipboard successfully!");
        // Optionally reset finishLink if you want the popup to behave differently next time
        setFinishLink("");
      })
      .catch(error => {
        console.error("Failed to copy: ", error);
        callPopup("Failed to copy the link.");
      });
  };
  

  return (
    <div className="keyboard">
{showPopup && (
  <div className="popup">
    <div className="popup-content">
      <span className="close" onClick={handleClosePopup}>&times;</span>
      <div className="instructions">{erroruser}</div>
      {finishLink !== "" && (
        <button className="share-button" onClick={handleCopyToClipboard}>
          Copy Link
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
