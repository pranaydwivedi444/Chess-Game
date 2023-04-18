import React from "react";
import Square from "../Square/Square.component";
import "./Promote.styles.css";
import { move } from "../../State/Game.js";

function Promote({ promotion: { from, to, color } }) {
  const promotionPieces = ["r", "n", "b", "q"];
  return (
    <div className="board">
      {promotionPieces.map((p, i) => (
        <div key={i} className="promote__square">
          <Square black={i % 3 == 0}>
            <div className="piece__container" onClick={() => move(from, to, p)}>
              <img
                src={require(`./../../assets/${p}_${color}.png`)}
                alt="chess"
                className="piece cursor-pointer"
              />
            </div>
          </Square>
        </div>
      ))}
    </div>
  );
}

export default Promote;
