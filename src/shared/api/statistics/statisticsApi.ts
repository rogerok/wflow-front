import { AxiosResponse } from 'axios';

import { $api } from '../api';
import {
  StatisticChartResponseType,
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

export const getStatisticsChart = (
  abortController: AbortController | null,
): Promise<AxiosResponse<StatisticChartResponseType>> => {
  return $api.get<StatisticChartResponseType>('/private/statistics/user/full', {
    signal: abortController?.signal,
  });
};
