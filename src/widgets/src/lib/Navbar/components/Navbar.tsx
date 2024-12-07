import { FC } from 'react';
import { cn } from '@bem-react/classname';
import './Navbar.scss';
import { IconComponent, routes, useGlobalStore } from '@wflow-front/shared';
import { linkOptions } from '@tanstack/react-router';
import { NavbarItem } from './NavbarItem/NavbarItem';
import { NavbarToggleButton } from './NavbarToggleButton/NavbarToggleButton';
import { observer } from 'mobx-react-lite';

const cnNavbar = cn('Navbar');

interface NavbarProps {
  className?: string;
}

const NavLinks = [
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
  }),
  linkOptions({
    to: '/',
    inActive: (
      <IconComponent
        name={'TimerIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'TimerIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Что-нибудь',
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
  }),
] as const;

export const Navbar: FC<NavbarProps> = observer((props) => {
  const { ui } = useGlobalStore();

  return (
    <nav
      className={cnNavbar({ collapsed: ui.isNavbarCollapsed }, [
        props.className,
      ])}
    >
      {NavLinks.map((link) => (
        <NavbarItem
          to={link.to}
          inActive={link.inActive}
          active={link.active}
          label={link.label}
          key={link.to}
        />
      ))}
      <NavbarToggleButton className={cnNavbar('ToggleButton')} />
    </nav>
  );
});
