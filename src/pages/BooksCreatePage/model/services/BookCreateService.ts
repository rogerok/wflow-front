import { createBookRequest } from '@pages/BooksCreatePage/model/api/createBookApi';
import { convertEmptyStringToNull, FormStore } from '@shared/lib';
import { RequestStore } from '@shared/stores';
import { BookFormRequestSchema, BookFormRequestType } from '@shared/types';
import { makeAutoObservable } from 'mobx';

export class BookCreateService {
  form = new FormStore<BookFormRequestType>({
    schema: BookFormRequestSchema,
    defaultValues: {
      name: '',
      description: '',
    },
  });

  submitFormRequest = new RequestStore(createBookRequest);

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  submitForm = async (): Promise<void> => {
    await this.form.submit(async (values) => {
      await this.submitFormRequest.call({
        name: values.name,
        description: convertEmptyStringToNull(values.description),
      });
    });
  };
}
