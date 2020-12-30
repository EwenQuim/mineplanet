import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  topBar: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  bottomBar: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  navButton: {
    backgroundColor: '#8888',
    borderRadius: 4,
    padding: 5
  },
  topButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
