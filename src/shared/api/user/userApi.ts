import { AxiosResponse } from 'axios';

import { $api } from '../../api/api';
import { UserResponseType } from '../../types/user';

export const getUserById = (
  id: string,
  controller: AbortController | null,
): Promise<AxiosResponse<UserResponseType>> => {
  return $api.get<UserResponseType>(`/private/users/${id}`, {
    signal: controller?.signal,
  });
};

export const getUsers = (): Promise<AxiosResponse> => {
  return $api.get('/private/users');
};
