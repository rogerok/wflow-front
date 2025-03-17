import {
  GoalRequestType,
  GoalResponseType,
  GoalsListResponseType,
} from '@shared/api';
import { ReportCreateFormDefaultValues } from '@shared/const';
import { GoalsService, ReportCreateService } from '@shared/services';
import { QueryFilterRequestStore } from '@shared/stores';
import { makeAutoObservable } from 'mobx';

export class GoalsPageFacade {
  private readonly goalsService: GoalsService = new GoalsService();
  private report: ReportCreateService | null = null;

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  initReportForm = (goal: GoalResponseType): void => {
    this.report = new ReportCreateService({
      ...ReportCreateFormDefaultValues,
      goalId: goal.id,
      bookId: goal.bookId,
    });
  };

  destroyReportForm = (): void => {
    this.report = null;
  };

  get goals(): GoalsListResponseType {
    return this.goalsService.data;
  }

  get isLoading(): boolean {
    return this.goalsService.request.isLoading;
  }

  get reportForm(): ReportCreateService | null {
    return this.report;
  }

  fetchData = async (): Promise<void> => {
    await this.goalsService.list();
  };

  get request(): QueryFilterRequestStore<
    GoalRequestType,
    GoalsListResponseType
  > {
    return this.goalsService.request;
  }

  submitReport = async (goal: GoalResponseType): Promise<void> => {
    await this.report?.submit();

    const result = this.report?.create.result;

    if (result?.status === 'success') {
      this.goalsService.updateItemStats(
        goal,
        result.data.writtenWords,
        result.data.wordsPerDay,
      );
    }
  };

  abortRequest = (): void => {
    this.goalsService.abortRequest();
  };

  abortFormSubmit = (): void => {
    this.report?.abortRequest();
  };
}
