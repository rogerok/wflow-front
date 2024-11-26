import { ThemesType } from './type';

export interface ThemeManager {
  get theme(): ThemesType;
  setTheme(theme: ThemesType): void;
  toggleTheme(): void;
}
