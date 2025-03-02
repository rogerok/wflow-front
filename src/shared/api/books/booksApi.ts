import { AxiosResponse } from 'axios';

import { $api } from '../api';
import { BooksListResponseType } from './models/books';

export const getBooksList = (
  abortController: AbortController | null,
): Promise<AxiosResponse<BooksListResponseType>> => {
  return $api.get<BooksListResponseType>('/private/books', {
    signal: abortController?.signal,
  });
};
