import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


import { Text, View } from '../components/Themed';
import { Difficulty, ScoreLine } from '../types';
import { stringToDiff } from '../utils/difficultyString';
import { displayTime } from '../utils/displayTime';
import Sep from '../components/Separator'

interface ServerResponse {
  data: ScoreLine[]
}

export default function TabTwoScreen() {

  let [scores, setScores] = useState<ScoreLine[]>([])
  let [difficultySelected, setDifficultySelected] = useState(Difficulty.Medium)
  let [loading, setLoading] = useState(true)

  // Load first time
  useEffect(() => {
    getData()
    console.log("get data");
  }, [])

  // Load when difficulty is changed
  useEffect(() => {
    getData()
    console.log("get data");
  }, [difficultySelected])


  const getData = () => {
    console.log('fetching data');
    setLoading(true)

    axios.get('https://minebackend.herokuapp.com/leaderboard', {
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        setScores(response.data)
        setLoading(false)
        console.log('done');

      })
      .catch((err) => console.error(err))

  }

  const _displayOptions = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
        <Picker
          selectedValue={difficultySelected}
          style={{ height: 50, width: 150, color: "grey" }}
          onValueChange={(itemValue, itemIndex) => {
            setDifficultySelected(stringToDiff(itemValue.toString()))
          }
          }>
          <Picker.Item label="Easy" value={Difficulty.Easy} />
          <Picker.Item label="Medium" value={Difficulty.Medium} />
          <Picker.Item label="Hard" value={Difficulty.Hard} />
        </Picker>
      </View>
    )

  }

  // useEffect(() => {
  //   getData();
  // }, []);

  const displayScores = () => {
    console.log(difficultySelected);
    let displayedData = scores.filter(a => a.level === difficultySelected)

    return <FlatList
      data={displayedData}
      keyExtractor={item => item.date.toString()}
      renderItem={({ item: score, index }: { item: ScoreLine, index: number }) => {

        return <Text>{index + 1} - {score.name} : {displayTime(score.time)}</Text>

      }}
    />
  }

  return (
    <View style={styles.container}>

      <View style={{ height: 38, flexDirection: 'row' }}>
        {_displayOptions()}
        <Button title={"Refresh Scores"} onPress={() => getData()} />
      </View>

      <Sep />

      { (loading) ? <ActivityIndicator size="large" color="gray" /> : null}

      {displayScores()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
