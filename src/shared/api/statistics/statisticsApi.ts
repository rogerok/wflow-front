import { AxiosResponse } from 'axios';

import { $api } from '../api';
import { StatisticsUserResponseType } from './models/statistics';

export const getUserStatistics = (
  abortController: AbortController | null,
): Promise<AxiosResponse<StatisticsUserResponseType>> => {
  return $api.get<StatisticsUserResponseType>('/private/statistics/user', {
    signal: abortController?.signal,
  });
};
