import { getBooks } from '@shared/api';
import { RequestStore } from '@shared/stores';
import { BooksListResponseType } from '@shared/types';
import { makeAutoObservable, runInAction } from 'mobx';

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
