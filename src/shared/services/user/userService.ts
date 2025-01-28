import { makeAutoObservable, runInAction } from 'mobx';

import { getUserById, getUsers } from '../../api/user/userApi';
import { RolesConstant } from '../../const/roles';
import { RequestStore } from '../../stores/request/RequestStore';
import { RolesType, UserResponseType } from '../../types/user';

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

  abortRequest = (): void => {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  };

  fetchUser = async (uuid: string): Promise<void> => {
    this.abortController = new AbortController();

    const result = await this.getUserRequestStore.call(
      uuid,
      this.abortController,
    );

    runInAction(() => {
      this.setUserData(result.data);
      //TODO: add real data
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
