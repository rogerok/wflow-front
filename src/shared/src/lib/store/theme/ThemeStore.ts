import { ThemeManager } from './ThemeManager';
import { ThemeSchema, ThemesType } from './type';
import { ThemeConstant } from './constants';
import { makeAutoObservable } from 'mobx';
import { LOCAL_STORAGE_THEME_KEY } from '../../const/localStorage';

export class ThemeStore implements ThemeManager {
  private _theme: ThemesType = ThemeConstant.Light;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.initTheme();
  }

  setTheme = (theme: ThemesType): void => {
    this._theme = theme;
    this.saveToLocalStorage(theme);
  };

  toggle = (): void => {
    this.setTheme(
      this.current === ThemeConstant.Dark
        ? ThemeConstant.Light
        : ThemeConstant.Dark
    );
  };

  get current(): ThemesType {
    return this._theme;
  }

  get isDark(): boolean {
    return this._theme === ThemeConstant.Dark;
  }

  private getThemeFromLocalStorage(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
  }

  private initTheme = (): void => {
    const storageTheme = this.getThemeFromLocalStorage();

    if (this.validateTheme(storageTheme)) {
      this._theme = storageTheme;
    } else if (this.isPreferDarkTheme()) {
      this.setTheme(ThemeConstant.Dark);
    }
  };

  private isPreferDarkTheme(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private saveToLocalStorage(theme: ThemesType): void {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }

  private validateTheme = (theme: string | null): theme is ThemesType => {
    return ThemeSchema.safeParse(theme).success;
  };
}
