import {
  BookResponseType,
  GoalResponseType,
  GoalsListResponseType,
} from '@shared/api';
import { GoalsService, ReportCreateService } from '@shared/services';
import { makeAutoObservable } from 'mobx';

import { BookService } from './BookService';

export class BookPageFacade {
  readonly bookService: BookService;
  readonly goalsService: GoalsService;

  constructor() {
    this.bookService = new BookService({
      goalService: new GoalsService(),
    });
    this.goalsService = this.bookService.goal;

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

  get bookData(): BookResponseType | null {
    return this.bookService.data;
  }

  get goalsData(): GoalsListResponseType {
    return this.goalsService.data;
  }

  get reportForm(): ReportCreateService | null {
    return this.bookService.report;
  }

  fetchBookData = async (bookId: string): Promise<void> => {
    await Promise.all([
      this.bookService.getById(bookId),
      this.goalsService.list(),
    ]);
  };

  initReportForm = (goalId: string): void => {
    this.bookService.initForm(goalId);
  };

  destroyReportForm = (): void => {
    this.bookService.destroyForm();
  };

  submitReport = async (goal: GoalResponseType): Promise<void> => {
    await this.bookService.submitForm(goal);
  };

  abortRequests = (): void => {
    this.bookService.abortRequest();
    this.goalsService.abortRequest();
  };
}
