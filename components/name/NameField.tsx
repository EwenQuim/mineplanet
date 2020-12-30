import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { nameToColor } from '../../utils/display';
import { getStoredName, setStoredName } from '../../utils/storage';
import { Text, TextInput, View } from '../Themed';

enum EditingStatus {
  idle = '✏️',
  editing = '🔓',
  edited = '🔐'
}

export default function NameField({ refresh }: { refresh: () => void }) {
  let [name, setName] = useState('');
  let [editing, setEditing] = useState(EditingStatus.idle);

  useEffect(() => {
    // on load, setting the state to the stored value
    getStoredName().then((name) => {
      setName(name);
    });
  }, []);

  const submitEditing = () => {
    if (name.trim().length > 1) {
      setStoredName(name.trim());
      setName(name.trim());
    } else {
      getStoredName().then((name) => {
        setName(name);
      });
    }
    setEditing(EditingStatus.edited);
  };

  return (
    <View style={[styles.container, { borderColor: nameToColor(name) }]}>
      <Text style={{ marginHorizontal: 10 }}>{editing}</Text>
      <TextInput
        placeholder={'Enter your name'}
        defaultValue={name}
        onBlur={() => {
          submitEditing();
          refresh();
        }}
        onSubmitEditing={submitEditing}
        autoCompleteType="name"
        blurOnSubmit
        onFocus={() => setEditing(EditingStatus.editing)}
        onChangeText={(text) => {
          setName(text.trim());
        }}
        maxLength={12}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4
  },
  input: {
    paddingLeft: 15
  }
});
