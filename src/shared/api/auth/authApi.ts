import { AxiosResponse } from 'axios';

import { $api } from '../api';
import { AuthRequestType, AuthResponseType } from './models/auth';

export const authRequest = (
  data: AuthRequestType,
): Promise<AxiosResponse<AuthResponseType>> => {
  return $api.post<AuthResponseType>('/auth', data);
};

export const logoutRequest = (): Promise<AxiosResponse<void>> => {
  return $api.post<void>('/auth/logout');
};
