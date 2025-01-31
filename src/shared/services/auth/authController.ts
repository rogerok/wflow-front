import { makeAutoObservable } from 'mobx';

import { LOCAL_STORAGE_TOKEN_KEY } from '../../const/localStorage';
import { routes } from '../../const/router';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '../../lib/utils/localStorage';
import { TokenSchema, TokenType } from '../../types/auth';
import { RouterType } from '../../types/router';
import { UserService } from '../user/userService';
import { AuthService } from './authService';

export class AuthController {
  authService: AuthService;
  userService: UserService;
  router: RouterType;
  token: string | unknown | null = null;

  constructor(
    authService: AuthService,
    userService: UserService,
    router: RouterType,
  ) {
    this.authService = authService;
    this.userService = userService;
    this.router = router;

    makeAutoObservable(this, {}, { autoBind: true });
    this.token = getLocalStorageItem(LOCAL_STORAGE_TOKEN_KEY);
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

  authenticate = async (): Promise<void> => {
    await this.authService.login(this.processAuth);
  };

  logout = async (): Promise<void> => {
    await this.authService.logout();

    this.userService.clearUserData();

    removeLocalStorageItem(LOCAL_STORAGE_TOKEN_KEY);

    this.router.navigate({
      to: routes.main(),
      replace: true,
    });
  };

  private processAuth = async (): Promise<void> => {
    const token = this.authService.authRequest.result.data?.token;

    if (token) {
      const parsedToken = this.parseJwt(token);

      if (this.isTokenValid(parsedToken)) {
        setLocalStorageItem(LOCAL_STORAGE_TOKEN_KEY, token);
        this.token = token;

        await this.userService.fetchUser(parsedToken.sub);

        if (this.userService.userData) {
          this.router.navigate({ to: routes.main() });
        }
      }
    }
  };

  restoreSession = async (): Promise<void> => {
    const token = getLocalStorageItem(LOCAL_STORAGE_TOKEN_KEY);

    if (typeof token === 'string') {
      const parsedToken = this.parseJwt(token);

      if (this.isTokenValid(parsedToken)) {
        await this.userService.fetchUser(parsedToken.sub);
      }
    }
  };

  trackLocalStorageToken = (e: StorageEvent): void => {
    if (e.key === LOCAL_STORAGE_TOKEN_KEY && !e.newValue) {
      this.userService.clearUserData();
      this.router.invalidate();
    }
  };
}
