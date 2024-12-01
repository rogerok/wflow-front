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
  }),
  linkOptions({
    to: '123',
    inActive: <IconComponent name={'TimerIcon'} size={'sm'} />,
    active: <IconComponent name={'TimerIconFilled'} size={'sm'} />,
  }),
  linkOptions({
    to: routes.statistic(),
    inActive: <IconComponent name={'StatisticIcon'} size={'sm'} />,
    active: <IconComponent name={'StatisticIconFilled'} size={'sm'} />,
  }),
  linkOptions({
    to: routes.settings(),
    inActive: <IconComponent name={'SettingsIcon'} size={'sm'} />,
    active: <IconComponent name={'SettingsIconFilled'} size={'sm'} />,
  }),
];

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <HStack
      className={cnNavbar(undefined, [props.className])}
      flexJustify={'between'}
      align={'center'}
      as={'nav'}
    >
      {NavLinks.map((link) => (
        <AppLink className={cnNavbar('Link')} to={link.to} key={link.to}>
          {({ isActive }) => (isActive ? link.active : link.inActive)}
        </AppLink>
      ))}
    </HStack>
  );
};
