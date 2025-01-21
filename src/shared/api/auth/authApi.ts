import { AxiosResponse } from 'axios';

import { AuthRequestType, AuthResponseType } from '../../types/auth';
import { $api } from '../api';

export const authRequest = (
  data: AuthRequestType,
): Promise<AxiosResponse<AuthResponseType>> => {
  return $api.post<AuthResponseType>('/auth', data);
};
