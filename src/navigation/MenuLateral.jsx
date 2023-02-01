import { createDrawerNavigator } from '@react-navigation/drawer';
import { MapPage } from '../views/MapPage';
import { ListadoRecorridos } from '../views/ListadoRecorridos';
import { Navigation } from './Navigation';
import { RecorridosProvider } from '../context/Recorrido/RecorridosContext';

const Drawer = createDrawerNavigator();

export const MenuLateral = () => {



    return (
        <Drawer.Navigator>


            <Drawer.Screen name="StackNavigation" component={Navigation} />
            <Drawer.Screen name="MapPage" component={MapPage} />
                <Drawer.Screen name="ListadoRecorrido" component={ListadoRecorridos} />
        </Drawer.Navigator>
    );
}