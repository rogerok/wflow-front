import { linkOptions } from '@tanstack/react-router';
import { ReactNode } from 'react';

import { IconComponent } from '../elements/ui/IconComponent/IconComponent';
import { RolesConstant } from './roles';
import { RolesType } from '../types/user';

export const routes = {
  main: () => '/',
  signIn: () => '/signIn',
  signUp: () => '/signUp',
  profile: () => '/profile',
  settings: () => '/settings',
  statistic: () => '/statistic',
} as const;

export type NavbarLinksType = {
  active: ReactNode;

  inActive: ReactNode;

  label: string;

  to: string;

  roles: RolesType[];
};

export const NavbarLinks: NavbarLinksType[] = [
  linkOptions({
    to: routes.main(),
    inActive: (
      <IconComponent
        name={'HomeIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'HomeIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Главная',
    roles: [RolesConstant.Admin, RolesConstant.Visitor, RolesConstant.User],
  }),
  linkOptions({
    to: routes.statistic(),
    inActive: (
      <IconComponent
        name={'StatisticIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'StatisticIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Статистика',
    roles: [RolesConstant.Admin, RolesConstant.User],
  }),
  linkOptions({
    to: routes.settings(),
    inActive: (
      <IconComponent
        name={'SettingsIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'SettingsIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Настройки',
    roles: [RolesConstant.Admin, RolesConstant.User],
  }),
  linkOptions({
    to: routes.signUp(),
    inActive: (
      <IconComponent
        name={'SettingsIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'SettingsIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Регистрация',
    roles: [RolesConstant.Visitor],
  }),
  linkOptions({
    to: routes.signIn(),
    inActive: (
      <IconComponent
        name={'SettingsIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'SettingsIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Войти',
    roles: [RolesConstant.Visitor],
  }),
];
