import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnBooksPage = cn('BooksPage');

interface BooksPageProps {
  className?: string;
}

export const BooksPage: FC<BooksPageProps> = (props) => {
  return (
    <div className={cnBooksPage(undefined, [props.className])}>
      BooksPage
    </div>
  );
};