import { Case } from './types'

export default class Board {

    flagsTotal: number;
    flagsSet: number;

    grid: Case[][];


    constructor(flagsTotal: number = 10) {
        this.flagsSet = 0;
        this.flagsTotal = flagsTotal;
        this.grid = [];
    }

    initializeGrid = (
        width: number,
        height: number,
    ): void => {

        let droppedBombs = 0;
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

    dropBombs = (bombs: number, avoidX: number, avoidY: number): void => {
        let bombsDropped = 0
        while (bombsDropped < bombs) {

        }
    }

    countBombs = () => {

    }
}
