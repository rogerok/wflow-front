import { makeAutoObservable } from 'mobx';

import { authRequest } from '../../api/auth/authApi';
import { FormStore } from '../../lib';
import { RequestStore } from '../../stores';
import { AuthRequestSchema, AuthRequestType } from '../../types/auth';

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
