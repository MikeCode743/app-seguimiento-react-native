/* eslint-disable prettier/prettier */
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const http_axios = async (url, params, method = 'get', data) => {
  const baseURL = API_URL||'http://45.33.119.69:8100';

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    timeout: 10000,
  };

  const token = await AsyncStorage.getItem('token');
  
  if (token !== null) {
    headers.Authorization = `Bearer ${token}`;
  }

  const instance = axios.create({
    baseURL,
    headers,
  });

  return new Promise((resolve, reject) => {
    switch (method) {
      case 'get':
        return instance
          .get(url, params)
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err.response);
          });

      case 'post':
        return instance
          .post(url, {...params, ...data})
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          });

      case 'put':
        return instance
          .put(url, {...params, ...data})
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err.response);
          });

      case 'delete':
        return instance
          .delete(url, {...params, ...data})
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err.response);
          });

      case 'patch':
        return instance
          .patch(url, {...params, ...data})
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err.response);
          });

      default:
        break;
    }
  });
};
