import {
  BookFormRequestSchema,
  BookFormRequestType,
  BookResponseType,
  editBookRequest,
} from '@shared/api';
import { AppRouter, convertEmptyStringToNull, FormStore } from '@shared/lib';
import { BookService } from '@shared/services';
import { RequestStore } from '@shared/stores';
import { makeAutoObservable, runInAction } from 'mobx';

export class BookEditService {
  bookId: string;

  form = new FormStore<BookFormRequestType>({
    schema: BookFormRequestSchema,
    defaultValues: {
      name: '',
      description: '',
    },
  });
  bookService = new BookService();

  submitFormRequest = new RequestStore(editBookRequest, {
    success: 'Книга обновлена',
  });

  constructor(bookId: string) {
    this.bookId = bookId;
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  init = async (): Promise<void> => {
    await this.bookService.getById(this.bookId);

    runInAction(() => {
      if (this.bookService.data) {
        this.form.reset({
          name: this.bookService.data.name,
          description: this.bookService.data.description,
        });
      }
    });
  };

  submitForm = async (): Promise<void> => {
    await this.form.submit(async (values) => {
      const resp = await this.submitFormRequest.call(
        {
          name: values.name,
          description: convertEmptyStringToNull(values.description),
        },
        this.bookId,
      );

      runInAction(() => {
        if (resp.status === 'success') {
          AppRouter.router?.navigate({
            to: '/books/$bookId',
            params: {
              bookId: this.bookId,
            },
          });
        }
      });
    });
  };

  get submitting(): boolean {
    return this.form.isSubmitting;
  }

  get book(): BookResponseType | null {
    return this.bookService.data;
  }

  get loading(): boolean {
    return this.bookService.bookByIdRequest.isLoading;
  }
}
