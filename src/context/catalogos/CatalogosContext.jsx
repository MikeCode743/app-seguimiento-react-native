import React, { useReducer, createContext } from 'react'
import { catalogosReducer } from './catalogosReducer';

import { getMediosDesplazamientos } from '../../services/mediosDesplazamientoServices';
import { getIncidentes } from '../../services/incidenteServices';



export const CatalogosContext = createContext();

const catalogosInicial = {
    ctl_medios_desplazamientos: {},
    ctl_incidentes: {},
}

export const CatalogosProvider = ({ children }) => {

    const [catalogosState, dispatch] = useReducer(catalogosReducer, catalogosInicial)

    const obtenerMediosDesplazamientos = async () => {
        const data = await getMediosDesplazamientos()
        if(data){
            dispatch({ type: 'medios_desplazamientos', payload: { data } })
        }else {
            obtenerMediosDesplazamientos()
        }
    }

    const obtenerIncidentes = async () => {
        const data = await getIncidentes()
        if(data){
            dispatch({ type: 'ctl_incidentes', payload: { data } })
        }else {
            obtenerIncidentes()
        }
    }

    return (
        <CatalogosContext.Provider
            value={{
                ...catalogosState,
                obtenerMediosDesplazamientos,
                obtenerIncidentes
            }}
        >
            {children}
        </CatalogosContext.Provider>
    )
}