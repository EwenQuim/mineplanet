import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useStateContext } from '../state/state';
import { sharedStyles } from '../styles/sharedStyles';
import { Difficulty, ScoreLine, TabOptionsParamList } from '../types';

type OptionsScreenNavigationProp = StackNavigationProp<TabOptionsParamList>;

type Props = {
  navigation: OptionsScreenNavigationProp;
};

const fakeScore = {
  name: 'not ranked',
  score: 0,
  time: 0,
  date: new Date(),
  level: Difficulty.Easy
};

export default function TabOptions({ navigation }: Props) {
  let [loading, setLoading] = useState(true);
  let [playerName, setPlayerName] = useState('');
  let [scores, setScores] = useState<ScoreLine[]>([]);
  let [myScore, setMyScore] = useState<ScoreLine>(fakeScore);
  let [myIndex, setMyIndex] = useState(0);

  const { state, dispatch } = useStateContext();
  const { difficulty } = state;

  return (
    <View style={sharedStyles.container}>
      <View style={sharedStyles.bottomBar}>
        <Pressable
          onPress={() => navigation.navigate('TabRulesScreen')}
          style={sharedStyles.navButton}
        >
          <Text>Rules</Text>
        </Pressable>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  topBar: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  bottomBar: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  }
});
