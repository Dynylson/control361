import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_TOKEN_API}`,
    'Content-Type': 'application/json',
  },
});