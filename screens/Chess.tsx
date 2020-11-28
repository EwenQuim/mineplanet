import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Button, FlatList, ListRenderItem, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Case } from '../types'
import Board from '../Board'

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

    const _renderItem = ({ caseList }: { caseList: Case[] }) => (
        <Text>{caseList}</Text>
    );

    const rendering = ({ info, index }) => { return (<View><Text>Hi</Text> <View style={{ width: 30, height: 30, backgroundColor: '#555', flexDirection: 'column' }} /> </View>) }

    return (
        <View style={styles.container}>
            <View style={styles.boardBackground} >
                <View style={styles.row} >
                    <View style={styles.caseBlack} />
                    <View style={styles.caseWhite} />
                    <View style={styles.caseBlack} />
                </View>
                <View style={styles.row} >
                    <View style={styles.caseWhite} />
                    <View style={styles.caseBlack} />
                    <View style={styles.caseWhite} />
                </View>
            </View>

            <Text>Hi</Text>
            <Button title="Log state" onPress={() => console.log(board)} />
            <FlatList
                data={board.grid}
                keyExtractor={item => item[0].y.toString() + "," + item[0].y.toString()}
                renderItem={item => {
                    console.log(item); return (
                        <View>
                            <View style={styles.caseWhite} />
                            <FlatList
                                data={item.item}
                                keyExtractor={item => item.x.toString()}
                                renderItem={item => { console.log(item); return (<View><Text>y</Text></View>) }}
                            />
                            <View style={styles.caseBlack} />
                        </View>)
                }}

            />

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
        backgroundColor: '#888',
    },
    caseWhite: {
        width: 30,
        height: 30,
        backgroundColor: '#ccc',
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
        width: 500, height: 300, backgroundColor: '#aaa', flexDirection: 'column'
    },
    item: {

    }
});
