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
      return '#59F'; // blue
    case 2:
      return 'yellowgreen'; // green
    case 3:
      return '#F30'; // red
    case 4:
      return '#87E'; //purple
    case 5:
      return 'sienna'; // brown
    case 6:
      return 'darkcyan';
    default:
      return '#59F';
  }
};
