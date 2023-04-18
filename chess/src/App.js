import { useEffect, useState } from "react";
import Board from "./Components/Board/Board.component";
import logo from "./logo.svg";
import { gameSubject, initGame, resetGame } from "./State/Game";

function App() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setisGameOver] = useState(false);
  const [result, setResult] = useState("");
  const [turn, setTurn] = useState("");
  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setisGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
    });
    return () => subscribe.unsubscribe();
  }, []);
  return (
    <div className="container">
      {isGameOver && (
        <h2 className="vertical_text">
          GAME OVER
          <button onClick={resetGame}>
            {" "}
            <span className="vertical_text">NEW GAME</span>
          </button>
        </h2>
      )}
      <div className="board__container">
        <Board board={board} turn={turn} />
      </div>
      {result && <p className="vertical_text">{result}</p>}
    </div>
  );
}

export default App;
