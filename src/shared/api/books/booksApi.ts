import { AxiosResponse } from 'axios';

import { $api } from '../api';
import { CreateResponseType, SuccessResponseType } from '../models/responses';
import {
  BookFormRequestType,
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

export const createBookRequest = (
  data: BookFormRequestType,
): Promise<AxiosResponse<CreateResponseType>> => {
  return $api.post<CreateResponseType>('/private/books', data);
};

export const editBookRequest = (
  data: BookFormRequestType,
  id: string,
): Promise<AxiosResponse<SuccessResponseType>> => {
  return $api.put<SuccessResponseType>(`/private/books/edit/${id}`, data);
};
