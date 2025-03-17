import { makeAutoObservable } from 'mobx';

import {
  getGoalsList,
  GoalRequestType,
  GoalResponseType,
  GoalsListResponseType,
} from '../../api';
import { OrderByRequestConstant } from '../../const';
import { QueryFilterRequestStore } from '../../stores';

export class GoalsService {
  params: GoalRequestType = {
    bookId: null,
    page: 1,
    perPage: 6,
    orderById: OrderByRequestConstant.CreatedAtDesc,
  };

  request = new QueryFilterRequestStore(getGoalsList, this.params);

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
    this.request.abortRequest();
  };

  list = async (params?: GoalRequestType): Promise<void> => {
    await this.request.call(params);
  };

  get data(): GoalsListResponseType {
    return this.request.store.result.data ?? [];
  }

  updateItemStats = (
    goal: GoalResponseType,
    writtenWords: number,
    wordsPerDay: number,
  ): void => {
    goal.writtenWords = writtenWords;
    goal.wordsPerDay = wordsPerDay;
  };
}
