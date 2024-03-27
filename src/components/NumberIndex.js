import React from "react";
import "./styleComponents.css"

const NumberIndex = (props) => {
  return (
    <div className="number" style={{ opacity: props.position == "0" ? 0.25 : 1 }}>{props.position == "0" ? props.index : props.position}</div>
  );
};

export default NumberIndex;
