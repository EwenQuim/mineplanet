import * as React from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import { deleteLocalScores } from '../../utils/storage';
import { Text, View } from '../Themed';

export default function ModalDeleteScores({
  modalVisible,
  hideModal
}: {
  modalVisible: boolean;
  hideModal: any;
}) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => hideModal()}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Do you want to erase your local scores for all levels ?
            </Text>
            <Text style={styles.modalText}>
              Your highest scores will safely remain online.
            </Text>
            <Text style={[styles.modalText, { fontStyle: 'italic' }]}>
              Contact the dev if you want to erase published scores
            </Text>
            <View
              style={{
                height: 32,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Pressable
                style={{ ...styles.button }}
                onPress={() => {
                  hideModal();
                  deleteLocalScores();
                }}
              >
                <Text style={styles.textStyle}>📃→🗑</Text>
              </Pressable>
              <Pressable
                style={{ ...styles.button, borderColor: 'green' }}
                onPress={() => hideModal()}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'red',
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
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});
