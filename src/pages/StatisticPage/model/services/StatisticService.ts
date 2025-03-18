import {
  CumulativeProgressType,
  getStatisticsChart,
  GoalCompletionType,
  StatisticChartResponseType,
} from '@shared/api';
import { formatDate } from '@shared/lib';
import { RequestStore } from '@shared/stores';
import { makeAutoObservable, runInAction } from 'mobx';

import { StatisticsCombinedChartType } from '../types/statisticsType';

export class StatisticService {
  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  data: StatisticChartResponseType | null = null;

  request = new RequestStore(getStatisticsChart);

  private abortController: AbortController | null = null;

  abortRequest = (): void => {
    this.abortController?.abort();
    this.abortController = null;
  };

  get isLoading(): boolean {
    return this.request.isLoading;
  }

  fetch = async (): Promise<void> => {
    this.abortController = new AbortController();

    const resp = await this.request.call(this.abortController);

    runInAction(() => {
      if (resp.status === 'success') {
        this.data = resp.data;
      }
    });
  };

  get cumulativeProgress(): CumulativeProgressType[] {
    return this.data?.cumulativeProgress ?? [];
  }

  get goalsCompetition(): GoalCompletionType[] {
    return this.data?.goalCompletion ?? [];
  }

  get combinedData(): StatisticsCombinedChartType[] {
    const goalMap: Record<string, GoalCompletionType> = {};

    this.goalsCompetition.forEach((goal) => {
      goalMap[goal.goalId] = goal;
    });

    return this.cumulativeProgress.map((point) => {
      const goal = goalMap[point.goalId];
      return {
        date: formatDate(point.date),
        totalWords: point.totalWords,
        targetWords: point.targetTotalWords,
        completionPercent: Math.round(point.completionPercent),
        goalTitle: point.goalTitle,
        bookName: point.bookName,
        trend: Math.round(goal.trendComparedToTarget),
        dailyRequired: goal.dailyWordsRequired,
        avgWordsPerDay: Math.round(goal.averageWordsPerDay),
      };
    });
  }
}
