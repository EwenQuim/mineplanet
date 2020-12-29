import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  Pressable,
  StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Text, View } from '../components/Themed';
import { Difficulty, ScoreLine } from '../types';
import { stringToDiff } from '../utils/difficultyString';
import Sep from '../components/Separator';
import {
  deleteLocalScores,
  getLocalScores,
  getStoredName
} from '../utils/storage';
import NameField from '../components/name/NameField';
import { ScoresView } from '../components/Scores';
import ModalDeleteScores from '../components/manager/EraseScores';
import { Feather } from '@expo/vector-icons';
import { nameToColor } from '../utils/display';

export default function TabTwoScreen({ navigation }) {
  let [difficultySelected, setDifficultySelected] = useState(Difficulty.Medium);
  let [loading, setLoading] = useState(true);
  let [playerName, setPlayerName] = useState('');
  let [scores, setScores] = useState<ScoreLine[]>([]);

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

  const _displayOptions = () => {
    let nameColor = nameToColor(playerName);
    return (
      <View style={{ justifyContent: 'center' }}>
        <Picker
          selectedValue={difficultySelected}
          style={{ height: 50, width: 125, color: nameColor }}
          onValueChange={(itemValue, itemIndex) => {
            setDifficultySelected(stringToDiff(itemValue.toString()));
          }}
        >
          <Picker.Item label="Easy" value={Difficulty.Easy} />
          <Picker.Item label="Medium" value={Difficulty.Medium} />
          <Picker.Item label="Hard" value={Difficulty.Hard} />
          <Picker.Item label="Extreme" value={Difficulty.Extreme} />
        </Picker>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {_displayOptions()}
        <Pressable onPress={refresh}>
          <Feather name="refresh-ccw" size={18} color="white" />
        </Pressable>
      </View>

      {loading ? <ActivityIndicator size="large" color="gray" /> : null}

      <ScoresView
        listToDisplay={scores}
        difficultySelected={difficultySelected}
        playerName={playerName}
      />

      <View
        style={{
          height: 32,
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15
        }}
      >
        <NameField />
        <View style={{ marginHorizontal: 20 }}></View>
        <Pressable
          onPress={() => navigation.navigate('TabTwoMyScores')}
          style={{ backgroundColor: '#8888', borderRadius: 4, padding: 5 }}
        >
          <Text>→ my scores</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});
