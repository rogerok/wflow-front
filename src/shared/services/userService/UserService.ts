import { makeAutoObservable } from 'mobx';

class User {
  uuid: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUuid(token: string): void {
    this.uuid = token;
  }
}

export const UserService = new User();
