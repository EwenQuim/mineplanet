import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  Pressable,
  StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Text, View } from '../components/Themed';
import { Difficulty, ScoreLine } from '../types';
import { stringToDiff } from '../utils/difficultyString';
import Sep from '../components/Separator';
import {
  deleteLocalScores,
  getLocalScores,
  getStoredName
} from '../utils/storage';
import NameField from '../components/name/NameField';
import { ScoresView } from '../components/Scores';
import ModalDeleteScores from '../components/manager/EraseScores';
import { Feather, Ionicons } from '@expo/vector-icons';
import { nameToColor } from '../utils/display';

export default function TabTwoMyScores() {
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
          <Feather name="trash" size={18} color="white" />
        </Pressable>
      </View>

      <ScoresView
        listToDisplay={localScores}
        difficultySelected={difficultySelected}
        playerName={playerName}
      />

      <NameField />

      <ModalDeleteScores
        modalVisible={confirmModalVisible}
        hideModal={() => setConfirmModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexx: { flex: 1, alignItems: 'center', alignSelf: 'stretch' },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'white',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  modalView: {
    margin: 20,
    width: 250,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 4,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});
