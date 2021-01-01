import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Board from '../Board';
import EndView from '../components/EndView';
import Chess from '../components/game/Chess';
import { ChooseLevel } from '../components/manager/ChooseLevel';
import Sep from '../components/Separator';
import StatsScreen from '../components/StatsScreen';
import { Text, View } from '../components/Themed';
import { vibrateOnTouch } from '../hooks/useVibrations';
import { useStateContext } from '../state/state';
import { sharedStyles } from '../styles/sharedStyles';
import { Cell, GameState, PressTime, TabOneParamList } from '../types';
import createBoard from '../utils/boardCreation';
import { displayTime } from '../utils/display';
import { getStoredName, getVibrations } from '../utils/storage';

const useForceUpdate = () => {
  const [value, setValue] = useState(true); // integer state
  return () => setValue(!value); // update the state to force render
};

type GameScreenNavigationProp = StackNavigationProp<TabOneParamList>;

type Props = {
  navigation: GameScreenNavigationProp;
};

export const TabOneScreen = ({ navigation }: Props) => {
  // Define variables and state
  const forceUpdate = useForceUpdate();

  let [board, setBoard] = useState(new Board(8, 12, 15));
  let [seconds, setSeconds] = useState(0);
  let [timerRunning, setTimerRunning] = useState(false);
  let [playerName, setPlayerName] = useState('');
  let [isVibrating, setIsVibrating] = useState(true);

  const { state, dispatch } = useStateContext();
  const { difficulty } = state;

  // Updates name and vibrations to state from storage on screen focus
  useEffect(
    () =>
      navigation.addListener('focus', () => {
        getStoredName().then((string) => setPlayerName(string));
        getVibrations().then((boolean) => setIsVibrating(boolean));
      }),
    [navigation]
  );

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
    vibrateOnTouch(isVibrating, PressTime.Short);
    board.revealCell(cell.x, cell.y);
    forceUpdate();
    setTimerRunning(true);
    if (
      board.gameState === GameState.Won ||
      board.gameState === GameState.Lost
    ) {
      setTimerRunning(false);
    }
    vibrateOnTouch(isVibrating, PressTime.None, board.gameState);
  };

  // Flag / QMark
  const onLongPressAction = (cell: Cell) => {
    vibrateOnTouch(isVibrating, PressTime.Long);
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
          navigation={navigation}
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
