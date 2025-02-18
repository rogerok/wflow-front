import { $api } from '@shared/api';
import { CreateResponseType } from '@shared/types';
import { AxiosResponse } from 'axios';

import { GoalCreateFormType } from '../types/createGoal';

export const createGoalRequest = async (
  data: GoalCreateFormType,
  abortController: AbortController | null,
): Promise<AxiosResponse<CreateResponseType>> => {
  return $api.post<CreateResponseType>('/goals', data, {
    signal: abortController?.signal,
  });
};
