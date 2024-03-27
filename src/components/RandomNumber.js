import React, { useContext, useState } from "react";
import { AppContext } from "../App";

const Number = () => {
  const { rand, currentAttempt } = useContext(AppContext);
  return <div className="numberCurrent">{rand[currentAttempt]}</div>;
};

export default Number;
