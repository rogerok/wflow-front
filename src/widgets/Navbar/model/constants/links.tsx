import { RolesType } from '@shared/api';
import { RolesConstant, routes } from '@shared/const';
import { IconComponent } from '@shared/elements/ui';
import { linkOptions } from '@tanstack/react-router';
import { ReactNode } from 'react';

export type NavbarLinksType = {
  active: ReactNode;

  inActive: ReactNode;

  label: string;

  to: string;

  roles: RolesType[];

  disabled: boolean;
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
    disabled: false,
  }),

  linkOptions({
    to: routes.signUp(),
    inActive: (
      <IconComponent
        name={'SignUpIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'SignUpIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Регистрация',
    roles: [RolesConstant.Visitor],
    disabled: false,
  }),
  linkOptions({
    to: routes.signIn(),
    inActive: (
      <IconComponent
        name={'LoginIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'LoginIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Войти',
    roles: [RolesConstant.Visitor],
    disabled: false,
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
    disabled: false,
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
    disabled: import.meta.env.PROD,
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
    disabled: false,
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
    disabled: false,
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
    disabled: import.meta.env.PROD,
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
    disabled: import.meta.env.PROD,
  }),
];
