import { linkOptions } from '@tanstack/react-router';
import { ReactNode } from 'react';

import { IconComponent } from '../elements/ui/IconComponent/IconComponent';
import { RolesType } from '../types/user';
import { RolesConstant } from './roles';

export const routes = {
  main: () => '/',
  signIn: () => '/signIn',
  signUp: () => '/signUp',
  profile: () => '/profile',
  settings: () => '/settings',
  statistic: () => '/statistic',
  books: () => '/books',
  goals: () => '/goals',
  reports: () => '/reports',
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
  linkOptions({
    to: routes.books(),
    inActive: (
      <IconComponent
        name={'BookIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'BookIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Книги',
    roles: [RolesConstant.User, RolesConstant.Admin],
  }),
  linkOptions({
    to: routes.reports(),
    inActive: (
      <IconComponent
        name={'ReportIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'ReportIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Отчёты',
    roles: [RolesConstant.User, RolesConstant.Admin],
  }),
  linkOptions({
    to: routes.goals(),
    inActive: (
      <IconComponent
        name={'GoalIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'GoalIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Цели',
    roles: [RolesConstant.User, RolesConstant.Admin],
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
    to: routes.profile(),
    inActive: (
      <IconComponent
        name={'ProfileIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'ProfileIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Профиль',
    roles: [RolesConstant.Admin, RolesConstant.User],
  }),
];
