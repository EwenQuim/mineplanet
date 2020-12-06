import { Vibration } from "react-native";
import { GameState } from "../types";

const vibrateOnEnd = (state: GameState) => {
  switch (state) {
    case GameState.Lost:
      Vibration.vibrate(2000);
      console.log("Defeat...");
      break;

    case GameState.Won:
      Vibration.vibrate(Array(12).fill(100));
      console.log("Victory !");
      break;

    default:
      Vibration.vibrate(50);
  }
};

export default vibrateOnEnd;
