// import * as Chess from "chess.js";
import { Chess } from "chess.js";
import { BehaviorSubject } from "rxjs";

const chess = new Chess();
export const gameSubject = new BehaviorSubject();

export function initGame() {
  updateGame();
}

export function handleMove(from, to) {
  const promotions = chess.moves({ verbose: true }).filter((m) => m.promotion);
  console.log(promotions);
  if (promotions.some((p) => `${p.from}:${p.to}` === `${from}:${to}`)) {
    const pendingPromotions = { from, to, color: promotions.color[0] };
    updateGame(pendingPromotions);
  }
  const { pendingPromotions } = gameSubject.getValue();
  if (!pendingPromotions) move(from, to);
}

export function move(from, to) {
  try {
    const legalMove = chess.move({ from, to });
    if (!legalMove) {
      return;
    }
    console.log(legalMove);
    updateGame();
  } catch (err) {
    console.log(err);
  }
}

function updateGame(pendingPromotions) {
  const newGame = {
    board: chess.board(),
    pendingPromotions,
  };
  gameSubject.next(newGame);
}
