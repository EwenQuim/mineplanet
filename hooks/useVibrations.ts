import { Vibration } from 'react-native';
import { GameState, PressTime } from '../types';

export const vibrateOnTouch = (
  vibrate: boolean,
  pressTime?: PressTime,
  state?: GameState
) => {
  if (vibrate) {
    if (pressTime === PressTime.Short) {
      Vibration.vibrate(50);
    } else if (pressTime === PressTime.Long) {
      Vibration.vibrate([0, 50, 50, 50]);
    }
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
};
