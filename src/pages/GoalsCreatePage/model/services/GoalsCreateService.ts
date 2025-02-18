import { FormStore } from '@shared/lib';
import { AbortStore, RequestStore } from '@shared/stores';
import { makeAutoObservable, runInAction } from 'mobx';

import { createGoalRequest } from '../api/createGoal';
import { GoalCreateFormSchema, GoalCreateFormType } from '../types/createGoal';

export class GoalsCreateService {
  constructor() {
    makeAutoObservable(this);
  }

  abort = new AbortStore();

  createRequest = new RequestStore(createGoalRequest);

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

  submit = async (): Promise<void> => {
    this.abort.abortController = new AbortController();

    await this.form.submit(async (values) => {
      const resp = await this.createRequest.call(
        {
          bookId: values.bookId,
          description: values.description,
          endDate: values.endDate,
          goalWords: values.goalWords,
          startDate: values.startDate,
          title: values.title,
        },
        this.abort.abortController,
      );

      runInAction(() => {
        if (resp.status === 'success') {
          this.form.reset();
        }
      });
    });
  };
}
