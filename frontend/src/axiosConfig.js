// src/axiosConfig.js
import axios from 'axios';

// Cria uma instância do axios com a URL base da API
const instance = axios.create({
  baseURL: 'http://localhost:5000', // URL base para suas APIs
});

// Função para atualizar o cabeçalho Authorization
const setAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    instance.defaults.headers.common['Authorization'] = token;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

// Atualiza o cabeçalho Authorization inicialmente
setAuthHeader();

// Interceptor para lidar com erros relacionados à autenticação
instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      // Lidar com a expiração do token e tentar renová-lo, se necessário
    }
    return Promise.reject(error);
  }
);

export default instance;
