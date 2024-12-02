import { FC } from 'react';
import { cn } from '@bem-react/classname';
import './Navbar.scss';
import { AppLink, HStack, IconComponent, routes } from '@wflow-front/shared';
import { linkOptions } from '@tanstack/react-router';

const cnNavbar = cn('Navbar');

interface NavbarProps {
  className?: string;
}

const NavLinks = [
  linkOptions({
    to: routes.main(),
    inActive: <IconComponent name={'HomeIcon'} size={'sm'} />,
    active: <IconComponent name={'HomeIconFilled'} size={'sm'} />,
    label: 'Главная',
  }),
  linkOptions({
    to: '/',
    inActive: <IconComponent name={'TimerIcon'} size={'sm'} />,
    active: <IconComponent name={'TimerIconFilled'} size={'sm'} />,
    label: 'Что-нибудь',
  }),
  linkOptions({
    to: routes.statistic(),
    inActive: <IconComponent name={'StatisticIcon'} size={'sm'} />,
    active: <IconComponent name={'StatisticIconFilled'} size={'sm'} />,
    label: 'Статистика',
  }),
  linkOptions({
    to: routes.settings(),
    inActive: <IconComponent name={'SettingsIcon'} size={'sm'} />,
    active: <IconComponent name={'SettingsIconFilled'} size={'sm'} />,
    label: 'Настройки',
  }),
];

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <nav className={cnNavbar(undefined, [props.className])}>
      {NavLinks.map((link) => (
        <HStack align={'center'} gap={'16'}>
          <AppLink className={cnNavbar('Link')} to={link.to} key={link.to}>
            {({ isActive }) => (isActive ? link.active : link.inActive)}
          </AppLink>
          <span>{link.label}</span>
        </HStack>
      ))}
    </nav>
  );
};
