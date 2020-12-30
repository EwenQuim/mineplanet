import { Vibration } from 'react-native';
import { GameState } from '../types';
import { getVibrations } from '../utils/storage';

export const vibrateOnTouch = (shortPress?: boolean, state?: GameState) => {
  getVibrations().then((ans) => {
    // TODO: inefficient, use context instead
    if (ans) {
      if (shortPress) {
        Vibration.vibrate(50);
      } else if (shortPress !== undefined) {
        Vibration.vibrate([0, 50, 50, 50]);
      }
      switch (state) {
        case GameState.Lost:
          Vibration.vibrate(2000);
          break;

        case GameState.Won:
          Vibration.vibrate(Array(12).fill(100));
          break;

        default:
          break;
      }
    }
  });
};
