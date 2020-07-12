import axios from 'axios';

let api = axios.create({
  baseURL: 'http://85.242.4.235:3000',
  timeout: 10000,
});

export const setClientToken = token => {
  APIKit.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default api;