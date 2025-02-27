import { BookResponseType } from '@shared/api';
import { RequestStore } from '@shared/stores';
import { makeAutoObservable, runInAction } from 'mobx';

import { bookById } from '../../api/bookApi';

export class BookService {
  private abortController: AbortController | null = null;

  bookByIdRequest = new RequestStore(bookById);

  data: BookResponseType | null = null;

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
