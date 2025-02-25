import { AxiosResponse } from 'axios';

import { CreateResponseType, ReportCreateRequestType } from '../../types';
import { $api } from '../api';

export const reportCreateRequest = (
  data: ReportCreateRequestType,
  abortController: AbortController | null,
): Promise<AxiosResponse<CreateResponseType>> => {
  return $api.post<CreateResponseType>('/private/reports', data, {
    signal: abortController?.signal,
  });
};
