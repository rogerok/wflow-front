import { makeAutoObservable, runInAction } from 'mobx';

import { getBooksList } from '../../api';
import { RequestStore } from '../../stores';
import { BooksListResponseType } from '../../types';

export class BooksService {
  requestStore = new RequestStore(getBooksList);
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
