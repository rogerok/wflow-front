import { $api } from '@shared';
import { AxiosResponse } from 'axios';

import { AuthRequestType, AuthResponseType } from '../../types/auth';

export const authRequest = (
  data: AuthRequestType,
): Promise<AxiosResponse<AuthResponseType>> => {
  return $api.post<AuthResponseType>('/auth', data);
};
