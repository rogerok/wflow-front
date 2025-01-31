import { AxiosResponse } from 'axios';

import { UserResponseType } from '../../types/user';
import { $api } from '../api';

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
