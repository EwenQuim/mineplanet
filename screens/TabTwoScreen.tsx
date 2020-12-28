import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Text, View } from '../components/Themed';
import { Difficulty, ScoreLine } from '../types';
import { stringToDiff } from '../utils/difficultyString';
import { displayIndex, displayTime } from '../utils/display';
import Sep from '../components/Separator';
import { deleteLocalScores, getLocalScores } from '../utils/storage';
import NameField from '../components/name/NameField';
import NameView from '../components/name/Name';

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

  const displayScores = (listToDisplay: ScoreLine[] = scores) => {
    let displayedData = listToDisplay.filter(
      (a) => a.level === difficultySelected
    );
    return (
      <FlatList
        data={displayedData}
        keyExtractor={(item) => item.date.toString()}
        renderItem={({
          item: score,
          index
        }: {
          item: ScoreLine;
          index: number;
        }) => {
          return (
            <View
              style={[
                { flexDirection: 'row' },
                index % 2 === 0
                  ? { backgroundColor: '#9995' }
                  : { backgroundColor: '#7775' }
              ]}
            >
              <Text
                style={{
                  marginHorizontal: 8,
                  marginVertical: 2,
                  width: 30,
                  textAlign: 'right'
                }}
              >
                {displayIndex(index)}
              </Text>
              <Text
                style={{ marginHorizontal: 8, marginVertical: 2, width: 130 }}
              >
                {score.name}
              </Text>
              <Text style={{ marginHorizontal: 8, marginVertical: 2 }}>
                {displayTime(score.time)}
              </Text>
            </View>
          );
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <NameField />

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
      <Text style={styles.title}>Best scores</Text>

      {loading ? <ActivityIndicator size="large" color="gray" /> : null}

      {displayScores()}

      <Sep />

      <View style={{ height: 38, flexDirection: 'row' }}>
        <Text style={styles.title}>My scores</Text>
        <Button title="Show" onPress={() => console.log(localScores)} />
        <Button title="Del" onPress={() => deleteLocalScores()} />
      </View>
      {displayScores(localScores)}
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
  }
});
