import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Button, FlatList, ListRenderItem, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Case } from '../types'
import Board from '../Board'
import CellView from './CellView';

const Row = ({ row }: { row: Case[] }) => (
    <View style={styles.item}>
        <Text style={styles.title}>Hi</Text>
    </View>
);


export default function Chess({ board }: { board: Board }) {
    const renderRow: ListRenderItem<Case[]> = ({ caseList }) => (
        <FlatList
            data={board.grid}
            renderItem={() => <View> <Text>Yo</Text> </View>}
            keyExtractor={item => item[0].y.toString()}
        />
    );


    return (
        <View style={styles.container}>

            <Text>Hi</Text>
            <Button title="Log board variable" onPress={() => console.log(board)} />
            <View style={styles.boardBackground} >
                <FlatList
                    data={board.grid}
                    keyExtractor={item => item[0].y.toString() + "," + item[0].y.toString()}
                    renderItem={rowItem => {
                        console.log(rowItem); return (
                            <View style={styles.row}>

                                <FlatList
                                    style={styles.row}
                                    data={rowItem.item}
                                    keyExtractor={item => item.x.toString()}
                                    renderItem={({ item: cellItem, index }: { item: Case, index: number }) => {

                                        return (<CellView cell={cellItem} />
                                        )

                                    }}
                                />

                            </View>)
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
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
