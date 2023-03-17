import { createDrawerNavigator } from '@react-navigation/drawer';
import { Desplazamiento } from '../views/Desplazamiento';
import { ListadoRecorridos } from '../views/ListadoRecorridos';
import { Navigation } from './Navigation';
import { RecorridosProvider } from '../context/Recorrido/RecorridosContext';

const Drawer = createDrawerNavigator();

export const MenuLateral = () => {



    return (
        <Drawer.Navigator>
            <Drawer.Screen name="StackNavigation" component={Navigation} />
            <Drawer.Screen name="Desplazamiento" component={Desplazamiento} />
            <Drawer.Screen name="ListadoRecorrido" component={ListadoRecorridos} />
        </Drawer.Navigator>
    );
}