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
            <View  >
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
                                keyExtractor={item => item.x.toString()}
                                renderItem={({ item: cellItem }: { item: Cell }) => {

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
