import React, { useContext, useReducer } from 'react';
import { Difficulty } from '../types';
import { Action, reducer } from './reducer';

export interface StateContext {
  difficulty: Difficulty;
}
export interface Store {
  state: StateContext;
  dispatch: React.Dispatch<Action>;
}

const defaultState: StateContext = { difficulty: Difficulty.Medium };
const diffContext = React.createContext<Store>({
  state: defaultState,
  dispatch: () => {}
});

export const useStateContext = () => useContext(diffContext);

export const StateProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <diffContext.Provider value={{ state, dispatch }} children={children} />
  );
};
