import Board from '../Board';
import { Difficulty } from '../types';

const createBoard = (difficulty: Difficulty): Board => {
  switch (difficulty) {
    case Difficulty.Easy:
      return new Board(8, 6, 6); // 8
    case Difficulty.Medium:
      return new Board(8, 12, 15); // 6.4
    case Difficulty.Hard:
      return new Board(10, 16, 30); // 5.33
    case Difficulty.Extreme:
      return new Board(10, 24, 50); // 4.8
    default:
      return createBoard(Difficulty.Medium);
  }
};

export default createBoard;
