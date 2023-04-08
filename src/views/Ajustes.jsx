import React, { useEffect, useState } from 'react'
import { Button, Icon, ListItem } from '@rneui/base';
import { useContext } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { primary, styles } from '../styles/style';
import { AuthContext } from '../context/Auth/AuthContext'
import { CatalogosContext } from '../context/Catalogos/CatalogosContext';
import { dropMediosDesplazamientos } from '../database/TblMediosDesplazamientos';
import { dropIncidentes } from '../database/TblIncidentes';
import { Switch } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';


export const Ajustes = () => {

  const { logout } = useContext(AuthContext)

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [sincronizarLoading, setSincronizarLoading] = useState(false)
  const [expanded, setExpanded] = useState(false);

  const [checkOpcionDesplazamiento, setCheckOpcionDesplazamiento] = useState()
  const [checkOpcionIncidente, setCheckOpcionIncidente] = useState()

  const { obtenerMediosDesplazamientos, obtenerIncidentes } = useContext(CatalogosContext)
  const [fecha] = useState(format(new Date(), 'yyyy'))

  const cerrarSesion = () => {
    setLoading(true);
    logout();
  }

  const sincronizarCatalogos = async () => {
    try {
      setSincronizarLoading(true)
      await dropMediosDesplazamientos()
      await dropIncidentes()

      await obtenerMediosDesplazamientos();
      await obtenerIncidentes();
    } catch (error) {
    }
    finally {
      setSincronizarLoading(false)
    }
  }

  const sincronizarDesplazamiento = async (value) => {
    const estado = value ? 'activo' : 'inactivo'
    await AsyncStorage.setItem('opcion-desplazamiento', estado)
    setCheckOpcionDesplazamiento(value)
  }

  const sincronizarIncidente = async (value) => {
    const estado = value ? 'activo' : 'inactivo'
    await AsyncStorage.setItem('opcion-incidente', estado)
    setCheckOpcionIncidente(value)
  }

  const getEstadoOpciones = async () => {
    const desplazamiento = await AsyncStorage.getItem('opcion-desplazamiento');
    desplazamiento === 'activo' ? setCheckOpcionDesplazamiento(true) : setCheckOpcionDesplazamiento(false)

    const incidente = await AsyncStorage.getItem('opcion-incidente');
    incidente === 'activo' ? setCheckOpcionIncidente(true) : setCheckOpcionIncidente(false)
  }

  useEffect(() => {
    getEstadoOpciones();
  }, [])


  const SincronizarList = () => {
    return (
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title>Sincronizar</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <ListItem
          Component={TouchableHighlight}
          onPress={sincronizarCatalogos}
        >
          <ListItem.Content>

            <ListItem.Title>Sincronizar catalogos</ListItem.Title>
            <ListItem.Subtitle>Toca para actualizar</ListItem.Subtitle>
          </ListItem.Content>
          {
            sincronizarLoading ? (
              <ActivityIndicator size="small" color={primary} />
            ) : (
              <Icon
                type="material-community"
                name={'cloud-download'}
                color={'grey'}
              />
            )
          }

        </ListItem>
      </ListItem.Accordion>
    )
  }

  const OpcionDesplazamiento = () => {
    return (
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Envió automático de registros de desplazamientos</ListItem.Title>
        </ListItem.Content>
        <Switch
          trackColor={{ false: '#d8d8db', true: '#d8d8db' }}
          thumbColor={checkOpcionDesplazamiento ? primary : '#f4f3f4'}
          value={checkOpcionDesplazamiento}
          onValueChange={(value) => sincronizarDesplazamiento(value)}
        />

      </ListItem>
    )
  }
  const OpcionIncidente = () => {
    return (
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Envió automático de registros de incidentes</ListItem.Title>
        </ListItem.Content>
        <Switch
          trackColor={{ false: '#d8d8db', true: '#d8d8db' }}
          thumbColor={checkOpcionIncidente ? primary : '#f4f3f4'}
          value={checkOpcionIncidente}
          onValueChange={(value) => sincronizarIncidente(value)}
        />

      </ListItem>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 10 }}>
        <SincronizarList />
        <OpcionDesplazamiento />
        <OpcionIncidente />
      </View>
      <View style={styles.foobar}>
        <Button
          title="Cerrar sesión"
          type="clear"
          onPress={() => { setModalVisible(true) }}
          titleStyle={{ color: styles.primary }}
          icon={
            <Icon
              name="logout"
              type="material-community"
              size={15}
              color={styles.primary}
            />
          }
          iconRight
        />
        <View style={{marginTop:10, justifyContent:'center', alignContent:'center'}}>

                    <Text style={{color: 'gray', fontSize: 14, fontWeight: 'normal', textAlign:'center' }}>© { fecha } Universidad de El Salvador.</Text>
                    <Text style={{ color: 'gray', fontSize: 14, fontWeight: 'normal', textAlign:'center' }}>Todos los derechos reservados</Text>
        </View>

      </View>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={stylesAjustes.centeredView}>
          <View style={stylesAjustes.modalView}>
            <Text style={{ ...styles.titleText, color: primary, fontSize: 20 }}>Cerrar sesión</Text>
            <Text style={{ ...styles.titleText, color: 'gray', fontSize: 16, fontWeight: 'normal' }}>¿Seguro de cerrar sesión?</Text>
            <Text style={{ ...styles.titleText, color: 'gray', fontSize: 14, fontWeight: 'normal' }}>Cualquier registros no sincronizado se perderá</Text>
            <View style={{
              flexDirection: 'row'
            }}>
              {
                loading ? (
                  <ActivityIndicator size="large" color={styles.primary} />
                ) : (
                  <>
                    <Button title="Sí, seguro" type="clear" titleStyle={{ color: primary }} onPress={() => { cerrarSesion() }} />
                    <Button title="Cancelar" type="clear" titleStyle={{ color: 'gray' }} onPress={() => { setModalVisible(!modalVisible) }} />
                  </>
                )
              }
            </View>
          </View>
        </View>
      </Modal>

    </View>
  )
}

const stylesAjustes = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});