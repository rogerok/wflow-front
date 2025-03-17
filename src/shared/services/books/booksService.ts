import { makeAutoObservable } from 'mobx';

import {
  BooksListResponseType,
  BooksRequestType,
  getBooksList,
} from '../../api';
import { OrderByRequestConstant } from '../../const';
import { QueryFilterRequestStore } from '../../stores/request/QueryFilterRequestStore';

export class BooksService {
  params: BooksRequestType = {
    page: 1,
    perPage: 6,
    orderById: OrderByRequestConstant.CreatedAtDesc,
  };

  request = new QueryFilterRequestStore(getBooksList, this.params);

  constructor(params?: BooksRequestType) {
    if (params) {
      this.params = params;
    }
    makeAutoObservable(this, {}, { autoBind: true });
  }

  abortRequest = (): void => {
    this.request.abortRequest();
  };

  get isLoading(): boolean {
    return this.request.isLoading;
  }

  list = async (params?: BooksRequestType): Promise<void> => {
    await this.request.call(params);
  };

  get data(): BooksListResponseType {
    return this.request.store.result.data ?? [];
  }
}
