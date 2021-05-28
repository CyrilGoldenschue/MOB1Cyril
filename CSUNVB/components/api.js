import axios from 'axios';

let APIKit = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
});

export const setClientToken = token => {
  APIKit.interceptors.request.use(function(config){
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default APIKit;
