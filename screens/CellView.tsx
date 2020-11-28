import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Button, FlatList, ListRenderItem, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Case, CellState } from '../types'
import Board from '../Board'




const CellView = ({ cell }: { cell: Case }) => {


    if (cell.state === CellState.Revealed) {
        return (
            <View style={styles.caseRevealed} />
        )
    } else {
        return (
            <Pressable style={styles.caseIdle} onPressOut={() => { cell.state = CellState.Revealed; console.log(cell); }} />
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    caseIdle: {
        width: 30,
        height: 30,
        backgroundColor: '#bbb',
        borderWidth: 3,
        borderTopColor: '#eee',
        borderLeftColor: '#eee',
        borderRightColor: '#7d7d7d',
        borderBottomColor: '#7d7d7d'
    },
    caseRevealed: {
        width: 30,
        height: 30,
        backgroundColor: '#ccc',
        borderWidth: 1,
        borderColor: '#bbb',
    },
    row: {
        flex: 1,
        flexDirection: "row"
    },
    col: {
        flex: 1,
        flexDirection: "column"
    },
    boardBackground: {
        width: 300, height: 300, backgroundColor: '#aaa', flexDirection: 'column'
    },
    item: {

    }
});


export default CellView