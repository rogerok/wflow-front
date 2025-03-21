import { AxiosResponse } from 'axios';

import { $api } from '../api';
import { CreateResponseType } from '../models/responses';
import { UserCreateRequestType, UserResponseType } from './models/user';

export const getUserById = (
  id: string,
): Promise<AxiosResponse<UserResponseType>> => {
  return $api.get<UserResponseType>(`/private/users/${id}`);
};

export const createUserRequest = (
  data: UserCreateRequestType,
  controller: AbortController | null,
): Promise<AxiosResponse<CreateResponseType>> => {
  return $api.post<CreateResponseType>('/users', data, {
    signal: controller?.signal,
  });
};
