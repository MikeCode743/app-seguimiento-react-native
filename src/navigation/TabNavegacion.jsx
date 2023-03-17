import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Desplazamiento } from '../views/Desplazamiento';
import { ListadoDesplazamiento } from '../views/ListadoDesplazamiento';
import { Ajustes } from '../views/Ajustes';
import { Icon, Image } from '@rneui/base';
import { styles } from '../styles/style';
import { ImageBackground } from 'react-native';

const Tab = createBottomTabNavigator();

const options = {
    headerMode: 'float',
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: styles.primary,
        elevation: 0,
    },
    headerBackAccessibilityLabel: 'Atrás',
    headerBackTitle: 'Atrás',
    headerBackTitleVisible: false,
    //   cardOverlayEnabled: true
    tabBarStyle:{
        backgroundColor: 'white',
    }
}

export const TabNavegacion = () => {
    return (
        <Tab.Navigator screenOptions={options}>
            <Tab.Screen
                name="Desplazamiento"
                component={Desplazamiento}
                options={{
                    title: 'Desplazamiento',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="map-marker-account" type='material-community' color={color} size={size} />
                    ),
                    tabBarLabelPosition: 'below-icon',
                    // tabBarBadge: ''
                    tabBarActiveTintColor: styles.primary
                }}
            />
            <Tab.Screen
                name="ListadoDesplazamiento"
                component={ListadoDesplazamiento}
                options={{
                    title: 'Registros',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="map-search-outline" type='material-community' color={color} size={size} />
                    ),
                    tabBarLabelPosition: 'below-icon',
                    tabBarActiveTintColor: styles.primary
                    // tabBarBadge: ''
                }}
            />
            <Tab.Screen
                name="Ajustes"
                component={Ajustes}
                options={{
                    title: 'Ajustes',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cog-outline" type='material-community' color={color} size={size} />
                    ),
                    tabBarLabelPosition: 'below-icon',
                    tabBarActiveTintColor: styles.primary


                }}
            />
        </Tab.Navigator>
    );
}
