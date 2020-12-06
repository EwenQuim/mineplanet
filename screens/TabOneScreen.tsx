import * as React from 'react';
import { Button, StyleSheet, Vibration } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { View } from '../components/Themed';
import StatsScreen from '../components/StatsScreen'
import Chess from '../components/Chess';
import EndView from '../components/EndView';

import { Cell, Difficulty, GameState } from '../types'
import Board from '../Board'

import { stringToDiff } from '../utils/difficultyString'



interface MainProps {
}

interface MainState {
  board: Board;
  difficulty: Difficulty
}


export class TabOneScreen extends React.Component<MainProps, MainState> {

  diffTemp = ""

  constructor(props: MainProps) {
    super(props);
    this.state = {
      board: new Board(8, 12, 16),
      difficulty: Difficulty.Medium
    }
    this.diffTemp = "Medium"
  }


  private createNewBoard = () => {

    switch (this.state.difficulty) {
      case Difficulty.Easy:
        this.setState({ board: new Board(8, 6, 6) });
        break;
      case Difficulty.Hard:
        this.setState({ board: new Board(12, 12, 28) })
        break;
      default:
        this.setState({ board: new Board(8, 12, 16) })
        break;
    }
    this.setState({ playing: true })

  }

  // Reveal
  private onPressAction = (cell: Cell) => {
    let newBoard = this.state.board;
    newBoard.revealCell(cell.x, cell.y) // and its neighbors if necessary

    switch (newBoard.gameState) {

      case GameState.Lost:
        Vibration.vibrate(2000)
        console.log("Defeat...");
        this.setState({ board: newBoard })
        break;

      case GameState.Won:
        Vibration.vibrate(Array(12).fill(100));
        console.log("Victory !");
        this.setState({ board: newBoard })
        break;

      default:
        this.setState({ board: newBoard }, () => Vibration.vibrate(50))
    }
  }

  // Flag / QMark
  private onLongPressAction = (cell: Cell) => {
    Vibration.vibrate([0, 50, 50, 50])
    let newBoard = this.state.board;
    newBoard.flagCell(cell.x, cell.y)
    this.setState(
      { board: newBoard }
    )
  }

  private _displayEndingScreen() {
    if (this.state.board.gameState === GameState.Won || this.state.board.gameState === GameState.Lost) {
      return (
        <EndView
          victory={this.state.board.gameState === GameState.Won}
          newGameButton={this.createNewBoard}
        />
      )
    }
  }

  private _displayStats() {
    if (true) {
      return (
        <StatsScreen board={this.state.board} />
      )
    }
  }

  private _displayGrid() {
    if (true) {
      return (
        <Chess
          board={this.state.board}
          onPress={this.onPressAction}
          onLongPress={this.onLongPressAction} />
      )
    }
  }

  private _displayOptions() {

    return (
      <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
        <Picker
          selectedValue={this.diffTemp}
          style={{ height: 50, width: 150, color: "grey" }}
          onValueChange={(itemValue, itemIndex) => {
            console.log("hi", itemValue, itemValue.toString(), itemIndex);

            this.diffTemp = itemValue.toString()
            this.setState({ difficulty: stringToDiff(this.diffTemp) }, () => this.createNewBoard());
          }
          }>
          <Picker.Item label="Easy" value={"Easy"} />
          <Picker.Item label="Medium" value={"Medium"} />
          <Picker.Item label="Hard" value={"Hard"} />
        </Picker>
        <Button title="New board" onPress={this.createNewBoard} />
      </View>
    )

  }

  componentDidMount() {
    this.createNewBoard()
  }

  render() {
    return (
      <View style={styles.container}>

        {this._displayOptions()}

        <View style={styles.separator} />

        {this._displayStats()}

        <View style={styles.separator} />

        {this._displayGrid()}


        {this._displayEndingScreen()}

      </View>
    )
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    backgroundColor: "#8888",
  },
});
