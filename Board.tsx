import { Cell } from "./types";

export default class Board {

    flagsSet: number;
    bombsTotal: number;
    bombsRemaining: number;
    width: number;
    height: number;

    grid: Cell[][];

    constructor(width = 10, height = 10, bombsTotal = 10) {
        this.grid = [];
        this.bombsTotal = bombsTotal;
        this.bombsRemaining = 0;
        this.flagsSet = 0; // differ from the previous as the player can be wrong
        this.height = height;
        this.width = width;
        this.initializeGrid();

    }

    initializeGrid = () => {
        let grid = Array<Array<Cell>>();
        for (let j = 0; j < this.height; j++) {
            let row: Cell[] = new Array<Cell>();
            for (let i = 0; i < this.width; i++) {
                row.push(new Cell(i, j));
            }
            grid.push(row);
        }

        this.grid = grid;
    };

    dropBombs = (
        avoidX: number = 0,
        avoidY: number = 0,
    ): void => {
        let bombsDropped = 0;
        while (bombsDropped < this.bombsTotal) {
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);

            if (!(Math.abs(x - avoidX) <= 1 && Math.abs(y - avoidY) <= 1) && !this.grid[x][y].bomb) {
                this.grid[x][y].bomb = true;
                bombsDropped++;
            }
        }
    };

    countBombsWholeGrid = () => {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.width; j++) {
                if (!this.grid[i][j].bomb) {
                    this.grid[i][j].bombCount = this.countBombsOneCell(i, j)
                } else {
                    this.grid[i][j].bombCount = -1
                }

            }
        }
    };

    countBombsOneCell = (x: number, y: number): number => {
        let bombCount = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let [iWatch, jWatch] = [i + x, j + y]
                if (0 <= iWatch && iWatch < this.width && 0 <= jWatch && jWatch < this.height) {
                    if (this.grid[iWatch][jWatch].bomb) {
                        bombCount += 1
                    }
                }
            }
        }
        return bombCount
    }
}
