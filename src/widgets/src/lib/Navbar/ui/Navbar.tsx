import { FC } from 'react';
import { cn } from '@bem-react/classname';
import './Navbar.scss';
import { HStack, IconComponent } from '@wflow-front/shared';
import { Link } from '@tanstack/react-router';

const cnNavbar = cn('Navbar');

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <HStack
      className={cnNavbar(undefined, [props.className])}
      flexJustify={'between'}
      align={'center'}
      as={'nav'}
    >
      <IconComponent name={'HomeIcon'} size={'sm'} />
      <IconComponent name={'TimerIcon'} size={'sm'} />
      <IconComponent name={'StatisticIcon'} size={'sm'} />
      <IconComponent name={'SettingsIcon'} size={'sm'} />
    </HStack>
  );
};
