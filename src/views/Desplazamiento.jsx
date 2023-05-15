import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, ImageBackground } from 'react-native';
import { FAB, Icon, SpeedDial } from '@rneui/base';
import { format } from 'date-fns';
import Geolocation from 'react-native-geolocation-service';
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
import { CatalogosContext } from '../context/store/CatalogosContext'
import { MarcadorModalComponent } from '../components/MarcadorModalComponent';
import { createTableMarcadores } from '../database/TblMarcadores';
import { createTableReporteMarcador } from '../database/TblReporteMarcador';
import { createTables, getUbicacionActual } from '../utils/functions';
import RutaTransporteModalComponent from '../components/RutaTransporteModalComponent';
import CostoDesplazamientoModalComponent from '../components/CostoDesplazamientoModalComponent';
import { DesplazamientoContext } from '../context/tracking/DesplazamientoContext';


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
  const [, setIncidenteSelected] = useState();
  const [contadorMedio, setContadorMedio] = useState(0);
  const [fechaUltimoDesplazamiento, setFechaUltimoDesplazamiento] = useState()
  const [modalMarcador, setModalMarcador] = useState(false);
  const [listaMediosTransporte, setlistaMediosTransporte] = useState([])

  const [medioTransporteModal, setMedioTransporteModal] = useState(false)
  const [ultimoMedio, setUltimoMedio] = useState()

  const [costoDesplazamientoModal, setCostoDesplazamientoModal] = useState(false)

  const { ctl_medios_desplazamientos, ctl_incidentes, obtenerMediosDesplazamientos, obtenerIncidentes } = useContext(CatalogosContext)

  const { agregarMedioDesplazamiento, iniciarDesplazamiento, registrarDesplazamiento } = useContext(DesplazamientoContext)

  const created = async () => {
    await obtenerMediosDesplazamientos()
    await obtenerIncidentes()
  };

  const getLocationObservation = () => {
    setViajeIniciado(true);
    setDefaultOptions({ locale: es })

    const observation = Geolocation.watchPosition(
      position => {
        setPosition(position);
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
    setPosition()
    Geolocation.clearWatch(watchId);
    setCostoDesplazamientoModal(true);  //Modal for displaying costo de desplazamiento
  };

  /**
  * Abrir Modal de ingreso de incidentes
  */
  const openModalIncidentes = () => {
    setModalIncidentes(true);
    setOpen(false);
  };

  /**
   * Abrir Modal de ingreso de marcadores y levantamientos
   */
  const openModalMarcadores = () => {
    setModalMarcador(true);
    setOpen(false);
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
      fecha_reporte: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      // fecha_reporte: '2022-01-02 00:00:00',
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
    createTables()
    created();
  }, []);

  useEffect(() => {
    if (viajeIniciado) registrarDesplazamiento(position, medio);
  }, [position])


  useEffect(() => {
    if (medio.nombre === 'Autobús' && viajeIniciado) setMedioTransporteModal(true)
  }, [medio]);

  useEffect(() => {
    if (viajeIniciado) {
      iniciarDesplazamiento()
      agregarMedioDesplazamiento(medio)
      if (medio.nombre === 'Autobús') setMedioTransporteModal(true)
    }
  }, [viajeIniciado])


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fondo.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
          tintColor: 'transparent'
        }}
      >

        <KeepAwake />
        <MarcadorModalComponent
          open={modalMarcador}
          setOpen={setModalMarcador}
          getUbicacion={getUbicacionActual}
        />
        <ModalComponent
          modalVisible={modalIncidentes}
          setModalVisible={setModalIncidentes}
          setItem={setIncidenteSelected}
          data={ctl_incidentes.data}
          enviar={enviarIncidenteModal}
          uuid={uuidDesplazamiento}
        />
        <RutaTransporteModalComponent
          open={medioTransporteModal}
          setOpen={setMedioTransporteModal}
        />
        <CostoDesplazamientoModalComponent
          open={costoDesplazamientoModal}
          setOpen={setCostoDesplazamientoModal}
        />
        {/* <View style={{ flex: 1, marginHorizontal: '12%' }}>
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
      </View> */}
        <View style={styles.body}>
          <Text style={styles.text}>
            Elige tu medio de desplazamientos
          </Text>
          <MediosDesplazamientosComponentes
            selected={medio}
            cambiarMedio={setMedio}
            mediosDesplazamientos={ctl_medios_desplazamientos.data}
            open={medioTransporteModal}
            setOpen={setMedioTransporteModal}
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
            title="Marcador"
            icon={stylesDesplazamiento.iconoMarcador}
            color={styles.primary}
            onPress={openModalMarcadores}
            titleStyle={styles.textBlack}
          />
          <SpeedDial.Action
            title="Incidente"
            icon={stylesDesplazamiento.iconoIncidente}
            color={styles.primary}
            onPress={openModalIncidentes}
            titleStyle={styles.textBlack}
          />
        </SpeedDial>
      </ImageBackground>
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
  iconoMarcador: {
    name: 'map-marker-check',
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
