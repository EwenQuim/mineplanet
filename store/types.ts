import Board from "../Board";

export type AppState = {
  boardState: BoardState;
  // add future state slices here
};

export type BoardState = { board: Board };

export type RevealCellAction = {
  type: string;
  value: [number, number];
};

export type FlagCellAction = {
  type: string;
  value: [number, number];
};

export type QMarkCellAction = {
  type: string;
  value: [number, number];
};

export type ClickOnCellAction =
  | RevealCellAction
  | FlagCellAction
  | QMarkCellAction;
