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
    const pendingPromotions = { from, to, color: promotions[0].color };
    updateGame(pendingPromotions);
  }
  const gameValue = gameSubject.getValue();
  const pendingPromotions = gameValue ? gameValue.pendingPromotions : null;

  if (!pendingPromotions) move(from, to);
}

export function resetGame() {
  chess.reset();
  updateGame();
}

export function move(from, to, promotion = null) {
  try {
    let tempMove = { from, to };
    if (promotion) {
      tempMove.promotion = promotion;
    }
    const legalMove = chess.move(tempMove);
    if (!legalMove) {
      return;
    }

    updateGame();
  } catch (err) {
    console.log(err);
  }
}

function updateGame(pendingPromotions = null) {
  const isGameOver = chess.isGameOver();
  const newGame = {
    board: chess.board(),
    pendingPromotions,
    isGameOver,
    result: (isGameOver && getResult()) || null,
    turn: chess.turn(),
  };
  gameSubject.next(newGame);
}

function getResult() {
  if (chess.inCheck()) {
    const winner = chess.turn();
    return `CHECKMATE - WINNER - ${winner}`;
  } else if (chess.isDraw()) {
    let reason = ` 50 - moves - rule`;
    if (chess.isStalemate()) reason = `stalemate`;
    else if (chess.isThreefoldRepetition()) reason = `repetion`;
    else if (chess.isInsufficientMaterial()) reason = `INSUFFIECENT MATERIAL`;

    return ` draw - ${reason}`;
  }
}
