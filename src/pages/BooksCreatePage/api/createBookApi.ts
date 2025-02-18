import { $api } from '@shared/api';
import { BookFormRequestType, CreateResponseType } from '@shared/types';
import { AxiosResponse } from 'axios';

export const createBookRequest = (
  data: BookFormRequestType,
): Promise<AxiosResponse<CreateResponseType>> => {
  return $api.post<CreateResponseType>('/private/books', data);
};
