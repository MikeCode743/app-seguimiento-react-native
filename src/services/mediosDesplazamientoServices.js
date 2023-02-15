import {http_axios} from '../config/axios';

const getMediosDesplazamientos = async () => await http_axios('/api/medios-desplazamiento');

module.exports =  {
  getMediosDesplazamientos,
};
