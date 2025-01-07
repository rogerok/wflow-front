import axios from 'axios';

// TODO: setup errors throwing
export const $api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});
