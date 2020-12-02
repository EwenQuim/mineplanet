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

  /**
   * Initialize the entire grid EXCEPT the bombs positions
   * (will be determined at the first player touch)
   */
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

  /**
   * Set the bombs positions (random except at the player's first touch)
   * @param avoidX
   * @param avoidY
   */
  dropBombs = (avoidX: number = 0, avoidY: number = 0): void => {
    let bombsDropped = 0;
    while (bombsDropped < this.bombsTotal) {
      let x = Math.floor(Math.random() * this.height);
      let y = Math.floor(Math.random() * this.width);

      if (
        !(Math.abs(x - avoidX) <= 1 && Math.abs(y - avoidY) <= 1) &&
        !this.grid[x][y].bomb
      ) {
        this.grid[x][y].bomb = true;
        bombsDropped++;
      }
    }
  };

  /**
   * Display all the bombs when a game is lost
   */
  explodesAllBombs = () => {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        let cell = this.grid[i][j];
        // We display all remaining bombs
        if (cell.bomb && cell.state === CellState.Idle) {
          this.grid[i][j].state = CellState.Revealed;
          // Show wrong flags
        } else if (!cell.bomb && cell.state === CellState.Flagged) {
          this.grid[i][j].state = CellState.WronglyFlagged;
        }
      }
    }
  };

  /**
   * Call the bomb count for each cell of the grid
   */
  countBombsWholeGrid = () => {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (!this.grid[i][j].bomb) {
          this.grid[i][j].bombCount = this.countBombsOneCell(i, j);
        } else {
          this.grid[i][j].bombCount = -1;
        }
      }
    }
  };

  /**
   * Count the numbers of neighbors that are bombs for a given cell (by its position)
   * @param x
   * @param y
   */
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

  /**
   * Reveals a cell given its position
   * If there is not bomb on neighbors, recursively discovers neighbors
   * @param x
   * @param y
   */
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
        this.explodesAllBombs();

        // else, and if it has 0 neighbors, let's clear the way recursively (Depth First Search-wise)
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

  /**
   * Put a (flag / question mark / nothing) on a cell
   * @param x
   * @param y
   */
  flagCell = (x: number, y: number): void => {
    switch (this.grid[x][y].state) {
      case CellState.Idle:
        this.grid[x][y].state = CellState.Flagged;
        this.flagsSet++;
        break;
      case CellState.Flagged:
        this.grid[x][y].state = CellState.QMark;
        this.flagsSet--;
        break;
      case CellState.QMark:
        this.grid[x][y].state = CellState.Idle;
        break;
    }
    console.log("Flagging cell", x, y);
  };
}
