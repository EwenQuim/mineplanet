import Board from "../Board";
import { GameState } from "../types";

export const computeScore = (board: Board, seconds: number): number => {
  if (board.gameState === GameState.Won) {
    return Math.round(
      (10000 * board.bombsTotal) / (board.width * board.height * seconds)
    );
  } else {
    return 0;
  }
};
