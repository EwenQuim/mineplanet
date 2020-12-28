import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Pressable, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Text, View } from '../components/Themed';
import { Difficulty, ScoreLine } from '../types';
import { stringToDiff } from '../utils/difficultyString';
import Sep from '../components/Separator';
import { deleteLocalScores, getLocalScores } from '../utils/storage';
import NameField from '../components/name/NameField';
import { ScoresView } from '../components/Scores';

export default function TabTwoScreen() {
  let [difficultySelected, setDifficultySelected] = useState(Difficulty.Medium);
  let [loading, setLoading] = useState(true);
  let [scores, setScores] = useState<ScoreLine[]>([]);
  let [localScores, setLocalScores] = useState<ScoreLine[]>([]);

  // Load first time
  useEffect(() => {
    getOnlineData();
    getLocalData();
    console.log('get data');
  }, []);

  // Load when difficulty is changed
  useEffect(() => {
    getOnlineData();
    getLocalData();
    console.log('get data online & offline');
  }, [difficultySelected]);

  const getOnlineData = () => {
    console.log('fetching data');
    setLoading(true);
    axios
      .get('https://minebackend.herokuapp.com/leaderboard', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setScores(response.data);
        setLoading(false);
        console.log('data fetched');
      })
      .catch((err) => console.error(err));
  };

  const getLocalData = async () => {
    const data = await getLocalScores();
    setLocalScores(data);
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
          selectedValue={difficultySelected}
          style={{ height: 50, width: 150, color: 'grey' }}
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
      <View style={{ height: 38, flexDirection: 'row' }}>
        {_displayOptions()}
        <Button
          title={'Refresh Scores'}
          onPress={() => {
            getOnlineData();
            getLocalData();
          }}
        />
      </View>

      <Sep />

      <View style={styles.flexx}>
        <Text style={[styles.title, { marginBottom: 20 }]}>Best scores</Text>

        {loading ? <ActivityIndicator size="large" color="gray" /> : null}

        <ScoresView
          listToDisplay={scores}
          difficultySelected={difficultySelected}
        />
      </View>

      <Sep />

      <View style={styles.flexx}>
        <View
          style={{
            marginBottom: 5,
            height: 38,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={styles.title}>My scores</Text>
          <Pressable onPress={() => deleteLocalScores()}>
            <Text>❌🗑</Text>
          </Pressable>
        </View>
        <NameField />
        <ScoresView
          listToDisplay={localScores}
          difficultySelected={difficultySelected}
        />
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
  flexx: { flex: 1, alignItems: 'center' },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
