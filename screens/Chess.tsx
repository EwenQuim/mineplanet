import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { Cell } from '../types'
import Board from '../Board'
import CellView from './CellView';


export default function Chess({ board }: { board: Board }) {


    return (
        <View style={styles.container}>

            <Button title="Log board variable" onPress={() => console.log(board)} />
            <View style={styles.boardBackground} >
                <FlatList
                    data={board.grid}
                    keyExtractor={item => item[0].x.toString() + "," + item[0].y.toString()}
                    renderItem={rowItem => {
                        return (
                            <FlatList
                                style={styles.row}
                                data={rowItem.item}
                                keyExtractor={item => item.x.toString()}
                                renderItem={({ item: cellItem, index }: { item: Cell, index: number }) => {

                                    return (<CellView cell={cellItem} />)

                                }}
                            />
                        )
                    }}

                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    caseBlack: {
        width: 30,
        height: 30,
        backgroundColor: '#aaa',
        borderWidth: 3,
        borderTopColor: '#eee',
        borderLeftColor: '#eee',
        borderRightColor: '#7d7d7d',
        borderBottomColor: '#7d7d7d'
    },
    caseWhite: {
        width: 30,
        height: 30,
        backgroundColor: '#ccc',
        borderWidth: 3,
        borderTopColor: '#eee',
        borderLeftColor: '#eee',
        borderRightColor: '#7d7d7d',
        borderBottomColor: '#7d7d7d'
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
