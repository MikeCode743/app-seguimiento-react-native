import {http_axios} from '../config/axios';

const postDesplazamiento = async data =>
  await http_axios('/api/desplazamiento/registrar', null, 'post', data);

module.exports = {
  postDesplazamiento,
};
