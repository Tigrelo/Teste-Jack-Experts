// src/updateToken.js
import axios from './axiosConfig';

export const updateToken = (newToken) => {
  localStorage.setItem('token', newToken);
  axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
};