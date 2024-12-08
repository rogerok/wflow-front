import { z } from 'zod';
import { NavbarCollapsedConstant } from './constant';

export const NavbarCollapsedSchema = z.nativeEnum(NavbarCollapsedConstant);

export type NavbarCollapsedType = z.infer<typeof NavbarCollapsedSchema>;

export interface INavbarStore {
  get isCollapsed(): boolean;
  toggle(): void;
}