import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Text, View } from '../components/Themed';
import { Difficulty, ScoreLine, TabTwoParamList } from '../types';
import { stringToDiff } from '../utils/difficultyString';
import { getStoredName } from '../utils/storage';
import NameField from '../components/name/NameField';
import { ScoresView } from '../components/scores/Scores';
import { Feather } from '@expo/vector-icons';
import { nameToColor } from '../utils/display';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChooseLevel } from '../components/manager/ChooseLevel';
import { useStateContext } from '../state/state';

type ScoresScreenNavigationProp = StackNavigationProp<TabTwoParamList>;

type Props = {
  navigation: ScoresScreenNavigationProp;
};

export default function TabTwoScreen({ navigation }: Props) {
  let [difficultySelected, setDifficultySelected] = useState(Difficulty.Medium);
  let [loading, setLoading] = useState(true);
  let [playerName, setPlayerName] = useState('');
  let [scores, setScores] = useState<ScoreLine[]>([]);

  const { state, dispatch } = useStateContext();
  const { difficulty } = state;

  // Load first time
  useEffect(() => refresh(), []);

  // Load when difficulty is changed
  useEffect(() => refresh(), [difficultySelected]);

  const refresh = () => {
    getOnlineData();
    getStoredName().then((string) => setPlayerName(string));
  };

  const getOnlineData = () => {
    setLoading(true);
    axios
      .get('https://minebackend.herokuapp.com/leaderboard', {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        setScores(response.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <ChooseLevel playerName="Ewen" />
        <Pressable onPress={refresh}>
          <Feather name="refresh-ccw" size={18} color="grey" />
        </Pressable>
      </View>

      {loading ? <ActivityIndicator size="large" color="gray" /> : null}

      <ScoresView
        listToDisplay={scores}
        difficultySelected={difficulty}
        playerName={playerName}
      />

      <View style={styles.bottomBar}>
        <NameField refresh={() => refresh()} />
        <View style={{ marginHorizontal: 20 }}></View>
        <Pressable
          onPress={() => navigation.navigate('TabTwoMyScores')}
          style={styles.navButton}
        >
          <Text>→ my scores</Text>
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
  },
  navButton: {
    backgroundColor: '#8888',
    borderRadius: 4,
    padding: 5
  }
});
