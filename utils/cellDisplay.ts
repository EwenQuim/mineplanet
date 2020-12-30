import { Cell } from '../types';

/**
 * Displays what is under the cell, once revealed
 * @param cell
 */
export const displayCell = (cell: Cell): string => {
  if (cell.bomb) {
    return '💣';
  } else if (cell.bombCount > 0) {
    return cell.bombCount.toString();
  } else {
    return '';
  }
};

/**
 * Mimics the original game
 * @param cell
 */
export const colorMatch = (cell: Cell) => {
  switch (cell.bombCount) {
    case 1:
      return 'blue';
    case 2:
      return 'green';
    case 3:
      return 'red';
    case 4:
      return 'purple';
    case 5:
      return 'maroon';
    case 6:
      return 'darkcyan';
    default:
      return 'black';
  }
};
