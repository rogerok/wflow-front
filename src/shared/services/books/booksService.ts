import { makeAutoObservable } from 'mobx';

import {
  BooksListResponseType,
  BooksRequestType,
  getBooksList,
} from '../../api';
import { OrderByRequestConstant } from '../../const';
import { QueryFilterRequestStore } from '../../stores/request/QueryFilterRequestStore';

const defaultParams: BooksRequestType = {
  page: 1,
  perPage: 6,
  orderBy: OrderByRequestConstant.CreatedAtDesc,
};

export class BooksService {
  request;

  constructor(params = defaultParams) {
    this.request = new QueryFilterRequestStore(getBooksList, params);

    makeAutoObservable(this, {}, { autoBind: true });
  }

  abortRequest = (): void => {
    this.request.abortRequest();
  };

  get isLoading(): boolean {
    return this.request.isLoading;
  }

  list = async (params?: Partial<BooksRequestType>): Promise<void> => {
    await this.request.call(params);
  };

  get data(): BooksListResponseType {
    return this.request.store.result.data ?? [];
  }
}
