import { makeAutoObservable } from 'mobx';

import {
  authRequest,
  AuthRequestSchema,
  AuthRequestType,
  logoutRequest,
} from '../../api';
import { FormStore } from '../../lib';
import { RequestStore } from '../../stores';

export class AuthService {
  authForm = new FormStore<AuthRequestType>({
    schema: AuthRequestSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  authRequest = new RequestStore(authRequest, {
    error: 'Неправильная почта или пароль',
  });
  logoutRequest = new RequestStore(logoutRequest);

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  login = async (onSubmit?: () => Promise<void>): Promise<void> => {
    await this.authForm.submit(async (formValues: AuthRequestType) => {
      const resp = await this.authRequest.call(formValues);
      if (resp.status === 'success' && onSubmit) {
        await onSubmit();
      }
    });
  };

  logout = async (): Promise<void> => {
    await this.logoutRequest.call();
  };

  clearForm = (): void => {
    this.authForm.reset();
  };
}
