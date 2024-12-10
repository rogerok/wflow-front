import { ThemeStore } from '../theme/ThemeStore';
import { makeAutoObservable } from 'mobx';
import { NavbarStore } from '../navbar/NavbarStore';
import { ScreenStore } from '../screen/ScreenStore';

export class GlobalStore {
  private readonly _theme: ThemeStore = new ThemeStore();
  private readonly _screen: ScreenStore = new ScreenStore();
  private readonly _navbar = new NavbarStore(this._screen);

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
}
