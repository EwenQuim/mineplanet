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
  dummy: number
}


export class TabOneScreen extends React.Component<MainProps, MainState> {
  playing = false
  touch = 0

  constructor(props: MainProps) {
    super(props);
    this.state = { board: new Board(), dummy: 0 }
  }


  private createBlankBoard = (): void => {

    let newBoard = new Board();
    newBoard.dropBombs()
    newBoard.countBombsWholeGrid()
    let newDummy = this.state.dummy + 1
    this.setState(
      { board: newBoard, dummy: newDummy },
      () => {
        console.log("Creating new board");
        console.log(this.state.board.grid);
        console.log("Created new board", this.state.dummy);

        this.playing = true;
      })

  }

  private pressAction = (cell: Cell) => {
    console.log(cell, 'touch', this.touch)
    this.touch = (this.touch + 1) || 0
    let newBoard = this.state.board;
    newBoard.revealCell(cell.x, cell.y)
    this.setState(
      { board: newBoard }
    )

  }


  private _displayGrid() {
    if (this.playing) {
      return (
        <ScrollView horizontal contentContainerStyle={{ width: 500 }}>
          <View style={styles.container}>

            <Button title="Log board variable" onPress={() => console.log(this.state.board)} />
            <View >
              <FlatList
                data={this.state.board.grid}
                extraData={this.state.board.grid}
                keyExtractor={item => item[0].x.toString() + "," + item[0].y.toString()}
                renderItem={rowItem => {
                  return (
                    <FlatList
                      style={{ flex: 1, flexDirection: "row" }}
                      data={rowItem.item}
                      extraData={rowItem.item}
                      keyExtractor={item => item.x.toString() + "," + item.y.toString()}
                      renderItem={({ item: cellItem }: { item: Cell }) => {

                        return (<CellView cell={cellItem} pressAction={() => this.pressAction(cellItem)} />)

                      }}
                    />
                  )
                }}

              />
            </View>

          </View>
        </ScrollView>
      )

    }

  }

  render() {
    return (
      <View style={(this.playing) ? styles.container : styles.waitingToPlay}>
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
