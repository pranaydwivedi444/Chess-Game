import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import "./Peice.styles.css";

function Peice({ piece: { type, color }, position }) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "piece", id: `${position}_${type}_${color}` },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const pieceImg = require(`../../assets/${type}_${color}.png`);

  return (
    <>
      <DragPreviewImage connect={preview} src={pieceImg} />
      <div
        className="piece__container"
        ref={drag}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        <img src={pieceImg} className="piece" />
      </div>
    </>
  );
}

export default Peice;
