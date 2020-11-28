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

  constructor(props: MainProps) {
    super(props);
  }


  private createBlankBoard = (): void => {
    this.setState({ board: new Board() }, () => this.state.board.initializeGrid(5, 2, 3))
    this.playing = true
  }


  private _displayGrid() {
    if (this.playing) {
      return (
        <ScrollView contentContainerStyle={{ height: 1000 }}>
          <ScrollView horizontal contentContainerStyle={{ width: 1000 }}>
            <Chess board={this.state.board} />
          </ScrollView>
        </ScrollView>)
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>MineSweeper</Text>
        <Button title="Create board !" onPress={this.createBlankBoard} />
        <Button title="Log state" onPress={() => console.log(this.state)} />
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
