import React, { useContext, useEffect, useState } from 'react'
import { Image, ImageBackground, Linking, StyleSheet, Text, View } from 'react-native'
import { PermissionContext } from '../context/Permission/PermissionContext';
import { Button } from '@rneui/base'
import { Loading } from '../components/Loading';
import { styles } from '../styles/style';
import { useCallback } from 'react';

export const Permisos = ({ navigation }) => {
  const { permissions, askLocationPermissions } = useContext(PermissionContext)
  const [blocked, setBlocked] = useState(false)

  if (permissions.locationStatus === 'unavailable') {
    return <Loading />;
  }

  const OpenSettingsButton = ({ children }) => {
    const handlePress = useCallback(async () => {
      await Linking.openSettings();
    }, []);

    return <Button title={children} onPress={handlePress} />;
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../img/loginBackground.jpg')} resizeMode="cover" style={{
        flex: 1,
        justifyContent: 'center',
      }}>

        <View style={{ ...styles.body, flex: 4 }}>

          <Image
            source={require('../img/permiso/map-pointer.png')}
            style={{ ...styles.image, width: '80%', height: '80%' }}
          />
          <Text style={styleText.titleText}>
            Habilitar Geolocalización
          </Text>
          <Text style={styleText.subtitleText}>
            Permitiendo la geolocalización podras registrar tu recorrido, seleccionar tu medio de desplazamiento y otras funcionalidades.
          </Text>
        </View>
        <View style={{ ...styles.foobar, alignItems: 'center', justifyContent: 'center' }} >


          {
            permissions.locationStatus !== 'never_ask_again'
              ? <Button
                title='Permitir geolocalización'
                onPress={askLocationPermissions}
                buttonStyle={styles.buttonPrimary}
                containerStyle={styles.buttonContainer}
                radius="lg"
              />
              : <OpenSettingsButton>Habilitar permisos</OpenSettingsButton>


          }
        </View>
      </ImageBackground>

    </View>
  )
}

const styleText = StyleSheet.create({
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'white'
  },
  subtitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
    marginHorizontal: 20,
    color: 'white',
  },
  image: {
    resizeMode: 'contain',
    height: 200,
    width: 400,
    marginVertical: 10,
  }
})
