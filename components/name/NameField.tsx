import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../Themed';
import { getStoredName, setStoredName } from '../../utils/storage';

export default function NameField() {
  let temporaryName = '';
  let [name, setName] = useState('');
  let [editing, setEditing] = useState(false);

  let refe;

  useEffect(() => {
    // on load, setting the state to the stored value
    getStoredName().then((name) => {
      setName(name);
    });
  }, []);

  useEffect(() => {
    if (editing) {
      setTimeout(() => refe.focus(), 200);
    }
  }, [editing]);

  return (
    <View style={styles.container}>
      <Text style={{ marginHorizontal: 15 }}>Name</Text>

      {editing ? (
        <TextInput
          placeholder={'Enter your name'}
          defaultValue={name}
          onSubmitEditing={() => {
            if (temporaryName.length > 1) {
              setStoredName(temporaryName);
              setName(temporaryName);
            }
            setEditing(false);
          }}
          autoCompleteType="name"
          blurOnSubmit
          ref={(button) => {
            refe = button;
          }}
          onChangeText={(text) => (temporaryName = text)}
          maxLength={15}
          style={styles.input}
        />
      ) : (
        <Text style={{ marginHorizontal: 15 }}>{name}</Text>
      )}

      <Button
        title={editing ? 'Done' : 'Change'}
        onPress={() => setEditing(!editing)}
      />
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
  },
  input: {
    width: 160,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingLeft: 30
  }
});
