import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_SERVER_URL
  ? import.meta.env.VITE_API_BASE_SERVER_URL
  : import.meta.env.VITE_API_BASE_URL;

const authorizedApiClient = axios.create({
  baseURL: BASE_URL,
});

authorizedApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authorizedApiClient;
