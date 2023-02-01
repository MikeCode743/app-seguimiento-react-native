// In App.js in a new project
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PermissionsProvider} from './src/context/Permission/PermissionContext';
import {MenuLateral} from './src/navigation/MenuLateral';
import {createTable} from './src/config/database';
import {RecorridosProvider} from './src/context/Recorrido/RecorridosContext';

const AppState = ({children}) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};

function App() {
  useEffect(() => {
    createTable('tbl_recorrido');
  }, []);

  return (
    <NavigationContainer>
      <AppState>
        <RecorridosProvider>
          {/* <Navigation /> */}
          <MenuLateral />
        </RecorridosProvider>
      </AppState>
    </NavigationContainer>
  );
}

export default App;
