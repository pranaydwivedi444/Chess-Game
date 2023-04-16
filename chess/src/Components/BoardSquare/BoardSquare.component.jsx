import React from "react";
import Peice from "../Peice/Peice.component";
import Square from "../Square/Square.component";

function BoardSquare({ piece, black }) {
  return (
    <div className="board__square">
      <Square black={black}>{piece && <Peice piece={piece} />}</Square>
    </div>
  );
}

export default BoardSquare;
