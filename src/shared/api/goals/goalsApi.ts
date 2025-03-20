import { AxiosResponse } from 'axios';

import { $api } from '../api';
import {
  GoalRequestType,
  GoalResponseType,
  GoalsListResponseType,
} from './models/goals';

export const getGoalsList = (
  params: GoalRequestType,
  abortController: AbortController | null,
): Promise<AxiosResponse<GoalsListResponseType>> => {
  return $api.get('/private/goals', {
    signal: abortController?.signal,
    params: params,
  });
};

export const getGoalById = (
  id: string,
  abortController: AbortController | null,
): Promise<AxiosResponse<GoalResponseType>> => {
  return $api.get<GoalResponseType>(`/private/goals/${id}`, {
    signal: abortController?.signal,
  });
};

export const deleteGoal = (
  id: string,
): Promise<AxiosResponse<GoalResponseType>> => {
  return $api.get<GoalResponseType>(`/private/goals/delete/${id}`);
};
