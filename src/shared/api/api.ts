import axios, {
  AxiosError,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';

import { LOCAL_STORAGE_TOKEN_KEY } from '../const/localStorage';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '../lib/utils/localStorage';
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

  if (typeof token === 'string' && token) {
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
      error.response.status === HttpStatusCode.Unauthorized &&
      !originalRequest?._isRetry
    ) {
      if (originalRequest) {
        originalRequest._isRetry = true;

        try {
          const resp = await axios.post<RefreshTokenResponseType>(
            '/api/auth/refresh',
            undefined,
            {
              withCredentials: true,
            },
          );

          if (resp.data) {
            setLocalStorageItem(LOCAL_STORAGE_TOKEN_KEY, resp.data.token);
            error.config.headers['Authorization'] = `Bearer ${resp.data.token}`;

            return $api.request(originalRequest);
          }
        } catch (error) {
          //TODO: add promise rejecting
          removeLocalStorageItem(LOCAL_STORAGE_TOKEN_KEY);
          // globalStore.userService.clearUserData();

          if (error instanceof AxiosError && error.response?.data?.error?.msg) {
            return Promise.reject(new Error(error.response.data.error.msg));
          }
        }
      }
    }

    return Promise.reject(error);
  },
);
