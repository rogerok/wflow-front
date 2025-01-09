import {
  FormStore,
  LOCAL_STORAGE_TOKEN_KEY,
  RequestStore,
  setLocalStorageItem,
  UserService,
} from '@shared';
import { makeAutoObservable, runInAction } from 'mobx';

import { authRequest } from '../api/authApi';
import {
  AuthRequestSchema,
  AuthRequestType,
  TokenSchema,
  TokenType,
} from '../types/auth';

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

  private isTokenValid(data: unknown): data is TokenType {
    return TokenSchema.safeParse(data).success;
  }

  parseJwt = (token: string): TokenType => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  };

  submitForm = async (): Promise<void> => {
    await this.authForm.submit(async (formValues: AuthRequestType) => {
      await this.authRequest.call(formValues);
      runInAction(() => {
        this.processAuth();
      });
    });
  };

  private processAuth = (): void => {
    const token = this.authRequest.result.data?.token;
    if (token) {
      const parsedToken = this.parseJwt(token);
      if (this.isTokenValid(parsedToken)) {
        setLocalStorageItem(LOCAL_STORAGE_TOKEN_KEY, token);
        UserService.setUuid(parsedToken.sub);
      }
    }
  };
}
