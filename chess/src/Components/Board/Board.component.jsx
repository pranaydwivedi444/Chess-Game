import React, { useEffect, useState } from "react";
import BoardSquare from "../BoardSquare/BoardSquare.component";
import "./Board.styles.css";

function Board({ board, turn }) {
  const [currBoard, setCurrBoard] = useState([]);
  useEffect(() => {
    setCurrBoard(turn === "w" ? board.flat() : board.flat().reverse());
  }, [board, turn]);
  function getXYPOS(i) {
    const x = turn === "w" ? i % 8 : Math.abs((i % 8) - 7);
    const y =
      turn === "w"
        ? Math.abs(Math.floor(i / 8) - 7)
        : Math.abs(Math.floor(i / 8));
    return { x, y };
  }
  function isBlack(i) {
    const { x, y } = getXYPOS(i);
    return (x + y) % 2 === 0;
  }

  function getPosition(i) {
    const { x, y } = getXYPOS(i);
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];
    return `${letter}${y + 1}`;
  }
  return (
    <div className="board">
      {currBoard.map((piece, i) => (
        <div key={i} className="square">
          <BoardSquare
            piece={piece}
            black={isBlack(i)}
            position={getPosition(i)}
          />
          {/* <p>{JSON.stringify(piece)}</p> */}
        </div>
      ))}
    </div>
  );
}

export default Board;
