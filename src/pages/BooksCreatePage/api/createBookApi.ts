import { $api, BookFormRequestType, CreateResponseType } from '@shared/api';
import { AxiosResponse } from 'axios';

export const createBookRequest = (
  data: BookFormRequestType,
): Promise<AxiosResponse<CreateResponseType>> => {
  return $api.post<CreateResponseType>('/private/books', data);
};
