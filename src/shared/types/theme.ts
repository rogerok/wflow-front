import { z } from 'zod';

import { CssColorsVarsConstant, ThemeConstant } from '../const/themeConstants';

export const ThemeSchema = z.nativeEnum(ThemeConstant);

export type ThemesType = z.infer<typeof ThemeSchema>;

export const CssColorVarsSchema = z.nativeEnum(CssColorsVarsConstant);

export type CssVarsMapType = z.infer<typeof CssColorVarsSchema>;

export interface IThemeStore {
  get current(): ThemesType;

  get isDark(): boolean;

  toggle(): void;
}
