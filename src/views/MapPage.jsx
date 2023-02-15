import { Button } from '@rneui/base';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import { ScrollView } from 'react-native-gesture-handler';
import { addItem } from '../config/database';
import { styles } from '../styles/style';

export const MapPage = ({ route, navigation }) => {

    const { id: medio_id, nombre, icono } = route.params;
    const [data, setData] = useState([])
    const [puntos, setPuntos] = useState([])
    const [position, setPosition] = useState()
    const [watchId, setWatchId] = useState()
    const [primerPunto, setPrimerPunto] = useState({})
    const [ultimoPunto, setUltimoPunto] = useState({})
    const [viajeIniciado, setViajeIniciado] = useState(false)

    useEffect(() => {
        if (position) {
            setData([...data, position])
            setPuntos(
                [...puntos,
                {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                ]
            )

        }
    }, [position])



    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setPosition(position)
                // console.log(format(new Date(position.timestamp), 'yyyy-MM-dd HH:mm:ss'), position.coords.latitude, position.coords.longitude);

                point = {
                    longitud: position.coords.longitude,
                    latitud: position.coords.latitude,
                }

                addItem('tbl_recorrido', null, point)
            },
            (error) => {
                // See error code charts below.
                console.error(error.code, error.message);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 25,
                timeout: 15000,
                maximumAge: 10000
            }
        )

        return position;
    }

    const getLocationObservation = async () => {

        setViajeIniciado(true)

        const observation = await Geolocation.watchPosition(
            (position) => {
                setPosition(position)
                setData([...data, position])
                // console.log('WATCH', format(new Date(position.timestamp), 'yyyy-MM-dd HH:mm:ss'), position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                // See error code charts below.
                console.error(error.code, error.message);
            },
            {
                enableHighAccuracy: true,
                interval: 3000,
                distanceFilter: 10,
            }
        )

        setWatchId(observation);

    }

    const stopLocationObserving = () => {

        setViajeIniciado(false);

        const comienzo = {
            latitude: data[0].coords.latitude,
            longitude: data[0].coords.longitude
        }
        const final = {
            latitude: data[data.length - 1].coords.latitude,
            longitude: data[data.length - 1].coords.longitude
        }
        // console.log("🚀 ~ file: Home.jsx:74 ~ stopLocationObserving ~ comienzo", comienzo)
        // console.log("🚀 ~ file: Home.jsx:79 ~ stopLocationObserving ~ final", final)
        setPrimerPunto(comienzo)
        setUltimoPunto(final)
        setData([])

        Geolocation.clearWatch(watchId);
    }


    const handleGetDirections = async () => {

        const travel = {
            source: primerPunto,
            destination: ultimoPunto,
            params: [

            ],
            waypoints: puntos
        }
        console.log(JSON.stringify(travel, null, 3));
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={{ ...styles.titleText, justifyContent: 'center' }} >{icono} {nombre} </Text>

                <View style={styles.body}>
                    <Text>
                        {JSON.stringify(position, null, 5)}
                    </Text>
                </View>
                <View style={styles.foobar}>
                    <Button
                        title="Obtener Ubicación"
                        onPress={getLocation}
                        buttonStyle={styles.buttonPrimary}
                        disabledStyle={styles.buttonPrimaryDisabled}
                        radius="lg"
                        containerStyle={styles.buttonContainer}
                    />
                    {
                        !viajeIniciado &&
                        <Button
                            title="Comenzar viaje"
                            onPress={getLocationObservation}
                            buttonStyle={styles.buttonPrimary}
                            disabledStyle={styles.buttonPrimaryDisabled}
                            radius="lg"
                            containerStyle={styles.buttonContainer}
                        />
                    }
                    {
                        viajeIniciado && <>
                            <Button
                                title="Detener viaje"
                                onPress={stopLocationObserving}
                                buttonStyle={styles.buttonSecondary}
                                disabledStyle={styles.buttonSecondaryDisabled}
                                radius="lg"
                                containerStyle={styles.buttonContainer}
                            />
                            <Button
                                title="Obtener puntos"
                                onPress={handleGetDirections}
                                buttonStyle={styles.buttonSecondary}
                                disabledStyle={styles.buttonSecondaryDisabled}
                                radius="lg"
                                containerStyle={styles.buttonContainer}
                            />
                        </>
                    }



                </View>
            </ScrollView>

        </View>
    )
}
