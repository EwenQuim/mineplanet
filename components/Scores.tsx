import React from 'react';
import { FlatList } from 'react-native';
import { Difficulty, ScoreLine } from '../types';
import {
  displayDate,
  displayIndex,
  displayTime,
  nameToColor
} from '../utils/display';
import { View, Text } from './Themed';

export const ScoresView = ({
  listToDisplay,
  difficultySelected,
  playerName
}: {
  listToDisplay: ScoreLine[];
  difficultySelected: Difficulty;
  playerName: string;
}) => {
  let displayedData = listToDisplay.filter(
    (a) => a.level === difficultySelected
  );
  return (
    <FlatList
      data={displayedData}
      keyExtractor={(item) => item.date.toString()}
      style={{ alignSelf: 'stretch' }}
      renderItem={({
        item: score,
        index
      }: {
        item: ScoreLine;
        index: number;
      }) => {
        const color =
          playerName === score.name ? nameToColor(score.name) : 'white';
        const bold = playerName === score.name ? 'bold' : 'normal';
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
              style={{
                marginHorizontal: 8,
                marginVertical: 2,
                width: 160,
                color: color,
                fontWeight: bold
              }}
            >
              {score.name}
            </Text>
            <Text
              style={{
                marginHorizontal: 8,
                marginVertical: 2,
                fontWeight: 'bold'
              }}
            >
              {displayTime(score.time)}
            </Text>
            <Text style={{ marginHorizontal: 8, marginVertical: 2 }}>
              {displayDate(score.date)}
            </Text>
          </View>
        );
      }}
    />
  );
};
