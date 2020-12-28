import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../Themed';
import Sep from '../Separator';
import { getStoredName } from '../../utils/storage';

export default function NameView() {
  let [name, setName] = useState('Enter your name');

  useEffect(() => {
    getLocalName();
  }, []);

  const getLocalName = async () => {
    const name = await getStoredName();
    setName(name);
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginHorizontal: 15 }}>{name}✍🏼</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
