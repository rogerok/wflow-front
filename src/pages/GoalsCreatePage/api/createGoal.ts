import { $api, CreateResponseType } from '@shared/api';
import { AxiosResponse } from 'axios';

import { GoalCreateFormType } from '../model/types/createGoal';

export const createGoalRequest = async (
  data: GoalCreateFormType,
  abortController: AbortController | null,
): Promise<AxiosResponse<CreateResponseType>> => {
  return $api.post<CreateResponseType>('/private/goals', data, {
    signal: abortController?.signal,
  });
};
