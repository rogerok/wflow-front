import { AxiosResponse } from 'axios';

export const createMockedAxiosResponse = <T>(
  data: T,
  status = 200,
  statusText = 'OK',
): AxiosResponse<T> =>
  ({
    data,
    status,
    statusText,
  }) as AxiosResponse<T>;
