import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../Themed';
import { getStoredName, setStoredName } from '../../utils/storage';
import { nameToColor } from '../../utils/display';

export default function NameField() {
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

  const submitEditing = () => {
    if (name.length > 1) {
      setStoredName(name.trim());
      setName(name.trim());
    } else {
      getStoredName().then((name) => {
        setName(name);
      });
    }
    setEditing(false);
  };

  return (
    <View style={[styles.container, { marginBottom: 10 }]}>
      <Text style={{ marginHorizontal: 15 }}>Username</Text>
      <View style={[styles.box, { borderColor: nameToColor(name) }]}>
        {editing ? (
          <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <TextInput
              placeholder={'Enter your name'}
              defaultValue={name}
              onSubmitEditing={submitEditing}
              autoCompleteType="name"
              blurOnSubmit
              ref={(button) => (refe = button)}
              onChangeText={(text) => setName(text.trim())}
              maxLength={15}
              style={styles.input}
            />
            <Pressable onPress={submitEditing} style={{ marginHorizontal: 10 }}>
              <Text>✅</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={() => setEditing(true)} style={styles.container}>
            <Text style={{ marginHorizontal: 10 }}>{name}</Text>
            <Text style={{ marginHorizontal: 10 }}>✏️</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center'
  },
  box: {
    borderWidth: 1,
    borderRadius: 4
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    width: 160,
    borderWidth: 1,
    color: 'white',
    borderColor: '#0000',
    paddingLeft: 15
  }
});
