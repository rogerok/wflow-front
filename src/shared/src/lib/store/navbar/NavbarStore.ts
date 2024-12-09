import { NavbarCollapsedSchema, NavbarCollapsedType } from './types';
import { NavbarCollapsedConstant } from './constant';
import { LOCAL_STORAGE_NAVBAR_COLLAPSED_KEY } from '../../const/localStorage';
import { makeAutoObservable } from 'mobx';
import { makeLoggable } from 'mobx-log';
import { UiBaseStore } from '../uiStore/UiBaseStore';
import { ScreenStore } from '../screen/ScreenStore';

export class NavbarStore {
  private _ui = new UiBaseStore<NavbarCollapsedType>(
    NavbarCollapsedConstant.Expanded,
    NavbarCollapsedSchema,
    LOCAL_STORAGE_NAVBAR_COLLAPSED_KEY
  );

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      }
    );

    this.init();

    makeLoggable(this);
  }

  init(): void {
    const shouldRestoreState = ScreenStore.upMd;

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

    if (ScreenStore.upMd) {
      this._ui.setStateAndSaveToStorage(newState);
    } else {
      this._ui.setState(newState);

      if (this.isCollapsed) {
        ScreenStore.enableScroll();
      } else {
        ScreenStore.preventScroll();
      }
    }
  };

  get isCollapsed(): boolean {
    return this._ui.currentState === NavbarCollapsedConstant.Collapsed;
  }
}
