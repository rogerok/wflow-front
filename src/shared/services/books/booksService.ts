import { makeAutoObservable, runInAction } from 'mobx';

import { BooksListResponseType, getBooksList } from '../../api';
import { RequestStore } from '../../stores';

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

  get isLoading(): boolean {
    return this.requestStore.isLoading;
  }

  list = async (): Promise<void> => {
    this.abortRequest();

    this.abortController = new AbortController();

    const resp = await this.requestStore.call(this.abortController);

    runInAction(() => {
      if (resp.data) {
        this.data = resp.data;
      }
    });
  };
}
