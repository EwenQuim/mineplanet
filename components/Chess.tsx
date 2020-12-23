import * as React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Cell } from '../types';
import Board from '../Board';
import CellView from './CellView';

/**
 * Draws the grid board, that i call Chess
 * @param board the game board itself (not only the grid !)
 * @param onPress the function triggered by a short press on a cell
 * @param onLongPress the function triggered by a long press on a cell
 */
export default function Chess({
  board,
  onPress,
  onLongPress
}: {
  board: Board;
  onPress: any;
  onLongPress: any;
}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={board.grid.flat()}
        extraData={board.grid}
        key={board.width}
        numColumns={board.width}
        keyExtractor={(item) => `${item.x} : ${item.y}`}
        getItemLayout={(data, index) => ({
          length: board.height * 30,
          offset: board.height * index,
          index
        })}
        renderItem={({ item: cellItem }: { item: Cell }) => (
          <CellView
            cell={cellItem}
            pressAction={() => onPress(cellItem)}
            longPressAction={() => onLongPress(cellItem)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
