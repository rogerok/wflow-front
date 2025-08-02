import {
  BookFormRequestSchema,
  BookFormRequestType,
  createBookRequest,
} from '@shared/api';
import { routes } from '@shared/const';
import { convertEmptyStringToNull, FormStore } from '@shared/lib';
import { RequestStore } from '@shared/stores';
import { RouterType } from '@shared/types';
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

  router: RouterType;

  constructor(router: RouterType) {
    this.router = router;
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
          this.router.navigate({
            to: routes.bookDetails(),
            params: { bookId: resp.data.id },
          });
        }
      });
    });
  };
}
