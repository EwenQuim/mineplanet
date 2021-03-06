import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { ChooseLevel } from '../components/manager/ChooseLevel';
import NameField from '../components/name/NameField';
import { ScoreLineComponent } from '../components/scores/ScoreLine';
import { ScoresView } from '../components/scores/Scores';
import { Text, View } from '../components/Themed';
import { useStateContext } from '../state/state';
import { sharedStyles } from '../styles/sharedStyles';
import { Difficulty, ScoreLine, TabTwoParamList } from '../types';
import { getStoredName } from '../utils/storage';

type ScoresScreenNavigationProp = StackNavigationProp<TabTwoParamList>;

type Props = {
  navigation: ScoresScreenNavigationProp;
};

const fakeScore = {
  name: 'not ranked',
  score: 0,
  time: -1,
  date: new Date('0'),
  level: Difficulty.Easy
};

export default function TabTwoScreen({ navigation }: Props) {
  let [loading, setLoading] = useState(true);
  let [playerName, setPlayerName] = useState('');
  let [scores, setScores] = useState<ScoreLine[]>([]);
  let [myScore, setMyScore] = useState<ScoreLine>(fakeScore);
  let [myIndex, setMyIndex] = useState(0);

  const { state, dispatch } = useStateContext();
  const { difficulty } = state;

  useEffect(() => refreshName(), []); // Load first time
  useEffect(() => refreshScores(), [difficulty]);
  useEffect(() => getMyScore(), [playerName]);
  useEffect(() => getMyScore(), [scores]);
  useEffect(() => navigation.addListener('focus', () => refreshScores()), [
    navigation
  ]);

  const refreshScores = () => {
    getOnlineData();
  };

  const refreshName = () => {
    getStoredName().then((string) => {
      setPlayerName(string);
    });
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

  const getMyScore = () => {
    let nothingFound = true;
    scores
      .filter((score) => difficulty === score.level)
      .forEach((score, index) => {
        if (score.name === playerName) {
          setMyScore(score);
          setMyIndex(index);
          nothingFound = false;
        }
      });
    if (nothingFound) {
      setMyScore({ ...fakeScore, name: playerName, level: difficulty });
      setMyIndex(-1);
    }
  };

  return (
    <View style={sharedStyles.container}>
      <View style={sharedStyles.topBar}>
        <ChooseLevel playerName={playerName} />
        <Pressable style={sharedStyles.topButton} onPress={refreshScores}>
          <Feather name="refresh-ccw" size={18} color="grey" />
        </Pressable>
      </View>

      {loading ? <ActivityIndicator size="large" color="gray" /> : null}

      <ScoresView
        listToDisplay={scores}
        difficultySelected={difficulty}
        playerName={playerName}
      />

      <ScoreLineComponent
        score={myScore}
        playerName={playerName}
        index={myIndex}
      />

      <View style={sharedStyles.bottomBar}>
        <NameField refresh={() => refreshName()} />
        <View style={{ marginHorizontal: 20 }}></View>
        <Pressable
          onPress={() => navigation.navigate('TabTwoMyScores')}
          style={sharedStyles.navButton}
        >
          <Text>→ My scores</Text>
        </Pressable>
      </View>
    </View>
  );
}
