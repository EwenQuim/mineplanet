import Board from '../Board';
import { GameState } from '../types';

export const computeScore = (board: Board, seconds: number): number => {
  if (board.gameState === GameState.Won) {
    return Math.round(
      (1000 * board.bombsTotal ** 2) /
        (board.width * board.height * (seconds + 1))
    );
  } else {
    return 0;
  }
};
