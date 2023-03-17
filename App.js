/* eslint-disable prettier/prettier */
// In App.js in a new project
import 'react-native-gesture-handler';

import React from 'react';
import Toast from 'react-native-toast-message';

import { NavigationContainer } from '@react-navigation/native';
import { PermissionsProvider } from './src/context/Permission/PermissionContext';
import { Navigation } from './src/navigation/Navigation';
import { AuthProvider } from './src/context/Auth/AuthContext';
import { RecorridosProvider } from './src/context/Recorrido/RecorridosContext';
import { CatalogosProvider } from './src/context/Catalogos/CatalogosContext';

function App() {
  return (
    <NavigationContainer>
      <PermissionsProvider>
        <AuthProvider>
          <RecorridosProvider>
            <CatalogosProvider>
              <Navigation />
              <Toast />
            </CatalogosProvider>
          </RecorridosProvider>
        </AuthProvider>
      </PermissionsProvider>
    </NavigationContainer>
  );
}

export default App;
