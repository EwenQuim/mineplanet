import { ClickOnCellAction } from "../types";

export enum BOARD_ACTION_TYPES {
  REVEAL_CELL = "BOARD/REVEAL_CELL",
  FLAG_CELL = "BOARD/FLAG_CELL",
  QMARK_CELL = "BOARD/QMARK_CELL",
}

export const revealCell = (i: number, j: number): ClickOnCellAction => ({
  type: BOARD_ACTION_TYPES.REVEAL_CELL,
  value: [i, j],
});

export const flagCell = (i: number, j: number): ClickOnCellAction => ({
  type: BOARD_ACTION_TYPES.FLAG_CELL,
  value: [i, j],
});

export const qMarkCell = (i: number, j: number): ClickOnCellAction => ({
  type: BOARD_ACTION_TYPES.QMARK_CELL,
  value: [i, j],
});
