import './MainLayout.scss';

import { cn } from '@bem-react/classname';
import { Outlet } from '@tanstack/react-router';
import { Header } from '@widgets/Header';
import { Navbar } from '@widgets/Navbar';
import { FC } from 'react';

const cnMainLayout = cn('MainLayout');

export const MainLayout: FC = () => {
  return (
    <div className={cnMainLayout()}>
      <Header className={cnMainLayout('Header')} />
      <Navbar className={cnMainLayout('Navbar')} />
      <div className={cnMainLayout('Content')}>
        <Outlet />
      </div>
    </div>
  );
};
