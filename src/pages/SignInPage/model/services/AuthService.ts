import { FormStore, RequestStore } from '@shared';
import { makeAutoObservable } from 'mobx';

import { authRequest } from '../api/authApi';
import { AuthRequestSchema, AuthRequestType } from '../types/auth';

export class AuthService {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  authForm = new FormStore<AuthRequestType>({
    schema: AuthRequestSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  authRequest = new RequestStore(authRequest);

  submitForm = async (): Promise<void> => {
    await this.authForm.submit(async (formValues: AuthRequestType) => {
      await this.authRequest.call(formValues);
    });
  };
}
