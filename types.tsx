export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export enum CellState {
  Idle,
  Flagged,
  QMark,
  Revealed,
}

export class Case {
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
    this.bombCount = 0
  }
}

