import './MainLayout.scss';

import { cn } from '@bem-react/classname';
import { NavbarLinksType } from '@shared/const';
import { Outlet } from '@tanstack/react-router';
import { Header } from '@widgets/Header';
import { Navbar } from '@widgets/Navbar';
import { FC } from 'react';

const cnMainLayout = cn('MainLayout');

interface MainLayoutProps {
  navbarLinks: NavbarLinksType[];
}

const OutletComponent: FC = () => (
  <div className={cnMainLayout('Content')}>
    <Outlet />
  </div>
);

export const MainLayout: FC<MainLayoutProps> = (props) => {
  return (
    <div className={cnMainLayout()}>
      <Header className={cnMainLayout('Header')} />
      <Navbar className={cnMainLayout('Navbar')} links={props.navbarLinks} />
      <OutletComponent />
    </div>
  );
};
