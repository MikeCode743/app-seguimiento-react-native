import { Icon } from '@rneui/base'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Pressable, ScrollView, SectionList, Text, View } from 'react-native'
import { Loading } from '../components/Loading'
import { getMediosDesplazamientos } from '../services/mediosDesplazamientoServices'
import { styles } from '../styles/style'

export const MediosDesplazamiento = ({navigation}) => {


    const [mediosDesplazamientos, setMediosDesplazamientos] = useState()

    useEffect(() => {
        created()
    }, [])

    const created = async () => {
        const { data } = await getMediosDesplazamientos();
        setMediosDesplazamientos(data)
    }

    if (!mediosDesplazamientos) return <Loading/> 


    return (
        <View>
            <ScrollView>
            {
                    mediosDesplazamientos.map( medio => {
                        return (
                            <Pressable
                                onPress={() => navigation.navigate('MapPage', { id:medio.id, nombre: medio.nombre, icono: medio.icono})}
                                key={medio.id}
                                style={{
                                    ...styles.buttonPrimary,
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    borderColor: 'white',
                                    borderWidth: 4,
                                    alignItems: 'center',
                                    borderRadius: 8
                                }}
                            >
                                <Text style={{
                                    color: 'white',
                                    fontSize: 20,

                                }}>{medio.icono} {medio.nombre}</Text>
                            </Pressable>
                        )
                    })
            }
                

            </ScrollView>
        </View>
    )
}
