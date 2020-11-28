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

export enum CaseState {
  Idle,
  Flagged,
  QMark,
  Revealed,
}

export class Case {
  x: number;
  y: number;
  state: CaseState;
  bomb: boolean;

  constructor(x: number = 0, y: number = 0, bomb: boolean = false) {
    this.x = x;
    this.y = y;
    this.state = CaseState.Idle;
    this.bomb = bomb;
  }
}

