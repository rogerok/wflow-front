import { AxiosResponse } from 'axios';

import { GoalRequestType, GoalsListResponseType } from '../../types';
import { $api } from '../api';

export const getGoalsList = (
  params: GoalRequestType,
  abortController: AbortController | null,
): Promise<AxiosResponse<GoalsListResponseType>> => {
  return $api.get('/private/goals', {
    signal: abortController?.signal,
    params: params,
  });
};
