import {
  BookResponseType,
  GoalResponseType,
  GoalsListResponseType,
} from '@shared/api';
import { ReportCreateFormDefaultValues } from '@shared/const';
import { GoalsService, ReportCreateService } from '@shared/services';
import { makeAutoObservable } from 'mobx';
import { makeLoggable } from 'mobx-log';

import { BookService } from './BookService';

export class BookPageFacade {
  private readonly goalsService: GoalsService = new GoalsService();
  private readonly bookService: BookService = new BookService();
  private report: ReportCreateService | null = null;

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
    makeLoggable(this);
  }

  get isLoading(): boolean {
    return (
      this.bookService.bookByIdRequest.isLoading ||
      this.goalsService.goalsListRequest.isLoading
    );
  }

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
      this.goalsService.list({ ...this.goalsService.params, bookId }),
    ]);
  };

  initReportForm = (goalId: string): void => {
    this.report = new ReportCreateService({
      ...ReportCreateFormDefaultValues,
      bookId: this.bookService.data?.id ?? '',
      goalId,
    });
  };

  destroyReportForm = (): void => {
    this.report = null;
  };

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

  abortRequests = (): void => {
    this.bookService.abortRequest();
    this.goalsService.abortRequest();
  };

  abortFormSubmit = (): void => {
    this.report?.abortRequest();
  };
}
