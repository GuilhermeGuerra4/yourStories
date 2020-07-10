import axios from 'axios';

let api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
});

export const setClientToken = token => {
  APIKit.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default api;