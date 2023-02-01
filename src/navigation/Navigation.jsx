import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../views/Home';
import { MapPage } from '../views/MapPage';
import { Permission } from '../views/Permission';
import { PermissionContext } from '../context/Permission/PermissionContext';
import { Loading } from '../components/Loading';

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
    checkLocationPermission();
    if (permissions.locationStatus === 'unavailable'){
        return <Loading/>;
    }

  return (
      <Stack.Navigator
          screenOptions={options}
       >

        {
            (permissions.locationStatus === 'granted')
             ? <Stack.Screen name='Home' component={Home} />
             : <Stack.Screen name="Permission" component={Permission} />
        }

          <Stack.Screen name="MapPage" component={MapPage} />
      </Stack.Navigator>
  )
}
