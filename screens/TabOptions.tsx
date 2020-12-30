import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Text, View } from '../components/Themed';
import {
  Difficulty,
  ScoreLine,
  TabOptionsParamList,
  TabTwoParamList
} from '../types';
import { stringToDiff } from '../utils/difficultyString';
import { getStoredName } from '../utils/storage';
import NameField from '../components/name/NameField';
import { ScoresView } from '../components/scores/Scores';
import { Feather } from '@expo/vector-icons';
import { nameToColor } from '../utils/display';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChooseLevel } from '../components/manager/ChooseLevel';
import { useStateContext } from '../state/state';
import { ScoreLineComponent } from '../components/scores/ScoreLine';
import { sharedStyles } from '../styles/sharedStyles';

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
