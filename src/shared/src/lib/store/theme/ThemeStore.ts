import { IThemeStore, ThemeSchema, ThemesType } from './types';
import { ThemeConstant } from './constants';
import { makeAutoObservable } from 'mobx';
import { LOCAL_STORAGE_THEME_KEY } from '../../const/localStorage';
import { UiBaseStore } from '../uiStore/UiBaseStore';

export class ThemeStore implements IThemeStore {
  private ui = new UiBaseStore<ThemesType>(
    ThemeConstant.Light,
    ThemeSchema,
    LOCAL_STORAGE_THEME_KEY
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
  }

  private init = (): void => {
    const storageTheme = this.ui.getStateFromStorage();

    if (this.ui.validateState(storageTheme)) {
      this.ui.setState(storageTheme);
    } else if (this.isPreferDarkTheme()) {
      this.ui.setStateAndSaveToStorage(ThemeConstant.Dark);
    }
  };

  private isPreferDarkTheme(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggle = (): void => {
    this.ui.setStateAndSaveToStorage(
      this.ui.currentState === ThemeConstant.Dark
        ? ThemeConstant.Light
        : ThemeConstant.Dark
    );
  };

  get isDark(): boolean {
    return this.ui.currentState === ThemeConstant.Dark;
  }

  get current(): ThemesType {
    return this.ui.currentState;
  }
}
