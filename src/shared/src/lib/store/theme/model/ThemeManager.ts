import { ThemesType } from './type';

interface ThemeManager {
  getTheme(): ThemesType;
  setTheme(theme: ThemesType): void;
}
