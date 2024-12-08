import {
  INavbarStore,
  NavbarCollapsedSchema,
  NavbarCollapsedType,
} from './types';
import { NavbarCollapsedConstant } from './constant';
import { LOCAL_STORAGE_NAVBAR_COLLAPSED_KEY } from '../../const/localStorage';
import { makeAutoObservable } from 'mobx';
import { makeLoggable } from 'mobx-log';
import { UiBaseStore } from '../uiStore/UiBaseStore';

export class NavbarStore implements INavbarStore {
  private _ui = new UiBaseStore<NavbarCollapsedType>(
    NavbarCollapsedConstant.Expanded,
    NavbarCollapsedSchema,
    LOCAL_STORAGE_NAVBAR_COLLAPSED_KEY
  );

  isNavbarCollapsed = true;

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      }
    );

    this._ui.init();

    makeLoggable(this);
  }

  toggle = (): void => {
    this._ui.setState(
      this._ui.currentState === NavbarCollapsedConstant.Collapsed
        ? NavbarCollapsedConstant.Expanded
        : NavbarCollapsedConstant.Collapsed
    );
  };

  get isCollapsed(): boolean {
    return this._ui.currentState === NavbarCollapsedConstant.Collapsed;
  }
}
