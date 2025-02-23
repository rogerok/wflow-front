import { bookById } from '@pages/BookPage/api/bookApi';
import { RequestStore } from '@shared/stores';
import { BookResponseType } from '@shared/types';
import { makeAutoObservable, runInAction } from 'mobx';

export class BookService {
  constructor() {
    makeAutoObservable(this);
  }

  private abortController: AbortController | null = null;

  data: BookResponseType | null = null;

  bookByIdRequest = new RequestStore(bookById);

  abortRequest = (): void => {
    this.abortController?.abort();
    this.abortController = null;
  };

  getById = async (id: string): Promise<void> => {
    this.abortController = new AbortController();

    const resp = await this.bookByIdRequest.call(id, this.abortController);

    if (resp.status === 'success') {
      runInAction(() => {
        this.data = resp.data;
      });
    }
  };
}
