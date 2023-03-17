import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Icon, Overlay } from '@rneui/base'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../context/Auth/AuthContext'
import { account } from '../services/aurtenticacionServices'
import { styles } from '../styles/style'

export const AccountComponent = () => {

    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [visible, setVisible] = useState(false);
    const { logout } = useContext(AuthContext)


    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const created = async () => {
        try {
            const data = await AsyncStorage.multiGet(['email', 'username'])
            if (data[0].email === null || data[0].email === undefined) {
                const { email, name: username } = await account();
                await AsyncStorage.multiSet([['email', email], ['username', username]])
                setEmail(email)
                setUsername(username)
            }
        } catch (error) {
            console.error("🚀 ~ file: AccountComponent.jsx:24 ~ created ~ error", error)

        }
    }

    useEffect(() => {
        created();
    }, [])

    return (
        <View style={{
            flexDirection: 'row',
            margin: '2%',
            borderWidth: 2,
            justifyContent: 'space-between',
            paddingHorizontal: '2%',
            backgroundColor: styles.primary,
            borderRadius: 12

        }}>
            <View>
                <Text style={{ color: 'white', fontSize: 20 }}>Bienvenido/a {username}</Text>
                <Text style={{ color: 'white', fontSize: 16, fontStyle: 'italic' }}>{email}</Text>
                <Text style={{ color: 'white', fontSize: 16 }}></Text>

            </View>
            <View style={{
                justifyContent: 'center',
            }}>
                <Icon
                    name='account-circle'
                    type='material-community'
                    size={50}
                    color='white'
                    onPress={toggleOverlay}
                />
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <Text style={{ ...styles.titleText, color: styles.primary }}>Opciones</Text>
                    <Button
                        icon={
                            <Icon
                                name="logout"
                                type="material-community"
                                color="white"
                                size={25}
                                iconStyle={{marginRight: 10 }}
                            />
                        }
                        title="Cerrar sesión"
                        onPress={logout}
                        buttonStyle={styles.buttonPrimary}                    />
                </Overlay>
            </View>
        </View>
    )
}
