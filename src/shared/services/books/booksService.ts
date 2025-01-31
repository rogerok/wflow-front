import { BooksListResponseType, getBooks, RequestStore } from '@shared';
import { makeAutoObservable, runInAction } from 'mobx';

export class BooksService {
  requestStore = new RequestStore(getBooks);
  data: BooksListResponseType = [];

  constructor() {
    makeAutoObservable(this);
  }

  list = async (): Promise<void> => {
    const resp = await this.requestStore.call(new AbortController());
    if (resp.status === 'success') {
      runInAction(() => {
        this.data = resp.data;
      });
    }
  };
}
