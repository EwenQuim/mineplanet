import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Button, FlatList, ListRenderItem, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Cell, CellState } from '../types'
import Board from '../Board'




const CellView = ({ cell, pressAction, longPressAction }: { cell: Cell, pressAction: any, longPressAction: any }) => {

    // Revealed
    const displayCell = (): string => {
        if (cell.bomb) {
            return "💣";
        } else if (cell.bombCount > 0) {
            return cell.bombCount.toString();
        } else {
            return "";
        }
    }

    const colorMatch = () => {
        switch (cell.bombCount) {
            case 1:
                return 'blue'
            case 2:
                return 'green'
            case 3:
                return 'red'
            case 4:
                return 'darkblue'
            default:
                return 'black'
        }
    }


    if (cell.state === CellState.Revealed) {
        return (
            <View style={styles.caseRevealed}>
                <View style={styles.numberStyle}>
                    <Text style={{ fontWeight: 'bold', color: colorMatch() }}> {displayCell()} </Text>
                </View>
            </View>
        )
    } else {
        return (
            <View>
                <Pressable style={styles.caseIdle} onPress={pressAction} onLongPress={longPressAction} >
                    <Text> {logo[cell.state]} </Text>
                </Pressable>
            </View>
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

    },
    numberStyle: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    }
});


export default CellView