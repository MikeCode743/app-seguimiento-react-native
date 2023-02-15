import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, Text, TextInput, ToastAndroid, View } from 'react-native'
import { styles } from '../styles/style'
import { Button } from '@rneui/base'
import { AuthContext } from '../context/Auth/AuthContext'

export const Login = () => {

  const [email, setEmail] = useState('developer@gmail.com')
  const [password, setPassword] = useState('password');
  const [cargando, setCargando] = useState(false)
  const { signIn, mensajeError, cleanError, autenticado } = useContext(AuthContext)

  if (autenticado === 'verificar') {
    return <Loading />;
  }

  const iniciarSesion = () => {
    try {
      setCargando(true)
      signIn({ email, password });
    } catch (error) {
      console.log("🚀 ~ file: Login.jsx:24 ~ iniciarSesion ~ error", error)
      ToastAndroid.showWithGravity(
        'Ha ocurrido un error interno',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  }

  const cleanForm = () => {
    setEmail(null);
    setPassword(null);
  }

  useEffect(() => {
    if (mensajeError.length === 0) return;
    Alert.alert(
      'Inicio de sesión incorrecto',
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

  return (
    <View style={styles.container}>
      <View style={{ ...styles.body, flex: 4 }}>
        <Image
          style={{ ...styles.image, width: '80%', height: '80%' }}
          source={require('../img/login.png')} />
        <Text style={styles.titleText}>Iniciar sesión</Text>
      </View>
      <View style={{ ...styles.foobar, flex: 2 }} >

        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          inputMode="email"
          textAlign='center'
          style={styles.input}
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          textAlign='center'
          placeholder="Contraseña"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          secureTextEntry
          enablesReturnKeyAutomatically
        />
        <Button
          title="Iniciar sesión"
          onPress={iniciarSesion}
          buttonStyle={styles.buttonPrimary}
          disabledStyle={styles.buttonPrimaryDisabled}
          loading={cargando}
          disabled={cargando}
          radius="lg"
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  )
}
