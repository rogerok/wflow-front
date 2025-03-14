import { AxiosResponse } from 'axios';

import { $api } from '../api';
import {
  StatisticsGoalResponseType,
  StatisticsUserResponseType,
} from './models/statistics';

export const getStatisticsUser = (
  abortController: AbortController | null,
): Promise<AxiosResponse<StatisticsUserResponseType>> => {
  return $api.get<StatisticsUserResponseType>('/private/statistics/user', {
    signal: abortController?.signal,
  });
};

export const getStatisticsGoal = (
  id: string,
  abortController: AbortController | null,
): Promise<AxiosResponse<StatisticsGoalResponseType>> => {
  return $api.get<StatisticsGoalResponseType>(
    `/private/statistics/goal/${id}`,
    {
      signal: abortController?.signal,
    },
  );
};
