import * as React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Cell } from '../types'
import Board from '../Board'
import CellView from './CellView';

/**
 * Draws the grid board, that i call Chess 
 * @param board the game board itself (not only the grid !)
 * @param onPress the function triggered by a short press on a cell 
 * @param onLongPress the function triggered by a long press on a cell
 */
export default function Chess({ board, onPress, onLongPress }: { board: Board, onPress: any, onLongPress: any }) {

    return (
        <ScrollView directionalLockEnabled={false}
            horizontal={true}
            contentContainerStyle={{ width: board.width * 30 + 60, height: 500 }}>
            <View style={styles.container}>
                <View >
                    <FlatList
                        data={board.grid}
                        extraData={board.grid}
                        keyExtractor={item => item[0].x.toString() + ":" + item[0].y.toString()}
                        getItemLayout={(data, index) => (
                            { length: board.height, offset: board.height * index, index }
                        )}
                        renderItem={rowItem => {
                            return (
                                <FlatList
                                    style={styles.row}
                                    data={rowItem.item}
                                    extraData={rowItem.item}
                                    keyExtractor={item => item.x.toString() + "," + item.y.toString()}
                                    getItemLayout={(data, index) => (
                                        { length: board.width, offset: board.width * index, index }
                                    )}
                                    renderItem={({ item: cellItem }: { item: Cell }) => {

                                        return (<CellView
                                            cell={cellItem}
                                            pressAction={() => onPress(cellItem)}
                                            longPressAction={() => onLongPress(cellItem)} />)

                                    }}
                                />
                            )
                        }}

                    />
                </View>
            </View>

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
    }
});
