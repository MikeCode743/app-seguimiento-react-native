import React, { useContext } from 'react'
import { Button, Text, View } from 'react-native'
import { PermissionContext } from '../context/Permission/PermissionContext';

export const Permission = () => {


    const { permissions, askLocationPermissions } = useContext( PermissionContext )

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>
              Permisos
          </Text>
          <Button 
            title='Permisos'
              onPress={askLocationPermissions} 
            />
            <Text>
              {JSON.stringify(permissions,  null, 5 )}
            </Text>
      </View>  
      )
}
