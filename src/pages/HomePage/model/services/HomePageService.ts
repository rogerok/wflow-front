import { getStatisticsUser, StatisticsUserResponseType } from '@shared/api';
import { RequestStore } from '@shared/stores';
import { makeAutoObservable } from 'mobx';

export class HomePageService {
  staticsRequest = new RequestStore(getStatisticsUser);
  private abortController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  abortRequest = (): void => {
    this.abortController?.abort();
    this.abortController = null;
  };

  fetchStatistics = async (): Promise<void> => {
    this.abortController = new AbortController();

    await this.staticsRequest.call(this.abortController);
  };

  get statisticsData(): StatisticsUserResponseType | null {
    return this.staticsRequest.result.data;
  }
}
