import { makeAutoObservable, runInAction } from 'mobx';

import { getBooks } from '../../api/books/booksApi';
import { RequestStore } from '../../stores/request/RequestStore';
import { BooksListResponseType } from '../../types/book';

export class BooksService {
  requestStore = new RequestStore(getBooks);
  data: BooksListResponseType = [];
  private abortController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  abortRequest = (): void => {
    this.abortController?.abort();
    this.abortController = null;
  };

  list = async (): Promise<void> => {
    this.abortController = new AbortController();

    const resp = await this.requestStore.call(this.abortController);
    if (resp.data) {
      runInAction(() => {
        this.data = resp.data;
      });
    }
  };
}
