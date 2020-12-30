import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Text, View } from '../components/Themed';
import { Difficulty, ScoreLine, TabTwoParamList } from '../types';
import { stringToDiff } from '../utils/difficultyString';
import Sep from '../components/Separator';
import { getLocalScores, getStoredName } from '../utils/storage';
import NameField from '../components/name/NameField';
import { ScoresView } from '../components/scores/Scores';
import ModalDeleteScores from '../components/manager/EraseScores';
import { Feather } from '@expo/vector-icons';
import { nameToColor } from '../utils/display';
import { styles } from './TabTwoScreen';
import { ChooseLevel } from '../components/manager/ChooseLevel';
import { useStateContext } from '../state/state';

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
    <View style={styles.container}>
      <View
        style={{
          height: 38,
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10
        }}
      >
        <ChooseLevel playerName={playerName} />
        <Pressable onPress={() => setConfirmModalVisible(true)}>
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
