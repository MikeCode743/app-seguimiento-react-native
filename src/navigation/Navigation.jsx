import React, { useContext, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../views/Home';
import { Desplazamiento } from '../views/Desplazamiento';
import { Permission } from '../views/Permission';
import { PermissionContext } from '../context/Permission/PermissionContext';
import { Loading } from '../components/Loading';
import { Permisos } from '../views/Permisos';
import { Login } from '../views/Login';
import { AuthContext } from '../context/Auth/AuthContext';
import { PanelPrincipal } from '../views/PanelPrincipal';
import { MediosDesplazamiento } from '../views/MediosDesplazamiento';
import { Registrarse } from '../views/Registrarse';
import { FormularioRegistro } from '../views/FormularioRegistro';

const Stack = createNativeStackNavigator();

const options = {
    headerShown: false,
    headerMode: 'float',
    headerTintColor: 'black',
    headerStyle: {
        backgroundColor: 'white',
        elevation: 0,
    },
    headerBackAccessibilityLabel: 'Atrás',
    headerBackTitle: 'Atrás',
    headerBackTitleVisible: false,

    //   cardOverlayEnabled: true
}

export const Navigation = () => {

    const { permissions, checkLocationPermission } = useContext(PermissionContext);
    const { autenticado } = useContext(AuthContext);
    console.log("🚀 ~ file: Navigation.jsx:34 ~ Navigation ~ authState", autenticado)

    useEffect(() => {
        checkLocationPermission()
    }, [])


    return (
        <Stack.Navigator
            screenOptions={options}
        >

            {
                (permissions.locationStatus === 'granted')
                    ? <Stack.Group >
                        {
                            (autenticado === 'autenticado')
                                ? <Stack.Group >
                                    <Stack.Screen name='PanelPrincipal' component={PanelPrincipal} />
                                    <Stack.Screen name='Desplazamiento' component={Desplazamiento} />
                                    <Stack.Screen name='MediosDesplazamiento' component={MediosDesplazamiento} />
                                </Stack.Group>
                                : <Stack.Group >
                                    <Stack.Screen name='Home' component={Home} />
                                    <Stack.Screen name='Login' component={Login} />
                                    <Stack.Screen name='Registrarse' component={Registrarse} />
                                    <Stack.Screen name='FormularioRegistro' component={FormularioRegistro} />
                                </Stack.Group>
                        }

                    </Stack.Group>


                    : <Stack.Screen name="Permission" component={Permisos} />
            }
        </Stack.Navigator>
    )
}