import axios, { HttpStatusCode, InternalAxiosRequestConfig } from 'axios';

import { LOCAL_STORAGE_TOKEN_KEY } from '../const';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '../lib';
import { globalStore } from '../stores/global/GlobalStore';
import { RefreshTokenResponseType } from '../types/auth';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _isRetry?: boolean;
  }
}

export const $api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const token = getLocalStorageItem(LOCAL_STORAGE_TOKEN_KEY);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest: InternalAxiosRequestConfig | undefined =
      error.config;

    if (
      error.response &&
      error.response.status === HttpStatusCode.Unauthorized
    ) {
      if (originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;

        try {
          const resp = await $api.post<RefreshTokenResponseType>(
            '/auth/refresh',
            undefined,
            {
              withCredentials: true,
            },
          );

          if (resp) {
            setLocalStorageItem(LOCAL_STORAGE_TOKEN_KEY, resp.data.token);
            return $api.request(originalRequest);
          }
        } catch (error) {
          //TODO: add promise rejecting
          removeLocalStorageItem(LOCAL_STORAGE_TOKEN_KEY);
          globalStore.userService.clearUserData();

          throw error;
        }
      }
    }

    return Promise.reject(error);
  },
);
