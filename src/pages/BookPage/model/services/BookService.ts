import { BookResponseType, GoalResponseType } from '@shared/api';
import { ReportCreateFormDefaultValues } from '@shared/const/reports/reportsConstants';
import { GoalsService, ReportCreateService } from '@shared/services';
import { RequestStore } from '@shared/stores';
import { makeAutoObservable, runInAction } from 'mobx';

import { bookById } from '../../api/bookApi';

interface BookServiceArgs {
  goalService: GoalsService;
}

export class BookService {
  private abortController: AbortController | null = null;

  goal: GoalsService;
  report: ReportCreateService | null = null;
  bookByIdRequest = new RequestStore(bookById);

  data: BookResponseType | null = null;

  constructor(args: BookServiceArgs) {
    this.goal = args.goalService;

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

  initForm = (goalId: string): void => {
    this.report = new ReportCreateService({
      ...ReportCreateFormDefaultValues,
      bookId: this.data?.id ?? '',
      goalId,
    });
  };

  destroyForm = (): void => {
    this.report = null;
  };

  submitForm = async (goal: GoalResponseType): Promise<void> => {
    await this.report?.submit();
    if (this.report?.create.result.status === 'success') {
      const data = this.report.create.result.data;
      this.goal.updateItemStats(goal, data.writtenWords, data.wordsPerDay);
    }
  };

  getById = async (id: string): Promise<void> => {
    this.abortController = new AbortController();

    const resp = await this.bookByIdRequest.call(id, this.abortController);

    runInAction(() => {
      if (resp.status === 'success') {
        this.data = resp.data;
      }
    });
  };
}
