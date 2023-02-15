import React from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from '../styles/style'
import { Button } from '@rneui/themed';

export const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{
                ...styles.body,
            }}>
                <Image
                    style={{...styles.image , width: '80%', height: '80%'}}
                    source={require('../img/travel/transporte(6).png')} />
                    <Text style={styles.titleText}>Seguimiento APP</Text>
            </View>
            <View style={
                styles.foobar
            }>
                <Button
                    title="Iniciar sesión"
                    buttonStyle={styles.buttonPrimary}
                    radius="lg"
                    containerStyle={{
                        width: '80%',
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    onPress={ () => navigation.navigate('Login')}
                />
                <Button
                    title="Registrarse"
                    buttonStyle={styles.buttonSecondary}
                    radius="lg"
                    containerStyle={{
                        width: '80%',
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                />
            </View>
        </View>
    )
}
