import {
  BookFormRequestSchema,
  BookFormRequestType,
  createBookRequest,
} from '@shared/api';
import { convertEmptyStringToNull, FormStore } from '@shared/lib';
import { RequestStore } from '@shared/stores';
import { makeAutoObservable, runInAction } from 'mobx';

export class BooksCreateService {
  form = new FormStore<BookFormRequestType>({
    schema: BookFormRequestSchema,
    defaultValues: {
      name: '',
      description: '',
    },
  });

  submitFormRequest = new RequestStore(createBookRequest, {
    success: 'Книга создана',
  });

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  submitForm = async (): Promise<void> => {
    await this.form.submit(async (values) => {
      const resp = await this.submitFormRequest.call({
        name: values.name,
        description: convertEmptyStringToNull(values.description),
      });

      runInAction(() => {
        if (resp.status === 'success') {
          this.form.reset();
        }
      });
    });
  };
}
