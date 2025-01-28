import { cn } from '@bem-react/classname';
import { getBooks } from '@shared';
import { FC, useEffect } from 'react';

const cnBooksPage = cn('BooksPage');

interface BooksPageProps {
  className?: string;
}

export const BooksPage: FC<BooksPageProps> = (props) => {
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className={cnBooksPage(undefined, [props.className])}>BooksPage</div>
  );
};
