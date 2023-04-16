import React from "react";
import "./Square.styles.css";
function Square({ children, black }) {
  const bgClass = black ? "square-black" : "square-white";
  return <div className={`${bgClass} board__square`}>{children}</div>;
}

export default Square;
