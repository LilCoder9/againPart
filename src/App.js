import Guess from "./components/Guess";
import NumPad from "./components/NumPad";
import Number from "./components/RandomNumber";
import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import axios from "axios";
import { boardDefault } from "../src/components/BoardDefault";
import QuestionMarkButton from "../src/components/QuestionMark"; // Assuming this is the correct path to your component
export const AppContext = createContext();

function App() {
  // Assuming guess is a state variablE
  const [test, setTest] = useState("");
  const [rand, setRand] = useState(0);
  const [index, setIndex] = useState("");
  const [inputArray, setInputArray] = useState(0);


  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState(0);

  async function fetchInitialData() {
    const word = "sned";
    try {
      const response = await axios.post(
        "https://numbling2-abdf9822cff5.herokuapp.com/start",
        { word }
      );
      console.log("Received:", response.data);
      if (response.data.randomArray) {
        setRand(response.data.randomArray);
        console.log("Received randomArray:", response.data.randomArray);
      }
      if(response.data.inputArr){
        setInputArray(response.data.inputArr);
        console.log("Recieved inputArray:", response.data.randoinputArrmArray);
      }
    } catch (error) {
      console.error("Error in POST request:", error);
    }
  }


  

  useEffect(() => {
    fetchInitialData();
  }, []); // Empty dependency array means this runs once on mount
  
  const handleClick = () => {
    // Handle button click logic here
    console.log("Button clicked!");
  };

  return (
    <div className="parent">
      <div>
        <div className="title">
          <span style={{ display: "inline-block" }}>Numbling!</span>
          <span style={{ display: "inline-block", marginLeft: "auto" }}>
            <QuestionMarkButton onClick={handleClick} />
          </span>
        </div>
        <AppContext.Provider
          value={{ board, setBoard, currentAttempt, setCurrentAttempt, rand, setRand,inputArray ,setInputArray }}
        >
          <div className="game">
            <Number className="number" />
            <Guess className="guess" number={test} guess={"0123456789"} />
            <NumPad className="numpad" />
          </div>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
