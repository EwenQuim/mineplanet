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
import { StackNavigationProp } from '@react-navigation/stack';

type ScoresScreenNavigationProp = StackNavigationProp<TabTwoParamList>;

type Props = {
  navigation: ScoresScreenNavigationProp;
};

export default function TabTwoMyScores({ navigation }: Props) {
  let [difficultySelected, setDifficultySelected] = useState(Difficulty.Medium);
  let [playerName, setPlayerName] = useState('');
  let [localScores, setLocalScores] = useState<ScoreLine[]>([]);
  let [confirmModalVisible, setConfirmModalVisible] = useState(false);

  // Load first time
  useEffect(() => refresh(), []);

  // Load when difficulty is changed
  useEffect(() => refresh(), [difficultySelected]);

  const refresh = () => {
    getLocalData();
  };

  const getLocalData = () => {
    getLocalScores().then((data) => {
      setLocalScores(data);
    });
    getStoredName().then((string) => setPlayerName(string));
  };

  const _displayOptions = () => {
    return (
      <View style={{ justifyContent: 'center' }}>
        <Picker
          selectedValue={difficultySelected}
          style={{ height: 50, width: 125, color: nameToColor(playerName) }}
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
      <View
        style={{
          height: 38,
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10
        }}
      >
        {_displayOptions()}
        <Pressable onPress={() => setConfirmModalVisible(true)}>
          <Feather name="trash" size={18} color="grey" />
        </Pressable>
      </View>

      <ScoresView
        listToDisplay={localScores}
        difficultySelected={difficultySelected}
        playerName={playerName}
      />

      <ModalDeleteScores
        modalVisible={confirmModalVisible}
        hideModal={() => setConfirmModalVisible(false)}
      />
    </View>
  );
}
