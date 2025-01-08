import { makeAutoObservable } from 'mobx';

class User {
  token = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setToken(token: string): void {
    this.token = token;
  }
}

export const UserStore = new User();
