import { $api } from '@shared/api';
import { CreateResponseType } from '@shared/types';
import { AxiosResponse } from 'axios';
import { ReportCreateRequestType } from 'src/widgets/ReportCreateForm/model/types/report';

export const reportCreateRequest = (
  data: ReportCreateRequestType,
  abortController: AbortController | null,
): Promise<AxiosResponse<CreateResponseType>> => {
  return $api.post<CreateResponseType>('/private/reports', data, {
    signal: abortController?.signal,
  });
};
