import { makeAutoObservable, runInAction } from 'mobx';

import { getGoalsList } from '../../api/goals/goalsApi';
import { OrderByRequestConstant } from '../../const';
import { RequestStore } from '../../stores';
import { GoalRequestType, GoalsListResponseType } from '../../types';

export class GoalsService {
  requestParams: GoalRequestType = {
    bookId: null,
    page: 1,
    perPage: 0,
    orderById: OrderByRequestConstant.CreatedAtDesc,
  };

  private abortController: AbortController | null = null;

  data: GoalsListResponseType = [];

  goalsListRequest = new RequestStore(getGoalsList);

  constructor() {
    makeAutoObservable(this);
  }

  abortRequest = (): void => {
    this.abortController?.abort();
    this.abortController = null;
  };

  list = async (params?: GoalRequestType): Promise<void> => {
    this.abortController = new AbortController();

    const resp = await this.goalsListRequest.call(
      { ...this.requestParams, ...params },
      this.abortController,
    );

    if (resp.data) {
      runInAction(() => {
        this.data.push(...resp.data);
      });
    }
  };
}
