import { Cell, CellState, GameState } from "./types";

export default class Board {
  bombsTotal: number;
  bombsRemaining: number;
  flagsSet: number;
  cellsRevealed: number;
  width: number;
  height: number;
  gameState: GameState;

  grid: Cell[][];

  constructor(width = 10, height = 10, bombsTotal = 10) {
    this.bombsTotal = bombsTotal;
    this.bombsRemaining = 0;
    this.flagsSet = 0; // differ from the previous as the player can be wrong
    this.cellsRevealed = 0; // differ from the previous as the player can be wrong
    this.height = height;
    this.width = width;
    this.gameState = GameState.WaitingToPlay;
    this.grid = [];
    this.initializeGrid();
  }

  initializeGrid = () => {
    let grid = Array<Array<Cell>>();
    for (let i = 0; i < this.height; i++) {
      // adding a line
      let row = new Array<Cell>();
      for (let j = 0; j < this.width; j++) {
        row.push(new Cell(i, j));
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
    for (const i of [x - 1, x, x + 1]) {
      for (const j of [y - 1, y, y + 1]) {
        if (0 <= i && i < this.height && 0 <= j && j < this.width) {
          if (this.grid[i][j].bomb) {
            bombCount += 1;
          }
        }
      }
    }
    return bombCount;
  };

  revealCell = (x: number, y: number): void => {
    // On first touch, generate the bombs so the player can't lose immediately
    // Reduce frustration
    if (this.gameState === GameState.WaitingToPlay) {
      this.gameState = GameState.Playing;
      this.dropBombs(x, y);
      this.countBombsWholeGrid();
    }

    // Can be revealed only if Idle (avoiding missclick, flags and infinite loops)
    if (this.grid[x][y].state === CellState.Idle) {
      // Reveal Cell
      this.grid[x][y].state = CellState.Revealed;
      this.cellsRevealed++;

      // Checking if the game is won
      if (this.cellsRevealed === this.width * this.height - this.bombsTotal) {
        this.gameState = GameState.Won;
      }

      // If it's a bomb, BOOM
      if (this.grid[x][y].bomb) {
        this.gameState = GameState.Lost;

        // else, and if it has 0 neighbours, let's clear the way recursively (Depth First Search-wise)
      } else if (this.grid[x][y].bombCount === 0) {
        for (const i of [x - 1, x, x + 1]) {
          for (const j of [y - 1, y, y + 1]) {
            //boundaries
            if (0 <= i && i < this.height && 0 <= j && j < this.width) {
              this.revealCell(i, j);
            }
          }
        }
      }

      console.log("Revealing cell", x, y);
    }
  };

  flagCell = (x: number, y: number): void => {
    switch (this.grid[x][y].state) {
      case CellState.Idle:
        this.grid[x][y].state = CellState.Flagged;
        break;
      case CellState.Flagged:
        this.grid[x][y].state = CellState.QMark;
        break;
      case CellState.QMark:
        this.grid[x][y].state = CellState.Idle;
        break;
    }
    console.log("Flagging cell", x, y);
  };
}
