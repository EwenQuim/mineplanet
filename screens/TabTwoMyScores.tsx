import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { ChooseLevel } from '../components/manager/ChooseLevel';
import ModalDeleteScores from '../components/manager/EraseScores';
import { ScoresView } from '../components/scores/Scores';
import { View } from '../components/Themed';
import { useStateContext } from '../state/state';
import { sharedStyles } from '../styles/sharedStyles';
import { ScoreLine } from '../types';
import { getLocalScores, getStoredName } from '../utils/storage';

export default function TabTwoMyScores() {
  let [playerName, setPlayerName] = useState('');
  let [localScores, setLocalScores] = useState<ScoreLine[]>([]);
  let [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const { state, dispatch } = useStateContext();
  const { difficulty } = state;

  // Load first time
  useEffect(() => refresh(), []);

  const refresh = () => {
    getLocalData();
  };

  const getLocalData = () => {
    getLocalScores().then((data) => {
      setLocalScores(data);
    });
    getStoredName().then((string) => setPlayerName(string));
  };

  return (
    <View style={sharedStyles.container}>
      <View style={sharedStyles.topBar}>
        <ChooseLevel playerName={playerName} />
        <Pressable
          style={sharedStyles.topButton}
          onPress={() => setConfirmModalVisible(true)}
        >
          <Feather name="trash" size={18} color="grey" />
        </Pressable>
      </View>

      <ScoresView
        listToDisplay={localScores}
        difficultySelected={difficulty}
        playerName={playerName}
      />

      <ModalDeleteScores
        modalVisible={confirmModalVisible}
        hideModal={() => setConfirmModalVisible(false)}
      />
    </View>
  );
}
