import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Board from '../Board';
import { sharedStyles } from '../styles/sharedStyles';
import { Difficulty, GameState, TabOneParamList } from '../types';
import { nameToColor } from '../utils/display';
import { scoreManager } from '../utils/scoresManager';
import { getStoredName } from '../utils/storage';
import { Text, View } from './Themed';

type GameScreenNavigationProp = StackNavigationProp<TabOneParamList>;

const EndView = ({
  newGameButton,
  analysingGameOnEnd,
  board,
  seconds,
  difficulty,
  name,
  navigation
}: {
  newGameButton: () => void;
  analysingGameOnEnd: () => void;
  board: Board;
  seconds: number;
  difficulty: Difficulty;
  name: string;
  navigation: GameScreenNavigationProp;
}) => {
  const victory = board.gameState === GameState.Won;

  useEffect(() => {
    if (victory) {
      getStoredName().then((name) => {
        scoreManager(board, seconds, difficulty, name);
      });
    }
  }, []);

  return (
    <Animatable.View
      style={styles.animatedFrame}
      animation={victory ? 'tada' : 'swing'}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          {victory ? 'You Won !' : 'Sorry, you lost...'}
        </Text>
        <Pressable
          style={[
            sharedStyles.navButton,
            { backgroundColor: nameToColor(name), marginVertical: 20 }
          ]}
          onPress={newGameButton}
        >
          <Text>Retry !</Text>
        </Pressable>

        <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
          <Pressable
            style={[sharedStyles.navButton, { marginHorizontal: 10 }]}
            onPress={analysingGameOnEnd}
          >
            <Text>See Game</Text>
          </Pressable>
          <Pressable
            style={[sharedStyles.navButton, { marginHorizontal: 10 }]}
            onPress={() => navigation.navigate('TabTwoScreen')}
          >
            <Text>Scores</Text>
          </Pressable>
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  animatedFrame: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  container: {
    flex: 1,
    borderRadius: 10,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: { fontWeight: 'bold' }
});

export default EndView;
