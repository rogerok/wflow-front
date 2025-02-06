import { makeAutoObservable } from 'mobx';

export class AutocompleteStore {
  constructor() {
    makeAutoObservable(this);
  }
}
