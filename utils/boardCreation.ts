import Board from "../Board";
import { Difficulty } from "../types";

const createBoard = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.Easy:
      return new Board(8, 6, 6);
    case Difficulty.Hard:
      return new Board(12, 12, 28);
    default:
      return new Board(8, 12, 16);
  }
};

export default createBoard;
