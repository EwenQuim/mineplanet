import * as React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import CellView from '../components/game/CellView';
import { Text } from '../components/Themed';
import { Cell, CellState } from '../types';

/**
 * Displays a help screen : how to play ? what are the rules
 * Very simple, nothing special here
 */
export default function TabRulesScreen() {
  const displayCell = (state: CellState, bombCount: number, bomb = false) => {
    let cell = new Cell(0, 0);
    cell = {
      ...cell,
      state: state,
      bombCount: bombCount,
      bomb: bomb
    };
    return (
      <CellView
        cell={cell}
        pressAction={() => console.log('hi')}
        longPressAction={() => console.log('ho')}
      />
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Image
          source={require('../assets/images/minefieldWon.jpeg')}
          style={styles.image}
        />
        <Text>
          Your goal is clear: you're a MineSweeper trying to clear the path!{' '}
        </Text>
        <Text style={{ fontWeight: 'bold' }}>
          Discover all non-bomb tiles to win.{' '}
        </Text>
        <Text>Do whatever you want but just don't detonate the bombs! </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <View style={styles.subSection}>
          {displayCell(CellState.Idle, 2)}
          <Text> → </Text>
          {displayCell(CellState.Revealed, 2)}
        </View>
        <Text>
          {' '}
          Simply <Text style={{ fontWeight: 'bold' }}> short press </Text> to
          discover what's under the tile !{' '}
        </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <View style={styles.subSection}>
          {displayCell(CellState.Idle, 2)}
          <Text> → </Text>
          {displayCell(CellState.Flagged, 2)}
        </View>
        <Text>
          {' '}
          <Text style={{ fontWeight: 'bold' }}>Long press </Text> to plant a
          flag and prevent bombs from being accidentally detonated !{' '}
        </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <View style={styles.subSection}>
          {displayCell(CellState.Idle, -1, true)}
          <Text> → </Text>
          {displayCell(CellState.Revealed, -1, true)}
        </View>
        <Text>
          If you miss... <Text style={{ fontWeight: 'bold' }}>BOOM!</Text> You
          lost!{' '}
        </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <View style={styles.subSection}>
          {displayCell(CellState.Flagged, 2)}
          <Text> → </Text>
          {displayCell(CellState.QMark, 2)}
        </View>
        <Text>
          {' '}
          When a cell is flagged,{' '}
          <Text style={{ fontWeight: 'bold' }}>long press again</Text> to mark
          as unknown, if you hesitate (it happens).{' '}
        </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <View style={styles.subSection}>
          {displayCell(CellState.QMark, 2)}
          <Text> → </Text>
          {displayCell(CellState.Idle, 2)}
        </View>
        <Text>
          {' '}
          <Text style={{ fontWeight: 'bold' }}>Long press a third time</Text> to
          go back to normal.{' '}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  section: {
    marginHorizontal: 30,
    alignItems: 'center',
    flex: 1
  },
  subSection: {
    marginHorizontal: 30,
    marginVertical: 10,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#8888'
  },
  image: {
    height: 100,
    width: 300,
    marginVertical: 10
  }
});
