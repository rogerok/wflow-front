import { LOCAL_STORAGE_TOKEN_KEY, routes, setLocalStorageItem } from '@shared';

import { router } from '../../../app/app';
import { TokenSchema, TokenType } from '../../types/auth';
import { UserService } from '../user/userService';
import { AuthService } from './authService';

export class AuthController {
  authService: AuthService;
  userService: UserService;

  constructor(authService: AuthService, userService: UserService) {
    this.authService = authService;
    this.userService = userService;
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
    await this.authService.submitForm(this.processAuth);
  };

  private processAuth = async (): Promise<void> => {
    const token = this.authService.authRequest.result.data?.token;

    if (token) {
      const parsedToken = this.parseJwt(token);

      if (this.isTokenValid(parsedToken)) {
        setLocalStorageItem(LOCAL_STORAGE_TOKEN_KEY, token);
        await this.userService.fetchUser(parsedToken.sub);
        if (this.userService.getUserRequestStore.result.data) {
          router.navigate({
            to: routes.main(),
          });
        }
      }
    }
  };
}
