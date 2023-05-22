import React, { useReducer, createContext, useContext } from 'react'
import { catalogosReducer } from './catalogosReducer';

import { getMediosDesplazamientos } from '../../services/mediosDesplazamientoServices';
import { getIncidentes } from '../../services/incidenteServices';
import { getMarcadores } from '../../services/marcadorServices';
import { getVehiculos } from '../../services/vehiculos';
import { format } from 'date-fns';

import { getIncidentesDatabase } from '../../database/TblIncidentes';
import { dropVehiculosDatabase, getVehiculosDatabase, storeVehiculosDatabase } from '../../database/TblVehiculos';
import { NetworkContext } from '../network/NetworkContext';
import { getMarcadoresDatabase } from '../../database/TblMarcadores';


export const CatalogosContext = createContext();

const catalogosInicial = {
    ctl_medios_desplazamientos: {},
    ctl_incidentes: {},
    clt_marcadores: {},
    clt_vehiculos: {},
}

export const CatalogosProvider = ({ children }) => {

    const [catalogosState, dispatch] = useReducer(catalogosReducer, catalogosInicial)

    const { isConnected } = useContext(NetworkContext)

    const obtenerMediosDesplazamientos = async () => {
        const data = await getMediosDesplazamientos()
        if (data) {
            dispatch({ type: 'medios_desplazamientos', payload: { data } })
            return true
        } else {
            obtenerMediosDesplazamientos()
        }
    }

    const obtenerIncidentes = async () => {

        const incidentes = await getIncidentesDatabase();
        if (incidentes) {
            dispatch({ type: 'ctl_incidentes', payload: { data: incidentes } })
            return true
        }
        const data = await getIncidentes()
        if (data) {
            dispatch({ type: 'ctl_incidentes', payload: { data, update: format(new Date(), 'dd-MM-yyyy HH:mm:ss') } })
            return true
        } else {
            obtenerIncidentes()
        }
    }

    const obtenerMarcadores = async () => {
        if (isConnected) {
            const data = await getMarcadores()
            if (data) {
                dispatch({ type: 'clt_marcadores', payload: { data, update: format(new Date(), 'dd-MM-yyyy HH:mm:ss') } })
                return true
            } else {
                await obtenerMarcadores();
            }
        } else {
            console.log("Disconnect");
            const data = await getMarcadoresDatabase();
            dispatch({ type: 'clt_marcadores', payload: { data } })
            return true
        }

    }


    const obtenerVehiculos = async () => {
        if (isConnected) {
            const data = await getVehiculos()
            if (data || data !== undefined) {
                data.forEach(element => {
                    element.contador = 0
                });

                // await storeVehiculosDatabase(data)
                dispatch({ type: 'ctl_vehiculos', payload: { data, update: format(new Date(), 'dd-MM-yyyy HH:mm:ss') } })
                return true
            }
            else {
                await obtenerVehiculos()
            }
        } else {
            const data = await getVehiculosDatabase()
            dispatch({ type: 'ctl_vehiculos', payload: { data } })
            return true
        }
    }


    const getCatalogos = async () => {
        try {
            const [medios, incidente, marcador, vehiculo] = await Promise.all([
                obtenerMediosDesplazamientos,
                obtenerIncidentes,
                obtenerMarcadores,
                obtenerVehiculos
            ])

            console.log("response", await marcador());

        } catch (error) {
            console.log("🚀 ~ file: CatalogosContext.jsx:47 ~ getCatalogos ~ error:", error)

        }
    }

    return (
        <CatalogosContext.Provider
            value={{
                ...catalogosState,
                obtenerMediosDesplazamientos,
                obtenerIncidentes,
                obtenerVehiculos,
                getCatalogos,
            }}
        >
            {children}
        </CatalogosContext.Provider>
    )
}