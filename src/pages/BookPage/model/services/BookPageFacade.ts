import {
  BookResponseType,
  GoalResponseType,
  GoalsListResponseType,
} from '@shared/api';
import { ReportCreateFormDefaultValues } from '@shared/const';
import { GoalsService, ReportCreateService } from '@shared/services';
import { makeAutoObservable } from 'mobx';

import { BookService } from './BookService';

export class BookPageFacade {
  private readonly goalsService: GoalsService = new GoalsService();
  private readonly bookService: BookService;
  private report: ReportCreateService | null = null;

  constructor() {
    this.bookService = new BookService();

    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  get isLoading(): boolean {
    return (
      this.bookService.bookByIdRequest.isLoading ||
      this.goalsService.goalsListRequest.isLoading
    );
  }

  initReportForm = (goalId: string): void => {
    this.report = new ReportCreateService({
      ...ReportCreateFormDefaultValues,
      bookId: this.bookService.data?.id ?? '',
      goalId,
    });
  };

  get bookData(): BookResponseType | null {
    return this.bookService.data;
  }

  get goalsData(): GoalsListResponseType {
    return this.goalsService.data;
  }

  get reportForm(): ReportCreateService | null {
    return this.report;
  }

  fetchBookData = async (bookId: string): Promise<void> => {
    await Promise.all([
      this.bookService.getById(bookId),
      this.goalsService.list(),
    ]);
  };

  destroyReportForm = (): void => {
    this.report = null;
  };

  submitReport = async (goal: GoalResponseType): Promise<void> => {
    await this.report?.submit();
    if (this.report?.create.result.status === 'success') {
      const data = this.report.create.result.data;
      this.goalsService.updateItemStats(
        goal,
        data.writtenWords,
        data.wordsPerDay,
      );
    }
  };

  abortRequests = (): void => {
    this.bookService.abortRequest();
    this.goalsService.abortRequest();
  };
}
