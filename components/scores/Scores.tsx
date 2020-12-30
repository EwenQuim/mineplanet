import React from 'react';
import { FlatList } from 'react-native';
import { Difficulty, ScoreLine } from '../../types';
import { ScoreLineComponent } from './ScoreLine';

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
      renderItem={({
        item: score,
        index
      }: {
        item: ScoreLine;
        index: number;
      }) => (
        <ScoreLineComponent
          score={score}
          playerName={playerName}
          index={index}
        />
      )}
    />
  );
};
