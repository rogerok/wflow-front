import { AxiosResponse } from 'axios';

import { $api } from '../api';
import { CreateResponseType } from '../models/responses';
import { UserCreateRequestType, UserResponseType } from './models/user';

export const getUserById = (
  id: string,
  controller: AbortController | null,
): Promise<AxiosResponse<UserResponseType>> => {
  return $api.get<UserResponseType>(`/private/users/${id}`, {
    signal: controller?.signal,
  });
};

export const getUsers = (): Promise<AxiosResponse<UserResponseType[]>> => {
  return $api.get('/private/users');
};

export const createUserRequest = (
  data: UserCreateRequestType,
  controller: AbortController | null,
): Promise<AxiosResponse<CreateResponseType>> => {
  return $api.post<CreateResponseType>('/users', data, {
    signal: controller?.signal,
  });
};
