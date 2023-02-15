import {http_axios} from '../config/axios';

const login = async params =>
  await http_axios.post('/api/sanctum/token', {}, params);

export default {
  login,
};
