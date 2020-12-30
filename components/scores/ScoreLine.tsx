import React from 'react';
import { ScoreLine } from '../../types';
import {
  displayDate,
  displayIndex,
  displayTime,
  nameToColor
} from '../../utils/display';
import { View, Text } from '../Themed';

export const ScoreLineComponent = ({
  score,
  playerName,
  index
}: {
  score: ScoreLine;
  playerName: string;
  index: number;
}) => {
  const backgroundColor =
    (index % 2 === 0 ? '#999' : '#777') +
    (playerName === score.name ? '2' : '5');
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: backgroundColor,
        alignSelf: 'stretch'
      }}
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

      {playerName === score.name ? (
        <Text
          style={{
            marginHorizontal: 8,
            marginVertical: 2,
            width: 160,
            color: nameToColor(playerName),
            fontWeight: 'bold'
          }}
        >
          {score.name}
        </Text>
      ) : (
        <Text
          style={{
            marginHorizontal: 8,
            marginVertical: 2,
            width: 160
          }}
        >
          {score.name}
        </Text>
      )}

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
};
