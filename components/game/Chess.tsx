import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Board from '../../Board';
import { Cell } from '../../types';
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
  const renderFunction = ({ item: cellItem }: { item: Cell }) => (
    <CellView
      cell={cellItem}
      pressAction={() => onPress(cellItem)}
      longPressAction={() => onLongPress(cellItem)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={board.grid.flat()}
        key={board.width}
        numColumns={board.width}
        keyExtractor={(item) => `${item.x} ${item.y}`}
        renderItem={renderFunction}
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
