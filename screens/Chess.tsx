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
            <View style={{ width: 500, height: 300, backgroundColor: '#888', flexDirection: 'column' }} >
                <View style={{ width: 30, height: 30, backgroundColor: '#555', flexDirection: 'column' }} />
            </View>
            <Text>Hi</Text>
            <Button title="Log state" onPress={() => console.log(board)} />
            <FlatList
                data={board.grid}
                keyExtractor={item => item[0].y.toString() + "," + item[0].y.toString()}
                renderItem={row => {
                    console.log(row); return (<View><Text>y</Text></View>)
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
    item: {

    }
});
