import { GoalResponseType, GoalsListResponseType } from '@shared/api';
import { ReportCreateFormDefaultValues } from '@shared/const';
import { GoalsService, ReportCreateService } from '@shared/services';
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
    return this.goalsService.goalsListRequest.isLoading;
  }

  get reportForm(): ReportCreateService | null {
    return this.report;
  }

  fetchData = async (): Promise<void> => {
    await this.goalsService.list();
  };

  nextPage = async (): Promise<void> => {
    await this.goalsService.nextPage();
  };

  prevPage = async (): Promise<void> => {
    await this.goalsService.prevPage();
  };

  get total(): number {
    return this.goalsService.data.length;
  }

  get currentPage(): number {
    return this.goalsService.params.page;
  }

  get perPage(): number {
    return this.goalsService.params.perPage;
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
