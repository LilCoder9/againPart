import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";

const Key = ({ keyVal, bigKey, errorFunction }) => {
  const { board, setBoard, currentAttempt, setCurrentAttempt, rand , setRand } =
    useContext(AppContext);
  const [selction, setSelection] = useState("");
  const [prev, setPrev] = useState(false);

  async function selectLetter(e) {
    e.preventDefault();
    setSelection(keyVal);
    const number = String(keyVal);
    const message = "";
    try {
      const response = await axios.post(
        " https://numbling2-abdf9822cff5.herokuapp.com/post_number",
        {
          number,
        }
      );
      console.log("POST request successful:", response.data);
      if (response.data.inputArr != null) {
        for (let i = 0; i < board.length; i++) {
          if (response.data.inputArr[i] !== board[i]) {
            setBoard(response.data.inputArr);
            console.log(rand);
            setCurrentAttempt(currentAttempt + 1);
            console.log("HI");
            // setPrev(true);
            break;
          }
        }
        if (response.data.error !== "") {
          errorFunction(response.data.error, response.data.string);
        }
      }
    } catch (error) {
      console.error("Error in POST request:", error);
    }
  }

  return (
    <div className="key" id={bigKey && "big"} onClick={selectLetter}>
      {keyVal}
    </div>
  );
};

export default Key;
