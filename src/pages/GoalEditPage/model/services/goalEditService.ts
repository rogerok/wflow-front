import { editGoal, getGoalById, GoalResponseType } from '@shared/api';
import { convertEmptyStringToNull, FormStore } from '@shared/lib';
import { RequestStore } from '@shared/stores';
import { makeAutoObservable } from 'mobx';

import { GoalEditFormSchema, GoalEditFormType } from '../types/goalEditTypes';

export class GoalEditService {
  goalRequest = new RequestStore(getGoalById);

  editRequest = new RequestStore(editGoal);

  form = new FormStore<GoalEditFormType>({
    schema: GoalEditFormSchema,
    defaultValues: {
      description: '',
      endDate: '',
      goalWords: 0,
      startDate: '',
      title: '',
    },
  });

  id: string;

  abortController: AbortController | null = null;

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

  init = async (): Promise<void> => {
    this.abortRequest();
    this.abortController = new AbortController();

    const resp = await this.goalRequest.call(this.id, this.abortController);

    if (resp.status === 'success') {
      this.form.reset({
        description: resp.data.description,
        endDate: resp.data.endDate,
        goalWords: resp.data.goalWords,
        startDate: resp.data.startDate,
        title: resp.data.title,
      });
    }
  };

  get goal(): GoalResponseType | null {
    return this.goalRequest.result.data;
  }

  get isLoading(): boolean {
    return this.goalRequest.isLoading;
  }

  submit = async (): Promise<void> => {
    this.abortController = new AbortController();

    await this.form.submit(async (values) => {
      await this.editRequest.call(this.id, {
        description: convertEmptyStringToNull(values.description),
        endDate: values.endDate,
        goalWords: Number(values.goalWords),
        startDate: values.startDate,
        title: values.title,
      });
    });
  };
}
