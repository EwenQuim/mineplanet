import { Case } from "./types";

export default class Board {
    flagsTotal: number;
    flagsSet: number;
    bombsTotal: number;
    width: number;
    height: number;

    grid: Case[][];

    constructor(flagsTotal: number = 10, bombsTotal: number = 10, height = 10, width = 10) {
        this.flagsSet = 0;
        this.flagsTotal = flagsTotal;
        this.grid = [];
        this.bombsTotal = bombsTotal;
        this.height = height;
        this.width = width;

    }

    initializeGrid = (width: number, height: number): void => {
        let grid = Array<Array<Case>>();
        for (let j = 0; j < height; j++) {
            let row: Case[] = new Array<Case>();
            for (let i = 0; i < width; i++) {
                row.push(new Case(i, j));
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
                this.grid[i][j].bombCount = this.countBombsOneCell(i, j)
            }
        }
    };

    countBombsOneCell = (x: number, y: number): number => {
        let bombCount = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (0 <= i && i < this.width && 0 <= j && j < this.height) {
                    if (this.grid[i][j] === this.grid[x][y]) {
                        bombCount++
                    }
                }
            }
        }
        return bombCount
    }
}
