/* eslint-disable prettier/prettier */
import { http_axios } from '../config/axios';
import { getMarcadoresDatabase, storeCatalogoMarcadores } from '../database/TblMarcadores';

const getMarcadores = async () => {
  // GET DATA OF SQLITE
  const marcadores = await getMarcadoresDatabase();
  if (marcadores.length > 0) {
    return marcadores;
  }

  //GET DATA OF BACKEND IF YOU DO NOT FIND DATA FROM SQLITE
  const response = await http_axios('/api/marcadores');
  const {data, status} = response.data;
  if (data) {
    const inserting_marcadores = data.map(item => {
      return `(${item.id}, '${item.nombre}', '${item.icono}'),`;
    });

    const result = await storeCatalogoMarcadores(
      inserting_marcadores.join(' '),
    );
    if (result.rowsAffected === 1) {
    }
  }

  return data;
};

module.exports = {
  getMarcadores,
};
