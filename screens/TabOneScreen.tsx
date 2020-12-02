import * as React from 'react';
import { Button, Easing, ScrollView, StyleSheet, FlatList, Modal, Alert, TouchableHighlight, Vibration, Pressable, Animated, EasingFunction, EasingStatic } from 'react-native';

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

  modalAnimation: any;
  animatedStyles: any;

  constructor(props: MainProps) {
    super(props);
    this.state = {
      board: undefined,
      playing: false,
      endingScreen: false
    }
    this.modalAnimation = {
      yPosition: new Animated.Value(0),
      width: new Animated.Value(200),
      height: new Animated.Value(200),
      opacity: new Animated.Value(0)
    }
    this.modalAnimation.opacity = this.modalAnimation.yPosition.interpolate({
      inputRange: [0, 300],
      outputRange: [0, 1]
    })
    this.modalAnimation.height = this.modalAnimation.width.interpolate({
      inputRange: [200, 280],
      outputRange: [200, 280]
    })

    this.animatedStyles = [
      styles.modalView,
      {
        bottom: this.modalAnimation.yPosition,
        opacity: this.modalAnimation.opacity,
        width: this.modalAnimation.width,
        height: this.modalAnimation.height,
      },
    ];
  }

  animate = () => {
    this.modalAnimation.yPosition.setValue(0);
    Animated.timing(this.modalAnimation.yPosition, {
      duration: 1000,
      easing: Easing.out(Easing.ease),
      toValue: 300,
      useNativeDriver: false,
    }).start();
    this.modalAnimation.width.setValue(200);
    Animated.sequence([
      Animated.timing(this.modalAnimation.width, {
        delay: 1000,
        duration: 200,
        easing: Easing.cubic,
        toValue: 280,
        useNativeDriver: false,
      }),
      Animated.timing(this.modalAnimation.width, {
        duration: 200,
        easing: Easing.cubic,
        toValue: 200,
        useNativeDriver: false,
      }
      )
    ]).start();

    // Animated.timing(this.modalAnimation.width, {
    //   delay: 1400,
    //   duration: 200,
    //   easing: Easing.cubic,
    //   toValue: 200,
    //   useNativeDriver: false,
    // }).start();
  };

  private createNewBoard = (): void => {
    let newBoard = new Board(10, 8, 15);
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
        console.log("animating def");
        this.animate()
        this.setState({ endingScreen: true });
        break;
      case GameState.Won:
        Vibration.vibrate(Array(12).fill(100));
        console.log("animating vic");
        this.animate()
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
        <Animated.View style={this.animatedStyles} >

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

        </Animated.View>
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

  private _displayStats() {
    if (this.state.playing) {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>

          <CellView
            cell={new Cell(0, 0)}
            pressAction={() => console.log('hi')}
            longPressAction={() => console.log('ho')} />

          <Text style={styles.infos}> {this.state.board.height * this.state.board.width - this.state.board.cellsRevealed - this.state.board?.bombsTotal} remaining - {this.state.board?.flagsSet ?? 0} 🚩 / {this.state.board?.bombsTotal ?? 0} 💣</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Button title="New board" onPress={this.createNewBoard} />
          <Button title="Log state" onPress={() => { console.log(this.state) }} />
        </View>

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
  centeredView: {
    flex: 1,
    marginVertical: 50,
    backgroundColor: "#0008",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    position: "absolute",
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
  },
  infos: {
    fontSize: 16,
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
