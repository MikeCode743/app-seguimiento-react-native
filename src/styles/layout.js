import {StatusBar, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  toolbar: {
    flexDirection: 'row',
    borderWidth: 3,
    justifyContent: 'space-between',
  },
  body: {
    flex: 8,
    padding: 20,
    paddingTop: StatusBar.currentHeight,
  },
  menubar: {
    flex: 2,
  },
});
