import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FAB, Icon, SpeedDial } from '@rneui/base';
import { format } from 'date-fns';
import Geolocation from 'react-native-geolocation-service';
import uuid from 'react-native-uuid';
import BackgroundService from 'react-native-background-actions';
import KeepAwake from '@sayem314/react-native-keep-awake';
import { es } from 'date-fns/locale'
import { setDefaultOptions } from 'date-fns'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
//Componentes
import { primary, styles } from '../styles/style';
import { MediosDesplazamientosComponentes } from '../components/MediosDesplazamientosComponentes';
import { ModalComponent } from '../components/ModalComponent';
//Base de datos 
import { createTableMediosDesplazamiento } from '../database/TblMediosDesplazamientos';
import { createTableIncidentes, createTableReporteIncidentes, storeReporteIncidente, enviarIncidente } from '../database/TblIncidentes';
import { addItemDesplazamiento, createTableDesplazamiento, sendDesplazamiento } from '../database/TblDesplazamientos';

//Servicios
import { postDesplazamiento } from '../services/desplazamientoServices'
import { postIncidente } from '../services/incidenteServices'

//Context
import { RecorridosContext } from '../context/Recorrido/RecorridosContext';
import { CatalogosContext } from '../context/Catalogos/CatalogosContext'


export const Desplazamiento = () => {
  const [data, setData] = useState([]);
  const [puntos, setPuntos] = useState([]);
  const [position, setPosition] = useState();
  const [watchId, setWatchId] = useState();
  const [viajeIniciado, setViajeIniciado] = useState(false);
  const [open, setOpen] = useState(false);
  const [uuidDesplazamiento, setUuidDesplazamiento] = useState();
  const [medio, setMedio] = useState({ id: 1, nombre: 'Caminando', icono: 'walk' });
  const [horaInciado, setHoraInciado] = useState();
  const [fechaInciado, setFechaInciado] = useState();
  const [modalIncidentes, setModalIncidentes] = useState(false);
  const [incidenteSelected, setIncidenteSelected] = useState();
  const [contadorMedio, setContadorMedio] = useState(0);
  const [fechaUltimoDesplazamiento, setFechaUltimoDesplazamiento] = useState()

  const { insertarPunto, restaurar } = useContext(RecorridosContext);
  const { ctl_medios_desplazamientos, ctl_incidentes, obtenerMediosDesplazamientos, obtenerIncidentes } = useContext(CatalogosContext)

  const created = async () => {
    await obtenerMediosDesplazamientos()
    await obtenerIncidentes()
  };

  const getLocation = () => {
    setData([])
    setViajeIniciado(true);
    setUuidDesplazamiento(uuid.v4());
    setFechaHoraInciado(new Date());


    Geolocation.getCurrentPosition(
      position => {
        setPosition(position);
        setData([...data, position]);
      },
      error => {
        // See error code charts below.
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
      },
    );

    return position;
  };
  const IniciarDesplazamiento = async () => {
    setViajeIniciado(true);
    setUuidDesplazamiento(uuid.v4());
    setFechaHoraInciado(new Date());

    const detener = time =>
      new Promise(resolve => setTimeout(() => resolve(), time));
    const veryIntensiveTask = async taskDataArguments => {
      // Example of an infinite loop task
      const { delay } = taskDataArguments;
      await new Promise(async resolve => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
          Geolocation.getCurrentPosition(
            position => {
              setPosition(position);
            },
            error => {
              // See error code charts below.
            },
            {
              enableHighAccuracy: true,
              distanceFilter: 0,
            },
          );

          await detener(delay);
        }
      });
    };

    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({
      taskDesc: 'registrando desplazamiento',
    });
  };

  const getLocationObservation = () => {
    setViajeIniciado(true);
    setUuidDesplazamiento(uuid.v4());
    setDefaultOptions({ locale: es })
    setHoraInciado(format(new Date(), 'hh:mm:ss aaaa'));
    setFechaInciado(format(new Date(), 'PPP'));

    const observation = Geolocation.watchPosition(
      position => {
        setPosition(position);
        setData([...data, position]);
      },
      error => {
      },
      {
        enableHighAccuracy: true,
        interval: 5000,
        distanceFilter: 0,
      },
    );

    setWatchId(observation);
  };

  const stopLocationObserving = async () => {
    setViajeIniciado(false);
    await BackgroundService.stop()
    if (data.length > 0) {
      const data = {
        uuid: uuidDesplazamiento,
        desplazamiento: JSON.stringify(puntos, null),
        fecha_registro: format(new Date(), 'dd-MM-yyyy hh:mm:ss aaaa'),
      };
      await addItemDesplazamiento(data);

      const optionDesplazamiento = await AsyncStorage.getItem('opcion-desplazamiento');
      if (optionDesplazamiento === 'activo') {
        await postDesplazamiento({ uuid: uuidDesplazamiento, desplazamiento: puntos })
        await sendDesplazamiento(uuidDesplazamiento)
      }

      const mensaje = 'Desplazamiento finalizado';
      const subtitulo = `Registrado en la fecha ${data.fecha_registro}`;
      notificacion(mensaje, subtitulo);

    }
    restaurar();
    setData([]);
    setPuntos([])
    setPosition()
    setUuidDesplazamiento();
    setContadorMedio(0);
    Geolocation.clearWatch(watchId);
    setFechaUltimoDesplazamiento(format(new Date(), 'PPPP p'))
  };

  const openModalIncidentes = async () => {
    setModalIncidentes(true);
    setOpen(false);
  };

  const getUbicacionActual = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 0,
        },
      );
    });
  };

  const enviarIncidenteModal = async (incidente, uuid = null) => {
    const position = await getUbicacionActual();

    const data = {
      id_incidente: incidente.id,
      icono: incidente.icono,
      nombre: incidente.nombre,
      longitud: position.coords.longitude,
      latitud: position.coords.latitude,
      altitud: position.coords.altitude,
      fecha_reporte: format(new Date(), 'dd-MM-yyyy hh:mm:ss'),
    };
    if (uuid) data.desplazamiento_id = uuid;


    const response = await storeReporteIncidente(data);
    if (response.rowsAffected === 1) {

      const optionIncidente = await AsyncStorage.getItem('opcion-incidente');
      if (optionIncidente === 'activo') {
        await postIncidente(data)
        await enviarIncidente(response.insertId)
      }



      const mensaje = 'Incidente registrado';
      const subtitulo = `${data.nombre} registrado la fecha de ${data.fecha_reporte}`;
      notificacion(mensaje, subtitulo);
    }
  };

  const notificacion = (mensaje, subtitulo = '') => {
    Toast.show({
      type: 'success',
      text1: mensaje,
      text2: subtitulo,
      position: 'top',
      topOffset: 0
    });
  };

  useEffect(() => {
    createTableDesplazamiento();
    createTableMediosDesplazamiento();
    createTableIncidentes();
    createTableReporteIncidentes();
    created();
  }, []);

  //Detectar cambios de la posicion
  useEffect(() => {
    if (position) {
      const point = {
        latitud: position.coords.latitude,
        longitud: position.coords.longitude,
        fecha_registro: position.timestamp,
        velocidad: position.coords.speed,
        id_medio_desplazamiento: medio.id,
        agrupacion_medio_desplazamiento: contadorMedio,
      };
      setPuntos([...puntos, point]);
      insertarPunto({ uuid: uuidDesplazamiento, punto: point });
    }
  }, [position]);

  useEffect(() => {
    if (viajeIniciado) setContadorMedio(contadorMedio + 1);
  }, [medio]);

  return (
    <View style={styles.container}>
      <KeepAwake />
      <ModalComponent
        modalVisible={modalIncidentes}
        setModalVisible={setModalIncidentes}
        setItem={setIncidenteSelected}
        data={ctl_incidentes.data}
        enviar={enviarIncidenteModal}
        uuid={uuidDesplazamiento}
      />
      <View style={{ flex: 1, marginHorizontal: '12%' }}>
        {
          viajeIniciado ? (
            <View style={stylesDesplazamiento.panel}>
              <View style={stylesDesplazamiento.backgroundImage}>
                <Image
                  style={{ width: 65, height: 65, }}
                  source={require('../img/travel/image-location.gif')}
                />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={stylesDesplazamiento.textPanel} >
                  Viaje en curso
                </Text>
                <Text style={stylesDesplazamiento.textPanel} >
                  Iniciado: {horaInciado}
                </Text>
                <Text style={stylesDesplazamiento.textPanel} >
                  Fecha: {fechaInciado}
                </Text>
              </View>
            </View>
          ) : (
            fechaUltimoDesplazamiento && (
              <View style={stylesDesplazamiento.panelOff}>
                <View style={stylesDesplazamiento.backgroundImage}>
                  <Icon
                    name='history'
                    color='#808080'
                    type='material-community'
                    size={50}
                    containerStyle={{ width: 65, height: 65, justifyContent: 'center', alignItems: 'center' }}
                  />
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={stylesDesplazamiento.textPanelOff} >
                    Ultimo viaje
                  </Text>
                  <Text style={stylesDesplazamiento.textPanelOff} >
                    Hora: {horaInciado}
                  </Text>
                  <Text style={stylesDesplazamiento.textPanelOff} >
                    Fecha: {fechaInciado}
                  </Text>
                </View>
              </View>
            )
          )
        }
      </View>
      <View style={styles.body}>
        <Text style={styles.subtitleText}>
          Elige tu medio de desplazamientos
        </Text>
        <MediosDesplazamientosComponentes
          selected={medio}
          cambiarMedio={setMedio}
          mediosDesplazamientos={ctl_medios_desplazamientos.data}
        />
      </View>
      <View style={styles.foobar}>
        {/* Deja un espacio vació entre los medios de desplazamientos y los botones de FAB */}
      </View>
      <>
        {viajeIniciado ? (
          <FAB
            visible={viajeIniciado}
            onPress={stopLocationObserving}
            title="Detener viaje"
            placement="left"
            upperCase
            icon={stylesDesplazamiento.iconoTerminarViaje}
            style={{ marginBottom: 20 }}
            color={styles.primary}
          />
        ) : (
          <FAB
            visible
            onPress={getLocationObservation}
            title="Comenzar el viaje"
            placement="left"
            upperCase
            icon={stylesDesplazamiento.iconoComenzarViaje}
            style={{ marginBottom: 20 }}
            color="green"
          />
        )}
      </>
      <SpeedDial
        isOpen={open}
        icon={stylesDesplazamiento.iconoFAB}
        openIcon={stylesDesplazamiento.iconoFABClose}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        color={styles.primary}>
        <SpeedDial.Action
          title="Incidente"
          icon={stylesDesplazamiento.iconoIncidente}
          color={styles.primary}
          onPress={openModalIncidentes}
        />
      </SpeedDial>
    </View>
  );
};

const stylesDesplazamiento = StyleSheet.create({
  panel: {
    backgroundColor: primary,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 3,
    margin: 10,
    padding: 10,
  },
  panelOff: {
    backgroundColor: '#d0d0d0',
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    borderWidth: 3,
    margin: 10,
    padding: 10,
  },
  textPanel: { color: 'white', fontSize: 14 },
  textPanelOff: {
    color: 'black', fontSize: 14
  },
  backgroundImage: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    padding: 0,
    borderRadius: 5,
    marginRight: 15
  },
  textTitlePanel: { color: 'white', fontSize: 20 },
  iconoFAB: {
    name: 'map-marker-radius',
    color: 'white',
    type: 'material-community',
  },
  iconoIncidente: {
    name: 'marker-check',
    color: 'white',
    type: 'material-community',
  },
  iconoFABClose: { name: 'close', color: 'white' },
  iconoComenzarViaje: {
    name: 'map-marker-distance',
    color: 'white',
    type: 'material-community',
  },
  iconoTerminarViaje: {
    name: 'stop-circle-outline',
    color: 'white',
    type: 'material-community',
  },

});
