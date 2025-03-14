import {
  getGoalById,
  getStatisticsGoal,
  GoalResponseType,
  StatisticsGoalResponseType,
} from '@shared/api';
import { RequestStore } from '@shared/stores';
import { makeAutoObservable } from 'mobx';

export class GoalService {
  private abortController: AbortController | null = null;

  goalRequest = new RequestStore(getGoalById);
  goalStatistics = new RequestStore(getStatisticsGoal);

  constructor() {
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

  get goal(): GoalResponseType | null {
    return this.goalRequest.result.data;
  }

  get statistics(): StatisticsGoalResponseType | null {
    return this.goalStatistics.result.data;
  }

  loadData = (goalId: string): void => {
    this.abortController = new AbortController();
    Promise.all([
      this.goalRequest.call(goalId, this.abortController),
      this.goalStatistics.call(goalId, this.abortController),
    ]);
  };
}
