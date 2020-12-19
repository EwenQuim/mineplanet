import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { ScoreLine } from '../types';

interface ServerResponse {
  data: ScoreLine[]
}

export default function TabTwoScreen() {

  let [scores, setScores] = useState<ScoreLine[]>([])
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
    console.log("get data");
  }, [])


  const getData = () => {
    console.log('fetching data');

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

  const postScore = (scoreLine: ScoreLine) => {
    console.log("posting score");
    axios.post('https://minebackend.herokuapp.com/leaderboard', scoreLine)
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err))
  }

  // useEffect(() => {
  //   getData();
  // }, []);
  const displayScores = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="gray" />
    } else {
      return <FlatList
        data={scores}
        keyExtractor={item => item.date.toString()}
        renderItem={({ item: score, index }: { item: ScoreLine, index: number }) => {

          return <Text>{index + 1} - {score.name} : {score.score} points</Text>

        }}
      />
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Realized by Ewen Quimerc'h </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title={"Refresh Scores"} onPress={() => getData()} />
      <Button title={"Post Score"} onPress={
        () => postScore({
          name: "Ewen",
          score: 250,
          time: 30,
          date: new Date(), //placeholder: real date is generated in the back when received 
        })
      } />


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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
