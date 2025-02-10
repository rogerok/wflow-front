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

const pendingRequests = new Map<string, AbortController>();

const getRequestKey = (method: string, url: string): string =>
  `${method}-${url}`;

const abortRequest = (key: string): void => {
  if (pendingRequests.has(key)) {
    pendingRequests.get(key)?.abort();

    pendingRequests.delete(key);
  }
};

export const $api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const token = getLocalStorageItem(LOCAL_STORAGE_TOKEN_KEY);

  if (!config.signal && config.method && config.url) {
    const requestKey = getRequestKey(config.method, config.url);

    abortRequest(requestKey);

    const abortController = new AbortController();
    config.signal = abortController.signal;
    pendingRequests.set(requestKey, abortController);
  }

  if (typeof token === 'string' && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

$api.interceptors.response.use(
  (response) => {
    if (response.config.method && response.config.url) {
      pendingRequests.delete(
        getRequestKey(response.config.method, response.config.url),
      );
    }

    return response;
  },
  async (error) => {
    const originalRequest: InternalAxiosRequestConfig | undefined =
      error.config;

    if (originalRequest?.method && originalRequest?.url) {
      pendingRequests.delete(
        getRequestKey(originalRequest.method, originalRequest.url),
      );
    }

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
          removeLocalStorageItem(LOCAL_STORAGE_TOKEN_KEY);

          window.dispatchEvent(new Event('localStorageChange'));

          if (error instanceof AxiosError && error.response?.data?.error?.msg) {
            return Promise.reject(new Error(error.response.data.error.msg));
          }
        }
      }
    }

    return Promise.reject(error);
  },
);
