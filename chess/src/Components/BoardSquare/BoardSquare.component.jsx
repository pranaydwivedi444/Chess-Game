import React, { useEffect, useState } from "react";
import Peice from "../Peice/Peice.component";
import Square from "../Square/Square.component";
import { useDrop } from "react-dnd";
import { handleMove } from "../../State/Game";
import { gameSubject } from "../../State/Game";
import Promote from "../Promote/Promote.component";
function BoardSquare({ piece, black, position }) {
  const [promotion, setPromotion] = useState(null);
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split("_");
      handleMove(fromPosition, position);
    },
  });

  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pendingPromotions }) =>
      pendingPromotions && pendingPromotions.to === position
        ? setPromotion(pendingPromotions)
        : setPromotion(null)
    );
    return () => subscribe.unsubscribe();
  }, []);
  return (
    <div className="board__square" ref={drop}>
      <Square black={black}>
        {promotion ? (
          <Promote promotion={promotion} />
        ) : piece ? (
          <Peice piece={piece} position={position} />
        ) : null}
      </Square>
    </div>
  );
}

export default BoardSquare;
