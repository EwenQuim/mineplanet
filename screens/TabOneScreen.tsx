import * as React from 'react';
import { Pressable, StyleSheet, Vibration } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Text, View } from '../components/Themed';
import StatsScreen from '../components/StatsScreen';
import Chess from '../components/game/Chess';
import EndView from '../components/EndView';
import Sep from '../components/Separator';

import { Cell, Difficulty, GameState } from '../types';
import Board from '../Board';

import { stringToDiff } from '../utils/difficultyString';
import vibrateOnEnd from '../utils/vibrateOnEnd';
import createBoard from '../utils/boardCreation';
import { useEffect, useState } from 'react';
import { displayTime } from '../utils/display';
import { Feather } from '@expo/vector-icons';
import { ChooseLevel } from '../components/manager/ChooseLevel';
import { useStateContext } from '../state/state';
import { getStoredName } from '../utils/storage';
import { sharedStyles } from '../styles/sharedStyles';

const useForceUpdate = () => {
  const [value, setValue] = useState(true); // integer state
  return () => setValue(!value); // update the state to force render
};

export const TabOneScreen = () => {
  // Define variables and state
  const forceUpdate = useForceUpdate();

  let [board, setBoard] = useState(new Board(8, 12, 15));
  let [seconds, setSeconds] = useState(0);
  let [timerRunning, setTimerRunning] = useState(false);
  let [playerName, setPlayerName] = useState('');

  const { state, dispatch } = useStateContext();
  const { difficulty } = state;

  // Timer tik-tok
  useEffect(() => {
    if (timerRunning) {
      let timer = setInterval(() => setSeconds(seconds++), 1000);
      return () => clearInterval(timer);
    }
  }, [timerRunning]);

  // Create new board
  const createNewBoard = () => {
    setBoard(createBoard(difficulty));
    setTimerRunning(false);
    setSeconds(0);
    getStoredName().then((string) => setPlayerName(string));
  };

  // New board on difficulty change
  useEffect(createNewBoard, [difficulty]);

  // Reveal cell
  const onPressAction = (cell: Cell) => {
    Vibration.vibrate(50);
    board.revealCell(cell.x, cell.y);
    forceUpdate();
    setTimerRunning(true);
    if (
      board.gameState === GameState.Won ||
      board.gameState === GameState.Lost
    ) {
      setTimerRunning(false);
    }
    vibrateOnEnd(board.gameState);
  };

  // Flag / QMark
  const onLongPressAction = (cell: Cell) => {
    Vibration.vibrate([0, 50, 50, 50]);
    board.flagCell(cell.x, cell.y);
    forceUpdate();
  };

  const _displayEndingScreen = () => {
    if (
      board.gameState === GameState.Won ||
      board.gameState === GameState.Lost
    ) {
      return (
        <EndView
          victory={board.gameState === GameState.Won}
          newGameButton={createNewBoard}
          board={board}
          seconds={seconds}
          difficulty={difficulty}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={sharedStyles.topBar}>
        <ChooseLevel playerName={playerName} />
        <Pressable style={sharedStyles.topButton} onPress={createNewBoard}>
          <Feather name="rotate-ccw" size={18} color="grey" />
        </Pressable>
      </View>

      <Sep />

      <StatsScreen board={board} />

      <Sep />

      <Chess
        board={board}
        onPress={onPressAction}
        onLongPress={onLongPressAction}
      />

      <Sep />

      <Text style={{ fontSize: 16, marginBottom: 15 }}>
        {displayTime(seconds)}
      </Text>

      {_displayEndingScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  }
});
