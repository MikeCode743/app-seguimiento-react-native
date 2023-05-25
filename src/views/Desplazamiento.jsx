import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ToastAndroid } from 'react-native';
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
import { MarcadorModalComponent } from '../components/MarcadorModalComponent';
import RutaTransporteModalComponent from '../components/RutaTransporteModalComponent';
import CostoDesplazamientoModalComponent from '../components/CostoDesplazamientoModalComponent';

//Servicios
import { postIncidente } from '../services/incidenteServices'

//Context
import { CatalogosContext } from '../context/store/CatalogosContext'
import { DesplazamientoContext } from '../context/tracking/DesplazamientoContext';

import { getUbicacionActual } from '../utils/functions';
import { NetworkContext } from '../context/network/NetworkContext';
import { showToast } from '../utils/toast';


export const Desplazamiento = () => {
  const [position, setPosition] = useState();
  const [watchId, setWatchId] = useState();
  const [viajeIniciado, setViajeIniciado] = useState(false);
  const [open, setOpen] = useState(false);
  const [medio, setMedio] = useState({ id: 1, nombre: 'Caminando', icono: 'walk' });
  const [modalIncidentes, setModalIncidentes] = useState(false);
  const [, setIncidenteSelected] = useState();
  const [modalMarcador, setModalMarcador] = useState(false);
  const [medioTransporteModal, setMedioTransporteModal] = useState(false)
  const [costoDesplazamientoModal, setCostoDesplazamientoModal] = useState(false)

  const { ctl_medios_desplazamientos, ctl_incidentes, obtenerMediosDesplazamientos, obtenerIncidentes } = useContext(CatalogosContext)
  const { agregarMedioDesplazamiento, iniciarDesplazamiento, registrarDesplazamiento } = useContext(DesplazamientoContext)
  const { isConnected } = useContext(NetworkContext)

  const created = async () => {
    await obtenerMediosDesplazamientos()
    await obtenerIncidentes()
  };

  const getLocationObservation = () => {
    setViajeIniciado(true);
    setDefaultOptions({ locale: es })
    showToast('Viaje Iniciado', ToastAndroid.SHORT);

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
    showToast('Viaje finalizado', ToastAndroid.LONG);
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
    created();
  }, []);

  useEffect(() => {
    if (viajeIniciado) registrarDesplazamiento(position, medio);
  }, [position])


  useEffect(() => {
    if (medio.nombre === 'Autobús' && viajeIniciado && isConnected) setMedioTransporteModal(true)
  }, [medio]);

  useEffect(() => {
    if (viajeIniciado) {
      iniciarDesplazamiento()
      agregarMedioDesplazamiento(medio)
      if (medio.nombre === 'Autobús' && isConnected) setMedioTransporteModal(true)
    }
  }, [viajeIniciado])


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fondo.png')}
        resizeMode="cover"
        style={styles.imageBackground}
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
        />
        <RutaTransporteModalComponent
          open={medioTransporteModal}
          setOpen={setMedioTransporteModal}
        />
        <CostoDesplazamientoModalComponent
          open={costoDesplazamientoModal}
          setOpen={setCostoDesplazamientoModal}
        />
        <View style={styles.body}>
          <View style={styles.row}>
            {
              isConnected && viajeIniciado ?
                <View style={styles.chip}>
                  <Icon name='cellphone-marker' type='material-community' color={'white'} style={{ marginRight: 5 }} />
                  <Text style={styles.text}> Conectado</Text>
                </View>
                : !isConnected && viajeIniciado ?
                  <View style={styles.chipDisabled}>
                    <Icon name='cellphone-marker' type='material-community' color={'white'} style={{ marginRight: 5 }} />
                    <Text style={styles.text}>Modo sin conexión</Text>
                  </View> :
                  <View style={{...styles.chip, backgroundColor:'white', borderColor: primary}}>
                    <Icon name='cellphone-marker' type='material-community' color={primary} style={{ marginRight: 5 }} />
                    <Text style={styles.textBlack}>Registracker</Text>
                  </View>
            }
          </View>
          <Text style={styles.title}>
            Elige tu medio de desplazamientos
          </Text>
          <MediosDesplazamientosComponentes
            selected={medio}
            cambiarMedio={setMedio}
            open={medioTransporteModal}
            setOpen={setMedioTransporteModal}
          />
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
