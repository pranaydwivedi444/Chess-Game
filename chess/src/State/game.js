// import * as Chess from "chess.js";
import { Chess } from "chess.js";
import { BehaviorSubject } from "rxjs";
const chess = new Chess();
export const gameSubject = new BehaviorSubject({
  board: chess.board(),
});
