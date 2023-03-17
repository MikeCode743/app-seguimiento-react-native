import { Button, Icon } from '@rneui/base';
import React, { useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { primary, styles } from '../styles/style';
import { Loading } from './Loading';

export const ModalComponent = ({ modalVisible, setModalVisible, data, setItem, enviar, uuid }) => {

    const [selected, setSelected] = useState()

    if (!data) return <Loading />


    const reportarIncidente = async () => {
        setModalVisible(!modalVisible)
        setSelected()
        await enviar(selected, uuid );
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    onPress={() => setSelected(item)}
                    style={selected?.id === item.id ? styles.iconoSelected : styles.iconos}
                >
                    <Icon
                        name={item.icono}
                        type='material-community'
                        color={selected?.id === item.id ? primary : 'grey'}
                        reverseColor={primary}
                        solid
                        size={selected?.id === item.id ?50: 40}
                    />

                </TouchableOpacity>
                <Text adjustsFontSizeToFit style={styles.modalText}>
                    {item.nombre}
                </Text>
            </View>
        );
    };

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView} >
                    <Icon
                        color="white"
                        name="close"
                        reverseColor="black"
                        type="material-community"

                    />

                    <View style={styles.modalView}>

                        <Text style={styles.modalTextTitle}>Reportar incidente</Text>
                        <Text style={styles.modalTextSubtitle}>Los incidentes vehiculares son eventos que involucran vehículos y pueden tener distintas causas, puedes reportarlos en cualquier momento. </Text>
                    </View>
                    <View style={styles.modalItems} >
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            numColumns='3'
                        />
                    </View>
                    <Button
                        title="Reportar"
                        onPress={() => reportarIncidente()}
                        radius="lg"
                        buttonStyle={styles.buttonPrimary}
                        containerStyle={styles.buttonContainer}
                    />
                </View>
            </Modal>
        </>
    )
}
