import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnMainLayout = cn('MainLayout');

interface MainLayoutProps {
  className?: string;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  return (
    <div className={cnMainLayout(undefined, [props.className])}>
      MainLayout
    </div>
  );
};