import { FC } from 'react';
import { cn } from '@bem-react/classname';

const cnHomePage = cn('HomePage');

interface HomePageProps {
  className?: string;
}

export const HomePage: FC<HomePageProps> = (props) => {
  return (
    <div className={cnHomePage(undefined, [props.className])}>HomePage</div>
  );
};
