import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import './Page.scss';

const cnPage = cn('Page');

interface PageProps {
  className?: string;
  children?: ReactNode;
}

export const Page: FC<PageProps> = (props) => {
  return (
    <main className={cnPage(undefined, [props.className])}>
      {props.children}
    </main>
  );
};
