import { makeAutoObservable } from 'mobx';

import { AuthController } from '../../services/auth/authController';
import { AuthService } from '../../services/auth/authService';
import { UserService } from '../../services/user/userService';
import { RouterType } from '../../types/router';
import { NavbarStore } from '../navbar/NavbarStore';
import { ScreenStore } from '../screen/ScreenStore';
import { ThemeStore } from '../theme/ThemeStore';

export class GlobalStore {
  private readonly _theme: ThemeStore;
  private readonly _screen: ScreenStore;
  private readonly _navbar: NavbarStore;
  private readonly _user: UserService;
  private readonly _router: RouterType;
  private readonly _authController: AuthController;

  constructor(router: RouterType) {
    makeAutoObservable(this, {}, { autoBind: true });
    this._router = router;

    this._theme = new ThemeStore();
    this._user = new UserService();
    this._screen = new ScreenStore();
    this._navbar = new NavbarStore(this._screen);
    this._authController = new AuthController(
      new AuthService(),
      this._user,
      this._router,
    );
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
