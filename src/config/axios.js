import axios from 'axios';
import {API_URL} from '@env';

export const http_axios = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
