import { createContext, useReducer } from "react"
import { recorridosReducer } from "./recorridosReducer";

export const RecorridosContext = createContext({});

const desplazamientoInicial = {
    uuid: null,
    desplazamiento: [],
    cantidadPuntos: 0,
    ultimoPunto: {},
    ultimaActualizacion: undefined,
}

export const RecorridosProvider = ({ children }) => {
    const [desplazamientoState, dispatch] = useReducer(recorridosReducer, desplazamientoInicial);

    const insertarPunto = (point) =>{
        dispatch({ type: 'insertar', payload: point })
    }

    const restaurar = () => {
        dispatch({ type: 'restaurar'})
    }

    return (
        <RecorridosContext.Provider value={{
            desplazamientoState,
            insertarPunto,
            restaurar
        }}>
            {children}
        </RecorridosContext.Provider>
    )
}