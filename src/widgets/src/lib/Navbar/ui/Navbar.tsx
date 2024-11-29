import { FC } from 'react';
import { cn } from '@bem-react/classname';
import './Navbar.scss';

const cnNavbar = cn('Navbar');

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
  return <div className={cnNavbar(undefined, [props.className])}>Navbar</div>;
};
