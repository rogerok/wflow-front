import { $api } from '@shared/api';
import { AxiosResponse } from 'axios';

import {
  UserCreateRequestType,
  UserCreateResponseType,
} from '../model/types/userCreate';

export const createUserRequest = (
  data: UserCreateRequestType,
  controller: AbortController | null,
): Promise<AxiosResponse<UserCreateResponseType>> => {
  return $api.post<UserCreateResponseType>('/users', data, {
    signal: controller?.signal,
  });
};
