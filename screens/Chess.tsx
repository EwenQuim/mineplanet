import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Cell } from '../types'
import Board from '../Board'
import CellView from './CellView';


export default function Chess({ board, onPress }: { board: Board, onPress: any }) {


    return (
        <ScrollView >
            <ScrollView directionalLockEnabled={false}
                horizontal={true}
                contentContainerStyle={{ width: 500, backgroundColor: "white" }}>
                <View style={styles.container}>

                    <Button title="Log board variable" onPress={() => console.log(board)} />
                    <View >
                        <FlatList
                            data={board.grid}
                            extraData={board.grid}
                            keyExtractor={item => item[0].x.toString() + "," + item[0].y.toString()}
                            renderItem={rowItem => {
                                return (
                                    <FlatList
                                        style={{ flex: 1, flexDirection: "row" }}
                                        data={rowItem.item}
                                        extraData={rowItem.item}
                                        keyExtractor={item => item.x.toString() + "," + item.y.toString()}
                                        renderItem={({ item: cellItem }: { item: Cell }) => {

                                            return (<CellView cell={cellItem} pressAction={() => onPress(cellItem)} />)

                                        }}
                                    />
                                )
                            }}

                        />
                    </View>
                    <Text>Hello</Text>
                </View>
                <Text>Hello</Text>

            </ScrollView>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flex: 1,
        flexDirection: "row"
    },
    col: {
        flex: 1,
        flexDirection: "column"
    },
    item: {

    }
});
