/* eslint-disable prettier/prettier */
import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  toolbar: {
    flexDirection: 'row',
    borderWidth: 3,
    justifyContent: 'space-between',
  },
  body: {
    alignItems: 'center',
    flex: 6,
    padding: 20,
    paddingTop: StatusBar.currentHeight,
  },
  foobar: {
    flex: 2,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: 200,
    width: 400,
    marginVertical: 10,
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    // fontStyle: 'italic',
    color: 'black',
    // borderWidth: 4,
    // borderColor: '#20232a',
    // borderRadius: 10,
    // paddingVertical: 8,
    // paddingHorizontal:10
  },
  subtitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
    marginHorizontal: 20,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    height: 40,
    width: '80%',
    margin: 12,
    borderRadius: 15,
    borderColor: 'rgb(100, 33, 92)',
  },
  buttonPrimary: {
    backgroundColor: 'rgb(100, 33, 92)',
    borderRadius: 3,
  },
  buttonPrimaryDisabled: {
    backgroundColor: 'rgb(176, 58, 162)',
    borderRadius: 3,
  },
  buttonSecondary: {
    backgroundColor: 'rgb(115, 102, 255)',
    borderRadius: 3,
  },
  buttonSecondaryDisabled: {
    backgroundColor: 'rgb(180, 173, 255)',
    borderRadius: 3,
  },
  buttonContainer: {
    width: '80%',
    marginHorizontal: 50,
    marginVertical: 10,
  }
});
