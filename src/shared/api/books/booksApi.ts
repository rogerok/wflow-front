import { AxiosResponse } from 'axios';

import { $api } from '../api';
import {
  BookResponseType,
  BooksListResponseType,
  BooksRequestType,
} from './models/books';

export const getBooksList = (
  params: BooksRequestType,
  abortController: AbortController | null,
): Promise<AxiosResponse<BooksListResponseType>> => {
  return $api.get<BooksListResponseType>('/private/books', {
    signal: abortController?.signal,
    params,
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

export const deleteBook = (
  id: string,
): Promise<AxiosResponse<BookResponseType>> => {
  return $api.delete<BookResponseType>(`/private/books/delete/${id}`);
};
