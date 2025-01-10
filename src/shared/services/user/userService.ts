import { makeAutoObservable, runInAction } from 'mobx';

import { getUserById, getUsers } from '../../api/user/userApi';
import { RequestStore } from '../../stores/request/RequestStore';
import { UserResponseType } from '../../types';

export class UserService {
  private abortController: AbortController | null = null;

  userData: UserResponseType | null = null;

  getUserRequestStore = new RequestStore(getUserById);
  getUsersRequest = new RequestStore(getUsers);

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUserData = (data: UserResponseType | null): void => {
    this.userData = data;
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
    });
  };

  fetchUsers = async (): Promise<void> => {
    await this.getUsersRequest.call();
  };

  clearUserData = (): void => {
    this.setUserData(null);
  };

  get isAuth(): boolean {
    return !!this.userData;
  }
}
