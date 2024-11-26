import { ThemeConstant } from './constants';
import { z } from 'zod';

export const ThemeSchema = z.nativeEnum(ThemeConstant);

export type ThemesType = z.infer<typeof ThemeSchema>;
