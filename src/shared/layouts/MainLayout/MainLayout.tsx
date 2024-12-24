import './MainLayout.scss';

import { cn } from '@bem-react/classname';
import { FC, ReactNode } from 'react';

const cnMainLayout = cn('MainLayout');

interface MainLayoutProps {
  className?: string;
  content?: ReactNode;
  header?: ReactNode;
  navbar?: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  return (
    <div className={cnMainLayout(undefined, [props.className])}>
      <div className={cnMainLayout('Header')}>{props.header}</div>
      <div className={cnMainLayout('Content')}>{props.content}</div>
      <div className={cnMainLayout('Navbar')}>{props.navbar}</div>
    </div>
  );
};
