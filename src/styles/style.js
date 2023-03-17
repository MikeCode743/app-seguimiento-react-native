/* eslint-disable prettier/prettier */
import { StatusBar, StyleSheet } from 'react-native';

export const primary = '#8f0c1e'
const primaryDisabled = 'grey'
const secondary = '#7a7a7a'
const secondaryDisabled = '#adadad'

export const styles = StyleSheet.create({
  primary,
  secondary,
  container: {
    flex: 1,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 10,
    padding: 20,
    paddingTop: StatusBar.currentHeight,

  },
  toolbar: {
    flexDirection: 'row',
    borderWidth: 2,
    justifyContent: 'space-between',
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
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    // fontStyle: 'italic',
    color: 'white',
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
    height: 40,
    width: '80%',
    paddingBottom:8,
    color: 'white',
  },
  inputContainer: {
    borderWidth: 2,
    padding: 10,
    height: 40,
    borderRadius: 5,
    borderColor: 'white',
    color: 'white',
    alignItems: 'center',
  },
  inputContainerError: {
    borderWidth: 2,
    padding: 10,
    height: 40,
    borderRadius: 5,
    borderColor: primary,
    color: 'white',
    alignItems: 'center',
  },
  inputError: {
    borderWidth: 3,
    padding: 10,
    height: 40,
    width: '80%',
    borderRadius: 5,
    borderColor: primary,
    paddingBottom:0,
    color: 'white',
  },
  errorStyle: {
    fontSize:12
  }, 
  buttonPrimary: {
    backgroundColor: primary,
    borderRadius: 3,
  },
  buttonPrimaryDisabled: {
    backgroundColor: primaryDisabled,
    borderRadius: 3,
  },
  buttonSecondary: {
    backgroundColor: secondary,
    borderRadius: 3,
  },
  buttonSecondaryDisabled: {
    backgroundColor: 'rgb(180, 173, 255)',
    borderRadius: 3,
  },
  buttonContainer: {
    width: '80%',
    marginHorizontal: 50,
    marginVertical: 5,
  },
  roundButtonDesplazamiento: {
    width: 80,
    height: 80,
    marginHorizontal: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  roundButtonDesplazamientoSelected: {
    width: 85,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'white',
    borderColor:primary,
    borderWidth: 5,
  },
  roundButtonCatalogos: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin:8,
    height: 90,
    width: 90,
  },
  centeredView: {
    flex:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backgroundColor:'white',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'black',
    textAlign:'center',
  },
  modalTextTitle: {
    fontSize: 30,
    color: 'black',
    textAlign:'center',
    fontWeight: 'bold',
  },
  modalTextSubtitle: {
    color: 'gray',
    textAlign:'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalView:{
    flex: 2, 
    marginHorizontal: 20,
    justifyContent: 'center', 
  },
  modalItems: { flex: 2, justifyContent: 'center', alignContent: 'center' },
  iconos: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  iconoSelected: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'white',
    borderColor: primary,
    borderWidth: 3,
  }
});
