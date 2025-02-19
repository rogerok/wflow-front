import { makeAutoObservable } from 'mobx';

export class AbortStore {
  constructor() {
    makeAutoObservable(this);
  }

  abortController: AbortController | null = null;

  abortRequest = (): void => {
    this.abortController?.abort();
    this.abortController = null;
  };
}
