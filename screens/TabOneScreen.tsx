import * as React from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Board from '../Board'
import Chess from './Chess';

interface MainProps {
  //no props used : lists are stored in the state so we do not force rendering
}

interface MainState {
  board: Board;
}


export class TabOneScreen extends React.Component<MainProps, MainState> {
  searchedText = ""
  playing = false
  height = 0
  width = 0

  constructor(props: MainProps) {
    super(props);
  }


  private createBlankBoard = (): void => {
    this.setState(
      { board: new Board() },
      () => {
        this.state.board.initializeGrid(3, 2, 3);
        this.playing = true;
        this.height = 500;
        this.width = 500;
      })

  }


  private _displayGrid() {
    if (this.playing) {
      return (
        <ScrollView contentContainerStyle={{ height: this.height }}>
          <ScrollView horizontal contentContainerStyle={{ width: this.width }}>
            <Chess board={this.state.board} />
          </ScrollView>
        </ScrollView>)
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>MineSweeper</Text>
        <View style={{ flexDirection: "row" }}>
          <Button title="Create board !" onPress={this.createBlankBoard} />
          <Button title="Log tab state" onPress={() => console.log(this.state)} />
          <Button title="Log else" onPress={() => console.log(this.playing, this.height, this.width)} />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
