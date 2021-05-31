import axios from 'axios';

let APIKit = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 10000,
});

export default APIKit;
export const token = localStorage.getItem('user_token')
