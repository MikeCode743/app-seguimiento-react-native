import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { styles } from '../styles/layout'

export const Toolbar = () => {
  return (
    <View style={styles.toolbar}>
          <Button 
           title='Toolbar'
          />
          <Button
           title='Perfil'
           />
    </View>
  )
}

