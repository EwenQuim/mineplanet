import * as React from 'react';
import { Button, Easing, StyleSheet, Vibration, Pressable, Animated } from 'react-native';

import { Text, View } from '../components/Themed';
import Board from '../Board'
import Chess from './Chess';

import CellView from '../components/CellView';
import { Cell, GameState } from '../types'
import StatsScreen from './StatsScreen'
import EndView from './EndView';

interface MainProps {
  //no props used : lists are stored in the state so we do not force rendering
}

interface MainState {
  board: Board;
  playing: boolean;
  endingScreen: boolean;
}


export class TabOneScreen extends React.Component<MainProps, MainState> {

  modalAnimation: any;
  comingFromTheBottom: any;
  zoomingFrame: any;

  constructor(props: MainProps) {
    super(props);
    this.state = {
      board: undefined,
      playing: false,
      endingScreen: false
    }

  }


  private createNewBoard = (): void => {
    console.log('hiii');

    let newBoard = new Board(8, 10, 2);
    this.setState(
      { board: newBoard, playing: true, endingScreen: false })
  }

  // Reveal
  private onPressAction = (cell: Cell) => {
    let newBoard = this.state.board;
    newBoard.revealCell(cell.x, cell.y) // and its neighbors if necessary
    switch (newBoard.gameState) {

      case GameState.Lost:
        Vibration.vibrate(2000)
        console.log("Defeat...");
        //this.animate()
        this.setState({ endingScreen: true });
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

    if (this.state.board?.gameState === GameState.Won || this.state.board?.gameState === GameState.Lost) {

      return (
        <EndView
          victory={this.state.board?.gameState === GameState.Won}
          newGame={this.createNewBoard}
        />
      )
    }
  }

  private _displayStats() {
    if (this.state.playing) {
      return (
        <StatsScreen board={this.state.board} />
      )
    }
  }

  private _displayGrid() {
    if (this.state.playing) {
      return (
        <Chess
          board={this.state.board}
          onPress={this.onPressAction}
          onLongPress={this.onLongPressAction} />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Button title="New board" onPress={this.createNewBoard} />

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        {this._displayStats()}

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        {this._displayGrid()}

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  blankFullScreen: {
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0000",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "lightgrey",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "red",
    alignItems: "center",
    shadowColor: "#222",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalViewWin: {
    borderColor: "green"
  },
  zoomingFrameCenterView: {
    flex: 1,
    backgroundColor: "#0000",
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: "black",
    marginBottom: 15,
    textAlign: "center"
  },
});
