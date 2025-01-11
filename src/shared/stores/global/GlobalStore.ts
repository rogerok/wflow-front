import { makeAutoObservable } from 'mobx';

import { AuthController, AuthService, UserService } from '../../services';
import { NavbarStore } from '../navbar/NavbarStore';
import { ScreenStore } from '../screen/ScreenStore';
import { ThemeStore } from '../theme/ThemeStore';

export class GlobalStore {
  private readonly _theme: ThemeStore = new ThemeStore();
  private readonly _screen: ScreenStore = new ScreenStore();
  private readonly _navbar: NavbarStore = new NavbarStore(this._screen);
  private readonly _user: UserService = new UserService();
  private readonly _authController: AuthController = new AuthController(
    new AuthService(),
    this._user,
  );

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get theme(): ThemeStore {
    return this._theme;
  }

  get screen(): ScreenStore {
    return this._screen;
  }

  get navbar(): NavbarStore {
    return this._navbar;
  }

  get userService(): UserService {
    return this._user;
  }

  get authController(): AuthController {
    return this._authController;
  }
}

export const globalStore = new GlobalStore();
