import { Cell, CellState, GameState } from "./types";

export default class Board {
  flagsSet: number;
  bombsTotal: number;
  bombsRemaining: number;
  width: number;
  height: number;
  gameState: GameState;

  grid: Cell[][];

  constructor(width = 10, height = 10, bombsTotal = 10) {
    this.grid = [];
    this.bombsTotal = bombsTotal;
    this.bombsRemaining = 0;
    this.flagsSet = 0; // differ from the previous as the player can be wrong
    this.height = height;
    this.width = width;
    this.gameState = GameState.Playing;
    this.initializeGrid();
  }

  initializeGrid = () => {
    let grid = Array<Array<Cell>>();
    for (let j = 0; j < this.height; j++) {
      let row: Cell[] = new Array<Cell>();
      for (let i = 0; i < this.width; i++) {
        row.push(new Cell(j, i));
      }
      grid.push(row);
    }

    this.grid = grid;
  };

  dropBombs = (avoidX: number = 0, avoidY: number = 0): void => {
    let bombsDropped = 0;
    while (bombsDropped < this.bombsTotal) {
      let x = Math.floor(Math.random() * this.width);
      let y = Math.floor(Math.random() * this.height);

      if (
        !(Math.abs(x - avoidX) <= 1 && Math.abs(y - avoidY) <= 1) &&
        !this.grid[x][y].bomb
      ) {
        this.grid[x][y].bomb = true;
        bombsDropped++;
      }
    }
  };

  countBombsWholeGrid = () => {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.width; j++) {
        if (!this.grid[i][j].bomb) {
          this.grid[i][j].bombCount = this.countBombsOneCell(i, j);
        } else {
          this.grid[i][j].bombCount = -1;
        }
      }
    }
  };

  countBombsOneCell = (x: number, y: number): number => {
    let bombCount = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let [iWatch, jWatch] = [i + x, j + y];
        if (
          0 <= iWatch &&
          iWatch < this.width &&
          0 <= jWatch &&
          jWatch < this.height
        ) {
          if (this.grid[iWatch][jWatch].bomb) {
            bombCount += 1;
          }
        }
      }
    }
    return bombCount;
  };

  revealCell = (x: number, y: number): void => {
    console.log("Revealing cell", x, y);

    // Can be revealed only if Idle (avoiding missclick and infinite loops)
    if (this.grid[x][y].state === CellState.Idle) {
      // Reveal Cell
      this.grid[x][y].state = CellState.Revealed;

      // If it's a bomb, BOOM
      if (this.grid[x][y].bomb) {
        this.gameState = GameState.Lost;

        // else, and if it has 0 neighbours, let's clear the way recursively (Depth First Search-wise)
      } else if (this.grid[x][y].bombCount === 0) {
        for (const i of [x - 1, x, x + 1]) {
          for (const j of [y - 1, y, y + 1]) {
            //boundaries
            if (0 <= i && i < this.width && 0 <= j && j < this.height) {
              this.revealCell(i, j);
            }
          }
        }
      }
    }
  };
}
