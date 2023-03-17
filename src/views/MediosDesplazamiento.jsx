import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { Loading } from '../components/Loading'
import { styles } from '../styles/style'

export const MediosDesplazamiento = ({navigation}) => {

    if (!mediosDesplazamientos) return <Loading/> 

    return (
        <View>
            <ScrollView>
            {
                    mediosDesplazamientos.map( medio => {
                        return (
                            <Pressable
                                onPress={() => navigation.navigate('Desplazamiento', { id:medio.id, nombre: medio.nombre, icono: medio.icono})}
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
