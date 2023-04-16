import React from "react";
import BoardSquare from "../BoardSquare/BoardSquare.component";
import "./Board.styles.css";

function Board({ board }) {
  function getXYPOS(i) {
    const x = i % 8;
    const y = Math.abs(Math.floor(i / 8) - 7);
    return { x, y };
  }
  function isBlack(i) {
    const { x, y } = getXYPOS(i);
    return (x + y) % 2 === 0;
  }
  return (
    <div className="board">
      {board.flat().map((piece, i) => (
        <div key={i} className="square">
          <BoardSquare piece={piece} black={isBlack(i)} />
          {/* <p>{JSON.stringify(piece)}</p> */}
        </div>
      ))}
    </div>
  );
}

export default Board;
