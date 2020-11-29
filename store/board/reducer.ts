// Store/Reducers/favoriteReducer.js

import Board from "../../Board";
import { BOARD_ACTION_TYPES } from "./actions";
import { BoardState, ClickOnCellAction, RevealCellAction } from "../types";

export const initialState: BoardState = { board: new Board() };

function updateReduxClickOnBoard(
  action: ClickOnCellAction,
  state: BoardState = initialState
) {
  //action.type, action.value
  let nextState;
  switch (action.type) {
    case BOARD_ACTION_TYPES.REVEAL_CELL:
      const { type, value } = <RevealCellAction>action;
      let nextBoard = state.board;

      nextState = {
        ...state,
        board: nextBoard,
      };

      return nextState || state;
    case BOARD_ACTION_TYPES.FLAG_CELL:
      return nextState || state;
    case BOARD_ACTION_TYPES.QMARK_CELL:
      return nextState || state;
    default:
      return state;
  }
}

export default updateReduxClickOnBoard;
