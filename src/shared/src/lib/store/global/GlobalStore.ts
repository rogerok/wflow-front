import { ThemeStore } from '../theme/ThemeStore';
import { makeAutoObservable } from 'mobx';
import { NavbarStore } from '../navbar/NavbarStore';

export class GlobalStore {
  private readonly _theme: ThemeStore = new ThemeStore();
  private readonly _navbar: NavbarStore = new NavbarStore();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get theme(): ThemeStore {
    return this._theme;
  }

  get navbar(): NavbarStore {
    return this._navbar;
  }
}
