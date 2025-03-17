import { makeAutoObservable, runInAction } from 'mobx';

import {
  getGoalsList,
  GoalRequestType,
  GoalResponseType,
  GoalsListResponseType,
} from '../../api';
import { OrderByRequestConstant } from '../../const';
import { RequestStore } from '../../stores';

export class GoalsService {
  params: GoalRequestType = {
    bookId: null,
    page: 1,
    perPage: 6,
    orderById: OrderByRequestConstant.CreatedAtDesc,
  };

  private abortController: AbortController | null = null;

  data: GoalsListResponseType = [];

  goalsListRequest = new RequestStore(getGoalsList);

  constructor(requestParams?: GoalRequestType) {
    if (requestParams) {
      this.params = requestParams;
    }

    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  abortRequest = (): void => {
    this.abortController?.abort();
    this.abortController = null;
  };

  list = async (params?: GoalRequestType): Promise<void> => {
    this.abortController = new AbortController();

    const resp = await this.goalsListRequest.call(
      { ...this.params, ...params },
      this.abortController,
    );

    runInAction(() => {
      if (resp.status === 'success') {
        this.data = resp.data;
      }
    });
  };

  nextPage = async (): Promise<void> => {
    this.params.page++;

    await this.list();
  };

  prevPage = async (): Promise<void> => {
    this.params.page--;

    await this.list();
  };

  updateItemStats = (
    goal: GoalResponseType,
    writtenWords: number,
    wordsPerDay: number,
  ): void => {
    goal.writtenWords = writtenWords;
    goal.wordsPerDay = wordsPerDay;
  };
}
