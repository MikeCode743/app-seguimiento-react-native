import React, { useContext } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { PermissionContext } from '../context/Permission/PermissionContext';

export const Loading = () => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                Loading ...
            </Text>

        <ActivityIndicator size={50} color='black' />
        </View>
    )
}
