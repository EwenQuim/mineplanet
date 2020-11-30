import * as React from 'react';
import { Button, ScrollView, StyleSheet, FlatList, Modal, Alert, TouchableHighlight, Vibration, Pressable } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Board from '../Board'
import Chess from './Chess';

import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState, BoardState } from '../store/types';
import { revealCell } from '../store/board/actions'
import CellView from './CellView';
import { Cell, GameState } from '../types'

interface MainProps {
  //no props used : lists are stored in the state so we do not force rendering
}

interface MainState {
  board: Board;
  playing: boolean;
  endingScreen: boolean;
}


export class TabOneScreen extends React.Component<MainProps, MainState> {

  constructor(props: MainProps) {
    super(props);
    this.state = { board: undefined, playing: false, endingScreen: false }
  }


  private createNewBoard = (): void => {

    let newBoard = new Board(3, 6, 3);
    this.setState(
      { board: newBoard, playing: true, endingScreen: false })

  }

  // Reveal
  private onPressAction = (cell: Cell) => {
    let newBoard = this.state.board;
    newBoard.revealCell(cell.x, cell.y)
    switch (newBoard.gameState) {
      case GameState.Lost:
        Vibration.vibrate(2000)
        this.setState({ endingScreen: true });
        break;
      case GameState.Won:
        this.setState({ endingScreen: true });
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

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.endingScreen}
        onRequestClose={() => {
          this.setState({ endingScreen: false });
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {this.state.board?.gameState === GameState.Won
                ? "You Won !"
                : "Sorry, you lost..."}
            </Text>

            <Pressable
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this.createNewBoard();
                this.setState({ endingScreen: false });
              }}
            >
              <Text style={styles.textStyle}>
                Play again !
              </Text>
            </Pressable>

          </View>
        </View>
      </Modal>
    )
  }

  private _triggerEndingScreen() {

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
      <View style={(this.state.playing) ? styles.container : styles.waitingToPlay}>
        <Text style={styles.title}>MineSweeper</Text>
        <View style={{ flexDirection: "row" }}>
          <Button title="New board" onPress={this.createNewBoard} />
          <Button title="Log state" onPress={() => { console.log(this.state) }} />
          <Button title="Force" onPress={() => this.forceUpdate()} />
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

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
  waitingToPlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "red"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#222",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: "black",
    marginBottom: 15,
    textAlign: "center"
  }

});

const mapStateToComponentProps = (state: BoardState) => {
  return {
    board: state.board
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClick: (i: number, j: number) => {
    dispatch(revealCell(i, j));
  },
  // other callbacks go here...
});

/*
const TabOneScr = connect(
  mapStateToComponentProps,
  mapDispatchToProps
)(TabOne);


*/
