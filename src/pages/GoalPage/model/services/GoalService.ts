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
  id: string;

  constructor(id: string) {
    this.id = id;

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

  get isLoading(): boolean {
    return this.goalRequest.isLoading || this.goalStatistics.isLoading;
  }

  loadData = async (): Promise<void> => {
    this.abortController = new AbortController();

    await Promise.all([
      this.goalRequest.call(this.id, this.abortController),
      this.goalStatistics.call(this.id, this.abortController),
    ]);
  };
}
