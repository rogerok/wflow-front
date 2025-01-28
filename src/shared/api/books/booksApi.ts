import { AxiosResponse } from 'axios';

import { BooksResponseType } from '../../types/book';
import { $api } from '../api';

export const getBooks = (): Promise<AxiosResponse<BooksResponseType>> => {
  return $api.get<BooksResponseType>('/private/books');
};
