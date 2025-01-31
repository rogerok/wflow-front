import { AxiosResponse } from 'axios';

import { BooksListResponseType } from '../../types/book';
import { $api } from '../api';

export const getBooks = (
  abortController: AbortController,
): Promise<AxiosResponse<BooksListResponseType>> => {
  return $api.get<BooksListResponseType>('/private/books', {
    signal: abortController.signal,
  });
};
