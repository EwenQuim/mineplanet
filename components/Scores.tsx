import React from 'react';
import { FlatList } from 'react-native';
import { Difficulty, ScoreLine } from '../types';
import { displayIndex, displayTime, nameToColor } from '../utils/display';
import { View, Text } from './Themed';

export const ScoresView = ({
  listToDisplay,
  difficultySelected
}: {
  listToDisplay: ScoreLine[];
  difficultySelected: Difficulty;
}) => {
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
        const color = nameToColor(score.name);
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
                width: 150,
                color: color
              }}
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
