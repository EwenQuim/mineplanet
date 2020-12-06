import { Difficulty } from "../types";

export const stringToDiff = (string: string) => {
  switch (string) {
    case "Easy":
      return Difficulty.Easy;
    case "Medium":
      return Difficulty.Medium;
    case "Hard":
      return Difficulty.Hard;
    default:
      return Difficulty.Medium;
  }
};
