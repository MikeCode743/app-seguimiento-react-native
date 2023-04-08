/* eslint-disable prettier/prettier */
import {http_axios} from '../config/axios';
import {
  getMediosDesplazamientosDatabase,
  storeCatalogoMediosDesplazamientos,
} from '../database/TblMediosDesplazamientos';

const getMediosDesplazamientos = async () => {
  // GET DATA OF SQLITE
  const medios = await getMediosDesplazamientosDatabase();
  if (medios.length > 0) return medios;

  //GET DATA OF BACKEND IF YOU DO NOT FIND DATA FROM SQLITE
  let data = null;
  const response = await http_axios('/api/medios-desplazamiento');
  data = response.data;

  if (data) {
    const inserting_medios = data.map(item => {
      return `(${item.id}, '${item.nombre}', '${item.icono}'),`;
    });

    const result = await storeCatalogoMediosDesplazamientos(
      inserting_medios.join(' '),
    );
    if (result.rowsAffected === 1) {
    }
  }

  return data;
};

module.exports = {
  getMediosDesplazamientos,
};
