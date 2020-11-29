import * as React from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Board from '../Board'
import Chess from './Chess';
import { connect } from 'react-redux'


interface MainProps {
  //no props used : lists are stored in the state so we do not force rendering
}

interface MainState {
  board: Board;
}


export class TabOneScreen extends React.Component<MainProps, MainState> {
  playing = false

  constructor(props: MainProps) {
    super(props);
  }


  private createBlankBoard = (): void => {
    this.setState(
      { board: new Board() },
      () => {
        this.state.board.dropBombs();
        this.state.board.countBombsWholeGrid();
        this.playing = true;
      })

  }


  private _displayGrid() {
    if (this.playing) {
      return (
        <ScrollView horizontal contentContainerStyle={{ width: 500 }}>
          <Chess board={this.state.board} />
        </ScrollView>
      )

    }

  }

  render() {
    return (
      <View style={(this.playing) ? styles.container : styles.waitingToPlay}>
        <Text style={styles.title}>MineSweeper</Text>
        <View style={{ flexDirection: "row" }}>
          <Button title="Create board !" onPress={this.createBlankBoard} />
          <Button title="Log tab state" onPress={() => {
            console.log(this.state)
          }} />
          <Button title="Log else" onPress={() => console.log(this.playing)} />
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

const mapStateToComponentProps = (state) => {
  return {
    board: state.board
  }
}


export default connect(mapStateToComponentProps)(TabOneScreen)