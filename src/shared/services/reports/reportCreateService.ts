import { makeAutoObservable, runInAction } from 'mobx';

import {
  reportCreateRequest,
  ReportCreateRequestSchema,
  ReportCreateRequestType,
} from '../../api';
import { convertEmptyStringToNull, FormStore } from '../../lib';
import { RequestStore } from '../../stores';

export class ReportCreateService {
  createFormDefaultValues: ReportCreateRequestType;

  form: FormStore<ReportCreateRequestType>;

  create = new RequestStore(reportCreateRequest, {
    success: 'Отчёт создан',
  });

  abortController: AbortController | null = null;

  constructor(formValues: ReportCreateRequestType) {
    this.createFormDefaultValues = formValues;
    this.form = new FormStore<ReportCreateRequestType>({
      schema: ReportCreateRequestSchema,
      defaultValues: formValues,
    });

    makeAutoObservable(this, {}, { autoBind: true });
  }

  abortRequest = (): void => {
    this.abortController?.abort();
    this.abortController = null;
  };

  submit = async (): Promise<void> => {
    this.abortController = new AbortController();

    await this.form.submit(async (formValues: ReportCreateRequestType) => {
      const resp = await this.create.call(
        {
          description: convertEmptyStringToNull(formValues.description),
          goalId: formValues.goalId,
          wordsAmount: Number(formValues.wordsAmount),
          title: formValues.title,
          bookId: formValues.bookId,
        },
        this.abortController,
      );

      runInAction(() => {
        if (resp.status === 'success') {
          this.form.reset(this.createFormDefaultValues);
        }
      });
    });
  };
}
