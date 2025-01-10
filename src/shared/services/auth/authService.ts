import {
  FormStore,
  LOCAL_STORAGE_TOKEN_KEY,
  RequestStore,
  setLocalStorageItem,
} from '@shared';
import { makeAutoObservable, runInAction } from 'mobx';

import { authRequest } from '../../api/auth/authApi';
import {
  AuthRequestSchema,
  AuthRequestType,
  TokenSchema,
  TokenType,
} from '../../types/auth';

export class AuthService {
  authForm = new FormStore<AuthRequestType>({
    schema: AuthRequestSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  authRequest = new RequestStore(authRequest);

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  submitForm = async (onSubmit?: () => Promise<void>): Promise<void> => {
    await this.authForm.submit(async (formValues: AuthRequestType) => {
      await this.authRequest.call(formValues);
      if (onSubmit) {
        await onSubmit();
      }
    });
  };
}
