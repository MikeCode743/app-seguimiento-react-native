import { format } from 'date-fns/esm';
import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import { addItem } from '../config/database';

export const MapPage = () => {

    const [data, setData] = useState([])
    const [puntos, setPuntos] = useState([])
    const [position, setPosition] = useState()
    const [watchId, setWatchId] = useState()
    const [primerPunto, setPrimerPunto] = useState({})
    const [ultimoPunto, setUltimoPunto] = useState({})

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
                console.log(format(new Date(position.timestamp), 'yyyy-MM-dd HH:mm:ss'), position.coords.latitude, position.coords.longitude);

                point = {
                    longitud: position.coords.longitude,
                    latitud: position.coords.latitude,
                }

                addItem('tbl_recorrido', null, point )
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

        const observation = await Geolocation.watchPosition(
            (position) => {
                setPosition(position)
                setData([...data, position])
                console.log('WATCH', format(new Date(position.timestamp), 'yyyy-MM-dd HH:mm:ss'), position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                // See error code charts below.
                console.error(error.code, error.message);
            },
            {
                enableHighAccuracy: true,
            }
        )

        setWatchId(observation);

    }

    const stopLocationObserving = () => {

        const comienzo = {
            latitude: data[0].coords.latitude,
            longitude: data[0].coords.longitude
        }
        const final = {
            latitude: data[data.length - 1].coords.latitude,
            longitude: data[data.length - 1].coords.longitude
        }
        console.log("🚀 ~ file: Home.jsx:74 ~ stopLocationObserving ~ comienzo", comienzo)
        console.log("🚀 ~ file: Home.jsx:79 ~ stopLocationObserving ~ final", final)
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
        <View>
            <Text>
                {JSON.stringify(position, null, 5)}
            </Text>

            <Button
                title='Get Location'
                onPress={getLocation}
            />

            <Button
                title='Observar'
                onPress={getLocationObservation}
            />

            <Button
                title='Detener'
                onPress={stopLocationObserving}
            />

            <Button onPress={handleGetDirections} title="Get Directions" />
        </View>
    )
}
