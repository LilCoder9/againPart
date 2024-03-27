import React, { useContext } from "react";
import NumberIndex from "./NumberIndex";
import "./styleComponents.css";
import { AppContext } from "../App";

const Guess = () => {
  const { board, setBoard } = useContext(AppContext);

  return (
    <div className="boardGuess">
      <div className="rowNumber">
        <NumberIndex index="1" position={board[0]} />
        <NumberIndex index="2" position={board[1]} />
        <NumberIndex index="3" position={board[2]} />
        <NumberIndex index="4" position={board[3]} />
        <NumberIndex index="5" position={board[4]} />
        <NumberIndex index="6" position={board[5]} />
        <NumberIndex index="7" position={board[6]} />
        <NumberIndex index="8" position={board[7]} />
        <NumberIndex index="9" position={board[8]} />
        <NumberIndex index="10" position={board[9]} />
      </div>
    </div>
  );
};

export default Guess;
