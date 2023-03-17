import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { primary, styles } from '../styles/style';
import { Icon } from '@rneui/base';
import { Loading } from './Loading';


export const MediosDesplazamientosComponentes = ({ selected, cambiarMedio, mediosDesplazamientos }) => {

    

    if (!mediosDesplazamientos) return <Loading />

    const renderItem = ({ item }) => {
        return (
            <View style={{
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    onPress={() => cambiarMedio(item)}
                    style={selected.id === item.id ? styles.iconoSelected : styles.iconos}
                >
                    <Icon
                        name={item.icono}
                        type='material-community'
                        color={selected.id === item.id ? primary : 'grey'}
                        reverseColor={primary}
                        solid
                        size={selected.id === item.id ? 50 : 36}
                    />

                </TouchableOpacity>
                <Text adjustsFontSizeToFit style={styles.modalText}>
                    {item.nombre} 
                </Text>
            </View>
        );
    };


    return (
        <View style={styles.modalView}>
            <FlatList
                data={mediosDesplazamientos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns='3'
            />
        </View>
    )
}
