import { FC } from 'react';
import { cn } from '@bem-react/classname';

const cnMainLayout = cn('MainLayout');

interface MainLayoutProps {
  className?: string;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  return (
    <div className={cnMainLayout(undefined, [props.className])}>MainLayout</div>
  );
};
