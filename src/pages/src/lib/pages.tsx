import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnPages = cn('Pages');

interface PagesProps {
  className?: string;
}

export const Pages: FC<PagesProps> = (props) => {
  return <div className={cnPages(undefined, [props.className])}>Pages</div>;
};
