import React, { useState } from "react";
import "./styleComponents.css";
import Key from "./Key";
import axios from "axios";

const NumPad = () => {
  const keys1 = ["1", "2", "3", "4", "5"];
  const keys2 = ["6", "7", "8", "9", "10"];
  const [popupQueue, setPopupQueue] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [finishLink, setFinishLink] = useState("");

    // Effect hook to display messages based on priority
    useEffect(() => {
      if (popupQueue.length > 0) {
        // Sort messages by priority
        const sortedQueue = [...popupQueue].sort((a, b) => a.priority - b.priority);
        // Display the highest priority message
        setPopupMessage(sortedQueue[0].message);
        setShowPopup(true);
        // Remove the displayed message from the queue
        setPopupQueue(queue => queue.filter((_, index) => index !== 0));
      } else {
        setShowPopup(false);
      }
    }, [popupQueue]);

  // Updated callPopup function to be more generic
  // Function to queue popup messages
  const callPopup = (message, finish = '', priority = 1) => {
    setPopupQueue(queue => [...queue, { message, priority }]);
    if (finish) {
      setFinishLink(finish);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(finishLink)
      .then(() => {
        callPopup("Link copied to clipboard successfully!", "", 0); // 0 for highest priority
        setFinishLink(""); // Optionally clear finishLink
      })
      .catch(error => {
        console.error("Failed to copy: ", error);
        callPopup("Failed to copy the link.", "", 0);
      });
  };

  

  return (
    <div className="keyboard">
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
            <div className="instructions">{popupMessage}</div>
          </div>
        </div>
      )}
      {/* Render keys */}
    </div>
  );
};

export default NumPad;
