import React, { useState, useCallback, useEffect } from 'react'
import { FlatList, Text, ToastAndroid, View, VirtualizedList } from 'react-native'
import { Button, Icon, ListItem, Tab, TabView } from '@rneui/base'
import { useFocusEffect } from '@react-navigation/native';

import { getDesplazamientos, removeDesplazamiento, sendDesplazamiento } from '../database/TblDesplazamientos'
import { postDesplazamiento } from '../services/desplazamientoServices'
import { Loading } from '../components/Loading'
import { styles } from '../styles/style';
import { deleteReporteIncidente, enviarIncidente, getReporteIncidentesDatabase } from '../database/TblIncidentes';
import { postIncidente } from '../services/incidenteServices'

export const ListadoDesplazamiento = () => {

  const [listadoDesplazamientos, setListadoDesplazamientos] = useState()
  const [listadoIncidentes, setListadoIncidentes] = useState()
  const [cargando, setCargando] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0);


  const items = async () => {
    const desplazamientos = await getDesplazamientos();
    setListadoDesplazamientos(desplazamientos)

    const incidentes = await getReporteIncidentesDatabase()
    setListadoIncidentes(incidentes)

  }

  const mostrarNotificacion = (mensaje) => {
    ToastAndroid.showWithGravity(
      mensaje,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  };

  const deleteDesplazamiento = async (uuid, reset) => {
    const mensaje = 'Desplazamiento eliminado. ';
    try {
      await removeDesplazamiento(uuid)
      items();
      reset()
      mostrarNotificacion(mensaje)

    } catch (error) {
      reset()

    }
  }

  const deleteIncidentes = async (id, reset) => {
    const mensaje = 'Incidente eliminado. ';
    try {
      await deleteReporteIncidente(id)
      items();
      reset()
      mostrarNotificacion(mensaje)

    } catch (error) {
      reset()
    }
  }

  const enviarDesplazamiento = async (item, reset) => {
    const mensaje = 'Desplazamiento enviado exitosamente.';

    try {
      setCargando(true)
      const data = {
        uuid: item.uuid,
        desplazamiento: JSON.parse(item.desplazamiento)
      }
      //Enviardo al backend
      await postDesplazamiento(data)
      //Actualizado en la base de datos local SQLITE
      await sendDesplazamiento(item.uuid, reset)
      items();
      reset()
      mostrarNotificacion(mensaje)
    } catch (error) {
      reset()
    } finally {
      setCargando(false)
    }
  }

  const enviarReporteIncidente = async (item, reset) => {
    const mensaje = 'Incidente enviado exitosamente.';

    try {
      setCargando(true)
      await postIncidente(item)
      await enviarIncidente(item.id)
      items();
      reset()
      mostrarNotificacion(mensaje)
    } catch (error) {
      reset()
    } finally {
      setCargando(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      items();
    }, [])
  );

  useEffect(() => {
    items();
  }, [])


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    items();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  if (!listadoDesplazamientos) return <Loading />


  const ItemDesplazamiento = ({ item }) => (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <Button
          title="Eliminar"
          onPress={() => deleteDesplazamiento(item.uuid, reset)}
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Enviar"
          onPress={() => enviarDesplazamiento(item, reset)}
          icon={{ name: 'send', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'green' }}
          loading={cargando}
        />
      )}
      containerStyle={{ backgroundColor: "white" }}
      topDivider={true}
    >
      <Icon name="run" type='material-community' />
      <ListItem.Content  >
        <ListItem.Title>Registrado: {item.fecha_registro}</ListItem.Title>
        <ListItem.Subtitle>{item.uuid}</ListItem.Subtitle>
      </ListItem.Content>

      <Icon
        type="material-community"
        name={item.enviado === 1 ? 'check-circle-outline' : 'cloud-upload'}
        color={item.enviado === 1 ? 'green' : 'grey'}
      />
    </ListItem.Swipeable>
  )

  const itemIncidente = ({ item }) => (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <Button
          title="Eliminar"
          onPress={() => deleteIncidentes(item.id, reset)}
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Enviar"
          onPress={() => enviarReporteIncidente(item, reset)}
          icon={{ name: 'send', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'green' }}
          loading={cargando}
        />
      )}
      containerStyle={{ backgroundColor: "white" }}
      topDivider={true}
    >
      <Icon name={item.icono} type='material-community' />
      <ListItem.Content  >
        <ListItem.Title>{item.nombre}</ListItem.Title>
        <ListItem.Subtitle>{item.fecha_reporte}{item.enviado}</ListItem.Subtitle>
      </ListItem.Content>

      <Icon
        type="material-community"
        name={item.enviado == 1 ? 'check-circle-outline' : 'cloud-upload'}
        color={item.enviado == 1 ? 'green' : 'grey'}
      />
    </ListItem.Swipeable>
  )

  return (
    <View style={styles.container}>
      <Tab value={index} onChange={setIndex} dense>
        <Tab.Item>Desplazamientos</Tab.Item>
        <Tab.Item>Incidentes</Tab.Item>
      </Tab>

      <TabView value={index} onChange={setIndex} disableSwipe={true} disableTransition={false} animationType="spring">
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            data={listadoDesplazamientos}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={ItemDesplazamiento}
          />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            data={listadoIncidentes}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={itemIncidente}
          />
          {/* <VirtualizedList
            initialNumToRender={100}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
            getItemCount={getItemCount}
            getItem={listadoIncidentes[item]}
          /> */}
        </TabView.Item>

      </TabView>


    </View>
  )
}
