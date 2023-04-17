import { useEffect, useState } from "react";
import Board from "./Components/Board/Board.component";
import logo from "./logo.svg";
import { gameSubject, initGame } from "./State/Game";

function App() {
  const [board, setBoard] = useState([]);
  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => setBoard(game.board));
    return () => subscribe.unsubscribe();
  }, []);
  return (
    <div className="container">
      <div className="board__container">
        <Board board={board} />
      </div>
    </div>
  );
}

export default App;
