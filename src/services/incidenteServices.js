/* eslint-disable prettier/prettier */
import { http_axios, instance } from '../config/axios';
import {
  getIncidentesDatabase,
  storeCatalogoIncidentes,
} from '../database/TblIncidentes';

const getIncidentesOld = async () => {
  // GET DATA OF SQLITE
  const incidentes = await getIncidentesDatabase();
  if (incidentes.length > 0) {
    return incidentes;
  }

  //GET DATA OF BACKEND IF YOU DO NOT FIND DATA FROM SQLITE
  const response = await http_axios('/api/incidentes');
  const  { data } = response.data;

  if (data) {
    const inserting_incidentes = data.map(item => {
      return `(${item.id}, '${item.nombre}', '${item.icono}'),`;
    });

    const result = await storeCatalogoIncidentes(
      inserting_incidentes.join(' '),
    );
    if (result.rowsAffected === 1) {
    }
  }

  return data;
};

const getIncidentes = async() => {
  const response = await instance('/api/incidentes');
  const { data } = response.data;
  return data
}

const postIncidente = async data => {
  await http_axios('/api/reporte-incidente', null, 'post', data);
};

module.exports = {
  getIncidentes,
  postIncidente,
};
