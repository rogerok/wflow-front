import { AxiosResponse } from 'axios';

import { $api } from '../api';
import {
  ReportCreateRequestType,
  ReportCreateResponseType,
} from './models/reports';

export const reportCreateRequest = (
  data: ReportCreateRequestType,
  abortController: AbortController | null,
): Promise<AxiosResponse<ReportCreateResponseType>> => {
  return $api.post<ReportCreateResponseType>('/private/reports', data, {
    signal: abortController?.signal,
  });
};
