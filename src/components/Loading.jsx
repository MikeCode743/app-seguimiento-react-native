import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { styles } from '../styles/style'

export const Loading = () => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={50} color={styles.primary} />
        </View>
    )
}
