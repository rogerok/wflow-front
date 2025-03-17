import { makeAutoObservable, runInAction } from 'mobx';

import {
  BooksListResponseType,
  BooksRequestType,
  getBooksList,
} from '../../api';
import { OrderByRequestConstant } from '../../const';
import { RequestStore } from '../../stores';

export class BooksService {
  params: BooksRequestType = {
    page: 1,
    perPage: 6,
    orderById: OrderByRequestConstant.CreatedAtDesc,
  };

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

  nextPage = async (): Promise<void> => {
    this.params.page!++;

    await this.list();
  };

  prevPage = async (): Promise<void> => {
    this.params.page--;

    await this.list();
  };

  get currentPage(): number {
    return this.params.page;
  }

  get perPage(): number {
    return this.params.perPage;
  }

  list = async (params?: BooksRequestType): Promise<void> => {
    this.abortRequest();

    this.abortController = new AbortController();

    const resp = await this.requestStore.call(
      { ...this.params, ...params },
      this.abortController,
    );

    runInAction(() => {
      if (resp.data) {
        this.data = resp.data;
      }
    });
  };
}
