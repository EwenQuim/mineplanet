import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Cell, CellState } from '../types'
import { displayCell, colorMatch } from '../utils/cellDisplay'

/**
 * Drawing a cell from its description
 * @param cell a cell object to represent
 * @param onPress the function triggered by a short press on a cell 
 * @param onLongPress the function triggered by a long press on a cell 
 */
const CellView = ({ cell, pressAction, longPressAction }: { cell: Cell, pressAction: any, longPressAction: any }) => {

    if (cell.state === CellState.Revealed) {
        return (
            <View style={styles.caseRevealed}>
                <Text style={{ paddingLeft: 5, fontWeight: 'bold', color: colorMatch(cell) }}> {displayCell(cell)} </Text>
            </View>
        )
    } else {
        return (
            <Pressable style={styles.caseIdle} onPress={pressAction} onLongPress={longPressAction} >
                <Text> {logo[cell.state]} </Text>
            </Pressable>
        )
    }
}

// Not revealed correspondance (outside of function for performance reasons)
const logo = {
    0: "",
    1: "🚩",
    2: "❓",
    3: "",
    4: "❌"
}

const styles = StyleSheet.create({
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
        alignContent: "center",
        justifyContent: "center",
    }
});


export default CellView