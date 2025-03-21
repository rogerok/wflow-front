import { createGoal } from '@shared/api';
import { convertEmptyStringToNull, FormStore } from '@shared/lib';
import { RequestStore } from '@shared/stores';
import { makeAutoObservable, runInAction } from 'mobx';

import { GoalCreateFormSchema, GoalCreateFormType } from '../types/createGoal';

export class GoalsCreateService {
  private abortController: AbortController | null = null;

  createRequest = new RequestStore(createGoal, {
    success: 'Цель создана',
  });

  form = new FormStore<GoalCreateFormType>({
    schema: GoalCreateFormSchema,
    defaultValues: {
      startDate: '',
      endDate: '',
      goalWords: 0,
      title: '',
      description: '',
      bookId: '',
    },
  });

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

  submit = async (): Promise<void> => {
    this.abortController = new AbortController();

    await this.form.submit(async (values) => {
      const resp = await this.createRequest.call(
        {
          bookId: values.bookId,
          description: convertEmptyStringToNull(values.description),
          endDate: values.endDate,
          goalWords: Number(values.goalWords),
          startDate: values.startDate,
          title: values.title,
        },
        this.abortController,
      );

      runInAction(() => {
        if (resp.status === 'success') {
          this.form.reset();
        }
      });
    });
  };
}
