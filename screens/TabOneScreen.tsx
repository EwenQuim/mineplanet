import * as React from 'react';
import { Button, ScrollView, StyleSheet, FlatList } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Board from '../Board'
import Chess from './Chess';

import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState, BoardState } from '../store/types';
import { revealCell } from '../store/board/actions'
import CellView from './CellView';
import { Cell } from '../types'

interface MainProps {
  //no props used : lists are stored in the state so we do not force rendering
}

interface MainState {
  board: Board;
  playing: boolean
}


export class TabOneScreen extends React.Component<MainProps, MainState> {

  constructor(props: MainProps) {
    super(props);
    this.state = { board: undefined, playing: false }
  }


  private createBlankBoard = (): void => {

    let newBoard = new Board(5, 5, 3);
    this.setState(
      { board: newBoard, playing: true })

  }

  // Reveal
  private onPressAction = (cell: Cell) => {
    let newBoard = this.state.board;
    newBoard.revealCell(cell.x, cell.y)
    this.setState(
      { board: newBoard }
    )
  }

  // Flag / QMark
  private onLongPressAction = (cell: Cell) => {
    let newBoard = this.state.board;
    newBoard.flagCell(cell.x, cell.y)
    this.setState(
      { board: newBoard }
    )
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
          <Button title="New board" onPress={this.createBlankBoard} />
          <Button title="Log state" onPress={() => { console.log(this.state) }} />
          <Button title="Force" onPress={() => this.forceUpdate()} />
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        {this._displayGrid()}



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
