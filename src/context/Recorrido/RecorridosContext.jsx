import { createContext, useReducer } from "react"
import { recorridosReducer } from "./recorridosReducer";

export const RecorridosContext = createContext({});

const recorridoInicial = {
    listado: [],
    ultimaActualizacion: undefined,
}

export const RecorridosProvider = ({children}) => {
    const [recorridosState, dispatch] = useReducer(recorridosReducer,recorridoInicial );

    const obtenerRecorrido = () => {
        dispatch({ type: 'obtener' });
    }
    const actualizarRecorrido = (data) => {
        dispatch({ type: 'actualizar-recorrido', payload: data });
    }

    return (
        <RecorridosContext.Provider value={{
            recorridosState,
            obtenerRecorrido,
            actualizarRecorrido,
        }}>
            {children}
        </RecorridosContext.Provider>
    )
}