import { $api } from '@shared/api';
import { BookResponseType } from '@shared/types';
import { AxiosResponse } from 'axios';

export const bookById = (
  id: string,
  abortController: AbortController | null,
): Promise<AxiosResponse<BookResponseType>> => {
  return $api.get<BookResponseType>(`/private/books/${id}`, {
    signal: abortController?.signal,
  });
};
