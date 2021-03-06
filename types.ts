export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Game: undefined;
  Options: undefined;
  Scores: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  TabTwoScreen: undefined;
};

export type TabOptionsParamList = {
  TabOptionsScreen: undefined;
  TabRulesScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
  TabTwoMyScores: undefined;
};

export enum PressTime {
  Short,
  Long,
  None
}

export enum GameState {
  WaitingToPlay,
  Playing,
  Won,
  Lost,
  Analyzing
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
  Extreme = 'Extreme'
}

export enum CellState {
  Idle,
  Flagged,
  QMark,
  Revealed,
  WronglyFlagged
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
  level: Difficulty;
}
