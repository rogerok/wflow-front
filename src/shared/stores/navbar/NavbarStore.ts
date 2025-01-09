import { LOCAL_STORAGE_NAVBAR_COLLAPSED_KEY } from '@shared';
import { makeAutoObservable } from 'mobx';
import { makeLoggable } from 'mobx-log';

import { ScreenStore } from '../screen/ScreenStore';
import { UiBaseStore } from '../uiStore/UiBaseStore';
import { NavbarCollapsedConstant } from './constant';
import { NavbarCollapsedSchema, NavbarCollapsedType } from './types';

export class NavbarStore {
  private _ui = new UiBaseStore<NavbarCollapsedType>(
    NavbarCollapsedConstant.Expanded,
    NavbarCollapsedSchema,
    LOCAL_STORAGE_NAVBAR_COLLAPSED_KEY,
  );

  private readonly _screenStore: ScreenStore;

  constructor(screenStore: ScreenStore) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );

    this._screenStore = screenStore;

    this.init();
    makeLoggable(this);
  }

  init(): void {
    const shouldRestoreState = this._screenStore.upMd;

    if (shouldRestoreState) {
      this._ui.init();
    } else {
      this._ui.setState(NavbarCollapsedConstant.Collapsed);
    }
  }

  toggle = (): void => {
    const newState =
      this._ui.currentState === NavbarCollapsedConstant.Collapsed
        ? NavbarCollapsedConstant.Expanded
        : NavbarCollapsedConstant.Collapsed;

    if (this._screenStore.upMd) {
      this._ui.setStateAndSaveToStorage(newState);
    } else {
      this._ui.setState(newState);
    }
  };

  get isCollapsed(): boolean {
    return this._ui.currentState === NavbarCollapsedConstant.Collapsed;
  }
}
