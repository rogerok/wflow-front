import { AxiosResponse } from 'axios';

import { $api } from '../api';
import { QuotesResponseType } from './models/quotes';

export const getQuote = (): Promise<AxiosResponse<QuotesResponseType>> => {
  return $api.get<QuotesResponseType>('/quotes');
};
