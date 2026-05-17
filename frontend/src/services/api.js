import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Замените на ваш URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен авторизации к запросам
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const nftAPI = {
  getNfts: () => api.get('/nftcards/'),
  getNft: (id) => api.get(`/nftcards/${id}/`),
  createNft: (data) => api.post('/nftcards/', data),
  deleteNft: (id) => api.delete(`/nftcards/${id}/`),
};

export const userAPI = {
  getUsers: () => api.get('/users/'),
  getUser: (id) => api.get(`/users/${id}/`),
};

export default api;