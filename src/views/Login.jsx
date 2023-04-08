import React, { useContext, useEffect, useState } from 'react'
import { Alert, ImageBackground, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { primary, styles } from '../styles/style'
import { Button, Icon } from '@rneui/base'
import { AuthContext } from '../context/Auth/AuthContext'
import { Input } from '@rneui/themed'

export const Login = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState();
  const [cargando, setCargando] = useState(false)
  const [validLogin, setvalidLogin] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState();
  const { signIn, mensajeError, cleanError, autenticado } = useContext(AuthContext)


  if (autenticado === 'verificar') {
    return <Loading />;
  }

  const iniciarSesion = async () => {
    try {
      setCargando(true)
      setvalidLogin(false)

      const response = await signIn({ email, password });
      if(!response){
        setCargando(false)

        iniciarSesion()
      }

    } catch (error) {
      ToastAndroid.showWithGravity(
        'Ha ocurrido un error interno',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }finally {
      setCargando(false)
    }
  }

  const cleanForm = () => {
    setPassword(null);
  }

  const isEmail = () => {
    const validRegex = /^[a-zA-Z0-9_]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email){

      if (!email.match(validRegex)) {
        setEmailErrorMessage('Correo electrónico invalido');
        return false;
      } else {
        setEmailErrorMessage('');
        return true;
      }
    }
  };


  useEffect(() => {
    if (mensajeError.length === 0) return;
    Alert.alert(
      'No se logró iniciar sesión',
      mensajeError,
      [
        {
          text: 'Ok',
          onPress: () => {
            cleanError();
            cleanForm();
            setCargando(false);
          },
        }
      ]
    )
  }, [mensajeError])
  
  useEffect(() => {
    if(!emailErrorMessage && password){
      setvalidLogin(true)
    }else {
      setvalidLogin(false)
    }
  

  }, [email, password])
  
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../img/loginBackground.jpg')} resizeMode="cover" style={styles.imageBackground}>
        <View style={styles.body} >
          <Text style={styles.titleText}>Iniciar sesión</Text>
          <Input
            onChangeText={setEmail}
            value={email}
            autoCapitalize='none'
            placeholder={emailErrorMessage ? emailErrorMessage: "Correo electrónico"}
            keyboardType="email-address"
            inputMode="email"
            textAlign='center'
            style={styles.input}
            onBlur={() => isEmail()}
            errorMessage={emailErrorMessage}
            leftIcon={emailErrorMessage ? <Icon name="information-outline" type='material-community' size={20} color='white' /> : ''}
            errorStyle={emailErrorMessage ? stylesRegistro.errorStyle : null}
            label="Correo electrónico"
            labelStyle={{ color: 'white' }}
            inputContainerStyle={emailErrorMessage ? styles.inputContainerError : styles.inputContainer}
            onFocus={() => { setEmailErrorMessage("")}}

          />
          <Input
            onChangeText={setPassword}
            value={password}
            style={styles.input}
            textAlign='center'
            placeholder="******"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            secureTextEntry
            enablesReturnKeyAutomatically
            label="Contraseña"
            labelStyle={{ color: 'white' }}
            inputContainerStyle={styles.inputContainer}

          />
          <Button
            title="Continuar"
            onPress={iniciarSesion}
            buttonStyle={styles.buttonPrimary}
            disabledStyle={styles.buttonPrimaryDisabled}
            loading={cargando}
            disabled={!validLogin}
            radius="lg"
            containerStyle={styles.buttonContainer}
          />
        </View>

      </ImageBackground>
    </View>
  )
}

const stylesRegistro = StyleSheet.create({
  errorStyle: {
    color: 'white',
    textAlign: 'center',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:14,
  },
});
