import { makeAutoObservable } from 'mobx';
import { makeLoggable } from 'mobx-log';

import { RequestFn, RequestStore } from './RequestStore';

export interface PaginationParams {
  page: number;
  perPage: number;
  orderBy: string;
}

export class QueryFilterRequestStore<
  RequestType extends PaginationParams,
  ResponseType,
> {
  params;
  store;
  abortController: AbortController | null = null;

  constructor(fn: RequestFn<ResponseType, any[]>, initialParams: RequestType) {
    this.params = initialParams;
    this.store = new RequestStore(fn);

    makeAutoObservable(this, {}, { autoBind: true });
    makeLoggable(this);
  }

  abortRequest(): void {
    this.abortController?.abort();
    this.abortController = null;
  }

  get isLoading(): boolean {
    return this.store.isLoading;
  }

  get currentPage(): number {
    return this.params.page;
  }

  get perPage(): number {
    return this.params.perPage;
  }

  get total(): number {
    if (
      this.store.result.status === 'success' &&
      Array.isArray(this.store.result.data)
    ) {
      return this.store.result.data.length;
    } else {
      return 0;
    }
  }

  nextPage = async (): Promise<void> => {
    this.params.page++;
    await this.call();
  };

  prevPage = async (): Promise<void> => {
    this.params.page--;
    await this.call();
  };

  async call(params?: Partial<RequestType>): Promise<void> {
    this.abortRequest();
    this.abortController = new AbortController();

    this.store.call({ ...this.params, ...params }, this.abortController);
  }
}
