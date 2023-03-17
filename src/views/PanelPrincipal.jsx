import { Button } from '@rneui/base';
import React from 'react'
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Icon } from '@rneui/themed';
import { styles } from '../styles/style'
import { useEffect } from 'react';
import { createTable } from '../config/database';
import { AccountComponent } from '../components/AccountComponent';


export const PanelPrincipal = ({ navigation }) => {

    useEffect(() => {
      
        createTable('tbl_recorrido');
    }, [])
    

    return (
        <View style={styles.container}>
            <AccountComponent/>
            <Pressable
                onPress={() => navigation.navigate('MediosDesplazamiento')}
                style={{
                    ...styles.buttonPrimary, 
                    flexDirection: 'row',
                    margin: 50,
                    justifyContent: 'space-evenly',
                    borderColor: 'white',
                    borderWidth: 4,
                    padding: 40,
                    alignItems: 'center',
                    borderRadius: 8
                }}
            >
                <Icon
                    name='map-marker'
                    type='material-community'
                    size={50}
                    color= 'white'
                />

                <Text style={{
                    color: 'white',
                    fontSize: 20,

                }}>Iniciar recorrido</Text>
            </Pressable>
        </View>
    )
}

const stylesPanel = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    menu: {
        flexDirection: 'row',
        margin: 50,
        justifyContent: 'space-evenly',
        borderColor: 'black',
        borderWidth: 4,
        padding: 40,
        alignItems: 'center',
    }
})