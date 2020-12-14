export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Game: undefined;
  Rules: undefined;
  Credit: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabRulesParamList = {
  TabRulesScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export enum GameState {
  WaitingToPlay,
  Playing,
  Won,
  Lost,
}

export enum Difficulty {
  Easy,
  Medium,
  Hard,
}

export enum CellState {
  Idle,
  Flagged,
  QMark,
  Revealed,
  WronglyFlagged,
}

export class Cell {
  x: number;
  y: number;
  state: CellState;
  bomb: boolean;
  bombCount: number;

  constructor(x: number = 0, y: number = 0, bomb: boolean = false) {
    this.x = x;
    this.y = y;
    this.state = CellState.Idle;
    this.bomb = bomb;
    this.bombCount = 0;
  }
}

export interface ScoreLine {
  name: string;
  score: number;
  time: number;
  date: Date;
}
