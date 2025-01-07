import { $api } from '@shared';
import { AxiosResponse } from 'axios';

import { UserCreateRequestType, UserCreateResponseType } from '../types/user';

export const createUserRequest = (
  data: UserCreateRequestType,
  controller: AbortController
): Promise<AxiosResponse<UserCreateResponseType>> => {
  return $api.post<UserCreateResponseType>('/users', data, {
    signal: controller.signal,
  });
};
