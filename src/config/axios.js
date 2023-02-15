import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const http_axios = async (url, params, method = 'get') => {
  const baseURL = API_URL;

  const token = await AsyncStorage.getItem('token')


  const instance = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
          .post(url, params)
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err.response);
          });

      case 'put':
        return instance
          .post(url, params)
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err.response);
          });

      case 'delete':
        return instance
          .post(url, params)
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err.response);
          });

      case 'patch':
        return instance
          .post(url, params)
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
