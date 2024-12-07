import { ThemesType } from './type';

export interface ThemeManager {
  get current(): ThemesType;
  setTheme(theme: ThemesType): void;
  toggle(): void;
}
