import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { ActionType } from '../../state/reducer';
import { useStateContext } from '../../state/state';
import { Difficulty } from '../../types';
import { stringToDiff } from '../../utils/difficultyString';
import { nameToColor } from '../../utils/display';
import { View } from '../Themed';

export const ChooseLevel = ({ playerName }: { playerName: string }) => {
  const { state, dispatch } = useStateContext();
  const { difficulty } = state;

  let nameColor = nameToColor(playerName);
  return (
    <View style={{ justifyContent: 'center' }}>
      <Picker
        selectedValue={difficulty}
        style={{ height: 50, width: 125, color: nameColor }}
        onValueChange={(itemValue, itemIndex) =>
          dispatch({
            type: ActionType.CHANGE_DIFFICULTY,
            payload: stringToDiff(itemValue.toString())
          })
        }
      >
        <Picker.Item label="Easy" value={Difficulty.Easy} />
        <Picker.Item label="Medium" value={Difficulty.Medium} />
        <Picker.Item label="Hard" value={Difficulty.Hard} />
        <Picker.Item label="Extreme" value={Difficulty.Extreme} />
      </Picker>
    </View>
  );
};
