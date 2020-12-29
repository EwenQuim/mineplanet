import { Difficulty } from '../types';
import { StateContext } from './state';

export enum ActionType {
  CHANGE_DIFFICULTY
}

export type Action = {
  type: ActionType.CHANGE_DIFFICULTY;
  payload: Difficulty;
};

export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.CHANGE_DIFFICULTY:
      return { difficulty: action.payload };
    default:
      throw new Error('Not among actions');
  }
};
