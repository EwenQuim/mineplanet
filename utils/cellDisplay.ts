import { Cell } from "../types";

export const displayCell = (cell: Cell): string => {
  if (cell.bomb) {
    return "💣";
  } else if (cell.bombCount > 0) {
    return cell.bombCount.toString();
  } else {
    return "";
  }
};

export const colorMatch = (cell: Cell) => {
  switch (cell.bombCount) {
    case 1:
      return "blue";
    case 2:
      return "green";
    case 3:
      return "red";
    case 4:
      return "darkblue";
    default:
      return "black";
  }
};
