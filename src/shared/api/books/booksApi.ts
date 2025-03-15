import { AxiosResponse } from 'axios';

import { $api } from '../api';
import { BookResponseType, BooksListResponseType } from './models/books';

export const getBooksList = (
  abortController: AbortController | null,
): Promise<AxiosResponse<BooksListResponseType>> => {
  return $api.get<BooksListResponseType>('/private/books', {
    signal: abortController?.signal,
  });
};

export const getBookById = (
  id: string,
  abortController: AbortController | null,
): Promise<AxiosResponse<BookResponseType>> => {
  return $api.get<BookResponseType>(`/private/books/${id}`, {
    signal: abortController?.signal,
  });
};
