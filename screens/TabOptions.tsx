import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pressable, Switch } from 'react-native';
import { Text, View } from '../components/Themed';
import { useStateContext } from '../state/state';
import { sharedStyles } from '../styles/sharedStyles';
import { TabOptionsParamList } from '../types';
import { getVibrations, toggleVibrationsTo } from '../utils/storage';

type OptionsScreenNavigationProp = StackNavigationProp<TabOptionsParamList>;

type Props = {
  navigation: OptionsScreenNavigationProp;
};

export default ({ navigation }: Props) => {
  const [isVibrating, setIsVibrating] = useState(true);

  const { state, dispatch } = useStateContext();
  const { difficulty } = state;

  const getPreviousVibrateParam = () => {
    getVibrations().then((ans) => setIsVibrating(ans));
  };

  const toggleSwitch = () => {
    setIsVibrating((previousState) => !previousState);
  };

  useEffect(() => getPreviousVibrateParam(), []);
  useEffect(() => toggleVibrationsTo(isVibrating), [isVibrating]);

  return (
    <View style={sharedStyles.container}>
      <View style={sharedStyles.bottomBar}>
        <Text>Vibrations</Text>
        <Switch
          trackColor={{ false: '#333', true: 'skyblue' }}
          thumbColor={isVibrating ? 'lightgrey' : 'darkgrey'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isVibrating}
        />
      </View>
      <View style={sharedStyles.bottomBar}>
        <Pressable
          onPress={() => navigation.navigate('TabRulesScreen')}
          style={sharedStyles.navButton}
        >
          <Text>How To Play</Text>
        </Pressable>
      </View>
    </View>
  );
};
