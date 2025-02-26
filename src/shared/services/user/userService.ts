import { makeAutoObservable, runInAction } from 'mobx';

import { getUserById, getUsers, RolesType, UserResponseType } from '../../api';
import { RolesConstant } from '../../const';
import { RequestStore } from '../../stores';

export class UserService {
  private abortController: AbortController | null = null;
  getUserRequestStore = new RequestStore(getUserById);
  getUsersRequest = new RequestStore(getUsers);

  userData: UserResponseType | null = null;

  private _role: RolesType = RolesConstant.Visitor;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUserData = (data: UserResponseType | null): void => {
    this.userData = data;
  };

  clearUserData = (): void => {
    this.setUserData(null);
    this._role = RolesConstant.Visitor;
  };

  fetchUser = async (uuid: string): Promise<void> => {
    this.abortController = new AbortController();

    const result = await this.getUserRequestStore.call(uuid);

    runInAction(() => {
      this.setUserData(result.data);
      this._role = RolesConstant.Admin;
    });
  };

  fetchUsers = async (): Promise<void> => {
    await this.getUsersRequest.call();
  };

  get isAuth(): boolean {
    return !!this.userData;
  }

  get role(): RolesType {
    return this._role;
  }
}
