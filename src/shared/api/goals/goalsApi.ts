import { AxiosResponse } from 'axios';

import { $api } from '../api';
import { GoalRequestType, GoalsListResponseType } from './models/goals';

export const getGoalsList = (
  params: GoalRequestType,
  abortController: AbortController | null,
): Promise<AxiosResponse<GoalsListResponseType>> => {
  return $api.get('/private/goals', {
    signal: abortController?.signal,
    params: params,
  });
};
