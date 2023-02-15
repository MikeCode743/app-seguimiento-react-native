import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { PermissionContext } from '../context/Permission/PermissionContext';
import { Button } from '@rneui/base'
import { Loading } from '../components/Loading';
import { styles } from '../styles/style';

export const Permisos = ({ navigation }) => {
  const { permissions, askLocationPermissions } = useContext(PermissionContext)
  const [blocked, setBlocked] = useState(false)

  if (permissions.locationStatus === 'unavailable') {
    return <Loading />;
  }

  if (permissions.locationStatus === 'never_ask_again') setBlocked(true);


  return (
    <View style={styles.container}>
      <View style={{...styles.body, flex: 4}}>

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
      <View style={{...styles.foobar, alignItems:'center', justifyContent:'center'}} >


        {
          !blocked
            ? <Button
              title='Permitir geolocalización'
              onPress={askLocationPermissions}
              buttonStyle={styles.buttonPrimary}
              containerStyle={styles.buttonContainer}
              radius="lg"
            />
            : <Button
              title='GPS bloqueado'
              onPress={() => console.log("object")}
            />
        }
      </View>

    </View>
  )
}

const styleText = StyleSheet.create({
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
    marginHorizontal: 20,
    color: 'gray',
  },
  image: {
    resizeMode: 'contain',
    height: 200,
    width: 400,
    marginVertical: 10,
  }
})
