import * as React from 'react';
import { Button, StyleSheet, Vibration } from 'react-native';

import { Text, View } from '../components/Themed';
import Board from '../Board'
import Chess from './Chess';

import { Cell, GameState } from '../types'
import StatsScreen from './StatsScreen'
import EndView from './EndView';
import { useState } from 'react';

interface MainProps {
  //no props used : lists are stored in the state so we do not force rendering
}

interface MainState {
  board: Board;
  playing: boolean;
}


export function TabOneScreen() {

  let [board, setBoard] = useState(new Board())
  let [isPlaying, setIsPlaying] = useState(false)


  const createNewBoard = () => {
    setBoard(new Board(2, 3, 1))
    setIsPlaying(true)
  }

  // Reveal
  const onPressAction = (cell: Cell) => {

    let newBoard = Object.assign({}, { ...board, gameState: board.gameState });

    newBoard.revealCell(cell.x, cell.y) // and its neighbors if necessary

    console.log(newBoard);

    console.log("gameState", newBoard.gameState)
    console.log("cells", newBoard.cellsRevealed)

    switch (newBoard.gameState) {

      case GameState.Lost:
        Vibration.vibrate(2000)
        console.log("Defeat...");
        setBoard(newBoard)
        break;

      case GameState.Won:
        Vibration.vibrate(Array(12).fill(100));
        console.log("Victory !");
        setBoard(newBoard)
        break;

      default:
        Vibration.vibrate(50)
        setBoard(newBoard)

    }
  }

  // Flag / QMark
  const onLongPressAction = (cell: Cell) => {
    Vibration.vibrate([0, 50, 50, 50])
    let newBoard = Object.assign({}, board);
    newBoard.flagCell(cell.x, cell.y)
    setBoard(newBoard)
  }

  const _displayEndingScreen = () => {

    if (board?.gameState === GameState.Won || board?.gameState === GameState.Lost) {

      return (
        <EndView
          victory={board?.gameState === GameState.Won}
          newGameButton={createNewBoard}
        />
      )
    }
  }

  const _displayStats = () => {
    if (isPlaying) {
      return (
        <StatsScreen board={board} />
      )
    }
  }

  const _displayGrid = () => {
    if (isPlaying) {
      return (
        <Chess
          board={board}
          onPress={onPressAction}
          onLongPress={onLongPressAction} />
      )
    }
  }

  return (
    <View style={styles.container}>

      <Button title="New board" onPress={createNewBoard} />

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {_displayStats()}

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {_displayGrid()}

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {_displayEndingScreen()}

    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
