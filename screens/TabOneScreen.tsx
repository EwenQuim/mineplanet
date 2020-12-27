import * as React from 'react';
import { Button, StyleSheet, Vibration } from 'react-native';
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
import { displayTime } from '../utils/displayTime';

const useForceUpdate = () => {
  const [value, setValue] = useState(true); // integer state
  return () => setValue(!value); // update the state to force render
};

export const TabOneScreen = () => {
  // Define variables and state
  const forceUpdate = useForceUpdate();

  let [board, setBoard] = useState(new Board(8, 12, 15));
  let [difficulty, setDifficulty] = useState(Difficulty.Medium);
  let [seconds, setSeconds] = useState(0);
  let [timerRunning, setTimerRunning] = useState(false);

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

  const _displayOptions = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row'
        }}
      >
        <Picker
          selectedValue={difficulty}
          style={{ height: 50, width: 150, color: 'grey' }}
          onValueChange={(itemValue, itemIndex) => {
            setDifficulty(stringToDiff(itemValue.toString()));
          }}
        >
          <Picker.Item label="Easy" value={Difficulty.Easy} />
          <Picker.Item label="Medium" value={Difficulty.Medium} />
          <Picker.Item label="Hard" value={Difficulty.Hard} />
          <Picker.Item label="Extreme" value={Difficulty.Extreme} />
        </Picker>
        <Button title="New Game" onPress={createNewBoard} />
      </View>
    );
  };

  //componentDidMount() { createNewBoard() }

  return (
    <View style={styles.container}>
      {_displayOptions()}

      <Sep />

      <StatsScreen board={board} />

      <Sep />

      <Chess
        board={board}
        onPress={onPressAction}
        onLongPress={onLongPressAction}
      />

      <Sep />

      <Text style={{ color: 'white', fontSize: 16, marginBottom: 15 }}>
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
