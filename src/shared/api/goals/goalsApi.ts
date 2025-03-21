import { AxiosResponse } from 'axios';

import { $api } from '../api';
import { CreateResponseType, SuccessResponseType } from '../models/responses';
import {
  GoalCreateRequestType,
  GoalEditRequestType,
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
  return $api.delete<GoalResponseType>(`/private/goals/delete/${id}`);
};

export const createGoal = async (
  data: GoalCreateRequestType,
  abortController: AbortController | null,
): Promise<AxiosResponse<CreateResponseType>> => {
  return $api.post<CreateResponseType>('/private/goals', data, {
    signal: abortController?.signal,
  });
};

export const editGoal = async (
  id: string,
  data: GoalEditRequestType,
): Promise<AxiosResponse<SuccessResponseType>> => {
  return $api.put<SuccessResponseType>(`/private/goals/edit/${id}`, data);
};
